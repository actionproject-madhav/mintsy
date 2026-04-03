import CreateListingForm from '../components/listing/CreateListingForm';

export default function CreateListing() {
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
