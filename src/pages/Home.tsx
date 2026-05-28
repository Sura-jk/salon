import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ImageWithFallback from '@/components/ImageWithFallback';
import { showSuccess, showLoading, dismissToast } from '@/utils/toast';

const CATEGORIES = [
  { 
    id: 'hair', 
    label: 'Hair', 
    image: 'https://images.unsplash.com/photo-1562322140-87a27995777a?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'nails', 
    label: 'Nails', 
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'spa', 
    label: 'Spa', 
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'makeup', 
    label: 'Makeup', 
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'facial', 
    label: 'Facial', 
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80' 
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
  },
  {
    id: 'salon2',
    name: 'Velvet Touch Spa',
    rating: 4.7,
    reviews: 85,
    distance: '2.5 km',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'salon3',
    name: 'Golden Glow Parlour',
    rating: 4.8,
    reviews: 210,
    distance: '0.8 km',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
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

  const handleLocationClick = () => {
    showSuccess("Using GPS to search for premium salons near Bandra, Mumbai");
  };

  const handleNotificationsClick = () => {
    showSuccess("No new notifications. You are all set for your next treatment!");
  };

  // High quality luxury glow treatment image for banner
  const heroImage = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Top Header */}
      <header className="px-6 pt-12 pb-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div 
            onClick={handleLocationClick} 
            className="flex items-center gap-2 text-muted-foreground group cursor-pointer hover:text-primary transition-colors"
          >
            <MapPin className="w-4 h-4 text-secondary group-hover:animate-bounce" />
            <span className="text-xs font-semibold tracking-wide">Mumbai, Maharashtra</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNotificationsClick}
            className="rounded-full p-2 bg-card border border-border shadow-sm hover:border-secondary transition-all"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
          <Input 
            placeholder="Search for luxury salons..." 
            className="pl-12 py-7 rounded-2xl border-border bg-card/50 backdrop-blur-sm focus:ring-secondary shadow-inner transition-all" 
          />
        </div>
      </header>

      {/* Hero Banner */}
      <section className="px-6 py-4">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div 
                onClick={handleClaimOffer}
                className="relative h-64 rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl"
              >
                <ImageWithFallback 
                  src={heroImage}
                  alt="Summer Glow"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end px-6 pb-8">
                  <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest mb-3 shadow-lg">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>Exclusive Offer</span>
                  </div>
                  <h3 className="text-white text-3xl font-serif font-medium mb-4 leading-tight">
                    Summer Glow <br />Package <span className="text-secondary italic">20% Off</span>
                  </h3>
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClaimOffer();
                    }}
                    className="w-fit rounded-xl bg-secondary text-primary font-bold px-6 py-3 hover:bg-secondary/90 transition-all shadow-lg"
                  >
                    Claim Now
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      {/* Categories */}
      <section className="px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif font-medium">Categories</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="text-secondary text-xs font-bold p-0 h-auto hover:bg-transparent uppercase tracking-wider"
          >
            View All
          </Button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="flex flex-col items-center gap-3 min-w-fit cursor-pointer group"
              onClick={() => navigate('/services')}
            >
              <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-transparent group-hover:border-secondary transition-all shadow-md group-hover:shadow-secondary/20">
                <ImageWithFallback 
                  src={cat.image} 
                  alt={cat.label} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Salons */}
      <section className="px-6 py-4 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif font-medium">Nearby Salons</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="text-secondary text-xs font-bold p-0 h-auto hover:bg-transparent uppercase tracking-wider"
          >
            See All
          </Button>
        </div>
        <div className="space-y-8">
          {NEARBY_SALONS.map((salon) => (
            <div 
              key={salon.id}
              onClick={() => navigate(`/salon/${salon.id}`)}
              className="group bg-card rounded-[2rem] overflow-hidden border border-border luxury-shadow cursor-pointer transition-all hover:border-secondary hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-52">
                <ImageWithFallback 
                  src={salon.image} 
                  alt={salon.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-border">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[11px] font-bold">{salon.rating}</span>
                </div>
              </div>
              <div className="p-6 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-serif font-medium text-xl text-foreground group-hover:text-secondary transition-colors">
                    {salon.name}
                  </h3>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-secondary" /> {salon.distance}</span>
                    <span className="opacity-30">•</span>
                    <span className="font-bold text-primary">Starts from {salon.price}</span>
                  </div>
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/salon/${salon.id}`);
                  }}
                  className="rounded-2xl bg-primary text-primary-foreground px-5 py-3 text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  Book Now
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