import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import Splash from './apps/user/pages/Splash';
import Onboarding from './apps/user/pages/Onboarding';
import Auth from './apps/user/pages/Auth';
import Home from './apps/user/pages/Home';
import SalonDetails from './apps/user/pages/SalonDetails';
import BookingFlow from './apps/user/pages/Booking';
import Bookings from './apps/user/pages/Bookings';
import Profile from './apps/user/pages/Profile';
import Services from './apps/user/pages/Services';
import AdminDashboard from './apps/admin/pages/Dashboard';
import BottomNav from './components/shared/BottomNav';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const hideNavPaths = ['/splash', '/onboarding', '/auth', '/book', '/admin'];
  const isSalonDetail = location.pathname.startsWith('/salon/');
  const showNav = !hideNavPaths.includes(location.pathname) && !isSalonDetail;

  useEffect(() => {
    const onboarded = localStorage.getItem('luxe_onboarded');
    if (!onboarded && location.pathname === '/') {
      navigate('/splash');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Toaster position="top-center" expand={false} richColors closeButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/salon/:id" element={<SalonDetails />} />
        <Route path="/book" element={<BookingFlow />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      
      {showNav && (
        <div className="app-nav-wrapper">
          <BottomNav />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;