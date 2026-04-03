import { useState, useEffect, useMemo } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import ListingCard from '../components/marketplace/ListingCard';
import * as listingService from '../services/listingService';

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [filters, setFilters] = useState({
    metalType: '',
    category: '',
    search: '',
  });

  /** Server-side filters: GET /api/listings?metalType&category&search */
  const queryParams = useMemo(() => {
    const p = {};
    if (filters.metalType) p.metalType = filters.metalType;
    if (filters.category) p.category = filters.category;
    if (filters.search.trim()) p.search = filters.search.trim();
    return p;
  }, [filters.metalType, filters.category, filters.search]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const data = await listingService.getListings(queryParams);
        if (!cancelled) {
          setListings(Array.isArray(data?.listings) ? data.listings : []);
        }
      } catch (e) {
        if (!cancelled) {
          setListings([]);
          setLoadError(
            e?.response?.data?.message || e?.message || 'Could not load listings.'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    const t = setTimeout(load, filters.search ? 350 : 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [queryParams]);

  const filteredListings = listings;

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
                {loading
                  ? 'Loading…'
                  : `${filteredListings.length} ${filteredListings.length === 1 ? 'listing' : 'listings'} found`}
              </p>
              {loadError && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {loadError}
                </p>
              )}
            </div>

            {/* Listings Grid */}
            {!loading && filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            ) : !loading ? (
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-xl bg-zinc-200/80" />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
