import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ONBOARDING_STEPS = [
  {
    title: "Discover Premium Salons",
    description: "Explore the most exclusive beauty studios in your city, curated for luxury.",
    icon: <Sparkles className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1560066982-73a8579Bf77a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Book Instantly",
    description: "Skip the wait. Secure your appointment with top stylists in just a few taps.",
    icon: <Calendar className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1521566626196-f77d7737307a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Track Rewards",
    description: "Earn loyalty points and enjoy exclusive membership benefits on every visit.",
    icon: <Award className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=1000&auto=format&fit=crop"
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
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <div className="flex-1 relative">
        <div 
          key={currentStep}
          className="absolute inset-0 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-right-10"
        >
          <img 
            src={ONBOARDING_STEPS[currentStep].image} 
            className="h-full w-full object-cover opacity-60" 
            alt="Onboarding"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-20">
            <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-6 shadow-xl">
              {ONBOARDING_STEPS[currentStep].icon}
            </div>
            <h1 className="text-4xl font-serif font-medium text-foreground mb-4 leading-tight">
              {ONBOARDING_STEPS[currentStep].title}
            </h1>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed">
              {ONBOARDING_STEPS[currentStep].description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 pb-12 pt-4 flex flex-col gap-6">
        <div className="flex justify-center gap-2 mb-4">
          {ONBOARDING_STEPS.map((_, idx) => (
            <div 
              key={idx} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === currentStep ? "w-8 bg-secondary" : "w-2 bg-muted"
              )} 
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          {currentStep > 0 && (
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep(s => s - 1)}
              className="text-muted-foreground"
            >
              Back
            </Button>
          )}
          
          <div className="flex-1 flex justify-end">
            <Button 
              onClick={nextStep}
              className="px-8 py-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Onboarding;