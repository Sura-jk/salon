import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User, Trash2, RotateCcw, Star, CalendarX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';
import ImageWithFallback from '@/components/ImageWithFallback';

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const bookings = [
    {
      id: 'b1',
      salonName: 'Luxe Aura Studio',
      serviceName: 'Signature Haircut',
      stylistName: 'Elena Rose',
      date: new Date(Date.now() + 86400000 * 2),
      time: '10:00 AM',
      status: 'upcoming',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1560066982-3f83097c023d?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'b2',
      salonName: 'Velvet Touch Spa',
      serviceName: 'Luxury Facial',
      stylistName: 'Sophia Chen',
      date: new Date(Date.now() - 86400000 * 5),
      time: '02:00 PM',
      status: 'completed',
      price: '₹1299',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=120&q=80'
    }
  ];

  const handleReschedule = (serviceName: string) => {
    showSuccess(`Select a new date/time to reschedule "${serviceName}"`);
    navigate('/book');
  };

  const handleCancelBooking = (serviceName: string) => {
    showSuccess(`Booking for "${serviceName}" cancelled successfully.`);
  };

  const handleRateExperience = (salonName: string) => {
    showSuccess(`Thank you for rating your experience at ${salonName}! 5 Stars recorded!`);
  };

  const filteredBookings = bookings.filter((booking) => booking.status === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-8 animate-in fade-in duration-300">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-medium text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground text-sm">Your history of luxury experiences</p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-4 mb-6">
          <Button 
            onClick={() => setActiveTab('upcoming')}
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            className={cn(
              "flex-1 rounded-xl py-6 font-bold transition-all duration-300 active:scale-95",
              activeTab === 'upcoming' 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                : "border-border hover:bg-muted text-muted-foreground"
            )}
          >
            Upcoming
          </Button>
          <Button 
            onClick={() => setActiveTab('completed')}
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            className={cn(
              "flex-1 rounded-xl py-6 font-bold transition-all duration-300 active:scale-95",
              activeTab === 'completed' 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                : "border-border hover:bg-muted text-muted-foreground"
            )}
          >
            Completed
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="p-0 overflow-hidden border-border/50 rounded-3xl luxury-shadow bg-card animate-in slide-in-from-bottom-4 duration-500"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border/60 shadow-sm flex-shrink-0">
                        <ImageWithFallback 
                          src={booking.image} 
                          alt={booking.salonName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-serif font-medium text-lg text-foreground leading-tight">{booking.salonName}</h3>
                        <span className="text-xs text-muted-foreground">{booking.serviceName}</span>
                      </div>
                    </div>
                    <Badge className={cn(
                      "text-[10px] uppercase font-bold px-2.5 py-1 rounded-full",
                      booking.status === 'upcoming' ? "bg-secondary text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                      <span>{new Date(booking.date).toDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5 text-secondary" />
                      <span>{booking.stylistName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary">
                      <span>Total: {booking.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {booking.status === 'upcoming' ? (
                      <>
                        <Button 
                          variant="outline" 
                          onClick={() => handleReschedule(booking.serviceName)}
                          className="flex-1 py-6 rounded-2xl text-xs font-bold border-border flex items-center justify-center gap-2 hover:bg-secondary/10 transition-all"
                        >
                          <RotateCcw className="w-3 h-3" /> Reschedule
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => handleCancelBooking(booking.serviceName)}
                          className="p-6 rounded-2xl text-destructive hover:bg-destructive/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => handleRateExperience(booking.salonName)}
                        className="w-full py-6 rounded-2xl text-xs font-bold border-border flex items-center justify-center gap-2 hover:bg-secondary/10 transition-all"
                      >
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Rate Experience
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-muted/40 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                <CalendarX className="w-8 h-8" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">No {activeTab} bookings found.</p>
              <Button 
                onClick={() => navigate('/')} 
                className="mt-4 rounded-xl bg-secondary text-primary font-bold px-6 py-2 hover:bg-secondary/90 transition-all"
              >
                Book a Treatment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;