# Mintsy Backend - MongoDB & Authentication Setup Guide

##  What's Already Done

All the backend code is **already written and configured**! You just need to:
1. Install MongoDB
2. Get Google OAuth credentials
3. Update environment variables
4. Start the servers

---

##  Step 1: Install MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (Free tier - M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. In Atlas, open **Connect** → **Drivers** and copy the SRV connection string (Atlas shows your host and user; the password is the one you set for the DB user).
6. Paste that value only into `backend/.env` as `MONGODB_URI` (never commit `.env`, and do not paste real connection strings into docs or READMEs).

### Option B: MongoDB Local (Development)

**Mac (using Homebrew):**
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Verify it's running
mongosh
```

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will start automatically as a service

**Linux (Ubuntu):**
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

##  Step 2: Get Google OAuth Credentials

### Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Name: "Mintsy"
   - Click "Create"

3. **Enable Google+ API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Configure consent screen if prompted:
     - User Type: External
     - App name: Mintsy
     - User support email: your email
     - Developer contact: your email
     - Save and Continue (skip optional fields)

5. **Create OAuth Client**
   - Application type: "Web application"
   - Name: "Mintsy Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - `https://yourdomain.com` (production - add later)
   - Authorized redirect URIs:
     - `http://localhost:5173`
     - `https://yourdomain.com` (production - add later)
   - Click "Create"

6. **Copy Your Credentials**
   - You'll see a popup with:
     - **Client ID** (starts with something like `123456789-abc...googleusercontent.com`)
     - **Client Secret** (looks like `GOCSPX-abc123...`)
   - Save these somewhere safe!

---

##  Step 3: Update Environment Variables

### Backend (.env)

Open `/backend/.env` and update:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# MongoDB - Update this!
MONGODB_URI=mongodb://localhost:27017/mintsy
# OR for MongoDB Atlas:
# For Atlas, set MONGODB_URI in .env from the Atlas “Connect” dialog only — not here.

# JWT - Change this to a random secret!
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random
JWT_EXPIRE=7d

# Google OAuth - Add your credentials!
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE

# Stripe - Get from your friend later
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_FEATURED_LISTING_PRICE_ID=price_...
STRIPE_PREMIUM_SUBSCRIPTION_PRICE_ID=price_...

# Cloudinary - Optional for now
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Generate a secure JWT secret:**
```bash
# Run this in terminal to generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend (.env.local)

Open `/frontend/.env.local` and update:

```env
VITE_API_URL=http://localhost:5000/api

# Google OAuth - Same Client ID as backend!
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE

# Stripe - Get from your friend later
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Cloudinary - Optional for now
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

##  Step 4: Start the Servers

### Terminal 1 - Backend
```bash
cd /Users/madhav/mintsy/backend
npm run dev
```

You should see:
```
Server running on port 5000
 MongoDB Connected: localhost
```

### Terminal 2 - Frontend
```bash
cd /Users/madhav/mintsy/frontend
npm run dev
```

You should see:
```
VITE v8.0.0  ready in 157 ms
➜  Local:   http://localhost:5173/
```

---

##  Step 5: Test Authentication

1. **Open your browser:** http://localhost:5173/

2. **Click "Sign In" or "Login"**
   - You should see a Google login button

3. **Click "Sign in with Google"**
   - A Google popup should appear
   - Choose your Google account
   - You'll be redirected back to Mintsy

4. **Check if you're logged in**
   - Your profile picture should appear in the header
   - Open browser console (F12) and run:
     ```javascript
     localStorage.getItem('token')
     ```
   - You should see a JWT token

5. **Check the database**
   ```bash
   mongosh
   use mintsy
   db.users.find().pretty()
   ```
   - You should see your user record!

---

##  Backend File Structure

Everything is already created in these folders:

```
backend/
├── .env                          ← Update this with your credentials
├── server.js                     ← Main server file (already configured)
├── package.json                  ← Dependencies (already installed)
│
├── src/
│   ├── config/
│   │   ├── database.js          ← MongoDB connection
│   │   └── oauth.js             ← Google OAuth verification
│   │
│   ├── models/
│   │   ├── User.js              ← User schema (Google OAuth fields)
│   │   ├── Listing.js           ← Listing schema
│   │   ├── Message.js           ← Message schema
│   │   └── Conversation.js      ← Conversation schema
│   │
│   ├── controllers/
│   │   ├── authController.js    ← Login, getMe endpoints
│   │   ├── listingController.js ← CRUD for listings
│   │   ├── messageController.js ← Messaging functionality
│   │   └── stripeController.js  ← Payment handling
│   │
│   ├── routes/
│   │   ├── authRoutes.js        ← /api/auth/google, /api/auth/me
│   │   ├── listingRoutes.js     ← /api/listings/*
│   │   ├── messageRoutes.js     ← /api/messages/*
│   │   └── stripeRoutes.js      ← /api/stripe/*
│   │
│   ├── middleware/
│   │   └── authMiddleware.js    ← JWT verification (protect routes)
│   │
│   └── utils/
│       └── jwtHelper.js         ← Generate JWT tokens
```

---

##  API Endpoints Available

### Authentication
- `POST /api/auth/google` - Login with Google token
- `GET /api/auth/me` - Get current user (requires auth)

### Listings (implemented)
- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (requires auth)
- `PUT /api/listings/:id` - Update listing (requires auth)
- `DELETE /api/listings/:id` - Delete listing (requires auth)

### Messages (implemented)
- `GET /api/messages/conversations` - Get user conversations (requires auth)
- `GET /api/messages/:conversationId` - Get messages (requires auth)
- `POST /api/messages` - Send message (requires auth)

### Stripe (implemented)
- `POST /api/stripe/create-featured-listing-payment` - Create payment
- `POST /api/stripe/create-premium-subscription` - Subscribe
- `POST /api/stripe/webhook` - Handle webhooks

---

##  Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB Connection Error: connect ECONNREFUSED`

**Fix:**
```bash
# Mac
brew services restart mongodb-community@7.0

# Linux
sudo systemctl restart mongod

# Windows
net start MongoDB
```

### Google OAuth Error

**Error:** `Invalid Google token` or `redirect_uri_mismatch`

**Fix:**
1. Check that `GOOGLE_CLIENT_ID` matches in both frontend and backend `.env`
2. Go to Google Cloud Console → Credentials
3. Edit your OAuth Client
4. Make sure `http://localhost:5173` is in Authorized JavaScript origins

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Fix:**
```bash
# Find what's using port 5000
lsof -ti:5000

# Kill it
kill -9 $(lsof -ti:5000)

# Or change the port in backend/.env
PORT=5001
```

---

##  Verification Checklist

- [ ] MongoDB is running (local or Atlas)
- [ ] Backend `.env` has Google credentials
- [ ] Frontend `.env.local` has Google Client ID
- [ ] Backend server starts without errors
- [ ] Frontend connects to backend API
- [ ] Google login button appears
- [ ] Can log in with Google
- [ ] JWT token is stored in localStorage
- [ ] User data appears in MongoDB
- [ ] Header shows user profile picture

---

##  Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  googleId: String (unique),
  email: String (unique),
  name: String,
  profilePicture: String (Google profile pic URL),
  bio: String,
  location: { city, state, zipCode, country },
  isStudent: Boolean,
  college: ObjectId (ref College),
  studentVerified: Boolean,
  isPremium: Boolean,
  premiumExpiresAt: Date,
  stripeCustomerId: String,
  totalListings: Number,
  rating: Number,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

##  Next Steps

1. **Test authentication flow** 
2. **Get Stripe keys from your friend** (for payments)
3. **Set up Cloudinary** (for image uploads)
4. **Deploy to production** (Vercel + Railway/Render)

---

## 💡 Quick Commands Reference

```bash
# Backend
cd /Users/madhav/mintsy/backend
npm run dev              # Start with nodemon (auto-reload)
npm start                # Start production

# Frontend
cd /Users/madhav/mintsy/frontend
npm run dev              # Start Vite dev server
npm run build            # Build for production

# MongoDB
mongosh                  # Open MongoDB shell
use mintsy               # Switch to mintsy database
db.users.find()          # View all users
db.users.deleteMany({})  # Clear all users (testing)
show dbs                 # List databases
show collections         # List collections

# Check logs
tail -f backend.log      # If you have logging
```

---

##  Need Help?

- MongoDB Docs: https://www.mongodb.com/docs/
- Google OAuth Guide: https://developers.google.com/identity/protocols/oauth2
- JWT Docs: https://jwt.io/introduction
- Express.js Guide: https://expressjs.com/

Everything is already coded - you just need to:
1. Install MongoDB
2. Get Google OAuth credentials
3. Update environment variables
4. Run `npm run dev` in both folders!
