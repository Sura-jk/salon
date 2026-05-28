import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  onClick?: () => void;
  featured?: boolean;
}

const ServiceCard = ({ 
  name, 
  description, 
  price, 
  duration, 
  category, 
  onClick, 
  featured 
}: ServiceCardProps) => {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-border/50",
        featured ? "border-secondary ring-1 ring-secondary" : ""
      )}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
            {category}
          </span>
          <span className="text-lg font-semibold text-primary">
            {price}
          </span>
        </div>
        
        <h3 className="text-xl font-serif font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClick}
            className="p-0 h-auto text-primary hover:bg-transparent hover:text-secondary transition-colors group/btn"
          >
            <span className="text-xs font-bold uppercase tracking-tight mr-1">Book</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
