import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Apple, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col">
        {/* Brand Identity Icon */}
        <div className="flex justify-center mb-8 animate-in zoom-in duration-500">
          <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-xl shadow-secondary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-foreground mb-3">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
            Sign in with your email and password to access your luxury profile
          </p>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              {/* Email Input */}
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

              {/* Password Input */}
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

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              <span className="bg-background px-4">Or sign in with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Social Logins - strictly Google and Apple */}
            <Button 
              variant="outline" 
              className="py-6 rounded-2xl border-border hover:bg-muted flex items-center justify-center gap-2 font-medium text-xs sm:text-sm"
            >
              <Globe className="w-4 h-4 text-blue-500" />
              Google
            </Button>
            <Button 
              variant="outline" 
              className="py-6 rounded-2xl border-border hover:bg-muted flex items-center justify-center gap-2 font-medium text-xs sm:text-sm"
            >
              <Apple className="w-4 h-4" />
              Apple
            </Button>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-4">
            Don't have an account? <span className="text-secondary font-bold cursor-pointer hover:underline">Join Now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;