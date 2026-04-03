import { useState } from 'react';
import { useLottie } from 'lottie-react';
import ListingCard from '../components/marketplace/ListingCard';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import communityServicesAnimation from '../assets/lottie/community-services.json';
import shieldCheckAnimation from '../assets/lottie/shield-check.json';
import discountAnimation from '../assets/lottie/discount.json';

function LottieAnimation({ animationData, loop = true }) {
  const { View } = useLottie({ animationData, loop });
  return View;
}

export default function CollegeMarketplace() {
  const [selectedCollege, setSelectedCollege] = useState('');

  const colleges = [
    { id: '1', name: 'Harvard University' },
    { id: '2', name: 'Stanford University' },
    { id: '3', name: 'MIT' },
    { id: '4', name: 'UC Berkeley' },
    { id: '5', name: 'Yale University' },
    { id: '6', name: 'Princeton University' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Page-wide Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/images/college.avif"
          alt="College Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85"></div>
      </div>

      {/* Hero Section with College Image */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-6">
              <AcademicCapIcon className="w-10 h-10 text-gold" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              College Marketplace
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Buy & Sell with Fellow Students
            </p>
            <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with verified students at your college. Trade precious metals and jewelry safely within your campus community.
            </p>

            <div className="max-w-md mx-auto">
              <select
                className="input-field text-center py-4 bg-white/95 backdrop-blur font-semibold"
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
              >
                <option value="">Select Your College</option>
                {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container-custom py-16">
        {!selectedCollege ? (
          <div className="space-y-16">
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/60 backdrop-blur-sm p-8 text-center rounded-xl border border-gray-200/50">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <LottieAnimation animationData={communityServicesAnimation} loop={true} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Campus Community</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Buy and sell exclusively with verified students from your college
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-8 text-center rounded-xl border border-gray-200/50">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <LottieAnimation animationData={shieldCheckAnimation} loop={true} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Trusted</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Meet on campus in public places for secure in-person transactions
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-8 text-center rounded-xl border border-gray-200/50">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <LottieAnimation animationData={discountAnimation} loop={true} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Better Deals</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  No shipping costs - negotiate face-to-face with fellow students
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white/70 backdrop-blur-md p-12 rounded-2xl border border-gray-200/50 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join Your College Community
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Sign up to trade with verified students at your school
              </p>
              <button className="btn-primary text-lg">
                Sign Up / Login
              </button>
            </div>

            {/* How It Works */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                How College Marketplace Works
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Verify .edu Email', desc: 'Sign up with your college email address' },
                  { step: '2', title: 'Select Your College', desc: 'Choose your school from our list' },
                  { step: '3', title: 'Browse or List', desc: 'Find items or create your own listing' },
                  { step: '4', title: 'Meet On Campus', desc: 'Arrange safe meetups in public campus locations' }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-light text-gold-dark rounded-full font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Listings at {colleges.find(c => c.id === selectedCollege)?.name}
              </h2>
              <span className="text-sm text-gray-500 font-medium">
                0 active listings
              </span>
            </div>

            <div className="empty-state py-20">
              <div className="empty-state-icon">
                <AcademicCapIcon />
              </div>
              <h3 className="empty-state-title">No campus listings yet</h3>
              <p className="empty-state-description">
                Be the first student to list precious metals at your college!
              </p>
              <button className="btn-primary">
                Create Campus Listing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
