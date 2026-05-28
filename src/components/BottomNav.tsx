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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border px-6 py-3 pb-safe">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium uppercase tracking-wider">
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
