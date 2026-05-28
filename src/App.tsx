import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Home from './pages/Home';
import SalonDetails from './pages/SalonDetails';
import BookingFlow from './pages/Booking';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

const AppContent = () => {
  const location = useLocation();
  const hideNavPaths = ['/splash', '/onboarding', '/auth', '/book'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/salon/:id" element={<SalonDetails />} />
        <Route path="/book" element={<BookingFlow />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<Profile />} />
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