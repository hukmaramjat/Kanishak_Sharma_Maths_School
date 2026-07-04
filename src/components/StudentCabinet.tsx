import React from 'react';
import { Calendar, User, BookOpen, FileText, Compass, ExternalLink, HelpCircle, LogOut, CheckCircle2, Award, Clock, ArrowRight } from 'lucide-react';
import { Booking } from '../types';

interface StudentCabinetProps {
  email: string;
  bookings: Booking[];
  onBookClick: () => void;
  onNavigateToQuiz: () => void;
  onLogout: () => void;
}

export default function StudentCabinet({ email, bookings, onBookClick, onNavigateToQuiz, onLogout }: StudentCabinetProps) {
  // Filter bookings registered for this student
  const studentBookings = bookings.filter(
    (b) => b.email.trim().toLowerCase() === email.trim().toLowerCase()
  );

  return (
    <div className="space-y-8 animate-fade-in" id="student-cabinet-portal">
      {/* 1. Portal Header Banner */}
      <div 
        className="relative bg-linear-to-r from-primary to-slate-900 text-white p-8 rounded-3xl overflow-hidden shadow-xl"
        id="cabinet-welcome-banner"
      >
        {/* Subtle geometric overlay decoration */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-secondary-container/20 text-secondary-container px-3.5 py-1 rounded-full text-xs font-bold font-sans border border-secondary-container/30">
              <span className="h-1.5 w-1.5 bg-secondary-container rounded-full animate-ping"></span>
              <span>Online Learning Cabinet</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
              Welcome Back, <span className="text-secondary-container">{email.split('@')[0]}</span>
            </h1>
            <p className="text-xs text-gray-300 max-w-xl font-sans leading-relaxed">
              Track your trial classes, consult curriculum formula sheets, and practice math problems to unlock your analytical superpowers.
            </p>
          </div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 hover:text-red-300 text-white border border-white/15 px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
            id="cabinet-logout-btn"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Main Bento Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Scheduled Trial Lessons */}
        <div className="lg:col-span-2 space-y-6">
          <div 
            className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 space-y-6"
            style={{ boxShadow: '8px 8px 16px #e5e6e9, -8px -8px 16px #ffffff' }}
            id="cabinet-bookings-card"
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-secondary-container/10 text-secondary-container rounded-xl">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-primary text-base font-sans">Scheduled Trial Lessons</h3>
                  <p className="text-[11px] text-gray-400 font-sans">Real-time schedule of your personalized tutorials</p>
                </div>
              </div>
              
              <button 
                onClick={onBookClick}
                className="bg-secondary-container hover:bg-secondary-container/90 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm font-sans"
              >
                Schedule New
              </button>
            </div>

            {studentBookings.length > 0 ? (
              <div className="space-y-4">
                {studentBookings.map((b, index) => (
                  <div 
                    key={b.id || index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4.5 bg-gray-50/70 border border-gray-100 rounded-2xl gap-4 hover:border-secondary-container/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="bg-white border border-gray-200 h-11 w-11 shrink-0 rounded-xl flex flex-col justify-center items-center shadow-sm">
                        <span className="text-[9px] font-sans font-extrabold text-gray-400 uppercase tracking-widest leading-none">Day</span>
                        <span className="text-sm font-sans font-extrabold text-primary leading-none mt-0.5">#{index + 1}</span>
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-primary font-sans">{b.studentName} — Grade {b.grade}</h4>
                        <p className="text-[11px] text-gray-500 font-sans flex items-center gap-1.5">
                          <Clock size={11} className="text-gray-400" />
                          <span>{b.date} at {b.timeSlot}</span>
                        </p>
                        {b.socialId && (
                          <span className="inline-block bg-secondary-container/10 text-secondary-container text-[9px] font-bold px-2 py-0.5 rounded-full mt-1">
                            Contact handle: {b.socialId}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200/50">
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={10} />
                        <span>Confirmed Booking</span>
                      </span>
                      <a 
                        href="https://wa.me/919166931387?text=Hello,%20I%20have%20scheduled%20a%20trial%20class%20and%20need%20the%20Google%20Meet%20link." 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="text-xs font-bold text-secondary-container hover:underline flex items-center gap-0.5"
                      >
                        <span>Join Call</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 space-y-4">
                <div className="inline-flex justify-center items-center h-16 w-16 bg-gray-50 text-gray-400 rounded-full border border-dashed border-gray-200">
                  <Calendar size={28} className="text-gray-300" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-primary text-sm font-sans">No Trials Booked Yet</h4>
                  <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto leading-relaxed">
                    Unlock private math tutoring today! Book a 100% free, 45-minute conceptual evaluation with Kanishak Sharma.
                  </p>
                </div>
                <button
                  onClick={onBookClick}
                  className="bg-primary hover:bg-secondary-container text-white font-sans font-bold text-xs px-5 py-2.5 rounded-xl active:scale-95 transition-all"
                >
                  Book a Free Trial Lesson
                </button>
              </div>
            )}
          </div>

          {/* diagnostic quick recommendation quiz card */}
          <div 
            className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100"
            style={{ boxShadow: '8px 8px 16px #e5e6e9, -8px -8px 16px #ffffff' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary-container font-sans">
                  <Award size={13} />
                  <span>Interactive Diagnostics</span>
                </div>
                <h3 className="font-extrabold text-primary text-base font-sans">Test Your Core Algebra Skills</h3>
                <p className="text-xs text-gray-500 font-sans max-w-md">
                  Take our instant 5-question conceptual diagnostic quiz. Our grading algorithm calculates your core percentile and weak topics.
                </p>
              </div>
              <button
                onClick={onNavigateToQuiz}
                className="bg-primary hover:bg-secondary-container hover:text-white text-white px-5 py-3 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0"
              >
                <span>Launch Diagnostic Quiz</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Resource Vault */}
        <div className="space-y-6">
          <div 
            className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 space-y-6"
            style={{ boxShadow: '8px 8px 16px #e5e6e9, -8px -8px 16px #ffffff' }}
            id="cabinet-resources-vault"
          >
            <div className="space-y-1">
              <h3 className="font-extrabold text-primary text-base font-sans flex items-center gap-2">
                <BookOpen size={18} className="text-secondary-container" />
                <span>Class Cheat-Sheets</span>
              </h3>
              <p className="text-[11px] text-gray-400 font-sans">Curated revision maps for rapid exam prep</p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="p-3.5 bg-gray-50 hover:bg-[#fe6b00]/5 border border-gray-100 rounded-2xl flex items-center justify-between transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl group-hover:bg-white group-hover:shadow-sm">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-primary font-sans leading-none">Class 11/12 Calculus Map</h4>
                    <p className="text-[10px] text-gray-400 font-sans mt-1">Limits, Derivatives, Integrals</p>
                  </div>
                </div>
                <a 
                  href="#formula-sheet" 
                  className="text-[#fe6b00] hover:scale-110 transition-transform"
                  title="View Formula Sheet"
                >
                  <Compass size={16} />
                </a>
              </div>

              <div className="p-3.5 bg-gray-50 hover:bg-[#fe6b00]/5 border border-gray-100 rounded-2xl flex items-center justify-between transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl group-hover:bg-white group-hover:shadow-sm">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-primary font-sans leading-none">Trigonometry cheat codes</h4>
                    <p className="text-[10px] text-gray-400 font-sans mt-1">Identities & Periodic Grids</p>
                  </div>
                </div>
                <a 
                  href="#formula-sheet" 
                  className="text-[#fe6b00] hover:scale-110 transition-transform"
                  title="View Formula Sheet"
                >
                  <Compass size={16} />
                </a>
              </div>

              <div className="p-3.5 bg-gray-50 hover:bg-[#fe6b00]/5 border border-gray-100 rounded-2xl flex items-center justify-between transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl group-hover:bg-white group-hover:shadow-sm">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-primary font-sans leading-none">IB DP Formula Booklet</h4>
                    <p className="text-[10px] text-gray-400 font-sans mt-1">Analysis & Approaches HL/SL</p>
                  </div>
                </div>
                <a 
                  href="#formula-sheet" 
                  className="text-[#fe6b00] hover:scale-110 transition-transform"
                  title="View Formula Sheet"
                >
                  <Compass size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Academic Coordinator Help Card */}
          <div 
            className="bg-indigo-50/60 p-6 rounded-3xl border border-indigo-100 space-y-4"
            id="cabinet-support-card"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary text-white rounded-xl">
                <HelpCircle size={16} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-indigo-950 font-sans leading-none">Need Support?</h4>
                <p className="text-[11px] text-indigo-800 leading-normal font-sans">
                  Have questions about class schedules, syllabus matches, or homework assignments? Connect with our team instantly.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <a 
                href="https://wa.me/919166931387?text=Hello!%20I%20am%20logged%20in%20to%20the%20student%20cabinet%20and%20need%20help%20with%20my%20enrolled%20batch." 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="bg-primary hover:bg-slate-900 text-white text-center py-2 rounded-xl text-[11px] font-sans font-bold block transition-all"
              >
                WhatsApp Academic Team
              </a>
              <a 
                href="mailto:admissions@ksmathsschool.com" 
                className="bg-white hover:bg-gray-50 border border-indigo-100 text-indigo-950 text-center py-2 rounded-xl text-[11px] font-sans font-semibold block transition-all"
              >
                Email Admissions Desk
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
