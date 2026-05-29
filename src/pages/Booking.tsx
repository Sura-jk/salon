import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, CreditCard, Wallet, Smartphone, Receipt, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';
import ImageWithFallback from '@/components/ImageWithFallback';

const STYLISTS = [
  { id: 'st1', name: 'Elena Rose', role: 'Master Stylist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

// Unified key lookup supporting all direct, featured and secondary service IDs across the luxury application
const SERVICES_LOOKUP: Record<string, { name: string, price: string, duration: string, image: string, category: 'Hair' | 'Skincare' | 'Nails' | 'Spa' | 'Facial' | 'Makeup' }> = {
  // Service / Landing details IDs
  's1': { name: 'Signature Haircut', price: '499', duration: '45 min', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=800&auto=format&fit=crop', category: 'Hair' },
  's2': { name: 'Balayage Color', price: '2499', duration: '120 min', image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop', category: 'Hair' },
  's3': { name: 'Signature Glow Facial', price: '1299', duration: '60 min', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop', category: 'Facial' },
  's4': { name: 'Royal Manicure', price: '699', duration: '45 min', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop', category: 'Nails' },
  's5': { name: 'Glow Skincare Ritual', price: '1599', duration: '75 min', image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop', category: 'Skincare' },
  
  // Gallery treatments IDs
  'hair_1': { name: 'Signature Hair Sculpt', price: '850', duration: '90 min', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop', category: 'Hair' },
  'hair_2': { name: 'Artisan Balayage', price: '2499', duration: '180 min', image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop', category: 'Hair' },
  'hair_3': { name: 'Keratin Infusion', price: '1800', duration: '120 min', image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=800&auto=format&fit=crop', category: 'Hair' },
  'skin_1': { name: 'Cellular Glow Facial', price: '1299', duration: '60 min', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop', category: 'Skincare' },
  'skin_2': { name: 'Diamond Polishing', price: '1599', duration: '75 min', image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop', category: 'Skincare' },
  'nail_1': { name: 'Luxe Manicure', price: '499', duration: '45 min', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop', category: 'Nails' },
  'nail_2': { name: 'Spa Pedicure', price: '699', duration: '60 min', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800&auto=format&fit=crop', category: 'Nails' },
  'makeup_1': { name: 'Elite Glamour Look', price: '2999', duration: '90 min', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop', category: 'Makeup' },
  'makeup_2': { name: 'Bridal Artistry', price: '5500', duration: '150 min', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop', category: 'Makeup' },
  'spa_1': { name: 'Deep Tissue Relief', price: '1899', duration: '90 min', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop', category: 'Spa' },
  'spa_2': { name: 'Aroma Zen Therapy', price: '1499', duration: '60 min', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop', category: 'Spa' },
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
    const newBooking = {
      id: `b-${Date.now()}`,
      salonName: 'Luxe Aura Studio',
      serviceName: activeService.name,
      stylistName: STYLISTS.find(s => s.id === selectedStylist)?.name || 'Any Stylist',
      date: selectedDate?.toISOString() || new Date().toISOString(),
      time: selectedTime,
      status: 'upcoming',
      price: activeService.price,
      image: activeService.image,
      category: activeService.category
    };

    const existingBookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    localStorage.setItem('user_bookings', JSON.stringify([newBooking, ...existingBookings]));

    showSuccess("Booking confirmed!");
    setStep(4);
  };

  const handleStylistSelect = (id: string, name: string) => {
    setSelectedStylist(id);
    showSuccess(`Selected ${name}`);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    showSuccess(`Selected ${time}`);
  };

  // Smart back navigation handling step states or history routing
  const handleBackNavigation = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/', { replace: true });
      }
    }
  };

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background py-12 overflow-y-auto">
        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12 text-secondary" />
        </div>
        <h1 className="text-4xl font-serif font-medium text-foreground mb-4">Booking Confirmed!</h1>
        
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-0 overflow-hidden mb-8 text-left shadow-xl">
          <div className="h-40 relative">
            <ImageWithFallback 
              src={activeService.image} 
              fallbackCategory={activeService.category} 
              className="w-full h-full object-cover" 
              alt={activeService.name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
          <div className="p-6 space-y-4">
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
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-semibold text-foreground">{selectedDate?.toDateString()} at {selectedTime}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-border/40">
                <span className="font-bold text-foreground">Total:</span>
                <span className="font-bold text-secondary text-base">₹{activeService.price}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button onClick={() => navigate('/bookings')} className="flex-1 py-6 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 text-sm">View Bookings</Button>
          <Button variant="outline" onClick={() => navigate('/')} className="flex-1 py-6 rounded-2xl border-border font-medium text-sm">Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 px-6 pt-8 overflow-y-auto items-center">
      <div className="max-w-lg md:max-w-2xl w-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBackNavigation} className="rounded-full bg-card border border-border h-10 w-10 p-0 text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Back</span>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-secondary/20">
              <ImageWithFallback 
                src={activeService.image} 
                fallbackCategory={activeService.category} 
                className="w-full h-full object-cover" 
                alt={activeService.name} 
              />
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
            <div key={i} className={cn("h-1.5 rounded-full flex-1 transition-all duration-500", step >= i ? "bg-secondary" : "bg-muted")} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-2">Select Staff</h2>
              <p className="text-xs text-muted-foreground">Choose your preferred specialist</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {STYLISTS.map(s => (
                <div key={s.id} onClick={() => handleStylistSelect(s.id, s.name)} className={cn("flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all border-2", selectedStylist === s.id ? "border-secondary bg-secondary/10" : "border-transparent bg-card border-border")}>
                  <Avatar className="w-14 h-14 border-2 border-background shadow-sm">
                    <AvatarImage src={s.image} />
                    <AvatarFallback>{s.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <span className="font-medium block text-foreground">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.role}</span>
                  </div>
                  <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", selectedStylist === s.id ? "border-secondary bg-secondary" : "border-muted-foreground/30")}>
                    {selectedStylist === s.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              ))}
            </div>
            <Button disabled={!selectedStylist} onClick={() => setStep(2)} className="w-full py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 text-sm">Continue</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-2">Select Date & Time</h2>
              <p className="text-xs text-muted-foreground">Choose a slot that works for you</p>
            </div>
            <div className="flex justify-center bg-card rounded-3xl p-3 border border-border shadow-sm overflow-hidden max-w-full">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-3xl border-none shadow-none p-0 w-full" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">Time Slots</span>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map(t => (
                  <button key={t} onClick={() => handleTimeSelect(t)} className={cn("py-4 px-2 rounded-xl text-xs font-bold transition-all border", selectedTime === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border")}>{t}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-7 rounded-2xl border-border text-muted-foreground font-medium text-sm">Back</Button>
              <Button disabled={!selectedTime} onClick={() => setStep(3)} className="flex-[2] py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 text-sm">Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-2">Secure Checkout</h2>
              <p className="text-xs text-muted-foreground">Confirm your appointment</p>
            </div>
            <div className="space-y-4">
              <div onClick={() => setPaymentMethod('pay_at_salon')} className={cn("p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all", paymentMethod === 'pay_at_salon' ? "border-secondary bg-secondary/10" : "border-transparent bg-card border-border")}>
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"><Wallet className="w-5 h-5 text-secondary" /></div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground text-sm">Pay at Salon</span>
                  <span className="text-xs text-muted-foreground">After your service</span>
                </div>
                {paymentMethod === 'pay_at_salon' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
              <div onClick={() => setPaymentMethod('upi')} className={cn("p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all", paymentMethod === 'upi' ? "border-secondary bg-secondary/10" : "border-transparent bg-card border-border")}>
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"><Smartphone className="w-5 h-5 text-secondary" /></div>
                <div className="flex-1">
                  <span className="font-medium block text-foreground text-sm">UPI / QR Code</span>
                  <span className="text-xs text-muted-foreground">Instant secure payment</span>
                </div>
                {paymentMethod === 'upi' && <CheckCircle2 className="w-5 h-5 text-secondary" />}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1 py-7 rounded-2xl border-border text-muted-foreground font-medium text-sm">Back</Button>
              <Button onClick={handleConfirm} className="flex-[2] py-7 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 text-sm">Confirm Booking</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;