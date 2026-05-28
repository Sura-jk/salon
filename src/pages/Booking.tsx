import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, CreditCard, Wallet, Smartphone, Receipt, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const STYLISTS = [
  { id: 'st1', name: 'Elena Rose', role: 'Master Stylist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

const SERVICES_LOOKUP: Record<string, { name: string, price: string, duration: string }> = {
  'hair_1': { name: 'Signature Hair Sculpt', price: '850', duration: '90 min' },
  'hair_2': { name: 'Artisan Balayage', price: '2499', duration: '180 min' },
  'hair_3': { name: 'Keratin Infusion', price: '1800', duration: '120 min' },
  'hair_4': { name: 'Classic Grooming', price: '600', duration: '45 min' },
  'skin_1': { name: 'Cellular Glow Facial', price: '1299', duration: '60 min' },
  'skin_2': { name: 'Diamond Polishing', price: '1599', duration: '75 min' },
  'skin_3': { name: 'Age-Defying Ritual', price: '2100', duration: '90 min' },
  'nail_1': { name: 'Luxe Manicure', price: '499', duration: '45 min' },
  'nail_2': { name: 'Spa Pedicure', price: '699', duration: '60 min' },
  'nail_3': { name: 'Aesthetic Nail Art', price: '350', duration: '30 min' },
  'makeup_1': { name: 'Elite Glamour Look', price: '2999', duration: '90 min' },
  'makeup_2': { name: 'Bridal Artistry', price: '5500', duration: '150 min' },
  'spa_1': { name: 'Deep Tissue Relief', price: '1899', duration: '90 min' },
  'spa_2': { name: 'Aroma Zen Therapy', price: '1499', duration: '60 min' },
};

const BookingFlow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service') || 'hair_1';
  const activeService = SERVICES_LOOKUP[serviceId] || SERVICES_LOOKUP['hair_1'];

  const [step, setStep] = useState(1);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pay_at_salon');

  const handleConfirm = () => {
    // Create booking object
    const newBooking = {
      id: `b-${Date.now()}`,
      salonName: 'Luxe Aura Studio',
      serviceName: activeService.name,
      stylistName: STYLISTS.find(s => s.id === selectedStylist)?.name || 'Any Stylist',
      date: selectedDate?.toISOString() || new Date().toISOString(),
      time: selectedTime,
      status: 'upcoming',
      price: `₹${activeService.price}`,
      image: 'https://images.unsplash.com/photo-1560066982-3f83097c023d?auto=format&fit=crop&w=120&q=80'
    };

    // Save to local storage
    const existingBookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    localStorage.setItem('user_bookings', JSON.stringify([newBooking, ...existingBookings]));

    showSuccess("Booking confirmed! Generating receipt...");
    setStep(4);
  };

  const handleStylistSelect = (id: string, name: string) => {
    setSelectedStylist(id);
    showSuccess(`Selected ${name} as your specialist`);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    showSuccess(`Selected time slot: ${time}`);
  };

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background py-12 overflow-y-auto">
        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12 text-secondary" />
        </div>
        <h1 className="text-4xl font-serif font-medium text-foreground mb-4">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-8 max-w-xs mx-auto leading-relaxed text-sm">
          Your luxury experience is scheduled. We've sent the details to your phone.
        </p>
        
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 mb-8 text-left space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-3 border-b border-border/50">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Appointment ID</span>
            <span className="text-sm font-bold text-primary">#LX-{Math.floor(Math.random() * 100000)}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Treatment:</span>
              <span className="font-semibold text-foreground">{activeService.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Specialist:</span>
              <span className="font-semibold text-foreground">
                {STYLISTS.find(s => s.id === selectedStylist)?.name || 'Any Available Stylist'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold text-foreground">{selectedDate?.toDateString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Time Slot:</span>
              <span className="font-semibold text-foreground">{selectedTime}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-border/40">
              <span className="font-bold text-foreground">Total Price:</span>
              <span className="font-bold text-secondary text-base">₹{activeService.price}</span>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <div className="w-full py-4 bg-muted/40 rounded-2xl flex flex-col items-center justify-center border border-dashed border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-widest z-10 mb-1">Pass QR Code</span>
              <span className="text-xs font-bold text-secondary">Present on arrival</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button 
            onClick={() => navigate('/bookings')}
            className="flex-1 py-6 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 text-sm"
          >
            View Bookings
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              showSuccess("Appointment added to your device Calendar!");
            }}
            className="flex-1 py-6 rounded-2xl border-border font-medium text-sm"
          >
            Add to Calendar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 px-6 pt-8 overflow-y-auto items-center">
      <div className="max-w-lg md:max-w-2xl w-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full bg-card border border-border h-10 w-10 p-0 text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Back to Salon</span>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Booking Treatment</span>
              <span className="text-xs font-bold text-foreground line-clamp-1">{activeService.name}</span>
            </div>
          </div>
          <span className="text-sm font-black text-secondary">₹{activeService.price}</span>
        </div>

        <div className="flex justify-between mb-8 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={cn(
              "h-1.5 rounded-full flex-1 transition-all duration-500",
              step >= i ? "bg-secondary" : "bg-muted"
            )} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-2">Select Staff</h2>
              <p className="text-xs text-muted-foreground">Our highly trained specialists are at your disposal</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {STYLISTS.map(s => (
                <div 
                  key={s.id}
                  onClick={() => handleStylistSelect(s.id, s.name)}
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
              className="w-full py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 text-sm"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-2">Select Date & Time</h2>
              <p className="text-xs text-muted-foreground">Pick a slot convenient for you</p>
            </div>
            <div className="flex justify-center bg-card rounded-3xl p-3 border border-border shadow-sm overflow-hidden max-w-full">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={setSelectedDate} 
                className="rounded-3xl border-none shadow-none p-0 w-full"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">Available Time Slots</span>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map(t => (
                  <button 
                    key={t}
                    onClick={() => handleTimeSelect(t)}
                    className={cn(
                      "py-4 px-2 rounded-xl text-xs font-bold transition-all border",
                      selectedTime === t ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card text-foreground border-border hover:border-secondary"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 py-7 rounded-2xl border-border text-muted-foreground font-medium text-sm"
              >
                Back
              </Button>
              <Button 
                disabled={!selectedTime}
                onClick={() => setStep(3)}
                className="flex-[2] py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 text-sm"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-2">Secure Checkout</h2>
              <p className="text-xs text-muted-foreground">Choose your payment mode</p>
            </div>
            <div className="space-y-4">
              <div 
                onClick={() => {
                  setPaymentMethod('pay_at_salon');
                  showSuccess("Pay at salon option selected.");
                }}
                className={cn(
                  "p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'pay_at_salon' ? "border-secondary bg-secondary/10 shadow-md" : "border-transparent bg-card border-border hover:border-secondary/50"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground text-sm">Pay at Salon</span>
                  <span className="text-xs text-muted-foreground">Pay after your service</span>
                </div>
                {paymentMethod === 'pay_at_salon' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
              <div 
                onClick={() => {
                  setPaymentMethod('upi');
                  showSuccess("UPI Instant Payment option selected.");
                }}
                className={cn(
                  "p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'upi' ? "border-secondary bg-secondary/10 shadow-md" : "border-transparent bg-card border-border hover:border-secondary/50"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground text-sm">UPI / QR Code</span>
                  <span className="text-xs text-muted-foreground">Fast and secure payment</span>
                </div>
                {paymentMethod === 'upi' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
              <div 
                onClick={() => {
                  setPaymentMethod('card');
                  showSuccess("Credit Card Checkout selected.");
                }}
                className={cn(
                  "p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all",
                  paymentMethod === 'card' ? "border-secondary bg-secondary/10 shadow-md" : "border-transparent bg-card border-border hover:border-secondary/50"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground text-sm">Credit / Debit Card</span>
                  <span className="text-xs text-muted-foreground">Save card for future use</span>
                </div>
                {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1 py-7 rounded-2xl border-border text-muted-foreground font-medium text-sm"
              >
                Back
              </Button>
              <Button 
                onClick={handleConfirm}
                className="flex-[2] py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 text-sm"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;