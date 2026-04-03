import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import * as listingService from '../../services/listingService';

export default function CreateListingForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    metalType: 'gold',
    category: 'bars',
    weight: { value: '', unit: 'oz' },
    purity: '',
    price: '',
    location: { city: '', state: '', zipCode: '' },
    isFeatured: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return;
    
    setLoading(true);
    try {
      const data = { ...formData, images };
      const listing = await listingService.createListing(data);
      navigate(`/listing/${listing._id}`);
    } catch (error) {
      console.error('Failed to create listing', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl mx-auto py-12">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <section className="bg-primary-dark/40 p-10 rounded-xl border border-white/5 shadow-2xl backdrop-blur-sm">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gold border-b border-white/5 pb-4">Asset Specification</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Merchant Title</label>
                <input 
                  type="text" 
                  required 
                  className="input-field py-4 text-lg font-bold" 
                  placeholder="e.g. 1 oz American Gold Eagle"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Asset Class</label>
                  <select 
                    className="input-field py-4 text-xs font-bold"
                    value={formData.metalType}
                    onChange={(e) => setFormData({...formData, metalType: e.target.value})}
                  >
                    <option value="gold">Gold Bullion</option>
                    <option value="silver">Silver Bullion</option>
                    <option value="platinum">Platinum</option>
                    <option value="palladium">Palladium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                  <select 
                    className="input-field py-4 text-xs font-bold"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="bars">Investment Bars</option>
                    <option value="coins">Government Coins</option>
                    <option value="rounds">Private Rounds</option>
                    <option value="jewelry">Fine Jewelry</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Merchant Narrative</label>
                <textarea 
                  required 
                  className="input-field h-40 py-4 text-sm italic" 
                  placeholder="Provide detailed authentication and condition documentation..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
          </section>

          <section className="bg-primary-dark/40 p-10 rounded-xl border border-white/5 shadow-2xl backdrop-blur-sm">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gold border-b border-white/5 pb-4">Valuation & Purity</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Market Valuation (USD)</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-black">$</span>
                   <input 
                    type="number" 
                    required 
                    className="input-field py-4 pl-10 font-black text-xl text-gold" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Certified Purity</label>
                <input 
                  type="text" 
                  required 
                  className="input-field py-4 font-bold" 
                  placeholder=".9999 / 24k"
                  value={formData.purity}
                  onChange={(e) => setFormData({...formData, purity: e.target.value})}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="bg-primary-dark/40 p-10 rounded-xl border border-white/5 shadow-2xl backdrop-blur-sm">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gold border-b border-white/5 pb-4">Visual Documentation</h2>
            <ImageUpload images={images} setImages={setImages} />
            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-6 text-center">Physical item verification via high-resolution imagery required</p>
          </section>

          <section className="bg-primary-dark/40 p-10 rounded-xl border border-white/5 shadow-2xl backdrop-blur-sm">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gold border-b border-white/5 pb-4">Origin & Presence</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Registered City</label>
                <input 
                  type="text" 
                  required 
                  className="input-field py-4 font-bold" 
                  value={formData.location.city}
                  onChange={(e) => setFormData({...formData, location: {...formData.location, city: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">State Code</label>
                <input 
                  type="text" 
                  required 
                  maxLength={2}
                  className="input-field py-4 font-black uppercase text-center" 
                  placeholder="NY"
                  value={formData.location.state}
                  onChange={(e) => setFormData({...formData, location: {...formData.location, state: e.target.value.toUpperCase()}})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Postal Code</label>
                <input 
                  type="text" 
                  required 
                  className="input-field py-4 font-bold" 
                  value={formData.location.zipCode}
                  onChange={(e) => setFormData({...formData, location: {...formData.location, zipCode: e.target.value}})}
                />
              </div>
            </div>
          </section>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-gold w-full py-6 text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-gold/20 hover:scale-[1.01] transition-all disabled:opacity-50"
          >
            {loading ? 'Processing Entry...' : 'Authorize Listing Manifest'}
          </button>
          <p className="text-[9px] text-center text-gray-600 font-black uppercase tracking-widest mt-4">Security Protocol: Direct peer-to-peer transaction facilitation only</p>
        </div>
      </div>
    </form>
  );
}
