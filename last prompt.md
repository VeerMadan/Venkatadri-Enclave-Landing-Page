Ran command: `ls`
Viewed package.json:1-34
Viewed vite.config.js:1-22
Ran command: `Get-ChildItem -Recurse -File | Select-Object FullName`
Used tool: manage_task
Ran command: `Get-ChildItem admin-portal/src`
Created e:\MVK Builders and Developers\dev\venkatadri landing page\PROJECT_CONTEXT.md
Ran command: `@'
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
6. **Cinematic Gate Intro**: Configured Hero to start zoomed into the grand entrance arch with zero text on initial load, zooming out and dissolving the content into view on scroll.
'@ | Out-File -FilePath "PROJECT_CONTEXT.md" -Encoding utf8`
Ran command: `@'
{
  "project": {
    "name": "MVK VENKATADRI ENCLAVE",
    "developer": "MVK Builders & Developers LLP",
    "slogan": "Build Better With MVK",
    "website": "https://www.mvkdevelopers.com",
    "salesEmail": "sales@mvkdevelopers.com",
    "salesPhone": "+91 99000 90049",
    "salesPhoneRaw": "9900090049",
    "whatsappUrl": "https://wa.me/919900090049",
    "address": {
      "full": "Bagaluru Main Road, Yelahanka, Bengaluru - 560064",
      "short": "Bagaluru Main Road, Yelahanka",
      "pincode": "560064",
      "city": "Bengaluru",
      "state": "Karnataka",
      "country": "India"
    },
    "metrics": {
      "projectSize": "6 Acres Gated Community",
      "totalPlots": 111,
      "availablePhase1": 55,
      "baseRatePerSqFt": 7699,
      "roadWidth": "30 Ft Wide Concrete Avenues",
      "gateways": "3 Dedicated Grand Gateways"
    },
    "approvals": [
      "HPA Approved (Hoskote Planning Authority)",
      "BMRDA Approved (Bangalore Metropolitan Region Development Authority)",
      "100% Clear Titles with Individual A & E Khata",
      "Immediate Registration & Bank Loan Eligible"
    ]
  },
  "deployment": {
    "repository": "https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page.git",
    "branch": "main",
    "productionUrl": "https://venkatadri-enclave-landing-page.vercel.app/",
    "adminPortalUrl": "https://venkatadri-enclave-landing-page.vercel.app/admin-portal/"
  },
  "adminSecurity": {
    "portalRoute": "/admin-portal/",
    "passcode": "MVK@enclave123",
    "sessionTokenKey": "mvk_admin_auth_token",
    "sessionTokenValue": "mvk_secure_session_token_granted",
    "storageKey": "mvk_plot_inventory_v1",
    "syncEventName": "mvk_inventory_updated"
  },
  "techStack": {
    "frontend": "React 19",
    "buildTool": "Vite 8",
    "styling": "Tailwind CSS v4",
    "animations": "Framer Motion 13",
    "icons": "Lucide React",
    "fx": "canvas-confetti",
    "fonts": ["Outfit", "Cinzel", "Playfair Display"]
  },
  "themeConfig": {
    "defaultTheme": "light",
    "storageKey": "venkatadri_theme",
    "lightBackground": "#FAF9F6",
    "darkBackground": "#06090B",
    "accentColor": "#F59E0B"
  },
  "componentsMap": {
    "Navbar": "src/components/Navbar.jsx",
    "Hero": "src/components/Hero.jsx",
    "ProjectStats": "src/components/ProjectStats.jsx",
    "Pillars": "src/components/Pillars.jsx",
    "PlotConfigurations": "src/components/PlotConfigurations.jsx",
    "InteractivePlotSelector": "src/components/InteractivePlotSelector.jsx",
    "PriceCalculator": "src/components/PriceCalculator.jsx",
    "MasterPlanViewer": "src/components/MasterPlanViewer.jsx",
    "Amenities": "src/components/Amenities.jsx",
    "LocationMatrix": "src/components/LocationMatrix.jsx",
    "WhyInvest": "src/components/WhyInvest.jsx",
    "Gallery": "src/components/Gallery.jsx",
    "ContactSection": "src/components/ContactSection.jsx",
    "Footer": "src/components/Footer.jsx",
    "StickyMobileBar": "src/components/StickyMobileBar.jsx",
    "LeadModal": "src/components/LeadModal.jsx",
    "AmbientBackground": "src/components/AmbientBackground.jsx",
    "AdminDashboard": "admin-portal/src/AdminDashboard.jsx"
  },
  "heroAnimationBehavior": {
    "onLoad": "Grand entrance gate image is zoomed in (scale 1.28) with zero text and zero gradient visible; a glowing 'Scroll to Enter' pill pulses at bottom.",
    "onScroll": "Image smoothly zooms out (1.28 -> 1.0), gradient veil fades in, and approval badge, gold typography, 4 metric cards, and CTAs float upwards and fade into view.",
    "performance": "120 FPS hardware compositor transforms only (scale, translate3d, opacity) with zero CPU/GPU filter re-rasters."
  },
  "mobileUxRules": [
    "Plot Matrix grid has max-h-[65vh] with internal scrolling to prevent page bloat.",
    "Pillars carousel uses compact cards (w-[72vw] max-w-[280px]).",
    "Location Matrix uses a compact scrollable list instead of wide horizontal swipe.",
    "Why Invest uses a 2x2 grid on mobile.",
    "Bottom navigation is elevated as a floating glass bubble island (bottom-4)."
  ]
}
'@ | Out-File -FilePath "PROJECT_CONTEXT.json" -Encoding utf8`
Ran command: `git add PROJECT_CONTEXT.md PROJECT_CONTEXT.json ; git commit -m "Add detailed project context documentation (Markdown & JSON) for seamless developer/AI agent handover" ; git push`

I have generated two comprehensive context handover files in the root of your project and pushed them to your GitHub repository:

1. **[`PROJECT_CONTEXT.md`](file:///e:/MVK%20Builders%20and%20Developers/dev/venkatadri%20landing%20page/PROJECT_CONTEXT.md)**: A complete, human-readable blueprint covering the entire system architecture, business facts, credentials, component hierarchy, design tokens, and past decisions.
2. **[`PROJECT_CONTEXT.json`](file:///e:/MVK%20Builders%20and%20Developers/dev/venkatadri%20landing%20page/PROJECT_CONTEXT.json)**: A structured machine-readable JSON representation designed to be fed into any AI agent.

---

### 📋 Quick Summary for Your Other Device

When you pull this project on your new device, you or your AI agent can read these files directly. Here is a handy prompt you can copy-paste to your AI agent on the new device to immediately bring it up to speed:

```markdown
Hello! I am continuing development on "MVK Venkatadri Enclave" on this device. 
Please read `PROJECT_CONTEXT.md` and `PROJECT_CONTEXT.json` in the root directory before starting.

Key Quick Facts:
- Project: MVK Venkatadri Enclave (6 Acres, 111 Plots, ₹7,699/Sq.Ft, HPA/BMRDA Approved)
- Address: Bagaluru Main Road, Yelahanka, Bengaluru - 560064
- Official Phone & WhatsApp: +91 99000 90049 / 9900090049
- Admin Portal: /admin-portal/ (Passcode: MVK@enclave123)
- Default Theme: Light (White)
- Architecture: Vite Multi-page (Landing Page + Isolated Admin Portal with live localStorage sync).
- Intro Scroll Effect: Initial state shows gate zoomed in with zero text, smoothly zooming out and revealing text/cards as the user scrolls.

Let me know once you've reviewed the context and are ready for instructions!
```

---

### 🚀 Git Status:
All updates, high-res assets, code, and context files have been pushed to [`main`](https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page.git). When you run `git pull` on your other device, everything will be in place!