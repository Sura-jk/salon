import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const STYLISTS = [
  { id: 'st1', name: 'Elena Rose', role: 'Master Stylist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', image: 'https://images.unsplash.com/photo-1500648761738-77097f5a052a?q=80&w=200&auto=format&fit=crop' },
  { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', image: 'https://images.unsplash.com/photo-1438761675141-bd307077e227?q=80&w=200&auto=format&fit=crop' },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

const BookingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pay_at_salon');

  const handleConfirm = () => {
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background">
        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12 text-secondary" />
        </div>
        <h1 className="text-4xl font-serif font-medium text-foreground mb-4">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-12 max-w-xs mx-auto leading-relaxed">
          Your luxury experience is scheduled. We've sent the details to your phone.
        </p>
        
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 mb-12 text-left space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Appointment ID</span>
            <span className="text-sm font-bold text-primary">#LX-99281</span>
          </div>
          <div className="flex justify-center py-6">
            <div className="w-32 h-32 bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-secondary/10 animate-pulse" />
              <span className="text-[10px] text-muted-foreground uppercase font-bold z-10">QR Code</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Date & Time</span>
            <span className="text-sm font-medium">{selectedDate?.toDateString()} at {selectedTime}</span>
          </div>
        </div>
        
        <div className="flex gap-4 w-full max-w-md">
          <Button 
            onClick={() => navigate('/bookings')}
            className="flex-1 py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20"
          >
            View Bookings
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 py-7 rounded-2xl border-border font-medium"
          >
            Add to Calendar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-8">
      <div className="max-w-md mx-auto w-full">
        {/* Step Indicator */}
        <div className="flex justify-between mb-10">
          {[1, 2, 3].map(i => (
            <div key={i} className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              step >= i ? "w-1/4 bg-secondary" : "w-1/4 bg-muted"
            )} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif font-medium mb-6">Select Staff</h2>
            <div className="grid grid-cols-1 gap-4">
              {STYLISTS.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedStylist(s.id)}
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all border-2",
                    selectedStylist === s.id ? "border-secondary bg-secondary/10 shadow-md" : "border-transparent bg-card border-border hover:border-secondary/50"
                  )}
                >
                  <Avatar className="w-14 h-14 border-2 border-background shadow-sm">
                    <AvatarImage src={s.image} />
                    <AvatarFallback>{s.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <span className="font-medium block text-foreground">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.role}</span>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedStylist === s.id ? "border-secondary bg-secondary" : "border-muted-foreground/30"
                  )}>
                    {selectedStylist === s.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              ))}
            </div>
            <Button 
              disabled={!selectedStylist}
              onClick={() => setStep(2)}
              className="w-full py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif font-medium mb-6">Select Time</h2>
            <div className="flex justify-center mb-8">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={setSelectedDate} 
                className="rounded-3xl border-border shadow-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map(t => (
                <button 
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={cn(
                    "py-4 px-2 rounded-xl text-xs font-bold transition-all border",
                    selectedTime === t ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card text-foreground border-border hover:border-secondary"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <Button 
              disabled={!selectedTime}
              onClick={() => setStep(3)}
              className="w-full py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif font-medium mb-6">Payment</h2>
            <div className="space-y-4">
              <div 
                onClick={() => setPaymentMethod('pay_at_salon')}
                className={cn(
                  "p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'pay_at_salon' ? "border-secondary bg-secondary/10 shadow-md" : "border-transparent bg-card border-border hover:border-secondary/50"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground">Pay at Salon</span>
                  <span className="text-xs text-muted-foreground">Pay after your service</span>
                </div>
                {paymentMethod === 'pay_at_salon' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
              <div 
                onClick={() => setPaymentMethod('upi')}
                className={cn(
                  "p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'upi' ? "border-secondary bg-secondary/10 shadow-md" : "border-transparent bg-card border-border hover:border-secondary/50"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground">UPI / QR Code</span>
                  <span className="text-xs text-muted-foreground">Fast and secure payment</span>
                </div>
                {paymentMethod === 'upi' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
              <div 
                onClick={() => setPaymentMethod('card')}
                className={cn(
                  "p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'card' ? "border-secondary bg-secondary/10 shadow-md" : "border-transparent bg-card border-border hover:border-secondary/50"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground">Credit / Debit Card</span>
                  <span className="text-xs text-muted-foreground">Save card for future use</span>
                </div>
                {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
            </div>
            <Button 
              onClick={handleConfirm}
              className="w-full py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20"
            >
              Confirm Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;