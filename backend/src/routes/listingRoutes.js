const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', listingController.getListings);
router.get('/user', protect, listingController.getUserListings);
router.get('/:id', listingController.getListingById);
router.post('/', protect, listingController.createListing);
router.put('/:id', protect, listingController.updateListing);
router.delete('/:id', protect, listingController.deleteListing);

module.exports = router;
