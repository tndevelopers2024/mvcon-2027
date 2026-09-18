"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, User, Mail, Phone, Building2, MapPin, 
  QrCode, Download, Printer, 
  ExternalLink, LogOut, Copy, Check, KeyRound, AlertCircle, 
  CheckCircle2, Loader2, Sparkles,
  Eye, EyeOff, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AttendeeUser {
  id: string;
  email: string;
  fullName: string;
  registrationId: string;
  profession?: string;
  designation?: string;
  institution?: string;
  phone?: string;
  city?: string;
  state?: string;
  stateMedicalCouncilNumber?: string;
  couponCode?: string;
  profilePhoto?: string;
  qrCode?: string;
  role?: string;
  createdAt?: string;
}

export default function AttendeeDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AttendeeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pass' | 'security'>('pass');
  const [copiedId, setCopiedId] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  // Password update form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    const savedUserStr = localStorage.getItem('mvcon_user');
    const token = localStorage.getItem('mvcon_token');

    if (!savedUserStr) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUserStr);
      setUser(parsedUser);

      // Fetch fresh data from backend
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      fetch(`${backendUrl}/api/auth/me?email=${encodeURIComponent(parsedUser.email)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('mvcon_user', JSON.stringify(data.user));
          }
        })
        .catch((err) => console.error('Error refreshing attendee profile:', err))
        .finally(() => setIsLoading(false));
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('mvcon_token');
    localStorage.removeItem('mvcon_user');
    router.push('/login');
  };

  const copyRegistrationId = () => {
    if (user?.registrationId) {
      navigator.clipboard.writeText(user.registrationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handlePrintBadge = () => {
    window.print();
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const token = localStorage.getItem('mvcon_token');

      const res = await fetch(`${backendUrl}/api/auth/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          email: user?.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update password.');
      }

      setPasswordSuccess('Your password has been updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Unable to update password. Please check your current password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#1F83C6] mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading your attendee portal...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100/80 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Print styles for physical badge printing */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #mvcon-dashboard-badge, #mvcon-dashboard-badge * {
            visibility: visible;
          }
          #mvcon-dashboard-badge {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 480px !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: 2px solid #94a3b8 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="max-w-8xl mx-auto space-y-6">
        
        {/* Admin notice if admin visits this page */}
        {user.role === 'admin' && (
          <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-center justify-between text-amber-950 text-sm shadow-sm">
            <span>You are currently signed in with an <strong>Administrator</strong> account.</span>
            <Link 
              href="/admin" 
              className="font-bold text-amber-950 underline hover:no-underline"
            >
              Go to Admin Dashboard →
            </Link>
          </div>
        )}

        {/* Hero Header Banner - Light Crisp Executive Theme */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 relative shadow-md border border-slate-200">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  Verified Attendee
                </span>
                {user.profession && (
                  <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm text-white ${
                    user.profession.toLowerCase().includes('pg') || user.profession === 'PG'
                      ? 'bg-purple-600'
                      : 'bg-[#1F83C6]'
                  }`}>
                    {user.profession}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                {user.fullName}
              </h1>

              <div className="text-sm text-slate-700 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-medium">
                {user.institution && (
                  <span className="flex items-center gap-1.5 text-slate-800">
                    <Building2 className="w-4 h-4 text-[#1F83C6]" />
                    {user.institution}
                  </span>
                )}
                {user.city && (
                  <span className="flex items-center gap-1.5 text-slate-800">
                    <MapPin className="w-4 h-4 text-[#F26522]" />
                    {user.city}, {user.state}
                  </span>
                )}
              </div>
            </div>

            {/* Registration ID Chip & Logout Button */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3">
              <div className="bg-slate-900 text-white border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-md">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Registration ID
                  </div>
                  <div className="text-base font-mono font-black text-amber-400 tracking-wider">
                    {user.registrationId || 'PENDING'}
                  </div>
                </div>
                {user.registrationId && (
                  <button
                    onClick={copyRegistrationId}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
                    title="Copy Registration ID"
                  >
                    {copiedId ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors px-3 py-1.5 rounded-xl shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Tab Navigation & Register Action */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'pass', label: 'Delegate Pass & QR', icon: QrCode },
                { id: 'security', label: 'Security & Password', icon: KeyRound },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                      isActive
                        ? 'bg-[#1F83C6] border-[#1F83C6] text-white shadow-md shadow-[#1F83C6]/20'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <Link
              href="/register"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#F26522] to-[#ff7a3d] hover:from-[#d95316] hover:to-[#e8662e] text-white shadow-md shadow-[#F26522]/20 transition-all hover:scale-105 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              Register Another Person
            </Link>
          </div>
        </div>

        {/* Tab Contents */}
        <div>
          {/* TAB 1: PASS & QR CODE */}
          {activeTab === 'pass' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Main Badge Card - Crisp High-Contrast Pass */}
              <div 
                id="mvcon-dashboard-badge"
                ref={printableRef}
                className="lg:col-span-2 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-slate-200 relative overflow-hidden"
              >
                {/* Lanyard Slot / Notch */}
                <div className="w-16 h-2 mx-auto bg-slate-300 rounded-full shadow-inner mb-5" />

                {/* Badge Top Header */}
                <div className="flex justify-between items-center pb-5 border-b-2 border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1F83C6] to-[#125887] text-white flex items-center justify-center font-black text-sm shadow-md">
                      MV
                    </div>
                    <div>
                      <div className="text-xl font-black tracking-wider text-slate-900">MVCON 2027</div>
                      <div className="text-xs text-slate-600 font-medium">Annual Medical Conference & Exhibition</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3.5 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                      Official Entry Pass
                    </span>
                  </div>
                </div>

                {/* Badge Middle Details & QR */}
                <div className="py-6 flex flex-col md:flex-row items-center gap-8 justify-between">
                  <div className="space-y-5 flex-1 text-left">
                    <div>
                      <div className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Delegate Name</div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 tracking-tight">{user.fullName}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-700 block uppercase font-extrabold mb-1.5 text-[11px] tracking-wider">Category</span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm text-white ${
                          user.profession?.toLowerCase().includes('pg') || user.profession === 'PG'
                            ? 'bg-purple-600'
                            : 'bg-[#1F83C6]'
                        }`}>
                          {user.profession || 'Delegate'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-700 block uppercase font-extrabold mb-1.5 text-[11px] tracking-wider">Designation</span>
                        <span className="text-slate-900 font-bold text-sm truncate block">{user.designation || 'Specialist'}</span>
                      </div>
                      <div>
                        <span className="text-slate-700 block uppercase font-extrabold mb-1.5 text-[11px] tracking-wider">Council No.</span>
                        <span className="text-slate-900 font-mono font-bold text-xs bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg inline-block">
                          {user.stateMedicalCouncilNumber || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-700 block uppercase font-extrabold mb-1.5 text-[11px] tracking-wider">Venue Entry</span>
                        <span className="text-emerald-950 font-black bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full inline-block text-xs shadow-sm">
                          All Scientific Halls
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-[11px] font-extrabold uppercase text-slate-700 tracking-wider">Registration ID</div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-[#F26522] rounded-xl shadow-sm mt-1">
                        <span className="text-xl sm:text-2xl font-mono font-black text-[#d94a08] tracking-widest">
                          {user.registrationId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Unique QR Code Container */}
                  <div className="flex flex-col items-center bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex-shrink-0 text-center shadow-sm">
                    {user.qrCode ? (
                      <div className="bg-white p-2.5 rounded-xl shadow-md border-2 border-slate-200">
                        <img 
                          src={user.qrCode} 
                          alt="Entry QR Code" 
                          className="w-40 h-40 object-contain rounded"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 bg-slate-200 rounded-xl flex items-center justify-center text-slate-600 font-bold text-xs">
                        QR Code Generating...
                      </div>
                    )}
                    <div className="text-xs font-mono font-black text-slate-800 mt-2.5 tracking-wider uppercase flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-[#1F83C6]" />
                      Reception Scan Pass
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium mt-0.5 max-w-[160px]">
                      Show this at conference gate
                    </span>
                  </div>
                </div>

                {/* Badge Bottom Footer */}
                <div className="pt-4 border-t-2 border-slate-100 flex flex-wrap justify-between items-center text-xs text-slate-700 font-medium gap-2">
                  <span className="font-bold text-slate-900">Dates: Feb 20 - 22, 2027</span>
                  <span className="text-slate-700 font-semibold">Chennai Trade Centre, India</span>
                  <span className="font-mono text-[11px] text-emerald-800 font-black tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    SECURE VERIFIED PASS
                  </span>
                </div>
              </div>

              {/* Pass Actions & Instructions Side Column */}
              <div className="space-y-6">
                {/* Download & Print Actions Card */}
                <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#1F83C6]" />
                    Pass Actions
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Keep your pass handy on your mobile device or print a copy for quick badge collection at the registration counter.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {user.qrCode && (
                      <a
                        href={user.qrCode}
                        download={`MVCON2027_${user.registrationId}_Pass.png`}
                        className="w-full py-3 px-4 bg-[#1F83C6] hover:bg-[#156ca5] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#1F83C6]/20"
                      >
                        <Download className="w-4 h-4" />
                        Download QR Code Image
                      </a>
                    )}
                    <Link
                      href="/register"
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#F26522] to-[#ff7a3d] hover:from-[#d95316] hover:to-[#e8662e] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#F26522]/20 hover:-translate-y-0.5"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register Another Person
                    </Link>
                  </div>
                </div>

                {/* Conference Day Instructions */}
                <div className="bg-sky-50/80 border-2 border-sky-200 rounded-3xl p-6 space-y-3 shadow-sm">
                  <div className="text-xs font-black uppercase tracking-wider text-[#1F83C6] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#1F83C6]" />
                    Venue Check-In Guide
                  </div>
                  <ul className="text-xs text-slate-700 space-y-2.5 leading-relaxed font-medium">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F83C6] mt-1.5 flex-shrink-0" />
                      <span>Head to <strong>Counter A (Pre-Registered Attendees)</strong> upon arrival.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F83C6] mt-1.5 flex-shrink-0" />
                      <span>Present this QR Code on your mobile phone for rapid badge printing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F83C6] mt-1.5 flex-shrink-0" />
                      <span>Collect your delegate conference kit, scientific bag, and meal tokens.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-slate-200 max-w-xl mx-auto space-y-6"
            >
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#1F83C6]" />
                  Change Password
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Update your attendee portal password. Remember to keep it secure.
                </p>
              </div>

              {passwordSuccess && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 rounded-2xl text-xs flex items-center gap-2 font-bold shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              {passwordError && (
                <div className="p-4 bg-red-50 border-2 border-red-300 text-red-950 rounded-2xl text-xs flex items-center gap-2 font-bold shadow-sm">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password (sent via email)"
                      className="w-full pl-4 pr-11 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F83C6] focus:border-[#1F83C6] transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                      aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min. 6 characters)"
                      className="w-full pl-4 pr-11 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F83C6] focus:border-[#1F83C6] transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-4 pr-11 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F83C6] focus:border-[#1F83C6] transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="w-full py-3.5 bg-[#1F83C6] hover:bg-[#156ca5] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#1F83C6]/20 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isUpdatingPassword ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      'Save New Password'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
