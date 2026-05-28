import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarDays, Clock, User, Trash2 } from 'lucide-react';

const Bookings = () => {
  const navigate = useNavigate();
  
  // Mock data from localStorage or hardcoded for demo
  const lastBooking = JSON.parse(localStorage.getItem('lastBooking') || 'null');
  
  const bookings = lastBooking ? [lastBooking] : [
    {
      id: 'b1',
      serviceId: 'h1',
      serviceName: 'Luxury Hair Sculpt',
      stylistId: 's1',
      stylistName: 'Elena Rose',
      date: new Date(Date.now() + 86400000 * 2),
      time: '10:00 AM',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-medium text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground text-sm">Manage your upcoming luxury experiences</p>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <CalendarDays className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No appointments yet</h3>
            <p className="text-muted-foreground text-sm mb-8">Your journey to beauty starts here.</p>
            <Button 
              onClick={() => navigate('/book')}
              className="px-8 py-6 rounded-2xl bg-primary text-primary-foreground"
            >
              Book Now
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-5 border-border/50 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif font-medium text-lg text-foreground">
                      {booking.serviceName || 'Selected Service'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <User className="w-3 h-3" />
                      <span>{booking.stylistName || 'Expert Stylist'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary">Confirmed</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(booking.date).toDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 py-6 rounded-2xl text-xs font-medium border-border"
                  >
                    Reschedule
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="p-6 rounded-2xl text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
