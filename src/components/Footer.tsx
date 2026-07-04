import React from 'react';
import { Mail, Phone, MapPin, Globe, Compass, ArrowUp, GraduationCap, MessageCircle } from 'lucide-react';

interface AppSettings {
  logoUrl: string;
  phoneNumber: string;
  admissionsText: string;
  enrolledStudentsCount: string;
}

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  settings: AppSettings;
}

export default function Footer({ onNavigate, settings }: FooterProps) {
  const handleBackToTop = () => {
    onNavigate('hero');
  };

  const cleanPhone = settings.phoneNumber.replace(/[^\d]/g, '');

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10" id="footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand & Quote */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('hero')}>
            <span className="p-1.5 bg-orange-500 text-white rounded-lg">
              <GraduationCap size={20} />
            </span>
            <span className="font-heading font-extrabold text-lg tracking-tight">Kanishak Sharma Maths School</span>
          </div>
          
          <p className="font-sans text-xs text-gray-400 italic leading-relaxed">
            "Mathematics is the language in which God has written the universe." <br/>— Galileo Galilei
          </p>

          <p className="font-sans text-xs text-gray-400 leading-relaxed">
            Delivering conceptual clarity, academic fundamentals, and premier examination results globally.
          </p>
        </div>

        {/* Column 2: Curriculum Pathways */}
        <div className="space-y-4">
          <h4 className="font-heading font-extrabold text-[14px] uppercase tracking-wider text-orange-500">Curriculum Pathways</h4>
          <ul className="space-y-2.5 font-sans text-xs text-gray-300">
            <li>
              <button onClick={() => onNavigate('boards')} className="hover:text-white hover:underline transition-all">CBSE & ICSE (Indian Core)</button>
            </li>
            <li>
              <button onClick={() => onNavigate('boards')} className="hover:text-white hover:underline transition-all">IGCSE & GCSE (UK International)</button>
            </li>
            <li>
              <button onClick={() => onNavigate('boards')} className="hover:text-white hover:underline transition-all">IB Middle Years Programme (MYP)</button>
            </li>
            <li>
              <button onClick={() => onNavigate('boards')} className="hover:text-white hover:underline transition-all">IB Diploma Programme (DP AA/Applications)</button>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Navigation */}
        <div className="space-y-4">
          <h4 className="font-heading font-extrabold text-[14px] uppercase tracking-wider text-orange-500">Quick Actions</h4>
          <ul className="space-y-2.5 font-sans text-xs text-gray-300">
            <li>
              <button onClick={() => onNavigate('hero')} className="hover:text-white hover:underline transition-all">About School</button>
            </li>
            <li>
              <button onClick={() => onNavigate('home-tuition')} className="hover:text-white hover:underline transition-all font-bold text-white flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                Home Tuitions (New)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('quiz')} className="hover:text-white hover:underline transition-all">Maths Diagnostic Quiz</button>
            </li>
            <li>
              <button onClick={() => onNavigate('formulas')} className="hover:text-white hover:underline transition-all">Formula Reference Sheet</button>
            </li>
            <li>
              <button onClick={() => onNavigate('reviews')} className="hover:text-white hover:underline transition-all">Success Stories</button>
            </li>
            <li>
              <button onClick={() => onNavigate('faq')} className="hover:text-white hover:underline transition-all">Help & FAQ Desk</button>
            </li>
            <li className="pt-2">
              <a 
                href={`https://wa.me/${cleanPhone}?text=Hello!%20I%20am%20interested%20in%20joining%20Kanishak%20Sharma%20Maths%20School%20as%20a%20math%20tutor.%20Please%20share%20the%20onboarding%20process%20and%20tutor%20requirements.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                id="footer-become-tutor-btn"
              >
                <MessageCircle size={14} />
                Become a Tutor
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Campuses & Support */}
        <div className="space-y-4">
          <h4 className="font-heading font-extrabold text-[14px] uppercase tracking-wider text-orange-500">Global Offices</h4>
          <div className="space-y-3 font-sans text-xs text-gray-300">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-orange-500 shrink-0 mt-0.5" />
              <span>Jaipur (Home) • Worldwide (Online)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-orange-500 shrink-0" />
              <a href={`tel:${cleanPhone}`} className="hover:text-orange-500 hover:underline transition-all">{settings.phoneNumber}</a>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={14} className="text-[#25D366] shrink-0" />
              <a 
                href={`https://wa.me/${cleanPhone}?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20maths%20courses.`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#25D366] hover:underline transition-all"
              >
                WhatsApp Chat
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-orange-500 shrink-0" />
              <span>admissions@ksmathsschool.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-orange-500 shrink-0" />
              <span>www.ksmathsschool.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Under copyright segment */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-sans text-[11px] text-gray-400 text-center sm:text-left">
          Developed By Hukma Ram with ❤️ & for connect what app 6350546971
        </p>

        <button
          onClick={handleBackToTop}
          className="bg-white/5 hover:bg-white/15 text-white py-2 px-3.5 rounded-lg border border-white/10 text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          id="footer-back-to-top"
        >
          Back to top <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
