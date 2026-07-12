import React, { useState } from 'react';
import { BookOpen, Globe, GraduationCap, Clock, CreditCard, ChevronDown, ChevronUp, Check, Calculator } from 'lucide-react';
import { BOARDS_DATA } from '../data';
import { Board } from '../types';

interface BoardsProps {
  onBookDemoClick: () => void;
  boards?: Board[];
  showPricingBoards?: boolean;
  logoUrl?: string;
}

export default function Boards({ onBookDemoClick, boards = BOARDS_DATA, showPricingBoards = true, logoUrl }: BoardsProps) {
  const [expandedBoardId, setExpandedBoardId] = useState<string | null>(null);
  const [calcHours, setCalcHours] = useState<number>(4); // hours per week default
  const [calcTier, setCalcTier] = useState<string>('high'); // middle, high, senior

  const toggleBoardExpansion = (boardId: string) => {
    if (expandedBoardId === boardId) {
      setExpandedBoardId(null);
    } else {
      setExpandedBoardId(boardId);
      // Reset defaults when switching boards
      setCalcHours(4);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'menu_book':
        return <BookOpen size={28} />;
      case 'public':
        return <Globe size={28} />;
      case 'school':
        return <GraduationCap size={28} />;
      default:
        return <BookOpen size={28} />;
    }
  };

  // Pricing calculation helper
  const calculateEstimate = (board: Board) => {
    // Base monthly rates are for 4 hours/week (approx 16 hours/month)
    const baseMonthlyPriceInr = board.priceInr;
    const baseMonthlyPriceUsd = board.priceUsd;
    
    // Scale hourly price linearly
    const scaleFactor = calcHours / 4;
    
    // Grade adjustment factors
    let gradeFactor = 1.0;
    if (calcTier === 'senior') gradeFactor = 1.25;
    if (calcTier === 'middle') gradeFactor = 0.85;

    return {
      inr: Math.round(baseMonthlyPriceInr * scaleFactor * gradeFactor),
      usd: Math.round(baseMonthlyPriceUsd * scaleFactor * gradeFactor),
      hoursTotal: calcHours * 4 // Monthly total hours
    };
  };

  // Simple reordered boards: IGCSE → IB → CBSE
  const simpleOrderedBoards = [
    boards.find(b => b.id === 'igcse-gcse'),
    boards.find(b => b.id === 'ib-myp-dp'),
    boards.find(b => b.id === 'cbse-icse'),
  ].filter(Boolean) as Board[];

  // ─── SIMPLE CARDS MODE (showPricingBoards = false) ───────────────────────
  if (!showPricingBoards) {
    return (
      <section className="py-20 px-6 bg-white" id="boards">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#fe6b00]/10 text-[#fe6b00] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-[#fe6b00]/20">
              Curriculum Boards
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-[#000928] font-bold mb-4">Boards We Cover</h2>
            <p className="font-sans text-[16px] md:text-[18px] text-gray-500 max-w-2xl mx-auto">
              World-class mathematics coaching tailored to your curriculum board.
            </p>
          </div>

          {/* Simple Board Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {simpleOrderedBoards.map((board, idx) => (
              <div
                key={board.id}
                className="group relative bg-white rounded-[28px] p-8 flex flex-col h-full border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400"
                style={{ boxShadow: '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff' }}
                id={`simple-board-card-${board.id}`}
              >
                {/* Numbering badge */}
                <span className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#fe6b00]/10 border border-[#fe6b00]/20 flex items-center justify-center font-mono text-[11px] font-black text-[#fe6b00]">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#000928]/5 p-4 rounded-2xl text-[#000928] border border-[#000928]/10 shadow-sm group-hover:bg-[#fe6b00]/10 group-hover:border-[#fe6b00]/20 group-hover:text-[#fe6b00] transition-all duration-300">
                    {getIcon(board.iconName)}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl text-[#000928] font-bold leading-tight">{board.name}</h3>
                    <p className="font-sans text-sm text-[#fe6b00] font-semibold tracking-wide uppercase mt-0.5">{board.subtitle}</p>
                  </div>
                </div>

                {/* Timezone badge */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="bg-gray-50 border border-gray-200 text-gray-500 text-[11px] font-mono font-semibold px-3 py-1 rounded-full">
                    🕐 {board.timeZone}
                  </span>
                </div>

                {/* Curriculum description */}
                <p className="font-sans text-gray-600 text-[14px] leading-relaxed mb-6 flex-1">
                  {board.curriculum}
                </p>

                {/* Key Features */}
                <div className="space-y-2.5 mb-8">
                  {board.keyFeatures.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <div className="w-4 h-4 rounded-full bg-[#fe6b00]/15 border border-[#fe6b00]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={9} className="text-[#fe6b00]" />
                      </div>
                      <span className="font-sans leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-6">
                  <button
                    onClick={onBookDemoClick}
                    className="w-full bg-[#000928] hover:bg-[#fe6b00] text-white font-sans font-bold text-sm py-3.5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group/btn"
                    id={`simple-board-cta-${board.id}`}
                  >
                    <span>Book a Free Trial Lesson</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── FULL PRICING MODE (showPricingBoards = true) ────────────────────────
  return (
    <section className="py-20 px-6 bg-white" id="boards">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-[#000928] font-bold mb-4">Boards We Cover</h2>
          <p className="font-sans text-[16px] md:text-[18px] text-gray-500 max-w-2xl mx-auto">
            Comprehensive, concept-driven coaching mapped precisely to national and international curricula.
          </p>
        </div>

        {/* Board Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {boards.map((board) => {
            const isExpanded = expandedBoardId === board.id;
            const estimate = calculateEstimate(board);

            return (
              <div 
                key={board.id}
                className={`bg-background rounded-[24px] p-6 md:p-8 flex flex-col h-full transition-all duration-300 border border-gray-100 ${
                  isExpanded ? 'lg:col-span-3 shadow-lg bg-white ring-2 ring-[#fe6b00]/10' : 'hover:shadow-lg hover:-translate-y-1'
                }`}
                style={{ 
                  boxShadow: isExpanded 
                    ? '0 20px 40px rgba(0,9,40,0.05)' 
                    : '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff'
                }}
                id={`board-card-${board.id}`}
              >
                {/* Card Top Information */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#000928]/5 p-3.5 rounded-2xl text-[#000928] border border-[#000928]/10 shadow-sm">
                        {getIcon(board.iconName)}
                      </div>
                      <div>
                        <h3 className="font-heading text-xl md:text-2xl text-[#000928] font-bold">{board.name}</h3>
                        <p className="font-sans text-sm text-[#fe6b00] font-semibold tracking-wide uppercase">{board.subtitle}</p>
                      </div>
                    </div>
                    <p className="font-sans text-gray-600 text-[15px] leading-relaxed mb-6">
                      {board.curriculum}
                    </p>
                  </div>

                  {/* Standard Cost and timezone indicator */}
                  <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-100 min-w-[260px] md:self-stretch flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock size={18} className="text-[#fe6b00] shrink-0" />
                      <span className="font-sans text-[14px] font-medium">{board.timeZone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CreditCard size={18} className="text-[#fe6b00] shrink-0" />
                      <span className="font-sans text-[14px] font-semibold text-[#000928]">
                        ₹{board.priceInr.toLocaleString('en-IN')} / ${board.priceUsd} per month
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="border-t border-gray-100 mt-8 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                    {/* Column 1: Detailed Curriculum Accordion */}
                    <div className="lg:col-span-2 space-y-6">
                      <h4 className="font-heading font-bold text-lg text-[#000928] flex items-center gap-2">
                        <BookOpen size={18} className="text-[#fe6b00]" /> Detailed Syllabus Mapping
                      </h4>
                      
                      <div className="space-y-4">
                        {board.topics.map((level, lIndex) => (
                          <div key={lIndex} className="bg-[#fbf8fd] p-5 rounded-xl border border-gray-100">
                            <h5 className="font-heading font-semibold text-[#000928] text-[15px] mb-3 flex items-center justify-between">
                              <span>{level.title}</span>
                              <span className="text-[11px] bg-white border border-gray-200 text-[#fe6b00] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Target topics</span>
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {level.subtopics.map((sub, sIndex) => (
                                <span 
                                  key={sIndex} 
                                  className="bg-white border border-gray-200/60 font-sans text-xs text-gray-600 px-3 py-1.5 rounded-lg shadow-sm"
                                  style={{ fontFamily: 'var(--font-sans)' }}
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Key features of this board */}
                      <div className="space-y-3">
                        <h4 className="font-heading font-bold text-[16px] text-[#000928]">What makes this program special?</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {board.keyFeatures.map((feat, fIndex) => (
                            <div key={fIndex} className="flex items-start gap-2.5 text-sm text-gray-600">
                              <Check size={16} className="text-[#fe6b00] mt-0.5 shrink-0" />
                              <span className="font-sans leading-relaxed">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Estimate Calculator Side-Card */}
                    <div className="bg-[#000928] text-white p-6 rounded-2xl flex flex-col justify-between shadow-md">
                      <div className="space-y-5">
                        <div className="flex items-center gap-2 text-[#fe6b00] border-b border-white/10 pb-3">
                          <Calculator size={20} />
                          <h4 className="font-heading font-bold text-[16px] text-white">Interactive Fee Estimator</h4>
                        </div>

                        {/* Calculator Controls */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs text-gray-300 font-bold uppercase tracking-wider mb-2">Grade / Stage Tier</label>
                            <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-lg">
                              <button
                                onClick={() => setCalcTier('middle')}
                                className={`text-[12px] font-sans font-semibold py-1.5 rounded-md transition-all ${calcTier === 'middle' ? 'bg-white text-[#000928]' : 'text-gray-300 hover:text-white'}`}
                              >
                                Middle
                              </button>
                              <button
                                onClick={() => setCalcTier('high')}
                                className={`text-[12px] font-sans font-semibold py-1.5 rounded-md transition-all ${calcTier === 'high' ? 'bg-white text-[#000928]' : 'text-gray-300 hover:text-white'}`}
                              >
                                High
                              </button>
                              <button
                                onClick={() => setCalcTier('senior')}
                                className={`text-[12px] font-sans font-semibold py-1.5 rounded-md transition-all ${calcTier === 'senior' ? 'bg-white text-[#000928]' : 'text-gray-300 hover:text-white'}`}
                              >
                                Senior
                              </button>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs text-gray-300 font-bold uppercase tracking-wider mb-2">
                              <span>Weekly Tutoring</span>
                              <span className="text-white font-mono">{calcHours} hours</span>
                            </div>
                            <input 
                              type="range" 
                              min="2" 
                              max="8" 
                              step="1"
                              value={calcHours}
                              onChange={(e) => setCalcHours(Number(e.target.value))}
                              className="w-full h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-[#fe6b00]"
                            />
                            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                              <span>2 hrs/wk</span>
                              <span>4 hrs (Rec)</span>
                              <span>8 hrs/wk</span>
                            </div>
                          </div>
                        </div>

                        {/* Fee Result Output */}
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                          <span className="text-[11px] text-gray-400 uppercase font-bold tracking-widest block">Estimated Monthly Fee</span>
                          <div className="flex justify-between items-baseline">
                            <span className="font-heading font-bold text-2xl text-white">₹{estimate.inr.toLocaleString('en-IN')}</span>
                            <span className="text-sm text-gray-300">({estimate.hoursTotal} hrs total)</span>
                          </div>
                          <div className="text-xs text-gray-400 border-t border-white/5 pt-2">
                            Global USD Rate: <strong className="text-white">${estimate.usd}</strong> / month
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={onBookDemoClick}
                          className="w-full bg-[#fe6b00] hover:bg-white hover:text-[#000928] text-white text-[13px] font-bold py-3 rounded-xl transition-all duration-300 cursor-pointer text-center"
                          id={`calc-book-btn-${board.id}`}
                        >
                          Book Trial Class for this Plan
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Action footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">Personalized 1-on-1 model</span>
                  <button
                    onClick={() => toggleBoardExpansion(board.id)}
                    className="flex items-center gap-1.5 text-sm font-sans font-bold text-[#000928] hover:text-[#fe6b00] cursor-pointer group select-none"
                    id={`toggle-board-btn-${board.id}`}
                  >
                    {isExpanded ? (
                      <>Hide Details <ChevronUp size={16} /></>
                    ) : (
                      <>Explore Curriculum <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" /></>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
