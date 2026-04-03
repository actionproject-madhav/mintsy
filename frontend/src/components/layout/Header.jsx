import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bars3Icon, XMarkIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const shell = isHome
    ? 'border-b border-white/10 bg-zinc-950/35 backdrop-blur-xl'
    : 'border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl shadow-sm';

  const link = isHome
    ? 'text-zinc-300 hover:text-white'
    : 'text-zinc-600 hover:text-zinc-900';

  const iconBtn = isHome
    ? 'text-zinc-300 hover:text-white hover:bg-white/10'
    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100';

  const mobileNav = isHome
    ? 'border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl'
    : 'border-t border-zinc-200 bg-white';

  const mobileLink = isHome
    ? 'text-zinc-200 hover:bg-white/10'
    : 'text-zinc-600 hover:bg-zinc-50';

  const primaryCta = isHome
    ? 'inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 shadow-sm transition hover:bg-zinc-100'
    : 'btn-primary text-sm';

  return (
    <header className={`sticky top-0 z-50 transition-colors ${shell}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-semibold tracking-tight ${isHome ? 'text-white' : 'text-zinc-900'}`}>
              Mintsy
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/marketplace" className={`text-sm font-medium transition ${link}`}>
              Marketplace
            </Link>
            <Link to="/college" className={`text-sm font-medium transition ${link}`}>
              College
            </Link>
            <Link to="/education" className={`text-sm font-medium transition ${link}`}>
              Learn
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className={`text-sm font-medium transition px-2 ${link}`}>
                  Sign In
                </Link>
                <Link to="/signup" className={primaryCta}>
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to="/create-listing" className={primaryCta}>
                  Create Listing
                </Link>
                <Link to="/messages" className={`p-2 rounded-lg transition ${iconBtn}`}>
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                </Link>

                <div className="relative group">
                  <button className={`flex items-center gap-2 p-2 rounded-lg transition ${iconBtn}`}>
                    <img
                      src={user.profilePicture || '/images/default-avatar.png'}
                      alt=""
                      className="w-8 h-8 rounded-full border border-zinc-300/80"
                    />
                    <span className={`text-sm font-semibold ${isHome ? 'text-white' : 'text-zinc-900'}`}>
                      {user.name?.split(' ')[0]}
                    </span>
                  </button>

                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                    <div className="px-4 py-3 border-b border-zinc-100">
                      <p className="text-sm font-semibold text-zinc-900">{user.name}</p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                      {user.isPremium && (
                        <span className="badge-gold mt-2 inline-block">Premium Member</span>
                      )}
                    </div>
                    <div className="py-2">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition">
                        My Profile
                      </Link>
                      <Link to="/my-listings" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition">
                        My Listings
                      </Link>
                      {!user.isPremium && (
                        <Link to="/premium" className="block px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition">
                          Upgrade to Premium
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition ${iconBtn}`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden py-4 ${mobileNav}`}>
            <nav className="flex flex-col gap-1">
              <Link to="/marketplace" className={`px-4 py-2 rounded-lg transition ${mobileLink}`} onClick={() => setMobileMenuOpen(false)}>
                Marketplace
              </Link>
              <Link to="/college" className={`px-4 py-2 rounded-lg transition ${mobileLink}`} onClick={() => setMobileMenuOpen(false)}>
                College
              </Link>
              <Link to="/education" className={`px-4 py-2 rounded-lg transition ${mobileLink}`} onClick={() => setMobileMenuOpen(false)}>
                Learn
              </Link>
              {user ? (
                <>
                  <Link to="/create-listing" className={`mx-4 mt-2 text-center ${primaryCta}`} onClick={() => setMobileMenuOpen(false)}>
                    Create Listing
                  </Link>
                  <Link to="/messages" className={`px-4 py-2 rounded-lg transition ${mobileLink}`} onClick={() => setMobileMenuOpen(false)}>
                    Messages
                  </Link>
                  <Link to="/profile" className={`px-4 py-2 rounded-lg transition ${mobileLink}`} onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="mx-4 mt-2 text-left px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`px-4 py-2 rounded-lg transition ${mobileLink}`} onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/signup" className={`mx-4 mt-2 text-center ${primaryCta}`} onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
