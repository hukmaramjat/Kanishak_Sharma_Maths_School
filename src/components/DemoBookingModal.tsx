import React, { useState } from 'react';
import { X, User, Phone, Mail, GraduationCap, Calendar as CalendarIcon, Clock, Check, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { Booking } from '../types';
import { BOARDS_DATA } from '../data';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (newBooking: Booking) => void;
}

export default function DemoBookingModal({ isOpen, onClose, onBookingSuccess }: DemoBookingModalProps) {
  const [step, setStep] = useState(1);
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [boardId, setBoardId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [socialId, setSocialId] = useState('');
  
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  // Mock slots
  const availableSlots = [
    '10:00 AM - 11:00 AM IST',
    '12:00 PM - 01:00 PM IST',
    '03:00 PM - 04:00 PM IST',
    '05:00 PM - 06:00 PM IST',
    '07:00 PM - 08:00 PM IST',
    '08:30 PM - 09:30 PM IST'
  ];

  // Helper dates (next 7 days starting tomorrow)
  const getNext7Days = () => {
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      const isSunday = d.getDay() === 0;
      if (!isSunday) { // skip sundays
        const dayStr = weekdays[d.getDay()];
        const monthStr = months[d.getMonth()];
        const dateNum = d.getDate();
        const fullDateString = `${dayStr}, ${dateNum} ${monthStr} ${d.getFullYear()}`;
        dates.push({
          label: `${dayStr}, ${dateNum} ${monthStr}`,
          value: fullDateString
        });
      }
    }
    return dates;
  };

  const datesList = getNext7Days();

  const handleNextStep = () => {
    if (step === 1) {
      if (!parentName.trim() || !studentName.trim() || !grade || !contactNumber.trim() || !email.trim()) {
        alert('Please fill out all fields to continue.');
        return;
      }
    }
    if (step === 2) {
      if (!boardId) {
        alert('Please select a curriculum board to continue.');
        return;
      }
    }
    if (step === 3) {
      if (!selectedDate || !timeSlot) {
        alert('Please select a date and time slot.');
        return;
      }
      
      // Complete booking!
      const finalBooking: Booking = {
        id: 'BKM-' + Math.floor(100000 + Math.random() * 900000),
        parentName,
        studentName,
        grade,
        boardId,
        date: selectedDate,
        timeSlot,
        contactNumber,
        email,
        status: 'confirmed',
        socialId: socialId.trim()
      };

      // Store in localStorage
      const existing = JSON.parse(localStorage.getItem('math_bookings') || '[]');
      existing.push(finalBooking);
      localStorage.setItem('math_bookings', JSON.stringify(existing));

      // Callback
      onBookingSuccess(finalBooking);
      setSuccessBooking(finalBooking);
      setStep(4);

      // Automatically construct and open WhatsApp message to secure the booking
      const waText = `Hello Kanishak Sharma Maths School! 📚✨\n\n` +
        `I have successfully booked a complimentary 1-on-1 trial class on your website!\n\n` +
        `📝 *Booking Details*:\n` +
        `• *Student Name*: ${finalBooking.studentName}\n` +
        `• *Grade / Class*: ${finalBooking.grade}\n` +
        `• *Date*: ${finalBooking.date}\n` +
        `• *Time Slot*: ${finalBooking.timeSlot}\n` +
        `• *Parent Name*: ${finalBooking.parentName}\n` +
        `• *Contact Phone*: ${finalBooking.contactNumber}\n` +
        `• *Email Address*: ${finalBooking.email}\n` +
        `• *Board / Curriculum*: ${selectedBoard ? selectedBoard.name : 'Standard'}\n\n` +
        `Please confirm my scheduled session. Thank you!`;
      
      const waUrl = `https://wa.me/919166931387?text=${encodeURIComponent(waText)}`;
      
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }

      // Asynchronously send the booking details notification to the administrator
      fetch('/api/bookings/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking: finalBooking }),
      })
      .then(res => res.json())
      .then(data => {
        console.log('[BOOKING-NOTIFICATION] Dispatch result:', data);
      })
      .catch(err => {
        console.error('[BOOKING-NOTIFICATION] Error dispatching email notification:', err);
      });

      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setParentName('');
    setStudentName('');
    setGrade('');
    setBoardId('');
    setSelectedDate('');
    setTimeSlot('');
    setContactNumber('');
    setEmail('');
    setSocialId('');
    setSuccessBooking(null);
    onClose();
  };

  const selectedBoard = BOARDS_DATA.find(b => b.id === boardId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000928]/40 backdrop-blur-sm animate-fade-in" id="booking-modal-overlay">
      <div 
        className="bg-white rounded-3xl w-full max-w-[650px] overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[90vh]"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 9, 40, 0.25)' }}
        id="booking-modal-content"
      >
        {/* Header banner */}
        <div className="bg-[#000928] text-white p-6 relative flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-heading font-bold text-xl">Book a Free Trial Lesson</h3>
            <p className="font-sans text-xs text-gray-300">Experience our 1-on-1 concept-focused coaching.</p>
          </div>
          <button 
            onClick={handleReset}
            className="text-white hover:text-[#fe6b00] p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            id="close-booking-modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress indicator */}
        {step < 4 && (
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex justify-between items-center text-xs text-gray-500 shrink-0 select-none">
            <span className="font-sans font-medium">Progress</span>
            <div className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${step >= 1 ? 'bg-[#fe6b00]' : 'bg-gray-200'}`}></span>
              <span className={`h-1 w-6 rounded-full ${step >= 2 ? 'bg-[#fe6b00]' : 'bg-gray-200'}`}></span>
              <span className={`h-2.5 w-2.5 rounded-full ${step >= 2 ? 'bg-[#fe6b00]' : 'bg-gray-200'}`}></span>
              <span className={`h-1 w-6 rounded-full ${step >= 3 ? 'bg-[#fe6b00]' : 'bg-gray-200'}`}></span>
              <span className={`h-2.5 w-2.5 rounded-full ${step >= 3 ? 'bg-[#fe6b00]' : 'bg-gray-200'}`}></span>
            </div>
          </div>
        )}

        {/* Modal body (scrollable) */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h4 className="font-heading font-bold text-[#000928] text-[16px] mb-2 flex items-center gap-2">
                <User size={18} className="text-[#fe6b00]" /> Student & Parent Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-gray-500">Parent / Guardian Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="e.g. Satish Sharma"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-gray-500">Student Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="e.g. Aarav Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-gray-500">Contact Number (WhatsApp Preferred)</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 text-gray-400" size={16} />
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 9166931387"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-gray-500">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 text-gray-400" size={16} />
                    <input 
                      type="email" 
                      placeholder="e.g. parent@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                {/* Social media profile ID input field */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-500">
                    Student Social Media Handle / ID (Instagram, X, LinkedIn, or Facebook)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-3 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="e.g. @aarav_maths or instagram.com/aarav"
                      value={socialId}
                      onChange={(e) => setSocialId(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-sans mt-0.5 leading-normal">
                    Provide one social profile handle or link to help our coordinators contact you.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-gray-500">Student's Current Grade / Class</label>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`py-2 text-[12px] font-sans font-semibold rounded-lg border text-center transition-all ${
                        grade === g 
                          ? 'bg-[#fe6b00] border-[#fe6b00] text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {g.replace('Grade ', 'G')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h4 className="font-heading font-bold text-[#000928] text-[16px] mb-2 flex items-center gap-2">
                <GraduationCap size={18} className="text-[#fe6b00]" /> Select Curricula Board
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {BOARDS_DATA.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => setBoardId(board.id)}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      boardId === board.id 
                        ? 'bg-[#fe6b00]/5 border-[#fe6b00] ring-1 ring-[#fe6b00]' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${boardId === board.id ? 'bg-[#fe6b00] text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {board.id === 'cbse-icse' && <Check size={18} />}
                      {board.id === 'igcse-gcse' && <Check size={18} />}
                      {board.id === 'ib-myp-dp' && <Check size={18} />}
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#000928]">{board.name}</h5>
                      <p className="font-sans text-xs text-[#fe6b00] font-semibold mt-0.5">{board.subtitle}</p>
                      <p className="font-sans text-xs text-gray-500 mt-1 leading-normal">{board.curriculum.slice(0, 100)}...</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* Date selection */}
              <div>
                <h4 className="font-heading font-bold text-[#000928] text-[15px] mb-3 flex items-center gap-2">
                  <CalendarIcon size={16} className="text-[#fe6b00]" /> Choose Trial Date
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {datesList.map((dt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(dt.value)}
                      className={`py-2 px-1 rounded-xl border text-center flex flex-col gap-0.5 transition-all cursor-pointer ${
                        selectedDate === dt.value 
                          ? 'bg-[#000928] border-[#000928] text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider">{dt.label.split(',')[0]}</span>
                      <span className="font-sans text-[15px] font-extrabold">{dt.label.split(',')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot selection */}
              <div>
                <h4 className="font-heading font-bold text-[#000928] text-[15px] mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-[#fe6b00]" /> Select Time Slot
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-left font-sans text-xs font-semibold transition-all cursor-pointer ${
                        timeSlot === slot 
                          ? 'bg-[#fe6b00] border-[#fe6b00] text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && successBooking && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-2 border border-[#25D366]/20">
                <Check size={32} />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-heading font-extrabold text-2xl text-[#000928]">Booking Confirmed!</h3>
                <p className="font-sans text-sm text-gray-500">Your complimentary 1-on-1 demo has been scheduled.</p>
              </div>

              {/* Summary card */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-left max-w-md mx-auto space-y-3 font-sans text-sm text-gray-700">
                <div className="flex justify-between border-b border-gray-200/50 pb-2">
                  <span className="text-xs text-gray-400 font-bold uppercase">Booking ID</span>
                  <span className="font-mono font-bold text-[#000928]">{successBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Student</span>
                  <span className="font-bold text-[#000928]">{successBooking.studentName} ({successBooking.grade})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Curriculum</span>
                  <span className="font-bold text-[#000928]">{selectedBoard ? selectedBoard.name : 'Mathematics'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-bold text-[#000928]">{successBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time Window</span>
                  <span className="font-bold text-gray-800 text-xs">{successBooking.timeSlot}</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                An invite link has been sent to <strong className="text-[#000928]">{successBooking.email}</strong>. Our academic team will contact you on <strong className="text-[#000928]">{successBooking.contactNumber}</strong> via WhatsApp within 2 hours.
              </div>

              {/* High visibility WhatsApp Section */}
              <div className="bg-[#25D366]/5 border border-[#25D366]/20 p-5 rounded-2xl max-w-md mx-auto space-y-3">
                <p className="font-sans text-xs text-[#128C7E] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
                  WhatsApp Class Confirmation
                </p>
                <p className="text-[12px] text-gray-600 leading-relaxed font-sans">
                  We have automatically initiated a WhatsApp chat to secure your session. If it did not open automatically, please click the button below to send your reservation details:
                </p>
                <a
                  href={`https://wa.me/919166931387?text=${encodeURIComponent(
                    `Hello Kanishak Sharma Maths School! 📚✨\n\n` +
                    `I have successfully booked a complimentary 1-on-1 trial class on your website!\n\n` +
                    `📝 *Booking Details*:\n` +
                    `• *Student Name*: ${successBooking.studentName}\n` +
                    `• *Grade / Class*: ${successBooking.grade}\n` +
                    `• *Date*: ${successBooking.date}\n` +
                    `• *Time Slot*: ${successBooking.timeSlot}\n` +
                    `• *Parent Name*: ${successBooking.parentName}\n` +
                    `• *Contact Phone*: ${successBooking.contactNumber}\n` +
                    `• *Email Address*: ${successBooking.email}\n` +
                    `• *Board / Curriculum*: ${selectedBoard ? selectedBoard.name : 'Standard'}\n\n` +
                    `Please confirm my scheduled session. Thank you!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl font-sans font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.265 2.267 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.011-5.091-2.853-6.937C16.642 1.993 14.183.983 11.57.984c-5.437 0-9.863 4.414-9.866 9.831-.001 1.716.452 3.393 1.308 4.873l-.99 3.614 3.701-.97c1.472.804 3.037 1.226 4.334 1.226zm10.994-7.426c-.29-.145-1.714-.845-1.979-.942-.265-.096-.458-.145-.65.145-.192.29-.744.942-.912 1.134-.167.192-.335.216-.625.072-.29-.145-1.223-.45-2.33-1.439-.861-.767-1.443-1.716-1.611-2.005-.168-.29-.018-.445.127-.589.13-.13.29-.335.434-.503.145-.168.192-.289.29-.481.096-.192.048-.361-.024-.505-.072-.145-.65-1.564-.89-2.14-.233-.566-.47-.49-.65-.499-.168-.008-.361-.01-.554-.01-.193 0-.506.072-.77.361-.265.29-1.011.987-1.011 2.406 0 1.42 1.036 2.792 1.18 2.985.145.192 2.037 3.111 4.935 4.363.689.298 1.228.476 1.649.609.693.22 1.324.19 1.823.115.556-.083 1.714-.7 1.954-1.376.24-.675.24-1.253.168-1.376-.073-.122-.265-.218-.555-.363z"/>
                  </svg>
                  Open WhatsApp Chat
                </a>
              </div>

              <button
                onClick={handleReset}
                className="bg-[#000928] hover:bg-[#fe6b00] text-white px-8 py-3 rounded-xl font-sans font-bold text-sm transition-all"
                id="booking-confirmation-done"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

        {/* Modal footer navigation (shrinked) */}
        {step < 4 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center shrink-0">
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className={`flex items-center gap-1.5 text-xs font-sans font-bold py-2 px-4 rounded-lg select-none transition-all ${
                step === 1 
                  ? 'text-gray-300 bg-transparent cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
              }`}
              id="booking-modal-back-btn"
            >
              <ArrowLeft size={14} /> Back
            </button>

            <button
              onClick={handleNextStep}
              className="bg-[#000928] hover:bg-[#fe6b00] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              id="booking-modal-next-btn"
            >
              {step === 3 ? 'Confirm Schedule' : 'Continue'} <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
