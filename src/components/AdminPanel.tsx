import React, { useState } from 'react';
import { 
  Settings, BookOpen, MessageSquare, Calendar, Phone, Globe, Image as ImageIcon, 
  Plus, Trash2, Edit2, Check, RotateCcw, Save, ShieldAlert, Award, Star, ToggleLeft, ToggleRight
} from 'lucide-react';
import { Board, Review, Booking } from '../types';

interface AppSettings {
  logoUrl: string;
  phoneNumber: string;
  admissionsText: string;
  enrolledStudentsCount: string;
  showPricingBoards: boolean;
  showSuccessStories: boolean;
  showConceptVault: boolean;
  showDiagnosticQuiz: boolean;
}

interface AdminPanelProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  boards: Board[];
  onUpdateBoards: (boards: Board[]) => void;
  reviews: Review[];
  onUpdateReviews: (reviews: Review[]) => void;
  bookings: Booking[];
  callbacks: any[];
  onClose: () => void;
}

export default function AdminPanel({
  settings,
  onUpdateSettings,
  boards,
  onUpdateBoards,
  reviews,
  onUpdateReviews,
  bookings,
  callbacks,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'reviews' | 'bookings'>('general');

  // General Settings States
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [phoneNumber, setPhoneNumber] = useState(settings.phoneNumber);
  const [admissionsText, setAdmissionsText] = useState(settings.admissionsText);
  const [enrolledCount, setEnrolledCount] = useState(settings.enrolledStudentsCount);
  const [showPricingBoards, setShowPricingBoards] = useState(settings.showPricingBoards ?? true);
  const [showSuccessStories, setShowSuccessStories] = useState(settings.showSuccessStories ?? true);
  const [showConceptVault, setShowConceptVault] = useState(settings.showConceptVault ?? true);
  const [showDiagnosticQuiz, setShowDiagnosticQuiz] = useState(settings.showDiagnosticQuiz ?? true);
  const [saveSuccess, setSaveSuccess] = useState('');

  // Boards states
  const [editBoards, setEditBoards] = useState<Board[]>([...boards]);

  // Review states
  const [editReviews, setEditReviews] = useState<Review[]>([...reviews]);
  const [newReview, setNewReview] = useState<Partial<Review>>({
    studentName: '',
    gradeClass: '',
    board: 'CBSE & ICSE',
    rating: 5,
    reviewText: '',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces',
    date: 'Today',
    isVerified: true
  });
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const handleSaveGeneral = () => {
    onUpdateSettings({
      logoUrl,
      phoneNumber,
      admissionsText,
      enrolledStudentsCount: enrolledCount,
      showPricingBoards,
      showSuccessStories,
      showConceptVault,
      showDiagnosticQuiz
    });
    triggerSuccess('General settings updated successfully!');
  };

  const triggerSuccess = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleBoardPriceChange = (boardId: string, currency: 'inr' | 'usd', val: number) => {
    const updated = editBoards.map(b => {
      if (b.id === boardId) {
        return {
          ...b,
          priceInr: currency === 'inr' ? val : b.priceInr,
          priceUsd: currency === 'usd' ? val : b.priceUsd
        };
      }
      return b;
    });
    setEditBoards(updated);
  };

  const handleSaveBoards = () => {
    onUpdateBoards(editBoards);
    triggerSuccess('Course pricing plans updated successfully!');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.studentName?.trim() || !newReview.reviewText?.trim()) {
      alert('Please fill out the Student Name and Review Text.');
      return;
    }

    const reviewToInsert: Review = {
      id: editingReviewId || 'rev-adm-' + Date.now(),
      studentName: newReview.studentName || 'Anonymous',
      gradeClass: newReview.gradeClass || 'Grade 10',
      board: newReview.board || 'CBSE & ICSE',
      rating: newReview.rating || 5,
      reviewText: newReview.reviewText || '',
      date: newReview.date || 'Today',
      avatarUrl: newReview.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces',
      isVerified: newReview.isVerified ?? true
    };

    let updated: Review[];
    if (editingReviewId) {
      updated = editReviews.map(r => r.id === editingReviewId ? reviewToInsert : r);
      setEditingReviewId(null);
    } else {
      updated = [reviewToInsert, ...editReviews];
    }

    setEditReviews(updated);
    onUpdateReviews(updated);
    
    // Reset form
    setNewReview({
      studentName: '',
      gradeClass: '',
      board: 'CBSE & ICSE',
      rating: 5,
      reviewText: '',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces',
      date: 'Today',
      isVerified: true
    });
    triggerSuccess(editingReviewId ? 'Review updated successfully!' : 'Review added successfully!');
  };

  const handleEditReviewSelect = (rev: Review) => {
    setEditingReviewId(rev.id);
    setNewReview(rev);
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      const updated = editReviews.filter(r => r.id !== id);
      setEditReviews(updated);
      onUpdateReviews(updated);
      triggerSuccess('Review deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans" id="admin-workspace">
      {/* Top Header */}
      <div className="bg-[#000928] text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-b border-[#fe6b00]/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-[#fe6b00] p-2 rounded-xl text-white">
            <Settings size={22} className="animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-heading font-black text-xl tracking-tight">Kanishak Sharma Maths School</h1>
            <p className="font-mono text-[10px] text-gray-400">ADMIN CONTROL CENTER • SECURE SETTINGS WORKSPACE</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-sans font-bold text-xs transition-all active:scale-95 border border-white/10"
            id="admin-exit-btn"
          >
            ← Back to Live Site
          </button>
        </div>
      </div>

      {/* Admin Body Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <p className="font-mono text-[10px] text-gray-400 font-bold uppercase px-3 py-1">Navigation</p>
            
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-sans text-xs font-bold transition-all text-left ${activeTab === 'general' ? 'bg-[#fe6b00]/10 text-[#fe6b00]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Settings size={16} />
              <span>General Customization</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-sans text-xs font-bold transition-all text-left ${activeTab === 'pricing' ? 'bg-[#fe6b00]/10 text-[#fe6b00]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <BookOpen size={16} />
              <span>Course & Pricing</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-sans text-xs font-bold transition-all text-left ${activeTab === 'reviews' ? 'bg-[#fe6b00]/10 text-[#fe6b00]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <MessageSquare size={16} />
              <span>Student Reviews Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-sans text-xs font-bold transition-all text-left ${activeTab === 'bookings' ? 'bg-[#fe6b00]/10 text-[#fe6b00]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Calendar size={16} />
              <span>Bookings & Requests Logs ({bookings.length})</span>
            </button>
          </div>

          {/* Quick info badge */}
          <div className="bg-[#000928] text-white p-5 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 text-[#fe6b00] font-sans font-extrabold text-xs">
              <ShieldAlert size={14} />
              <span>Active State Notice</span>
            </div>
            <p className="font-sans text-[11px] text-gray-400 leading-normal">
              Changes are instantly committed to <strong>localStorage</strong>. Refreshing the browser will preserve your customized configurations!
            </p>
          </div>
        </div>

        {/* Dynamic Config Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Success toast alert inside workspace */}
          {saveSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-xl flex items-center gap-2 animate-fade-in shadow-sm font-sans text-xs font-bold">
              <Check size={16} className="text-emerald-500" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* GENERAL CUSTOMIZATION TAB */}
          {activeTab === 'general' && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-heading font-black text-xl text-[#000928]">General Identity Settings</h2>
                <p className="font-sans text-xs text-gray-500">Configure core values, logos, badges, and counters across the website.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo URL Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-gray-500">Website Logo Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="Enter path or URL"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-3 text-xs font-sans transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">Current website defaults are high-contrast vector badges.</p>
                </div>

                {/* Contact Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-gray-500">Main Phone Number / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. +91 9166931387"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-3 text-xs font-sans transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">This updates all references, direct call links, and widget default values.</p>
                </div>

                {/* Admissions Text Badge */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-gray-500">Admissions Badge Text</label>
                  <div className="relative">
                    <Award className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={admissionsText}
                      onChange={(e) => setAdmissionsText(e.target.value)}
                      placeholder="e.g. Admissions Open 2024"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-3 text-xs font-sans transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">Displays on the pulsing green notification card in the Hero section.</p>
                </div>

                {/* Enrolled Students Count */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-gray-500">Enrolled Students Count Text</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={enrolledCount}
                      onChange={(e) => setEnrolledCount(e.target.value)}
                      placeholder="e.g. 10,000+"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-3 text-xs font-sans transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">Displays in the Trust indicator strip under the core Hero action buttons.</p>
                </div>
              </div>

              {/* Logo Preview */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60 flex items-center gap-4">
                <span className="font-mono text-[10px] text-gray-400 uppercase font-bold">Logo Preview:</span>
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  <img src={logoUrl} alt="Logo Preview" className="h-10 w-auto object-contain" />
                </div>
              </div>

              {/* Boards Section Display Toggle */}
              <div className="bg-gradient-to-r from-[#000928]/3 to-[#fe6b00]/5 border border-[#fe6b00]/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <BookOpen size={15} className="text-[#fe6b00]" />
                      <h4 className="font-sans font-extrabold text-xs text-[#000928] uppercase tracking-wider">"Boards We Cover" Display Mode</h4>
                    </div>
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed max-w-sm">
                      {showPricingBoards
                        ? <><strong className="text-[#fe6b00]">Full Pricing Mode</strong> — Shows detailed curriculum cards with interactive fee estimator &amp; booking calculator.</>  
                        : <><strong className="text-[#000928]">Simple Cards Mode</strong> — Shows clean board overview cards (IGCSE → IB → CBSE order) without pricing info.</>  
                      }
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPricingBoards(!showPricingBoards)}
                    className="shrink-0 flex items-center gap-2 transition-all duration-300 group"
                    id="boards-display-toggle-btn"
                    title={showPricingBoards ? 'Switch to Simple Cards Mode' : 'Switch to Full Pricing Mode'}
                  >
                    <span className={`text-[11px] font-bold font-sans ${
                      showPricingBoards ? 'text-[#fe6b00]' : 'text-gray-400'
                    }`}>
                      {showPricingBoards ? 'ON' : 'OFF'}
                    </span>
                    {showPricingBoards
                      ? <ToggleRight size={38} className="text-[#fe6b00] drop-shadow-sm" />
                      : <ToggleLeft size={38} className="text-gray-300" />
                    }
                  </button>
                </div>

                <div className={`flex items-center gap-3 text-[11px] font-sans rounded-xl px-3 py-2 border ${
                  showPricingBoards
                    ? 'bg-[#fe6b00]/8 border-[#fe6b00]/20 text-[#fe6b00]'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    showPricingBoards ? 'bg-[#fe6b00] animate-pulse' : 'bg-gray-300'
                  }`} />
                  <span>
                    {showPricingBoards
                      ? 'Visitors see full pricing calculator with INR/USD rates & booking CTA'
                      : 'Visitors see simplified board overview: IGCSE → IB → CBSE (no prices shown)'}
                  </span>
                </div>
              </div>

              {/* Student Success Stories Toggle */}
              <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Star size={15} className="text-[#000928]" />
                    <h4 className="font-sans font-extrabold text-xs text-[#000928] uppercase tracking-wider">Student Success Stories</h4>
                  </div>
                  <p className="font-sans text-[11px] text-gray-500 max-w-sm">
                    Show or hide the student reviews and success stories section on the landing page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuccessStories(!showSuccessStories)}
                  className="shrink-0 transition-all duration-300 group"
                >
                  {showSuccessStories
                    ? <ToggleRight size={38} className="text-[#fe6b00] drop-shadow-sm" />
                    : <ToggleLeft size={38} className="text-gray-300" />
                  }
                </button>
              </div>

              {/* Maths Concept Vault Toggle */}
              <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} className="text-[#000928]" />
                    <h4 className="font-sans font-extrabold text-xs text-[#000928] uppercase tracking-wider">Maths Concept Vault</h4>
                  </div>
                  <p className="font-sans text-[11px] text-gray-500 max-w-sm">
                    Show or hide the interactive formulas and concept vault section on the landing page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConceptVault(!showConceptVault)}
                  className="shrink-0 transition-all duration-300 group"
                >
                  {showConceptVault
                    ? <ToggleRight size={38} className="text-[#fe6b00] drop-shadow-sm" />
                    : <ToggleLeft size={38} className="text-gray-300" />
                  }
                </button>
              </div>

              {/* Maths Diagnostic Quiz Toggle */}
              <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award size={15} className="text-[#000928]" />
                    <h4 className="font-sans font-extrabold text-xs text-[#000928] uppercase tracking-wider">Maths Diagnostic Quiz</h4>
                  </div>
                  <p className="font-sans text-[11px] text-gray-500 max-w-sm">
                    Show or hide the diagnostic quiz section on the landing page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDiagnosticQuiz(!showDiagnosticQuiz)}
                  className="shrink-0 transition-all duration-300 group"
                >
                  {showDiagnosticQuiz
                    ? <ToggleRight size={38} className="text-[#fe6b00] drop-shadow-sm" />
                    : <ToggleLeft size={38} className="text-gray-300" />
                  }
                </button>
              </div>

              {/* Action row */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  onClick={handleSaveGeneral}
                  className="bg-[#000928] hover:bg-[#fe6b00] text-white px-6 py-3 rounded-xl font-sans font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                  id="admin-save-general-btn"
                >
                  <Save size={15} /> Save General Settings
                </button>
              </div>
            </div>
          )}

          {/* COURSE & PRICING TAB */}
          {activeTab === 'pricing' && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-heading font-black text-xl text-[#000928]">Course Plans & Fee Structures</h2>
                <p className="font-sans text-xs text-gray-500">Configure base rates for different international curricula boards. The interactive price estimator scales dynamically from these base prices.</p>
              </div>

              <div className="space-y-6">
                {editBoards.map((board) => (
                  <div key={board.id} className="bg-gray-50 p-5 rounded-2xl border border-gray-200/80 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200/50">
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#000928]">{board.name}</h4>
                        <span className="text-[10px] font-mono font-semibold text-[#fe6b00] uppercase tracking-wider">{board.subtitle}</span>
                      </div>
                      <span className="bg-white border border-gray-200 text-gray-500 font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase">{board.timeZone}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Price INR */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold uppercase text-gray-500">Base Price (INR / Month)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold text-xs">₹</span>
                          <input 
                            type="number" 
                            value={board.priceInr}
                            onChange={(e) => handleBoardPriceChange(board.id, 'inr', Number(e.target.value))}
                            className="w-full bg-white border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-8 pr-4 py-2 text-xs font-sans transition-all font-semibold text-[#000928]"
                          />
                        </div>
                      </div>

                      {/* Price USD */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold uppercase text-gray-500">Base Price (USD / Month)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold text-xs">$</span>
                          <input 
                            type="number" 
                            value={board.priceUsd}
                            onChange={(e) => handleBoardPriceChange(board.id, 'usd', Number(e.target.value))}
                            className="w-full bg-white border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-8 pr-4 py-2 text-xs font-sans transition-all font-semibold text-[#000928]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action row */}
              <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                <button
                  onClick={() => setEditBoards([...boards])}
                  className="bg-transparent text-gray-500 hover:text-gray-700 font-sans font-bold text-xs flex items-center gap-1"
                >
                  <RotateCcw size={14} /> Reset Changes
                </button>
                <button
                  onClick={handleSaveBoards}
                  className="bg-[#000928] hover:bg-[#fe6b00] text-white px-6 py-3 rounded-xl font-sans font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                  id="admin-save-pricing-btn"
                >
                  <Save size={15} /> Save All Pricing
                </button>
              </div>
            </div>
          )}

          {/* STUDENT REVIEWS MANAGER */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Form Col */}
              <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-heading font-extrabold text-sm text-[#000928] border-b border-gray-100 pb-2">
                  {editingReviewId ? '✏️ Edit Selected Review' : '➕ Add New Success Story'}
                </h3>

                <form onSubmit={handleAddReview} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-gray-500">Student Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aarav Mehta"
                      value={newReview.studentName}
                      onChange={(e) => setNewReview({...newReview, studentName: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-lg px-3 py-2 text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-gray-500">Grade / Class</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. CBSE Grade 10"
                      value={newReview.gradeClass}
                      onChange={(e) => setNewReview({...newReview, gradeClass: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-lg px-3 py-2 text-xs font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase text-gray-500">Curricula Board</label>
                      <select
                        value={newReview.board}
                        onChange={(e) => setNewReview({...newReview, board: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-lg px-2.5 py-2 text-xs font-sans"
                      >
                        <option value="CBSE & ICSE">CBSE & ICSE</option>
                        <option value="IGCSE / GCSE">IGCSE / GCSE</option>
                        <option value="IB (MYP/DP)">IB (MYP/DP)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold uppercase text-gray-500">Rating Scale</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-lg px-2.5 py-2 text-xs font-sans"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-gray-500">Student Photo Avatar URL</label>
                    <input 
                      type="text" 
                      placeholder="Enter photo path or URL"
                      value={newReview.avatarUrl}
                      onChange={(e) => setNewReview({...newReview, avatarUrl: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-lg px-3 py-2 text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-gray-500">Review Date</label>
                    <input 
                      type="text" 
                      placeholder="e.g. June 15, 2026"
                      value={newReview.date}
                      onChange={(e) => setNewReview({...newReview, date: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-lg px-3 py-2 text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-gray-500">Success Feedback Text</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Write feedback..."
                      value={newReview.reviewText}
                      onChange={(e) => setNewReview({...newReview, reviewText: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-lg p-3 text-xs font-sans resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    {editingReviewId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingReviewId(null);
                          setNewReview({
                            studentName: '',
                            gradeClass: '',
                            board: 'CBSE & ICSE',
                            rating: 5,
                            reviewText: '',
                            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces',
                            date: 'Today',
                            isVerified: true
                          });
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-xs font-bold font-sans transition-all flex-1"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-[#000928] hover:bg-[#fe6b00] text-white px-4 py-2.5 rounded-lg text-xs font-bold font-sans transition-all flex-1"
                    >
                      {editingReviewId ? 'Update Story' : 'Publish Story'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Reviews List Col */}
              <div className="xl:col-span-7 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-heading font-extrabold text-sm text-[#000928] border-b border-gray-100 pb-2">
                  Active Student Reviews ({editReviews.length})
                </h3>

                <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
                  {editReviews.map((rev) => (
                    <div key={rev.id} className="bg-[#fbf8fd] border border-gray-100 p-4 rounded-xl flex items-start gap-3 justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={rev.avatarUrl} 
                          alt={rev.studentName} 
                          className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm"
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-heading font-bold text-xs text-[#000928]">{rev.studentName}</h4>
                          <p className="font-sans text-[10px] text-[#fe6b00] font-semibold">{rev.gradeClass} • {rev.board}</p>
                          <p className="font-sans text-[11px] text-gray-500 line-clamp-1 italic">"{rev.reviewText}"</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleEditReviewSelect(rev)}
                          className="p-1.5 bg-white text-gray-600 hover:text-[#000928] rounded-md border border-gray-100 hover:shadow-sm"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-md border border-red-100"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* BOOKINGS AND REQUESTS LOG */}
          {activeTab === 'bookings' && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              
              {/* 1. Trial Bookings Log */}
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="font-heading font-black text-base text-[#000928]">Active Trial Bookings Logs</h2>
                    <p className="font-sans text-xs text-gray-500">Manage interactive student requests logged via the booking wizard.</p>
                  </div>
                  <span className="bg-[#fe6b00]/10 border border-[#fe6b00]/25 text-[#fe6b00] text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                    {bookings.length} Sessions
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 uppercase tracking-wider font-bold">
                        <th className="p-3">Booking ID</th>
                        <th className="p-3">Student & Parent</th>
                        <th className="p-3">Board & Class</th>
                        <th className="p-3">Schedule Window</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {bookings.map((bk) => (
                        <tr key={bk.id} className="hover:bg-gray-50">
                          <td className="p-3 font-mono font-bold text-gray-900">{bk.id}</td>
                          <td className="p-3">
                            <div>
                              <p className="font-bold text-gray-900">{bk.studentName}</p>
                              <p className="text-[10px] text-gray-400">Parent: {bk.parentName}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="font-semibold text-[#000928]">{bk.boardId.toUpperCase()}</p>
                              <p className="text-[10px] text-gray-400">{bk.grade}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="font-bold text-[#fe6b00]">{bk.date}</p>
                              <p className="text-[10px] text-gray-400">{bk.timeSlot}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="font-bold text-gray-900">{bk.contactNumber}</p>
                              <p className="text-[10px] text-gray-400">{bk.email}</p>
                              {bk.socialId && (
                                <p className="text-[10px] text-[#fe6b00] font-semibold mt-0.5">Social ID: {bk.socialId}</p>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-100 font-bold px-2.5 py-0.5 rounded-full uppercase text-[9px]">
                              ● {bk.status}
                            </span>
                          </td>
                        </tr>
                      ))}

                      {bookings.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center p-8 text-gray-400">
                            No trial slots scheduled yet. Live bookings will populate this table automatically.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Instant Callback Requests Log */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="font-heading font-black text-base text-[#000928]">Instant Call-Back Logs</h2>
                    <p className="font-sans text-xs text-gray-500">Students and parents asking for manual phone consultations.</p>
                  </div>
                  <span className="bg-gray-100 border border-gray-200 text-gray-500 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                    {callbacks.length} Requests
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 uppercase tracking-wider font-bold">
                        <th className="p-3">ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Topic Inquired</th>
                        <th className="p-3">Logged Date</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {callbacks.map((cb: any) => (
                        <tr key={cb.id} className="hover:bg-gray-50">
                          <td className="p-3 font-mono font-bold text-gray-400">{cb.id}</td>
                          <td className="p-3 font-bold text-gray-900">{cb.name}</td>
                          <td className="p-3 font-mono text-[#000928] font-bold">{cb.phone}</td>
                          <td className="p-3 text-gray-500">{cb.topic}</td>
                          <td className="p-3 text-gray-400">{cb.date}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 font-bold px-2.5 py-0.5 rounded-full uppercase text-[9px]">
                              ● {cb.status}
                            </span>
                          </td>
                        </tr>
                      ))}

                      {callbacks.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center p-8 text-gray-400">
                            No call-back requests received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8 pt-4">
        <p className="text-center font-sans text-xs text-gray-500">
          Developed by <a href="https://www.linkedin.com/in/hukma-ram-choudhary/" target="_blank" rel="noopener noreferrer" className="text-[#fe6b00] hover:underline font-bold">Hukma Ram</a> with ❤️
        </p>
      </div>
    </div>
  );
}
