import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, Heart, LogOut, Bell, 
  ChevronRight, Crown, ChevronLeft, Save, Plus, 
  MapPin, Star, Trash2, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

type TabId = 'personal' | 'favorites' | 'notifications' | 'settings' | null;

const SALONS_MAP = {
  salon1: { name: 'Luxe Aura Studio', location: 'Bandra West', rating: 4.9, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400' },
  salon2: { name: 'Velvet Touch Spa', location: 'Juhu', rating: 4.7, img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=400' },
  salon3: { name: 'Golden Glow Parlour', location: 'Colaba', rating: 4.8, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400' }
};

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>(null);
  const [points, setPoints] = useState(0);
  const [visits, setVisits] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    const targetPoints = 1250;
    const targetVisits = 12;
    const pInterval = setInterval(() => setPoints(prev => (prev < targetPoints ? prev + 25 : targetPoints)), 20);
    const vInterval = setInterval(() => setVisits(prev => (prev < targetVisits ? prev + 1 : targetVisits)), 100);
    return () => { clearInterval(pInterval); clearInterval(vInterval); };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('favorite_salons');
    setFavorites(saved ? JSON.parse(saved) : ['salon1', 'salon2']);
  }, [activeTab]);

  const handleLogout = () => {
    showSuccess("Logged out successfully.");
    navigate('/auth');
  };

  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-8">
      <Button variant="ghost" size="icon" onClick={() => setActiveTab(null)} className="rounded-full bg-muted/50"><ChevronLeft className="w-5 h-5" /></Button>
      <h2 className="text-2xl font-serif font-medium">{title}</h2>
    </div>
  );

  const menuItems = [
    { id: 'personal', icon: User, label: 'Personal Information', description: 'Manage your profile and details' },
    { id: 'favorites', icon: Heart, label: 'Favorite Salons', description: 'Your curated list of studios' },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Manage your alerts' },
    { id: 'settings', icon: Settings, label: 'App Settings', description: 'Preferences and security' },
  ];

  if (activeTab === 'personal') return <div className="p-6 pb-40 max-w-lg mx-auto">{renderHeader("Personal Info")}</div>;
  if (activeTab === 'favorites') return <div className="p-6 pb-40 max-w-lg mx-auto">{renderHeader("Favorites")}</div>;

  return (
    <div className="min-h-screen bg-background pb-40 px-6 pt-12 items-center flex flex-col">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-12">
          <div className="w-28 h-28 rounded-full bg-secondary/20 p-1.5 border-2 border-secondary shadow-xl">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" className="w-full h-full rounded-full object-cover" alt="" />
          </div>
          <h2 className="text-3xl font-serif font-medium mt-6">Alex Johnson</h2>
          <Badge className="mt-2 bg-secondary text-primary font-bold">Platinum Member</Badge>
        </div>

        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.id} onClick={() => setActiveTab(item.id as TabId)} className="p-5 rounded-2xl bg-card border border-border flex items-center gap-4 cursor-pointer hover:border-secondary transition-all group">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-secondary/20"><item.icon className="w-5 h-5" /></div>
              <div className="flex-1">
                <span className="block font-bold text-sm">{item.label}</span>
                <span className="text-[10px] text-muted-foreground">{item.description}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
          
          <div onClick={() => navigate('/admin')} className="p-5 rounded-2xl bg-primary text-primary-foreground flex items-center gap-4 cursor-pointer shadow-lg shadow-primary/20">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></div>
            <div className="flex-1">
              <span className="block font-bold text-sm">Luxe Manager</span>
              <span className="text-[10px] opacity-70">Admin & Service Panel</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        <Button variant="ghost" onClick={handleLogout} className="w-full py-8 mt-12 rounded-2xl text-destructive border border-destructive/20 font-bold">Sign Out</Button>
      </div>
    </div>
  );
};

export default Profile;