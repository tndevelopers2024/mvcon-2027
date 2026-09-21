"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Building2, Upload, Mail, Phone, Briefcase, 
  Award, MapPin, Map, Ticket, ShieldCheck, ArrowRight, 
  ArrowLeft, Check, AlertCircle, Loader2, PartyPopper,
  KeyRound, RefreshCw, X, Copy, QrCode, Download,
  Printer, Sparkles, CheckCircle2, Calendar, CheckCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const steps = [
  { id: 1, title: "Personal Details" },
  { id: 2, title: "Professional Profile" },
  { id: 3, title: "Location & Billing" }
];

const getMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) return url;
  const backend = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/$/, '');
  return backend ? `${backend}${url.startsWith('/') ? '' : '/'}${url}` : url;
};

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  // Form fields state
  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    email: '',
    phone: '',
    profession: '',
    designation: '',
    stateMedicalCouncilNumber: '',
    city: '',
    state: '',
    couponCode: '',
  });

  // API submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredData, setRegisteredData] = useState<{
    registrationId: string;
    fullName: string;
    email: string;
    institution: string;
    profession: string;
    designation?: string;
    city?: string;
    state?: string;
    phone?: string;
    councilNumber?: string;
    qrCode?: string;
    paymentAmount?: number;
    razorpayPaymentId?: string;
    profilePhotoUrl?: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // OTP Verification modal & input states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Dynamically load Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Countdown timer for OTP resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  // Prevent accidental double-clicks or click bleed-through when entering Step 3
  const [canSubmitStep3, setCanSubmitStep3] = useState(false);

  // Clear error message whenever step changes and buffer step 3 submission
  useEffect(() => {
    setErrorMessage(null);
    if (currentStep === 3) {
      setCanSubmitStep3(false);
      const timer = setTimeout(() => setCanSubmitStep3(true), 400);
      return () => clearTimeout(timer);
    } else {
      setCanSubmitStep3(false);
    }
  }, [currentStep]);

  const nextStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };
  
  const prevStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setErrorMessage(null);
    const stepDiv = document.getElementById(`step${currentStep}`);
    if (stepDiv) {
      const inputs = stepDiv.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input:not([type="file"]), select');
      let isValid = true;
      for (const input of Array.from(inputs)) {
        if (!input.checkValidity()) {
          input.reportValidity();
          isValid = false;
          break;
        }
      }
      if (!isValid) return;
    }

    if (currentStep === 1) {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        setErrorMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    nextStep();
  };

  // Triggered when explicitly clicking "Verify & Complete" on Step 3
  const handleInitiateOtp = async (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();

    // If not on final step or during transition delay, do nothing
    if (currentStep !== 3 || !canSubmitStep3) {
      return;
    }

    // Validate City & State fields on Step 3
    if (!formData.city.trim() || !formData.state.trim()) {
      const step3Div = document.getElementById('step3');
      if (step3Div) {
        const inputs = step3Div.querySelectorAll<HTMLInputElement>('input:required');
        for (const input of Array.from(inputs)) {
          if (!input.checkValidity()) {
            input.reportValidity();
            return;
          }
        }
      }
      setErrorMessage('Please enter your City and State to proceed.');
      return;
    }

    setIsSendingOtp(true);
    setErrorMessage(null);
    setOtpError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2027';
      const response = await fetch(`${backendUrl}/api/register/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send verification code.');
      }

      setShowOtpModal(true);
      setResendCooldown(60);
      setOtpValues(['', '', '', '', '', '']);

      // Focus first input box
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 250);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to the registration server.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Resend OTP code
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isSendingOtp) return;
    setIsSendingOtp(true);
    setOtpError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2027';
      const response = await fetch(`${backendUrl}/api/register/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to resend verification code.');
      }

      setResendCooldown(60);
      setOtpValues(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } catch (err: any) {
      setOtpError(err.message || 'Failed to resend verification code.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handle single-digit input and auto-advance
  const handleOtpDigitChange = (index: number, value: string) => {
    // Handle paste of whole 6-digit code
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      if (digits.length > 0) {
        const newOtp = [...otpValues];
        digits.forEach((char, i) => {
          if (i < 6) newOtp[i] = char;
        });
        setOtpValues(newOtp);
        const nextIdx = Math.min(digits.length, 5);
        otpInputRefs.current[nextIdx]?.focus();
        return;
      }
    }

    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = digit;
    setOtpValues(newOtp);

    // Auto-advance to next box if digit was typed
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key navigation
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Final OTP verification, Razorpay ₹1 payment, & registration submission
  const handleVerifyAndSubmit = async () => {
    const fullOtp = otpValues.join('');
    if (fullOtp.length !== 6) {
      setOtpError('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2027';

      // 1. Verify OTP first with backend
      const verifyRes = await fetch(`${backendUrl}/api/register/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: fullOtp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.message || 'Invalid verification code. Please check and try again.');
      }

      // 2. Create ₹1 Razorpay Order
      setIsProcessingPayment(true);
      const orderRes = await fetch(`${backendUrl}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          profession: formData.profession,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.message || 'Unable to initiate payment with Razorpay.');
      }

      if (typeof window === 'undefined' || !(window as any).Razorpay) {
        throw new Error('Razorpay payment gateway is still loading. Please click again in 2 seconds.');
      }

      // 3. Launch Razorpay Checkout Modal
      const rzpOptions = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_RNJwQRpJiswM0W',
        amount: orderData.amount, // 100 paise = ₹1.00
        currency: orderData.currency || 'INR',
        name: 'MVCON 2027',
        description: 'Conference Registration Fee (₹1.00)',
        order_id: orderData.orderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#1F83C6',
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
            setIsVerifyingOtp(false);
            setOtpError('Payment was not completed. Please click Pay & Complete to finalize your registration.');
          },
        },
        handler: async (paymentResponse: any) => {
          try {
            // 4. Submit registration with verified OTP and Razorpay signature
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
              data.append(key, value);
            });
            if (profilePhoto) {
              data.append('profilePhoto', profilePhoto);
            }
            data.append('otp', fullOtp);
            data.append('razorpayOrderId', paymentResponse.razorpay_order_id);
            data.append('razorpayPaymentId', paymentResponse.razorpay_payment_id);
            data.append('razorpaySignature', paymentResponse.razorpay_signature);

            const regResponse = await fetch(`${backendUrl}/api/register`, {
              method: 'POST',
              body: data,
            });
            const result = await regResponse.json();

            if (!regResponse.ok) {
              throw new Error(result.message || 'Payment received but registration failed. Please contact support.');
            }

            setShowOtpModal(false);
            setRegisteredData({
              registrationId: result.registrationId || result.data?.registrationId,
              fullName: result.data?.fullName || formData.fullName,
              email: result.data?.email || formData.email,
              institution: result.data?.institution || formData.institution,
              profession: result.data?.profession || formData.profession,
              designation: result.data?.designation || formData.designation,
              city: result.data?.city || formData.city,
              state: result.data?.state || formData.state,
              phone: result.data?.phone || formData.phone,
              councilNumber: result.data?.stateMedicalCouncilNumber || formData.stateMedicalCouncilNumber,
              qrCode: result.qrCode || result.data?.qrCode,
              paymentAmount: result.data?.paymentAmount || 1,
              razorpayPaymentId: result.data?.razorpayPaymentId || paymentResponse.razorpay_payment_id,
              profilePhotoUrl: profilePhoto ? URL.createObjectURL(profilePhoto) : undefined,
            });
          } catch (err: any) {
            setOtpError(err.message || 'Failed to complete registration after payment.');
          } finally {
            setIsProcessingPayment(false);
            setIsVerifyingOtp(false);
          }
        },
      };

      const rzpInstance = new (window as any).Razorpay(rzpOptions);
      rzpInstance.on('payment.failed', (response: any) => {
        console.error('Razorpay payment failed:', response?.error);
        setIsProcessingPayment(false);
        setIsVerifyingOtp(false);
        setOtpError(
          response?.error?.description ||
          response?.error?.reason ||
          'Payment was blocked or failed. Please check your payment details or try again.'
        );
      });
      rzpInstance.open();
    } catch (err: any) {
      setOtpError(err.message || 'Verification or payment initiation failed.');
      setIsProcessingPayment(false);
      setIsVerifyingOtp(false);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 flex justify-center items-center">
      {/* Print styles for physical badge printing */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #mvcon-print-badge, #mvcon-print-badge * {
            visibility: visible;
          }
          #mvcon-print-badge {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 480px !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            background: #0c1a2d !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className={`w-full ${registeredData ? 'max-w-5xl' : 'max-w-4xl'} bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden relative transition-all duration-500`}>
        
        {/* Conditional Header: Celebration Header if Registered, else Standard Registration Header */}
        {registeredData ? (
          <div className="bg-gradient-to-r from-[#071322] via-[#0d1d33] to-[#071322] p-6 sm:p-8 md:p-10 text-white relative overflow-hidden border-b border-slate-800">
            <div className="absolute -top-24 -left-20 w-80 h-80 bg-[#1F83C6] rounded-full mix-blend-screen filter blur-[90px] opacity-40" />
            <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-[#F26522] rounded-full mix-blend-screen filter blur-[90px] opacity-30" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Official Registration Confirmed
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  Welcome to MVCON 2027, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">{registeredData.fullName}</span>!
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
                  Your entry badge pass and verified credentials are ready. Please save or print your pass below.
                </p>
              </div>

              {/* Quick Actions in Header */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Printer className="w-4 h-4 text-sky-300" />
                  Print Badge
                </button>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F83C6] hover:bg-[#156ca5] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#1F83C6]/30 transition-all hover:scale-105 active:scale-95"
                >
                  Go to Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#0b1623] p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-[#1F83C6] rounded-full mix-blend-screen filter blur-[80px] opacity-40" />
            <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-[#F26522] rounded-full mix-blend-screen filter blur-[80px] opacity-30" />
            
            <div className="flex justify-center items-center gap-2 mb-3"> 
              <img 
                  src="/images/logo.png" alt="MVCON Logo" className="w-34 object-contain" 
                />
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 relative z-10">2027 Registration</h1>
            </div>

            
            <p className="text-slate-400 font-medium relative z-10 mb-4">Secure your spot with verified attendee access</p>
            
            <div className="relative z-10 inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full">
              <span className="text-slate-300 text-sm">Already registered? </span>
              <Link href="/login" className="!text-white font-bold text-sm hover:!text-[#4facfe] transition-colors">
                Sign in here
              </Link>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 md:p-10">
          
          {/* Success Screen */}
          {registeredData ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: THE OFFICIAL CONFERENCE PASS / BADGE (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-[#1F83C6]" />
                      Official Delegate Smart Badge
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified Entry Pass
                    </span>
                  </div>

                  {/* Physical Badge Mockup with Lanyard Notch */}
                  <div 
                    id="mvcon-print-badge"
                    className="relative bg-gradient-to-b from-[#0c1a2d] via-[#091423] to-[#060c15] text-white rounded-3xl shadow-2xl border border-slate-800/90 overflow-hidden"
                  >
                    {/* Top Lanyard Slot */}
                    <div className="pt-3 pb-1 flex justify-center bg-black/20">
                      <div className="w-14 h-2.5 bg-slate-900/90 rounded-full border border-slate-700/60 shadow-inner" />
                    </div>

                    {/* Conference Top Header */}
                    <div className="px-6 pt-4 pb-4 border-b border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1F83C6] to-[#0d598a] flex items-center justify-center font-black text-white text-base shadow-md">
                          MV
                        </div>
                        <div>
                          <div className="text-base font-black tracking-wider text-white flex items-center gap-1.5">
                            MVCON 2027
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#F26522]/20 text-[#F26522] border border-[#F26522]/30">
                              PASS
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            Annual National Medical Conference
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-sky-400 flex items-center justify-end gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          FEB 20-22, 2027
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          Chennai, India
                        </div>
                      </div>
                    </div>

                    {/* Attendee Profile Section */}
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Avatar / Monogram */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1F83C6] via-[#156ca5] to-[#0b3c5d] text-white flex items-center justify-center font-extrabold text-2xl shadow-lg border-2 border-sky-400/40 flex-shrink-0 overflow-hidden">
                          {registeredData.profilePhotoUrl ? (
                            <img 
                              src={registeredData.profilePhotoUrl} 
                              alt={registeredData.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            registeredData.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-xl sm:text-2xl font-black text-white truncate">
                              {registeredData.fullName}
                            </h3>
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
                              registeredData.profession?.toLowerCase().includes('pg') || registeredData.profession === 'PG'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                            }`}>
                              {registeredData.profession}
                            </span>
                            {registeredData.designation && (
                              <span className="text-xs text-slate-400">
                                • {registeredData.designation}
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-300 flex items-center gap-1.5 truncate">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="font-semibold text-slate-200">{registeredData.institution}</span>
                            {registeredData.city && <span className="text-slate-400">({registeredData.city})</span>}
                          </div>
                        </div>
                      </div>

                      {/* Monospace Registration ID Strip */}
                      <div className="mt-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Registration ID
                          </div>
                          <div className="text-lg sm:text-xl font-mono font-black tracking-wider text-[#F26522]">
                            {registeredData.registrationId}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(registeredData.registrationId, 'regId')}
                          className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1"
                        >
                          {copiedField === 'regId' ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Perforated Ticket Notches & Tear Line */}
                    <div className="relative flex items-center justify-between py-1">
                      <div className="w-5 h-7 bg-slate-50 rounded-r-full border-r border-y border-slate-300/40 shadow-inner -ml-0.5" />
                      <div className="flex-1 border-b-2 border-dashed border-slate-700/80 mx-2" />
                      <div className="w-5 h-7 bg-slate-50 rounded-l-full border-l border-y border-slate-300/40 shadow-inner -mr-0.5" />
                    </div>

                    {/* QR Code Stub Section */}
                    {registeredData.qrCode && (
                      <div className="p-6 pt-3 bg-white/5 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="bg-white p-2.5 rounded-2xl shadow-xl flex-shrink-0 border border-slate-200">
                          <img 
                            src={getMediaUrl(registeredData.qrCode)} 
                            alt={`QR Code Pass for ${registeredData.registrationId}`} 
                            className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-lg"
                          />
                        </div>

                        <div className="space-y-2 flex-1">
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-300 tracking-wider uppercase bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                            <QrCode className="w-3.5 h-3.5 text-sky-400" />
                            Express Counter QR Pass
                          </div>

                          <div className="text-xs text-slate-300 leading-relaxed">
                            Present this scan code at the <strong className="text-white">Reception Hall A</strong> counter for instant express check-in and delegate kit collection.
                          </div>

                          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              ₹{registeredData.paymentAmount || 1}.00 Paid
                            </span>
                            <span className="text-[11px] text-slate-400">
                              • Valid for All 3 Days
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Badge Download & Print Bar */}
                  <div className="flex items-center gap-3 pt-1">
                    {registeredData.qrCode && (
                      <a
                        href={getMediaUrl(registeredData.qrCode)}
                        download={`MVCON2027_${registeredData.registrationId}_Pass.png`}
                        className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Download className="w-4 h-4 text-slate-600" />
                        Save QR Pass Image
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Printer className="w-4 h-4 text-slate-600" />
                      Print Official Pass
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: RECEIPT, CREDENTIALS & NEXT STEPS (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* Card 1: Official Payment & Verification Receipt */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                          Payment Receipt
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        ₹{registeredData.paymentAmount || 1}.00 Paid
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Status:</span>
                        <span className="font-bold text-emerald-600">Authorized & Captured</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Payment Gateway:</span>
                        <span className="font-semibold text-slate-700">Razorpay Live</span>
                      </div>
                      {registeredData.razorpayPaymentId && (
                        <div className="flex justify-between items-center text-slate-500">
                          <span>Razorpay Ref:</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(registeredData.razorpayPaymentId || '', 'rzpId')}
                            className="font-mono text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded border border-sky-200"
                          >
                            <span className="truncate max-w-[130px]">{registeredData.razorpayPaymentId}</span>
                            {copiedField === 'rzpId' ? (
                              <CheckCheck className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-500">
                        <span>Registered Email:</span>
                        <span className="font-semibold text-slate-700 truncate max-w-[170px]">{registeredData.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Account Login Credentials Notice */}
                  <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1F83C6] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#1F83C6]/20">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-black uppercase tracking-wider text-slate-900">
                          Portal Password Sent to Email
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Your attendee account is ready. A random secure login password has been sent to <strong className="text-slate-900 font-bold">{registeredData.email}</strong>.
                        </p>
                        <div className="pt-2">
                          <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F83C6] hover:text-[#156ca5] transition-colors group"
                          >
                            Access Delegate Portal
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Conference Day-1 Checklist */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#F26522]" />
                      Next Steps for MVCON 2027
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center flex-shrink-0 text-[11px]">
                          1
                        </span>
                        <span>Save or screenshot your QR pass above for easy access.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center flex-shrink-0 text-[11px]">
                          2
                        </span>
                        <span>Check in at Hall A registration desk on Feb 20, 2027.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center flex-shrink-0 text-[11px]">
                          3
                        </span>
                        <span>Collect your physical RFID delegate badge & conference kit.</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 pt-2">
                    <Link 
                      href="/dashboard" 
                      className="w-full py-4 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-xl font-extrabold text-sm shadow-md shadow-[#1F83C6]/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                    >
                      Login to Delegate Portal
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button 
                      type="button"
                      onClick={() => {
                        setRegisteredData(null);
                        setCurrentStep(1);
                        setFormData({
                          fullName: '',
                          institution: '',
                          email: '',
                          phone: '',
                          profession: '',
                          designation: '',
                          stateMedicalCouncilNumber: '',
                          city: '',
                          state: '',
                          couponCode: '',
                        });
                        setProfilePhoto(null);
                        setOtpValues(['', '', '', '', '', '']);
                      }}
                      className="w-full py-3 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl font-bold text-xs transition-all"
                    >
                      Register Another Attendee
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <>
              {/* Stepper Progress */}
              <div className="mb-12 px-4 sm:px-12 md:px-16">
                <div className="flex justify-between items-center relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0" />
                  
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#1F83C6] rounded-full z-0 transition-all duration-500 ease-in-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  />

                  {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                      <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          isActive ? 'bg-[#1F83C6] text-white shadow-lg shadow-[#1F83C6]/30 scale-110' : 
                          isCompleted ? 'bg-[#1F83C6] text-white' : 
                          'bg-white text-slate-400 border-2 border-slate-200'
                        }`}>
                          {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                        </div>
                        <span className={`absolute top-12 whitespace-nowrap text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? 'text-[#1F83C6]' : 
                          isCompleted ? 'text-slate-700' : 
                          'text-slate-400'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Error Message Banner with Dismiss Button */}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm font-medium">{errorMessage}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-400 hover:text-red-700 p-0.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              <form 
                className="mt-16 min-h-[380px]" 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep === 3 && canSubmitStep3) {
                    handleInitiateOtp(e);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && currentStep < steps.length && (e.target as HTMLElement).tagName === 'INPUT') {
                    e.preventDefault();
                    handleNext();
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Personal Details */}
                  {currentStep === 1 && (
                    <motion.div
                      id="step1"
                      key="step1"
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                          </div>
                          <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required 
                            placeholder="Full Name" 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                          />
                        </div>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Building2 className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                          </div>
                          <input 
                            type="text" 
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            required 
                            placeholder="Institution" 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                            </div>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required 
                              placeholder="Email Address (OTP will be sent here)" 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                            />
                          </div>

                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                            </div>
                            <input 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required 
                              placeholder="Phone Number" 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                            />
                          </div>
                        </div>

                        {/* Profile Photo Upload */}
                        <label className="mt-6 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 bg-slate-50 hover:bg-slate-100 hover:border-[#1F83C6] transition-colors group cursor-pointer relative">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setProfilePhoto(e.target.files[0]);
                              }
                            }}
                          />
                          {profilePhoto ? (
                            <div className="flex flex-col items-center gap-3 w-full">
                              <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden group-hover:shadow-lg transition-shadow">
                                <img 
                                  src={URL.createObjectURL(profilePhoto)} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Upload className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-bold text-slate-700 max-w-[200px] truncate">{profilePhoto.name}</p>
                                <p className="text-xs text-[#1F83C6] mt-1 font-medium">Click to change photo</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:shadow-md transition-shadow">
                                <Upload className="w-6 h-6 text-[#1F83C6]" />
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-bold text-slate-700">Click to upload profile photo (Optional)</p>
                                <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                              </div>
                            </>
                          )}
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Professional Profile */}
                  {currentStep === 2 && (
                    <motion.div
                      id="step2"
                      key="step2"
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors z-10" />
                          </div>
                          <select 
                            name="profession"
                            value={formData.profession}
                            onChange={handleInputChange}
                            required 
                            className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 appearance-none relative z-0"
                          >
                            <option value="" disabled>Select your Profession</option>
                            <option value="PG">Post Graduate (PG)</option>
                            <option value="Delegates">Delegates</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 z-10">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                          </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Award className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                          </div>
                          <input 
                            type="text" 
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            required 
                            placeholder="Designation" 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                          />
                        </div>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <ShieldCheck className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                          </div>
                          <input 
                            type="text" 
                            name="stateMedicalCouncilNumber"
                            value={formData.stateMedicalCouncilNumber}
                            onChange={handleInputChange}
                            required 
                            placeholder="State Medical Council Number" 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Location & Billing */}
                  {currentStep === 3 && (
                    <motion.div
                      id="step3"
                      key="step3"
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                            </div>
                            <input 
                              type="text" 
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required 
                              placeholder="City" 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                            />
                          </div>

                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Map className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                            </div>
                            <input 
                              type="text" 
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              required 
                              placeholder="State" 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Ticket className="h-5 w-5 text-[#F26522]/50 group-focus-within:text-[#F26522] transition-colors" />
                          </div>
                          <input 
                            type="text" 
                            name="couponCode"
                            value={formData.couponCode}
                            onChange={handleInputChange}
                            placeholder="Coupon Code (Optional)" 
                            className="w-full pl-12 pr-4 py-4 bg-orange-50/50 border border-orange-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 focus:border-[#F26522] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                          />
                        </div>

                        {/* Registration Fee Summary Card */}
                        <div className="p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/80 rounded-2xl flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1F83C6]/10 text-[#1F83C6] flex items-center justify-center font-bold text-lg">
                              ₹
                            </div>
                            <div>
                              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Official Registration Fee</div>
                              <div className="text-[11px] text-slate-500">Secure payment processed via Razorpay</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black text-[#0b1623]">₹1.00</div>
                            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block">Online Delegate Access</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={prevStep}
                    disabled={currentStep === 1 || isSubmitting || isSendingOtp}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                      currentStep === 1 || isSubmitting || isSendingOtp
                        ? 'text-slate-300 cursor-not-allowed opacity-0' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  
                  {currentStep < steps.length ? (
                    <button 
                      key="step-continue-btn"
                      type="button" 
                      onClick={handleNext}
                      disabled={isSubmitting || isSendingOtp}
                      className="flex items-center gap-2 px-8 py-3 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-xl font-bold shadow-md shadow-[#1F83C6]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      key="step-verify-btn"
                      type="button" 
                      onClick={handleInitiateOtp}
                      disabled={isSubmitting || isSendingOtp || !canSubmitStep3}
                      className={`flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#eab308] via-[#f97316] to-[#ef4444] text-white rounded-xl font-bold shadow-md transition-all ${
                        !canSubmitStep3 || isSubmitting || isSendingOtp
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'hover:opacity-95 hover:-translate-y-0.5 cursor-pointer'
                      }`}
                    >
                      {isSendingOtp ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Sending OTP...
                        </>
                      ) : (
                        <>
                          Verify & Complete <KeyRound className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}

        </div>
      </div>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
            >
              {/* Modal Top Banner */}
              <div className="bg-[#0b1623] p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F83C6] rounded-full filter blur-2xl opacity-30" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F26522] rounded-full filter blur-2xl opacity-20" />
                
                <button 
                  onClick={() => setShowOtpModal(false)}
                  disabled={isVerifyingOtp}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#1F83C6]">
                  <KeyRound className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">Verify Your Email</h3>
                <p className="text-xs text-slate-300">
                  Enter the 6-digit code sent to:
                </p>
                <p className="text-sm font-semibold text-[#4facfe] truncate px-4 mt-0.5">
                  {formData.email}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">

                {/* Error Banner */}
                {otpError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 text-xs font-medium"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{otpError}</span>
                  </motion.div>
                )}

                {/* 6 Individual Digit Inputs */}
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otpValues.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpInputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onFocus={(e) => e.target.select()}
                      className={`w-12 h-14 text-center text-2xl font-bold font-mono rounded-xl border-2 transition-all outline-none ${
                        digit 
                          ? 'border-[#1F83C6] bg-blue-50/40 text-slate-900 shadow-sm' 
                          : 'border-slate-200 bg-slate-50 text-slate-700 focus:border-[#1F83C6] focus:bg-white focus:ring-2 focus:ring-[#1F83C6]/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Resend OTP Section */}
                <div className="text-center text-xs text-slate-500">
                  {resendCooldown > 0 ? (
                    <p>
                      Resend code in <span className="font-bold text-slate-700">{resendCooldown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSendingOtp}
                      className="inline-flex items-center gap-1.5 font-bold text-[#1F83C6] hover:text-[#156ca5] hover:underline"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSendingOtp ? 'animate-spin' : ''}`} />
                      Resend verification code
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleVerifyAndSubmit}
                    disabled={isVerifyingOtp || isProcessingPayment || otpValues.join('').length !== 6}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white text-base bg-gradient-to-r from-[#1F83C6] to-[#0e4b75] hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#1F83C6]/20 transition-all cursor-pointer"
                  >
                    {isVerifyingOtp || isProcessingPayment ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Verifying & Launching Payment...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" /> Verify OTP & Pay ₹1.00
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    disabled={isVerifyingOtp}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel / Edit Information
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
