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
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=400&auto=format&fit=crop' 
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
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=crop' 
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
    <div className="flex flex-col min-h-screen bg-background pb-24 overflow-y-auto overflow-x-hidden items-center">
      <div className="w-full max-w-lg md:max-w-2xl px-4 md:px-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl pt-6 pb-2 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-700 border-b border-b-border/10">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-0.5 block">Good Morning, Alex</span>
              <h1 className="text-xl font-serif font-medium text-foreground tracking-tight whitespace-nowrap">Your Beauty Curated.</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-card border border-border/50 shadow-sm hover:border-secondary transition-all"
              onClick={() => showSuccess("No new notifications today.")}
            >
              <Bell className="w-4 h-4 text-foreground" />
            </Button>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <MapPin className="w-3 h-3 text-secondary" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Bandra West, Mumbai</span>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <section className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors z-10 pointer-events-none" />
              <Input 
                type="text"
                placeholder="Find a treatment..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 rounded-2xl border-border/60 bg-card/40 backdrop-blur-md focus:ring-secondary focus-visible:ring-secondary focus-visible:ring-2 focus-visible:ring-offset-0 shadow-sm transition-all text-sm font-medium relative z-0" 
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 z-10"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <Button 
              variant="outline" 
              className={`h-[50px] w-[50px] rounded-2xl border-border/60 p-0 flex items-center justify-center transition-all shadow-sm ${
                showFilters || selectedTag !== 'All' 
                  ? 'bg-secondary text-primary border-secondary font-bold' 
                  : 'bg-card/40 backdrop-blur-md text-secondary hover:border-secondary'
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="flex gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar animate-in slide-in-from-top-2 duration-300">
              {FILTER_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border whitespace-nowrap ${
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

        {/* Artist Spotlight */}
        <section className="py-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-155">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Artists Spotlight</h2>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 thin-scrollbar">
            {MASTER_ARTISTS.map((artist) => (
              <div 
                key={artist.id}
                onClick={() => handleArtistClick(artist.name, artist.role)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center p-[2px] transition-all duration-500 group-hover:scale-105 ${
                  artist.active ? 'bg-gradient-to-tr from-secondary to-secondary/30' : 'bg-border/40'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-foreground leading-tight">{artist.shortName}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Hero Banner */}
        <section className="py-2 animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <div 
            onClick={handleClaimOffer}
            className="relative h-56 rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg border border-transparent"
          >
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
              alt="Summer Glow"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end px-6 pb-6">
              <h3 className="text-white text-2xl font-serif font-medium mb-1 leading-none">
                Summer <span className="italic text-secondary">Aura</span>
              </h3>
              <p className="text-white/70 text-[10px] mb-3 max-w-[180px] leading-relaxed">20% membership discount on signature facials.</p>
              <Button size="sm" className="w-fit rounded-lg bg-white text-primary font-bold px-4 h-8 text-[10px] hover:bg-secondary hover:text-primary transition-all">
                View Offer
              </Button>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="text-lg font-serif font-medium text-foreground leading-tight">Expertise</h2>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/services')}
              className="text-secondary text-[10px] font-black p-0 h-auto hover:bg-transparent uppercase tracking-[0.1em]"
            >
              All Services
            </Button>
          </div>

          <div className="relative w-full">
            <Carousel setApi={setCarouselApi} className="w-full relative">
              <CarouselContent className="-ml-2">
                {CATEGORIES.map((cat) => (
                  <CarouselItem key={cat.id} className="pl-2 basis-[55%] xs:basis-[45%] sm:basis-[33%] md:basis-[28%] flex-shrink-0">
                    <div 
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex items-center gap-2.5 bg-card border border-border/50 hover:border-secondary pl-1.5 pr-3 py-2 rounded-full cursor-pointer transition-all active:scale-[0.96] shadow-sm group h-12 w-full"
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-border/80 flex-shrink-0">
                        <ImageWithFallback src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-foreground group-hover:text-secondary truncate">{cat.label}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <button 
                onClick={() => carouselApi?.scrollPrev()}
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-6 w-6 rounded-full border border-secondary/30 bg-background/85 backdrop-blur-md text-secondary shadow-sm"
              >
                <ChevronLeft className="w-2.5 h-2.5" />
              </button>
              <button 
                onClick={() => carouselApi?.scrollNext()}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-6 w-6 rounded-full border border-secondary/30 bg-background/85 backdrop-blur-md text-secondary shadow-sm"
              >
                <ChevronRight className="w-2.5 h-2.5" />
              </button>
            </Carousel>
          </div>
        </section>

        {/* Nearby Studios */}
        <section className="py-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl font-serif font-medium text-foreground">Nearby Studios</h2>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => { setSelectedTag('All'); setSearchQuery(''); showSuccess("Filters cleared!"); }}
              className="text-secondary text-[10px] font-black p-0 h-auto hover:bg-transparent uppercase tracking-[0.1em]"
            >
              Reset
            </Button>
          </div>

          <div className="space-y-6">
            {filteredSalons.map((salon) => (
              <div 
                key={salon.id}
                onClick={() => navigate(`/salon/${salon.id}`)}
                className="group relative bg-card rounded-[2rem] overflow-hidden border border-border/40 shadow-md cursor-pointer transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback src={salon.image} alt={salon.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 text-secondary fill-secondary" />
                    <span className="text-[10px] font-black text-primary">{salon.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif font-medium text-xl text-foreground group-hover:text-secondary transition-colors">{salon.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-secondary" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{salon.distance}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Starts at</span>
                      <span className="text-sm font-black text-primary">{salon.price}</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground py-5 text-[10px] font-black uppercase tracking-[0.1em] hover:bg-secondary hover:text-primary shadow-md">
                    Reserve Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;