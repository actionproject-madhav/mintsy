import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ListingCard from '../components/marketplace/ListingCard';
import * as listingService from '../services/listingService';
import { useAuth } from '../hooks/useAuth';

export default function MyListings() {
  const { user, loading: authLoading } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchMyListings = async () => {
      try {
        const data = await listingService.getUserListings();
        setListings(Array.isArray(data) ? data : []);
      } catch {
        console.error('Failed to fetch my listings');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, [user]);

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-zinc-600">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/my-listings' }} />;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">Corporate Inventory</h1>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Institutional Grade Assets & Public Marketplace Listings</p>
        </div>
        <a href="/create-listing" className="btn-gold py-4 px-10 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gold/10 hover:scale-[1.02] transition-all">
          Initiate New Listing
        </a>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-primary-dark/40 border border-white/5 h-[400px] rounded-xl"></div>
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 bg-primary-dark/20 rounded-xl border border-dashed border-white/10 max-w-4xl mx-auto backdrop-blur-sm">
          <div className="mb-10 opacity-20">
            <div className="w-20 h-20 border-2 border-gold rounded-full mx-auto flex items-center justify-center">
              <div className="w-10 h-10 bg-gold rounded-sm"></div>
            </div>
          </div>
          <p className="text-2xl font-black mb-4 uppercase tracking-tighter">Your portfolio is currently empty</p>
          <p className="text-gray-500 mb-12 italic text-sm font-bold uppercase tracking-widest max-w-md mx-auto">Begin your professional trading presence by listing your first precious metal asset.</p>
          <a href="/create-listing" className="btn-gold py-5 px-12 text-sm font-black uppercase tracking-[0.2em] shadow-2xl">Create Your First Listing</a>
        </div>
      )}
    </div>
  );
}
