import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const CATEGORIES = [
  { id: 'hair', label: 'Hair', icon: '✂️' },
  { id: 'nails', label: 'Nails', icon: '💅' },
  { id: 'spa', label: 'Spa', icon: '🧖‍♀️' },
  { id: 'makeup', label: 'Makeup', icon: '💄' },
  { id: 'facial', label: 'Facial', icon: '✨' },
];

const NEARBY_SALONS = [
  {
    id: 'salon1',
    name: 'Luxe Aura Studio',
    rating: 4.9,
    reviews: 128,
    distance: '1.2 km',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1560066982-73a8579Bf77a?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'salon2',
    name: 'Velvet Touch Spa',
    rating: 4.7,
    reviewss: 85,
    distance: '2.5 km',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1521566626196-f77d7737307a?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'salon3',
    name: 'Golden Glow Parlour',
    rating: 4.8,
    reviews: 210,
    distance: '0.8 km',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=1000&auto=format&fit=crop',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Top Header */}
      <header className="px-6 pt-8 pb-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-xs font-medium">Mumbai, Maharashtra</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full p-2">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search for salons, services..." 
            className="pl-12 py-6 rounded-2xl border-border bg-card focus:ring-secondary" 
          />
        </div>
      </header>

      {/* Hero Banner */}
      <section className="px-6 py-4">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=1000&auto=format&fit=crop" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt="Offer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6">
                  <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-2">Limited Offer</span>
                  <h3 className="text-white text-2xl font-serif font-medium mb-4">Summer Glow <br />Package - 20% Off</h3>
                  <Button size="sm" className="w-fit rounded-xl bg-secondary text-primary font-bold px-4 py-2">
                    Claim Now
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      {/* Categories */}
      <section className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-medium">Categories</h2>
          <Button variant="ghost" className="text-secondary text-xs font-bold p-0 h-auto">View All</Button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="flex flex-col items-center gap-3 min-w-fit cursor-pointer group"
              onClick={() => {}}
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-2xl transition-all group-hover:bg-secondary group-hover:text-primary group-hover:border-secondary shadow-sm">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Salons */}
      <section className="px-6 py-4 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-medium">Nearby Salons</h2>
          <Button variant="ghost" className="text-secondary text-xs font-bold p-0 h-auto">See All</Button>
        </div>
        <div className="space-y-6">
          {NEARBY_SALONS.map((salon) => (
            <div 
              key={salon.id} 
              onClick={() => navigate(`/salon/${salon.id}`)}
              className="group bg-card rounded-3xl overflow-hidden border border-border luxury-shadow cursor-pointer transition-all hover:border-secondary"
            >
              <div className="relative h-44">
                <img src={salon.image} className="h-full w-full object-cover" alt={salon.name} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold">{salon.rating}</span>
                </div>
              </div>
              <div className="p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-medium text-lg text-foreground group-hover:text-secondary transition-colors">
                    {salon.name}
                  </h3>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {salon.distance}</span>
                    <span>•</span>
                    <span>Starts from {salon.price}</span>
                  </div>
                </div>
                <Button 
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-bold"
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
