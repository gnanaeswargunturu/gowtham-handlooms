
# Gowtham Handlooms - Saree E-Commerce PWA
## Production-Ready MVP Implementation Plan

---

## 🎯 Project Overview

A premium, mobile-first Progressive Web App for **Gowtham Handlooms**, a traditional Andhra handloom saree business. This MVP will enable customers to browse and shop sarees online while giving the shop owner complete control over inventory and orders.

---

## 👥 Roles & Authentication

### Three User Roles (with strict access control)
1. **Platform Admin** (Super Admin) - Full system control
2. **Shop Owner** - Manages shop, products, categories, orders
3. **Customer** - Browse, wishlist, cart, and checkout

### Authentication
- **Phone number + OTP login** using Supabase Auth
- Secure JWT session management
- Role-based route protection

---

## 🗄️ Database Architecture (Supabase/PostgreSQL)

### Core Tables
1. **profiles** - Extended user info (name, phone, addresses)
2. **user_roles** - Role management (admin, owner, customer)
3. **shop_settings** - Shop profile, logo, banner, timings, about
4. **categories** - Saree categories (Kuppadam, Pochampally, etc.)
5. **products** - Saree details, pricing, fabric, occasion
6. **product_images** - Multiple images per saree
7. **inventory** - Stock tracking with low-stock alerts
8. **wishlist** - Customer favorites
9. **cart_items** - Shopping cart
10. **orders** - Order header with status tracking
11. **order_items** - Individual items in orders
12. **addresses** - Customer delivery addresses
13. **reviews** - Verified purchase reviews
14. **return_requests** - Return/exchange management

---

## 🎨 Design System

### Visual Identity
- **Color Palette:**
  - Primary: Maroon (#8B1538)
  - Accent: Gold (#D4AF37)
  - Background: Silk Cream (#FFFEF5)
  - Text: Deep Charcoal (#2D2D2D)

- **Typography:** Elegant serif for headings, clean sans-serif for body
- **Style:** Premium handloom-inspired, clean luxury aesthetic

### Animations (Subtle & Elegant)
- Silk flow fade-in for images
- Smooth page transitions
- Gentle hover effects on product cards
- Loading shimmer effects

---

## 📱 Customer Features (MVP)

### Home Page
- Hero banner showcasing featured sarees
- Category navigation with images
- Featured/New arrivals section
- Shop heritage story section

### Product Catalog
- Browse by category (7 predefined categories)
- Search functionality
- Filters: Price range, fabric type, occasion
- Sort: Price, newest, popularity

### Product Detail Page
- High-quality image gallery
- Zoom on tap/hover
- Saree details (fabric, length, blouse piece)
- Price with discount display
- Add to cart / Add to wishlist
- Description & wash care
- Customer reviews

### Customer Account
- Phone OTP login/signup
- Profile management
- Multiple delivery addresses
- Order history with status timeline
- Wishlist management
- Return request submission

### Shopping Cart & Checkout
- Cart management (add/remove/update quantity)
- Stock validation
- Address selection
- Shipping cost calculation
- Order summary
- *(Payment integration placeholder for later)*

---

## 🏪 Shop Owner Dashboard

### Dashboard Overview
- Total orders summary
- Low stock alerts
- Recent orders
- Quick stats

### Category Management
- Create/edit/disable categories
- Category image uploads
- Reorder categories
- Pre-populated with 7 Andhra handloom categories

### Product Management
- Add new sarees with rich details
- Multiple image upload
- Assign to categories
- Set pricing with discounts
- Inventory management
- Bulk stock updates

### Order Management
- View all orders
- Customer details
- Update status: Placed → Packed → Shipped → Delivered
- Cancel orders

### Shop Settings
- Shop name, logo, banner
- Contact details (phone, WhatsApp)
- Business hours
- About/heritage section
- Shipping rules (flat rate, free above X)
- Return/exchange policy

---

## 👑 Platform Admin Features

### Admin Dashboard
- System-wide statistics
- Shop management (enable/disable)
- User management
- View all orders
- Homepage content control (banners)

---

## 🔧 Technical Implementation

### Frontend
- React with TypeScript
- Tailwind CSS (custom theme)
- React Router for navigation
- React Query for data fetching
- Mobile-first responsive design
- PWA with offline support & installability

### Backend (Supabase)
- PostgreSQL database with RLS policies
- Supabase Auth with phone OTP
- Supabase Storage for images
- Edge Functions for:
  - OTP sending/verification
  - Order processing
  - Stock management
  - Image upload handling

### Security
- Row-Level Security on all tables
- Role-based API access
- Input validation with Zod
- Secure file upload handling

### PWA Features
- Install prompt on mobile
- Offline-capable product browsing
- Fast loading with caching
- App-like experience

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── ui/              # Shadcn components
│   ├── layout/          # Header, Footer, Sidebar
│   ├── customer/        # Customer-facing components
│   ├── owner/           # Owner dashboard components
│   └── admin/           # Admin components
├── pages/
│   ├── customer/        # Browse, product, cart, profile
│   ├── owner/           # Dashboard, products, orders
│   └── admin/           # Admin panel
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, Supabase client
├── contexts/            # Auth, Cart contexts
└── types/               # TypeScript definitions

supabase/
├── migrations/          # Database schema
└── functions/           # Edge functions
```

---

## 🚀 MVP Scope Summary

### Included in MVP:
✅ Customer browsing & search
✅ Product catalog with filters
✅ Category management
✅ Product management with images
✅ Inventory tracking
✅ Shopping cart
✅ Customer accounts (OTP login)
✅ Order placement (without payment)
✅ Order status tracking
✅ Wishlist
✅ Owner dashboard
✅ Admin panel
✅ PWA installability
✅ Mobile-first design

### Deferred to Phase 2:
⏳ Razorpay payment integration
⏳ Reviews & ratings
⏳ Return/exchange flow
⏳ PDF invoices
⏳ Excel exports
⏳ Advanced analytics
⏳ Email/SMS notifications

---

## 📋 Build Sequence

1. **Database Setup** - Schema, tables, RLS policies
2. **Authentication** - Phone OTP with role management
3. **Core UI** - Layout, navigation, design system
4. **Product Catalog** - Categories, products, search
5. **Owner Dashboard** - Product & category CRUD
6. **Customer Features** - Cart, wishlist, checkout
7. **Order Management** - Creation, tracking, status
8. **Admin Panel** - System oversight
9. **PWA Setup** - Manifest, service worker
10. **Polish** - Animations, optimization

---

This plan delivers a production-ready e-commerce MVP that Gowtham Handlooms can use immediately to start selling online. The architecture supports easy addition of payments, reviews, and advanced features in future phases.
