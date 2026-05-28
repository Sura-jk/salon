import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, ChevronLeft, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SALON_DATA = {
  salon1: {
    name: 'Luxe Aura Studio',
    rating: 4.9,
    reviews: 128,
    address: '123 Luxury Lane, Bandra West, Mumbai',
    timing: '09:00 AM - 08:00 PM',
    images: [
      'https://images.unsplash.com/photo-1560066982-73a8579Bf77a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521566626196-f77d7737307a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=1000&auto=format&fit=crop',
    ],
    services: [
      { id: 's1', name: 'Signature Haircut', duration: '45 min', price: 499 },
      { id: 's2', name: 'Balayage Color', duration: '120 min', price: 2499 },
      { id: 's3', name: 'Luxury Facial', duration: '60 min', price: 1299 },
      { id: 's4', name: 'Royal Manicure', duration: '45 min', price: 699 },
    ],
    staff: [
      { id: 'st1', name: 'Elena Rose', role: 'Master Stylist', exp: '8 years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
      { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', exp: '5 years', image: 'https://images.unsplash.com/photo-1500648761738-77097f5a052a?q=80&w=200&auto=format&fit=crop' },
      { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', exp: '10 years', image: 'https://images.unsplash.com/photo-1438761675141-bd307077e227?q=80&w=200&auto=format&fit=crop' },
    ]
  }
};

const SalonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const salon = SALON_DATA[id as keyof typeof SALON_DATA] || SALON_DATA.salon1;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const totalPrice = selectedServices.reduce((acc, id) => {
    const service = salon.services.find(s => s.id === id);
    return acc + (service?.price || 0);
  }, 0);

  const totalDuration = selectedServices.reduce((acc, id) => {
    const service = salon.services.find(s => s.id === id);
    const mins = parseInt(service?.duration.split(' ')[0] || '0');
    return acc + mins;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Image Gallery */}
      <div className="relative h-80 w-full overflow-hidden">
        <img src={salon.images[0]} className="h-full w-full object-cover" alt={salon.name} />
        <div className="absolute top-6 left-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/90 backdrop-blur p-2 h-10 w-10 border-none shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Salon Info */}
      <div className="px-6 py-6 -mt-10 relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-medium text-foreground mb-2">{salon.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-secondary font-bold">
                <Star className="w-3.5 h-3.5 fill-secondary" />
                <span>{salon.rating}</span>
              </div>
              <span className="opacity-50">•</span>
              <span>{salon.reviews} Reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-card border border-border text-center shadow-sm">
            <MapPin className="w-4 h-4 text-secondary mb-2" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Location</span>
            <span className="text-xs font-medium truncate w-full">{salon.address.split(',')[0]}</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-card border border-border text-center shadow-sm">
            <Clock className="w-4 h-4 text-secondary mb-2" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Timing</span>
            <span className="text-xs font-medium">09 AM - 8 PM</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-card border border-border text-center shadow-sm">
            <Star className="w-4 h-4 text-secondary mb-2" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Rating</span>
            <span className="text-xs font-medium">Premium</span>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-medium mb-6">Our Services</h2>
          <div className="space-y-4">
            {salon.services.map((service) => (
              <div 
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={cn(
                  "flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border-2",
                  selectedServices.includes(service.id) 
                    ? "border-secondary bg-secondary/10 shadow-md" 
                    : "border-transparent bg-card border-border hover:border-secondary/50"
                )}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{service.name}</span>
                  <span className="text-xs text-muted-foreground">{service.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary">₹{service.price}</span>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                    selectedServices.includes(service.id) ? "bg-secondary text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {selectedServices.includes(service.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-medium mb-6">Expert Stylists</h2>
          <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
            {salon.staff.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-3 min-w-fit group">
                <div className="relative">
                  <img src={member.image} className="w-20 h-20 rounded-full object-cover border-2 border-secondary p-1 group-hover:scale-105 transition-transform" alt={member.name} />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold block">{member.name}</span>
                  <span className="text-[10px] text-muted-foreground">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent z-20">
          <div className="max-w-md mx-auto flex items-center justify-between p-5 rounded-3xl bg-primary text-primary-foreground shadow-2xl luxury-shadow animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-secondary tracking-widest">Total Estimate</span>
              <span className="text-xl font-bold">₹{totalPrice} <span className="text-xs font-normal opacity-70">({totalDuration} min)</span></span>
            </div>
            <Button 
              onClick={() => navigate('/book')}
              className="rounded-xl bg-secondary text-primary font-bold px-6 py-2 hover:bg-secondary/90 transition-all active:scale-95"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonDetails;