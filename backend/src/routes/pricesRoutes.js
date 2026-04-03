const express = require('express');
const router = express.Router();
const pricesController = require('../controllers/pricesController');

router.get('/spot', pricesController.getSpot);
router.get('/history', pricesController.getMetalHistory);

module.exports = router;
