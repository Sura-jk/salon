import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard from '@/components/ServiceCard';
import { Scissors, Sparkles, Palette, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SERVICES_DATA = {
  hair: {
    label: 'Hair',
    icon: Scissors,
    items: [
      { id: 'h1', name: 'Luxury Hair Sculpt', description: 'Precision cutting and styling tailored to your unique facial structure.', price: '$85', duration: '90 min' },
      { id: 'h2', name: 'Balayage Artistry', description: 'Hand-painted highlights for a natural, sun-kissed look.', price: '$180', duration: '180 min' },
      { id: 'h3', name: 'Deep Conditioning', description: 'Intense hydration and repair for damaged hair.', price: '$50', duration: '60 min' },
      { id: 'h4', name: 'Men\'s Executive Cut', description: 'Classic grooming with a modern touch.', price: '$60', duration: '45 min' },
    ]
  },
  skincare: {
    label: 'Skincare',
    icon: Sparkles,
    items: [
      { id: 's1', name: 'Signature Glow Facial', description: 'A rejuvenating treatment that leaves your skin radiant and refreshed.', price: '$120', duration: '60 min' },
      { id: 's2', name: 'Diamond Microdermabrasion', description: 'Deep exfoliation for a smoother, clearer complexion.', price: '$150', duration: '75 min' },
      { id: 's3', name: 'Anti-Aging Ritual', description: 'Targeted treatment to reduce fine lines and wrinkles.', price: '$170', duration: '90 min' },
      { id: 's4', name: 'Hydra-Lift Treatment', description: 'Intense hydration and lifting for a youthful glow.', price: '$140', duration: '60 min' },
    ]
  },
  nails: {
    label: 'Nails',
    icon: Palette,
    items: [
      { id: 'n1', name: 'Royal Manicure', description: 'Complete hand care with a premium polish and relaxing massage.', price: '$45', duration: '45 min' },
      { id: 'n2', name: 'Imperial Pedicure', description: 'Luxury foot care with exfoliating scrub and massage.', price: '$65', duration: '60 min' },
      { id: 'n3', name: 'Gel Extensions', description: 'Durable and elegant nail extensions with custom art.', price: '$80', duration: '90 min' },
      { id: 'n4', name: 'Nail Art Session', description: 'Custom detailed designs for a bold statement.', price: '$30', duration: '30 min' },
    ]
  }
};

const Services = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hair');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = SERVICES_DATA[activeTab as keyof typeof SERVICES_DATA].items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-12">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-medium text-foreground mb-3 tracking-tight">Our Services</h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">Curated treatments for the modern individual</p>
        </div>

        <div className="relative mb-8 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
          <Input 
            placeholder="Search treatments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 rounded-2xl border-border bg-card/50 backdrop-blur-sm focus:ring-secondary shadow-sm transition-all" 
          />
        </div>

        <Tabs defaultValue="hair" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full bg-muted/40 p-1.5 rounded-2xl mb-10 backdrop-blur-sm border border-border/50">
            {Object.entries(SERVICES_DATA).map(([key, value]) => {
              const Icon = value.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="rounded-xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-xs uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{value.label}</span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-5 mt-0 focus-visible:ring-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-5">
              {filteredItems.length > 0 ? (
                filteredItems.map((service) => (
                  <ServiceCard 
                    key={service.id}
                    name={service.name}
                    description={service.description}
                    price={service.price}
                    duration={service.duration}
                    category={SERVICES_DATA[activeTab as keyof typeof SERVICES_DATA].label}
                    onClick={() => navigate(`/book?service=${service.id}`)}
                  />
                ))
              ) : (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground italic">No luxury treatments found matching your search.</p>
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