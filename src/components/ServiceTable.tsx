import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
      <h3 className="text-sm font-serif font-medium mb-3 text-secondary tracking-wide uppercase">Selected Treatments ({services.length})</h3>
      <div className="relative">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/60 shadow-sm border border-border/30 h-8 w-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Scrollable Table */}
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-none pl-10 pr-10"
        >
          <table className="min-w-full border-2 border-secondary/20 rounded-2xl bg-card/60 backdrop-blur-md overflow-hidden">
            <thead className="bg-secondary/10">
              <tr>
                <th className="px-4 py-2.5 text-left text-[10px] uppercase tracking-wider font-extrabold text-secondary">Service</th>
                <th className="px-4 py-2.5 text-left text-[10px] uppercase tracking-wider font-extrabold text-secondary">Duration</th>
                <th className="px-4 py-2.5 text-left text-[10px] uppercase tracking-wider font-extrabold text-secondary">Price</th>
                <th className="px-2 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id} className="border-t border-secondary/10 hover:bg-secondary/5 transition-colors duration-150">
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">{svc.name}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{svc.duration}</td>
                  <td className="px-4 py-3 text-xs font-black text-secondary">₹{svc.price}</td>
                  <td className="px-2 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(svc.id)}
                      className="text-destructive hover:bg-destructive/15 h-7 w-7 rounded-full"
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
          variant="ghost"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/60 shadow-sm border border-border/30 h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};