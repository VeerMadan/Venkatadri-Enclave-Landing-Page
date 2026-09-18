# MVK Venkatadri Enclave — Official Landing Page & Admin Operations Portal

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.1.1-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-Proprietary-amber)](#credits--ownership)

A high-performance, responsive luxury real estate landing page and inventory management system designed for **MVK Venkatadri Enclave**, a 6-acre gated villa plot community on Bagaluru Main Road, Yelahanka, Bengaluru.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Directory Structure](#-directory-structure)
- [Configuration & Environment Variables](#-configuration--environment-variables)
- [Local Development & Build](#-local-development--build)
- [Admin Operations Console](#-admin-operations-console)
- [Credits & Ownership](#-credits--ownership)

---

## 🌟 Project Overview

- **Project Name**: MVK Venkatadri Enclave
- **Developer**: MVK Builders & Developers LLP (*"Build Better With MVK"*)
- **Location**: Bagaluru Main Road, Yelahanka, Bengaluru - 560064, Karnataka, India
- **Land Area**: 6.0 Acres Gated Community
- **Total Plots**: 111 Handcrafted Villa Plots
- **Approvals**: HPA Approved (Hoskote Planning Authority) & BMRDA Approved (Bangalore Metropolitan Region Development Authority)
- **Titles**: 100% Clear Marketable Titles with Individual A & E Khata (Bank Loan Sanctioned)
- **Official Contact**: `+91 99000 90049` | [WhatsApp Inquiries](https://wa.me/919900090049) | [sales@mvkdevelopers.com](mailto:sales@mvkdevelopers.com)

---

## ✨ Key Features

1. **4-Question Buyer Qualification Flow (`BrochureEntranceSection.jsx`)**:
   - Captures name, 10-digit Indian mobile number (`+91` masked), purchase purpose, budget range, plot size preference, and buying timeline.
   - Triggers automated WhatsApp messaging and displays a typewriter explore prompt.
   - Client-side rate limiting (maximum 3 requests / 24 hours per visitor).

2. **Cinematic Gate Reveal & Parallax Clouds (`Hero.jsx` & `ParallaxClouds.jsx`)**:
   - Scroll-driven camera zoom-out (`scale: 1.28 -> 1.0`) focused on the entrance arch.
   - Responsive assets: 9:16 vertical image on mobile devices, 16:9 panoramic view on desktop screens.
   - Volumetric cloud billows and anime-wind streamlines transitioning smoothly into Screen 2 (Project Foundations).

3. **111-Plot Interactive Layout Matrix (`InteractivePlotSelector.jsx`)**:
   - Interactive DOM/SVG layout color-coded by real-time status: Available (Emerald), Booked (Amber), Sold (Rose).
   - Real-time dimension filtering, status toggles, and detailed plot dossier drawers.
   - Protected by React `<ErrorBoundary>` to ensure zero white-screen runtime exceptions.

4. **Certified CAD Blueprint Visualizer (`MasterPlanViewer.jsx` & `LayoutDetailsModal.jsx`)**:
   - Segmented view controller with Framer Motion `layoutId` gliding indicators.
   - Full-screen zoomable blueprint CAD inspection modal.

5. **Loan EMI & Pricing Calculator (`PriceCalculator.jsx`)**:
   - Real-time EMI estimation with dynamically filled slider trails and clean 18px knobs.
   - Pre-formatted WhatsApp cost sheet generation.

6. **Interactive Google Maps Proximity Matrix (`LocationMatrix.jsx` & `GoogleMapsModal.jsx`)**:
   - Curated directory of 31 educational institutions, healthcare hubs, and transit centers with live Google Maps embeds.

---

## 🛠️ Architecture & Tech Stack

- **Core Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 with Multi-Page Rollup configuration (`index.html` + `admin-portal/index.html`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom glassmorphic and design tokens (`.apple-living-glass`, `.glass-panel`, `.neo-inset`)
- **Motion & Transitions**: Framer Motion 13 (`useScroll`, `useTransform`, `useSpring`, `layoutId`)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Typography**: Outfit (UI Sans), Cinzel & Playfair Display (Luxury Serif)

---

## 📂 Directory Structure

```
venkatadri-landing-page/
├── index.html                      # Root Public Landing Page
├── admin-portal/                   # Isolated Admin Portal (noindex, nofollow)
│   ├── index.html                  # Admin Portal HTML Entry
│   └── src/
│       ├── main.jsx                # Admin Entrypoint
│       ├── AdminApp.jsx            # Admin Theme Context
│       └── AdminDashboard.jsx      # Inventory CRUD, Leads CRM, Settings & Backup
├── public/
│   ├── favicon.svg                 # Brand Favicon
│   ├── v-e_brochure.pdf            # Downloadable Project Brochure
│   └── images/                     # High-res Architectural Renders & CAD Maps
├── src/
│   ├── App.jsx                     # Root Component with Providers & Error Boundaries
│   ├── main.jsx                    # Application Bootstrap
│   ├── index.css                   # Tailwind v4, Glassmorphism, Slider & Utility Tokens
│   ├── context/
│   │   └── ThemeContext.jsx        # Theme Controller (Default: Light/White)
│   ├── data/
│   │   ├── projectData.js          # Amenities, Approvals, Proximities (31), FAQs
│   │   ├── plotInventoryData.js    # 111-Plot Database & Live LocalStorage Sync
│   │   ├── leadsData.js            # Leads CRM Engine, Rate Limiter & CSV Exporter
│   │   └── siteSettings.js         # Dynamic Site Configuration Store
│   ├── pages/
│   │   └── LandingPage.jsx         # Landing Page Master Assembly
│   └── components/                 # Modular UI Components
├── vite.config.js                  # Multi-Page Rollup Input Config
├── PROJECT_CONTEXT.md              # In-Depth Project Knowledge Base & AI Blueprint
└── PROJECT_CONTEXT.json            # Machine-Readable Project Architecture & Schema
```

---

## ⚙️ Configuration & Environment Variables

This application is built as a fast, client-side application with dynamic configuration stored and managed through `src/data/siteSettings.js` and reactive storage events.

### Configurable Site Settings (`src/data/siteSettings.js` / Admin Portal):

| Setting | Default Value | Description |
| :--- | :--- | :--- |
| `projectName` | `VENKATADRI ENCLAVE` | Project title displayed across headers and modals |
| `baseRatePerSqFt` | `7699` | Base pricing used in cost estimators and plot dossiers |
| `salesPhone` | `+91 99000 90049` | Display contact phone number |
| `salesPhoneRaw` | `9900090049` | Numerical format used for tel: links and WhatsApp API |
| `whatsappUrl` | `https://wa.me/919900090049` | Target WhatsApp customer service bot URL |
| `salesEmail` | `sales@mvkdevelopers.com` | Official sales inquiry email |
| `webhookUrl` | `""` | Optional external webhook endpoint (Zapier / Google Sheets) |

### Local Storage Schema Keys:

- `mvk_venkatadri_inventory_v2`: Active 111-plot inventory state.
- `mvk_leads_db_v1`: Captured buyer inquiries and CRM records.
- `mvk_site_settings_v1`: Modified site content settings.
- `venkatadri_theme`: User theme preference (`light` / `dark`).
- `mvk_admin_auth_token`: Admin session token (`sessionStorage`).

---

## 🚀 Local Development & Build

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page.git

# Navigate into the project directory
cd Venkatadri-Enclave-Landing-Page

# Install project dependencies
npm install
```

### 3. Development Server
```bash
# Start Vite development server
npm run dev
```
- **Public Landing Page**: `http://localhost:5173/`
- **Admin Operations Portal**: `http://localhost:5173/admin-portal/`

### 4. Production Build & Preview
```bash
# Compile optimized production bundles
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 Admin Operations Console

The internal Admin Operations Console is located at `/admin-portal/` and is protected by session-based authentication:

- **Route**: `/admin-portal/`
- **Passcode**: `MVK@enclave123`
- **Capabilities**:
  1. **Plot Inventory Manager**: Live status toggles (Available / Booked / Sold), dimensions, and price updates with live dispatch events.
  2. **Leads CRM System**: View 4-survey buyer qualification answers, manage statuses (New / Contacted / Visit Scheduled / Closed), 1-click calls/WhatsApp, and CSV export.
  3. **Site Settings**: Modify base rates, contact numbers, and optional webhook endpoints.
  4. **System & Backup**: 1-click JSON database export, import/restore, and reset to defaults.

---

## 📜 Credits & Ownership

- **Project**: MVK Venkatadri Enclave
- **Client & Developer**: MVK Builders & Developers LLP (*"Build Better With MVK"*)
- **Repository**: [VeerMadan/Venkatadri-Enclave-Landing-Page](https://github.com/VeerMadan/Venkatadri-Enclave-Landing-Page)
- **Proprietary Notice**: All rights reserved by the project owners and developer organization. Unauthorized reproduction or redistribution of project architectural assets, photography, and certified CAD drawings is strictly prohibited.
