import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Globe, Sparkles, User, Phone, Key, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

type AuthMode = 'login' | 'register' | 'otp';

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // OTP states
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState(30);

  // Handle countdown for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (authMode === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authMode, timer]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = showLoading("Authenticating credentials...");
    setTimeout(() => {
      dismissToast(loadingToast);
      showSuccess("Welcome back to your luxury experience!");
      navigate('/');
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = showLoading("Generating registration token...");
    setTimeout(() => {
      dismissToast(loadingToast);
      showSuccess(`Verification code sent to ${phone || 'registered contact'}`);
      setAuthMode('otp');
      setTimer(30);
    }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otpValues.join('');
    if (otpCode.length < 4) {
      showSuccess("Please complete the security code.");
      return;
    }
    
    const loadingToast = showLoading("Validating secure tokens...");
    setTimeout(() => {
      dismissToast(loadingToast);
      showSuccess("Membership registered successfully!");
      navigate('/');
    }, 1200);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return; // Only allow numbers
    
    const updatedValues = [...otpValues];
    updatedValues[index] = val.slice(-1); // Only take latest char
    setOtpValues(updatedValues);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    setTimer(30);
    showSuccess("A brand new luxury security pass code has been dispatched!");
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col relative">
        
        {/* Back action for OTP and Register modes */}
        {authMode !== 'login' && (
          <button 
            onClick={() => setAuthMode(authMode === 'otp' ? 'register' : 'login')}
            className="absolute -top-12 left-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}

        {/* Brand Identity Icon */}
        <div className="flex justify-center mb-8 animate-in zoom-in duration-500">
          <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-xl shadow-secondary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Dynamic Titles */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-foreground mb-3 transition-all duration-300">
            {authMode === 'login' && "Welcome Back"}
            {authMode === 'register' && "Join Luxe Club"}
            {authMode === 'otp' && "Security Shield"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
            {authMode === 'login' && "Sign in with your email and password to access your luxury profile"}
            {authMode === 'register' && "Begin your aesthetic adventure with exclusive membership access"}
            {authMode === 'otp' && `Enter the 4-digit code dispatched to ${phone || 'your handset'}`}
          </p>
        </div>

        {/* Form Container */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="email"
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-7 rounded-2xl border-border focus:ring-secondary shadow-sm text-sm" 
                    required 
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 py-7 rounded-2xl border-border focus:ring-secondary shadow-sm text-sm" 
                    required 
                  />
                </div>
              </div>
              
              <div className="flex justify-end px-1">
                <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-secondary hover:underline">
                  Forgot Password?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20 text-sm"
              >
                Sign In
              </Button>
            </form>
          )}

          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="text"
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 py-7 rounded-2xl border-border focus:ring-secondary shadow-sm text-sm" 
                    required 
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="email"
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-7 rounded-2xl border-border focus:ring-secondary shadow-sm text-sm" 
                    required 
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="tel"
                    placeholder="Phone Number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-12 py-7 rounded-2xl border-border focus:ring-secondary shadow-sm text-sm" 
                    required 
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="password"
                    placeholder="Create Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 py-7 rounded-2xl border-border focus:ring-secondary shadow-sm text-sm" 
                    required 
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20 text-sm mt-2"
              >
                Send Verification Code
              </Button>
            </form>
          )}

          {authMode === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-16 h-16 text-center text-2xl font-black rounded-2xl border border-border bg-card/60 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-xs text-muted-foreground font-semibold">
                    Resend code in <span className="text-secondary font-black">{timer}s</span>
                  </p>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleResendOtp}
                    className="text-xs uppercase tracking-widest font-black text-secondary hover:underline"
                  >
                    Resend Security Code
                  </button>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20 text-sm"
              >
                Verify Code & Register
              </Button>
            </form>
          )}

          {authMode !== 'otp' && (
            <>
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  <span className="bg-background px-4">Or sign in with</span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const loading = showLoading("Connecting to Google identity...");
                    setTimeout(() => {
                      dismissToast(loading);
                      showSuccess("Successfully connected with Google!");
                      navigate('/');
                    }, 1200);
                  }}
                  className="w-full py-6 rounded-2xl border-border hover:bg-muted flex items-center justify-center gap-3 font-medium text-sm transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </Button>
              </div>
            </>
          )}
          
          <p className="text-center text-xs text-muted-foreground mt-4">
            {authMode === 'login' ? (
              <>
                Don't have an account? <span onClick={() => setAuthMode('register')} className="text-secondary font-bold cursor-pointer hover:underline">Join Now</span>
              </>
            ) : authMode === 'register' ? (
              <>
                Already have an account? <span onClick={() => setAuthMode('login')} className="text-secondary font-bold cursor-pointer hover:underline">Sign In</span>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;