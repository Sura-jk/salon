import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard from '@/components/ServiceCard';
import { Scissors, Sparkles, Palette, Search, SlidersHorizontal, ArrowUpDown, Wand2, Flower2, ChevronLeft } from 'lucide-react';
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
import { showSuccess } from '@/utils/toast';
import ImageWithFallback from '@/components/ImageWithFallback';

const SERVICES_DATA = {
  hair: {
    label: 'Hair',
    icon: Scissors,
    heroImage: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=1200&auto=format&fit=crop',
    items: [
      { 
        id: 'hair_1', 
        name: 'Signature Hair Sculpt', 
        description: 'Precision cutting and styling tailored to your unique facial structure.', 
        price: '₹850', 
        numericPrice: 850,
        duration: '90 min',
        image: 'https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'hair_2', 
        name: 'Artisan Balayage', 
        description: 'Hand-painted highlights for a natural, sun-kissed look.', 
        price: '₹2499', 
        numericPrice: 2499,
        duration: '180 min',
        image: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324486?q=80&w=600&auto=format&fit=crop'
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
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop',
    items: [
      { 
        id: 'nail_1', 
        name: 'Luxe Manicure', 
        description: 'Exfoliation, cuticle care, and premium gel polish finish.', 
        price: '₹499', 
        numericPrice: 499,
        duration: '45 min',
        image: 'https://images.unsplash.com/photo-1604654771876-22273993930a?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'nail_2', 
        name: 'Spa Pedicure', 
        description: 'Detoxifying soak followed by a tension-releasing foot massage.', 
        price: '₹699', 
        numericPrice: 699,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c9?q=80&w=600&auto=format&fit=crop'
      },
    ]
  },
  makeup: {
    label: 'Makeup',
    icon: Wand2,
    heroImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
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
    heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
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

const Services = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeTab, setActiveTab] = useState(categoryParam && SERVICES_DATA[categoryParam as keyof typeof SERVICES_DATA] ? categoryParam : 'hair');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

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
        <header className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-1 block">Luxury Selection</span>
          <h1 className="text-3xl font-serif font-medium text-foreground tracking-tight">The Treatment Gallery</h1>
        </header>

        <Tabs defaultValue="hair" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="flex w-full bg-muted/40 p-1.5 rounded-2xl mb-8 backdrop-blur-md border border-border/50 overflow-x-auto no-scrollbar justify-start sm:justify-between">
            {Object.entries(SERVICES_DATA).map(([key, value]) => {
              const Icon = value.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="flex-shrink-0 sm:flex-1 rounded-xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl font-bold text-[10px] uppercase tracking-widest py-3 px-6"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{value.label}</span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-8 mt-0 focus-visible:ring-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Category Banner Image */}
            <div className="relative h-44 w-full rounded-3xl overflow-hidden shadow-xl">
              <ImageWithFallback 
                src={currentCategoryData.heroImage} 
                alt={currentCategoryData.label} 
                className="h-full w-full object-cover transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white text-xl font-serif font-medium">{currentCategoryData.label} Collection</h2>
                <p className="text-white/80 text-[10px] uppercase font-bold tracking-widest mt-1">Professional Care & Artistry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
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
                    onClick={() => navigate(`/book?service=${service.id}`)}
                  />
                ))
              ) : (
                <div className="py-20 text-center">
                  <Sparkles className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-muted-foreground font-serif italic text-sm">No treatments match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;