const mongoose = require('mongoose');

/**
 * Stored in MongoDB collection: "users"
 * Created automatically on first Google sign-in (no manual "create table").
 */
const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String, maxlength: 500 },
    location: {
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'USA' },
    },
    isStudent: { type: Boolean, default: false },
    /** Free-text school name from profile (separate from `college` ref when linked to a College doc) */
    studentCollegeName: { type: String, trim: true, maxlength: 200 },
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    studentVerified: { type: Boolean, default: false },
    preferredMetals: [{ type: String, enum: ['gold', 'silver', 'platinum', 'palladium', 'copper', 'other'] }],
    isPremium: { type: Boolean, default: false },
    premiumExpiresAt: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    totalListings: { type: Number, default: 0 },
    activeListings: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    lastLogin: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
