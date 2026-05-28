import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Plus, Check, Sparkles, Filter, Ticket, ShieldCheck, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ImageWithFallback';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

type CouponDiscount = { code: string; percent: number };

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
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=1000&auto=format&fit=crop',
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
      { id: 'st2', name: 'Marcus Thorne', role: 'Creative Director / Makeup', exp: '5 years', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
      { id: 'st3', name: 'Sophia Chen', role: 'Nail Art Specialist', exp: '10 years', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
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

  // ---------- Promo‑code state (stand‑alone) ----------
  const [promoInput, setPromoInput] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<CouponDiscount | null>(null);

  // ---------- Bottom‑section promo‑code state ----------
  const [bottomCouponInput, setBottomCouponInput] = useState('');

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

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'LUXE20' || code === 'SUMMER20') {
      setActiveDiscount({ code, percent: 20 });
      showSuccess(`Promo code "${code}" applied! 20% discount unlocked.`);
      setPromoInput('');
    } else if (code === 'WELCOME10') {
      setActiveDiscount({ code, percent: 10 });
      showSuccess(`Promo code "${code}" applied! 10% discount unlocked.`);
      setPromoInput('');
    } else {
      showSuccess("Invalid promo code. Try 'LUXE20'!");
    }
  };

  const handleRemoveCoupon = () => {
    if (activeDiscount) {
      showSuccess(`Promo code "${activeDiscount.code}" removed.`);
      setActiveDiscount(null);
    }
  };

  // Bottom‑section handler
  const handleApplyBottomCoupon = () => {
    const code = bottomCouponInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'LUXE20' || code === 'SUMMER20') {
      setActiveDiscount({ code, percent: 20 });
      showSuccess(`Bottom coupon "${code}" applied! 20% discount unlocked.`);
      setBottomCouponInput('');
    } else if (code === 'WELCOME10') {
      setActiveDiscount({ code, percent: 10 });
      showSuccess(`Bottom coupon "${code}" applied! 10% discount unlocked.`);
      setBottomCouponInput('');
    } else {
      showSuccess("Invalid bottom coupon code. Try 'LUXE20'!");
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
      {/* ... existing hero header, content, etc. ... */}

      {/* ---------- Stand‑alone Promo‑Code Section ---------- */}
      <div className="mb-6 p-4 rounded-3xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Ticket className="w-4 h-4 text-secondary" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Promo Code</h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code (e.g. LUXE20)"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="flex-1 rounded-2xl border border-border/40 bg-card/50 px-4 py-2 text-sm focus:ring-secondary outline-none"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            className="rounded-2xl bg-primary text-primary-foreground px-5 py-2 text-sm hover:bg-primary/90"
          >
            Apply          </Button>
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

          {/* NEW: Bottom promo‑code input & button */}
          <div className="mt-2 flex flex-col gap-1">
            <input              type="text"
              placeholder="Enter promo code (e.g. LUXE20)"
              value={bottomCouponInput}
              onChange={(e) => setBottomCouponInput(e.target.value)}
              className="w-full rounded-2xl border border-border/40 bg-card/50 px-4 py-2 text-sm focus:ring-secondary outline-none"
            />
            <Button
              variant="outline"
              onClick={handleApplyBottomCoupon}
              className="w-full rounded-2xl bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetails;