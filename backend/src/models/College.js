const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  shortName: String,
  emailDomain: { type: String, required: true, unique: true },
  location: {
    city: String,
    state: String,
    country: { type: String, default: 'USA' }
  },
  logo: String,
  isActive: { type: Boolean, default: true },
  studentCount: { type: Number, default: 0 },
  listingCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);
