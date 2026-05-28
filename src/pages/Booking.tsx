import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const STYLISTS = [
  { id: 'st1', name: 'Elena Rose', role: 'Master Stylist', image: 'https://i.pravatar.cc/150?u=elena' },
  { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', image: 'https://i.pravatar.cc/150?u=marcus' },
  { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', image: 'https://i.pravatar.cc/150?u=sophia' },
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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl font-serif font-medium text-foreground mb-4">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-10 max-w-xs mx-auto">
          Your luxury experience is scheduled. We've sent the details to your phone.
        </p>
        
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 mb-10 text-left space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Appointment ID</span>
            <span className="text-sm font-bold">#LX-99281</span>
          </div>
          <div className="flex justify-center py-4">
            <div className="w-32 h-32 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">QR Code</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Date & Time</span>
            <span className="text-sm font-medium">{selectedDate?.toDateString()} at {selectedTime}</span>
          </div>
        </div>
        
        <div className="flex gap-3 w-full max-w-md">
          <Button 
            onClick={() => navigate('/bookings')}
            className="flex-1 py-6 rounded-2xl bg-primary text-primary-foreground"
          >
            View Bookings
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 py-6 rounded-2xl border-border"
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
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={cn(
              "h-1 w-1/4 rounded-full transition-all",
              step >= i ? "bg-secondary" : "bg-muted"
            )} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium mb-6">Select Staff</h2>
            <div className="grid grid-cols-1 gap-4">
              {STYLISTS.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedStylist(s.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2",
                    selectedStylist === s.id ? "border-secondary bg-secondary/10" : "border-transparent bg-card border-border"
                  )}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={s.image} />
                    <AvatarFallback>{s.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <span className="font-medium block">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.role}</span>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
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
              className="w-full py-6 rounded-2xl bg-primary text-primary-foreground mt-8"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium mb-6">Select Time</h2>
            <div className="flex justify-center mb-6">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={setSelectedDate} 
                className="rounded-3xl border-border"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map(t => (
                <button 
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={cn(
                    "py-3 px-2 rounded-xl text-xs font-medium transition-all border",
                    selectedTime === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <Button 
              disabled={!selectedTime}
              onClick={() => setStep(3)}
              className="w-full py-6 rounded-2xl bg-primary text-primary-foreground mt-8"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium mb-6">Payment</h2>
            <div className="space-y-4">
              <div 
                onClick={() => setPaymentMethod('pay_at_salon')}
                className={cn(
                  "p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'pay_at_salon' ? "border-secondary bg-secondary/10" : "border-transparent bg-card border-border"
                )}
              >
                <Wallet className="w-5 h-5 text-secondary" />
                <div className="flex-1">
                  <span className="font-medium block">Pay at Salon</span>
                  <span className="text-xs text-muted-foreground">Pay after your service</span>
                </div>
                {paymentMethod === 'pay_at_salon' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
              <div 
                onClick={() => setPaymentMethod('upi')}
                className={cn(
                  "p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'upi' ? "border-secondary bg-secondary/10" : "border-transparent bg-card border-border"
                )}
              >
                <Smartphone className="w-5 h-5 text-secondary" />
                <div className="flex-1">
                  <span className="font-medium block">UPI / QR Code</span>
                  <span className="text-xs text-muted-foreground">Fast and secure payment</span>
                </div>
                {paymentMethod === 'upi' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
              <div 
                onClick={() => setPaymentMethod('card')}
                className={cn(
                  "p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'card' ? "border-secondary bg-secondary/10" : "border-transparent bg-card border-border"
                )}
              >
                <CrditCard className="w-5 h-5 text-secondary" />
                <div className="flex-1">
                  <span className="font-medium block">Credit / Debit Card</span>
                  <span className="text-xs text-muted-foreground">Save card for future use</span>
                </div>
                {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
            </div>
            <Button 
              onClick={handleConfirm}
              className="w-full py-6 rounded-2xl bg-primary text-primary-foreground mt-8"
            >
              Confirm Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Fix for typo in the previous code
function CrditCard(props: any) {
  return <CreditCard {...props} />;
}

export default BookingFlow;
