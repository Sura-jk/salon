import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Chrome, Apple } from 'lucide-react';
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
    <div className="h-screen w-full bg-background flex flex-col px-8 py-16">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif font-medium text-foreground mb-4">
            {step === 'login' ? 'Welcome Back' : 'Verify Phone'}
          </h1>
          <p className="text-muted-foreground">
            {step === 'login' 
              ? 'Enter your details to access the luxury experience' 
              : 'Enter the 4-digit code sent to your phone'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'login' ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Phone Number" 
                    className="pl-12 py-6 rounded-2xl border-border focus:ring-secondary" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Continue
                </Button>
              </form>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="bg-background px-4">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="py-6 rounded-2xl border-border hover:bg-muted flex items-center justify-center gap-2"
                >
                  <Chrome className="w-5 h-5" />
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  className="py-6 rounded-2xl border-border hover:bg-muted flex items-center justify-center gap-2"
                >
                  <Apple className="w-5 h-5" />
                  Apple
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex justify-center gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <Input 
                      key={i} 
                      className="w-16 h-16 text-center text-2xl font-bold rounded-2xl border-border focus:ring-secondary" 
                      maxLength={1} 
                      required 
                    />
                  ))}
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Verify & Enter
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground">
                Didn't receive code? <span className="text-secondary font-medium cursor-pointer">Resend</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
