import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ServiceCard from '@/components/ServiceCard';
import { Sparkles, ArrowRight } from 'lucide-react';

const FEATURED_SERVICES = [
  {
    id: 's1',
    name: 'Signature Glow Facial',
    description: 'A rejuvenating treatment that leaves your skin radiant and refreshed.',
    price: '₹1299',
    duration: '60 min',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'h1',
    name: 'Luxury Hair Sculpt',
    description: 'Precision cutting and styling tailored to your unique facial structure.',
    price: '₹850',
    duration: '90 min',
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'n1',
    name: 'Royal Manicure',
    description: 'Complete hand care with a premium polish and relaxing massage.',
    price: '₹499',
    duration: '45 min',
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b0c26670?q=80&w=800&auto=format&fit=crop'
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex flex-col justify-center px-6 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Experience Pure Luxury</span>
          </div>
          
          <h1 className="text-5xl font-serif font-medium text-foreground leading-tight mb-6 text-balance">
            Redefining the Art of <span className="italic text-secondary">Beauty</span>
          </h1>
          
          <p className="text-muted-foreground text-base mb-10 max-w-xs mx-auto leading-relaxed">
            Step into a world of serenity and sophistication. Our master stylists bring your vision to life.
          </p>
          
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button 
              onClick={() => navigate('/book')}
              className="px-8 py-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 text-sm font-medium shadow-xl shadow-primary/20"
            >
              Book Appointment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/services')}
              className="px-8 py-6 rounded-2xl border-border text-foreground hover:bg-muted transition-all text-sm font-medium"
            >
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="px-6 py-16 mb-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-serif font-medium text-foreground mb-2">Featured</h2>
              <p className="text-muted-foreground text-sm">Our most coveted treatments</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/services')}
              className="text-primary text-xs font-bold uppercase tracking-wider p-0 h-auto hover:bg-transparent hover:text-secondary transition-colors"
            >
              View All
            </Button>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {FEATURED_SERVICES.map((service) => (
                <CarouselItem key={service.id} className="basis-full px-0">
                  <div className="px-1">
                    <ServiceCard 
                      {...service} 
                      featured 
                      onClick={() => navigate(`/book?service=${service.id}`)} 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Index;