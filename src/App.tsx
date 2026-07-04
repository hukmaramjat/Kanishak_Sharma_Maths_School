import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Boards from './components/Boards';
import HomeTuition from './components/HomeTuition';
import DemoBookingModal from './components/DemoBookingModal';
import MathQuiz from './components/MathQuiz';
import FormulaSheet from './components/FormulaSheet';
import Reviews from './components/Reviews';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import StudentCabinet from './components/StudentCabinet';

import { Phone, MessageCircle, X, Send, CheckCircle2, Calendar, HelpCircle, ArrowRight } from 'lucide-react';
import { Booking, Board, Review } from './types';
import { BOARDS_DATA, INITIAL_REVIEWS } from './data';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Student OTP Authentication State
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  
  // General Site Settings State
  const [settings, setSettings] = useState({
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqX5hWXMq8IyVm3vhmeT-FlxSH3VvpH6GCT7hobcQAZJ08wloDURU79-8TVB29lS1lBKJw3viyvt2Tmh2_OqThq5y7gKTGXG2pyEmbcoiR9xVqHKd24Xr8MjvaiOyIGfZO1NoPWVI2ew_zrJ8PZv-4jg9n4R-B3G40BQjkDia4nmdOO7roEIzVuhJ6FluwqxAi9kdjwr6aljSDksWvTXu-kpJBUfaFdmz4kIKIhw1Nz64IWvNnXN2qLfA5POb51Zz6tGdCKqdIJDUf",
    phoneNumber: "+91 9166931387",
    admissionsText: "Admissions Open 2024-25",
    enrolledStudentsCount: "10,000+",
    showPricingBoards: true,
    showSuccessStories: true,
    showConceptVault: true,
    showDiagnosticQuiz: true
  });

  // Boards and Courses State
  const [boards, setBoards] = useState<Board[]>(BOARDS_DATA);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Callbacks State
  const [callbacks, setCallbacks] = useState<any[]>([]);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  
  // Floating contact states
  const [showWhatsAppDrawer, setShowWhatsAppDrawer] = useState(false);
  const [waMessage, setWaMessage] = useState('');
  const [waChatHistory, setWaChatHistory] = useState<{ sender: 'user' | 'bot'; text: string; time: string }[]>([
    { sender: 'bot', text: 'Namaste! Welcome to Kanishak Sharma Maths School. How can I help you today?', time: 'Just now' }
  ]);

  const [showCallbackDrawer, setShowCallbackDrawer] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackName, setCallbackName] = useState('');
  const [callbackTopic, setCallbackTopic] = useState('General Admission');
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  useEffect(() => {
    // Load general settings
    const storedSettings = localStorage.getItem('math_general_settings');
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error('Error parsing settings', e);
      }
    }

    // Load boards
    const storedBoards = localStorage.getItem('math_boards');
    if (storedBoards) {
      try {
        setBoards(JSON.parse(storedBoards));
      } catch (e) {
        console.error('Error parsing boards', e);
      }
    }

    // Load reviews
    const storedReviews = localStorage.getItem('math_reviews');
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (e) {
        console.error('Error parsing reviews', e);
      }
    } else {
      // Initialize with default reviews in storage so Admin can see/delete them
      localStorage.setItem('math_reviews', JSON.stringify(INITIAL_REVIEWS));
      setReviews(INITIAL_REVIEWS);
    }

    // Load local bookings
    const bookings = JSON.parse(localStorage.getItem('math_bookings') || '[]');
    setActiveBookings(bookings);

    // Load local callbacks
    const loadedCallbacks = JSON.parse(localStorage.getItem('math_callbacks') || '[]');
    setCallbacks(loadedCallbacks);
  }, []);

  const handleUpdateSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem('math_general_settings', JSON.stringify(newSettings));
  };

  const handleUpdateBoards = (newBoards: Board[]) => {
    setBoards(newBoards);
    localStorage.setItem('math_boards', JSON.stringify(newBoards));
  };

  const handleUpdateReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('math_reviews', JSON.stringify(newReviews));
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...activeBookings];
    setActiveBookings(updated);
  };

  const handleScrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'courses' ? 'boards' : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendWaMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waMessage.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMsg = waMessage;
    const history = [...waChatHistory, { sender: 'user' as const, text: userMsg, time: timeString }];
    setWaChatHistory(history);
    setWaMessage('');

    // Simulated responses based on keywords
    setTimeout(() => {
      let botResponse = "Thank you! An admissions counsellor is being assigned to your chat. You can also book a free 1-on-1 trial lesson instantly using the button at the top!";
      const query = userMsg.toLowerCase();
      if (query.includes('fee') || query.includes('price') || query.includes('cost')) {
        botResponse = "Our tuition fee starts from ₹4,999 ($60 USD) / month for CBSE, up to ₹9,999 ($120 USD) / month for advanced IB DP AA/HL. You can use our interactive fee calculator in the 'Boards We Cover' section below!";
      } else if (query.includes('syllabus') || query.includes('board') || query.includes('cbse') || query.includes('ib') || query.includes('igcse')) {
        botResponse = "We offer tailored 1-on-1 curricula for CBSE, ICSE, Cambridge IGCSE, and IB (MYP/DP). Scroll down to our 'Boards We Cover' section to view detailed syllabus topics!";
      } else if (query.includes('demo') || query.includes('trial') || query.includes('book')) {
        botResponse = "You can book a 100% free, 45-minute diagnostic trial lesson! Please click the 'Book a Free Trial Lesson' button at the top or on any course card.";
      }

      setWaChatHistory(prev => [...prev, { sender: 'bot' as const, text: botResponse, time: timeString }]);
    }, 1000);
  };

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim() || !callbackName.trim()) {
      alert('Please fill out your name and phone number.');
      return;
    }

    // Save callback log
    const callbackLog = {
      id: 'CBK-' + Date.now(),
      name: callbackName,
      phone: callbackPhone,
      topic: callbackTopic,
      status: 'pending',
      date: new Date().toLocaleDateString()
    };

    const existingLogs = JSON.parse(localStorage.getItem('math_callbacks') || '[]');
    existingLogs.push(callbackLog);
    localStorage.setItem('math_callbacks', JSON.stringify(existingLogs));
    setCallbacks(existingLogs);

    setCallbackSuccess(true);
    setTimeout(() => {
      setCallbackSuccess(false);
      setShowCallbackDrawer(false);
      setCallbackPhone('');
      setCallbackName('');
    }, 3000);
  };

  // Dynamic SEO Metadata Configuration
  const [activeSection, setActiveSection] = useState<'home' | 'boards' | 'home-tuition' | 'quiz' | 'formulas' | 'reviews' | 'faq'>('home');

  useEffect(() => {
    if (isAdminMode || isStudentAuthenticated) return;

    const sections = ['hero', 'boards', 'home-tuition', 'quiz', 'formulas', 'reviews', 'faq'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id === 'hero' ? 'home' : (id === 'formulas' ? 'formulas' : id) as any);
          }
        },
        { threshold: 0.15, rootMargin: '-15% 0px -40% 0px' }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs && obs.observer) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, [isAdminMode, isStudentAuthenticated]);

  // Determine current active metadata context
  const getSEOMetadata = () => {
    if (isAdminMode) {
      return {
        title: "Administrator Workspace Portal | Kanishak Sharma Maths School",
        description: "Secure administrator dashboard. Manage registered CBSE, IB DP, and Cambridge IGCSE student accounts, update interactive fee schedules, view complimentary trial bookings, and handle callbacks.",
        keywords: "admin panel, secure administrator workspace, tutor database, math school backend, student management",
        ogType: "website"
      };
    }
    if (isStudentAuthenticated) {
      return {
        title: `Student Cabinet Study Portal | Kanishak Sharma Maths School`,
        description: "Welcome to your personal math study cabinet. Access curated formulas sheets, practice papers, conceptual boards lessons, mock tests, and get real-time WhatsApp tutoring support.",
        keywords: "student dashboard, student login cabinet, math learning portal, digital formula vault, customized maths help",
        ogType: "profile"
      };
    }

    switch (activeSection) {
      case 'boards':
        return {
          title: "CBSE, IB DP & IGCSE Mathematics Courses | Kanishak Sharma Maths School",
          description: "Curated mathematics coaching programs with interactive fee calculators. Custom syllabus coverage for high-performing CBSE foundations, Advanced IB DP Analysis, & Cambridge IGCSE.",
          keywords: "cbse math curriculum, ib dp math tutor, cambridge igcse coaching, interactive tuition fee calculator, customized board syllabus",
          ogType: "product"
        };
      case 'home-tuition':
        return {
          title: "Personalized 1-on-1 Home & Online Maths Tuitions | Kanishak Sharma",
          description: "Stellar 1-on-1 private home tuitions and state-of-the-art interactive online coaching. Structured teaching methods designed to help students score 100/100 and foster deep analytical thinking.",
          keywords: "home tuition maths, online private tutor, personalized learning math, face to face tutor, score 100 in mathematics",
          ogType: "website"
        };
      case 'quiz':
        return {
          title: "Free Math Diagnostic Quiz & Conceptual Skill Assessment Test",
          description: "Evaluate your actual mathematical proficiency with our interactive diagnostic quiz. Instantly solve board-level questions and view comprehensive, step-by-step explanations.",
          keywords: "math diagnostic test, free math quiz, test math skills online, check maths proficiency level, conceptual board questions",
          ogType: "website"
        };
      case 'formulas':
        return {
          title: "Free Mathematics Formula Sheets & PDFs - Rapid Revision Library",
          description: "Download beautifully compiled formula sheets covering Algebra, Calculus, Trigonometry, and Geometry. Crafted perfectly for rapid exams revision by Kanishak Sharma Maths School.",
          keywords: "free math formulas pdf, algebra formula sheet, calculus cheat sheet, geometry revision notes, igcse math formulas",
          ogType: "article"
        };
      case 'reviews':
        return {
          title: "Outstanding Results & Parent Reviews | Kanishak Sharma Maths School",
          description: "Read verified student and parent reviews across various curriculum boards. Authentic testimonials of massive score improvements, clear concepts, and top-tier academic results.",
          keywords: "math tutor testimonials, parent reviews, authentic feedback, top maths educator india, student results history",
          ogType: "website"
        };
      case 'faq':
        return {
          title: "Frequently Asked Questions (FAQs) & Support | Admissions Open",
          description: "Get immediate answers to class frequencies, live digital tools usage, backup class protocols, and customized fee details. Submit a callback request in seconds.",
          keywords: "math admission faq, lesson structure, backup math classes, online whiteboard tuition, prompt call support",
          ogType: "website"
        };
      case 'home':
      default:
        return {
          title: "Kanishak Sharma Maths School | Elite 1-on-1 Online & Home Tuitions",
          description: "Transform your mathematics scores with Kanishak Sharma. Elite personalized 1-on-1 online and home tuitions for CBSE, ICSE, IB DP (AA/HL), and Cambridge IGCSE. Request a free trial today!",
          keywords: "kanishak sharma maths school, online maths tuition, private maths tutor, ib math expert, cbse high school maths, custom math mentor",
          ogType: "website"
        };
    }
  };

  const seo = getSEOMetadata();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ksmathsschool.com';
  const canonicalUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.pathname) : 'https://ksmathsschool.com';

  return (
    <div className="min-h-screen bg-[#fbf8fd] text-gray-900 font-sans antialiased selection:bg-[#fe6b00]/30 selection:text-[#000928]">
      
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={seo.ogType} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={settings.logoUrl} />
        <meta property="og:url" content={currentUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={settings.logoUrl} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      
      {isAdminMode && isAdminAuthenticated && (
        <div className="bg-[#fe6b00] text-white text-center py-2.5 px-4 text-xs font-bold font-sans flex items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
          <span>🛠️ You are in the Administrator Control Panel (Database Simulation Mode)</span>
          <button 
            onClick={() => {
              setIsAdminMode(false);
              setIsAdminAuthenticated(false);
            }}
            className="bg-white text-[#fe6b00] hover:bg-white/90 px-3 py-1 rounded-full text-[11px] font-sans font-extrabold transition-all active:scale-95 cursor-pointer"
          >
            Exit Admin Area
          </button>
        </div>
      )}

      {/* 1. Header Navigation */}
      <Header 
        onBookDemoClick={() => setIsBookingOpen(true)} 
        onNavigate={handleScrollToSection}
        settings={settings}
        onAdminToggle={() => {
          if (isAdminMode) {
            setIsAdminMode(false);
            setIsAdminAuthenticated(false);
          } else if (isStudentAuthenticated) {
            // Logout student
            setIsStudentAuthenticated(false);
            setStudentEmail('');
          } else {
            setIsAdminMode(true);
          }
        }}
        isAdmin={isAdminMode}
        isAdminAuthenticated={isAdminAuthenticated}
        isStudentAuthenticated={isStudentAuthenticated}
        studentEmail={studentEmail}
      />

      {isAdminMode ? (
        <div className="max-w-[1280px] mx-auto px-6 py-10 animate-fade-in">
          {isAdminAuthenticated ? (
            <AdminPanel 
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              boards={boards}
              onUpdateBoards={handleUpdateBoards}
              reviews={reviews}
              onUpdateReviews={handleUpdateReviews}
              bookings={activeBookings}
              callbacks={callbacks}
              onClose={() => {
                setIsAdminMode(false);
                setIsAdminAuthenticated(false);
              }}
            />
          ) : (
            <AdminLogin 
              onAdminSuccess={() => setIsAdminAuthenticated(true)}
              onStudentSuccess={(email) => {
                setStudentEmail(email);
                setIsStudentAuthenticated(true);
                setIsAdminMode(false);
              }}
              onCancel={() => {
                setIsAdminMode(false);
                setIsAdminAuthenticated(false);
              }}
              logoUrl={settings.logoUrl}
            />
          )}
        </div>
      ) : isStudentAuthenticated ? (
        <div className="max-w-[1280px] mx-auto px-6 py-12 animate-fade-in">
          <StudentCabinet 
            email={studentEmail}
            bookings={activeBookings}
            onBookClick={() => setIsBookingOpen(true)}
            onNavigateToQuiz={() => {
              // Exit cabinet to highlight quiz on standard page
              setIsStudentAuthenticated(false);
              setTimeout(() => handleScrollToSection('quiz'), 100);
            }}
            onLogout={() => {
              setIsStudentAuthenticated(false);
              setStudentEmail('');
            }}
          />
        </div>
      ) : (
        <>
          {/* Main Core Body */}
          <main>
            {/* 2. Hero Section */}
            <Hero 
              onBookDemoClick={() => setIsBookingOpen(true)} 
              onCallClick={() => setShowCallbackDrawer(true)}
              onNavigateToQuiz={() => handleScrollToSection('quiz')}
              settings={settings}
            />

            {/* Existing Active Bookings Bar (If user has bookings) */}
            {activeBookings.length > 0 && (
              <section className="bg-[#fe6b00]/5 py-4 px-6 border-y border-[#fe6b00]/20">
                <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 text-[#000928] font-bold">
                    <Calendar size={18} className="text-[#fe6b00]" />
                    <span>You have scheduled a free 1-on-1 demo:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {activeBookings.slice(0, 1).map((bk) => (
                      <span key={bk.id} className="bg-white border border-gray-100 font-mono text-xs font-bold text-[#000928] px-3 py-1.5 rounded-lg shadow-sm">
                        {bk.date} @ {bk.timeSlot.split('IST')[0]}
                      </span>
                    ))}
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="text-xs font-bold text-[#fe6b00] hover:underline"
                    >
                      Manage Bookings ({activeBookings.length})
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* 3. Boards & Pricing Section */}
            <Boards onBookDemoClick={() => setIsBookingOpen(true)} boards={boards} showPricingBoards={settings.showPricingBoards} />

            {/* 3.5. Home Tuition Section */}
            <HomeTuition onBookDemoClick={() => setIsBookingOpen(true)} />

            {/* 4. Diagnostic Quiz Section */}
            {settings.showDiagnosticQuiz && <MathQuiz onBookDemoClick={() => setIsBookingOpen(true)} />}

            {/* 5. Concept Vault / Formulas */}
            {settings.showConceptVault && <FormulaSheet />}

            {/* 6. Success Stories / Reviews */}
            {settings.showSuccessStories && <Reviews reviews={reviews} />}

            {/* 7. FAQ Help Section */}
            <FaqSection onBookDemoClick={() => setIsBookingOpen(true)} />
          </main>
        </>
      )}

      {/* 8. Institutional Footer */}
      <Footer onNavigate={handleScrollToSection} settings={settings} />


      {/* Floating Call & Chat Action buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 select-none" id="floating-actions-container">
        {/* Call Back request trigger */}
        <button
          onClick={() => setShowCallbackDrawer(true)}
          className="bg-white text-[#000928] hover:text-[#fe6b00] p-3.5 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center w-[52px] h-[52px] border border-gray-100 cursor-pointer"
          style={{ boxShadow: '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff' }}
          title="Request a callback"
          id="float-callback-trigger"
        >
          <Phone size={22} />
        </button>

        {/* WhatsApp chat assistant trigger */}
        <button
          onClick={() => setShowWhatsAppDrawer(true)}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center w-[52px] h-[52px] shadow-lg cursor-pointer"
          title="Chat with WhatsApp Support"
          id="float-wa-trigger"
        >
          <MessageCircle size={24} />
        </button>
      </div>


      {/* MODAL & SLIDE-OUT DRAWERS (FULLY IMPLEMENTED) */}

      {/* Booking Modal */}
      <DemoBookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* WhatsApp Assistant Slide-over Card */}
      {showWhatsAppDrawer && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-[360px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl animate-fade-in flex flex-col max-h-[480px]">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">KS</div>
              <div>
                <h4 className="font-heading font-extrabold text-[14px]">Admissions Desk</h4>
                <p className="font-sans text-[10px] text-emerald-100">Typically replies within 1 minute</p>
              </div>
            </div>
            <button onClick={() => setShowWhatsAppDrawer(false)} className="text-emerald-100 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          {/* Chat log body */}
          <div className="p-4 bg-[#ece5dd] overflow-y-auto flex-1 space-y-3 min-h-[220px]">
            {/* Direct Link Banner */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-[#25D366]/30 text-center space-y-2">
              <p className="font-sans text-[11px] text-gray-600">Want to chat with us on the official WhatsApp app?</p>
              <a 
                href="https://wa.me/919166931387?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20maths%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-sm"
              >
                <MessageCircle size={12} />
                Open WhatsApp Chat
              </a>
            </div>

            {waChatHistory.map((chat, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-normal font-sans shadow-sm ${
                  chat.sender === 'user' 
                    ? 'bg-[#dcf8c6] text-gray-800 ml-auto rounded-tr-none' 
                    : 'bg-white text-gray-800 mr-auto rounded-tl-none'
                }`}
              >
                <p>{chat.text}</p>
                <span className="block text-[9px] text-gray-400 text-right mt-1 font-mono">{chat.time}</span>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendWaMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              placeholder="Type message..."
              value={waMessage}
              onChange={(e) => setWaMessage(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 outline-none rounded-xl px-3.5 py-2 text-xs font-sans focus:border-[#128C7E]"
            />
            <button type="submit" className="bg-[#128C7E] hover:bg-[#075E54] text-white p-2.5 rounded-xl transition-colors cursor-pointer">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Request Call Back Slide-over Card */}
      {showCallbackDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#000928]/35 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 p-6 md:p-8 space-y-5 relative">
            <button 
              onClick={() => setShowCallbackDrawer(false)}
              className="text-gray-400 hover:text-gray-600 absolute top-5 right-5 p-1 rounded-full hover:bg-gray-50"
            >
              <X size={18} />
            </button>

            {callbackSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-200">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-heading font-bold text-[#000928] text-lg">Request Logged!</h4>
                <p className="font-sans text-xs text-gray-500">A maths teacher will dial your number within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestCallback} className="space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-[#000928] text-lg">Request Call Back</h3>
                  <p className="font-sans text-xs text-gray-500">Skip the forms. Input your contact details, and we'll ring you.</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-500">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satish Sharma"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl px-4 py-2.5 text-xs font-sans transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-500">Phone Number (with Code)</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9166931387"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl px-4 py-2.5 text-xs font-sans transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-500">I am inquiring about</label>
                    <select
                      value={callbackTopic}
                      onChange={(e) => setCallbackTopic(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl px-3 py-2.5 text-xs font-sans transition-all"
                    >
                      <option value="General Admission">General Admissions 2024</option>
                      <option value="CBSE curriculum">CBSE & ICSE Foundations</option>
                      <option value="IGCSE syllabus">Cambridge IGCSE & GCSE</option>
                      <option value="IB AA SL/HL">IB DP Mathematics</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#000928] hover:bg-[#fe6b00] text-white py-3 rounded-xl font-sans font-bold text-xs transition-colors cursor-pointer"
                >
                  Initiate Instant Call Back
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
