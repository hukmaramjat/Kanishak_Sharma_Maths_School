import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldAlert, KeyRound, CheckCircle2, RefreshCw } from 'lucide-react';

interface AdminLoginProps {
  onAdminSuccess: () => void;
  onStudentSuccess: (email: string) => void;
  onCancel: () => void;
  logoUrl: string;
}

export default function AdminLogin({ onAdminSuccess, onStudentSuccess, onCancel, logoUrl }: AdminLoginProps) {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  
  // Form States
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // OTP Flow States
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [demoOtp, setDemoOtp] = useState<string | null>(null);

  // Countdown timer for resending OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle Admin Password Login
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      if (cleanEmail === 'admissions@ksmathsschool.com' && cleanPassword === '9166931387') {
        onAdminSuccess();
      } else {
        setError('Incorrect Administrator email or password. Access denied.');
        setIsLoading(false);
      }
    }, 600);
  };

  // Handle Student / Visitor OTP Request
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admissions@ksmathsschool.com') {
      setActiveTab('admin');
      setError('');
      setSuccessMsg('Administrator account detected. Please enter your secure access password.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setCountdown(60); // 60 seconds rate limit
        setSuccessMsg('A 6-digit verification code has been dispatched to your email.');
        
        // Save test OTP for effortless preview in local dev sandbox
        if (data.testOtp) {
          setDemoOtp(data.testOtp);
        }
      } else {
        setError(data.error || 'Failed to dispatch verification code. Please try again.');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Connection failure. Ensure the server is online and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Verification Submission
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit verification code.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg('Email verified successfully! Opening student cabinet...');
        setTimeout(() => {
          onStudentSuccess(data.email);
        }, 800);
      } else {
        setError(data.error || 'Verification code is invalid or has expired.');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Connection failure. Verification aborted.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 transition-all duration-300"
        style={{ boxShadow: '12px 12px 24px #e5e6e9, -12px -12px 24px #ffffff' }}
        id="login-portal-card"
      >
        {/* Brand Header */}
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <img 
              alt="Kanishak Sharma Maths School Logo" 
              className="h-12 w-auto object-contain"
              src={logoUrl}
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-[24px] font-extrabold font-sans text-[#000928] tracking-tight">
            Maths School Login
          </h2>
          <p className="mt-1.5 text-xs text-gray-500 font-sans">
            Access your courses, scheduled trial lessons, and diagnostics
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-800 p-3.5 rounded-xl text-xs" id="login-error-alert">
            <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
            <span className="font-medium font-sans leading-relaxed">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start gap-2.5 bg-green-50 border border-green-100 text-green-800 p-3.5 rounded-xl text-xs" id="login-success-alert">
            <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
            <span className="font-medium font-sans leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* Demo OTP Helper Callout for easier local environment preview */}
        {activeTab === 'student' && otpSent && demoOtp && (
          <div className="bg-[#fe6b00]/5 border border-[#fe6b00]/25 rounded-2xl p-4 text-center space-y-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#fe6b00]">
              <KeyRound size={13} />
              <span>Sandbox Demo OTP Code</span>
            </div>
            <p className="text-xs text-gray-600">
              For testing convenience in the sandbox container:
            </p>
            <div className="text-lg font-mono font-black text-[#fe6b00] tracking-wider select-all">
              {demoOtp}
            </div>
          </div>
        )}

        {/* STUDENT FLOW: OTP AUTHENTICATION */}
        {activeTab === 'student' && (
          <div className="space-y-4">
            {!otpSent ? (
              /* Step 1: Request OTP */
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 font-sans">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail size={16} />
                    </span>
                    <input
                      id="student-email"
                      type="email"
                      required
                      className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#fe6b00] focus:ring-1 focus:ring-[#fe6b00] bg-gray-50/50 text-[#000928] font-sans text-sm outline-none transition-all duration-200"
                      placeholder="e.g. parent@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    We will send a secure 6-digit one-time passcode (OTP) to this inbox. No password needed!
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-[#fe6b00] hover:bg-[#e05e00] text-white py-3.5 rounded-xl font-sans font-bold text-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    isLoading ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                  id="send-otp-btn"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Sending Secure Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send OTP Code</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Step 2: Enter & Verify OTP */
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 font-sans">
                      Enter 6-Digit Verification Code
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setError('');
                        setSuccessMsg('');
                      }}
                      className="text-[11px] font-bold text-[#fe6b00] hover:underline"
                    >
                      Change Email
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <KeyRound size={16} />
                    </span>
                    <input
                      id="otp-input"
                      type="text"
                      maxLength={6}
                      pattern="\d{6}"
                      required
                      placeholder="e.g. 123456"
                      className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#fe6b00] focus:ring-1 focus:ring-[#fe6b00] bg-gray-50/50 text-[#000928] font-mono text-center text-lg tracking-widest outline-none transition-all duration-200"
                      value={otp}
                      onChange={(e) => {
                        // Allow only numbers
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setOtp(val);
                        if (error) setError('');
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400 font-sans pt-1">
                    <span>Sent to: <strong className="text-gray-600">{email}</strong></span>
                    {countdown > 0 ? (
                      <span>Resend code in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[#fe6b00] hover:underline font-bold"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-[#fe6b00] hover:bg-[#e05e00] text-white py-3.5 rounded-xl font-sans font-bold text-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    isLoading ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                  id="verify-otp-btn"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Verifying Passcode...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Sign In</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ADMINISTRATOR FLOW: USERNAME & PASSWORD */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 font-sans">
                  Admin Username / Email
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('student');
                    setEmail('');
                    setPassword('');
                    setError('');
                    setSuccessMsg('');
                  }}
                  className="text-[11px] font-bold text-[#fe6b00] hover:underline"
                >
                  Student Login
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </span>
                <input
                  id="admin-email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-gray-50/50 text-[#000928] font-sans text-sm outline-none transition-all duration-200"
                  placeholder="admissions@ksmathsschool.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 font-sans">
                Access Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-gray-50/50 text-[#000928] font-sans text-sm outline-none transition-all duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#000928] hover:bg-slate-900 text-white py-3.5 rounded-xl font-sans font-bold text-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-80' : ''
              }`}
              id="submit-admin-btn"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Verifying Administrator...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Back option */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 py-2.5 rounded-xl font-sans font-semibold text-xs transition-all duration-300 active:scale-95 text-center cursor-pointer"
          id="back-to-site-btn"
        >
          Cancel & Back to School Site
        </button>

        {/* Portal Notice */}
        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-sans leading-normal">
            For secure admin duties, utilize your provided access keys. Student portals use passwordless login codes.
          </p>
        </div>
      </div>
    </div>
  );
}
