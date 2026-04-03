import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as listingService from '../services/listingService';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await listingService.getListingById(id);
        setListing(data);
      } catch {
        console.error('Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-20 animate-pulse bg-primary-dark/40 rounded-3xl h-[700px] border border-white/5"></div>;
  if (!listing) return <div className="text-center py-40 font-black uppercase tracking-widest text-gray-500 italic">Merchant Record Not Identified</div>;

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-16 border-b border-white/5 pb-6">
        <Link to="/marketplace" className="hover:text-gold transition-colors">Marketplace Inventory</Link>
        <span className="text-gold/20">/</span>
        <span className="text-gray-light">{listing.metalType}</span>
        <span className="text-gold/20">/</span>
        <span className="text-white truncate">{listing.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* Visual Documentation */}
        <div className="space-y-8 sticky top-24">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-primary-dark/60 border border-white/10 shadow-3xl group relative">
            <img 
              src={listing.images[activeImage]?.url} 
              alt={listing.title} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="bg-primary-darker/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-sm border border-white/10 uppercase tracking-widest">Image {activeImage + 1} of {listing.images.length}</span>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {listing.images.map((img, i) => (
              <button 
                key={img.publicId || i} 
                onClick={() => setActiveImage(i)}
                className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-300 ${activeImage === i ? 'border-gold shadow-lg shadow-gold/20 ring-1 ring-gold/50' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt=""/>
              </button>
            ))}
          </div>
        </div>

        {/* Narrative & Specification */}
        <div className="space-y-12">
          <header className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-gold text-primary text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-[0.2em] shadow-xl">Institutional Asset</span>
              {listing.isFeatured && <span className="border border-gold text-gold text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">Premium</span>}
            </div>
            <h1 className="text-6xl font-black mb-4 leading-tight tracking-tighter italic uppercase">{listing.title}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-gray-600 tracking-widest">$</span>
              <p className="text-7xl font-black text-gold tracking-tighter">{listing.price.toLocaleString()}</p>
              <span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] ml-2">Market Valuation</span>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-primary-dark/40 p-10 backdrop-blur-sm">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.22em] mb-2">Classification</p>
              <p className="text-xl font-black text-white uppercase italic">{listing.metalType}</p>
            </div>
            <div className="bg-primary-dark/40 p-10 backdrop-blur-sm border-l border-white/5">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.22em] mb-2">Purity Standard</p>
              <p className="text-xl font-black text-white uppercase italic">{listing.purity}</p>
            </div>
            <div className="bg-primary-dark/40 p-10 backdrop-blur-sm border-t border-white/5">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.22em] mb-2">Market Category</p>
              <p className="text-xl font-black text-white uppercase italic">{listing.category}</p>
            </div>
            <div className="bg-primary-dark/40 p-10 backdrop-blur-sm border-t border-l border-white/5">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.22em] mb-2">Registered Origin</p>
              <p className="text-xl font-black text-white uppercase italic">{listing.location.city}, {listing.location.state}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/50 pb-4 border-b border-white/5">Merchant Narrative</h3>
            <p className="text-gray-light leading-[2] whitespace-pre-wrap italic text-lg border-l-2 border-gold/10 pl-10 py-2">{listing.description}</p>
          </div>

          <div className="bg-primary-accent/30 p-12 rounded-xl border border-white/5 shadow-3xl backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-primary-darker flex items-center justify-center text-4xl font-black text-white border border-gold/10 shadow-inner overflow-hidden">
                   {listing.seller.profilePicture ? <img src={listing.seller.profilePicture} className="w-full h-full object-cover" alt="" /> : listing.seller.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Authenticated Merchant</p>
                  <p className="text-2xl font-black italic">{listing.seller.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(listing.seller.rating) ? 'bg-gold' : 'bg-gray-700'}`}></div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-gold uppercase tracking-widest">{listing.seller.rating.toFixed(1)} Merchant Integrity Score</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-gold w-full py-6 text-xs font-black uppercase tracking-[0.4em] shadow-2xl shadow-gold/20 hover:scale-[1.01] transition-all">Establish Secure Connection</button>
            <p className="text-[9px] text-center text-gray-600 mt-8 font-bold uppercase tracking-[0.2em] italic">Peer-to-peer facilitation only • Verification recommended</p>
          </div>
        </div>
      </div>
    </div>
  );
}
