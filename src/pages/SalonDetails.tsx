import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Plus, Check, Sparkles, Filter, Ticket, ShieldCheck, Zap, Heart } from 'lucide-react';
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
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527799822367-3188572f481b?q=80&w=1000&auto=format&fit=crop',
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
      { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', exp: '5 years', image: 'https://images.unsplash.com/photo-1500648761738-77097f5a052a?auto=format&fit=crop&w=200&h=200&q=80' },
      { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', exp: '10 years', image: 'https://images.unsplash.com/photo-1438761675141-bd307077e227?auto=format&fit=crop&w=200&h=200&q=80' },
    ]
  },
  salon2: {
    name: 'Velvet Touch Spa',
    rating: 4.7,
    reviews: 85,
    address: '456 Serenity Blvd, Juhu, Mumbai',
    timing: '08:00 AM - 09:00 PM',
    images: [
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop',
    ],
    services: [
      { id: 's3', name: 'Luxury Facial', duration: '60 min', price: 1299, category: 'Facial' },
      { id: 's2_1', name: 'Aromatherapy Body Massage', duration: '90 min', price: 1899, category: 'Skin' },
      { id: 's2_2', name: 'Hot Stone Therapy', duration: '75 min', price: 2199, category: 'Skin' },
      { id: 's2_3', name: 'Sea Salt Scrub & Polish', duration: '45 min', price: 1199, category: 'Skin' },
    ],
    staff: [
      { id: 'st3', name: 'Sophia Chen', role: 'Therapeutic Masseuse', exp: '10 years', image: 'https://images.unsplash.com/photo-1438761675141-bd307077e227?auto=format&fit=crop&w=200&h=200&q=80' },
      { id: 'st1', name: 'Elena Rose', role: 'Aroma Expert', exp: '8 years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80' },
    ]
  },
  salon3: {
    name: 'Golden Glow Parlour',
    rating: 4.8,
    reviews: 210,
    address: '789 Glittering Row, Colaba, Mumbai',
    timing: '10:00 AM - 08:30 PM',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604654771876-22273993930a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000&auto=format&fit=crop',
    ],
    services: [
      { id: 's4', name: 'Royal Manicure', duration: '45 min', price: 699, category: 'Nails' },
      { id: 's3_1', name: 'Imperial Gel Pedicure', duration: '60 min', price: 899, category: 'Nails' },
      { id: 's3_2', name: 'Diamond Glow Whitening Facial', duration: '60 min', price: 1599, category: 'Facial' },
      { id: 's3_3', name: 'Luxury Makeup Makeover', duration: '75 min', price: 2999, category: 'Skin' },
    ],
    staff: [
      { id: 'st2', name: 'Marcus Thorne', role: 'Creative Director / Makeup', exp: '5 years', image: 'https://images.unsplash.com/photo-1500648761738-77097f5a052a?auto=format&fit=crop&w=200&h=200&q=80' },
      { id: 'st3', name: 'Sophia Chen', role: 'Nail Art Specialist', exp: '10 years', image: 'https://images.unsplash.com/photo-1438761675141-bd307077e227?auto=format&fit=crop&w=200&h=200&q=80' },
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

  // Coupon promo code states
  const [couponInput, setCouponInput] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

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

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'LUXE20' || code === 'SUMMER20') {
      setActiveDiscount({ code, percent: 20 });
      showSuccess(`Coupon "${code}" applied! 20% discount unlocked.`);
      setCouponInput('');
    } else if (code === 'WELCOME10') {
      setActiveDiscount({ code, percent: 10 });
      showSuccess(`Coupon "${code}" applied! 10% discount unlocked.`);
      setCouponInput('');
    } else {
      showSuccess("Invalid coupon code. Try 'LUXE20'!");
    }
  };

  const handleRemoveCoupon = () => {
    if (activeDiscount) {
      showSuccess(`Coupon "${activeDiscount.code}" removed.`);
      setActiveDiscount(null);
    }
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

  const baseTotalPrice = selectedServices.reduce((acc, id) => {
    const service = salon.services.find(s => s.id === id);
    return acc + (service?.price || 0);
  }, 0);

  const discountAmount = activeDiscount ? Math.round((baseTotalPrice * activeDiscount.percent) / 100) : 0;
  const finalTotalPrice = baseTotalPrice - discountAmount;

  const totalDuration = selectedServices.reduce((acc, id) => {
    const service = salon.services.find(s => s.id === id);
    const mins = parseInt(service?.duration.split(' ')[0] || '0');
    return acc + mins;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Header Gallery */}
      <div className="relative h-80 w-full overflow-hidden bg-muted group">
        <ImageWithFallback 
          src={salon.images[activeImageIdx]} 
          alt={salon.name} 
          className="h-full w-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105" 
        />
        <div className="absolute top-6 left-6 z-20">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/95 backdrop-blur p-2 h-10 w-10 border-none shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>
        </div>
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevImage} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white pointer-events-auto hover:bg-black/60 transition-colors">
            <ChevronLeft className="w-5 h-5 mx-auto" />
          </button>
          <button onClick={nextImage} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white pointer-events-auto hover:bg-black/60 transition-colors">
            <ChevronRight className="w-5 h-5 mx-auto" />
          </button>
        </div>
        <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center gap-2">
          {salon.images.map((_, idx) => (
            <button key={idx} onClick={() => setActiveImageIdx(idx)} className={cn("h-1.5 rounded-full transition-all duration-300", idx === activeImageIdx ? "w-6 bg-secondary" : "w-1.5 bg-white/60")} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="px-6 py-6 -mt-12 relative z-10 bg-background rounded-t-[2.5rem] shadow-2xl flex-1">
        <div className="mb-6">
          <Badge className="bg-secondary/10 text-secondary border-none mb-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Highly Rated</Badge>
          <h1 className="text-3xl font-serif font-medium text-foreground mb-2">{salon.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 text-secondary font-bold">
              <Star className="w-4 h-4 fill-secondary" />
              <span>{salon.rating}</span>
            </div>
            <span className="opacity-30">•</span>
            <span>{salon.reviews} Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: MapPin, label: 'Location', value: salon.address.split(',')[0] },
            { icon: Clock, label: 'Timing', value: '09 AM - 8 PM' },
            { icon: Sparkles, label: 'Service', value: 'Premium' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-card border border-border/50 text-center shadow-sm">
              <item.icon className="w-4 h-4 text-secondary mb-2" />
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">{item.label}</span>
              <span className="text-[11px] font-semibold truncate w-full mt-0.5">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-secondary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Treatments</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all border whitespace-nowrap",
                  activeCategory === cat ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card text-muted-foreground border-border/60"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-serif font-medium">Services</h2>
            {selectedServices.length > 0 && <button onClick={() => setSelectedServices([])} className="text-xs font-bold text-secondary">Clear ({selectedServices.length})</button>}
          </div>
          <div className="space-y-4">
            {filteredServices.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div key={service.id} onClick={() => toggleService(service.id, service.name)} className={cn("flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border-2", isSelected ? "border-secondary bg-secondary/10 shadow-lg" : "border-border/40 bg-card hover:border-secondary/20")}>
                  <div className="flex-1 pr-4">
                    <span className="font-serif font-semibold text-base text-foreground block mb-1">{service.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      <span className="bg-muted px-2 py-0.5 rounded">{service.category}</span>
                      <span>•</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">₹{service.price}</span>
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center transition-all border", isSelected ? "bg-secondary border-secondary text-primary" : "bg-muted/50 border-border text-muted-foreground")}>
                      {isSelected ? <Check className="w-4 h-4 stroke-[3px]" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coupon Card */}
        <div className="mb-8 p-5 rounded-3xl bg-card border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="w-4 h-4 text-secondary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Promo Coupon</h3>
          </div>
          {activeDiscount ? (
            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
              <div>
                <span className="text-xs font-black text-secondary block">{activeDiscount.code} Active</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">{activeDiscount.percent}% discount applied</span>
              </div>
              <button onClick={handleRemoveCoupon} className="text-xs font-bold text-destructive px-2">Remove</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input type="text" placeholder="Enter Code (e.g. LUXE20)" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1 bg-muted/20 border border-border rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-secondary outline-none" />
              <Button onClick={handleApplyCoupon} className="rounded-xl bg-primary text-xs font-bold px-5">Apply</Button>
            </div>
          )}
        </div>

        {/* Staff Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium mb-5">Master Stylists</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {salon.staff.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-2 min-w-[80px]">
                <ImageWithFallback src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-secondary/20 p-0.5" />
                <div className="text-center">
                  <span className="text-[10px] font-bold block text-foreground leading-tight">{member.name}</span>
                  <span className="text-[8px] text-muted-foreground block mt-0.5 uppercase">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section - Prevents "Empty" sensation */}
        <div className="pt-10 pb-20 border-t border-border/30 mt-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-serif font-medium">Premium Experience Guaranteed</h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[250px] mx-auto">
                Our salon follows strict hygiene protocols and uses only premium organic products for your luxury session.
              </p>
            </div>
            <div className="flex gap-6 pt-4">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Safe & Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Instant Booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Checkout */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent z-50 transition-all duration-500",
        selectedServices.length > 0 ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0 pointer-events-none"
      )}>
        <div className="max-w-md mx-auto flex items-center justify-between p-5 rounded-3xl bg-primary text-primary-foreground shadow-2xl border border-secondary/20">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-secondary tracking-widest mb-1">{selectedServices.length} Selected</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{finalTotalPrice}</span>
              {activeDiscount && <span className="text-sm font-semibold line-through opacity-40">₹{baseTotalPrice}</span>}
            </div>
          </div>
          <Button onClick={() => navigate(`/book?service=${selectedServices[0]}`)} className="rounded-2xl bg-secondary text-primary font-bold px-7 py-6 hover:bg-secondary/90 shadow-lg text-sm">
            Reserve Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;