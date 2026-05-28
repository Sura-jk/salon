import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import BookingStep from '@/components/BookingStep';
import { CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const STYLISTS = [
  { id: 's1', name: 'Elena Rose', role: 'Master Stylist', image: 'https://i.pravatar.cc/150?u=elena', specialty: 'Hair Sculpting' },
  { id: 's2', name: 'Marcus Thorne', role: 'Color Expert', image: 'https://i.pravatar.cc/150?u=marcus', specialty: 'Balayage' },
  { id: 's3', name: 'Sophia Chen', role: 'Skin Specialist', image: 'https://i.pravatar.cc/150?u=sophia', specialty: 'Facials' },
  { id: 's4', name: 'Julian Grey', role: 'Nail Artist', image: 'https://i.pravatar.cc/150?u=julian', specialty: 'Nail Art' },
];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', 
  '05:00 PM', '06:00 PM'
];

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(searchParams.get('service') || '');
  const [selectedStylistId, setSelectedStylistId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const confirmBooking = () => {
    setIsConfirmed(true);
    // In a real app, we would save this to a database
    localStorage.setItem('lastBooking', JSON.stringify({
      serviceId: selectedServiceId,
      stylistId: selectedStylistId,
      date: selectedDate,
      time: selectedTime,
      timestamp: new Date().toISOString()
    }));
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl font-serif font-medium text-foreground mb-4">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-10 max-w-xs mx-auto">
          Your appointment has been scheduled. We look forward to seeing you soon.
        </p>
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 mb-10 text-left space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Date</span>
            <span className="text-sm font-medium">{selectedDate?.toDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Time</span>
            <span className="text-sm font-medium">{selectedTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Stylist</span>
            <span className="text-sm font-medium">{STYLISTS.find(s => s.id === selectedStylistId)?.name}</span>
          </div>
        </div>
        <Button 
          onClick={() => navigate('/bookings')}
          className="w-full max-w-md py-6 rounded-2xl bg-primary text-primary-foreground"
        >
          View My Bookings
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {step === 1 && (
        <BookingStep 
          stepNumber={1} 
          totalSteps={3} 
          title="Choose Stylist" 
          subtitle="Select the expert who will handle your transformation"
          onNext={handleNext}
          onPrev={() => navigate('/services')}
        >
          <div className="grid grid-cols-1 gap-4">
            {STYLISTS.map((stylist) => (
              <div 
                key={stylist.id}
                onClick={() => setSelectedStylistId(stylist.id)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2",
                  selectedStylistId === stylist.id 
                    ? "border-secondary bg-secondary/10" 
                    : "border-transparent bg-card hover:bg-muted/50"
                )}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={stylist.image} />
                  <AvatarFallback>{stylist.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{stylist.name}</h4>
                  <p className="text-xs text-muted-foreground">{stylist.role} • {stylist.specialty}</p>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  selectedStylistId === stylist.id ? "border-secondary bg-secondary" : "border-muted-foreground/30"
                )}>
                  {selectedStylistId === stylist.id && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        </BookingStep>
      )}

      {step === 2 && (
        <BookingStep 
          stepNumber={2} 
          totalSteps={3} 
          title="Select Date" 
          subtitle="Pick a day that works best for you"
          onNext={handleNext}
          onPrev={handlePrev}
        >
          <div className="flex justify-center">
            <Calendar 
              mode="single" 
              selected={selectedDate} 
              onSelect={setSelectedDate} 
              className="rounded-3xl border-border"
            />
          </div>
        </BookingStep>
      )}

      {step === 3 && (
        <BookingStep 
          stepNumber={3} 
          totalSteps={3} 
          title="Pick Time" 
          subtitle="Choose your preferred time slot"
          onNext={confirmBooking}
          onPrev={handlePrev}
          nextLabel="Confirm Booking"
        >
          <div className="grid grid-cols-2 gap-3">
            {TIME_SLOTS.map((time) => (
              <button 
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-4 px-3 rounded-2xl text-sm font-medium transition-all border",
                  selectedTime === time 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-card text-foreground border-border hover:border-secondary"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {time}
                </div>
              </button>
            ))}
          </div>
        </BookingStep>
      )}
    </div>
  );
};

export default Booking;
