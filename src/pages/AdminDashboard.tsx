"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, Calendar, Users, IndianRupee, Search, 
  Trash2, RefreshCw, Check, X, Clock, ChevronLeft, Sparkles, Filter
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showSuccess, showError } from '@/utils/toast';

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
    const userStored = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    // Combine mock system bookings + actual user-created bookings
    const combined = [...userStored, ...DEFAULT_INITIAL_BOOKINGS];
    
    // De-duplicate in case of ID conflicts
    const uniqueBookings = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
    setBookings(uniqueBookings);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = (bookingId: string, newStatus: string) => {
    // 1. Update in local state
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    setBookings(updated);

    // 2. Update persistent user_bookings key if it lives there
    const userStored = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    const updatedUserStored = userStored.map((b: any) => b.id === bookingId ? { ...b, status: newStatus } : b);
    localStorage.setItem('user_bookings', JSON.stringify(updatedUserStored));

    showSuccess(`Booking updated to "${newStatus}"!`);
  };

  const handleDeleteBooking = (bookingId: string, name: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);

    const userStored = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    const updatedUserStored = userStored.filter((b: any) => b.id !== bookingId);
    localStorage.setItem('user_bookings', JSON.stringify(updatedUserStored));

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
    <div className="flex flex-col min-h-screen bg-background pb-36 px-6 pt-12 items-center animate-in fade-in duration-500">
      <div className="w-full max-w-lg md:max-w-2xl">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/profile')} 
              className="rounded-full bg-card/60 p-2 border border-border h-9 px-3 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Profile
            </Button>
            <Badge className="bg-secondary text-primary font-black px-3 py-1 text-[10px] tracking-widest uppercase">
              Admin Portal Active
            </Badge>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldAlert className="w-4 h-4 text-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Salon Control Center</span>
            </div>
            <h1 className="text-4xl font-serif font-medium tracking-tight">Booking Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Real-time schedule monitoring & salon overrides</p>
          </div>
        </header>

        {/* Dashboard Analytics Widgets */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-card border border-border p-4 rounded-2xl flex flex-col justify-between shadow-sm">
            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block">Total Sessions</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-black text-primary">{totalBookings}</span>
            </div>
          </div>

          <div className="bg-card border border-border p-4 rounded-2xl flex flex-col justify-between shadow-sm">
            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block">Upcoming Slots</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-black text-secondary">{activeBookingsCount}</span>
            </div>
          </div>

          <div className="bg-card border border-border p-4 rounded-2xl flex flex-col justify-between shadow-sm">
            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block">Est. Revenue</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-xl font-black text-primary">₹{totalRevenue}</span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4 mb-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <Input 
              placeholder="Search by client, therapist, or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-10 py-6 rounded-2xl border-border bg-card/50 text-sm font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick status filter pills */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['all', 'upcoming', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border uppercase tracking-wider whitespace-nowrap",
                  statusFilter === tab 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-card text-muted-foreground border-border hover:border-secondary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Live Bookings List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Appointments ({filteredBookings.length})
            </span>
            <button 
              onClick={loadBookings} 
              className="text-xs text-secondary font-black hover:underline flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reload List
            </button>
          </div>

          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => (
              <Card 
                key={b.id} 
                className="p-5 border-border bg-card rounded-3xl shadow-sm hover:border-secondary/30 transition-all flex flex-col gap-4"
              >
                {/* Booking Header */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="text-[9px] font-bold text-secondary uppercase tracking-widest block mb-0.5">
                      {b.salonName}
                    </span>
                    <h3 className="font-serif font-medium text-lg leading-snug text-foreground">
                      {b.serviceName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Artist: <strong className="text-foreground">{b.stylistName}</strong>
                    </p>
                  </div>

                  <Badge className={cn(
                    "text-[9px] uppercase font-bold px-2.5 py-1 rounded-full border-none shadow-sm",
                    b.status === 'upcoming' && "bg-blue-100 text-blue-800",
                    b.status === 'completed' && "bg-green-100 text-green-800",
                    b.status === 'cancelled' && "bg-red-100 text-red-800"
                  )}>
                    {b.status}
                  </Badge>
                </div>

                {/* Booking Schedule Details */}
                <div className="grid grid-cols-2 gap-4 py-2 border-y border-border/40 text-xs">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground block mb-0.5">Schedule Time</span>
                    <span className="font-bold text-foreground">
                      {new Date(b.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {b.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground block mb-0.5">Session Value</span>
                    <span className="font-bold text-secondary">₹{b.price}</span>
                  </div>
                </div>

                {/* Admin Actions Panel */}
                <div className="flex items-center justify-between gap-2.5 pt-1">
                  <div className="flex gap-1.5">
                    {b.status !== 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(b.id, 'completed')}
                        className="h-8 rounded-xl text-[10px] uppercase font-bold tracking-wider px-3 border-green-200 text-green-700 bg-green-50 hover:bg-green-100"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" /> Complete
                      </Button>
                    )}
                    {b.status !== 'cancelled' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                        className="h-8 rounded-xl text-[10px] uppercase font-bold tracking-wider px-3 border-red-200 text-red-700 bg-red-50 hover:bg-red-100"
                      >
                        <X className="w-3.5 h-3.5 mr-1" /> Cancel
                      </Button>
                    )}
                    {b.status !== 'upcoming' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(b.id, 'upcoming')}
                        className="h-8 rounded-xl text-[10px] uppercase font-bold tracking-wider px-3 border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        <Clock className="w-3.5 h-3.5 mr-1" /> Re-open
                      </Button>
                    )}
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteBooking(b.id, b.serviceName)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-16 text-center bg-card border border-border rounded-3xl p-6">
              <Calendar className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm font-medium">No bookings match the search / filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;