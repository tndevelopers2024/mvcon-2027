"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Upload, CheckCircle2, AlertCircle, 
  Send, Loader2, Sparkles, ArrowRight, FileCheck, FileText
} from 'lucide-react';
import Link from 'next/link';

// Custom event helper for triggering the modal from any component
export const openAbstractModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-abstract-submission-modal'));
  }
};

interface AbstractSubmitButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function AbstractSubmitButton({ children, className }: AbstractSubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={openAbstractModal}
      className={className || "inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-orange-500/30 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 cursor-pointer"}
    >
      {children || (
        <>
          <FileText className="w-5 h-5" />
          Submit Abstract Online
        </>
      )}
    </button>
  );
}

export default function AbstractSubmissionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State - only the requested inputs
  const [formData, setFormData] = useState({
    registrationId: '',
    presentingAuthor: '',
    email: '',
    phone: '',
    institution: '',
    department: '',
  });

  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for open events
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
      setErrorMessage(null);
    };

    window.addEventListener('open-abstract-submission-modal', handleOpen);
    return () => window.removeEventListener('open-abstract-submission-modal', handleOpen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage('File size exceeds 15MB limit. Please upload a smaller file.');
        return;
      }
      setAbstractFile(file);
      if (errorMessage) setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!abstractFile) {
      setErrorMessage('Please upload your abstract file (.doc, .docx, or .pdf).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build FormData for multipart payload
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        payload.append(key, String(val));
      });
      if (abstractFile) {
        payload.append('abstractFile', abstractFile);
      }

      // Send to backend API
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/abstracts`, {
        method: 'POST',
        body: payload,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Submission failed. Please check your details and try again.');
      }

      setSubmissionId(data.submissionId);
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      registrationId: '',
      presentingAuthor: '',
      email: '',
      phone: '',
      institution: '',
      department: '',
    });
    setAbstractFile(null);
    setIsSuccess(false);
    setErrorMessage(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#041E42] via-[#0A3D73] to-[#1F83C6] p-6 sm:p-7 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10 pr-12">
            <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" /> MVCON 2027 • Official Submission Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Submit Your Abstract
            </h2>
            <p className="text-white/80 text-sm mt-1 font-medium">
              Please enter your details and upload your abstract document below.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            /* Success Confirmation Screen */
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-5 border border-green-200 shadow-xl shadow-green-500/10">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#1F83C6] font-bold mb-1">Submission Confirmed</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
                Abstract Submitted Successfully!
              </h3>
              
              <div className="mt-3 mb-6 bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl inline-flex flex-col items-center">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Your Abstract Reference ID</span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#F26522] tracking-wider mt-1">{submissionId}</span>
              </div>

              <div className="max-w-md text-slate-600 text-sm space-y-2 mb-8 bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-left">
                <p className="font-semibold text-slate-800">
                  Confirmation sent to <strong className="text-slate-900">{formData.email}</strong>
                </p>
                <p className="text-slate-600 text-xs">
                  The Scientific Committee will review your submission and communicate further updates via email.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary px-8 py-3 rounded-xl font-bold text-sm cursor-pointer shadow-md"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary px-6 py-3 rounded-xl font-bold text-sm cursor-pointer"
                >
                  Submit Another Abstract
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mandatory Registration Helper */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 text-sm">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="font-medium text-xs sm:text-sm">
                    <strong className="text-amber-950 font-bold">Conference Registration is Mandatory:</strong> Enter your valid MVCON 2027 Registration ID.
                  </p>
                </div>
                <Link
                  href="/register"
                  target="_blank"
                  className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  Register Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  {errorMessage}
                </div>
              )}

              {/* Input Fields Grid (as per screenshot) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* MVCON 2027 REGISTRATION ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    MVCON 2027 REGISTRATION ID <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="registrationId"
                    required
                    placeholder="e.g. MVCON-2027-1042"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F83C6] focus:ring-2 focus:ring-[#1F83C6]/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all font-mono"
                  />
                </div>

                {/* PRESENTING AUTHOR FULL NAME */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    PRESENTING AUTHOR FULL NAME <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="presentingAuthor"
                    required
                    placeholder="e.g. Dr. John Doe"
                    value={formData.presentingAuthor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F83C6] focus:ring-2 focus:ring-[#1F83C6]/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* EMAIL ADDRESS (FOR CORRESPONDENCE) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    EMAIL ADDRESS (FOR CORRESPONDENCE) <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. doctor@hospital.org"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F83C6] focus:ring-2 focus:ring-[#1F83C6]/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* MOBILE / WHATSAPP NUMBER */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    MOBILE / WHATSAPP NUMBER <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F83C6] focus:ring-2 focus:ring-[#1F83C6]/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* INSTITUTION / HOSPITAL / COLLEGE */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    INSTITUTION / HOSPITAL / COLLEGE <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    required
                    placeholder="e.g. Apollo Hospitals / Madras Medical College"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F83C6] focus:ring-2 focus:ring-[#1F83C6]/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* DEPARTMENT & DESIGNATION */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    DEPARTMENT &amp; DESIGNATION
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Dept. of Endocrinology, Senior Resident"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F83C6] focus:ring-2 focus:ring-[#1F83C6]/20 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* UPLOAD FILE INPUT */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  UPLOAD ABSTRACT FILE (.DOC, .DOCX, .PDF) <span className="text-red-500 font-bold">*</span>
                </label>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    abstractFile 
                      ? 'border-green-400 bg-green-50/40' 
                      : 'border-slate-300 hover:border-[#1F83C6] bg-slate-50/70 hover:bg-blue-50/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".doc,.docx,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {abstractFile ? (
                    <div className="flex items-center justify-center gap-4 text-slate-800">
                      <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <FileCheck className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-slate-900">{abstractFile.name}</p>
                        <p className="text-xs text-slate-500">{(abstractFile.size / 1024).toFixed(1)} KB • Click to change file</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-500 mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-sm text-slate-800">
                        Click here to upload your abstract file
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supported formats: Word document (.doc, .docx) or PDF (.pdf) • Max 15MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Abstract...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Abstract
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
