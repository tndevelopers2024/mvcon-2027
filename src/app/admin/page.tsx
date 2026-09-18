"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, GraduationCap, Stethoscope, Search, 
  Download, RefreshCw, LogOut, ShieldCheck, Mail, Phone, 
  MapPin, Building2, Calendar, CheckCircle2, Award, 
  ExternalLink, Copy, Check, Filter, X, QrCode,
  Scan, Activity, CalendarDays, CheckCheck, Layers, Eye,
  FileText, FileDown, Trash2, Paperclip, FileCheck, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminQrScannerModal from '@/components/AdminQrScannerModal';

interface AbstractSubmission {
  _id: string;
  submissionId: string;
  registrationId: string;
  presentingAuthor: string;
  email: string;
  phone: string;
  institution: string;
  department?: string;
  fileUrl: string;
  fileName: string;
  originalFileName: string;
  fileSize: number;
  mimeType: string;
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface Attendee {
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
  couponCode?: string;
  profilePhoto?: string;
  qrCode?: string;
  paymentAmount?: number;
  razorpayPaymentId?: string;
  paymentStatus: string;
  registrationStatus: string;
  checkedIn?: boolean;
  checkInTime?: string | null;
  createdAt: string;
}

interface DateWiseScan {
  date: string;
  uniqueAttendees: number;
  pgCount: number;
  delegateCount: number;
  totalRawScans: number;
  duplicatesFiltered: number;
}

interface ScanStats {
  totalRegistered: number;
  totalOverallUniqueScans: number;
  totalRawScans: number;
  todayDate: string;
  todayUniqueScans: number;
  todayRawScans: number;
  todayDuplicatesFiltered: number;
  overallScanPercentage: number;
  dateWise: DateWiseScan[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pgs: 0,
    delegates: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfession, setSelectedProfession] = useState<string>('All');
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; fullName: string } | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanStats, setScanStats] = useState<ScanStats | null>(null);

  // Tab navigation state ('registrations' vs 'abstracts')
  const [activeMainTab, setActiveMainTab] = useState<'registrations' | 'abstracts'>('registrations');

  // Abstract Submissions State
  const [abstracts, setAbstracts] = useState<AbstractSubmission[]>([]);
  const [abstractSearchQuery, setAbstractSearchQuery] = useState('');
  const [selectedAbstract, setSelectedAbstract] = useState<AbstractSubmission | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Authentication check & initial data load
  useEffect(() => {
    const savedUserStr = localStorage.getItem('mvcon_user');
    if (!savedUserStr) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUserStr);
      if (parsedUser.role !== 'admin') {
        router.push('/login');
        return;
      }
      setAdminUser(parsedUser);
    } catch {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      
      // Fetch registrations
      const regRes = await fetch(`${backendUrl}/api/register`);
      const regData = await regRes.json();
      if (regData.success) {
        setAttendees(regData.data || []);
      }

      // Fetch stats
      const statsRes = await fetch(`${backendUrl}/api/auth/stats`);
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.stats);
      }

      // Fetch QR scan attendance analytics (deduplicated per day)
      const scanRes = await fetch(`${backendUrl}/api/register/scan-stats`);
      const scanData = await scanRes.json();
      if (scanData.success) {
        setScanStats(scanData.stats || scanData.data);
      }

      // Fetch scientific abstract submissions
      const absRes = await fetch(`${backendUrl}/api/abstracts`);
      const absData = await absRes.json();
      if (absData.success) {
        setAbstracts(absData.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mvcon_token');
    localStorage.removeItem('mvcon_user');
    router.push('/login');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export registrations to CSV
  const exportToCSV = () => {
    if (attendees.length === 0) return;

    const headers = [
      'Registration ID',
      'Full Name',
      'Email',
      'Phone',
      'Institution',
      'Profession',
      'Designation',
      'State Council Number',
      'City',
      'State',
      'Coupon Code',
      'Registration Date',
    ];

    const rows = filteredAttendees.map((a) => [
      a.registrationId,
      `"${a.fullName}"`,
      a.email,
      `"${a.phone}"`,
      `"${a.institution}"`,
      a.profession,
      `"${a.designation}"`,
      `"${a.stateMedicalCouncilNumber}"`,
      `"${a.city}"`,
      `"${a.state}"`,
      a.couponCode || '',
      new Date(a.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MVCON_2027_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered attendees
  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProfession =
      selectedProfession === 'All' || attendee.profession === selectedProfession;

    return matchesSearch && matchesProfession;
  });

  // Filtered abstracts
  const filteredAbstracts = abstracts.filter((abs) => {
    const q = abstractSearchQuery.toLowerCase();
    return (
      abs.presentingAuthor.toLowerCase().includes(q) ||
      abs.submissionId.toLowerCase().includes(q) ||
      abs.registrationId.toLowerCase().includes(q) ||
      abs.email.toLowerCase().includes(q) ||
      abs.institution.toLowerCase().includes(q) ||
      Boolean(abs.department && abs.department.toLowerCase().includes(q))
    );
  });

  // Export abstracts to CSV
  const exportAbstractsToCSV = () => {
    if (abstracts.length === 0) return;

    const headers = [
      'Submission ID',
      'Presenting Author',
      'Email',
      'Phone',
      'MVCON Registration ID',
      'Institution',
      'Department',
      'File Name',
      'File URL',
      'Status',
      'Submission Date',
    ];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const rows = filteredAbstracts.map((a) => [
      a.submissionId,
      `"${a.presentingAuthor}"`,
      a.email,
      `"${a.phone}"`,
      a.registrationId,
      `"${a.institution}"`,
      `"${a.department || ''}"`,
      `"${a.originalFileName}"`,
      `"${backendUrl}${a.fileUrl}"`,
      a.status,
      new Date(a.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MVCON_2027_Abstracts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Delete abstract
  const handleDeleteAbstract = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Are you sure you want to delete this abstract submission? This will also remove the attached document.')) return;
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/abstracts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAbstracts((prev) => prev.filter((a) => a._id !== id));
        if (selectedAbstract?._id === id) setSelectedAbstract(null);
      }
    } catch (err) {
      console.error('Failed to delete abstract:', err);
    }
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-5 text-white">
      {/* Top Branding & Navigation */}
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1F83C6] via-[#125887] to-[#F26522] flex items-center justify-center font-black text-white text-base shadow-lg shadow-sky-500/20">
              MV
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                MVCON 2027
              </div>
              <div className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                Admin Console
              </div>
            </div>
          </div>
          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-2">
            Main Management
          </div>

          <button
            onClick={() => {
              setActiveMainTab('registrations');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeMainTab === 'registrations'
                ? 'bg-[#1F83C6] text-white shadow-lg shadow-[#1F83C6]/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-sky-300" />
              <span>Registrations</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
              activeMainTab === 'registrations'
                ? 'bg-white/20 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {attendees.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveMainTab('abstracts');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeMainTab === 'abstracts'
                ? 'bg-[#F26522] text-white shadow-lg shadow-[#F26522]/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-orange-300" />
              <span>Abstract Submissions</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
              activeMainTab === 'abstracts'
                ? 'bg-white/20 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {abstracts.length}
            </span>
          </button>
        </div>

        {/* Quick Actions & Tools */}
        <div className="space-y-1.5 pt-4 border-t border-slate-800/80">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-2">
            Operations & Tools
          </div>

          <button
            onClick={() => {
              setIsScannerOpen(true);
              setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-sky-400" />
            <span>Scan QR Gate Pass</span>
          </button>

          <button
            onClick={() => {
              fetchData();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh All Data</span>
          </button>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Public Website</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
              Live
            </span>
          </Link>
        </div>
      </div>

      {/* Admin Profile & Sign Out (Bottom) */}
      <div className="pt-6 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm border border-sky-500/30">
            {adminUser?.fullName ? adminUser.fullName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">
              {adminUser?.fullName || 'Administrator'}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {adminUser?.email || 'admin@mvcon2027.com'}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row antialiased text-slate-800">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#0b1623] border-r border-slate-800/80 h-screen sticky top-0 flex-shrink-0 z-30 overflow-y-auto">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Top Header Bar */}
      <div className="md:hidden bg-[#0b1623] text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-1.5 -ml-1 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Open Sidebar Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1F83C6] to-[#F26522] flex items-center justify-center font-black text-white text-xs">
              MV
            </div>
            <span className="font-bold text-sm tracking-tight">MVCON Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="px-3 py-1.5 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            Scan
          </button>
        </div>
      </div>

      {/* Mobile Slide-over Drawer */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#0b1623] border-r border-slate-800 z-50 shadow-2xl h-full overflow-y-auto"
            >
              {renderSidebarContent()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 min-h-screen">
        {/* Desktop Top Bar */}
        <header className="hidden md:flex bg-white border-b border-slate-200/80 px-8 py-4 items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {activeMainTab === 'registrations' ? 'Conference Registrations & Attendance' : 'Scientific Abstract Submissions'}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {activeMainTab === 'registrations' 
                ? 'Manage delegate check-ins, admission verification, and registration database.'
                : 'Review uploaded medical abstracts, presenter submissions, and original files.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#1F83C6] to-[#125887] hover:from-[#156ca5] hover:to-[#0f4c81] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-sky-200" />
              Scan QR Pass
            </button>
            <button
              onClick={fetchData}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#1F83C6]' : ''}`} />
              Refresh
            </button>
          </div>
        </header>

        {/* Content Body Canvas */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {/* TAB 1: REGISTRATIONS & GATE ATTENDANCE */}
          {activeMainTab === 'registrations' && (
          <div className="space-y-8">
            {/* Analytics Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1F83C6] flex items-center justify-center font-bold">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{stats.total}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Registrations</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{stats.pgs}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Post Graduates (PG)</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{stats.delegates}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Delegates</div>
            </div>
          </div>
        </div>

        {/* Gate Scan & Attendance Tracking Analytics (Deduplicated Daily) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#1F83C6] flex items-center justify-center font-bold shadow-sm">
                <Scan className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
                  Gate Attendance & Scan Counts
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold uppercase tracking-wider">
                    Daily Deduplication Active
                  </span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Tracks overall scanned attendance and daily counts. Multiple scans of the same attendee on a single day count only once.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsScannerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F83C6] hover:bg-[#166ba3] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
            >
              <QrCode className="w-4 h-4" />
              Scan QR Pass
            </button>
          </div>

          {/* 4 Scan Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Overall Unique Scanned */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Unique Scans</span>
                <span className="p-2 rounded-xl bg-sky-50 text-[#1F83C6]">
                  <CheckCheck className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900">
                {scanStats?.totalOverallUniqueScans ?? 0}
                <span className="text-xs font-bold text-slate-400 ml-1.5 font-sans">
                  / {stats.total || scanStats?.totalRegistered || 0}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {scanStats?.overallScanPercentage ?? 0}% Total Attendance
              </div>
            </div>

            {/* Card 2: Today's Unique Scans (Deduplicated) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Unique Scans</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <CalendarDays className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900">
                {scanStats?.todayUniqueScans ?? 0}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500">
                Unique attendees today ({scanStats?.todayDate || 'Today'})
              </div>
            </div>

            {/* Card 3: Total Raw Scans */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Scans (All Gates)</span>
                <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900">
                {scanStats?.totalRawScans ?? 0}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500">
                Raw QR scans logged across all gates
              </div>
            </div>

            {/* Card 4: Duplicates Filtered Today */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Duplicates Filtered</span>
                <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Activity className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-amber-600">
                {scanStats?.todayDuplicatesFiltered ?? 0}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500">
                Same-day re-scans excluded from inflating daily count
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filters, and Export Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, ID, or institution..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-800"
              />
            </div>

            {/* Profession Filter Tabs & Export Button */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'PG', 'Delegates'].map((prof) => (
                <button
                  key={prof}
                  onClick={() => setSelectedProfession(prof)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedProfession === prof
                      ? 'bg-[#1F83C6] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {prof === 'All' ? 'All Attendees' : prof}
                </button>
              ))}

              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-4 py-2 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                Scan Pass QR
              </button>

              <button
                onClick={exportToCSV}
                disabled={filteredAttendees.length === 0}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV ({filteredAttendees.length})
              </button>
            </div>

          </div>

          {/* Attendees Data Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Attendee</th>
                  <th className="py-3.5 px-4">Registration ID</th>
                  <th className="py-3.5 px-4">Profession & Role</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Council No.</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1F83C6]" />
                      Loading registrations...
                    </td>
                  </tr>
                ) : filteredAttendees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="font-semibold text-slate-600">No registered attendees found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {searchQuery ? 'Try adjusting your search query' : 'New registrations will appear here automatically'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredAttendees.map((attendee) => (
                    <tr 
                      key={attendee._id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedAttendee(attendee)}
                    >
                      {/* Name & Contact */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-[#1F83C6] transition-colors">
                          {attendee.fullName}
                        </div>
                        <div className="text-xs text-slate-500">{attendee.email}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{attendee.phone}</div>
                      </td>

                      {/* Registration ID with copy */}
                      <td className="py-4 px-4 font-mono font-bold text-xs text-[#F26522]">
                        <div className="flex items-center gap-1.5">
                          <span>{attendee.registrationId}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(attendee.registrationId);
                            }}
                            className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 transition-colors"
                            title="Copy Registration ID"
                          >
                            {copiedId === attendee.registrationId ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Verified
                          </span>
                          <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            ₹{attendee.paymentAmount || 1} Paid
                          </span>
                          {attendee.checkedIn ? (
                            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-600 text-white">
                              Checked In
                            </span>
                          ) : (
                            <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                              Not Admitted
                            </span>
                          )}
                          {attendee.qrCode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAttendee(attendee);
                              }}
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold text-sky-600 hover:bg-sky-50 rounded border border-sky-200"
                              title="View Entry QR Pass"
                            >
                              <QrCode className="w-3 h-3" />
                              QR
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Profession & Designation */}
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${
                          attendee.profession === 'PG' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {attendee.profession}
                        </span>
                        <div className="text-xs font-medium text-slate-600 mt-1 max-w-[160px] truncate">
                          {attendee.designation}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[160px]">
                          {attendee.institution}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 text-xs font-medium text-slate-600">
                        <div>{attendee.city}</div>
                        <div className="text-slate-400">{attendee.state}</div>
                      </td>

                      {/* Medical Council Number */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-600">
                        {attendee.stateMedicalCouncilNumber}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                        {new Date(attendee.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      {/* View Details Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAttendee(attendee);
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-[#1F83C6] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          </div>
        </div>
        )}

        {/* TAB 2: ABSTRACT SUBMISSIONS */}
        {activeMainTab === 'abstracts' && (
          <div className="space-y-8">
            {/* Abstract Analytics Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#F26522] flex items-center justify-center font-bold">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">{abstracts.length}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Abstracts Received</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1F83C6] flex items-center justify-center font-bold">
                  <FileCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">
                    {abstracts.filter((a) => a.registrationId).length}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">With Verified Reg ID</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Paperclip className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">
                    {abstracts.filter((a) => a.fileUrl).length}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Documents Attached</div>
                </div>
              </div>
            </div>

            {/* Abstracts Table Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={abstractSearchQuery}
                    onChange={(e) => setAbstractSearchQuery(e.target.value)}
                    placeholder="Search by author, ref ID, registration ID, institution..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 focus:border-[#F26522] focus:bg-white transition-all font-medium text-slate-800"
                  />
                </div>

                {/* Actions: Export CSV */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportAbstractsToCSV}
                    disabled={filteredAbstracts.length === 0}
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Abstracts CSV ({filteredAbstracts.length})
                  </button>
                </div>
              </div>

              {/* Abstracts Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Ref ID</th>
                      <th className="py-3.5 px-4">Presenting Author</th>
                      <th className="py-3.5 px-4">MVCON Reg ID</th>
                      <th className="py-3.5 px-4">Institution & Department</th>
                      <th className="py-3.5 px-4">Attached Document</th>
                      <th className="py-3.5 px-4">Submitted Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {isLoading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#F26522]" />
                          Loading abstract submissions...
                        </td>
                      </tr>
                    ) : filteredAbstracts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <FileText className="w-6 h-6" />
                          </div>
                          <p className="font-semibold text-slate-600">No abstract submissions found</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {abstractSearchQuery ? 'Try adjusting your search query' : 'Submitted abstracts from attendees will appear here automatically'}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredAbstracts.map((abs) => {
                        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
                        const fileDownloadUrl = `${backendUrl}${abs.fileUrl}`;
                        const isPdf = abs.fileName?.toLowerCase().endsWith('.pdf') || abs.mimeType?.includes('pdf');

                        return (
                          <tr
                            key={abs._id}
                            className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                            onClick={() => setSelectedAbstract(abs)}
                          >
                            {/* Ref ID */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-xs font-extrabold text-[#F26522]">
                                  {abs.submissionId}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(abs.submissionId);
                                  }}
                                  className="text-slate-400 hover:text-slate-600 p-1 rounded"
                                  title="Copy Submission ID"
                                >
                                  {copiedId === abs.submissionId ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </td>

                            {/* Author */}
                            <td className="py-4 px-4">
                              <div className="font-bold text-slate-900 group-hover:text-[#F26522] transition-colors">
                                {abs.presentingAuthor}
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3 text-slate-400" />
                                {abs.email}
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {abs.phone}
                              </div>
                            </td>

                            {/* Registration ID */}
                            <td className="py-4 px-4">
                              <span className="inline-block px-2.5 py-1 bg-sky-50 border border-sky-200 text-[#1F83C6] rounded-lg font-mono text-xs font-extrabold">
                                {abs.registrationId}
                              </span>
                            </td>

                            {/* Institution & Department */}
                            <td className="py-4 px-4">
                              <div className="font-semibold text-slate-800 text-xs max-w-[200px] truncate">
                                {abs.institution}
                              </div>
                              {abs.department && (
                                <div className="text-[11px] text-slate-500 max-w-[200px] truncate mt-0.5">
                                  {abs.department}
                                </div>
                              )}
                            </td>

                            {/* Attached File */}
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <a
                                href={fileDownloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={abs.originalFileName}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-700 text-xs font-bold transition-all shadow-2xs group/btn"
                                title={`Download ${abs.originalFileName}`}
                              >
                                <span className={`p-1 rounded-md text-white text-[9px] font-black ${isPdf ? 'bg-red-500' : 'bg-blue-600'}`}>
                                  {isPdf ? 'PDF' : 'DOC'}
                                </span>
                                <span className="max-w-[130px] truncate">{abs.originalFileName}</span>
                                <FileDown className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-orange-600 shrink-0" />
                              </a>
                            </td>

                            {/* Date */}
                            <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                              {new Date(abs.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedAbstract(abs)}
                                  className="px-2.5 py-1 text-xs font-bold text-[#F26522] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                                  title="View Abstract Details"
                                >
                                  View
                                </button>
                                <button
                                  onClick={(e) => handleDeleteAbstract(abs._id, e)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Abstract"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        </main>
      </div>

      {/* Attendee Full Profile Modal */}
      <AnimatePresence>
        {selectedAttendee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
            >
              <div className="bg-[#0b1623] p-6 text-white relative">
                <button
                  onClick={() => setSelectedAttendee(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-xs uppercase tracking-wider text-sky-400 font-bold mb-1">
                  Attendee Verification Card
                </div>
                <h3 className="text-2xl font-extrabold">{selectedAttendee.fullName}</h3>
                <p className="text-sm font-mono text-[#F26522] font-bold mt-1">
                  {selectedAttendee.registrationId}
                </p>
              </div>

              <div className="p-6 space-y-4 text-sm text-slate-700">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Email Address</span>
                    <span className="font-medium text-slate-900">{selectedAttendee.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Phone Number</span>
                    <span className="font-medium text-slate-900">{selectedAttendee.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Profession</span>
                    <span className="font-medium text-slate-900">{selectedAttendee.profession}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Designation</span>
                    <span className="font-medium text-slate-900">{selectedAttendee.designation}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Institution</span>
                    <span className="font-medium text-slate-900">{selectedAttendee.institution}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Council Number</span>
                    <span className="font-medium font-mono text-slate-900">{selectedAttendee.stateMedicalCouncilNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Location</span>
                    <span className="font-medium text-slate-900">{selectedAttendee.city}, {selectedAttendee.state}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Registration Date</span>
                    <span className="font-medium text-slate-900">{new Date(selectedAttendee.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Registration Fee</span>
                    <span className="font-bold text-emerald-600 text-xs bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md inline-block mt-1">
                      ₹{selectedAttendee.paymentAmount || 1}.00 Paid
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Razorpay Payment Ref</span>
                    <span className="font-mono text-xs font-semibold text-slate-800 block mt-1">
                      {selectedAttendee.razorpayPaymentId || 'Verified'}
                    </span>
                  </div>
                </div>

                {selectedAttendee.couponCode && (
                  <div className="p-3 bg-orange-50 rounded-xl text-xs flex justify-between items-center text-orange-800 font-medium">
                    <span>Applied Coupon Code:</span>
                    <span className="font-mono font-bold text-orange-900">{selectedAttendee.couponCode}</span>
                  </div>
                )}

                {/* Unique Attendee Entry QR Code */}
                {selectedAttendee.qrCode && (
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex-shrink-0">
                      <img
                        src={selectedAttendee.qrCode}
                        alt={`Entry QR for ${selectedAttendee.registrationId}`}
                        className="w-24 h-24 object-contain mx-auto"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center justify-center sm:justify-start gap-1">
                        <QrCode className="w-3.5 h-3.5 text-[#1F83C6]" />
                        Official Entry QR Pass
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Scan at reception counter to verify attendee details and grant entry.
                      </p>
                      <a
                        href={selectedAttendee.qrCode}
                        download={`MVCON27_${selectedAttendee.registrationId}_QR.png`}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#1F83C6] hover:text-[#156ca5]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download QR Pass Image
                      </a>
                    </div>
                  </div>
                )}

                {/* Admission Check-In Status & Action in Drawer */}
                <div className="p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs bg-slate-50 border-slate-200">
                  <div>
                    <span className="font-bold text-slate-700 block uppercase text-[10px]">Admission Status:</span>
                    <span className={`font-extrabold text-xs ${selectedAttendee.checkedIn ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {selectedAttendee.checkedIn ? 'Admitted & Checked In' : 'Not Checked In'}
                    </span>
                  </div>
                  {!selectedAttendee.checkedIn && (
                    <button
                      onClick={async () => {
                        try {
                          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
                          await fetch(`${backendUrl}/api/register/check-in`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ registrationId: selectedAttendee.registrationId }),
                          });
                          setSelectedAttendee({ ...selectedAttendee, checkedIn: true });
                          fetchData();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-all text-xs"
                    >
                      Admit Attendee
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedAttendee(null)}
                    className="w-full py-3 bg-[#1F83C6] hover:bg-[#156ca5] text-white font-bold rounded-xl transition-all shadow-md"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Abstract Full Details Modal */}
      <AnimatePresence>
        {selectedAbstract && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
            >
              <div className="bg-[#0b1623] p-6 text-white relative">
                <button
                  onClick={() => setSelectedAbstract(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Scientific Abstract Submission
                </div>
                <h3 className="text-2xl font-extrabold">{selectedAbstract.presentingAuthor}</h3>
                <p className="text-sm font-mono text-[#F26522] font-bold mt-1">
                  Ref: {selectedAbstract.submissionId}
                </p>
              </div>

              <div className="p-6 space-y-4 text-sm text-slate-700 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Email Address</span>
                    <span className="font-medium text-slate-900">{selectedAbstract.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Phone Number</span>
                    <span className="font-medium text-slate-900">{selectedAbstract.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">MVCON Reg ID</span>
                    <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 inline-block mt-0.5">
                      {selectedAbstract.registrationId}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold">Submission Date</span>
                    <span className="font-medium text-slate-900">
                      {new Date(selectedAbstract.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-100">
                  <span className="text-xs text-slate-400 block uppercase font-bold">Institution / Hospital</span>
                  <span className="font-medium text-slate-900 block mt-0.5">{selectedAbstract.institution}</span>
                  {selectedAbstract.department && (
                    <span className="text-xs text-slate-500 block mt-1">
                      Department: {selectedAbstract.department}
                    </span>
                  )}
                </div>

                {/* Attached Document Card */}
                <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{selectedAbstract.originalFileName}</div>
                        <div className="text-xs text-slate-500">
                          {(selectedAbstract.fileSize / 1024).toFixed(1)} KB • Stored in uploads/abstracts
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${selectedAbstract.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={selectedAbstract.originalFileName}
                    className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Abstract Document
                  </a>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleDeleteAbstract(selectedAbstract._id)}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedAbstract(null)}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-sm text-xs cursor-pointer"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Admin QR Code Scanner Modal */}
      <AdminQrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onCheckInSuccess={fetchData}
      />

    </div>
  );
}
