import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ImageWithFallback from './ImageWithFallback';

interface ServiceCardProps {
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  onClick?: () => void;
  featured?: boolean;
  image?: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
  'Hair': 'https://images.unsplash.com/photo-1562322140-87a27995777a?q=80&w=400&auto=format&fit=crop',
  'Skincare': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=400&auto=format&fit=crop',
  'Nails': 'https://images.unsplash.com/photo-1604654771876-22273993930a?q=80&w=400&auto=format&fit=crop',
  'Spa': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=400&auto=format&fit=crop',
  'Facial': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=400&auto=format&fit=crop',
  'Skin': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop',
};

const ServiceCard = ({ 
  name, 
  description, 
  price, 
  duration, 
  category, 
  onClick, 
  featured,
  image
}: ServiceCardProps) => {
  // Get the mapped premium image for this category, or fall back to general hair photography
  const cardImage = image || CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Hair'];

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-border/50 flex flex-row items-stretch min-h-[140px]",
        featured ? "border-secondary ring-1 ring-secondary" : ""
      )}
    >
      {/* Visual Image Section */}
      <div className="relative w-28 sm:w-36 flex-shrink-0 overflow-hidden">
        <ImageWithFallback 
          src={cardImage} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/10 pointer-events-none" />
      </div>

      {/* Details Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
              {category}
            </span>
            <span className="text-sm font-bold text-primary">
              {price}
            </span>
          </div>
          
          <h3 className="text-base font-serif font-medium text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClick}
            className="p-0 h-auto text-primary hover:bg-transparent hover:text-secondary transition-colors group/btn"
          >
            <span className="text-[10px] font-bold uppercase tracking-tight mr-1">Book</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;