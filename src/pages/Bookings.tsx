import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarDays, Clock, User, Trash2, RotateCcw, Star } from 'lucide-react';

const Bookings = () => {
  const navigate = useNavigate();
  
  const bookings = [
    {
      id: 'b1',
      salonName: 'Luxe Aura Studio',
      serviceName: 'Signature Haircut',
      stylistName: 'Elena Rose',
      date: new Date(Date.now() + 86400000 * 2),
      time: '10:00 AM',
      status: 'upcoming',
      price: '₹499'
    },
    {
      id: 'b2',
      salonName: 'Velvet Touch Spa',
      serviceName: 'Luxury Facial',
      stylistName: 'Sophia Chen',
      date: new Date(Date.now() - 86400000 * 5),
      time: '02:00 PM',
      status: 'completed',
      price: '₹1299'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-medium text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground text-sm">Your history of luxury experiences</p>
        </div>

        <div className="flex gap-4 mb-6">
          <Button variant="default" className="flex-1 rounded-xl bg-primary text-primary-foreground">Upcoming</Button>
          <Button variant="outline" className="flex-1 rounded-xl border-border">Completed</Button>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-5 border-border/50 rounded-3xl luxury-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                    {booking.salonName[0]}
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-lg text-foreground">{booking.salonName}</h3>
                    <span className="text-xs text-muted-foreground">{booking.serviceName}</span>
                  </div>
                </div>
                <Badge className={cn(
                  "text-[10px] uppercase font-bold px-2 py-0.5",
                  booking.status === 'upcoming' ? "bg-secondary text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {booking.status}
                </Badge>
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{booking.stylistName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  <span>Total: {booking.price}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {booking.status === 'upcoming' ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1 py-6 rounded-2xl text-xs font-medium border-border flex items-center gap-2"
                    >
                      <RotateCcw className="w-3 h-3" /> Reschedule
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="p-6 rounded-2xl text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full py-6 rounded-2xl text-xs font-medium border-border flex items-center justify-center gap-2"
                  >
                    <Star className="w-3 h-3" /> Rate Experience
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Bookings;
