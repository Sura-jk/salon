"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Calendar, Users, Search, 
  Trash2, RefreshCw, Check, X, Clock, ChevronLeft, Sparkles, LayoutDashboard
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const DEFAULT_INITIAL_BOOKINGS = [
  {
    id: 'b1',
    salonName: 'Luxe Aura Studio',
    serviceName: 'Signature Hair Sculpt',
    category: 'Hair',
    stylistName: 'Elena Rose',
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    time: '10:00 AM',
    status: 'upcoming',
    price: '850',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b2',
    salonName: 'Velvet Touch Spa',
    serviceName: 'Cellular Glow Facial',
    category: 'Facial',
    stylistName: 'Sophia Chen',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    time: '02:00 PM',
    status: 'completed',
    price: '1299',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop'
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const loadBookings = () => {
    const storedRaw = localStorage.getItem('user_bookings');
    if (!storedRaw) {
      localStorage.setItem('user_bookings', JSON.stringify(DEFAULT_INITIAL_BOOKINGS));
      setBookings(DEFAULT_INITIAL_BOOKINGS);
    } else {
      setBookings(JSON.parse(storedRaw));
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = (bookingId: string, newStatus: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem('user_bookings', JSON.stringify(updated));
    showSuccess(`Booking updated to "${newStatus}"!`);
  };

  const handleDeleteBooking = (bookingId: string, name: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('user_bookings', JSON.stringify(updated));
    showSuccess(`Removed booking: ${name}`);
  };

  // Filter computation
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.stylistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.salonName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI computations
  const totalBookings = bookings.length;
  const activeBookingsCount = bookings.filter(b => b.status === 'upcoming').length;
  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + parseInt(b.price || '0', 10), 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-36 px-6 pt-12 items-center animate-in fade-in duration-500">
      <div className="w-full max-w-lg md:max-w-2xl">
        {/* Manager Navigation Bar */}
        <header className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Luxe Manager</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/profile')} 
              className="rounded-xl border-slate-200 h-9 px-4 flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-primary transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back to App
            </Button>
          </div>

          <div className="p-6 rounded-[2rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
              <Sparkles className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Salon Administrator</span>
              </div>
              <h2 className="text-3xl font-serif font-medium">Business Overview</h2>
              <p className="text-slate-400 text-xs mt-1">Monitoring active sessions & revenue flow</p>
            </div>
          </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Card className="bg-white border-none p-4 rounded-2xl shadow-sm">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Sessions</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{totalBookings}</span>
          </Card>
          <Card className="bg-white border-none p-4 rounded-2xl shadow-sm">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Active</span>
            <span className="text-2xl font-black text-secondary mt-1 block">{activeBookingsCount}</span>
          </Card>
          <Card className="bg-white border-none p-4 rounded-2xl shadow-sm">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Revenue</span>
            <span className="text-xl font-black text-slate-900 mt-1 block">₹{totalRevenue}</span>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search appointments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 py-6 rounded-2xl border-none bg-white shadow-sm text-sm font-medium focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['all', 'upcoming', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black transition-all border-none uppercase tracking-widest whitespace-nowrap",
                  statusFilter === tab 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-white text-slate-500 hover:bg-slate-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Appointment Feed ({filteredBookings.length})
            </span>
            <button onClick={loadBookings} className="text-xs text-primary font-black flex items-center gap-1.5 opacity-60 hover:opacity-100">
              <RefreshCw className="w-3.5 h-3.5" /> Sync
            </button>
          </div>

          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => (
              <Card key={b.id} className="p-5 border-none bg-white rounded-3xl shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-[9px] font-black text-secondary uppercase tracking-widest block mb-0.5">
                      {b.salonName}
                    </span>
                    <h3 className="font-bold text-slate-900">{b.serviceName}</h3>
                    <p className="text-xs text-slate-500 mt-1">Artist: <strong className="text-slate-900">{b.stylistName}</strong></p>
                  </div>
                  <Badge className={cn(
                    "text-[9px] font-black px-2.5 py-1 rounded-lg border-none",
                    b.status === 'upcoming' && "bg-blue-50 text-blue-600",
                    b.status === 'completed' && "bg-emerald-50 text-emerald-600",
                    b.status === 'cancelled' && "bg-rose-50 text-rose-600"
                  )}>
                    {b.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{b.time}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">₹{b.price}</span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex gap-2">
                    {b.status !== 'completed' && (
                      <Button size="sm" onClick={() => handleUpdateStatus(b.id, 'completed')} className="h-8 rounded-xl text-[10px] font-black uppercase tracking-wider px-3 bg-emerald-600 hover:bg-emerald-700">
                        <Check className="w-3.5 h-3.5 mr-1" /> Mark Done
                      </Button>
                    )}
                    {b.status === 'upcoming' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(b.id, 'cancelled')} className="h-8 rounded-xl text-[10px] font-black uppercase tracking-wider px-3 border-rose-100 text-rose-600 hover:bg-rose-50">
                        Cancel
                      </Button>
                    )}
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteBooking(b.id, b.serviceName)} className="h-8 w-8 text-slate-300 hover:text-rose-600 rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl p-6">
              <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Feed Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;