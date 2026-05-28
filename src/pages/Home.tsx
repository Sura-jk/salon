import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Star, Sparkles, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import ImageWithFallback from '@/components/ImageWithFallback';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const MASTER_ARTISTS = [
  { 
    id: 'st1', 
    name: 'Elena Rose', 
    shortName: 'Elena', 
    role: 'Hair Master', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    active: true 
  },
  { 
    id: 'st2', 
    name: 'Marcus Thorne', 
    shortName: 'Marcus', 
    role: 'Color Expert', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    active: true 
  },
  { 
    id: 'st3', 
    name: 'Sophia Chen', 
    shortName: 'Sophia', 
    role: 'Skin Specialist', 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    active: false 
  },
  { 
    id: 'st4', 
    name: 'Chloe Dubois', 
    shortName: 'Chloe', 
    role: 'Nail Artist', 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop',
    active: true 
  },
  { 
    id: 'st5', 
    name: 'Devon Miller', 
    shortName: 'Devon', 
    role: 'Elite Barber', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    active: false 
  },
];

const CATEGORIES = [
  { 
    id: 'hair', 
    label: 'Hair Artistry', 
    description: 'Sculpt & Style',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=300&auto=format&fit=crop' 
  },
  { 
    id: 'nails', 
    label: 'Royal Nails', 
    description: 'Manicures & Art',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=300&auto=format&fit=crop' 
  },
  { 
    id: 'skincare', 
    label: 'Skincare', 
    description: 'Stone Rituals',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: 'makeup', 
    label: 'Elite Makeup', 
    description: 'Designer Look',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: 'facial', 
    label: 'Glow Facials', 
    description: 'Skin Therapy',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=200&auto=format&fit=crop' 
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

const FILTER_TAGS = ['All', 'Luxury', 'Top Rated', 'Relaxing', 'Premium', 'Budget', 'Quick'];

const Home = () => {
  const navigate = useNavigate();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTag, setSelectedTag] = useState('All');

  const handleClaimOffer = () => {
    const toastId = showLoading("Activating Summer promo discount...");
    setTimeout(() => {
      dismissToast(toastId);
      showSuccess("20% Summer promo activated successfully!");
      navigate('/salon/salon1');
    }, 1200);
  };

  const handleArtistClick = (artistName: string, role: string) => {
    showSuccess(`Viewing ${artistName} (${role})'s luxury portfolio at Luxe Aura Studio`);
    navigate('/salon/salon1');
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/services?category=${categoryId}`);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    if (tag !== 'All') {
      showSuccess(`Filter applied: ${tag}`);
    }
  };

  // Filter Nearby Salons dynamically by search input and tags
  const filteredSalons = NEARBY_SALONS.filter((salon) => {
    const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || salon.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 overflow-y-auto overflow-x-hidden">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl px-6 pt-10 pb-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-700 border-b border-border/10">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-1 block">Good Morning, Alex</span>
            <h1 className="text-2xl font-serif font-medium text-foreground tracking-tight whitespace-nowrap">Your Beauty Curated.</h1>
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors z-10 pointer-events-none" />
            <Input 
              type="text"
              placeholder="Find a treatment..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-7 rounded-2xl border-border/60 bg-card/40 backdrop-blur-md focus:ring-secondary focus-visible:ring-secondary focus-visible:ring-2 focus-visible:ring-offset-0 shadow-sm transition-all text-sm font-medium relative z-0" 
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button 
            variant="outline" 
            className={`h-[58px] w-[58px] rounded-2xl border-border/60 p-0 flex items-center justify-center transition-all shadow-sm ${
              showFilters || selectedTag !== 'All' 
                ? 'bg-secondary text-primary border-secondary font-bold' 
                : 'bg-card/40 backdrop-blur-md text-secondary hover:border-secondary'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Premium Filter Tags Drawer/Slider */}
        {showFilters && (
          <div className="flex gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar animate-in slide-in-from-top-2 duration-300">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedTag === tag 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border-border/60 text-muted-foreground hover:border-secondary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Circle Previews (Master Artists Stories UI with Thin Scrollbar Only) */}
      <section className="px-6 py-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-155">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-secondary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Master Artists Spotlight</h2>
        </div>
        
        <div className="relative">
          <div 
            className="flex gap-5 overflow-x-auto pb-3 thin-scrollbar scroll-smooth"
          >
            {MASTER_ARTISTS.map((artist) => (
              <div 
                key={artist.id}
                onClick={() => handleArtistClick(artist.name, artist.role)}
                className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
              >
                <div className="relative">
                  {/* Gold glowing ring for active state */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center p-[3px] transition-all duration-500 group-hover:scale-105 ${
                    artist.active 
                      ? 'bg-gradient-to-tr from-secondary via-secondary/70 to-secondary/30 animate-pulse-slow' 
                      : 'bg-border/60'
                  }`}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-background bg-muted">
                      <img 
                        src={artist.image} 
                        alt={artist.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {artist.active && (
                    <span className="absolute bottom-0 right-1 w-4.5 h-4.5 rounded-full bg-secondary text-[8px] text-primary-foreground font-black flex items-center justify-center border-2 border-background shadow">
                      ★
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-bold text-foreground block group-hover:text-secondary transition-colors leading-tight">
                    {artist.shortName}
                  </span>
                  <span className="text-[8px] text-muted-foreground font-semibold uppercase tracking-tight block">
                    {artist.role.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="px-6 py-4 animate-in fade-in zoom-in-95 duration-1000 delay-200">
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

      {/* Expertise Categories Selection Slider */}
      <section className="px-6 py-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-serif font-medium text-foreground leading-tight">Expertise</h2>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">Select your service style</p>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="text-secondary text-[10px] font-black p-0 h-auto hover:bg-transparent uppercase tracking-[0.2em] transition-colors hover:text-primary"
          >
            All Services
          </Button>
        </div>

        <div className="relative w-full">
          <Carousel setApi={setCarouselApi} className="w-full relative px-2">
            <CarouselContent className="-ml-2">
              {CATEGORIES.map((cat) => (
                <CarouselItem key={cat.id} className="pl-2 basis-[52%] xs:basis-[45%] flex-shrink-0">
                  <div 
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex items-center gap-3 bg-card border border-border/50 hover:border-secondary pl-2 pr-4 py-2.5 rounded-full cursor-pointer transition-all active:scale-[0.96] shadow-sm hover:shadow-md group h-16"
                  >
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-border/80 flex-shrink-0">
                      <ImageWithFallback 
                        src={cat.image} 
                        alt={cat.label} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-bold text-foreground group-hover:text-secondary transition-colors leading-tight truncate">
                        {cat.label}
                      </span>
                      <span className="text-[8px] text-muted-foreground font-semibold uppercase tracking-tight block truncate text-balance">
                        {cat.description}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <button 
              onClick={() => carouselApi?.scrollPrev()}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-8 w-8 rounded-full border border-secondary/30 bg-background/85 backdrop-blur-md text-secondary hover:bg-secondary hover:text-primary-foreground active:scale-90 transition-all duration-300 shadow-md"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-3 h-3 stroke-[2]" />
            </button>
            <button 
              onClick={() => carouselApi?.scrollNext()}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-8 w-8 rounded-full border border-secondary/30 bg-background/85 backdrop-blur-md text-secondary hover:bg-secondary hover:text-primary-foreground active:scale-90 transition-all duration-300 shadow-md"
              aria-label="Next category"
            >
              <ChevronRight className="w-3 h-3 stroke-[2]" />
            </button>
          </Carousel>
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
            onClick={() => {
              setSelectedTag('All');
              setSearchQuery('');
              showSuccess("Filters cleared! Showing all nearby studios.");
            }}
            className="text-secondary text-[10px] font-black p-0 h-auto hover:bg-transparent uppercase tracking-[0.2em]"
          >
            Clear Filter
          </Button>
        </div>

        <div className="space-y-12">
          {filteredSalons.length > 0 ? (
            filteredSalons.map((salon) => (
              <div 
                key={salon.id}
                onClick={() => navigate(`/salon/${salon.id}`)}
                className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-border/40 luxury-shadow cursor-pointer transition-all hover:border-secondary/40 hover:-translate-y-2"
              >
                <div className="relative h-60 overflow-hidden rounded-t-[2.5rem]">
                  <ImageWithFallback 
                    src={salon.image} 
                    alt={salon.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-t-[2.5rem]" 
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-xl border border-white/20">
                    <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
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
            ))
          ) : (
            <div className="py-16 text-center bg-card border border-dashed border-border rounded-3xl p-8">
              <Sparkles className="w-8 h-8 text-secondary/40 mx-auto mb-3 animate-pulse" />
              <p className="text-muted-foreground text-sm font-medium">No nearby studios found matching current filters.</p>
              <button 
                onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-bold text-secondary uppercase tracking-widest hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;