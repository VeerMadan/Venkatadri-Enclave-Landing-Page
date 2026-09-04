# MVK VENKATADRI ENCLAVE — Comprehensive Project Blueprint & AI Context

> **Project Name**: MVK Venkatadri Enclave Landing Page & Admin Control System  
> **Client / Developer**: MVK Builders & Developers LLP (*"Build Better With MVK"*)  
> **Repository**: [https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page.git](https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page.git)  
> **Live Production URL**: [https://venkatadri-enclave-landing-page.vercel.app/](https://venkatadri-enclave-landing-page.vercel.app/)  
> **Admin Portal Route**: `/admin-portal/` (or `https://venkatadri-enclave-landing-page.vercel.app/admin-portal/`)  
> **Admin Passcode**: `MVK@enclave123`  
> **Framework & Stack**: React 19, Vite 8, Tailwind CSS v4, Framer Motion 13, Lucide React, Canvas Confetti

---

## 1. Executive Summary & Business Facts

* **Official Project Title**: MVK Venkatadri Enclave
* **Tagline**: *"Where artistry and nature flourish in harmonious abundance"*
* **Exact Official Location**: Bagaluru Main Road, Yelahanka, Bengaluru - 560064
* **Total Project Size**: 6 Acres Gated Layout
* **Total Plots**: 111 Plots
* **Initial Phase Available Plots**: 55 Available
* **Base Rate**: ₹7,699 / Sq.Ft
* **Approvals & Sanctions**: 
  - HPA Approved (Hoskote Planning Authority)
  - BMRDA Approved (Bangalore Metropolitan Region Development Authority)
  - 100% Clear Titles with Individual A & E Khata
  - Ready for Immediate Registration & Bank Loan Sanctioned (SBI, HDFC, ICICI, etc.)
* **Official Contact Phone**: `+91 99000 90049` (Format: `9900090049`)
* **WhatsApp Sales API**: `https://wa.me/919900090049`
* **Official Website**: `https://www.mvkdevelopers.com`
* **Sales Email**: `sales@mvkdevelopers.com`

---

## 2. Architecture & Multi-Page Vite Setup

The repository uses Vite's multi-page rollup configuration to decouple the public landing page from the secure internal developer admin portal:

```
├── index.html                      # Root Public Landing Page Entry
├── admin-portal/
│   ├── index.html                  # Isolated Internal Admin Portal Entry (noindex, nofollow)
│   └── src/
│       ├── main.jsx                # Admin Portal Bootstrap
│       ├── AdminApp.jsx            # Admin Theme Context Wrap
│       └── AdminDashboard.jsx      # Live 111-Plot Inventory CRUD & Analytics Manager
├── src/
│   ├── main.jsx                    # Public App Bootstrap
│   ├── App.jsx                     # Public ThemeProvider & Root Route
│   ├── index.css                   # Tailwind v4, Glassmorphism, CSS Variables, Typography
│   ├── context/
│   │   └── ThemeContext.jsx        # Light/Dark Theme Controller (Default: Light/White)
│   ├── data/
│   │   ├── projectData.js          # Amenities, Location Distances, FAQs, Approvals Data
│   │   └── plotInventoryData.js    # Master 111-Plot Inventory Database & LocalStorage Sync Engine
│   ├── pages/
│   │   └── LandingPage.jsx         # Main Landing Page Assembly
│   └── components/
│       ├── AmbientBackground.jsx   # Lightweight 120 FPS GPU-friendly ambient glow backdrop
│       ├── Navbar.jsx              # Frosted pill nav with light/dark toggle and quick anchor links
│       ├── Hero.jsx                # Cinematic Gate Zoom-out Scroll Reveal with Sunrise Horizon
│       ├── ProjectStats.jsx        # 6 Approvals & Infrastructure Feature Badges
│       ├── Pillars.jsx             # 3 Core Pillars (Community, Connectivity, Comfort)
│       ├── PlotConfigurations.jsx  # Plot Dimensions, Floorplans & Cost Estimator Tabs
│       ├── InteractivePlotSelector.jsx # 111-Plot Glowing Interactive Matrix & Dossier Inspector
│       ├── PriceCalculator.jsx     # Real-time Loan EMI & Plot Cost Calculator
│       ├── MasterPlanViewer.jsx    # Blueprint Map, Sunset Boulevard & 3D Aerial Visualizer
│       ├── Amenities.jsx           # 12 Master Community Amenities
│       ├── LocationMatrix.jsx      # Education (13), Healthcare (9), Connectivity (9) Matrix
│       ├── WhyInvest.jsx           # 4-Reason Grid + FAQ Accordion
│       ├── Gallery.jsx             # High-res Architectural & Sunset Boulevard Lightbox
│       ├── ContactSection.jsx      # Free Cab Site Visit Booking Form with Confetti
│       ├── Footer.jsx              # Legal Disclaimers, Map Coordinates & Developer Slogan
│       ├── StickyMobileBar.jsx     # Floating Glass Bubble Mobile Navigation Island
│       └── LeadModal.jsx           # Dynamic brochure, quote & site visit capture modal
├── public/
│   └── images/
│       ├── grand-entrance.jpg          # High-Res 16:9 Entrance Arch with Sunrise Horizon
│       ├── grand-entrance-arch.jpg     # Dedicated Archway asset
│       ├── grand-entrance-panoramic.jpg# Ultra-wide Panoramic Sunset Boulevard
│       ├── master-layout-plan.jpg      # 111-Plot Master Blueprint CAD
│       ├── avenue-street-view.jpg      # 30 Ft Concrete Avenue street view
│       └── aerial-layout-view.jpg      # 6-Acre 3D aerial bird's eye view
└── vite.config.js                  # Multi-page Rollup config (main & adminPortal entries)
```

---

## 3. Key Design System & UX Standards

1. **Default Theme**: **Light (White) Theme** by default (`html.light`, `bg-[#FAF9F6]`, `text-[#0F172A]`), with a theme toggle in the header for dark mode (`html.dark`, `bg-[#06090B]`, `text-[#F8FAFC]`).
2. **Typography**:
   - Primary Sans: `Outfit` (Modern, clean, legible across mobile and desktop).
   - Luxury Serifs: `Cinzel` & `Playfair Display` for headlines, logos, and gold highlights.
3. **Glassmorphism & Neomorphism**:
   - `glass-panel`: `backdrop-filter: blur(12px)` for GPU efficiency + subtle semi-transparent borders.
   - `neo-inset`: Inset shadows for input elements, status badges, and interactive matrices.
   - `gold-gradient-text`: Rich amber/gold luxury gradient fills.
4. **Hero Scroll-Driven Experience**:
   - **On Initial Load**: Only the high-res grand entrance gate is visible in a zoomed-in perspective (`scale: 1.28`). All text and gradients are invisible (`opacity: 0`). A subtle `"Scroll to Enter"` pill pulses at the bottom.
   - **On Scroll**: As the user scrolls down, the gate smoothly zooms out to `scale: 1.0`, the gradient veil fades in, and the luxury titles, 4 metric cards, and CTAs float upwards and scale smoothly into place.
5. **Mobile-First App Experience**:
   - Contained plot matrix viewports (`max-h-[65vh] overflow-y-auto`) so the 111-plot grid never forces endless page length.
   - Compact carousels and tile grids (`w-[72vw] max-w-[280px]` for Pillars, `2x2` grid for Why Invest, compact scrollable lists for Location Matrix).
   - Floating Glass Bubble navigation island (`bottom-4 left-3 right-3`) with individual tactile bubble buttons for Call, WhatsApp, Brochure, and Book Visit.

---

## 4. Admin Portal & Live Inventory Engine

* **URL Path**: `/admin-portal/`
* **Access Passcode**: `MVK@enclave123`
* **Session Storage Key**: `mvk_admin_auth_token`
* **Data Storage Engine**: `localStorage` key `mvk_plot_inventory_v1`
* **Real-Time Synchronization**:
  When an admin updates a plot's status (`available` -> `booked` / `sold`), facing, dimensions, or price in the Admin Portal, it dispatches the custom event `mvk_inventory_updated`. The public `InteractivePlotSelector.jsx` listens to this event and instantly updates the live available plot counts, matrix colors, and calculation dossier without requiring a page reload!
* **Backup & Restore**: Supports 1-click JSON export and JSON file import.

---

## 5. Dev Commands & Scripts

```bash
# Start local development server (both landing page and admin portal)
npm run dev

# Build for production (outputs to dist/ and dist/admin-portal/)
npm run build

# Preview production build locally
npm run preview
```

---

## 6. History of Key Iterations & User Preferences

1. **Admin Isolation**: Admin was moved from `/admin` to an isolated `/admin-portal/` folder with strict passcode `MVK@enclave123`.
2. **Copy Adjustments**: The hero stat box was adapted to "Property Type / Premium / Villa Plots".
3. **Contact Details**: Official number set to `+91 99000 90049`, WhatsApp set to `https://wa.me/919900090049`, address set to `Bagaluru Main Road, Yelahanka, Bengaluru - 560064`.
4. **Mobile UX Overhaul**: Fixed layout overlap bugs by removing sticky overlays on mobile; constrained long lists; elevated bottom mobile nav into floating glass bubble island.
5. **GPU Performance Optimization**: Removed heavy full-screen SVG noise turbulence shaders and dynamic image filter calculations; switched to 120 FPS hardware compositor transforms (`translate3d`, `scale`, `opacity`).
6. **Cinematic Gate Intro & Refined Curve**: Configured Hero to start zoomed into the grand entrance arch with zero text on initial load (`scale: 1.26`), zooming out to 1.0 by progress `0.38` while text, gradient, and 4 metric cards float into view. Extended container runway to `270vh/310vh` with a rock-solid reading dwell window (`0.38 -> 0.82`, ~900px of scroll) and a smooth upward exit handoff (`0.82 -> 1.0`), smoothed with Framer Motion `useSpring`.
7. **Comprehensive System Enhancements (September 2026)**:
   - **Hero Image Upgrade**: Replaced intro image with `Generated Image August 24, 2026 - 2_25PM.jpg`.
   - **CAD Blueprint Dataset Alignment**: 100% mapped to certified CAD drawing (`media_1788344501577.jpg`): 30x50 (Plots 24–28), 30x45 (Plots 22–23), Odd Plots (1–6, 13, 14, 21, 29, 30, 57, 58, 75, 76, 93, 94, 111), and 30x40 (all remaining). Upgraded storage key to `mvk_venkatadri_inventory_v2`.
   - **Leads CRM Engine**: Created `src/data/leadsData.js` storing incoming inquiries in `mvk_leads_db_v1`, with live event broadcasting (`mvk_lead_created`), status workflow (*New / Contacted / Visit Scheduled / Closed*), direct call/WhatsApp triggers, and 1-click CSV/Excel export.
   - **Rate Limiting & Phone Validation**: Strict Indian mobile validation (`/^[6-9]\d{9}$/`), numeric input masking, and client-side rate limiting (max 3 bookings/24 hours).
   - **Dedicated Layout Dossier Modal**: Replaced misleading visit prompt on "View Layout" buttons with `LayoutDetailsModal.jsx`, showcasing the certified blueprint drawing with zoom/pan, zoning breakdown, and avenue specs.
   - **Navbar Underline Animation**: Integrated Framer Motion sliding gold underline on desktop navbar with spring physics.
   - **Simplified Plot Selector**: Added Sort By dropdown, blueprint dimension chips, and an instant reset button.
   - **Master Plan Legend Interactivity**: Made legend pills clickable with live counts, descriptions, and 1-click filtering in the plot matrix.
   - **Interactive Google Maps Modal**: Created `GoogleMapsModal.jsx` and connected all location proximity items and amenities cards to live Google Maps embeds and direction links.
   - **Expanded Admin Control Center**: Upgraded `AdminDashboard.jsx` to a 4-tab console (Plot Inventory CRUD, Leads CRM, Website Content Settings, System & Backup).
   - **Responsive Mobile/Desktop Hero Image**: Configured responsive `<picture>` in `Hero.jsx` to serve the vertical 9:16 sunset gate image (`grand-entrance-mobile.jpg`) for mobile viewports (< 768px) and horizontal landscape (`grand-entrance.jpg`) for desktop screens.

