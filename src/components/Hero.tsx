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
  const [spotlightConcept, setSpotlightConcept] = useState<'pythagoras' | 'derivative' | 'limit'>('pythagoras');

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden bg-background">
      {/* Background Math watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANd6wfvqSSrDtfpI6izfg2FbT3RP2IKxm5HZsDry3qnmaIMisy3nLoEGrEhaCav2RRa3r093O0Ox4REhTWzs_lkZfDLk8v-M1bVO_RzE9q8GueJLe--2k3K9GDyeFaon-FNapp_kW1GfvVt8zHpes3az4cSoqDXl_-gzuJ-pv1eWB7iwqXAl33aPxiEKAtrbNQcSmkI4azbwRrB7mEuYTxoWu7o8scWMeC0jqGxGIDTbWK2VD_lsQyCRzma21G9IQwMudz4o0qs4kY')" 
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Main Glassmorphic Container */}
        <div 
          className="bg-white/70 backdrop-blur-md p-8 md:p-14 rounded-4xl border border-white/20 shadow-xl max-w-4xl w-full flex flex-col items-center space-y-8"
          style={{ boxShadow: '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff' }}
          id="hero-container"
        >
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

        {/* Concept Spotlight Card for dynamic interaction and proof of Concept Clarity */}
        <div className="mt-12 max-w-3xl w-full text-left bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" id="concept-spotlight">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-secondary-container/10 p-2 rounded-lg text-secondary-container">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-[16px] text-primary">Concept Clarity Spotlight</h4>
                <p className="font-sans text-xs text-gray-500">Understanding the reasoning behind formulas, not just memorizing.</p>
              </div>
            </div>
            {/* Spotlight tabs */}
            <div className="flex bg-gray-50 p-1 rounded-lg self-start md:self-auto text-xs">
              <button 
                onClick={() => setSpotlightConcept('pythagoras')}
                className={`px-3 py-1.5 rounded-md font-sans font-medium transition-all ${spotlightConcept === 'pythagoras' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Pythagoras Theorem
              </button>
              <button 
                onClick={() => setSpotlightConcept('derivative')}
                className={`px-3 py-1.5 rounded-md font-sans font-medium transition-all ${spotlightConcept === 'derivative' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Visual Derivatives
              </button>
              <button 
                onClick={() => setSpotlightConcept('limit')}
                className={`px-3 py-1.5 rounded-md font-sans font-medium transition-all ${spotlightConcept === 'limit' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Intuiting Limits
              </button>
            </div>
          </div>

          {/* Dynamic Concept presentation */}
          <div className="min-h-28 flex items-center">
            {spotlightConcept === 'pythagoras' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
                <div className="md:col-span-2 space-y-2">
                  <p className="font-sans text-sm text-gray-700 leading-relaxed">
                    Instead of just $a^2 + b^2 = c^2$, think of it as actual physical squares built on the sides of a right triangle. The total area of the two smaller squares matches the area of the largest square exactly.
                  </p>
                  <div className="inline-flex gap-4 text-xs font-mono text-gray-500">
                    <span>• Area A = $3^2 = 9$</span>
                    <span>• Area B = $4^2 = 16$</span>
                    <span>• Area C = $5^2 = 25$ ($9+16$)</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-primary/10">
                  <span className="font-mono text-xs text-gray-500 mb-1">Visual Formula</span>
                  <span className="font-sans text-[18px] font-bold text-primary italic">a² + b² = c²</span>
                </div>
              </div>
            )}

            {spotlightConcept === 'derivative' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
                <div className="md:col-span-2 space-y-2">
                  <p className="font-sans text-sm text-gray-700 leading-relaxed">
                    A derivative is simply the <strong>instantaneous rate of change</strong>. If you zoom in infinitely close to any curve (like a circle or parabola), it looks like a straight tangent line. The slope of that line is your derivative!
                  </p>
                  <div className="inline-flex gap-4 text-xs font-mono text-gray-500">
                    <span>• f(x) = x²</span>
                    <span>• f'(x) = 2x</span>
                    <span>• Slope at x=3 is 6</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-primary/10">
                  <span className="font-mono text-xs text-gray-500 mb-1">Visual Formula</span>
                  <span className="font-sans text-[18px] font-bold text-primary italic">f'(x) = lim (h→0) [f(x+h) - f(x)] / h</span>
                </div>
              </div>
            )}

            {spotlightConcept === 'limit' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
                <div className="md:col-span-2 space-y-2">
                  <p className="font-sans text-sm text-gray-700 leading-relaxed">
                    A limit asks: "What value does my function get closer and closer to, as the input approaches a target?" Even if the function has a hole right at that point, the limit tells us what value *should* be there.
                  </p>
                  <div className="inline-flex gap-4 text-xs font-mono text-gray-500">
                    <span>• Example: (sin x) / x at x=0</span>
                    <span>• Plugging 0 gives 0/0 (undefined)</span>
                    <span>• But approaches exactly 1</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-primary/10">
                  <span className="font-mono text-xs text-gray-500 mb-1">Visual Formula</span>
                  <span className="font-sans text-[18px] font-bold text-primary italic">lim (x→0) [sin(x) / x] = 1</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
