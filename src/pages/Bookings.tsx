"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, User, Trash2, 
  Star, CalendarX, MapPin, 
  ChevronRight, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';
import ImageWithFallback from '@/components/ImageWithFallback';

const INITIAL_BOOKINGS = [
  {
    id: 'b1',
    salonName: 'Luxe Aura Studio',
    serviceName: 'Signature Hair Sculpt',
    category: 'Hair',
    stylistName: 'Elena Rose',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    time: '10:00 AM',
    status: 'upcoming',
    price: '850',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b2',
    salonName: 'Velvet Touch Spa',
    serviceName: 'Cellular Glow Facial',
    category: 'Facial',
    stylistName: 'Sophia Chen',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    time: '02:00 PM',
    status: 'completed',
    price: '1299',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop'
  }
];

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [allBookings, setAllBookings] = useState<any[]>([]);

  useEffect(() => {
    const storedRaw = localStorage.getItem('user_bookings');
    if (!storedRaw) {
      // Initialize with mock bookings on first visit
      localStorage.setItem('user_bookings', JSON.stringify(INITIAL_BOOKINGS));
      setAllBookings(INITIAL_BOOKINGS);
    } else {
      setAllBookings(JSON.parse(storedRaw));
    }
  }, []);

  const handleCancelBooking = (bookingId: string, serviceName: string) => {
    const updated = allBookings.filter(b => b.id !== bookingId);
    setAllBookings(updated);
    localStorage.setItem('user_bookings', JSON.stringify(updated));
    showSuccess(`Cancelled "${serviceName}"`);
  };

  const filteredBookings = allBookings.filter((booking) => booking.status === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-44 px-6 pt-12 animate-in fade-in duration-500 items-center">
      <div className="w-full max-w-lg md:max-w-2xl">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Aesthetic Journal</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Your Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your luxury beauty experiences</p>
        </header>

        <div className="flex p-1.5 bg-card border border-border/50 rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              "flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300",
              activeTab === 'upcoming' 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={cn(
              "flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300",
              activeTab === 'completed' 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            Completed
          </button>
        </div>

        <div className="space-y-8">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="group p-0 overflow-hidden border-border/40 rounded-[2.5rem] luxury-shadow bg-card animate-in slide-in-from-bottom-6 duration-700 hover:border-secondary/30 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback 
                    src={booking.image} 
                    fallbackCategory={booking.category as any || 'Hair'}
                    alt={booking.serviceName} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute top-6 right-6">
                    <Badge className={cn(
                      "text-[10px] uppercase font-black px-4 py-2 rounded-full border-none shadow-lg backdrop-blur-md",
                      booking.status === 'upcoming' 
                        ? "bg-secondary text-primary" 
                        : "bg-black/60 text-white"
                    )}>
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Confirmed</span>
                    </div>
                    <h3 className="font-serif font-medium text-3xl text-white leading-tight mb-2">{booking.serviceName}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-secondary" /> 
                      <span>{booking.salonName}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-[0.15em] block">Date & Time</span>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                          <CalendarDays className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{booking.time}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-[0.15em] block">Specialist</span>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                          <User className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{booking.stylistName}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Expert Artist</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border/40">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-extrabold text-muted-foreground tracking-[0.2em] mb-1">Total Fee</span>
                      <span className="text-2xl font-black text-primary">₹{booking.price}</span>
                    </div>
                    
                    <div className="flex gap-2.5">
                      {booking.status === 'upcoming' ? (
                        <>
                          <Button 
                            variant="outline" 
                            onClick={() => navigate('/book')} 
                            className="rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-6 h-auto border-border hover:border-secondary transition-all"
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={() => handleCancelBooking(booking.id, booking.serviceName)} 
                            className="rounded-2xl text-destructive hover:bg-destructive/10 p-4 h-auto transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            showSuccess("Opening secure feedback portal...");
                          }} 
                          className="rounded-2xl text-[10px] font-black uppercase tracking-widest px-8 py-6 h-auto border-border flex items-center gap-2.5 hover:bg-secondary/10 transition-all"
                        >
                          <Star className="w-4 h-4 text-secondary fill-secondary" /> Rate Session
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-24 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000">
              <div className="w-20 h-20 bg-muted/40 rounded-full flex items-center justify-center mb-6 text-muted-foreground/30">
                <CalendarX className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-serif font-medium text-foreground mb-2">No {activeTab} history</h3>
              <p className="text-muted-foreground text-sm mb-8 max-w-[240px] mx-auto">Your aesthetic journey is ready for its next chapter.</p>
              <Button 
                onClick={() => navigate('/')} 
                className="rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] px-10 py-7 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center gap-2"
              >
                Book Appointment <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;