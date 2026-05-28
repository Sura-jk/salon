import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Star, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ImageWithFallback from '@/components/ImageWithFallback';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const CATEGORIES = [
  { 
    id: 'hair', 
    label: 'Hair', 
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'nails', 
    label: 'Nails', 
    image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'spa', 
    label: 'Spa', 
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'makeup', 
    label: 'Makeup', 
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'facial', 
    label: 'Facial', 
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=400&auto=format&fit=crop' 
  },
];

const NEARBY_SALONS = [
  {
    id: 'salon1',
    name: 'Luxe Aura Studio',
    rating: 4.9,
    reviews: 128,
    distance: '1.2 km',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    tags: ['Luxury', 'Top Rated']
  },
  {
    id: 'salon2',
    name: 'Velvet Touch Spa',
    rating: 4.7,
    reviews: 85,
    distance: '2.5 km',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
    tags: ['Relaxing', 'Premium']
  },
  {
    id: 'salon3',
    name: 'Golden Glow Parlour',
    rating: 4.8,
    reviews: 210,
    distance: '0.8 km',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    tags: ['Budget', 'Quick']
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClaimOffer = () => {
    const toastId = showLoading("Activating Summer promo discount...");
    setTimeout(() => {
      dismissToast(toastId);
      showSuccess("20% Summer promo activated successfully!");
      navigate('/salon/salon1');
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 overflow-y-auto overflow-x-hidden">
      {/* Top Header */}
      <header className="px-6 pt-10 pb-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-1 block">Good Morning, Alex</span>
            <h1 className="text-3xl font-serif font-medium text-foreground tracking-tight">Your Beauty <br/>Curated.</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-12 w-12 bg-card border border-border/50 shadow-sm hover:border-secondary transition-all"
            onClick={() => showSuccess("No new notifications today.")}
          >
            <Bell className="w-5 h-5 text-foreground" />
          </Button>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground/60">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          <span className="text-[11px] font-bold tracking-wider uppercase">Bandra West, Mumbai</span>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <section className="px-6 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <Input 
              placeholder="Find a treatment..." 
              className="pl-12 py-7 rounded-2xl border-border/60 bg-card/40 backdrop-blur-md focus:ring-secondary shadow-sm transition-all text-sm font-medium" 
            />
          </div>
          <Button variant="outline" className="h-[58px] w-[58px] rounded-2xl border-border/60 bg-card/40 backdrop-blur-md p-0 flex items-center justify-center hover:border-secondary transition-all">
            <SlidersHorizontal className="w-5 h-5 text-secondary" />
          </Button>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="px-6 py-6 animate-in fade-in zoom-in-95 duration-1000 delay-200">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div 
                onClick={handleClaimOffer}
                className="relative h-72 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl luxury-shadow border border-transparent"
              >
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
                  alt="Summer Glow"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end px-8 pb-10">
                  <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-secondary text-primary text-[9px] font-bold uppercase tracking-widest mb-4">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>Exclusive Privilege</span>
                  </div>
                  <h3 className="text-white text-4xl font-serif font-medium mb-2 leading-none">
                    Summer <span className="italic text-secondary">Aura</span>
                  </h3>
                  <p className="text-white/70 text-xs mb-6 max-w-[200px] leading-relaxed">Redeem your 20% membership discount on all signature facials.</p>
                  <Button 
                    size="sm" 
                    className="w-fit rounded-xl bg-white text-primary font-bold px-8 py-4 hover:bg-secondary hover:text-primary transition-all shadow-xl"
                  >
                    View Offer
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      {/* Categories */}
      <section className="px-6 py-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-foreground leading-tight">Expertise</h2>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">Refined Categories</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="text-secondary text-[10px] font-black p-0 h-auto hover:bg-transparent uppercase tracking-[0.2em]"
          >
            All Services
          </Button>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="flex flex-col items-center gap-4 min-w-[85px] cursor-pointer group"
              onClick={() => navigate('/services')}
            >
              <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-2 border-transparent group-hover:border-secondary transition-all shadow-lg group-hover:shadow-secondary/20 p-1">
                <ImageWithFallback 
                  src={cat.image} 
                  alt={cat.label} 
                  className="w-full h-full object-cover rounded-[1.75rem] group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-[0.15em]">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Salons */}
      <section className="px-6 py-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-serif font-medium text-foreground">Nearby Studios</h2>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">Curated for your location</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="text-secondary text-[10px] font-black p-0 h-auto hover:bg-transparent uppercase tracking-[0.2em]"
          >
            See Map
          </Button>
        </div>

        <div className="space-y-12">
          {NEARBY_SALONS.map((salon) => (
            <div 
              key={salon.id}
              onClick={() => navigate(`/salon/${salon.id}`)}
              className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-border/40 luxury-shadow cursor-pointer transition-all hover:border-secondary/40 hover:-translate-y-2"
            >
              <div className="relative h-60">
                <ImageWithFallback 
                  src={salon.image} 
                  alt={salon.name}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-xl border border-white/20">
                  <Star className="w-3 h-3 text-secondary fill-secondary" />
                  <span className="text-[11px] font-black text-primary">{salon.rating}</span>
                </div>
                
                <div className="absolute top-6 left-6 flex gap-2">
                  {salon.tags.map(tag => (
                    <span key={tag} className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif font-medium text-2xl text-foreground group-hover:text-secondary transition-colors leading-tight">
                      {salon.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-3 h-3 text-secondary" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{salon.distance} from you</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Starting at</span>
                    <span className="text-lg font-black text-primary">{salon.price}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full rounded-2xl bg-primary text-primary-foreground py-7 text-xs font-black uppercase tracking-[0.15em] hover:bg-secondary hover:text-primary transition-all active:scale-95 shadow-xl"
                >
                  Reserve Session
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;