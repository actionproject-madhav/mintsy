# Mintsy - Professional Design System & Asset Guide

## Design Philosophy
**Premium. Clean. Trustworthy.**

Think: Stripe, Coinbase, modern fintech - clean white backgrounds, subtle colors, professional typography, lots of whitespace.

---

## COLOR PALETTE (REVISED - CLEAN & PROFESSIONAL)

### Option A: Light & Clean (RECOMMENDED)

```css
/* Primary Colors */
--background: #FFFFFF              /* Pure white background */
--surface: #F8F9FA                 /* Light gray for cards/sections */
--surface-elevated: #FFFFFF        /* White elevated cards with shadow */

/* Text */
--text-primary: #1A1A1A            /* Almost black for headings */
--text-secondary: #6B7280          /* Gray for body text */
--text-tertiary: #9CA3AF           /* Light gray for subtle text */

/* Accent Colors */
--gold: #D4AF37                    /* Premium gold (not bright yellow) */
--gold-light: #F4E5C3              /* Light gold for backgrounds */
--gold-dark: #B8941F               /* Darker gold for hover states */

/* Metal Colors (for categories) */
--metal-gold: #FFD700              /* Bright gold for gold category */
--metal-silver: #C0C0C0            /* Silver */
--metal-platinum: #E5E4E2          /* Platinum */
--metal-copper: #B87333            /* Copper */

/* Semantic Colors */
--success: #10B981                 /* Green for success */
--error: #EF4444                   /* Red for errors */
--warning: #F59E0B                 /* Orange for warnings */
--info: #3B82F6                    /* Blue for info */

/* Borders & Dividers */
--border-light: #E5E7EB            /* Light gray borders */
--border-medium: #D1D5DB           /* Medium borders */
--border-dark: #9CA3AF             /* Darker borders */

/* Shadows */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);  /* sm */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* md */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); /* lg */
```

### Option B: Dark Accent Header (Optional for navigation only)

```css
/* Only for header/navigation bar */
--nav-background: #0F172A         /* Dark slate for nav */
--nav-text: #FFFFFF               /* White text in nav */
--nav-text-muted: #94A3B8         /* Muted text in nav */
```

---

## TYPOGRAPHY

### Font Families
```css
/* Primary Font (Headings & UI) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Alternative: */
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Numbers/Prices */
font-family: 'SF Mono', 'Roboto Mono', monospace; /* For prices */
```

**How to add:**
```html
<!-- Add to index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Font Sizes & Weights
```css
/* Headings */
--text-6xl: 60px;    /* Hero title */
--text-5xl: 48px;    /* Page titles */
--text-4xl: 36px;    /* Section headings */
--text-3xl: 30px;    /* Card headings */
--text-2xl: 24px;    /* Subheadings */
--text-xl: 20px;     /* Large text */

/* Body */
--text-lg: 18px;     /* Large body */
--text-base: 16px;   /* Body text */
--text-sm: 14px;     /* Small text */
--text-xs: 12px;     /* Labels, captions */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## SPACING SYSTEM

```css
/* Use consistent spacing */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

---

## COMPONENTS DESIGN

### Buttons

```css
/* Primary Button (Gold) */
background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%);
color: #FFFFFF;
padding: 12px 32px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
box-shadow: 0 4px 6px -1px rgb(212 175 55 / 0.3);
transition: all 0.2s;

hover: transform: translateY(-2px);
hover: box-shadow: 0 10px 15px -3px rgb(212 175 55 / 0.4);

/* Secondary Button (Outline) */
background: transparent;
border: 2px solid #D4AF37;
color: #D4AF37;
padding: 10px 32px;
border-radius: 8px;
font-weight: 600;

/* Ghost Button */
background: transparent;
color: #6B7280;
padding: 10px 24px;
border-radius: 8px;
font-weight: 500;

hover: background: #F8F9FA;
```

### Cards

```css
/* Listing Card */
background: #FFFFFF;
border: 1px solid #E5E7EB;
border-radius: 12px;
overflow: hidden;
transition: all 0.3s;

hover: border-color: #D4AF37;
hover: box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
hover: transform: translateY(-4px);

/* Featured Listing Card */
border: 2px solid #D4AF37;
box-shadow: 0 10px 15px -3px rgb(212 175 55 / 0.15);
```

### Input Fields

```css
background: #FFFFFF;
border: 1.5px solid #D1D5DB;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: #1A1A1A;

focus: border-color: #D4AF37;
focus: outline: none;
focus: box-shadow: 0 0 0 3px rgb(212 175 55 / 0.1);

placeholder: color: #9CA3AF;
```

### Navigation

```css
/* Clean white header (RECOMMENDED) */
background: #FFFFFF;
border-bottom: 1px solid #E5E7EB;
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05);

/* OR dark header (alternative) */
background: #0F172A;
color: #FFFFFF;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

---

## REQUIRED IMAGES & ASSETS

### 1. Hero Section Background
**What to get:**
- High-quality photo of gold coins/bars on clean surface
- Professional product photography style
- Light, bright, clean aesthetic
- NOT dark/moody

**Specifications:**
- Size: 1920x1080px minimum
- Format: JPG (optimized) or WebP
- Style: Clean, professional, bright
- Background: White or light gray

**Where to find:**
- Unsplash search: "gold coins white background"
- Pexels search: "gold bars studio photography"
- Specific suggestions:
  - https://unsplash.com/s/photos/gold-coins-white-background
  - https://unsplash.com/s/photos/precious-metals-clean

**File path:** `/frontend/public/images/hero/hero-bg.jpg`

**Alternative:** Use a subtle gradient background instead of photo:
```css
background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
```

---

### 2. Category Icons/Images

**Gold Category:**
- **Icon:** Gold bar icon or minimal gold coin illustration
- **Image:** Clean gold bars stacked
- **Path:** `/frontend/public/images/categories/gold.jpg`
- **Size:** 400x400px
- **Search:** "gold bars white background"

**Silver Category:**
- **Icon:** Silver coin icon
- **Image:** Silver coins arranged neatly
- **Path:** `/frontend/public/images/categories/silver.jpg`
- **Search:** "silver coins studio photography"

**Platinum Category:**
- **Icon:** Platinum bar icon
- **Image:** Platinum bars
- **Path:** `/frontend/public/images/categories/platinum.jpg`

**Jewelry Category:**
- **Icon:** Ring/necklace icon
- **Image:** Gold jewelry on white background
- **Path:** `/frontend/public/images/categories/jewelry.jpg`
- **Search:** "gold jewelry white background"

**Collectibles:**
- **Icon:** Trophy or rare coin icon
- **Image:** Rare coins collection
- **Path:** `/frontend/public/images/categories/collectibles.jpg`

---

### 3. Icons (Use Heroicons - Free & Professional)

**Install:**
```bash
npm install @heroicons/react
```

**Icons needed:**
```jsx
import {
  MagnifyingGlassIcon,      // Search
  ShoppingBagIcon,           // Marketplace
  ChatBubbleLeftRightIcon,   // Messages
  UserCircleIcon,            // Profile
  PlusCircleIcon,            // Create listing
  AcademicCapIcon,           // College/Education
  BanknotesIcon,             // Pricing/Money
  ScaleIcon,                 // Weight
  MapPinIcon,                // Location
  PhotoIcon,                 // Image upload
  StarIcon,                  // Rating/Featured
  CheckCircleIcon,           // Success states
  XCircleIcon,               // Error states
  SparklesIcon,              // Premium/Featured
  ChartBarIcon,              // Spot prices
  ShieldCheckIcon,           // Trust/Verified
  TruckIcon,                 // Shipping
  ClockIcon,                 // Time/Recent
  FunnelIcon,                // Filters
  Bars3Icon,                 // Mobile menu
} from '@heroicons/react/24/outline';

// Solid versions for filled states
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
```

---

### 4. Illustrations (Optional but HIGHLY Recommended)

**Style:** Clean, minimal, professional (NOT cartoony)

**Where to get:**
- **unDraw** (https://undraw.co) - Free, customizable illustrations
  - Search: "marketplace", "shopping", "finance"
  - Customize to gold color (#D4AF37)

- **Storyset** (https://storyset.com) - Animated SVGs
  - Search: "ecommerce", "finance", "trading"
  - Download as SVG
  - Customize colors to match gold theme

**Needed illustrations:**

1. **Empty States:**
   - No listings found - "storyset search empty"
   - No messages - "storyset chat empty"
   - No profile data - "storyset profile"
   - Path: `/frontend/public/images/illustrations/`

2. **How It Works Section:**
   - Step 1: Sign up - Person with phone/laptop
   - Step 2: Browse - Person looking at items
   - Step 3: Connect - Two people messaging
   - Step 4: Transaction - Handshake or exchange

---

### 5. Lottie Animations (Optional - Adds Premium Feel)

**What are Lottie animations?**
Lightweight, scalable animations that run smoothly.

**Where to get:**
- **LottieFiles** (https://lottiefiles.com) - Free animations
- **Install:** `npm install lottie-react`

**Recommended animations:**

1. **Loading States:**
   - Search: "minimal loading" or "dots loading"
   - Color: Gold (#D4AF37)
   - Path: `/frontend/public/animations/loading.json`

2. **Success Confirmation:**
   - Search: "checkmark success" or "confetti celebration"
   - Use for: Listing created, Payment success
   - Path: `/frontend/public/animations/success.json`

3. **Image Upload:**
   - Search: "upload animation" or "cloud upload"
   - Path: `/frontend/public/animations/upload.json`

4. **Coin/Money Animation:**
   - Search: "coins" or "money" or "gold"
   - Use for: Premium features, featured listings
   - Path: `/frontend/public/animations/coins.json`

5. **Search Animation:**
   - Search: "magnifying glass animation"
   - Use for: Marketplace search
   - Path: `/frontend/public/animations/search.json`

**How to use Lottie:**
```jsx
import Lottie from 'lottie-react';
import loadingAnimation from '/animations/loading.json';

<Lottie
  animationData={loadingAnimation}
  loop={true}
  style={{ width: 100, height: 100 }}
/>
```

---

### 6. Logo Design

**Mintsy Logo Requirements:**

**Option A: Text-based logo (Simple & Professional)**
- Font: Inter Bold or DM Sans Bold
- Text: "Mintsy"
- Color: Gradient from gold (#D4AF37) to darker gold (#B8941F)
- Size: Create at 500x200px
- Icon: Small gold coin or "M" with metallic effect next to text

**Option B: Icon + Text**
- Icon: Minimalist gold coin or mint leaf
- Style: Line art, clean, modern
- Text: "Mintsy" in Inter/DM Sans

**Where to create:**
- **Canva** (https://canva.com) - Free logo maker
- **Figma** (https://figma.com) - Professional design tool
- **Logo.com** - AI logo generator

**Files needed:**
- Logo full (dark bg): `/frontend/public/images/logo/logo-dark.svg`
- Logo full (light bg): `/frontend/public/images/logo/logo-light.svg`
- Logo icon only: `/frontend/public/images/logo/icon.svg`
- Favicon: `/frontend/public/favicon.ico` (32x32px)

---

### 7. Placeholder Images

**No Image Placeholder:**
- Size: 400x400px
- Design: Light gray background (#F8F9FA)
- Icon: PhotoIcon from Heroicons (centered, gray)
- Text: "No image" (optional)
- Path: `/frontend/public/images/placeholders/no-image.png`

**Create with code:**
```jsx
<div className="w-full h-full bg-gray-100 flex items-center justify-center">
  <PhotoIcon className="w-16 h-16 text-gray-400" />
</div>
```

---

### 8. Spot Price Charts (Optional Enhancement)

**Library:** Chart.js or Recharts

```bash
npm install recharts
```

**Use for:**
- Live spot price graphs
- Historical price trends
- Visual price comparisons

---

### 9. Trust Badges & Icons

**Create trust indicators:**

1. **Verified Seller Badge:**
   - Green checkmark icon
   - Text: "Verified"
   - Badge style with border

2. **Premium Member Badge:**
   - Gold star icon
   - Text: "Premium"
   - Gold gradient background

3. **Featured Listing Badge:**
   - Sparkles icon
   - Text: "Featured"
   - Gold border/background

**Design in:** Canva or Figma
**Format:** SVG (scalable)
**Path:** `/frontend/public/images/badges/`

---

## DESIGN MOCKUP STRUCTURE

### Homepage Layout

```
┌─────────────────────────────────────────────────┐
│  [Logo]     Marketplace  College  Learn  [Auth] │ ← White header
├─────────────────────────────────────────────────┤
│                                                 │
│         MINTSY                                  │ ← Hero section
│    Local Precious Metals Marketplace            │   Light gradient bg
│    [Browse Listings] [View Spot Prices]         │   Clean & minimal
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │ ← Live spot prices
│  │   GOLD   │  │  SILVER  │  │ PLATINUM │     │   White cards
│  │ $2,650   │  │  $32.50  │  │  $1,180  │     │   with shadows
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│         How Mintsy Works                        │ ← Info section
│                                                 │   Illustrations
│  [1] Sign Up  [2] Browse  [3] Connect  [4] ✓   │   Icons + text
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│         Featured Listings                       │ ← Product grid
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                  │   White cards
│  │ 🪙 │ │ 🪙 │ │ 🪙 │ │ 🪙 │                  │   Gold accents
│  └────┘ └────┘ └────┘ └────┘                  │   Hover effects
│                                                 │
└─────────────────────────────────────────────────┘
│  Footer: Links, Social, Copyright              │ ← Light gray bg
└─────────────────────────────────────────────────┘
```

---

## ANIMATION & INTERACTIONS

### Micro-interactions

1. **Button Hover:**
   ```css
   transition: all 0.2s ease;
   hover: transform: translateY(-2px);
   hover: box-shadow: larger;
   ```

2. **Card Hover:**
   ```css
   transition: all 0.3s ease;
   hover: transform: translateY(-4px);
   hover: border-color: gold;
   ```

3. **Image Zoom on Hover:**
   ```css
   .listing-image {
     transition: transform 0.3s ease;
   }
   .listing-card:hover .listing-image {
     transform: scale(1.05);
   }
   ```

4. **Fade In on Scroll:**
   - Use: **Framer Motion** or **AOS (Animate On Scroll)**
   ```bash
   npm install framer-motion
   ```

5. **Smooth Page Transitions:**
   - Between route changes
   - Fade in/out effect

---

## UPDATED TAILWIND CONFIG

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

---

## RECOMMENDED CSS UTILITIES

```css
/* Add to index.css */

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Better font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Gold gradient text */
.text-gradient-gold {
  background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glassmorphism effect (optional) */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

---

## COMPLETE ASSET CHECKLIST

### Images to Download:
- [ ] Hero background (gold coins/bars, bright, professional)
- [ ] Gold category image (400x400px)
- [ ] Silver category image (400x400px)
- [ ] Platinum category image (400x400px)
- [ ] Jewelry category image (400x400px)
- [ ] Collectibles category image (400x400px)

### Illustrations to Get (unDraw/Storyset):
- [ ] Empty state - no listings
- [ ] Empty state - no messages
- [ ] How it works - step 1-4 illustrations
- [ ] 404 page illustration

### Lottie Animations (Optional):
- [ ] Loading animation
- [ ] Success checkmark
- [ ] Upload animation
- [ ] Coin animation (for premium features)
- [ ] Search animation

### Logo & Branding:
- [ ] Main logo (SVG, light & dark versions)
- [ ] Favicon (32x32px)
- [ ] App icon (512x512px for PWA)

### Icons:
- [x] Heroicons package (installed via npm)

### Badges:
- [ ] Verified seller badge
- [ ] Premium member badge
- [ ] Featured listing badge

---

## PROFESSIONAL WEBSITES FOR INSPIRATION

**Clean, modern marketplaces:**
1. **Stripe** (stripe.com) - Clean white, great typography
2. **Coinbase** (coinbase.com) - Trust, professional, minimal
3. **Airbnb** (airbnb.com) - Card layouts, white space
4. **Etsy** (etsy.com) - Product grids, clean UI
5. **StockX** (stockx.com) - Premium feel, dark accents

**Precious metals sites:**
1. **APMEX** (apmex.com) - Professional, trustworthy
2. **JM Bullion** (jmbullion.com) - Clean product displays
3. **SD Bullion** (sdbullion.com) - Modern, minimal

**Key takeaways:**
- Lots of whitespace
- Clean typography
- Professional product photography
- Subtle colors, not overwhelming
- Trust indicators visible
- Easy navigation

---

## FINAL RECOMMENDATION

**Use:**
- ✅ White/light background (#FFFFFF, #F8F9FA)
- ✅ Gold accents (#D4AF37) for CTAs and highlights
- ✅ Clean typography (Inter font)
- ✅ Professional photos (bright, clean backgrounds)
- ✅ Heroicons for all UI icons
- ✅ Subtle shadows and hover effects
- ✅ Optional: Lottie animations for premium feel
- ✅ Optional: unDraw illustrations for empty states

**Avoid:**
- ❌ Dark blue backgrounds everywhere
- ❌ Too many colors competing
- ❌ Cartoony illustrations
- ❌ Low-quality images
- ❌ Heavy animations that slow the site
- ❌ Cluttered layouts

This will give you a clean, professional, trustworthy precious metals marketplace that looks like a modern fintech app.

---

## QUICK VISUAL REFERENCE

### ✅ DO THIS (Good Examples)

**Colors:**
- Clean white backgrounds (#FFFFFF)
- Light gray sections (#F8F9FA)
- Gold accents ONLY for buttons and highlights (#D4AF37)
- Dark gray text (#1A1A1A)
- Lots of whitespace

**Layout:**
- Cards with subtle shadows
- Generous padding/spacing
- Clean product photos on white
- Minimal navigation

**Typography:**
- Inter font, clean and modern
- Clear hierarchy (sizes: 60px hero → 16px body)
- Good line spacing

---

### ❌ DON'T DO THIS (Common Mistakes)

**Colors:**
- ❌ Dark blue backgrounds everywhere
- ❌ Too many competing colors
- ❌ Bright neon yellow/gold (#fff693) - looks cheap
- ❌ Dark on dark text (hard to read)
- ❌ Cluttered with no whitespace

**Layout:**
- ❌ Cramped cards with no spacing
- ❌ Low-quality product photos
- ❌ Too many elements competing for attention
- ❌ Confusing navigation

**Typography:**
- ❌ Too many font families
- ❌ Inconsistent sizes
- ❌ Poor contrast (gray on gray)

---

## EXACT COLOR PALETTE (Copy-Paste Ready)

```css
/* Backgrounds */
--white: #FFFFFF
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-200: #E5E7EB

/* Text */
--gray-900: #111827
--gray-700: #374151
--gray-500: #6B7280
--gray-400: #9CA3AF

/* Gold (Use Sparingly!) */
--gold: #D4AF37
--gold-light: #F4E5C3
--gold-dark: #B8941F

/* Semantic */
--success: #10B981
--error: #EF4444
--warning: #F59E0B
--info: #3B82F6
```

---

## WHERE TO USE EACH COLOR

**White (#FFFFFF):**
- Main background
- Card backgrounds
- Input fields

**Gray 50-200 (#F9FAFB - #E5E7EB):**
- Section backgrounds (alternating with white)
- Borders
- Disabled states

**Gray 900 (#111827):**
- Headings
- Important text

**Gray 700 (#374151):**
- Body text
- Descriptions

**Gray 500 (#6B7280):**
- Secondary text
- Labels

**Gray 400 (#9CA3AF):**
- Placeholder text
- Icons

**Gold (#D4AF37):**
- Primary buttons ONLY
- Featured badges
- Premium indicators
- Hover states on important elements
- Icons for special features

---

## COMPONENT EXAMPLES (Exact Code)

### Perfect Button
```jsx
<button className="bg-gradient-to-br from-gold to-gold-dark text-white font-semibold py-3 px-8 rounded-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200">
  Browse Listings
</button>
```

### Perfect Card
```jsx
<div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gold hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  <img src="..." className="w-full h-48 object-cover rounded-lg mb-4" />
  <h3 className="text-xl font-semibold text-gray-900 mb-2">1 oz Gold Eagle</h3>
  <p className="text-gray-600 mb-4">2024 American Eagle Gold Coin</p>
  <div className="flex items-center justify-between">
    <span className="text-2xl font-bold text-gray-900">$2,650</span>
    <span className="text-sm text-gray-500">Los Angeles, CA</span>
  </div>
</div>
```

### Perfect Input
```jsx
<input
  type="text"
  placeholder="Search for gold, silver, platinum..."
  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all duration-200"
/>
```

### Perfect Header
```jsx
<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center space-x-8">
        <span className="text-2xl font-bold text-gradient-gold">Mintsy</span>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition">Marketplace</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition">College</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition">Learn</a>
        </nav>
      </div>
      <button className="bg-gradient-to-br from-gold to-gold-dark text-white font-semibold py-2 px-6 rounded-lg">
        Sign In
      </button>
    </div>
  </div>
</header>
```

This gives you exact, copy-paste ready code for a professional precious metals marketplace!
