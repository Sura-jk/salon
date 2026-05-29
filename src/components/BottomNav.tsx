import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Scissors, CalendarDays, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: Home,
    },
    {
      id: 'services',
      label: 'Services',
      path: '/services',
      icon: Scissors,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      path: '/bookings',
      icon: CalendarDays,
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 z-50 bg-background/60 backdrop-blur-xl border border-border/50 rounded-[2rem] px-6 py-3 shadow-2xl shadow-black/10">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300 p-2 rounded-2xl",
                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-secondary/20 text-primary" : "bg-transparent"
              )}>
                <Icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider transition-all",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;