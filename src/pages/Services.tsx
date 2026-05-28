import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import { 
  Scissors, Sparkles, Palette, Search, SlidersHorizontal, 
  ArrowUpDown, Wand2, Flower2, ChevronLeft, Clock, Info, Check, CornerDownRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import ImageWithFallback from '@/components/ImageWithFallback';

// Rich extra details for each premium service
const SERVICE_RICH_DETAILS: Record<string, {
  benefits: string[];
  skinHairType: string;
  experienceLevel: string;
  aftercare: string;
}> = {
  'hair_1': {
    benefits: ['Precision volumetric structural tailoring', 'Includes deluxe scalp massage', 'Finish with premium Oribe holding spray'],
    skinHairType: 'Suitable for all hair structures and lengths',
    experienceLevel: 'Performed exclusively by our Master Stylists',
    aftercare: 'Avoid washing for 24 hours to preserve structural volume'
  },
  'hair_2': {
    benefits: ['Bespoke free-hand coloring tailored to facial light-zones', 'Includes ultra-nourishing plex-bonding glaze', 'Zero harsh foil borders'],
    skinHairType: 'Best for natural blonde, brown, or darker tresses',
    experienceLevel: 'Curated by our resident Color Artistry Directors',
    aftercare: 'Wash with sulfate-free color-safe ritual only'
  },
  'hair_3': {
    benefits: ['100% formaldehyde-free premium liquid silk formula', 'Seals cuticle layer to block environmental humidity', 'Lasts up to 16-20 weeks'],
    skinHairType: 'Ideal for unruly, coarse, frizzy, or damaged hair',
    experienceLevel: 'Conducted by certified Keratin restoration experts',
    aftercare: 'Utilize flat-iron safe heat protection during styling'
  },
  'skin_1': {
    benefits: ['Hyperbaric pure oxygen serum infusion', 'Deep cellular hydration booster', 'Instant plumpness and glass-skin glow'],
    skinHairType: 'All skin types, especially dehydrated or fatigued skin',
    experienceLevel: 'Delivered by Senior Medical Estheticians',
    aftercare: 'Apply broad-spectrum SPF 50 daily'
  },
  'skin_2': {
    benefits: ['Micro-diamond dust resurfacing therapy', 'Eradicates dead superficial epidermis layers', 'Reduces appearance of pores and fine lines'],
    skinHairType: 'Uneven tone, hyperpigmented, or dull skin',
    experienceLevel: 'Conducted by certified Dermabrasion specialists',
    aftercare: 'Avoid direct heat, active retinols or acids for 3 days'
  },
  'nail_1': {
    benefits: ['Aromatic milk soak and sea salt exfoliation', 'Precision dry cuticle restructuring manicure', 'Non-toxic high-shine gel finish'],
    skinHairType: 'Suitable for all hands and nail profiles',
    experienceLevel: 'Sculpted by Elite Creative Nail Artisans',
    aftercare: 'Apply nourishing cuticle oil twice daily'
  },
  'nail_2': {
    benefits: ['Detoxifying pink Himalayan clay foot soak', 'Extensive hot stone lower leg massage', 'Callus removal treatment'],
    skinHairType: 'Tired, calloused, or weary feet',
    experienceLevel: 'Performed by Spa Wellness Therapists',
    aftercare: 'Wear open-toed footwear immediately post-service'
  },
  'makeup_1': {
    benefits: ['Custom high-definition airbrush base application', 'Bespoke eye contouring and premium lash placement', '24-hour humidity locks'],
    skinHairType: 'Custom tailored to match your specific skin undertones',
    experienceLevel: 'Styled by celebrity-preferred red carpet artists',
    aftercare: 'Remove gently using an oil-based luxury cleanser'
  },
  'makeup_2': {
    benefits: ['Includes pre-wedding virtual and physical trial consultations', 'Waterproof luxury photo-ready finishes', 'Full collarbone glow treatment'],
    skinHairType: 'Bespoke matching for timeless bridal aesthetics',
    experienceLevel: 'Exclusively styled by Bridal Directors',
    aftercare: 'Blot gently throughout your special event'
  },
  'spa_1': {
    benefits: ['Targeted myofascial release on high-tension muscle zones', 'Infused with customized luxury warm essential oils', 'Includes sound-therapy alignment'],
    skinHairType: 'Ideal for athletes, high-stress profiles, or chronic knots',
    experienceLevel: 'Conducted by licensed physical wellness therapists',
    aftercare: 'Drink plenty of pure alkalized water post-treatment'
  },
  'spa_2': {
    benefits: ['Slow, rhythmic Swedish strokes for sensory calming', 'Choice of organic French lavender or sandalwood oil', 'Warm herbal steam finish'],
    skinHairType: 'Perfect for anxiety, fatigue, or general relaxation needs',
    experienceLevel: 'Delivered by certified Zen masseuses',
    aftercare: 'Allow luxury natural oils to sink into skin overnight'
  }
};

const SERVICES_DATA = {
  hair: {
    label: 'Hair',
    icon: Scissors,
    items: [
      { 
        id: 'hair_1', 
        name: 'Signature Hair Sculpt', 
        description: 'Precision cutting and styling tailored to your unique facial structure.', 
        price: '₹850', 
        numericPrice: 850,
        duration: '90 min',
        image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'hair_2', 
        name: 'Artisan Balayage', 
        description: 'Hand-painted highlights for a natural, sun-kissed look.', 
        price: '₹2499', 
        numericPrice: 2499,
        duration: '180 min',
        image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'hair_3', 
        name: 'Keratin Infusion', 
        description: 'Deep repair and smoothing treatment for silk-like texture.', 
        price: '₹1800', 
        numericPrice: 1800,
        duration: '120 min',
        image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=600&auto=format&fit=crop'
      },
    ]
  },
  skincare: {
    label: 'Skincare',
    icon: Sparkles,
    items: [
      { 
        id: 'skin_1', 
        name: 'Cellular Glow Facial', 
        description: 'Oxygenating treatment that revives dull skin and boosts radiance.', 
        price: '₹1299', 
        numericPrice: 1299,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'skin_2', 
        name: 'Diamond Polishing', 
        description: 'Non-invasive resurfacing for velvet-smooth complexion.', 
        price: '₹1599', 
        numericPrice: 1599,
        duration: '75 min',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop'
      },
    ]
  },
  nails: {
    label: 'Nails',
    icon: Palette,
    items: [
      { 
        id: 'nail_1', 
        name: 'Luxe Manicure', 
        description: 'Exfoliation, cuticle care, and premium gel polish finish.', 
        price: '₹499', 
        numericPrice: 499,
        duration: '45 min',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'nail_2', 
        name: 'Spa Pedicure', 
        description: 'Detoxifying soak followed by a tension-releasing foot massage.', 
        price: '₹699', 
        numericPrice: 699,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600&auto=format&fit=crop'
      },
    ]
  },
  makeup: {
    label: 'Makeup',
    icon: Wand2,
    items: [
      { 
        id: 'makeup_1', 
        name: 'Elite Glamour Look', 
        description: 'Sophisticated full-face makeup for red-carpet-ready events.', 
        price: '₹2999', 
        numericPrice: 2999,
        duration: '90 min',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'makeup_2', 
        name: 'Bridal Artistry', 
        description: 'Timeless and durable beauty curation for your special day.', 
        price: '₹5500', 
        numericPrice: 5500,
        duration: '150 min',
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop'
      },
    ]
  },
  spa: {
    label: 'Spa',
    icon: Flower2,
    items: [
      { 
        id: 'spa_1', 
        name: 'Deep Tissue Relief', 
        description: 'Intense massage to release muscle knots and chronic tension.', 
        price: '₹1899', 
        numericPrice: 1899,
        duration: '90 min',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'spa_2', 
        name: 'Aroma Zen Therapy', 
        description: 'Calming Swedish massage with organic essential oils.', 
        price: '₹1499', 
        numericPrice: 1499,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop'
      },
    ]
  }
};

type ServiceItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  numericPrice: number;
  duration: string;
  image: string;
};

const Services = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeTab, setActiveTab] = useState(categoryParam && SERVICES_DATA[categoryParam as keyof typeof SERVICES_DATA] ? categoryParam : 'hair');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // Selected treatment for premium detail popup modal
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (categoryParam && SERVICES_DATA[categoryParam as keyof typeof SERVICES_DATA]) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ category: value });
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    showSuccess(`Sorted by Price: ${order === 'asc' ? 'Low to High' : 'High to Low'}`);
  };

  const currentCategoryData = SERVICES_DATA[activeTab as keyof typeof SERVICES_DATA];
  
  let filteredItems = currentCategoryData.items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortOrder) {
    filteredItems = [...filteredItems].sort((a, b) => {
      return sortOrder === 'asc' ? a.numericPrice - b.numericPrice : b.numericPrice - a.numericPrice;
    });
  }

  // Generate luxury mock fallbacks if specific rich details aren't mapped
  const getRichDetails = (id: string) => {
    return SERVICE_RICH_DETAILS[id] || {
      benefits: ['Premium quality organic components', 'Aromatic essential oils sensory treatment', 'Tailored to personal comfort levels'],
      skinHairType: 'Suitable for all aesthetic profiles',
      experienceLevel: 'Delivered by certified LuxeSalon Professionals',
      aftercare: 'Follow normal custom treatment guidelines'
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      {/* Top Navigation Bar with Search */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/10 px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="h-10 w-10 rounded-full hover:bg-muted"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <Input 
              placeholder="Search treatments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-2xl border-border/40 bg-card/50 focus:ring-secondary text-sm font-medium" 
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-11 w-11 rounded-2xl border-border/40 bg-card/50 p-0 flex items-center justify-center text-secondary shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-2xl p-2 border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl" align="end">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-3 py-2">Sort By Price</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem onClick={() => handleSort('asc')} className="rounded-xl px-3 py-3 text-sm font-medium cursor-pointer focus:bg-secondary/10 focus:text-secondary flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5" /> Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('desc')} className="rounded-xl px-3 py-3 text-sm font-medium cursor-pointer focus:bg-secondary/10 focus:text-secondary flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5" /> High to Low
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem onClick={() => { setSortOrder(null); showSuccess("Filters cleared"); }} className="rounded-xl px-3 py-3 text-sm font-medium cursor-pointer text-destructive focus:bg-destructive/10">
                Reset Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full px-6 pt-8">
        <header className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-1 block">Luxury Selection</span>
          <h1 className="text-3xl font-serif font-medium text-foreground tracking-tight">The Treatment Gallery</h1>
        </header>

        {/* Custom Premium Horizontal Pill Navigation - Transformed into scrollable container with thin-scrollbar */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 pt-1 thin-scrollbar scroll-smooth -mx-6 px-6 mb-8">
          {Object.entries(SERVICES_DATA).map(([key, value]) => {
            const isActive = activeTab === key;
            const Icon = value.icon;
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 border whitespace-nowrap active:scale-95 flex-shrink-0",
                  isActive 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10" 
                    : "bg-card text-muted-foreground border-border/60 hover:border-secondary/40"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-secondary" : "text-muted-foreground")} />
                <span>{value.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredItems.length > 0 ? (
            filteredItems.map((service) => (
              <ServiceCard 
                key={service.id}
                name={service.name}
                description={service.description}
                price={service.price}
                duration={service.duration}
                category={currentCategoryData.label}
                image={service.image}
                onClick={() => setSelectedDetailService(service)}
              />
            ))
          ) : (
            <div className="py-20 text-center">
              <Sparkles className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground font-serif italic text-sm">No treatments match your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Deluxe Treatment Details Modal */}
      <Dialog open={selectedDetailService !== null} onOpenChange={(open) => { if (!open) setSelectedDetailService(null); }}>
        <DialogContent className="max-w-md w-[92%] rounded-3xl p-0 overflow-hidden border-border bg-background shadow-2xl">
          {selectedDetailService && (
            <div className="flex flex-col">
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <ImageWithFallback 
                  src={selectedDetailService.image} 
                  alt={selectedDetailService.name} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-secondary text-primary-foreground font-extrabold uppercase text-[9px] tracking-widest px-3 py-1 rounded-full border-none">
                  {currentCategoryData.label}
                </Badge>
              </div>

              {/* Title & Stats */}
              <div className="px-6 pt-5 pb-4 border-b border-border/40">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif font-medium text-foreground tracking-tight leading-tight">
                    {selectedDetailService.name}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {selectedDetailService.description}
                </p>

                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    <span>{selectedDetailService.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-base font-black text-secondary">
                    <span>{selectedDetailService.price}</span>
                  </div>
                </div>
              </div>

              {/* Rich Narrative / Benefits */}
              <div className="px-6 py-5 space-y-4 max-h-[220px] overflow-y-auto thin-scrollbar">
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/80 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" /> Highlights & Benefits
                  </h4>
                  <ul className="space-y-2">
                    {getRichDetails(selectedDetailService.id).benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                        <Check className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <div className="flex gap-2 text-xs">
                    <CornerDownRight className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-muted-foreground">Best For</span>
                      <span className="text-foreground/90">{getRichDetails(selectedDetailService.id).skinHairType}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <CornerDownRight className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-muted-foreground">Expert Care</span>
                      <span className="text-foreground/90">{getRichDetails(selectedDetailService.id).experienceLevel}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <CornerDownRight className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-muted-foreground">Recommended Aftercare</span>
                      <span className="text-foreground/90 italic">{getRichDetails(selectedDetailService.id).aftercare}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Trigger CTA */}
              <div className="p-4 bg-muted/30 border-t border-border/40 flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedDetailService(null)}
                  className="flex-1 py-6 rounded-2xl border-border font-bold text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    const id = selectedDetailService.id;
                    setSelectedDetailService(null);
                    navigate(`/book?service=${id}`);
                  }}
                  className="flex-[2] py-6 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/25 hover:bg-primary/95"
                >
                  Reserve Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;