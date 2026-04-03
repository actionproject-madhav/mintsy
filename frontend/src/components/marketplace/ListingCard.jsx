import { Link } from 'react-router-dom';
import { MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function ListingCard({ listing }) {
  const { _id, id, title, price, metalType, images, location, seller, isFeatured, weight } = listing;
  const mainImage = images?.find(img => img.isMain)?.url || images?.[0]?.url || '/images/placeholders/no-image.svg';

  // Metal color mapping
  const metalColors = {
    gold: 'bg-amber-100 text-amber-800',
    silver: 'bg-gray-100 text-gray-800',
    platinum: 'bg-slate-100 text-slate-800',
    palladium: 'bg-zinc-100 text-zinc-800',
    copper: 'bg-orange-100 text-orange-800',
  };

  const metalColor = metalColors[metalType] || 'bg-gray-100 text-gray-800';

  return (
    <Link to={`/listing/${_id || id}`} className="block">
      <div className={isFeatured ? 'card-featured' : 'card'}>
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="badge-featured flex items-center space-x-1">
              <SparklesIcon className="w-3 h-3" />
              <span>Featured</span>
            </span>
          </div>
        )}

        {/* Image */}
        <div className="image-container aspect-square">
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Metal Type & Weight */}
          <div className="flex items-center justify-between mb-3">
            <span className={`badge ${metalColor}`}>
              {metalType?.toUpperCase() || 'METAL'}
            </span>
            {weight && (
              <span className="text-xs text-gray-500 font-medium">
                {weight.value} {weight.unit || 'oz'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ${price?.toLocaleString() || '0'}
            </span>
          </div>

          {/* Location & Seller */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <MapPinIcon className="w-3.5 h-3.5 mr-1" />
              <span>{location?.city}, {location?.state}</span>
            </div>

            {/* Seller Info */}
            {seller && (
              <div className="flex items-center space-x-1.5">
                <img
                  src={seller.profilePicture || '/images/placeholders/no-image.svg'}
                  alt={seller.name}
                  className="w-5 h-5 rounded-full border border-gray-200"
                />
                {seller.rating > 0 && (
                  <span className="text-xs text-gold font-semibold">
                    ★ {seller.rating.toFixed(1)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
