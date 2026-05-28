import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceCard from '@/components/ServiceCard';
import { Scissors, Sparkles, Palette } from 'lucide-react';

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

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-medium text-foreground mb-2">Our Services</h1>
          <p className="text-muted-foreground text-sm">Curated treatments for the modern individual</p>
        </div>

        <Tabs defaultValue="hair" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full bg-muted/50 p-1 rounded-2xl mb-8">
            {Object.entries(SERVICES_DATA).map(([key, value]) => {
              const Icon = value.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="rounded-xl transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{value.label}</span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(SERVICES_DATA).map(([key, value]) => (
            <TabsContent key={key} value={key} className="space-y-4 mt-0">
              <div className="grid grid-cols-1 gap-4">
                {value.items.map((service) => (
                  <ServiceCard 
                    key={service.id}
                    name={service.name}
                    description={service.description}
                    price={service.price}
                    duration={service.duration}
                    category={value.label}
                    onClick={() => navigate(`/book?service=${service.id}`)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
