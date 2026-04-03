const Listing = require('../models/Listing');

let stripeSingleton = null;
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  if (!stripeSingleton) {
    stripeSingleton = require('stripe')(key);
  }
  return stripeSingleton;
}

exports.createFeaturedListingPayment = async (req, res) => {
  const stripe = getStripe();
  const priceId = process.env.STRIPE_FEATURED_LISTING_PRICE_ID?.trim();
  const frontend = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

  if (!stripe || !priceId) {
    return res.status(503).json({
      success: false,
      message: 'Payments are not configured. Set STRIPE_SECRET_KEY and STRIPE_FEATURED_LISTING_PRICE_ID.',
    });
  }

  try {
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${frontend}/listing/${listingId}?featured=success`,
      cancel_url: `${frontend}/listing/${listingId}`,
      metadata: { listingId: String(listingId), userId: String(req.user.id) },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  const stripe = getStripe();
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripe || !whSecret) {
    return res.status(503).send('Stripe webhook not configured');
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, whSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed' && event.data.object.mode === 'payment') {
    const listingId = event.data.object.metadata?.listingId;
    if (listingId) {
      await Listing.findByIdAndUpdate(listingId, {
        isFeatured: true,
        featuredExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  }

  res.json({ received: true });
};
