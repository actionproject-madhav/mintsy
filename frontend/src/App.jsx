import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import GridBackground from './components/ui/GridBackground';
import AmbientMesh from './components/ui/AmbientMesh';
import Noise from './components/ui/Noise';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import CreateListing from './pages/CreateListing';
import Education from './pages/Education';
import Profile from './pages/Profile';
import CollegeMarketplace from './pages/CollegeMarketplace';
import MyListings from './pages/MyListings';
import ListingDetail from './pages/ListingDetail';
import Premium from './pages/Premium';
import Messages from './pages/Messages';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-zinc-100 text-zinc-900 antialiased">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <AmbientMesh variant="light" />
          <GridBackground variant="muted" showGlow />
          <Noise opacity={0.045} />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/education" element={<Education />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/college" element={<CollegeMarketplace />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
            </Routes>
          </main>

          <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 text-zinc-500">
            <div className="container-custom py-14">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
                <div>
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-zinc-100">Mintsy</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    Local marketplace for precious metals — verified peers, clear pricing, in-person settlement.
                  </p>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-600">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">About</a></li>
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">How it works</a></li>
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-600">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/education" className="text-zinc-500 transition hover:text-zinc-300">Knowledge center</a></li>
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">Spot prices</a></li>
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">Safety</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-600">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">Terms</a></li>
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">Privacy</a></li>
                    <li><a href="#" className="text-zinc-500 transition hover:text-zinc-300">Cookies</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 border-t border-zinc-800/80 pt-8 text-center">
                <p className="text-xs text-zinc-600">© 2026 Mintsy. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
