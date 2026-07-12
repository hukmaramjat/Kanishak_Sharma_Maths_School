import React, { useState } from 'react';
import { ArrowRight, Phone, CheckCircle, HelpCircle, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface AppSettings {
  logoUrl: string;
  phoneNumber: string;
  admissionsText: string;
  enrolledStudentsCount: string;
}

interface HeroProps {
  onBookDemoClick: () => void;
  onCallClick: () => void;
  onNavigateToQuiz: () => void;
  settings: AppSettings;
}

export default function Hero({ onBookDemoClick, onCallClick, onNavigateToQuiz, settings }: HeroProps) {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden bg-background">


      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Main Glassmorphic Container */}
        <div 
          className="bg-white/70 backdrop-blur-md p-8 md:p-14 rounded-4xl border border-white/20 shadow-xl max-w-4xl w-full flex flex-col items-center space-y-8 relative overflow-hidden"
          style={{ boxShadow: '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff' }}
          id="hero-container"
        >
          {/* Background Logo watermark inside hero-container */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
            <div 
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${settings.logoUrl}')` }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-8">
          {/* Admissions Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-[inset_2px_2px_6px_#cfd0d3,inset_-2px_-2px_6px_#ffffff]">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-sans font-semibold text-[13px] text-primary tracking-wider uppercase">{settings.admissionsText}</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-3xl md:text-[52px] md:leading-15 text-primary font-bold max-w-3xl">
            Learn Maths from <span className="text-secondary-container relative inline-block whitespace-nowrap">
              Anywhere
              <svg className="absolute -bottom-3 left-0 w-full" preserveAspectRatio="none" viewBox="0 0 100 10" width="100%">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="#fe6b00" strokeWidth="4"></path>
              </svg>
            </span> in the World
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base md:text-lg leading-6 md:leading-7 text-gray-600 max-w-2xl">
            Concept Clarity • Strong Fundamentals • Better Scores. Join thousands of students achieving academic excellence globally at Kanishak Sharma Maths School.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full justify-center">
            <button
              onClick={onBookDemoClick}
              className="bg-primary text-white hover:bg-secondary-container px-8 py-4 rounded-full font-sans font-bold text-[15px] hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              id="hero-cta-book"
            >
              Book a Free Trial Lesson
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onCallClick}
              className="bg-white text-primary hover:text-secondary-container px-8 py-4 rounded-full font-sans font-bold text-[15px] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              style={{ boxShadow: '5px 5px 10px #cfd0d3, -5px -5px 10px #ffffff' }}
              id="hero-cta-call"
            >
              <Phone size={18} />
              Call Now
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full border-t border-gray-100/60 mt-4">
            <div className="flex -space-x-2.5">
              <img 
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" 
                alt="Student 1" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSTF634nK1A9bx4H-iLr17Mism6L0bVCTP5XeXUhX14oqTLFrKyRtzulZDH7WTO_amIvEF9X84lZL4HLkYRvg0N0R84E1HowgQRrJupd5Tuzl5_H8oF6FlsH3On0MXlPKnhcEpdqn-g4RIehGrNwEQKuMZl96nWJ02ciCZYeNXuYK--OBGdPsGFDC_Rn-2-ABpYuDSZ8aXPEkJWIjVunjBW47-DVOXi4I9toTtRSpZMy2kSMVrTeycoMgkbiLbR9X5vIeHNtzd7E4f"
                referrerPolicy="no-referrer"
              />
              <img 
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" 
                alt="Student 2" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQbqA7w_CBvwlHQv0-GV9Tjg82-MnsmsimMpd0tSM1CrTatEtlJIR0BwC6ah_E1Pcjd4vm_vDS8d_D_g2OrEPeefVky7CVkgIHBzXiTq9H0iyiE3qDy32jru1b8BnF3zuU9gTsH5_4KPQQ8TQfWvszsz078y-wk59hBl2eoV560oyw58uAdrKYAdVf7NImPe1qQty4MH1-5JUavLbTNPR6Q-6DjaWj0TkYGvDwYOGTVzMssC9S3GsGnW6ve0xGtwVSngk4HcCo_3JM"
                referrerPolicy="no-referrer"
              />
              <img 
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" 
                alt="Student 3" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTsh8Er6uqFjL-NKWOtP0s1Rx_iPxgU2yGdA3LvQdid6mBrv5pro132wRIoHtjzB5cmcXPHiW_hr9o1pfTV6OJLx6SHOf_6k6Ss51Zj--2BYvcundDRPnWHGy2hGRHgGiV7dRUTN2dzn9brQa8ZTB6bufwmQVFhWTuZ_42R3pyL6H93goYKHv0C5jtT0DRESbmpcMkciHik4-JV_rwmPAFjWjDlKUqH_oyfgf26BZs2Q6XDkfi5XgaROazZAiAe_bI88zyLsB6X3Mq"
                referrerPolicy="no-referrer"
              />
              <div 
                className="w-10 h-10 rounded-full border-2 border-white bg-white flex items-center justify-center font-sans font-bold text-[11px] text-primary"
                style={{ boxShadow: 'inset 2px 2px 5px #cfd0d3, inset -2px -2px 5px #ffffff' }}
              >
                {settings.enrolledStudentsCount}
              </div>
            </div>
            
            <div className="font-sans text-sm text-gray-500">
              <strong className="text-primary font-bold text-base">{settings.enrolledStudentsCount}</strong> students enrolled globally
            </div>

            <div className="hidden sm:block h-4 w-px bg-gray-200"></div>

            <button 
              onClick={onNavigateToQuiz}
              className="text-secondary-container hover:text-primary font-sans font-bold text-[14px] flex items-center gap-1.5 group cursor-pointer transition-colors"
              id="hero-quiz-link"
            >
              Take Free diagnostic quiz
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
