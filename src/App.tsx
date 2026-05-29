import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Home from './pages/Home';
import SalonDetails from './pages/SalonDetails';
import BookingFlow from './pages/Booking';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import Services from './pages/Services';
import BottomNav from './components/BottomNav';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hide navigation bar on intro/booking/auth screens and specific salon details
  const hideNavPaths = ['/splash', '/onboarding', '/auth', '/book'];
  const isSalonDetail = location.pathname.startsWith('/salon/');
  const showNav = !hideNavPaths.includes(location.pathname) && !isSalonDetail;

  // First-time visit auto-redirect check for native premium app feel
  useEffect(() => {
    const onboarded = localStorage.getItem('luxe_onboarded');
    if (!onboarded && location.pathname === '/') {
      navigate('/splash');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Toast notifications container */}
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