import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User, Trash2, RotateCcw, Star, CalendarX, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';
import ImageWithFallback from '@/components/ImageWithFallback';

const INITIAL_BOOKINGS = [
  {
    id: 'b1',
    salonName: 'Luxe Aura Studio',
    serviceName: 'Signature Hair Sculpt',
    stylistName: 'Elena Rose',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    time: '10:00 AM',
    status: 'upcoming',
    price: '₹850',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b2',
    salonName: 'Velvet Touch Spa',
    serviceName: 'Cellular Glow Facial',
    stylistName: 'Sophia Chen',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    time: '02:00 PM',
    status: 'completed',
    price: '₹1299',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop'
  }
];

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [allBookings, setAllBookings] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    setAllBookings([...stored, ...INITIAL_BOOKINGS]);
  }, []);

  const handleCancelBooking = (bookingId: string, serviceName: string) => {
    const updated = allBookings.filter(b => b.id !== bookingId);
    setAllBookings(updated);
    const stored = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    localStorage.setItem('user_bookings', JSON.stringify(stored.filter((b: any) => b.id !== bookingId)));
    showSuccess(`Cancelled "${serviceName}"`);
  };

  const filteredBookings = allBookings.filter((booking) => booking.status === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-44 px-6 pt-8 animate-in fade-in duration-300 items-center">
      <div className="w-full max-w-lg md:max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-medium text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground text-sm">Your luxury beauty schedule</p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button 
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              "flex-1 rounded-2xl py-6 font-bold transition-all",
              activeTab === 'upcoming' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" : "bg-card border border-border text-muted-foreground"
            )}
          >
            Upcoming
          </Button>
          <Button 
            onClick={() => setActiveTab('completed')}
            className={cn(
              "flex-1 rounded-2xl py-6 font-bold transition-all",
              activeTab === 'completed' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" : "bg-card border border-border text-muted-foreground"
            )}
          >
            Completed
          </Button>
        </div>

        <div className="space-y-8">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="p-0 overflow-hidden border-border/50 rounded-[2.5rem] luxury-shadow bg-card animate-in slide-in-from-bottom-4 duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback src={booking.image} alt={booking.serviceName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <Badge className={cn(
                    "absolute top-4 right-4 text-[9px] uppercase font-black px-3 py-1 rounded-full border-none",
                    booking.status === 'upcoming' ? "bg-secondary text-primary" : "bg-white/20 text-white backdrop-blur-md"
                  )}>
                    {booking.status}
                  </Badge>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="font-serif font-medium text-2xl text-white leading-tight">{booking.serviceName}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3" /> {booking.salonName}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 py-2 mb-6">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest block">Date & Time</span>
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                        <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                        <span>{new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {booking.time}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest block">Specialist</span>
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                        <User className="w-3.5 h-3.5 text-secondary" />
                        <span>{booking.stylistName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/40">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Price Paid</span>
                      <span className="text-lg font-black text-primary">{booking.price}</span>
                    </div>
                    <div className="flex gap-2">
                      {booking.status === 'upcoming' ? (
                        <>
                          <Button variant="outline" onClick={() => navigate('/book')} className="rounded-xl text-xs font-bold px-4 py-2 h-auto border-border">Reschedule</Button>
                          <Button variant="ghost" onClick={() => handleCancelBooking(booking.id, booking.serviceName)} className="rounded-xl text-destructive hover:bg-destructive/10 p-2 h-auto"><Trash2 className="w-4 h-4" /></Button>
                        </>
                      ) : (
                        <Button variant="outline" onClick={() => showSuccess("Feedback recorded!")} className="rounded-xl text-xs font-bold px-6 py-2 h-auto border-border flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <CalendarX className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-sm font-medium">No {activeTab} experiences found.</p>
              <Button onClick={() => navigate('/')} className="mt-6 rounded-2xl bg-secondary text-primary font-bold px-8 py-3 hover:bg-secondary/90 transition-all shadow-xl">Book Now</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;