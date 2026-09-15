# MVK VENKATADRI ENCLAVE — Complete Project Knowledge Base & AI Context

> **Project Name**: MVK Venkatadri Enclave (Premium Villa Plots Landing Page & Admin Control System)  
> **Client / Developer**: MVK Builders & Developers LLP (*"Build Better With MVK"*)  
> **GitHub Repository**: [https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page.git](https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page.git)  
> **Production URL**: [https://venkatadri-enclave-landing-page.vercel.app/](https://venkatadri-enclave-landing-page.vercel.app/)  
> **Admin Portal Route**: `/admin-portal/`  
> **Admin Passcode**: `MVK@enclave123`  
> **Core Framework**: React 19, Vite 8, Tailwind CSS v4, Framer Motion 13, Lucide React, Canvas Confetti  
> **Current Status**: Production-Ready, 100% Build Verified, Fully Responsive (Mobile & Desktop)  
> **Last Synchronized**: September 2026

---

## 1. Executive Summary & Business Facts

* **Official Title**: MVK Venkatadri Enclave
* **Tagline**: *"Where artistry and nature flourish in harmonious abundance"*
* **Exact Physical Address**: Bagaluru Main Road, Yelahanka, Bengaluru - 560064, Karnataka, India
* **Total Project Land Area**: 6.0 Acres Gated Community
* **Total Number of Plots**: 111 Numbered Plots (Plot #1 to Plot #111)
* **Initial Phase Available Plots**: 55 Available (28 Booked, 28 Sold in initial inventory configuration)
* **Base Rate**: ₹7,699 / Sq.Ft (Configurable via Admin Portal)
* **Approvals & Sanctions**:
  - **HPA Approved** (Hoskote Planning Authority)
  - **BMRDA Approved** (Bangalore Metropolitan Region Development Authority)
  - **100% Clear Titles** with Individual A & E Khata ready for immediate registration
  - **Approved for Bank Loans**: State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and all leading institutions
* **Infrastructure Highlights**:
  - 3 Dedicated Grand Architectural Security Gateways (Entry 1, 2, and 3)
  - 30 Ft Wide M30 Concrete & Asphalt Avenues with Tree Corridors
  - 100% Underground Concealed Power Cabling & High-Pressure Piped Water to Every Plot
  - Dedicated North Sector Landscaped Park with Children's Play Area & Gazebos
  - Southeast Civic Amenity (CA) Zone
* **Contact & Communication Channels**:
  - Sales Helpline: `+91 99000 90049` (Raw: `9900090049`)
  - WhatsApp Inquiries & Bot Automation: `https://wa.me/919900090049`
  - Official Website: `https://www.mvkdevelopers.com`
  - Sales Email: `sales@mvkdevelopers.com`

---

## 2. Full Architecture & Directory Structure

The repository utilizes Vite's multi-page rollup capabilities to completely decouple the public customer-facing landing page from the secure internal developer/admin portal:

```
venkatadri-landing-page/
├── .agents/                        # Specialized Antigravity skills repository
│   └── skills/                     # Skills (frontend-design, ui_ux_pro_max, etc.)
├── admin-portal/                   # Isolated Admin Sub-application
│   ├── index.html                  # Admin HTML Entry (noindex, nofollow)
│   └── src/
│       ├── main.jsx                # Admin App Bootstrap
│       ├── AdminApp.jsx            # Admin Theme Context Provider
│       └── AdminDashboard.jsx      # 4-Tab Admin Console (Inventory CRUD, Leads CRM, Settings, Backup)
├── dist/                           # Production Build Output (vite build)
│   ├── index.html                  # Compiled Public Landing Page
│   └── admin-portal/
│       └── index.html              # Compiled Admin Portal
├── public/                         # Static Assets & Project Photography
│   └── images/
│       ├── grand-entrance.jpg           # Desktop Grand Entrance Gate (16:9)
│       ├── grand-entrance-mobile.jpg    # Mobile Vertical Grand Entrance Gate (9:16)
│       ├── grand-entrance-arch.jpg      # High-res Architectural Arch Close-up
│       ├── grand-entrance-panoramic.jpg # Ultra-wide Sunset Boulevard Panoramas
│       ├── master-layout-plan.jpg       # Certified 111-Plot CAD Master Blueprint
│       ├── avenue-street-view.jpg       # 30 Ft Concrete Avenue street view
│       └── aerial-layout-view.jpg       # 3D Bird's-eye Aerial community overview
├── src/
│   ├── App.jsx                     # Root React Component with ThemeProvider & Error Boundary
│   ├── main.jsx                    # Public App Entrypoint
│   ├── index.css                   # Tailwind v4, Apple Living Glass Tokens, Custom Range Sliders
│   ├── context/
│   │   └── ThemeContext.jsx        # Light/Dark Theme Controller (Default: Light/White)
│   ├── data/
│   │   ├── projectData.js          # Amenities, Location Proximities (31), FAQs, Approvals
│   │   ├── plotInventoryData.js    # Master 111-Plot Inventory Database & LocalStorage Engine
│   │   ├── leadsData.js            # CRM Database, 4-Survey Capture, WhatsApp Composer, Rate Limiter
│   │   └── siteSettings.js         # Dynamic Site Settings (Phone, WhatsApp URL, Base Rate)
│   ├── pages/
│   │   └── LandingPage.jsx         # Main Landing Page Composition & Modals Orchestrator
│   └── components/
│       ├── AmbientBackground.jsx   # Lightweight 120 FPS GPU-friendly ambient glow backdrop
│       ├── Navbar.jsx              # iOS Blur Bubble Nav with LayoutId Spring Highlighters
│       ├── BrochureEntranceSection.jsx # 4-Question Qualification Survey + Typewriter Effect
│       ├── Hero.jsx                # Cinematic Gate Zoom Scroll Reveal & Screen 2 Runway
│       ├── ParallaxClouds.jsx      # Scroll-Driven Bidirectional Clouds & Anime Wind Streamlines
│       ├── Pillars.jsx             # 3 Core Pillars (Community, Connectivity, Comfort)
│       ├── PlotConfigurations.jsx  # Plot Dimension Tabs (layoutId) & Living Glass Feature Cards
│       ├── InteractivePlotSelector.jsx # 111-Plot Matrix, Status Filtering & Dossier Drawer
│       ├── PriceCalculator.jsx     # Loan EMI Calculator with Tactile Sliders & Dynamic Trails
│       ├── MasterPlanViewer.jsx    # Segmented View Selector (layoutId) & CAD Visualizer
│       ├── Amenities.jsx           # 12 Master Community Infrastructure Cards
│       ├── LocationMatrix.jsx      # 31 Distance-Curated Locations with Sliding Category Tabs
│       ├── WhyInvest.jsx           # The MVK Advantage (4-Col Glass Grid) & Key FAQ Accordions
│       ├── Gallery.jsx             # High-Resolution Architectural Lightbox
│       ├── ContactSection.jsx      # Direct Sales Desk Inquiry Form & Cab Booking
│       ├── Footer.jsx              # Legal Disclaimers, Map Links & Developer Branding
│       ├── LeadModal.jsx           # Dynamic Multi-Purpose Inquiry Modal
│       ├── LayoutDetailsModal.jsx  # Fullscreen CAD Blueprint Pan/Zoom Viewer
│       ├── GoogleMapsModal.jsx     # Live Interactive Google Maps Embed Modal
│       └── ErrorBoundary.jsx       # Component-Level Error Boundary (Prevents White Screens)
├── index.html                      # Root Public HTML Document
├── package.json                    # Project Dependencies & Scripts
├── vite.config.js                  # Multi-Page Rollup Input Config
├── PROJECT_CONTEXT.md              # Complete Project Markdown Documentation
└── PROJECT_CONTEXT.json            # Machine-Readable Project State & Architecture
```

---

## 3. Detailed Component Catalog & Implementation Specifics

### 1. `BrochureEntranceSection.jsx` (Entrance Qualification Flow)
- **Role**: Primary lead capture qualification survey positioned at the entrance of the page.
- **Workflow**:
  1. Captures Full Name and 10-Digit Indian WhatsApp Number (masked `+91`).
  2. Presents 4 critical buyer qualification questions:
     - **Q1: Purpose**: *"To build a home"* | *"Long-term investment"* | *"Second home / future rental property"*
     - **Q2: Budget**: *"₹92+ Lakhs"* | *"₹1.1 Crore – ₹1.25 Crore"*
     - **Q3: Plot Size**: *"1,200 Sq.Ft."* | *"2,400 Sq.Ft."* | *"Not sure, would like guidance on both"*
     - **Q4: Timeline**: *"This Weekend"* | *"Next weekend"*
  3. Action Button: **"Submit & Download Brochure"**
  4. On Submission:
     - Stores lead in central CRM database (`mvk_leads_db_v1`) via `leadsData.js`.
     - Generates pre-filled WhatsApp message and opens `https://wa.me/919900090049?text=...` in a new tab for automated WhatsApp bot fulfillment.
     - Transitions form to submitted state and activates the **Typewriter Typing Prompt**:
       *"Want to know more about this site? Explore by scrolling ↓"* with a pulsating downward bounce arrow.
- **Persistence**: Remembers submission in `localStorage.getItem('mvk_brochure_submitted')` so returning users see the explore prompt directly.

### 2. `Hero.jsx` & `ParallaxClouds.jsx` (Cinematic Scroll-Driven Gate & Cloud Transition)
- **Visual Runway**: 200vh / 225vh height with a sticky viewport container.
- **Phase 1: Cinematic Gate Zoom-out (`0.0 -> 0.44`)**:
  - Responsive gate image: Vertical 9:16 (`grand-entrance-mobile.jpg`) on mobile (<768px), horizontal 16:9 (`grand-entrance.jpg`) on desktop.
  - Image smoothly zooms out from `scale: 1.28` to `1.0`.
  - Content (title, tagline, 4 metric cards) floats in from `y: 40px` to `0px`, fading in at `0.08 -> 0.16` and dissolving away cleanly by `0.46`.
- **Phase 2: Parallax Cloud & Wind Explosion (`0.42 -> 0.94`)**:
  - 5 Golden Anime-Wind Streamlines shoot upward (`y: 45vh -> -75vh`, scaleY: `0.3 -> 1.4 -> 0.4`).
  - 4 Volumetric Pure White Cloud Billows explode upward (`scale: 0.1 -> 4.5x -> 20x`) to veil the screen.
  - Background canvas opacity completely fades to 0 by `0.58`, and `display: "none"` triggers at `0.60` so ZERO background image or white gradient remains.
- **Phase 3: Screen 2 Reveal (Project Foundations Stage)**:
  - **Critical Desynchronization Fix**: Screen 2 remains strictly `display: "none"` and `opacity: 0` until `progress >= 0.72`, ensuring Screen 2 cards NEVER peek through while clouds are rising.
  - At `0.72 -> 0.84`, as the clouds reach 100% occlusion and balloon open to the sides, Screen 2 smoothly scales in (`0.94 -> 1.0`) and fades in (`opacity: 0 -> 1.0`).

### 3. `Navbar.jsx` (iOS Floating Island Navigation)
- **Desktop**: Pill-shaped glass container with floating iOS-style frosted blur bubbles that slide smoothly between navigation links using Framer Motion `layoutId="ios-nav-bubble"` with spring physics (`stiffness: 450, damping: 32`).
- **Mobile Dropdown**: Apple living glass sheet (`backdrop-blur-3xl`) with 3 fluid animated glowing ambient orbs floating in the background, rendering high-contrast, crisp typography (`text-slate-900 dark:text-white`).
- **Theme Switcher**: Smooth rotating sun/moon toggle with instant light/dark mode persistence.

### 4. `PriceCalculator.jsx` (Tactile Sliders with Dynamic Filled Trails)
- **Interactive Sliders**:
  - **Plot Size**: 1,000 to 3,000 Sq.Ft (Presets: 1200, 1350, 1500, 2000).
  - **Down Payment**: 20% to 80%.
  - **Loan Tenure**: 5 to 25 Years.
- **Dynamic Filled Trails**: Dynamically computes active fill percentage for each slider and renders a solid filled track on the left of the thumb:
  `background: linear-gradient(to right, #f59e0b 0%, #f59e0b ${pct}%, rgba(148, 163, 184, 0.25) ${pct}%, rgba(148, 163, 184, 0.25) 100%)`.
- **Clean Slider Knobs (`.luxury-slider`)**: Clean 18px solid white circular thumb with a crisp 2px amber accent border and subtle drop shadow (`0 1px 3px rgba(0,0,0,0.25)`). **Zero ugly neon glow**.
- **Informational Action**: Replaced aggressive booking trigger with **"Inquire Cost Sheet on WhatsApp"**, pre-populating plot size, total cost, and calculated monthly EMI.

### 5. `MasterPlanViewer.jsx` (Fluid Segmented Controls & Layout Visualizer)
- **Sliding Indicator**: View selector tabs (*Blueprint Map*, *Sunset Boulevard*, *3D Aerial View*) feature Framer Motion `layoutId="activeMasterPlanTab"` with an amber highlight pill that physically glides to the selected tab.
- **Interactive Legend**: Legend pills for *30x40*, *30x45*, *30x50*, *Odd Plots*, *Park Zone*, and *CA Zone* are clickable, highlighting detailed counts and providing a 1-click shortcut to filter directly in the 111-plot matrix.
- **Container**: Apple living glass frame with North compass indicator.

### 6. `InteractivePlotSelector.jsx` (111-Plot Interactive Matrix & Dossier Drawer)
- **Inventory Matrix**: 111 individual interactive SVG/DOM plot cards color-coded by status (*Available [Emerald]*, *Booked [Amber]*, *Sold [Rose]*).
- **Filtering & Search**: Status tabs, dimension chips, facing filters (East, West, North), and search input.
- **Plot Dossier Drawer**:
  - Displays selected plot dimensions, facing, square footage, road width, base rate, total valuation, and Vastu notes.
  - Replaced aggressive "Reserve & Book Slot" buttons with informational **"Inquire Specifications for Plot #{no} on WhatsApp"** and **"WhatsApp Info"**.
  - Safe accessors ensure no `PROJECT_INFO` or `formatLakhs` reference errors can ever occur.
- **Resilience**: Wrapped inside `<ErrorBoundary>` in `LandingPage.jsx` to eliminate any possibility of a white screen crash.

### 7. `LocationMatrix.jsx` (Strategic Proximity Matrix)
- **Sliding Tabs**: Education (13), Healthcare (9), and Connectivity (9) tabs use Framer Motion `layoutId="activeLocationTab"`.
- **Destinations**: 31 real verified institutions and transit hubs with exact distances and travel times.
- **Google Maps Integration**: Clicking any destination launches `GoogleMapsModal.jsx` with a live interactive map and directions.

### 8. `Amenities.jsx`, `WhyInvest.jsx`, `PlotConfigurations.jsx`
- **Apple Living Glass**: All 12 amenity cards, 4 MVK Advantage cards, and plot footprint cards use `.apple-living-glass` with `backdrop-filter: blur(24px) saturate(180%)`, specular white rim highlights, and subtle spring hover scaling (`scale: 1.02, y: -4`).
- **Plot Configurations**: Uses `layoutId="activePlotConfigTab"` for smooth sliding between plot sizes.

### 9. `ContactSection.jsx` & `LeadModal.jsx`
- **Refined Copy**: Replaced "Book Your Visit" / "Submit & Confirm Slot" with "Direct Contact" / "Inquiry Received!" / "Send Enquiry via WhatsApp".
- **Validation**: Strict 10-digit Indian phone validation (`/^[6-9]d{9}$/`) and rate limiting (max 3 submissions/24h).

---

## 4. Admin Portal Architecture (`/admin-portal/`)

- **Route**: `/admin-portal/`
- **Passcode**: `MVK@enclave123`
- **Session Authentication**: Stored in `sessionStorage.getItem('mvk_admin_auth_token')`.
- **4 Operational Consoles**:
  1. **Plot Inventory Manager**:
     - Live CRUD interface for all 111 plots.
     - Instant status toggling (`available` <-> `booked` <-> `sold`).
     - Modifying plot dimensions, square footage, facing, or base rate.
     - Dispatches `mvk_inventory_updated` event to instantly update the public landing page in real time without refreshing.
  2. **Leads CRM System**:
     - Real-time lead capture log stored in `localStorage` key `mvk_leads_db_v1`.
     - Displays visitor name, phone, submission timestamp, and the **4 qualification answers** (*Purpose, Budget, Size Interest, Timeline*).
     - Workflow statuses: *New*, *Contacted*, *Visit Scheduled*, *Closed*.
     - 1-Click direct triggers: Direct Phone Call (`tel:`), WhatsApp Chat (`wa.me`).
     - Export to CSV / Excel spreadsheet button.
  3. **Website Content Settings**:
     - Modify sales phone number, WhatsApp API target, base rate per sqft, and developer notes.
     - Dispatches `mvk_settings_updated` event.
  4. **System & Backup**:
     - 1-Click JSON export of all inventory and leads data.
     - JSON file import / restore capability.
     - Reset database to factory defaults button.

---

## 5. Master CAD Blueprint & Inventory Data Alignment

Mapped 100% to the certified engineering CAD master plan:

```
Sector Mappings:
├── Plots 24 to 28: 30 × 50 (1,500 Sq.Ft) — Avenue Frontage
├── Plots 22 & 23: 30 × 45 (1,350 Sq.Ft) — North Facing
├── Odd Plots: Plots 1, 2, 3, 4, 5, 6, 13, 14, 21, 29, 30, 57, 58, 75, 76, 93, 94, 111 (1,450 to 1,850 Sq.Ft)
└── 30 × 40 Standard Plots: All remaining plots (Plots 7-12, 15-20, 31-43, 44-56, 59-74, 77-92, 95-110)

Avenues:
├── Avenue 1: West Crescent (Plots 76–111, Entry 1)
├── Avenue 2: Central Boulevard (Plots 44–75, Entry 2)
├── Avenue 3: Park Promenade (Plots 7–20 & 30–43, Entry 3)
└── Avenue 4: CA & Eastern Enclave (Plots 1–6 & 21–29)
```

---

## 6. Design Tokens, CSS Classes & Styling Standards

Defined in `src/index.css` using Tailwind CSS v4:

- **Theme Palettes**:
  - **Light Theme (Default)**: `--bg-page: #f8fafc`, `--bg-alt: #f1f5f9`, `--bg-surface: #ffffff`, `--text-main: #0f172a`, `--text-sub: #475569`.
  - **Dark Theme**: `--bg-page: #06090b`, `--bg-alt: #040608`, `--bg-surface: #0b1013`, `--text-main: #f8fafc`, `--text-sub: #94a3b8`.
  - **Luxury Accents**: `--accent-gold: #f59e0b`, `--accent-amber: #fbbf24`, `--gold-grad: linear-gradient(135deg, #FFF8E7 0%, #F59E0B 50%, #D97706 100%)`.
- **CSS Utility Classes**:
  - `.apple-living-glass`: `backdrop-filter: blur(24px) saturate(180%)`, specular rim highlight (`inset 0 1px 1px 0 rgba(255,255,255,0.18)`), subtle border, and soft ambient hover glow.
  - `.glass-panel`: Lightweight `backdrop-filter: blur(12px)` for high FPS rendering on cards.
  - `.luxury-slider`: 6px clean track with 18px solid white circular knob, 2px amber border, and subtle drop shadow (`0 1px 3px rgba(0,0,0,0.25)`). **No neon glow**.
  - `.neo-inset`: Inset shadow for tactile input containers and badges.
  - `.gold-gradient-text`: Gradient clipped text for luxury headings.
- **Typography**:
  - Primary UI Sans: `Outfit`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
  - Luxury Serif: `Cinzel`, `Playfair Display`, `Georgia`, `serif`.

---

## 7. Chronological Development History & User Preferences

1. **Initial Conception & Setup**: Scaffolded multi-page Vite app with public landing page and isolated `/admin-portal/` with passcode `MVK@enclave123`.
2. **Mobile UX Overhaul**: Removed sticky overlays on mobile; constrained long lists with internal scroll; replaced fixed mobile footer with floating glass bubble island.
3. **GPU 120 FPS Optimization**: Replaced heavy SVG turbulence filters with hardware compositor CSS transforms (`translate3d`, `scale`, `opacity`).
4. **CAD Blueprint Alignment**: Adjusted inventory dataset to match certified blueprint (`plotInventoryData.js`, key `mvk_venkatadri_inventory_v2`).
5. **Leads CRM Engine**: Added `leadsData.js` with rate limiting (max 3/24h) and strict Indian mobile validation.
6. **Layout Details Dossier**: Replaced generic visit modal on "View Layout" with `LayoutDetailsModal.jsx` showing zoomable blueprint CAD.
7. **Interactive Google Maps**: Integrated `GoogleMapsModal.jsx` for all amenities and proximity cards.
8. **Responsive Hero Gate Image**: Configured vertical 9:16 (`grand-entrance-mobile.jpg`) for mobile and landscape 16:9 (`grand-entrance.jpg`) for desktop.
9. **Buyer Qualification Survey**: Created `BrochureEntranceSection.jsx` with 4-question survey, WhatsApp bot redirect, and post-submission typewriter typing animation (*"Want to know more about this site? Explore by scrolling ↓"*).
10. **Parallax Clouds & Anime Wind**: Added `ParallaxClouds.jsx` with white cloud billows and golden wind streamlines.
11. **Hero Screen 2 Ghosting Fix**: Delayed Screen 2 reveal until `progress >= 0.72` when clouds 100% cover the screen, eliminating ghost card flashes.
12. **Apple Living Glass & iOS Navigation**: Upgraded all section cards to living glass with specular highlights; added iOS blur bubble nav with `layoutId="ios-nav-bubble"` and living glowing orbs dropdown on mobile.
13. **Sliding Segmented Tabs**: Added Framer Motion `layoutId` spring indicators to MasterPlan, LocationMatrix, and PlotConfigurations.
14. **Action Button & Empty Box Cleanup**: Removed aggressive "Submit & Confirm Slot" and booking triggers in favor of WhatsApp inquiry links without leaving any awkward blank spaces.
15. **Clean Minimal Sliders**: Removed ugly neon glow from range sliders in `PriceCalculator.jsx`; styled clean 18px white thumbs with 2px amber rims and subtle shadows.
16. **Crash Resilience & Error Boundaries**: Created `ErrorBoundary.jsx`, wrapped `InteractivePlotSelector`, and safeguarded all plot attributes with safe fallback accessors.

---

## 8. Invariable Rules & Gotchas for Antigravity

When working on this codebase in future sessions, **strictly adhere to the following rules**:

1. **NEVER Delete or Bypass the 4-Step Qualification Form**:
   `BrochureEntranceSection.jsx` is the centerpiece of the lead acquisition flow. It must always collect the 4 qualification responses and redirect to WhatsApp.
2. **NEVER Leave Empty Gaps When Modifying Action Triggers**:
   If an action button is changed or removed, always maintain the visual density and rhythm with an elegant informational badge or WhatsApp inquiry pill. Never leave blank empty containers with isolated raw text.
3. **NEVER Reintroduce Neon Glow to Sliders**:
   The user explicitly dislikes neon glow on sliders. Keep thumbs minimal, clean, white with an amber border and subtle drop shadow.
4. **Preserve Hero Cloud Timing**:
   Screen 2 in `Hero.jsx` must remain `display: "none"` until `progress >= 0.72` so cards never peek through while clouds are rising.
5. **Always Verify Builds with `npm run build`**:
   Before completing any task, ensure `npm run build` passes with zero errors and clean output chunks.
6. **Protect Admin Portal Decoupling**:
   Keep `admin-portal/index.html` separate from `index.html`. Do not break Vite's multi-page rollup configuration.

---

## 9. Migration & Environment Setup (PC Setup Guide)

When moving the project folder to the main dev PC:

```bash
# 1. Install Node.js (v18+ or v20+ recommended)
node -v
npm -v

# 2. Navigate to project root directory
cd "venkatadri-landing-page"

# 3. If node_modules was copied, verify or cleanly re-install
npm install

# 4. Run development server (accessible at http://localhost:5173/)
npm run dev

# 5. Verify production build
npm run build

# 6. Preview production build (accessible at http://localhost:4173/)
npm run preview
```

- **Public Landing Page**: `http://localhost:5173/`
- **Internal Admin Portal**: `http://localhost:5173/admin-portal/` (Passcode: `MVK@enclave123`)
