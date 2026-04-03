const Listing = require('../models/Listing');

exports.createListing = async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      seller: req.user.id
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
