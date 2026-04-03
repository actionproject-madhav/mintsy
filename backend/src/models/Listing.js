const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },
  metalType: { type: String, required: true, enum: ['gold', 'silver', 'platinum', 'palladium', 'copper', 'other'] },
  category: { type: String, required: true, enum: ['bars', 'coins', 'rounds', 'jewelry', 'collectibles', 'scrap', 'nuggets', 'other'] },
  weight: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['oz', 'g', 'kg', 'lb', 'dwt'], default: 'oz' }
  },
  purity: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  priceType: { type: String, enum: ['fixed', 'negotiable'], default: 'fixed' },
  images: [{
    url: String,
    publicId: String,
    isMain: { type: Boolean, default: false }
  }],
  location: {
    city: String,
    state: String,
    zipCode: String
  },
  shippingAvailable: { type: Boolean, default: false },
  localPickupOnly: { type: Boolean, default: true },
  collegeOnly: { type: Boolean, default: false },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  isFeatured: { type: Boolean, default: false },
  featuredExpiresAt: Date,
  status: { type: String, enum: ['active', 'sold', 'expired', 'removed'], default: 'active' },
  views: { type: Number, default: 0 },
  expiresAt: { type: Date, default: () => new Date(+new Date() + 90*24*60*60*1000) }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
