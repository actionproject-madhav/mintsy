const Listing = require('../models/Listing');
const User = require('../models/User');

/** Only these fields may come from the client; seller / status / featured are server-controlled. */
const CREATE_FIELDS = new Set([
  'title',
  'description',
  'metalType',
  'category',
  'weight',
  'purity',
  'price',
  'priceType',
  'images',
  'location',
  'shippingAvailable',
  'localPickupOnly',
  'collegeOnly',
  'college',
]);

exports.createListing = async (req, res) => {
  try {
    const body = req.body || {};
    const raw = {};
    for (const key of CREATE_FIELDS) {
      if (body[key] !== undefined) raw[key] = body[key];
    }

    const title = String(raw.title || '').trim();
    const description = String(raw.description || '').trim();
    const purity = String(raw.purity || '').trim();
    const price = Number(raw.price);
    const wVal = Number(raw.weight?.value);
    const wUnit = raw.weight?.unit || 'oz';

    if (!title || !description || !purity) {
      return res.status(400).json({ success: false, message: 'Title, description, and purity are required.' });
    }
    if (!Number.isFinite(price) || price < 0) {
      return res.status(400).json({ success: false, message: 'Valid price is required.' });
    }
    if (!Number.isFinite(wVal) || wVal <= 0) {
      return res.status(400).json({ success: false, message: 'Valid weight is required.' });
    }
    if (!Array.isArray(raw.images) || raw.images.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image is required.' });
    }

    const hasMain = raw.images.some((img) => img && img.isMain);
    const images = raw.images.map((img, i) => ({
      url: String(img?.url || '').trim(),
      publicId: String(img?.publicId || '').trim(),
      isMain: Boolean(img?.isMain) || (!hasMain && i === 0),
    }));

    if (images.some((im) => !im.url)) {
      return res.status(400).json({ success: false, message: 'Each image must include a URL.' });
    }

    const listing = await Listing.create({
      seller: req.user.id,
      title,
      description,
      metalType: raw.metalType,
      category: raw.category,
      weight: { value: wVal, unit: wUnit },
      purity,
      price,
      priceType: raw.priceType === 'negotiable' ? 'negotiable' : 'fixed',
      images,
      location: {
        city: String(raw.location?.city || '').trim(),
        state: String(raw.location?.state || '').trim(),
        zipCode: String(raw.location?.zipCode || '').trim(),
      },
      shippingAvailable: Boolean(raw.shippingAvailable),
      localPickupOnly: raw.localPickupOnly !== false,
      collegeOnly: Boolean(raw.collegeOnly),
      college: raw.college || undefined,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalListings: 1, activeListings: 1 },
    });

    res.status(201).json({ success: true, listing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const { metalType, category, minPrice, maxPrice, state, search } = req.query;
    let query = { status: 'active' };

    if (metalType) query.metalType = metalType;
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (state) query['location.state'] = state;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const listings = await Listing.find(query)
      .populate('seller', 'name profilePicture rating')
      .sort({ isFeatured: -1, createdAt: -1 });

    res.json({ success: true, count: listings.length, listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('seller', 'name profilePicture rating bio')
      .populate('college', 'name shortName');

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    listing.views += 1;
    await listing.save();

    res.json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    listing.status = 'removed';
    await listing.save();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { activeListings: -1 },
    });

    res.json({ success: true, message: 'Listing removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserListings = async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user.id });
    res.json({ success: true, listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
