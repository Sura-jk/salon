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
    <div className="mt-6">
      <h3 className="text-lg font-serif font-medium mb-3">Selected Services</h3>
      <div className="relative">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/60"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Scrollable Table */}
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-none pl-10 pr-10"
        >
          <table className="min-w-full border border-border/30 rounded-xl bg-card">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Service</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Duration</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id} className="border-t border-border/20">
                  <td className="px-4 py-2 text-sm">{svc.name}</td>
                  <td className="px-4 py-2 text-sm">{svc.duration}</td>
                  <td className="px-4 py-2 text-sm font-bold text-primary">₹{svc.price}</td>
                  <td className="px-2 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(svc.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/60"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};