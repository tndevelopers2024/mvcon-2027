"use client";

import React, { useState } from 'react';
import { 
  User, Building2, Upload, Mail, Phone, Briefcase, 
  Award, MapPin, Map, Ticket, ShieldCheck, ArrowRight, 
  ArrowLeft, Check, AlertCircle, Loader2, PartyPopper 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const steps = [
  { id: 1, title: "Personal Details" },
  { id: 2, title: "Professional Profile" },
  { id: 3, title: "Location & Billing" }
];

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
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleNext = () => {
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
    nextStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Build FormData for multipart upload (supports file + fields)
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (profilePhoto) {
        data.append('profilePhoto', profilePhoto);
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/register';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed. Please check your details and try again.');
      }

      setRegisteredData({
        registrationId: result.registrationId || result.data?.registrationId,
        fullName: result.data?.fullName || formData.fullName,
        email: result.data?.email || formData.email,
        institution: result.data?.institution || formData.institution,
        profession: result.data?.profession || formData.profession,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to the registration server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
        
        {/* Header section with brand colors */}
        <div className="bg-[#0b1623] p-10 text-center relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-[#1F83C6] rounded-full mix-blend-screen filter blur-[80px] opacity-40" />
          <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-[#F26522] rounded-full mix-blend-screen filter blur-[80px] opacity-30" />
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 relative z-10">MVCON 2027 Registration</h1>
          <p className="text-slate-400 font-medium relative z-10 mb-4">Secure your spot in 3 easy steps</p>
          
          <div className="relative z-10 inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full">
            <span className="text-slate-300 text-sm">Already registered? </span>
            <Link href="/login" className="!text-white font-bold text-sm hover:!text-[#4facfe] transition-colors">
              Sign in here
            </Link>
          </div>
        </div>

        <div className="p-8 md:p-12">
          
          {/* Success Screen */}
          {registeredData ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <PartyPopper className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Registration Successful!</h2>
                <p className="text-slate-600 font-medium">Welcome to MVCON 2027, <span className="font-bold text-slate-900">{registeredData.fullName}</span>!</p>
              </div>

              {/* Registration Pass / ID Card */}
              <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-[#0b1623] text-white p-6 rounded-2xl shadow-xl border border-slate-800 text-left relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#1F83C6]/20 rounded-full blur-2xl" />
                <div className="text-xs uppercase tracking-wider text-[#1F83C6] font-bold mb-1">Official Registration ID</div>
                <div className="text-2xl font-mono font-extrabold tracking-widest text-[#F26522] mb-4">
                  {registeredData.registrationId}
                </div>

                <div className="space-y-1 text-sm border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-slate-400">
                    <span>Email:</span>
                    <span className="text-white font-medium">{registeredData.email}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Institution:</span>
                    <span className="text-white font-medium">{registeredData.institution}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Profession:</span>
                    <span className="text-white font-medium">{registeredData.profession}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status:</span>
                    <span className="text-amber-400 font-bold">Pending Payment</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link 
                  href="/login" 
                  className="px-8 py-3.5 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-xl font-bold shadow-md shadow-[#1F83C6]/20 transition-all hover:-translate-y-0.5"
                >
                  Go to Login
                </Link>
                <button 
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
                  }}
                  className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                >
                  Register Another Attendee
                </button>
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

              {/* Error Message Banner */}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm font-medium">{errorMessage}</div>
                </motion.div>
              )}

              <form className="mt-16 min-h-[380px]" onSubmit={handleSubmit}>
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
                              placeholder="Email Address" 
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
                            <option value="Consultant">Consultant</option>
                            <option value="Student">Student</option>
                            <option value="Other">Other</option>
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
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={prevStep}
                    disabled={currentStep === 1 || isSubmitting}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                      currentStep === 1 || isSubmitting
                        ? 'text-slate-300 cursor-not-allowed opacity-0' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  
                  {currentStep < steps.length ? (
                    <button 
                      type="button" 
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-xl font-bold shadow-md shadow-[#1F83C6]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#eab308] via-[#f97316] to-[#ef4444] hover:opacity-90 disabled:opacity-60 text-white rounded-xl font-bold shadow-md transition-all hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Complete Registration <Check className="w-5 h-5" />
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
    </div>
  );
}
