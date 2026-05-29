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

  // Auto-scroll to top when active tab changes
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

  // Fetch favorited salons list dynamically on component load / tab open
  useEffect(() => {
    const saved = localStorage.getItem('favorite_salons');
    setFavorites(saved ? JSON.parse(saved) : ['salon1', 'salon2']);
  }, [activeTab]);

  const handleLogout = () => {
    showSuccess("Logged out successfully.");
    navigate('/auth');
  };

  const handleRemoveFavorite = (salonId: string, salonName: string) => {
    const updated = favorites.filter(fid => fid !== salonId);
    setFavorites(updated);
    localStorage.setItem('favorite_salons', JSON.stringify(updated));
    showSuccess(`Removed "${salonName}" from favorites`);
  };

  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-8">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveTab(null)}
        className="rounded-full bg-muted/50"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <h2 className="text-2xl font-serif font-medium">{title}</h2>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {renderHeader("Personal Information")}
      <div className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80" 
              className="w-24 h-24 rounded-full object-cover border-2 border-secondary p-1" 
              alt="Avatar" 
            />
            <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full text-white border-2 border-background cursor-pointer">
              <Plus className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Full Name</Label>
            <Input defaultValue="Alex Johnson" className="rounded-xl py-6 border-border/60" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Email Address</Label>
            <Input defaultValue="alex.j@luxury.com" className="rounded-xl py-6 border-border/60" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Phone Number</Label>
            <Input defaultValue="+91 98765 43210" className="rounded-xl py-6 border-border/60" />
          </div>
        </div>
        <Button className="w-full py-7 rounded-2xl bg-primary mt-8 mb-12 shadow-lg shadow-primary/20" onClick={() => { showSuccess("Profile updated!"); setActiveTab(null); }}>
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {renderHeader("Favorite Salons")}
      <div className="space-y-6 pb-12">
        {favorites.length > 0 ? (
          favorites.map((salonId) => {
            const salon = SALONS_MAP[salonId as keyof typeof SALONS_MAP];
            if (!salon) return null;
            return (
              <div 
                key={salonId} 
                className="flex flex-col gap-3 p-4 rounded-3xl bg-card border border-border/60 group hover:border-secondary transition-all cursor-pointer shadow-sm relative overflow-hidden" 
                onClick={() => navigate(`/salon/${salonId}`)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-border/50">
                    <img src={salon.img} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="font-serif font-medium text-lg text-foreground group-hover:text-secondary transition-colors">{salon.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-secondary" /> {salon.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-secondary font-black mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" /> {salon.rating}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-border/30 mt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(salonId, salon.name);
                    }}
                    className="h-8 text-xs font-bold text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl px-3 flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-3xl p-8">
            <Heart className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm font-medium">No favorite salons found.</p>
            <Button 
              onClick={() => navigate('/')} 
              className="mt-4 rounded-xl bg-secondary text-primary font-bold px-6 py-2 hover:bg-secondary/90 transition-all"
            >
              Explore Salons
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="animate-in slide-in-from-right-4 duration-500">
      {renderHeader("Notifications")}
      <div className="space-y-6 p-2 pb-12">
        {[
          { title: 'Appointment Reminders', desc: 'Get notified before your session' },
          { title: 'Promotional Offers', desc: 'Exclusive deals and summer promos' },
          { title: 'New Stylists', desc: 'When masters join our network' },
          { title: 'Order Updates', desc: 'Updates on your booking status' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="pr-4">
              <span className="block font-bold text-sm">{item.title}</span>
              <span className="text-[10px] text-muted-foreground">{item.desc}</span>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
      </div>
    </div>
  );

  const menuItems = [
    { id: 'personal', icon: User, label: 'Personal Information', description: 'Manage your profile and details' },
    { id: 'favorites', icon: Heart, label: 'Favorite Salons', description: 'Your curated list of studios' },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Manage your alerts' },
    { id: 'settings', icon: Settings, label: 'App Settings', description: 'Preferences and security' },
  ];

  if (activeTab === 'personal') return <div className="p-6 pb-40 max-w-lg md:max-w-2xl mx-auto">{renderPersonalInfo()}</div>;
  if (activeTab === 'favorites') return <div className="p-6 pb-40 max-w-lg md:max-w-2xl mx-auto">{renderFavorites()}</div>;
  if (activeTab === 'notifications') return <div className="p-6 pb-40 max-w-lg md:max-w-2xl mx-auto">{renderNotifications()}</div>;
  if (activeTab === 'settings') return <div className="p-6 pb-40 max-w-lg md:max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-500">{renderHeader("App Settings")}<div className="p-10 text-center"><p className="text-muted-foreground italic">Security and preference settings coming in v2.0</p></div></div>;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-40 px-6 pt-12 animate-in fade-in duration-500 overflow-y-auto items-center">
      <div className="w-full max-w-lg md:max-w-2xl">
        <div className="flex flex-col items-center mb-12">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-secondary/20 p-1.5 border-2 border-secondary shadow-xl group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80" 
                className="w-full h-full rounded-full object-cover" 
                alt="User" 
              />
            </div>
          </div>
          <div className="text-center mt-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-serif font-medium tracking-tight">Alex Johnson</h2>
            <Badge className="mt-2 bg-secondary text-primary font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 w-fit">
              <Crown className="w-3.5 h-3.5" /> Platinum Member
            </Badge>
          </div>
          <div className="flex gap-4 mt-8 w-full">
            <div className="flex-1 p-4 rounded-2xl bg-card border border-border text-center luxury-shadow">
              <span className="block text-2xl font-bold text-primary">{points.toLocaleString()}</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Loyalty Points</span>
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-card border border-border text-center luxury-shadow">
              <span className="block text-2xl font-bold text-primary">{visits}</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Total Visits</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-2 mb-2">Account Management</h3>
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveTab(item.id as TabId)}
              className="p-5 rounded-2xl bg-card border border-border flex items-center gap-4 cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all group shadow-sm active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary" />
              </div>
              <div className="flex-1">
                <span className="block font-bold text-sm text-foreground">{item.label}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{item.description}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full py-8 rounded-2xl text-destructive font-bold flex items-center justify-center gap-2 hover:bg-destructive/10 transition-all border border-destructive/20"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
          
          <div className="pt-8 border-t border-border/40">
            <button 
              onClick={() => navigate('/admin')}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-secondary transition-colors group"
            >
              <ShieldCheck className="w-3.5 h-3.5 transition-transform group-hover:scale-110" /> 
              Switch to Luxe Manager
            </button>
            <p className="text-center text-[10px] text-muted-foreground/30 mt-2 uppercase tracking-widest font-bold">LuxeSalon v1.0.4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;