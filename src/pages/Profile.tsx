import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, Heart, LogOut, Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Personal Information', description: 'Manage your profile and details' },
    { icon: CreditCard, label: 'Payment Methods', description: 'Manage your saved cards and wallets' },
    { icon: Heart, label: 'Favorite Salons', description: 'Your curated list of favorite studios' },
    { icon: Bell, label: 'Notifications', description: 'Manage your alerts and reminders' },
    { icon: Settings, label: 'App Settings', description: 'Preferences and account security' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 px-6 pt-8">
      <div className="max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-12">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-secondary/20 p-1 border-2 border-secondary">
              <img 
                src="https://i.pravatar.cc/150?u=user" 
                className="w-full h-full rounded-full object-cover" 
                alt="User" 
              />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-secondary rounded-full" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-medium mt-4">Alex Johnson</h2>
          <p className="text-muted-foreground text-sm">Premium Member since 2023</p>
          
          <div className="flex gap-3 mt-6">
            <div className="px-4 py-2 rounded-full bg-card border border-border text-center">
              <span className="block text-lg font-bold text-primary">1,250</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Points</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-card border border-border text-center">
              <span className="block text-lg font-bold text-primary">12</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Visits</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4 cursor-pointer hover:border-secondary transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary" />
              </div>
              <div className="flex-1">
                <span className="block font-medium text-sm">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.description}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        <Button 
          variant="ghost" 
          className="w-full py-6 rounded-2xl text-destructive flex items-center justify-center gap-2 mt-8"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;