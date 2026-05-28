import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={
            <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
              <h1 className="text-4xl font-serif font-medium text-foreground mb-4">My Profile</h1>
              <p className="text-muted-foreground mb-10">Profile management coming soon.</p>
              <div className="w-24 h-24 rounded-full bg-muted mb-6" />
              <div className="w-full max-w-xs space-y-3">
                <div className="p-4 rounded-2xl bg-card border border-border text-left text-sm">Account Settings</div>
                <div className="p-4 rounded-2xl bg-card border border-border text-left text-sm">Payment Methods</div>
                <div className="p-4 rounded-2xl bg-card border border-border text-left text-sm">Notification Preferences</div>
              </div>
            </div>
          } />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
