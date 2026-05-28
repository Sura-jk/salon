import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard from '@/components/ServiceCard';
import { Scissors, Sparkles, Palette, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
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

const SERVICES_DATA = {
  hair: {
    label: 'Hair',
    icon: Scissors,
    items: [
      { 
        id: 'h1', 
        name: 'Luxury Hair Sculpt', 
        description: 'Precision cutting and styling tailored to your unique facial structure.', 
        price: '₹850', 
        numericPrice: 850,
        duration: '90 min',
        image: 'https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'h2', 
        name: 'Balayage Artistry', 
        description: 'Hand-painted highlights for a natural, sun-kissed look.', 
        price: '₹2499', 
        numericPrice: 2499,
        duration: '180 min',
        image: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324486?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'h3', 
        name: 'Deep Conditioning', 
        description: 'Intense hydration and repair for damaged hair.', 
        price: '₹599', 
        numericPrice: 599,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'h4', 
        name: "Men's Executive Cut", 
        description: 'Classic grooming with a modern touch and scalp massage.', 
        price: '₹600', 
        numericPrice: 600,
        duration: '45 min',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop'
      },
    ]
  },
  skincare: {
    label: 'Skincare',
    icon: Sparkles,
    items: [
      { 
        id: 's1', 
        name: 'Signature Glow Facial', 
        description: 'A rejuvenating treatment that leaves your skin radiant and refreshed.', 
        price: '₹1299', 
        numericPrice: 1299,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 's2', 
        name: 'Diamond Microdermabrasion', 
        description: 'Deep exfoliation for a smoother, clearer complexion.', 
        price: '₹1599', 
        numericPrice: 1599,
        duration: '75 min',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 's3', 
        name: 'Anti-Aging Ritual', 
        description: 'Targeted treatment to reduce fine lines and wrinkles.', 
        price: '₹1799', 
        numericPrice: 1799,
        duration: '90 min',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 's4', 
        name: 'Hydra-Lift Treatment', 
        description: 'Intense hydration and lifting for a youthful glow.', 
        price: '₹1400', 
        numericPrice: 1400,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop'
      },
    ]
  },
  nails: {
    label: 'Nails',
    icon: Palette,
    items: [
      { 
        id: 'n1', 
        name: 'Royal Manicure', 
        description: 'Complete hand care with a premium polish and relaxing massage.', 
        price: '₹499', 
        numericPrice: 499,
        duration: '45 min',
        image: 'https://images.unsplash.com/photo-1604654771876-22273993930a?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'n2', 
        name: 'Imperial Pedicure', 
        description: 'Luxury foot care with exfoliating scrub and hot stone massage.', 
        price: '₹699', 
        numericPrice: 699,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c9?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'n3', 
        name: 'Gel Extensions', 
        description: 'Durable and elegant nail extensions with custom art styling.', 
        price: '₹899', 
        numericPrice: 899,
        duration: '90 min',
        image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=600&auto=format&fit=crop'
      },
      { 
        id: 'n4', 
        name: 'Nail Art Session', 
        description: 'Custom hand-drawn detailed designs for a bold personal statement.', 
        price: '₹300', 
        numericPrice: 300,
        duration: '30 min',
        image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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

  // Sync tab with URL if it changes externally
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
    <div className="flex flex-col min-h-screen bg-background pb-32 pt-12">
      <div className="max-w-md mx-auto w-full px-6">
        <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-1 block">The Collection</span>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Luxury <br/>Treatments</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-2">Curated by our masters</p>
        </header>

        <div className="flex gap-3 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <Input 
              placeholder="Find your treatment..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-7 rounded-2xl border-border/60 bg-card/40 backdrop-blur-md focus:ring-secondary shadow-sm transition-all text-sm font-medium" 
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-[58px] w-[58px] rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-0 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary-foreground hover:border-secondary transition-all duration-300 shadow-sm"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-2xl p-2 border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl" align="end">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-3 py-2">Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem onClick={() => handleSort('asc')} className="rounded-xl px-3 py-3 text-sm font-medium cursor-pointer focus:bg-secondary/10 focus:text-secondary flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5" /> Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('desc')} className="rounded-xl px-3 py-3 text-sm font-medium cursor-pointer focus:bg-secondary/10 focus:text-secondary flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5" /> Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem onClick={() => { setSortOrder(null); showSuccess("Filters cleared"); }} className="rounded-xl px-3 py-3 text-sm font-medium cursor-pointer text-destructive focus:bg-destructive/10">
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="hair" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="flex w-full bg-muted/40 p-1.5 rounded-2xl mb-12 backdrop-blur-md border border-border/50">
            {Object.entries(SERVICES_DATA).map(([key, value]) => {
              const Icon = value.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="flex-1 rounded-xl transition-all duration-500 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-bold text-[10px] uppercase tracking-widest py-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">{value.label}</span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6 mt-0 focus-visible:ring-0 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="grid grid-cols-1 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((service) => (
                  <div key={service.id} className="group transition-all duration-500 hover:-translate-y-1">
                    <ServiceCard 
                      name={service.name}
                      description={service.description}
                      price={service.price}
                      duration={service.duration}
                      category={currentCategoryData.label}
                      image={service.image}
                      onClick={() => navigate(`/book?service=${service.id}`)}
                    />
                  </div>
                ))
              ) : (
                <div className="py-24 text-center">
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