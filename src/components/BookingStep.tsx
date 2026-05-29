import React from 'react';
import { cn } from '@/lib/utils';

interface BookingStepProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
}

const BookingStep = ({ 
  children, 
  title, 
  subtitle, 
  stepNumber, 
  totalSteps, 
  onNext, 
  onPrev, 
  nextLabel = "Continue", 
  prevLabel = "Back" 
}: BookingStepProps) => {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="px-6 pt-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-primary text-[10px] font-bold">
            {stepNumber}
          </span>
          <div className="flex-1 h-[1px] bg-border/50" />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            Step {stepNumber} of {totalSteps}
          </span>
        </div>
        
        <h2 className="text-3xl font-serif font-medium text-foreground mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex-1 px-6">
        {children}
      </div>

      <div className="fixed bottom-20 left-0 right-0 px-6 max-w-md mx-auto w-full">
        <div className="flex gap-3">
          {onPrev && (
            <button 
              onClick={onPrev}
              className="flex-1 py-4 px-6 rounded-2xl border border-border text-muted-foreground font-medium text-sm hover:bg-muted transition-colors"
            >
              {prevLabel}
            </button>
          )}
          <button 
            onClick={onNext}
            className="flex-[2] py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStep;
