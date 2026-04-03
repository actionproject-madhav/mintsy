# Mintsy Marketplace - Complete Implementation Plan

## 📋 Important Documents

**READ FIRST:** `/Users/madhav/mintsy/DESIGN_SYSTEM.md` - Complete design guide with colors, assets, animations, and professional recommendations!

## Overview
Professional precious metals marketplace rebuilt from scratch with React + Vite, Express.js, MongoDB, Tailwind CSS, Google OAuth, and Stripe integration.

**Design:** Clean white theme with premium gold accents - modern fintech aesthetic (Stripe/Coinbase style).

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Express.js + Node.js
- **Database**: MongoDB + Mongoose
- **Styling**: Tailwind CSS (JM Bullion inspired)
- **Authentication**: Google OAuth + JWT
- **Payments**: Stripe ($0.99 featured listings, $4.99/mo premium)
- **Image Storage**: Cloudinary
- **Deployment**: Vercel (frontend), Railway/Render (backend)

## Design System (Clean & Professional - UPDATED)

**IMPORTANT:** See `/Users/madhav/mintsy/DESIGN_SYSTEM.md` for complete design guide with all assets!

### Colors (Clean White Theme)
```javascript
// Background
background: '#FFFFFF'      // Pure white
surface: '#F8F9FA'        // Light gray for cards

// Text
text-primary: '#1A1A1A'   // Almost black
text-secondary: '#6B7280' // Gray
text-tertiary: '#9CA3AF'  // Light gray

// Gold Accent (Premium feel)
gold: '#D4AF37'           // Premium gold
gold-light: '#F4E5C3'     // Light gold backgrounds
gold-dark: '#B8941F'      // Darker gold hover

// Borders
border-light: '#E5E7EB'   // Light borders
```

### Typography
**Primary Font:** Inter (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Theme
Clean white backgrounds, premium gold accents, professional typography, modern fintech aesthetic (like Stripe/Coinbase)

---

## Project Structure

```
mintsy/
├── frontend/                 # React + Vite
│   ├── public/
│   │   └── images/
│   │       ├── hero/        # Hero background images
│   │       ├── categories/  # Category placeholder images
│   │       └── placeholders/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # Button, Input, Modal, Card
│   │   │   ├── layout/      # Header, Footer, MegaMenu
│   │   │   ├── marketplace/ # ListingCard, Filters, Search
│   │   │   ├── listing/     # CreateForm, ImageUpload
│   │   │   ├── profile/     # ProfileEdit, MyListings
│   │   │   ├── messaging/   # MessageList, MessageThread
│   │   │   ├── home/        # Hero, LivePriceWidget
│   │   │   └── auth/        # GoogleLoginButton
│   │   ├── pages/           # Home, Marketplace, Profile, etc.
│   │   ├── context/         # AuthContext, ToastContext
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Constants, validators
│   └── vercel.json
│
└── backend/                  # Express.js API
    ├── src/
    │   ├── models/          # User, Listing, Message, etc.
    │   ├── controllers/     # Business logic
    │   ├── routes/          # API routes
    │   ├── middleware/      # Auth, error handling
    │   ├── config/          # DB, Stripe, Cloudinary
    │   └── services/        # External APIs
    └── server.js
```

---

## Implementation Steps

### Phase 1: Initial Setup (Days 1-2)

#### 1. Create Frontend
```bash
cd /Users/madhav/mintsy
npm create vite@latest frontend -- --template react
cd frontend
npm install react-router-dom axios @stripe/stripe-js @stripe/react-stripe-js @react-oauth/google react-hot-toast date-fns clsx @heroicons/react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Add to `frontend/index.html` in `<head>`:**
```html
<!-- Google Fonts - Inter -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

#### 2. Create Backend
```bash
cd /Users/madhav/mintsy
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors jsonwebtoken bcryptjs google-auth-library stripe cloudinary multer express-validator helmet express-rate-limit morgan axios
npm install -D nodemon
```

#### 3. Configure Tailwind (`frontend/tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4E5C3',
          dark: '#B8941F',
        },
        metal: {
          gold: '#FFD700',
          silver: '#C0C0C0',
          platinum: '#E5E4E2',
          copper: '#B87333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'gold': '0 4px 6px -1px rgb(212 175 55 / 0.3)',
        'gold-lg': '0 10px 15px -3px rgb(212 175 55 / 0.4)',
      },
    },
  },
  plugins: [],
}
```

#### 4. Main CSS (`frontend/src/assets/styles/index.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900 font-sans;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  /* Primary Gold Button */
  .btn-primary {
    @apply bg-gradient-to-br from-gold to-gold-dark text-white font-semibold py-3 px-8 rounded-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200;
  }

  /* Secondary Outline Button */
  .btn-secondary {
    @apply border-2 border-gold text-gold font-semibold py-2.5 px-8 rounded-lg hover:bg-gold-light transition-all duration-200;
  }

  /* Ghost Button */
  .btn-ghost {
    @apply text-gray-600 font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200;
  }

  /* Input Field */
  .input-field {
    @apply w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all duration-200;
  }

  /* Card */
  .card {
    @apply bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gold hover:shadow-lg hover:-translate-y-1 transition-all duration-300;
  }

  /* Featured Card */
  .card-featured {
    @apply bg-white rounded-xl border-2 border-gold shadow-gold overflow-hidden hover:shadow-gold-lg hover:-translate-y-1 transition-all duration-300;
  }

  /* Gold Gradient Text */
  .text-gradient-gold {
    @apply bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent;
  }
}
```

#### 5. Environment Variables

**Frontend (`.env.local`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

**Backend (`.env`):**
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/mintsy
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_FEATURED_LISTING_PRICE_ID=price_xxx
STRIPE_PREMIUM_SUBSCRIPTION_PRICE_ID=price_xxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
METALS_API_KEY=your_metals_api_key
```

---

### Phase 2: Database Models (Days 3-4)

#### Critical Models

**1. User Model (`backend/src/models/User.js`)**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profilePicture: String,
  bio: { type: String, maxlength: 500 },
  location: {
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  isStudent: { type: Boolean, default: false },
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
  lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

**2. Listing Model (`backend/src/models/Listing.js`)**
```javascript
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
```

**3. Message Model (`backend/src/models/Message.js`)**
```javascript
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 1000 },
  read: { type: Boolean, default: false },
  readAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
```

**4. Conversation Model (`backend/src/models/Conversation.js`)**
```javascript
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  lastMessageAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
```

**5. College Model (`backend/src/models/College.js`)**
```javascript
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
```

---

### Phase 3: Authentication (Days 5-6)

#### Google OAuth Setup

1. **Google Cloud Console:**
   - Create project at https://console.cloud.google.com
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized origins: `http://localhost:5173`, `https://mintsy.com`

2. **Backend Auth Controller (`backend/src/controllers/authController.js`)**
```javascript
const { verifyGoogleToken } = require('../config/oauth');
const { generateToken } = require('../utils/jwtHelper');
const User = require('../models/User');

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const googleUser = await verifyGoogleToken(token);

    let user = await User.findOne({ googleId: googleUser.sub });

    if (!user) {
      user = await User.create({
        googleId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        profilePicture: googleUser.picture,
        lastLogin: new Date()
      });
    } else {
      user.lastLogin = new Date();
      await user.save();
    }

    const jwtToken = generateToken(user._id);

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isPremium: user.isPremium
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```

3. **Frontend Auth Context (`frontend/src/context/AuthContext.jsx`)**
```javascript
import { createContext, useState, useEffect } from 'react';
import * as authService from '@services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await authService.getMe();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (googleToken) => {
    const { token, user } = await authService.googleLogin(googleToken);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### Phase 4: Core API Routes (Days 7-10)

#### Listing Routes

**Backend Controller** (`backend/src/controllers/listingController.js`):
- `createListing` - Create new listing
- `getListings` - Get all listings with filters (metalType, category, price range, state, search)
- `getListingById` - Get single listing + increment views
- `updateListing` - Update own listing
- `deleteListing` - Soft delete (set status to 'removed')
- `getUserListings` - Get user's own listings

**Frontend Service** (`frontend/src/services/listingService.js`):
```javascript
import api from './api';

export const createListing = async (data) => {
  const response = await api.post('/listings', data);
  return response.data.listing;
};

export const getListings = async (filters) => {
  const response = await api.get('/listings', { params: filters });
  return response.data;
};

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data.listing;
};
```

---

### Phase 5: Stripe Integration (Days 11-12)

#### Setup Steps

1. **Create Stripe Account** at https://stripe.com
2. **Create Products:**
   - Featured Listing: $0.99 one-time
   - Premium Subscription: $4.99/month recurring
3. **Get Price IDs** from Stripe dashboard

#### Stripe Controller (`backend/src/controllers/stripeController.js`)

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createFeaturedListingPayment = async (req, res) => {
  const { listingId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_FEATURED_LISTING_PRICE_ID,
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/listing/${listingId}?featured=success`,
    cancel_url: `${process.env.FRONTEND_URL}/listing/${listingId}`,
    metadata: { listingId, userId: req.user._id.toString() }
  });

  res.json({ url: session.url });
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === 'checkout.session.completed' && event.data.object.mode === 'payment') {
    await Listing.findByIdAndUpdate(event.data.object.metadata.listingId, {
      isFeatured: true,
      featuredExpiresAt: new Date(Date.now() + 30*24*60*60*1000)
    });
  }

  res.json({ received: true });
};
```

#### Webhook Setup

**Local Development:**
```bash
stripe listen --forward-to localhost:5000/api/stripe/webhook
```

**Production:**
Configure in Stripe Dashboard → Webhooks → Add endpoint

---

### Phase 6: Frontend Components (Days 13-18)

#### Key Components

**1. Header (`frontend/src/components/layout/Header.jsx`)**
- Logo linking to home
- Navigation: Buy, Marketplace, College, Learn
- User menu with profile, listings, premium, logout
- Google login button if not authenticated

**2. ListingCard (`frontend/src/components/marketplace/ListingCard.jsx`)**
- Display listing image, title, price, metal type
- Featured badge if applicable
- Seller info with rating
- Location
- Link to listing details

**3. CreateListingForm (`frontend/src/components/listing/CreateListingForm.jsx`)**
- Form fields: title, description, metal type, category
- Weight (value + unit), purity, price
- Image upload (max 6, set main image)
- Location (city, state, zip)
- Shipping options
- Submit creates listing via API

**4. ImageUpload (`frontend/src/components/listing/ImageUpload.jsx`)**
- Upload to Cloudinary
- Preview uploaded images
- Set main image
- Remove images
- Max 6 images

**5. LivePriceWidget (`frontend/src/components/home/LivePriceWidget.jsx`)**
- Fetch spot prices from API
- Display gold, silver, platinum, palladium prices per oz
- Update timestamp
- Color-coded by metal

**6. GoogleLoginButton (`frontend/src/components/auth/GoogleLoginButton.jsx`)**
```javascript
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@hooks/useAuth';

export default function GoogleLoginButton() {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    await login(credentialResponse.credential);
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
}
```

---

### Phase 7: Image Upload (Days 19-20)

#### Cloudinary Setup

1. **Create Account** at https://cloudinary.com
2. **Get Credentials**: Cloud name, API key, API secret
3. **Create Upload Preset**: Settings → Upload → Add upload preset (unsigned)

#### Frontend Service (`frontend/src/services/cloudinaryService.js`)
```javascript
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'mintsy/listings');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  const data = await response.json();
  return { url: data.secure_url, publicId: data.public_id };
};
```

---

### Phase 8: Deployment (Days 21-22)

#### Frontend (Vercel)

1. **Build:**
```bash
cd /Users/madhav/mintsy/frontend
npm run build
```

2. **Deploy:**
```bash
vercel --prod
```

3. **Set Environment Variables** in Vercel dashboard

#### Backend (Railway)

1. **Install CLI:**
```bash
npm install -g @railway/cli
```

2. **Deploy:**
```bash
cd /Users/madhav/mintsy/backend
railway login
railway init
railway up
```

3. **Set Environment Variables** in Railway dashboard

#### Database (MongoDB Atlas)

1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP: 0.0.0.0/0
4. Get connection string → add to backend env

#### Domain Setup

1. Purchase domain (e.g., mintsy.com)
2. Vercel: Add custom domain in settings
3. Configure DNS: CNAME → Vercel

---

## Image Placeholders & Assets

**COMPLETE GUIDE:** See `/Users/madhav/mintsy/DESIGN_SYSTEM.md` for detailed asset requirements!

### Quick Summary:

**Hero Background:**
- Search: "gold coins white background" on Unsplash
- Style: BRIGHT, CLEAN, professional (NOT dark)
- Size: 1920x1080px
- Alternative: Use light gradient background instead
- Path: `/public/images/hero/hero-bg.jpg`

**Category Images (400x400px each):**
- Gold: Professional gold bars, bright studio photography
- Silver: Silver coins on white background
- Platinum: Platinum bars, clean
- Jewelry: Gold jewelry on white background
- Path: `/public/images/categories/`

**Icons:**
- Use Heroicons (already in package.json)
- Professional, consistent, free

**Illustrations (Optional):**
- unDraw.co - Customize to gold color (#D4AF37)
- Storyset.com - Animated SVGs
- Use for empty states, How It Works section

**Lottie Animations (Optional - Premium Feel):**
- LottieFiles.com
- Loading states, success confirmations, upload animations
- Install: `npm install lottie-react`

**Logo:**
- Create in Canva or Figma
- Text: "Mintsy" in Inter Bold
- Color: Gold gradient
- Path: `/public/images/logo/`

---

## Quick Start Commands

```bash
# Setup
cd /Users/madhav/mintsy
npm create vite@latest frontend -- --template react
cd frontend && npm install && npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

cd ..
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors jsonwebtoken bcryptjs google-auth-library stripe cloudinary multer express-validator helmet express-rate-limit morgan axios
npm install -D nodemon

# Development
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - Stripe (when testing)
stripe listen --forward-to localhost:5000/api/stripe/webhook
```

---

## Testing Checklist

- [ ] Google OAuth login
- [ ] Create listing with images
- [ ] Browse listings with filters
- [ ] View listing details
- [ ] Send message to seller
- [ ] Featured listing payment
- [ ] Premium subscription
- [ ] Edit profile
- [ ] College marketplace (student only)
- [ ] Live spot prices display

---

## Critical Files Priority

1. `backend/src/models/User.js` - User schema
2. `backend/src/models/Listing.js` - Listing schema
3. `frontend/src/context/AuthContext.jsx` - Auth state
4. `frontend/tailwind.config.js` - Design system
5. `backend/src/controllers/listingController.js` - Core marketplace logic
6. `frontend/src/components/layout/Header.jsx` - Navigation
7. `frontend/src/components/marketplace/ListingCard.jsx` - Product display
8. `backend/src/controllers/stripeController.js` - Payments

---

## Notes

- No AI-like emojis in UI (removed from design)
- Professional dark navy theme throughout
- All forms use Tailwind utility classes
- Image uploads go to Cloudinary (not local storage)
- Stripe handles all payment processing
- JWT stored in localStorage
- MongoDB Atlas for production database
- Featured listings expire after 30 days
- Premium subscriptions are $4.99/month recurring
- College marketplace requires .edu email verification

---

## Design Inspiration Source

**JM Bullion** (https://www.jmbullion.com/)
- Professional dark blue theme
- Trust indicators (reviews, certifications)
- Live pricing widget
- Grid-based product layouts
- Mega menu navigation
- Clean typography with system fonts

---

## PAGE CONTENT & COPYWRITING

### Home Page

**Hero Section:**
- **Main Heading:** "Mintsy"
- **Subheading:** "Local Precious Metals Marketplace"
- **Tagline:** "Buy & Sell Precious Metals Locally"
- **Description:** "Connect with trusted local buyers and sellers of gold, silver, platinum, palladium, and rhodium. Safe transactions, competitive prices, right in your area."
- **CTA Buttons:**
  - "Browse Listings"
  - "View Spot Prices"

**Sign Up CTA:**
- **Heading:** "Ready to buy or sell?"
- **Description:** "Sign up to create listings and message sellers"
- **Button:** "Sign Up / Login"

**How It Works Section:**
- **Heading:** "How Mintsy Works"
- **Step 1:** "Create Account - Sign up with Google to get started"
- **Step 2:** "Browse or List - Find precious metals or create your own listing"
- **Step 3:** "Connect Locally - Message sellers and arrange safe, local transactions"
- **Step 4:** "Complete Transaction - Meet in public places for secure exchanges"

**Trust Indicators:**
- "Verified Sellers"
- "Safe Local Transactions"
- "Competitive Pricing"
- "Community Trusted"

---

### Marketplace Page

**Page Title:** "Marketplace"
**Description:** "Browse precious metals listings from local sellers"

**Search Placeholder:** "Search for gold, silver, platinum..."

**Filter Labels:**
- "Category" - All Metals
- "Seller Type" - All Sellers
- "State" - All States
- "Listing Type" - All Listings
- "Price Range" - $0 - $10,000
- "Weight Range (oz)" - 0 - 100 oz

**Empty State:**
- "No listings found"
- "Try adjusting your search filters"
- Button: "Clear Filters"

**Listing Count:** "X listings found"

---

### College Marketplace Page

**Page Title:** "Mintsy Student Marketplace"
**Tagline:** "Buy & Sell with Fellow Students"

**Hero Description:** "Connect with verified students at your college. Trade precious metals and jewelry safely within your campus community."

**CTA:** "Browse Campus Listings"

**Feature Sections:**

**1. Campus Community**
- **Icon:** 🎓
- **Title:** "Campus Community"
- **Description:** "Buy and sell exclusively with verified students from your college"

**2. Safe & Trusted**
- **Icon:** ✓
- **Title:** "Safe & Trusted"
- **Description:** "Meet on campus in public places for secure in-person transactions"

**3. Better Deals**
- **Icon:** 💰
- **Title:** "Better Deals"
- **Description:** "No shipping costs - negotiate face-to-face with fellow students"

**Call to Action:**
- **Heading:** "Join Your College Community"
- **Subheading:** "Sign up to trade with verified students at your school"
- **Button:** "Sign Up / Login"

**College Selector:**
- **Label:** "Select College"
- **Placeholder:** "Choose a college to view listings..."

**Search:** "All Jewelry Types"
**Search Placeholder:** "Search for gold, silver, platinum..."

**Empty State:**
- "0 listings"
- "No college listings yet"
- "Select a college to view listings"

---

### Create Listing Page

**Page Title:** "Create Listing"
**Subtitle:** "List your precious metals or jewelry for sale"

**Pro Tip Banner:**
"High-quality photos and detailed descriptions get 3x more inquiries!"

**Form Sections:**

**Basic Information:**
- **Title** (required) - "e.g., 1 oz American Gold Eagle - Brilliant Uncirculated"
- **Category** (required) - Select: Gold, Silver, Platinum, Palladium, Rhodium, Copper
- **Condition** (required) - Select: New, Like New, Good, Fair
- **Description** (required) - "Provide detailed information about your item: authenticity, certification, special features, history, etc."

**Item Details:**
- **Price (USD)** (required) - "$0.00"
- **Weight (troy oz)** (required) - "0.00"
- **Purity** - "e.g., .999, 24k, 18k, 14k"
- **Seller Type** (required) - Individual / Dealer

**Location:**
- **City** (required) - "e.g., Los Angeles"
- **State** (required) - Dropdown of all US states

**Photos:**
- **Label:** "Photos"
- **Instruction:** "Click to upload photos"
- **Limit:** "Add multiple photos for better visibility"
- **Note:** "Max 6 photos"

**Premium Featured Listing:**
- **Checkbox:** "Feature your listing at the top of search results for maximum visibility"
- **Price:** "$0.99 per listing"
- **Alternative:** "Or get unlimited featured listings FREE with Premium membership ($4.99/mo)"

**Buttons:**
- "Cancel"
- "Create Listing"

---

### My Listings Page

**Page Title:** "My Listings"
**Subtitle:** "Manage your precious metals listings"

**CTA Button:** "New Listing"

**Empty State:**
- **Heading:** "You haven't created any listings yet"
- **Description:** "Start selling your precious metals and jewelry today"
- **Button:** "Create Your First Listing"

---

### Messages Page

**Page Title:** "Messages"
**Subtitle:** "Communicate with buyers and sellers"

**Sidebar Heading:** "Conversations"

**Empty State (Sidebar):**
- "No messages yet"

**Main Panel:**
- **Heading:** "Select a conversation"
- **Description:** "Choose a conversation to start messaging"

---

### Profile Page

**Page Title:** "Profile"
**Subtitle:** "Manage your account information"

**User Info:**
- Name display
- Email display
- Account type badge (User / Premium)
- "Logout" button

**Form Sections:**

**Location Information:**
- **City:** "e.g., Los Angeles"
- **State:** Dropdown of US states

**Student Information:**
- **Checkbox:** "I am a current college student"
- **Description:** "Add your college to access the exclusive student marketplace and connect with fellow students."

**Preferred Metals & Jewelry:**
- **Description:** "Select your preferred precious metals and jewelry types. Other buyers and sellers will be able to see your preferences."
- **Options (checkboxes):**
  - Gold
  - Silver
  - Platinum
  - Palladium
  - Rhodium
  - Jewelry

**Seller Information:**
- **Seller Type:** Individual / Business
- **Phone Number:** "(555) 123-4567"
- **Bio / Business Description:** "Tell buyers about yourself or your business..."

**Save Button:** "Save Changes"

---

### Education / Knowledge Center Page

**Page Title:** "Knowledge Center"
**Subtitle:** "Master the precious metals market with expert insights"

**Section 1: Live Spot Prices**
- **Heading:** "Live Spot Prices"
- Display current prices for: Gold, Silver, Platinum, Palladium
- "Updated in real-time based on global market conditions"

**Section 2: Spot Price Guide**

**What is a spot price?**
"The current market price for immediate delivery of precious metals, fluctuating in real-time based on global market conditions."

"Spot prices are influenced by supply and demand, economic indicators, currency strength, and geopolitical events."

"Expect to pay a premium above spot when buying, and receive slightly below when selling to account for dealer margins."

**Pricing Factors:**

**Purity:**
"Higher purity commands premium prices. Look for .999+ for bullion, 24k/18k/14k/10k for jewelry."

**Weight:**
"Larger quantities offer better value per ounce. Measured in troy ounces (31.1g)."

**Brand & Form:**
"Government mints command higher premiums due to recognizability and trust."

**Section 3: Understanding Gold Karats**

**Introduction:**
"Karat (K or kt) is a measure of gold purity. Pure gold is 24 karats, meaning 24 out of 24 parts are gold. Lower karat values indicate gold mixed with other metals for durability and different colors."

**24K - 24 Karat Gold:**
- **Purity:** "99.9% Pure Gold"
- **European:** "999 hallmark"
- **Description:** "The purest form of gold available. Soft and malleable, rarely used in jewelry due to its softness. Ideal for investment bullion and coins."
- **Best for:** "Investment, bullion, coins"

**18K - 18 Karat Gold:**
- **Purity:** "75% Pure Gold"
- **European:** "750 hallmark"
- **Description:** "18 parts gold mixed with 6 parts other metals. Excellent balance of purity and durability. Popular for fine jewelry and luxury pieces."
- **Best for:** "Fine jewelry, luxury pieces"

**14K - 14 Karat Gold:**
- **Purity:** "58.3% Pure Gold"
- **European:** "585 hallmark"
- **Description:** "14 parts gold with 10 parts other metals. Most popular choice for everyday jewelry. Durable, affordable, and still valuable."
- **Best for:** "Everyday jewelry, engagement rings"

**10K - 10 Karat Gold:**
- **Purity:** "41.7% Pure Gold"
- **European:** "417 hallmark"
- **Description:** "10 parts gold with 14 parts other metals. Minimum gold content to be legally called 'gold' in the US. Most durable and affordable option."
- **Best for:** "Budget jewelry, active wear"

**Section 4: Precious Metals as an Investment**

**Introduction:**
"Precious metals have served as a store of value and hedge against economic uncertainty for thousands of years. Understanding their role in a diversified portfolio is essential for long-term wealth preservation and growth."

**Economic Growth Periods:**
- "During strong economic growth, industrial metals like silver, platinum, and palladium often perform well due to increased manufacturing demand"
- "Gold may underperform stocks but provides stability and portfolio balance"
- "Jewelry demand increases as consumer spending rises"

**Economic Downturns:**
- "Gold historically shines as a 'safe haven' asset when markets decline or during geopolitical uncertainty"
- "Precious metals often move inversely to stocks, providing portfolio protection"
- "Central bank purchases increase during uncertain times"

**Key Investment Benefits:**

**Inflation Hedge:**
"Precious metals maintain purchasing power as currencies devalue"

**Portfolio Diversification:**
"Low correlation with stocks and bonds reduces overall portfolio risk"

**Tangible Asset:**
"Physical ownership with no counterparty risk"

**Global Liquidity:**
"Universally recognized and easily convertible to cash worldwide"

**Long-Term Wealth Preservation:**
"Maintains value across generations and economic cycles"

**Crisis Insurance:**
"Historically performs well during financial and geopolitical crises"

**Recommended Allocation:**
"Financial advisors typically recommend allocating 5-15% of your investment portfolio to precious metals for optimal diversification and risk management."

**Note:** "This is general guidance. Consult with a financial advisor to determine the right allocation for your specific situation and goals."

**Section 5: Expert Trading Tips**

**For Buyers:**
- "Verify authenticity with certified testing before purchase"
- "Compare against live spot prices to ensure fair pricing"
- "Use secure payment methods and insured shipping"
- "Request certificates of authenticity when available"
- "Consider professional appraisal for high-value items"

**For Sellers:**
- "Price competitively based on current spot plus fair premium"
- "Provide high-quality photos from multiple angles"
- "Include all documentation and certificates available"
- "Be transparent about purity, weight, and condition"
- "Feature premium listings for maximum visibility"

---

### Premium / Subscription Page

**Page Title:** "Go Premium"

**Premium Benefits:**
- **Unlimited Featured Listings** - "Get your listings seen first, every time"
- **Priority Support** - "Get help faster with dedicated support"
- **Advanced Analytics** - "Track views, saves, and engagement on your listings"
- **No Transaction Fees** - "Save money on every sale"
- **Premium Badge** - "Stand out with a verified premium seller badge"

**Pricing:**
- **Price:** "$4.99/month"
- **Billing:** "Billed monthly, cancel anytime"
- **Alternative:** "Or pay $0.99 per featured listing individually"

**CTA Button:** "Start Premium Membership"

---

### Footer Content

**Company:**
- "About Mintsy"
- "How It Works"
- "Contact Us"
- "Careers"

**Resources:**
- "Knowledge Center"
- "Spot Prices"
- "Safety Tips"
- "FAQs"

**Legal:**
- "Terms of Service"
- "Privacy Policy"
- "Cookie Policy"

**Social Media:**
- Twitter
- Facebook
- Instagram

**Copyright:** "© 2026 Mintsy. All rights reserved."

**Tagline:** "Verified Platform • Trusted by collectors"

---

### Navigation Labels

**Main Navigation:**
- "Marketplace"
- "College Hub"
- "Create Listing"
- "My Listings"
- "Messages"
- "Education"
- "Profile"

**Mobile Menu:**
- "Sign In / Sign Up"
- Same as main navigation

---

### Notification/Toast Messages

**Success Messages:**
- "Listing created successfully!"
- "Profile updated successfully!"
- "Message sent!"
- "Featured listing activated!"
- "Premium subscription activated!"
- "Successfully logged in!"

**Error Messages:**
- "Failed to create listing. Please try again."
- "Failed to upload images. Please try again."
- "Login failed. Please try again."
- "Invalid email or password"
- "Maximum 6 images allowed"

**Info Messages:**
- "Uploading images..."
- "Processing payment..."
- "Loading..."

---

### Meta Tags & SEO

**Home Page:**
- **Title:** "Mintsy - Local Precious Metals Marketplace"
- **Description:** "Buy and sell gold, silver, platinum, and other precious metals locally. Connect with trusted buyers and sellers in your area."
- **Keywords:** "precious metals, gold, silver, platinum, local marketplace, buy gold, sell silver"

**Marketplace:**
- **Title:** "Browse Precious Metals - Mintsy Marketplace"
- **Description:** "Find gold, silver, platinum, and precious metals for sale from local sellers. Safe transactions, competitive prices."

**College Marketplace:**
- **Title:** "Student Marketplace - Buy & Sell with College Students | Mintsy"
- **Description:** "Exclusive marketplace for verified college students. Trade precious metals and jewelry safely within your campus community."

**Education:**
- **Title:** "Precious Metals Education - Knowledge Center | Mintsy"
- **Description:** "Learn about precious metals investing, spot prices, gold karats, and expert trading tips. Master the market with Mintsy."
