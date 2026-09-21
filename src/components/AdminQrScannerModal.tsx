"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, QrCode, Camera, Upload, Keyboard, CheckCircle2, 
  AlertTriangle, ShieldCheck, RefreshCw, UserCheck, 
  Sparkles, Building2, MapPin, Award, Check, ScanLine, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsQR from 'jsqr';

interface AttendeePassInfo {
  _id: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  profession: string;
  designation: string;
  stateMedicalCouncilNumber: string;
  city: string;
  state: string;
  paymentStatus: string;
  paymentAmount: number;
  razorpayPaymentId?: string;
  registrationStatus: string;
  checkedIn: boolean;
  checkInTime?: string | null;
  createdAt: string;
}

interface VerificationResult {
  isValid: boolean;
  message: string;
  reason?: string;
  attendee?: AttendeePassInfo;
  scannedData?: any;
  isFirstScanToday?: boolean;
  todayScanDate?: string;
  alreadyScannedAt?: string;
}

interface AdminQrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckInSuccess?: () => void;
}

export default function AdminQrScannerModal({
  isOpen,
  onClose,
  onCheckInSuccess,
}: AdminQrScannerModalProps) {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'manual'>('camera');
  const [manualCode, setManualCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCheckedInLocally, setIsCheckedInLocally] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

  const html5QrCodeRef = useRef<any>(null);
  const fallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDetectedRef = useRef<boolean>(false);
  const readerId = "admin-html5-qr-reader";

  // Stop camera stream & frame interval
  const stopCameraStream = async () => {
    if (fallbackIntervalRef.current) {
      clearInterval(fallbackIntervalRef.current);
      fallbackIntervalRef.current = null;
    }

    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        await html5QrCodeRef.current.clear();
      } catch (err) {
        // ignore cleanup errors
      }
      html5QrCodeRef.current = null;
      setIsCameraActive(false);
    }
  };

  // Decode frame using Native BarcodeDetector and jsQR
  const scanVideoElementDirectly = async (videoEl: HTMLVideoElement) => {
    if (isDetectedRef.current) return;
    if (!videoEl || videoEl.readyState < 2 || videoEl.videoWidth === 0) return;

    // 1. Try native BarcodeDetector API (Built-in C++ hardware decoder in Chrome)
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        const barcodeDetector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
        const barcodes = await barcodeDetector.detect(videoEl);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          isDetectedRef.current = true;
          await stopCameraStream();
          verifyQrData(barcodes[0].rawValue);
          return;
        }
      } catch (e) {
        // fall back to jsQR
      }
    }

    // 2. High-performance jsQR scanning with dual inversion (normal + screen glare / dark mode)
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Scan with both normal and inverted colors
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth",
        });

        if (qrCode && qrCode.data) {
          isDetectedRef.current = true;
          await stopCameraStream();
          verifyQrData(qrCode.data);
          return;
        }
      }
    } catch (e) {
      // ignore frame processing misses
    }
  };

  // Start live camera stream
  const startCameraStream = async (cameraId?: string) => {
    setCameraError(null);
    isDetectedRef.current = false;

    try {
      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import('html5-qrcode');

      // Enumerate available cameras if not yet done
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length > 0) {
          setCameras(devices.map(d => ({ id: d.id, label: d.label || `Camera ${d.id}` })));
        }
      } catch {
        // non-fatal device enumeration
      }

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(readerId, {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true,
          },
          verbose: false,
        });
      }

      const qrCodeScanner = html5QrCodeRef.current;
      if (qrCodeScanner.isScanning) {
        return;
      }

      // Configure wide-angle, full-frame detection (no restrictive small crop)
      const config = {
        fps: 20,
        qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
          const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
          // Scan 95% of full frame so close-up or large QR codes aren't cropped out
          return {
            width: Math.max(220, Math.floor(minEdge * 0.95)),
            height: Math.max(220, Math.floor(minEdge * 0.95)),
          };
        },
        aspectRatio: 1.0,
        videoConstraints: {
          facingMode: { ideal: "environment" },
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        },
      };

      const cameraSelection = cameraId || (selectedCameraId ? selectedCameraId : { facingMode: "environment" });

      await qrCodeScanner.start(
        cameraSelection,
        config,
        async (decodedText: string) => {
          if (isDetectedRef.current) return;
          isDetectedRef.current = true;
          await stopCameraStream();
          verifyQrData(decodedText);
        },
        () => {
          // ignore continuous scanning frame misses
        }
      );

      setIsCameraActive(true);

      // Start complementary high-frequency Native + jsQR frame poller
      if (fallbackIntervalRef.current) clearInterval(fallbackIntervalRef.current);
      fallbackIntervalRef.current = setInterval(() => {
        const video = document.querySelector<HTMLVideoElement>(`#${readerId} video`);
        if (video && !video.paused && !video.ended) {
          scanVideoElementDirectly(video);
        }
      }, 120);

    } catch (err: any) {
      console.warn("Camera start warning:", err);
      setCameraError(err.message || "Unable to access camera. Please allow camera permissions or switch to Image Upload / Manual ID.");
      setIsCameraActive(false);
    }
  };

  // Immediate snapshot capture & multi-engine decode
  const captureAndScanCurrentFrame = async () => {
    const video = document.querySelector<HTMLVideoElement>(`#${readerId} video`);
    if (!video) return;

    try {
      setIsVerifying(true);
      await scanVideoElementDirectly(video);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle camera on mount / activeTab changes
  useEffect(() => {
    if (isOpen && activeTab === 'camera' && !verificationResult) {
      const timer = setTimeout(() => {
        startCameraStream(selectedCameraId);
      }, 300);
      return () => {
        clearTimeout(timer);
        stopCameraStream();
      };
    } else {
      stopCameraStream();
    }
  }, [isOpen, activeTab, verificationResult, selectedCameraId]);

  // Clean up on unmount or close
  useEffect(() => {
    if (!isOpen) {
      stopCameraStream();
      setVerificationResult(null);
      setManualCode('');
      setIsCheckedInLocally(false);
    }
  }, [isOpen]);

  // Backend verification call
  const verifyQrData = async (qrDataString: string) => {
    if (!qrDataString || !qrDataString.trim()) return;

    setIsVerifying(true);
    setVerificationResult(null);
    setIsCheckedInLocally(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2027';
      const response = await fetch(`${backendUrl}/api/register/verify-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData: qrDataString }),
      });

      const data = await response.json();
      setVerificationResult(data);
      if (data.attendee?.checkedIn) {
        setIsCheckedInLocally(true);
      }
      if (data.isValid && onCheckInSuccess) {
        onCheckInSuccess();
      }
    } catch (err: any) {
      setVerificationResult({
        isValid: false,
        message: 'Network error verifying QR code pass. Please check your backend connection.',
        reason: 'NETWORK_ERROR',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // File upload decoder with multi-engine fallback
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsVerifying(true);

    // 1. Try Html5Qrcode scanFile
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const tempScanner = new Html5Qrcode("upload-temp-reader");
      const decodedText = await tempScanner.scanFile(file, true);
      tempScanner.clear();
      if (decodedText) {
        await verifyQrData(decodedText);
        return;
      }
    } catch (e) {
      // fallback to canvas + jsQR
    }

    // 2. Try Image canvas + jsQR fallback
    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = objectUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(objectUrl);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth",
        });

        if (qrCode && qrCode.data) {
          await verifyQrData(qrCode.data);
          return;
        }
      }
    } catch (e) {
      // fall through
    }

    // If all fail
    setIsVerifying(false);
    setVerificationResult({
      isValid: false,
      message: 'Could not detect a valid QR Code in the uploaded image. Please ensure the QR code is clearly visible, in focus, and not cropped.',
      reason: 'IMAGE_DECODE_FAILED',
    });
  };

  // Admit / Check In attendee
  const handleCheckIn = async () => {
    if (!verificationResult?.attendee?.registrationId) return;

    setIsCheckingIn(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2027';
      const response = await fetch(`${backendUrl}/api/register/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationId: verificationResult.attendee.registrationId }),
      });

      const data = await response.json();
      if (data.success) {
        setIsCheckedInLocally(true);
        if (onCheckInSuccess) onCheckInSuccess();
      }
    } catch (err) {
      console.error('Check-in error:', err);
    } finally {
      setIsCheckingIn(false);
    }
  };

  // Reset for next scan
  const handleResetForNext = () => {
    setVerificationResult(null);
    setManualCode('');
    setIsCheckedInLocally(false);
    isDetectedRef.current = false;
    if (activeTab === 'camera') {
      setTimeout(() => startCameraStream(selectedCameraId), 200);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div id="upload-temp-reader" className="hidden" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden relative my-8"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F83C6] flex items-center justify-center text-white shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                QR Pass Verification
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider font-extrabold">
                  Admin Desk
                </span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">Dual-Engine AI camera scanner for attendee admission</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Content */}
        <div className="p-6 space-y-5">
          {/* If Result exists, show Result Card */}
          {verificationResult ? (
            <div className="space-y-5">
              {verificationResult.isValid ? (
                /* VALID ENTRY PASS CARD */
                <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full inline-block mb-1">
                          Official Valid Pass
                        </span>
                        <h3 className="text-xl font-black text-emerald-950">
                          {verificationResult.attendee?.fullName}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-black px-3 py-1 bg-white border border-emerald-300 text-emerald-900 rounded-xl shadow-sm">
                      {verificationResult.attendee?.registrationId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-emerald-200">
                    <div>
                      <span className="text-emerald-800 font-bold block uppercase text-[10px]">Category</span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {verificationResult.attendee?.profession || 'Delegate'}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-800 font-bold block uppercase text-[10px]">Designation</span>
                      <span className="font-bold text-slate-900 text-sm truncate block">
                        {verificationResult.attendee?.designation || 'Specialist'}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-800 font-bold block uppercase text-[10px]">Institution</span>
                      <span className="font-medium text-slate-800 truncate block">
                        {verificationResult.attendee?.institution || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-800 font-bold block uppercase text-[10px]">Council Number</span>
                      <span className="font-mono font-bold text-slate-900">
                        {verificationResult.attendee?.stateMedicalCouncilNumber || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-800 font-bold block uppercase text-[10px]">Payment Status</span>
                      <span className="inline-flex items-center gap-1 font-extrabold text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                        ₹{verificationResult.attendee?.paymentAmount || 1} Paid
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-800 font-bold block uppercase text-[10px]">Admission Status</span>
                      <span className={`inline-block font-extrabold text-xs px-2.5 py-0.5 rounded-full ${
                        isCheckedInLocally 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {isCheckedInLocally ? 'Checked In' : 'Not Admitted Yet'}
                      </span>
                    </div>
                  </div>

                  {/* Daily Scan Counter Status Badge */}
                  <div className="pt-1">
                    {verificationResult.isFirstScanToday ? (
                      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <div>
                          <span className="font-extrabold text-emerald-950 block">First Scan Today ({verificationResult.todayScanDate || 'Today'})</span>
                          <span className="text-[11px] text-emerald-800">Recorded and counted towards today's daily unique attendance count.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <div>
                          <span className="font-extrabold text-amber-950 block">Repeat Scan Today (Deduplicated)</span>
                          <span className="text-[11px] text-amber-800">
                            Already scanned today {verificationResult.alreadyScannedAt ? `at ${new Date(verificationResult.alreadyScannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}. Daily count preserved without duplicate inflation.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions: Admit / Check In & Next */}
                  <div className="pt-2 flex flex-wrap gap-2.5">
                    {!isCheckedInLocally ? (
                      <button
                        onClick={handleCheckIn}
                        disabled={isCheckingIn}
                        className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4" />
                        {isCheckingIn ? 'Admitting Attendee...' : 'Admit & Mark Checked-In'}
                      </button>
                    ) : (
                      <div className="flex-1 py-3 px-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Attendee Admitted
                      </div>
                    )}
                    <button
                      onClick={handleResetForNext}
                      className="py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Scan Next
                    </button>
                  </div>
                </div>
              ) : (
                /* INVALID ENTRY PASS CARD */
                <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                      <AlertTriangle className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-red-800 bg-red-100 border border-red-300 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        Verification Failed
                      </span>
                      <h3 className="text-xl font-black text-red-950">
                        Invalid Pass / Unrecognized QR
                      </h3>
                      <p className="text-xs text-red-800 font-semibold mt-1">
                        {verificationResult.message}
                      </p>
                    </div>
                  </div>

                  {verificationResult.scannedData && (
                    <div className="p-3 bg-white border border-red-200 rounded-xl text-xs font-mono text-slate-700 break-all max-h-24 overflow-y-auto">
                      <strong>Scanned Payload:</strong> {typeof verificationResult.scannedData === 'object' ? JSON.stringify(verificationResult.scannedData) : String(verificationResult.scannedData)}
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleResetForNext}
                      className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-red-600/20 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Another Pass
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SCANNER TABS & INPUTS */
            <div className="space-y-4">
              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                {[
                  { id: 'camera', label: 'Live Camera', icon: Camera },
                  { id: 'upload', label: 'Upload Image', icon: Upload },
                  { id: 'manual', label: 'Manual ID', icon: Keyboard },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setCameraError(null);
                      }}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#1F83C6] shadow-sm border border-slate-200/80 font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: LIVE CAMERA STREAM */}
              {activeTab === 'camera' && (
                <div className="space-y-3">
                  {/* Camera Selector (if multiple cameras exist) */}
                  {cameras.length > 1 && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-700">Camera:</span>
                      <select
                        value={selectedCameraId}
                        onChange={(e) => {
                          setSelectedCameraId(e.target.value);
                          stopCameraStream().then(() => startCameraStream(e.target.value));
                        }}
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                      >
                        {cameras.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Video Viewport with Live Scanning Laser Overlay */}
                  <div className="relative overflow-hidden rounded-2xl border-2 border-slate-300 bg-black aspect-square max-w-[360px] mx-auto flex items-center justify-center shadow-inner">
                    <div id={readerId} className="w-full h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full" />
                    
                    {/* Active Scanning Laser Line Overlay */}
                    {isCameraActive && (
                      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
                        {/* Corner Target Markers */}
                        <div className="flex justify-between">
                          <div className="w-6 h-6 border-t-2 border-l-2 border-sky-400 rounded-tl" />
                          <div className="w-6 h-6 border-t-2 border-r-2 border-sky-400 rounded-tr" />
                        </div>
                        
                        {/* Animated Laser Bar */}
                        <motion.div
                          animate={{ y: [-100, 100, -100] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          className="w-full h-0.5 bg-sky-400 shadow-[0_0_12px_#38bdf8]"
                        />

                        <div className="flex justify-between">
                          <div className="w-6 h-6 border-b-2 border-l-2 border-sky-400 rounded-bl" />
                          <div className="w-6 h-6 border-b-2 border-r-2 border-sky-400 rounded-br" />
                        </div>
                      </div>
                    )}

                    {!isCameraActive && !cameraError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center bg-slate-900/90">
                        <Camera className="w-8 h-8 text-[#1F83C6] animate-pulse mb-2" />
                        <span className="text-xs font-semibold">Starting camera feed...</span>
                      </div>
                    )}

                    {cameraError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-slate-900/95 space-y-3">
                        <AlertTriangle className="w-8 h-8 text-amber-400" />
                        <span className="text-xs font-semibold leading-relaxed text-slate-200">{cameraError}</span>
                        <button
                          onClick={() => startCameraStream(selectedCameraId)}
                          className="px-4 py-2 bg-[#1F83C6] hover:bg-[#166ba3] rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer"
                        >
                          Retry Camera
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Manual Snapshot Trigger Button */}
                  {isCameraActive && (
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <p className="text-xs text-slate-500 font-medium">
                        Hold QR steady within frame
                      </p>
                      <button
                        type="button"
                        onClick={captureAndScanCurrentFrame}
                        disabled={isVerifying}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#1F83C6]" />
                        {isVerifying ? 'Scanning...' : 'Capture & Scan Frame'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: UPLOAD IMAGE */}
              {activeTab === 'upload' && (
                <div className="space-y-3">
                  <label className="border-2 border-dashed border-slate-300 hover:border-[#1F83C6] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50 hover:bg-sky-50/50">
                    <Upload className="w-10 h-10 text-[#1F83C6] mb-3" />
                    <span className="text-sm font-bold text-slate-800">
                      Choose QR Pass Image
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      PNG, JPG, or screenshot of attendee pass
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-center text-xs text-slate-400 font-medium">
                    Scans uploaded pass images using dual-engine analysis with glare removal
                  </p>
                </div>
              )}

              {/* TAB 3: MANUAL ID LOOKUP */}
              {activeTab === 'manual' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    verifyQrData(manualCode);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Registration ID or Raw Payload
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MVC27-0440RQA3K or paste JSON"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#1F83C6] focus:border-[#1F83C6] transition-all text-slate-900"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying || !manualCode.trim()}
                    className="w-full py-3.5 px-4 bg-[#1F83C6] hover:bg-[#156ca5] disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#1F83C6]/20 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isVerifying ? 'Verifying...' : 'Verify Pass Authenticity'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Against Official MVCON 2027 Database
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-200 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
