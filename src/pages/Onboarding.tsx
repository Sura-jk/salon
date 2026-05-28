import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ImageWithFallback';
import { cn } from '@/lib/utils';

const ONBOARDING_STEPS = [
  {
    title: "Discover Premium Salons",
    description: "Explore the most exclusive beauty studios in your city, curated for luxury.",
    icon: <Sparkles className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1560066982-3f83097c023d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Book Instantly",
    description: "Skip the wait. Secure your appointment with top stylists in just a few taps.",
    icon: <Calendar className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1562322140-87a27995777a?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Track Rewards",
    description: "Earn loyalty points and enjoy exclusive membership benefits on every visit.",
    icon: <Award className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80"
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden items-center">
      <div className="w-full max-w-lg md:max-w-2xl flex-1 flex flex-col h-full relative">
        <div className="flex-1 relative">
          <div 
            key={currentStep}
            className="absolute inset-0 transition-all duration-700 ease-in-out animate-in fade-in slide-in-from-right-12"
          >
            <ImageWithFallback 
              src={ONBOARDING_STEPS[currentStep].image} 
              alt="Onboarding"
              className="h-full w-full object-cover opacity-70 rounded-b-[2.5rem]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent rounded-b-[2.5rem]" />
            
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-6 shadow-2xl text-primary animate-in zoom-in duration-500">
                {ONBOARDING_STEPS[currentStep].icon}
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-medium text-foreground mb-4 leading-tight">
                {ONBOARDING_STEPS[currentStep].title}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mb-2 leading-relaxed">
                {ONBOARDING_STEPS[currentStep].description}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-12 pt-4 flex flex-col gap-6">
          <div className="flex justify-center gap-2 mb-2">
            {ONBOARDING_STEPS.map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  idx === currentStep ? "w-8 bg-secondary" : "w-2 bg-muted"
                )} 
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            {currentStep > 0 ? (
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep(s => s - 1)}
                className="text-muted-foreground font-medium text-sm"
              >
                Back
              </Button>
            ) : (
              <div />
            )}
            
            <div className="flex-1 flex justify-end">
              <Button 
                onClick={nextStep}
                className="px-6 py-5 sm:px-8 sm:py-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20 flex items-center gap-2 font-bold text-sm"
              >
                {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Continue"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;