# Mintsy - Complete Asset Checklist for Deployment

##  Already Have (Current Assets)
- [x] `/public/images/hero/bg.jpg` - Hero background
- [x] `/public/images/hero/gold.jpg` - Gold product image
- [x] `/public/images/silver.jpg` - Silver product image
- [x] `/public/images/placeholders/no-image.svg` - Placeholder for missing images

---

##  Images Still Needed

### Category/Product Images (Optional but Recommended)
Save these to `/public/images/categories/`

1. **Platinum.jpg** - Platinum bars/coins (1200x800px)
   - Source: Unsplash search "platinum bars"
   - Example: https://unsplash.com/s/photos/platinum-metal

2. **Palladium.jpg** - Palladium product (1200x800px)
   - Source: Unsplash search "palladium metal"

3. **Jewelry.jpg** - Gold/silver jewelry (1200x800px)
   - Source: Unsplash search "gold jewelry"

4. **Coins.jpg** - Collection of coins (1200x800px)
   - Source: Unsplash search "gold coins collection"

5. **Bars.jpg** - Metal bars stacked (1200x800px)
   - Source: Unsplash search "gold silver bars"

### Trust/Feature Icons (Optional - using Heroicons already)
Currently using Heroicons (already implemented). No additional images needed.

---

## 🎬 Lottie Animations (Optional for Polish)

### Recommended Lottie Files
Download from: https://lottiefiles.com (Free)

1. **Loading Spinner** (`loading.json`)
   - Use: Page loading states
   - Search: "loading spinner gold"
   - Place: `/public/animations/loading.json`

2. **Success Checkmark** (`success.json`)
   - Use: Form submissions, payment success
   - Search: "success checkmark"
   - Place: `/public/animations/success.json`

3. **Empty State** (`empty.json`)
   - Use: No search results, empty listings
   - Search: "empty box" or "no results"
   - Place: `/public/animations/empty.json`

4. **Gold Coin Spin** (`coin-spin.json`) *[OPTIONAL]*
   - Use: Landing page hero section
   - Search: "gold coin spin"
   - Place: `/public/animations/coin-spin.json`

**How to use Lottie:**
```bash
npm install lottie-react
```

```jsx
import Lottie from 'lottie-react';
import loadingAnimation from '/animations/loading.json';

<Lottie animationData={loadingAnimation} loop={true} style={{ width: 200, height: 200 }} />
```

---

## 📱 Favicon & App Icons

### Favicon (REQUIRED for deployment)
1. **favicon.ico** - 32x32px icon of Mintsy logo
   - Create at: https://favicon.io/favicon-converter/
   - Upload a simple gold "M" logo or coin image
   - Place: `/public/favicon.ico`

2. **apple-touch-icon.png** - 180x180px
   - For iOS home screen
   - Place: `/public/apple-touch-icon.png`

3. **favicon-192.png** & **favicon-512.png**
   - For PWA/Android
   - Place: `/public/favicon-192.png` and `/public/favicon-512.png`

---

## 🎨 Logo (RECOMMENDED)

### Mintsy Logo
Create a simple logo with:
- Text "Mintsy" in Inter font
- Gold color (#D4AF37)
- Optional: Small coin/gold bar icon next to text

**File formats needed:**
1. **logo.svg** - Scalable vector (header logo)
   - Place: `/public/images/logo.svg`
   - Size: ~200x50px viewport

2. **logo-white.svg** - White version for dark backgrounds
   - Place: `/public/images/logo-white.svg`

**Free logo creator tools:**
- Canva.com (free plan)
- Figma.com (free)
- LogoMakr.com

---

## 🖼️ Social Media / SEO Images

### Open Graph Image (for social sharing)
1. **og-image.jpg** - 1200x630px
   - Preview image when sharing Mintsy links on Facebook/Twitter
   - Include: Mintsy logo, tagline "Local Precious Metals Marketplace"
   - Background: Your bg.jpg or solid gold theme
   - Place: `/public/og-image.jpg`

Update in `index.html`:
```html
<meta property="og:image" content="https://mintsy.com/og-image.jpg" />
```

---

## 🎯 Priority for MVP Launch

### MUST HAVE (Critical)
- [x] Hero background (bg.jpg) ✅ Already have
- [x] Product images (gold.jpg, silver.jpg) ✅ Already have
- [x] No-image placeholder ✅ Already have
- [ ] **Favicon.ico** - Create this ASAP
- [ ] **Logo.svg** - Simple text logo is fine

### NICE TO HAVE (Can add later)
- [ ] Additional category images (platinum, palladium, jewelry)
- [ ] Lottie animations
- [ ] OG social image
- [ ] Apple touch icons

---

## 📦 Current Status Summary

**You can deploy NOW with what you have!**

The only critical missing item is a **favicon** (takes 5 minutes to create).

Everything else is optional polish that can be added post-launch.

---

## 🚀 Quick Favicon Creation

**Option 1: Use text**
1. Go to https://favicon.io/favicon-generator/
2. Text: "M"
3. Background: #D4AF37 (gold)
4. Font: Inter
5. Download → extract → place `favicon.ico` in `/public/`

**Option 2: Use emoji**
1. Go to https://favicon.io/emoji-favicons/
2. Search: "coin" 🪙 or "money bag" 💰
3. Download → extract → place in `/public/`

---

## 📋 Asset Organization

```
/public/
├── favicon.ico              [NEEDED]
├── apple-touch-icon.png     [Optional]
├── og-image.jpg             [Optional]
├── images/
│   ├── logo.svg             [RECOMMENDED]
│   ├── logo-white.svg       [Optional]
│   ├── hero/
│   │   ├── bg.jpg           ✅ Have
│   │   └── gold.jpg         ✅ Have
│   ├── categories/
│   │   ├── platinum.jpg     [Optional]
│   │   ├── palladium.jpg    [Optional]
│   │   ├── jewelry.jpg      [Optional]
│   │   └── bars.jpg         [Optional]
│   ├── placeholders/
│   │   └── no-image.svg     ✅ Have
│   └── silver.jpg           ✅ Have
└── animations/              [Optional]
    ├── loading.json
    ├── success.json
    └── empty.json
```

---

## 🎨 Free Asset Resources

**Images:**
- Unsplash.com (free, no attribution required)
- Pexels.com (free, no attribution required)
- Pixabay.com (free)

**Lottie Animations:**
- LottieFiles.com (free tier available)

**Icons:**
- Heroicons.com ✅ Already using
- Flaticon.com (free with attribution)

**Logo Maker:**
- Canva.com (free plan)
- Figma.com (free)
- LogoMakr.com (free)

**Favicon:**
- Favicon.io (free, instant generation)

---

## ✅ Ready to Deploy Checklist

- [x] Hero background image
- [x] Product sample images
- [x] Clean white design system
- [x] Responsive layout
- [x] Sample marketplace data
- [ ] Create favicon (5 min task)
- [ ] [Optional] Create simple logo
- [ ] [Optional] Add Lottie animations
- [x] Tailwind CSS working
- [x] React Router setup
- [x] Google OAuth ready (needs Stripe keys from friend)

**Bottom line: You're 95% ready to deploy!** Just add a favicon and you're good to go.
