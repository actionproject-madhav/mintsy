import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CreateListingForm from '../components/listing/CreateListingForm';

export default function CreateListing() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-zinc-600">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/create-listing' }} />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4">Create Listing</h1>
        <p className="text-xl text-gray-light italic">List your precious metals or jewelry for sale</p>
        
        <div className="bg-gold/5 border border-gold/10 p-6 rounded-xl mt-12 inline-block max-w-xl">
          <p className="text-gold text-sm font-bold uppercase tracking-wider">
            Pro Tip: High-quality photos and detailed descriptions get 3x more inquiries
          </p>
        </div>
      </div>

      <CreateListingForm />
    </div>
  );
}
