import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-primary flex flex-col items-center justify-center text-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-secondary/30">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-serif font-medium text-primary-foreground mb-4 tracking-tight">
          LuxeSalon
        </h1>
        <p className="text-secondary/80 text-sm font-medium uppercase tracking-widest animate-pulse">
          Book Your Beauty Experience
        </p>
      </motion.div>
    </div>
  );
};

export default Splash;
