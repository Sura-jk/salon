import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Plus, Check, Sparkles, Ticket, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ImageWithFallback';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';
import { ServiceTable } from '@/components/ServiceTable';

type CouponDiscount = { code: string; percent: number };

const SALON_DATA = {
  salon1: {
    name: 'Luxe Aura Studio',
    rating: 4.9,
    reviews: 128,
    address: '123 Luxury Lane, Bandra West, Mumbai',
    timing: '09:00 AM - 08:00 PM',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
    ],
    services: [
      { id: 's1', name: 'Signature Haircut', duration: '45 min', price: 499, category: 'Hair' },
      { id: 's2', name: 'Balayage Color', duration: '120 min', price: 2499, category: 'Hair' },
      { id: 's3', name: 'Luxury Facial', duration: '60 min', price: 1299, category: 'Facial' },
      { id: 's4', name: 'Royal Manicure', duration: '45 min', price: 699, category: 'Nails' },
      { id: 's5', name: 'Glow Skincare Ritual', duration: '75 min', price: 1599, category: 'Skin' },
    ],
    staff: [
      { id: 'st1', name: 'Elena Rose', role: 'Master Stylist', exp: '8 years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
      { id: 'st2', name: 'Marcus Thorne', role: 'Color Expert', exp: '5 years', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
      { id: 'st3', name: 'Sophia Chen', role: 'Skin Specialist', exp: '10 years', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
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
      { id: 's2_1', name: 'Aroma Therapy Body Massage', duration: '90 min', price: 1899, category: 'Skin' },
      { id: 's2_2', name: 'Hot Stone Therapy', duration: '75 min', price: 2199, category: 'Skin' },
      { id: 's2_3', name: 'Sea Salt Scrub & Polish', duration: '45 min', price: 1199, category: 'Skin' },
    ],
    staff: [
      { id: 'st3', name: 'Sophia Chen', role: 'Therapeutic Masseuse', exp: '10 years', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
      { id: 'st1', name: 'Elena Rose', role: 'Aroma Expert', exp: '8 years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  salon3: {
    name: 'Golden Glow Parlour',
    rating: 4.8,
    reviews: 210,
    address: '789 Glittering Row, Colaba, Mumbai',
    timing: '10:00 AM - 08:30 PM',
    images: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604654771876-22273993930a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop',
    ],
    services: [
      { id: 's4', name: 'Royal Manicure', duration: '45 min', price: 699, category: 'Nails' },
      { id: 's3_1', name: 'Imperial Gel Pedicure', duration: '60 min', price: 899, category: 'Nails' },
      { id: 's3_2', name: 'Diamond Glow Whitening Facial', duration: '60 min', price: 1599, category: 'Facial' },
      { id: 's3_3', name: 'Luxury Makeup Makeover', duration: '75 min', price: 2999, category: 'Skin' },
    ],
    staff: [
      { id: 'st2', name: 'Marcus Thorne', role: 'Creative Director / Makeup', exp: '5 years', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
      { id: 'st3', name: 'Sophia Chen', role: 'Nail Art Specialist', exp: '10 years', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
    ]
  }
};

const AVAILABLE_PROMOS = [
  { code: 'LUXE20', description: '20% Off', percent: 20 },
  { code: 'SUMMER20', description: '20% Summer Spec', percent: 20 },
  { code: 'WELCOME10', description: '10% New User', percent: 10 }
];

const SalonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const salon = SALON_DATA[id as keyof typeof SALON_DATA] || SALON_DATA.salon1;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Promo‑code states
  const [promoInput, setPromoInput] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<CouponDiscount | null>(null);
  const [bottomCouponInput, setBottomCouponInput] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const categories = ['All', 'Hair', 'Facial', 'Nails', 'Skin'];

  const handleBack = () => {
    // If we have history entries to go back to, go back. Otherwise go to Home "/" safely.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

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

  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(id => id !== serviceId));
  };

  const handleApplyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const match = AVAILABLE_PROMOS.find(p => p.code === cleanCode);
    if (match) {
      setActiveDiscount({ code: match.code, percent: match.percent });
      showSuccess(`Promo code "${match.code}" applied successfully!`);
    } else {
      showSuccess("Invalid promo code.");
    }
  };

  const handleApplyPromo = () => {
    if (!promoInput) return;
    handleApplyPromoCode(promoInput);
    setPromoInput('');
  };

  const handleApplyBottomCoupon = () => {
    if (!bottomCouponInput) return;
    handleApplyPromoCode(bottomCouponInput);
    setBottomCouponInput('');
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

  const selectedServiceDetails = selectedServices
    .map(id => salon.services.find(s => s.id === id))
    .filter(Boolean) as typeof salon.services;

  const baseTotalPrice = selectedServiceDetails.reduce((acc, svc) => acc + (svc.price || 0), 0);
  const discountAmount = activeDiscount ? Math.round((baseTotalPrice * activeDiscount.percent) / 100) : 0;
  const finalTotalPrice = baseTotalPrice - discountAmount;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navigation - Smaller icons and text */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/10 px-4 py-2.5">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="rounded-full bg-card/50 border border-border/50 h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-base font-serif font-medium">{salon.name}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full bg-card/50 border border-border/50 h-8 w-8 p-0"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Hero Image Carousel */}
      <div className="relative h-72 w-full overflow-hidden">
        <ImageWithFallback
          src={salon.images[activeImageIdx]}
          alt={salon.name}
          className="h-full w-full object-cover transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-8 w-8 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-8 w-8 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {salon.images.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all',
                idx === activeImageIdx ? 'bg-white w-4' : 'bg-white/40'
              )}
            />
          ))}
        </div>
      </div>

      {/* Salon Info - Smaller text */}
      <div className="px-4 py-4 space-y-2.5">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-serif font-medium text-foreground">{salon.name}</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                <span className="font-bold text-foreground text-sm">{salon.rating}</span>
                <span className="text-muted-foreground text-xs">({salon.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <Badge className="bg-secondary/20 text-secondary font-bold px-2.5 py-0.5 rounded-full text-[10px]">
            <Sparkles className="w-2.5 h-2.5 mr-1" />
            Premium
          </Badge>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span className="text-muted-foreground">{salon.address}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span className="text-muted-foreground">{salon.timing}</span>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-serif font-medium">Services</h3>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id, service.name)}
                className={cn(
                  'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
                  isSelected ? 'border-secondary bg-secondary/10' : 'border-border bg-card hover:border-secondary/50'
                )}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm leading-tight">{service.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{service.duration}</p>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="font-bold text-primary text-sm">₹{service.price}</span>
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                      isSelected ? 'border-secondary bg-secondary' : 'border-border'
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table of selected services with arrow navigation */}
        <ServiceTable services={selectedServiceDetails} onRemove={removeService} />
      </div>

      {/* Staff Section */}
      <div className="px-4 py-3">
        <h3 className="text-base font-serif font-medium mb-3">Our Specialists</h3>
        <div className="space-y-2">
          {salon.staff.map((staff) => (
            <div key={staff.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border">
              <img src={staff.image} alt={staff.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <span className="font-medium block text-foreground text-sm">{staff.name}</span>
                <span className="text-[11px] text-muted-foreground">{staff.role}</span>
                <span className="text-[11px] text-secondary font-bold">{staff.exp} experience</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stand‑alone Promo Code Section with visible clickable codes */}
      <div className="px-4 py-3">
        <div className="p-3 rounded-2xl bg-card border border-border/50 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Ticket className="w-3.5 h-3.5 text-secondary" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground">Available Promo Codes</h3>
          </div>
          
          {/* List of Clickable Codes outside input */}
          <div className="flex flex-wrap gap-2 mb-3">
            {AVAILABLE_PROMOS.map((promo) => (
              <button
                key={promo.code}
                onClick={() => {
                  setPromoInput(promo.code);
                  handleApplyPromoCode(promo.code);
                }}
                className={cn(
                  "px-2.5 py-1.5 rounded-xl border border-dashed border-secondary/40 bg-secondary/5 text-secondary text-xs font-semibold hover:bg-secondary/15 transition-all flex flex-col items-start gap-0.5"
                )}
              >
                <span className="font-bold tracking-wider">{promo.code}</span>
                <span className="text-[9px] opacity-70 font-normal">{promo.description}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="Or enter custom code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="flex-1 rounded-xl border border-border/40 bg-card/50 px-3 py-1.5 text-sm focus:ring-secondary outline-none"
            />
            <Button
              variant="outline"
              onClick={handleApplyPromo}
              className="rounded-xl bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:bg-primary/90 h-auto"
            >
              Apply
            </Button>
          </div>
          {activeDiscount && (
            <p className="text-secondary font-bold text-xs mt-2 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Code &quot;{activeDiscount.code}&quot; applied! ({activeDiscount.percent}% discount)
            </p>
          )}
        </div>
      </div>

      {/* Floating Checkout - Smaller */}
      <div className={cn(
        'fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent z-50 transition-all duration-500',
        selectedServices.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      )}>
        <div className="max-w-md mx-auto flex items-center justify-between p-3 rounded-2xl bg-primary text-primary-foreground shadow-xl border border-secondary/20">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-secondary tracking-widest mb-0.5">{selectedServices.length} Selected</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold">₹{finalTotalPrice}</span>
              {activeDiscount && <span className="text-xs font-semibold line-through opacity-40">₹{baseTotalPrice}</span>}
            </div>
          </div>

          {/* Bottom promo‑code input - compact */}
          <div className="ml-2 flex flex-col gap-0.5">
            <input
              type="text"
              placeholder="Code"
              value={bottomCouponInput}
              onChange={(e) => setBottomCouponInput(e.target.value)}
              className="w-16 rounded-lg border border-border/40 bg-card/50 px-2 py-1 text-[10px] focus:ring-secondary outline-none"
            />
            <Button
              variant="outline"
              onClick={handleApplyBottomCoupon}
              className="w-16 rounded-lg bg-primary text-primary-foreground text-[10px] hover:bg-primary/90 h-auto px-1 py-0.5"
            >
              Apply
            </Button>
          </div>

          <Button
            onClick={() => navigate('/book')}
            className="rounded-xl bg-secondary text-primary font-bold px-4 py-2 text-sm hover:bg-secondary/90 ml-2"
          >
            Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;