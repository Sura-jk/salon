import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Chrome, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Auth = () => {
  const [step, setStep] = useState('login'); // 'login' | 'otp'
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-foreground mb-3">
            {step === 'login' ? 'Welcome Back' : 'Verify Phone'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 'login' 
              ? 'Enter your details to access the luxury experience' 
              : 'Enter the 4-digit code sent to your phone'}
          </p>
        </div>

        <div className="transition-all duration-300">
          {step === 'login' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="tel"
                    placeholder="Phone Number" 
                    className="pl-12 py-7 rounded-2xl border-border focus:ring-secondary shadow-sm text-sm" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20 text-sm"
                >
                  Continue
                </Button>
              </form>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  <span className="bg-background px-4">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="py-6 rounded-2xl border-border hover:bg-muted flex items-center justify-center gap-2 font-medium text-xs sm:text-sm"
                >
                  <Chrome className="w-4 h-4 sm:w-5 sm:h-5" />
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  className="py-6 rounded-2xl border-border hover:bg-muted flex items-center justify-center gap-2 font-medium text-xs sm:text-sm"
                >
                  <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
                  Apple
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex justify-center gap-3 sm:gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <Input 
                      key={i} 
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-2xl border-border focus:ring-secondary shadow-sm" 
                      maxLength={1} 
                      required 
                    />
                  ))}
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20 text-sm"
                >
                  Verify & Enter
                </Button>
              </form>
              <p className="text-center text-xs sm:text-sm text-muted-foreground">
                Didn't receive code? <span className="text-secondary font-bold cursor-pointer hover:underline">Resend</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;