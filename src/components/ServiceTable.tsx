import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
}

interface ServiceTableProps {
  services: Service[];
  onRemove: (id: string) => void;
}

/**
 * The table is horizontally scrollable. Arrow buttons scroll the container
 * by a fixed amount, giving a carousel‑like feel without a full carousel lib.
 */
export const ServiceTable = ({ services, onRemove }: ServiceTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 200; // pixels per click

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const delta = dir === 'left' ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  if (services.length === 0) return null;

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Selected Services</h3>
      <div className="relative">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background border-secondary/20 rounded-full w-8 h-8 flex items-center justify-center shadow-md text-secondary"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Scrollable Table */}
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap no-scrollbar pl-8 pr-8 w-full"
        >
          <table className="min-w-full border border-border/40 rounded-2xl bg-card overflow-hidden">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Service</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{svc.name}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{svc.duration}</td>
                  <td className="px-4 py-3 text-sm font-bold text-secondary">₹{svc.price}</td>
                  <td className="px-2 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(svc.id)}
                      className="text-destructive hover:bg-destructive/10 h-7 w-7 p-0 rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background border-secondary/20 rounded-full w-8 h-8 flex items-center justify-center shadow-md text-secondary"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};