import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, Heart, LogOut, Bell, ChevronRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Animate numbers on load
    const targetPoints = 1250;
    const targetVisits = 12;
    
    const pInterval = setInterval(() => {
      setPoints(prev => (prev < targetPoints ? prev + 25 : targetPoints));
    }, 20);
    
    const vInterval = setInterval(() => {
      setVisits(prev => (prev < targetVisits ? prev + 1 : targetVisits));
    }, 100);

    return () => {
      clearInterval(pInterval);
      clearInterval(vInterval);
    };
  }, []);

  const handleMenuClick = (label: string) => {
    showSuccess(`Entering ${label} management panel...`);
  };

  const handleLogout = () => {
    showSuccess("Logged out successfully. See you soon!");
    navigate('/auth');
  };

  const menuItems = [
    { icon: User, label: 'Personal Information', description: 'Manage your profile and details' },
    { icon: CreditCard, label: 'Payment Methods', description: 'Manage your saved cards and wallets' },
    { icon: Heart, label: 'Favorite Salons', description: 'Your curated list of favorite studios' },
    { icon: Bell, label: 'Notifications', description: 'Manage your alerts and reminders' },
    { icon: Settings, label: 'App Settings', description: 'Preferences and account security' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-12">
      <div className="max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-12">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-secondary/20 p-1.5 border-2 border-secondary shadow-xl group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80" 
                className="w-full h-full rounded-full object-cover" 
                alt="User" 
              />
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary rounded-full border-2 border-background flex items-center justify-center shadow-md">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="text-center mt-6">
            <h2 className="text-3xl font-serif font-medium tracking-tight">Alex Johnson</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge className="bg-secondary text-primary font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Platinum Member
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8 w-full">
            <div className="flex-1 p-4 rounded-2xl bg-card border border-border text-center shadow-sm hover:border-secondary transition-colors cursor-default group">
              <span className="block text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                {points.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Loyalty Points</span>
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-card border border-border text-center shadow-sm hover:border-secondary transition-colors cursor-default group">
              <span className="block text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                {visits}
              </span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Total Visits</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">Account Management</h3>
          {menuItems.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => handleMenuClick(item.label)}
              className="p-5 rounded-2xl bg-card border border-border flex items-center gap-4 cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all group shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary" />
              </div>
              <div className="flex-1">
                <span className="block font-bold text-sm text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground font-medium">{item.description}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>

        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full py-7 rounded-2xl text-destructive font-bold flex items-center justify-center gap-2 mt-10 hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};

export default Profile;