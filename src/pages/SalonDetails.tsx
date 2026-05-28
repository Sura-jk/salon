import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Plus, Check, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageWithFallback from '@/components/ImageWithFallback';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const SALON_DATA = {
  salon1: {
    name: 'Luxe Aura Studio',
    rating: 4.9,
    reviews: 128,
    address: '123 Luxury Lane, Bandra West, Mumbai',
    timing: '09:00 AM - 08:00 PM',
    images: [
      'https://images.unsplash.com/photo-1560066982-3f83097c023d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    ],
    services: [
      { id: 's1', name: 'Signature Haircut', duration: '45 min', price: 499, category: 'Hair' },
      { id: 's2', name: 'Balayage Color', duration: '120 min', price: 2499, category: 'Hair' },
      { id: 's3', name: 'Luxury Facial', duration: '60 min', price: 1299, category: 'Facial' },
      { id: 's4', name: 'Royal Manicure', duration: '45 min', price: 699, category: 'Nails' },
      { id: 's5', name: 'Glow Skincare Ritual', duration: '75 min', price: 1599, category: 'Skin' },
    ],
    staff: [
      { id: 'st1', name: 'Elena Rose', role: 'Master Stylist', exp: '8 years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80' },
      { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', exp: '5 years', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80' },
      { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', exp: '10 years', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80' },
    ]
  }
};

const SalonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const salon = SALON_DATA[id as keyof typeof SALON_DATA] || SALON_DATA.salon1;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const categories = ['All', 'Hair', 'Facial', 'Nails', 'Skin'];

  const toggleService = (serviceId: string, serviceName: string) => {
    setSelectedServices(prev => {
      const isSelected = prev.includes(serviceId);
      if (isSelected) {
        return prev.filter(id => id !== serviceId);
      } else {
        showSuccess(`Added "${serviceName}" to booking!`);
        return [...prev, serviceId];
      }
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % salon.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + salon.images.length) % salon.images.length);
  };

  const filteredServices = activeCategory === 'All' 
    ? salon.services 
    : salon.services.filter(s => s.category === activeCategory);

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
    <div className="flex flex-col min-h-screen bg-background pb-32">
      {/* Hero Header Gallery Slider */}
      <div className="relative h-80 w-full overflow-hidden bg-muted group">
        <div className="w-full h-full relative">
          <ImageWithFallback 
            src={salon.images[activeImageIdx]} 
            alt={`${salon.name} view ${activeImageIdx + 1}`} 
            className="h-full w-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105" 
          />
        </div>

        {/* Back Button Overlay */}
        <div className="absolute top-6 left-6 z-20">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/95 backdrop-blur p-2 h-10 w-10 border-none shadow-lg hover:scale-105 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Left & Right Interactive Navigation Chevrons */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevImage}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Gallery Progress Dots */}
        <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center gap-2">
          {salon.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIdx(idx);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === activeImageIdx ? "w-6 bg-secondary" : "w-1.5 bg-white/60 hover:bg-white"
              )}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Main Info Section */}
      <div className="px-6 py-6 -mt-12 relative z-10 bg-background rounded-t-[2.5rem] shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                Highly Rated
              </span>
            </div>
            <h1 className="text-3xl font-serif font-medium text-foreground mb-2">{salon.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-secondary font-bold">
                <Star className="w-4 h-4 fill-secondary text-secondary" />
                <span>{salon.rating}</span>
              </div>
              <span className="opacity-50">•</span>
              <span>{salon.reviews} Reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3.5 mb-8">
          <div className="flex flex-col items-center p-3.5 rounded-2xl bg-card border border-border/60 text-center shadow-sm">
            <MapPin className="w-4 h-4 text-secondary mb-2" />
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Location</span>
            <span className="text-xs font-semibold truncate w-full mt-0.5">{salon.address.split(',')[0]}</span>
          </div>
          <div className="flex flex-col items-center p-3.5 rounded-2xl bg-card border border-border/60 text-center shadow-sm">
            <Clock className="w-4 h-4 text-secondary mb-2" />
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Timing</span>
            <span className="text-xs font-semibold mt-0.5">09 AM - 8 PM</span>
          </div>
          <div className="flex flex-col items-center p-3.5 rounded-2xl bg-card border border-border/60 text-center shadow-sm">
            <Sparkles className="w-4 h-4 text-secondary mb-2" />
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Service</span>
            <span className="text-xs font-semibold mt-0.5">Premium</span>
          </div>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-secondary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Categories</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-muted-foreground border-border/60 hover:border-secondary/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-serif font-medium">Select Services</h2>
            {selectedServices.length > 0 && (
              <button 
                onClick={() => setSelectedServices([])}
                className="text-xs font-bold text-secondary hover:underline"
              >
                Clear All ({selectedServices.length})
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {filteredServices.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div 
                  key={service.id}
                  onClick={() => toggleService(service.id, service.name)}
                  className={cn(
                    "flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border-2 duration-300",
                    isSelected 
                      ? "border-secondary bg-secondary/10 shadow-lg scale-[1.01]" 
                      : "border-border/50 bg-card hover:border-secondary/30"
                  )}
                >
                  <div className="flex-1 pr-4">
                    <span className="font-serif font-semibold text-base text-foreground block mb-1 group-hover:text-secondary">{service.name}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{service.category}</span>
                      <span>•</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary text-lg">₹{service.price}</span>
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border",
                      isSelected 
                        ? "bg-secondary border-secondary text-primary scale-110" 
                        : "bg-muted/50 border-border/80 text-muted-foreground"
                    )}>
                      {isSelected ? <Check className="w-4 h-4 stroke-[3px]" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Staff Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-5">Expert Stylists</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {salon.staff.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-2.5 min-w-[90px] group">
                <div className="relative">
                  <ImageWithFallback 
                    src={member.image} 
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-secondary/40 p-1 group-hover:border-secondary transition-all duration-500" 
                  />
                  <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 border-2 border-background rounded-full shadow animate-pulse" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold block text-foreground leading-tight">{member.name}</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Booking Checkout Sheet */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent z-50 transition-all duration-500 ease-in-out transform",
        selectedServices.length > 0 ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      )}>
        <div className="max-w-md mx-auto flex items-center justify-between p-5 rounded-3xl bg-primary text-primary-foreground shadow-2xl border border-secondary/20">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-secondary tracking-widest mb-1">
              {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} Selected
            </span>
            <span className="text-2xl font-bold">
              ₹{totalPrice} 
              <span className="text-xs font-medium opacity-80 ml-2">({totalDuration} min)</span>
            </span>
          </div>
          <Button 
            onClick={() => navigate('/book')}
            className="rounded-2xl bg-secondary text-primary font-bold px-7 py-6 hover:bg-secondary/90 transition-all active:scale-95 shadow-lg shadow-secondary/20 text-sm tracking-wide"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;