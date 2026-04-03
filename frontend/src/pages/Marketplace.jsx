import { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import ListingCard from '../components/marketplace/ListingCard';

// Sample data using your images
const SAMPLE_LISTINGS = [
  {
    id: '1',
    title: '2024 American Gold Eagle 1 oz - Brilliant Uncirculated',
    price: 2650,
    metalType: 'gold',
    category: 'coins',
    weight: { value: 1, unit: 'oz' },
    images: [{ url: '/images/hero/gold.jpg', isMain: true }],
    location: { city: 'Los Angeles', state: 'CA' },
    seller: { name: 'John Smith', profilePicture: '', rating: 4.8 },
    isFeatured: true
  },
  {
    id: '2',
    title: 'American Silver Eagle 1 oz 2023',
    price: 35,
    metalType: 'silver',
    category: 'coins',
    weight: { value: 1, unit: 'oz' },
    images: [{ url: '/images/silver.jpg', isMain: true }],
    location: { city: 'New York', state: 'NY' },
    seller: { name: 'Sarah Johnson', profilePicture: '', rating: 4.9 },
    isFeatured: false
  },
  {
    id: '3',
    title: '10 oz Gold Bar - PAMP Suisse',
    price: 26500,
    metalType: 'gold',
    category: 'bars',
    weight: { value: 10, unit: 'oz' },
    images: [{ url: '/images/hero/gold.jpg', isMain: true }],
    location: { city: 'Chicago', state: 'IL' },
    seller: { name: 'Mike Davis', profilePicture: '', rating: 5.0 },
    isFeatured: true
  },
  {
    id: '4',
    title: '1 oz Silver Round - Buffalo Design',
    price: 28,
    metalType: 'silver',
    category: 'rounds',
    weight: { value: 1, unit: 'oz' },
    images: [{ url: '/images/silver.jpg', isMain: true }],
    location: { city: 'Miami', state: 'FL' },
    seller: { name: 'Emily Brown', profilePicture: '', rating: 4.7 },
    isFeatured: false
  },
  {
    id: '5',
    title: 'Canadian Gold Maple Leaf 1 oz 2024',
    price: 2680,
    metalType: 'gold',
    category: 'coins',
    weight: { value: 1, unit: 'oz' },
    images: [{ url: '/images/hero/gold.jpg', isMain: true }],
    location: { city: 'Seattle', state: 'WA' },
    seller: { name: 'David Wilson', profilePicture: '', rating: 4.6 },
    isFeatured: false
  },
  {
    id: '6',
    title: '100 oz Silver Bar - Johnson Matthey',
    price: 2850,
    metalType: 'silver',
    category: 'bars',
    weight: { value: 100, unit: 'oz' },
    images: [{ url: '/images/silver.jpg', isMain: true }],
    location: { city: 'Boston', state: 'MA' },
    seller: { name: 'Lisa Anderson', profilePicture: '', rating: 4.9 },
    isFeatured: false
  }
];

export default function Marketplace() {
  const [listings] = useState(SAMPLE_LISTINGS);
  const [filters, setFilters] = useState({
    metalType: '',
    category: '',
    search: ''
  });

  const filteredListings = useMemo(() => {
    let filtered = listings;

    if (filters.metalType) {
      filtered = filtered.filter(l => l.metalType === filters.metalType);
    }

    if (filters.category) {
      filtered = filtered.filter(l => l.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(searchLower) ||
        l.location.city.toLowerCase().includes(searchLower) ||
        l.location.state.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [filters, listings]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-zinc-200/90 bg-white/70 backdrop-blur-sm">
        <div className="container-custom py-12">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Browse Marketplace
          </h1>
          <p className="text-sm text-zinc-600 md:text-base">
            Discover precious metals from trusted local sellers
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FunnelIcon className="w-5 h-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                </div>

                <div className="space-y-6">
                  {/* Metal Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Metal Type
                    </label>
                    <select
                      className="select-field"
                      value={filters.metalType}
                      onChange={(e) => setFilters({ ...filters, metalType: e.target.value })}
                    >
                      <option value="">All Metals</option>
                      <option value="gold">Gold</option>
                      <option value="silver">Silver</option>
                      <option value="platinum">Platinum</option>
                      <option value="palladium">Palladium</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      className="select-field"
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                      <option value="">All Categories</option>
                      <option value="bars">Bars</option>
                      <option value="coins">Coins</option>
                      <option value="rounds">Rounds</option>
                      <option value="jewelry">Jewelry</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {(filters.metalType || filters.category || filters.search) && (
                    <button
                      onClick={() => setFilters({ metalType: '', category: '', search: '' })}
                      className="w-full text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <main className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for gold, silver, platinum..."
                  className="input-field pl-12"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} found
              </p>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <MagnifyingGlassIcon />
                </div>
                <h3 className="empty-state-title">No listings found</h3>
                <p className="empty-state-description">
                  Try adjusting your search filters
                </p>
                <button
                  onClick={() => setFilters({ metalType: '', category: '', search: '' })}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
