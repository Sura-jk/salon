"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Calendar, Users, Search, 
  Trash2, RefreshCw, Check, Clock, ChevronLeft, Sparkles, LayoutDashboard, TrendingUp
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user_bookings');
    setBookings(stored ? JSON.parse(stored) : []);
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + parseInt(b.price || '0', 10), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Luxe Manager</h1>
              <p className="text-sm text-muted-foreground">Administration & Analytics</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => navigate('/profile')} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Exit to App
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold uppercase text-muted-foreground">Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-black">₹{totalRevenue}</p>
          </Card>
          <Card className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-muted-foreground">Total Bookings</span>
            <p className="text-3xl font-black">{bookings.length}</p>
          </Card>
          <Card className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-muted-foreground">Active Staff</span>
            <p className="text-3xl font-black">12</p>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Live Appointments</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white" 
              />
            </div>
          </div>

          <div className="grid gap-4">
            {bookings.length > 0 ? bookings.map(b => (
              <Card key={b.id} className="p-4 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden">
                    <img src={b.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{b.serviceName}</h3>
                    <p className="text-xs text-muted-foreground">{b.stylistName} • {b.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm">₹{b.price}</p>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">{b.status}</Badge>
                </div>
              </Card>
            )) : (
              <div className="text-center py-12 text-muted-foreground italic">No active bookings to display.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;