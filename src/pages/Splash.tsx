import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-primary flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000 ease-out">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-secondary/40 animate-bounce-slow">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-5xl font-serif font-medium text-primary-foreground mb-4 tracking-tight animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          LuxeSalon
        </h1>
        <div className="h-px w-12 bg-secondary/50 mb-4 animate-in fade-in duration-1000 delay-500 fill-mode-both" />
        <p className="text-secondary/80 text-xs font-bold uppercase tracking-[0.3em] animate-pulse duration-1000">
          The Art of Beauty
        </p>
      </div>
    </div>
  );
};

export default Splash;