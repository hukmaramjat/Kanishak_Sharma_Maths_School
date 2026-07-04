import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Settings, LogIn, User } from 'lucide-react';

interface AppSettings {
  logoUrl: string;
  phoneNumber: string;
  admissionsText: string;
  enrolledStudentsCount: string;
}

interface HeaderProps {
  onBookDemoClick: () => void;
  onNavigate: (sectionId: string) => void;
  settings: AppSettings;
  onAdminToggle: () => void;
  isAdmin: boolean;
  isAdminAuthenticated: boolean;
  isStudentAuthenticated?: boolean;
  studentEmail?: string;
}

export default function Header({ onBookDemoClick, onNavigate, settings, onAdminToggle, isAdmin, isAdminAuthenticated, isStudentAuthenticated, studentEmail }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Courses', href: 'courses' },
    { name: 'Boards', href: 'boards' },
    { name: 'Home Tuitions', href: 'home-tuition' },
    { name: 'Practice Quiz', href: 'quiz' },
    { name: 'Formulas', href: 'formulas' },
    { name: 'Reviews', href: 'reviews' },
    { name: 'FAQ', href: 'faq' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  // Safe helper to strip spacing/symbols from phone number for wa.me link
  const cleanPhoneForWa = settings.phoneNumber.replace(/[^\d]/g, '');

  return (
    <nav className="sticky top-0 w-full z-40 bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center cursor-pointer transition-transform duration-200 active:scale-95"
          id="nav-logo"
        >
          <img 
            alt="Kanishak Sharma Maths School Logo" 
            className="h-11 w-auto object-contain" 
            src={settings.logoUrl}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-7">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="font-sans text-[14px] font-medium text-gray-700 hover:text-secondary-container transition-colors duration-200 cursor-pointer"
              id={`nav-link-${item.href}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Call to action */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Admin / Login Switch */}
          <button
            onClick={onAdminToggle}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full font-sans font-bold text-[12px] transition-all duration-300 active:scale-95 border ${
              isAdmin 
                ? 'bg-secondary-container border-secondary-container text-white shadow-sm'
                : 'bg-indigo-50/50 border-indigo-100 text-indigo-900 hover:bg-indigo-100/50'
            }`}
            id="header-admin-toggle-btn"
          >
            {isAdminAuthenticated ? (
              <>
                <Settings size={13} className={isAdmin ? 'animate-spin-slow' : ''} />
                <span>{isAdmin ? 'Exit Admin' : 'Admin Area'}</span>
              </>
            ) : isStudentAuthenticated ? (
              <>
                <User size={13} className="text-secondary-container" />
                <span className="text-primary">Cabinet ({studentEmail?.split('@')[0]})</span>
              </>
            ) : (
              <>
                <LogIn size={13} />
                <span>Login & Sign In</span>
              </>
            )}
          </button>

          <a 
            href={`https://wa.me/${cleanPhoneForWa}?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20maths%20courses.`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white px-3.5 py-2.5 rounded-full font-sans font-bold text-[12px] transition-all duration-300 active:scale-95"
            id="header-wa-direct-btn"
          >
            <MessageCircle size={14} />
            <span>{settings.phoneNumber}</span>
          </a>
          
          <button
            onClick={onBookDemoClick}
            className="bg-white border border-gray-200 text-primary hover:text-secondary-container px-5 py-2.5 rounded-full font-sans font-semibold text-[13px] hover:shadow-md transition-all duration-300 active:scale-95 flex items-center gap-1.5"
            style={{ boxShadow: '5px 5px 10px #cfd0d3, -5px -5px 10px #ffffff' }}
            id="header-cta-btn"
          >
            Book a Free Trial Lesson
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Admin / Login button */}
          <button
            onClick={onAdminToggle}
            className={`p-2 rounded-full border ${isAdmin ? 'bg-secondary-container border-secondary-container text-white' : 'bg-gray-50 border-gray-100 text-indigo-900'}`}
            title={isAdminAuthenticated ? "Admin Mode" : isStudentAuthenticated ? "Student Cabinet" : "Login & Sign In"}
          >
            {isAdminAuthenticated ? (
              <Settings size={18} className={isAdmin ? 'animate-spin-slow' : ''} />
            ) : isStudentAuthenticated ? (
              <User size={18} className="text-secondary-container" />
            ) : (
              <LogIn size={18} />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary p-2 hover:bg-gray-50 rounded-full transition-colors"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="font-sans text-[16px] font-medium text-gray-700 hover:text-secondary-container text-left py-2"
                id={`mobile-nav-link-${item.href}`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile login option */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAdminToggle();
              }}
              className="bg-gray-50 border border-gray-200 text-primary hover:text-secondary-container px-6 py-3 rounded-full font-sans font-semibold text-center text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
            >
              {isAdminAuthenticated ? (
                <>
                  <Settings size={16} /> Admin Panel
                </>
              ) : isStudentAuthenticated ? (
                <>
                  <User size={16} className="text-secondary-container" /> Learning Cabinet
                </>
              ) : (
                <>
                  <LogIn size={16} /> Login & Sign In
                </>
              )}
            </button>
            
            <a 
              href={`https://wa.me/${cleanPhoneForWa}?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20maths%20courses.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white hover:bg-[#128C7E] px-6 py-3 rounded-full font-sans font-bold text-center text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
              id="mobile-header-wa-btn"
            >
              <MessageCircle size={16} /> {settings.phoneNumber}
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookDemoClick();
              }}
              className="bg-primary text-white hover:bg-primary-container px-6 py-3 rounded-full font-sans font-semibold text-center text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
              id="mobile-header-cta-btn"
            >
              Book a Free Trial Lesson <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
