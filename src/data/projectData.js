export const PROJECT_INFO = {
  name: "MVK VENKATADRI ENCLAVE",
  tagline: "Where artistry and nature flourish in harmonious abundance",
  subtitle: "A Premium Address. A Limited Opportunity. A Future Worth Building.",
  location: "Gunduru village, Bidarahalli hobali, Bangalore East Taluk, Bangalore Urban District - 560049",
  shortLocation: "Gundur, Hoskote – Bengaluru North Growth Corridor",
  projectSize: "6 Acres Gated Community",
  totalPlots: 111,
  availablePlots: 55,
  baseRatePerSqFt: 7699,
  approvals: [
    { name: "HPA Approved", detail: "Hoskote Planning Authority Approval", badge: "HPA" },
    { name: "BMRDA Approved", detail: "Bangalore Metropolitan Region Development Authority", badge: "BMRDA" },
    { name: "A & E Khata", detail: "100% Clear Titles & Individual E-Khata", badge: "A-KHATA" },
    { name: "Ready for Registration", detail: "Immediate Registration & Bank Loan Eligible", badge: "READY" }
  ],
  developer: {
    name: "MVK Builders & Developers LLP",
    slogan: "Build Better With MVK",
    website: "https://www.mvkdevelopers.com",
    phone: "+91 98450 12345", // Standard contact trigger
    whatsapp: "+919845012345",
    email: "sales@mvkdevelopers.com"
  }
};

export const PLOT_TYPES = [
  {
    id: "30x40",
    name: "Standard Villa Plot (30 × 40)",
    dimensions: "30 × 40 Ft",
    areaSqFt: 1200,
    areaSqMt: 111.48,
    facing: "East & West Facing",
    color: "#EF4444", // Orange-red as on map legend
    badge: "Most Popular",
    description: "Ideal for modern 3BHK / 4BHK duplex villas with private garden space.",
    estPrice: "₹92.38 Lakhs*",
    highlights: ["Frontage: 30 Ft", "Depth: 40 Ft", "East / West Options", "Vastu Compliant"]
  },
  {
    id: "30x45",
    name: "Spacious Villa Plot (30 × 45)",
    dimensions: "30 × 45 Ft",
    areaSqFt: 1350,
    areaSqMt: 125.42,
    facing: "East & West Facing",
    color: "#14B8A6", // Teal as on map legend
    badge: "Executive Living",
    description: "Generous footprint designed for luxury villas with extended car porch and terrace patio.",
    estPrice: "₹1.03 Cr*",
    highlights: ["Frontage: 30 Ft", "Depth: 45 Ft", "Extra Open Area", "Optimal Sunlight"]
  },
  {
    id: "30x50",
    name: "Grand Villa Plot (30 × 50)",
    dimensions: "30 × 50 Ft",
    areaSqFt: 1500,
    areaSqMt: 139.35,
    facing: "North / East / West",
    color: "#3B82F6", // Blue as on map legend
    badge: "Premium Size",
    description: "Sprawling estate plots for grand multi-level luxury villas with private courtyards.",
    estPrice: "₹1.15 Cr*",
    highlights: ["Frontage: 30 Ft", "Depth: 50 Ft", "Wide Front Setbacks", "High Resale Value"]
  },
  {
    id: "corner",
    name: "Premium Corner Plots",
    dimensions: "Corner / Dual Road Frontage",
    areaSqFt: "1,400 - 2,100",
    areaSqMt: "130 - 195",
    facing: "North-East / South-East / Dual Facing",
    color: "#F59E0B",
    badge: "High Appreciation",
    description: "Dual road frontage ensuring supreme ventilation, grand architecture visibility, and premium Vastu orientation.",
    estPrice: "Custom Quotation",
    highlights: ["Dual 30Ft Road Access", "Maximum Natural Air & Light", "Prestige Corner Appeal", "Limited Inventory"]
  },
  {
    id: "odd",
    name: "Unique Custom Sites",
    dimensions: "Custom Odd Shapes",
    areaSqFt: "1,250 - 2,400",
    areaSqMt: "116 - 222",
    facing: "Various Orientations",
    color: "#EAB308", // Yellow as on map legend
    badge: "Architectural Delight",
    description: "Distinctive plot shapes offering creative landscaping and bespoke custom villa floor plans.",
    estPrice: "On Request",
    highlights: ["Generous Green Buffer", "High Privacy Layout", "Bespoke Villa Potential", "Best Value Deals"]
  }
];

export const AMENITIES = [
  {
    icon: "ShieldCheck",
    title: "24×7 Security & CCTV",
    description: "Grand gatehouse with dedicated security guards, RFID boom barrier, and high-res surveillance."
  },
  {
    icon: "DoorOpen",
    title: "Grand Entrance Plaza",
    description: "Majestic 3-gateway archway with architectural stone cladding, landscape illumination and water feature."
  },
  {
    icon: "Road",
    title: "30 Ft Wide CC Roads",
    description: "High-grade cement concrete asphalt roads built for decades of durability with paved walkways."
  },
  {
    icon: "Zap",
    title: "Underground Electricity",
    description: "100% underground cabling network with street lighting and individual plot power hookup points."
  },
  {
    icon: "Droplets",
    title: "Underground Water Network",
    description: "Concealed potable water piping directly to every single plot boundary with metered connection."
  },
  {
    icon: "Waves",
    title: "Underground Storm Drainage",
    description: "Heavy-duty underground drainage system engineered to prevent water-logging in any season."
  },
  {
    icon: "Database",
    title: "Overhead Water Tank (OHT)",
    description: "High-capacity elevated reservoir ensuring uninterrupted water pressure across the layout."
  },
  {
    icon: "Sparkles",
    title: "Exclusive Deep Borewells",
    description: "Dedicated deep borewell system with pump room infrastructure for sustainable water security."
  },
  {
    icon: "Trees",
    title: "Landscaped Park & Gardens",
    description: "Lush botanical greens with native trees, floral borders, flowering pergolas, and manicured lawns."
  },
  {
    icon: "Gamepad2",
    title: "Children's Play Arena",
    description: "Safe, cushioned outdoor play zone with swings, slides, multi-play stations and soft turf."
  },
  {
    icon: "Armchair",
    title: "Seating & Leisure Zones",
    description: "Shaded designer gazebos and senior citizen seating alcoves for community bonding and tranquility."
  },
  {
    icon: "Footprints",
    title: "Tree-Lined Jogging Track",
    description: "Continuous walking and jogging tracks bordered by evergreen avenue trees and lantern lamps."
  }
];

export const THREE_PILLARS = [
  {
    title: "Community",
    tagline: "Belong to an inspired neighborhood",
    description: "A place where neighbors smile, children play freely in secure spaces, and friendships grow naturally. More than a neighborhood, it's a place to feel at home and be part of something lasting.",
    icon: "Users",
    img: "/images/grand-entrance.jpg"
  },
  {
    title: "Connectivity",
    tagline: "Effortless commute to work & city hubs",
    description: "Well-connected to the places that matter, making everyday travel easy and convenient. With key tech corridors, schools, and airport just a short drive away, you're always close to where life happens.",
    icon: "Compass",
    img: "/images/avenue-street-view.jpg"
  },
  {
    title: "Comfort",
    tagline: "Thoughtfully made for tranquil everyday life",
    description: "A place where everything feels easy, calm, and thoughtfully made for everyday life. From peaceful green surroundings to underground modern utilities, comfort finds its way into every little moment.",
    icon: "HeartHandshake",
    img: "/images/aerial-layout-view.jpg"
  }
];

export const LOCATION_DATA = {
  education: [
    { name: "Discovery National School", distance: "350 M", time: "1 min walk", highlight: "Directly opposite layout" },
    { name: "Capital International School", distance: "3.4 KM", time: "6 mins", highlight: "CBSE Curriculum" },
    { name: "Jnana Kuteera Nature School", distance: "4.1 KM", time: "8 mins", highlight: "Holistic learning" },
    { name: "Narayana E-Techno School", distance: "5.5 KM", time: "10 mins", highlight: "STEM & Competitive prep" },
    { name: "East Point College of Medical Sciences", distance: "5.6 KM", time: "11 mins", highlight: "Medical Research Institute" },
    { name: "East Point Group of Institutes", distance: "5.7 KM", time: "11 mins", highlight: "Premier Campus" },
    { name: "East Point College of Engineering", distance: "6.4 KM", time: "12 mins", highlight: "Autonomous Tech College" },
    { name: "Paramount Public School", distance: "6.8 KM", time: "13 mins", highlight: "K-12 Education" },
    { name: "National Public School (NPS) KR Puram", distance: "7.1 KM", time: "14 mins", highlight: "Top Tier Institution" },
    { name: "Vijaya Vittala Institute of Technology", distance: "7.3 KM", time: "15 mins", highlight: "Higher Education" },
    { name: "Bachpan Play School, Kithaganur", distance: "7.9 KM", time: "15 mins", highlight: "Early Childhood Center" },
    { name: "Oasis International School", distance: "8.6 KM", time: "17 mins", highlight: "International Baccalaureate" },
    { name: "Iyra International School", distance: "9.0 KM", time: "18 mins", highlight: "World-class campus" }
  ],
  healthcare: [
    { name: "Ayushman Ayurveda Clinic", distance: "3.7 KM", time: "7 mins", highlight: "Wellness & Holistic Care" },
    { name: "East Point Multispeciality Hospital", distance: "5.1 KM", time: "10 mins", highlight: "24/7 Emergency & Trauma" },
    { name: "New Life Speciality Hospital", distance: "8.8 KM", time: "16 mins", highlight: "Advanced Surgery & ICU" },
    { name: "Goodwell Multispeciality Hospital", distance: "10.5 KM", time: "18 mins", highlight: "Comprehensive Care" },
    { name: "Sparsh Hospital, Hennur", distance: "12.0 KM", time: "20 mins", highlight: "Orthopedic & Super-speciality" },
    { name: "Apex Multispeciality Hospital", distance: "13.0 KM", time: "22 mins", highlight: "Multi-disciplinary" },
    { name: "Altius Multispeciality Hospital", distance: "14.0 KM", time: "24 mins", highlight: "Modern Inpatient Care" },
    { name: "Sparsh Hospital, Yelahanka", distance: "16.0 KM", time: "26 mins", highlight: "Tertiary Healthcare" },
    { name: "Narmada Multispeciality Hospital", distance: "16.0 KM", time: "26 mins", highlight: "Reputed Specialists" }
  ],
  connectivity: [
    { name: "Kannur Main Junction", distance: "9.0 KM", time: "15 mins", highlight: "Fast access to Hennur / Thanisandra" },
    { name: "Budigere Cross & SEZ", distance: "9.0 KM", time: "14 mins", highlight: "Major Industrial & IT Hub" },
    { name: "Bagalur Aerospace Park", distance: "9.0 KM", time: "15 mins", highlight: "Boeing, Shell, Foxconn corridor" },
    { name: "KR Puram Railway Station / Metro", distance: "9.0 KM", time: "16 mins", highlight: "Purple Line Metro Hub" },
    { name: "Hoskote Town & Auto Hub", distance: "12.0 KM", time: "18 mins", highlight: "Volvo, Honda, Scania Industrial Zone" },
    { name: "Yelahanka New Town", distance: "17.0 KM", time: "25 mins", highlight: "North Bengaluru Commercial Hub" },
    { name: "Kempegowda Int'l Airport (KIA)", distance: "18.0 KM", time: "25 mins", highlight: "Signal-free Airport Corridor" },
    { name: "Bengaluru CBD / MG Road", distance: "25.0 KM", time: "45 mins", highlight: "Central Business District" },
    { name: "Devanahalli Tech Park", distance: "26.0 KM", time: "30 mins", highlight: "Aerotropolis & KIADB Zone" }
  ]
};

export const WHY_INVEST = [
  {
    title: "100% Legal & Approved",
    description: "HPA (Hoskote Planning Authority) & BMRDA approvals in place. Clear legal titles with individual A & E Khata for immediate peace of mind.",
    icon: "Award"
  },
  {
    title: "Rapid Growth Corridor",
    description: "Gundur & Hoskote are at the epicenter of Bengaluru's exponential expansion, connecting STRR, PRR, and KIA Airport corridor.",
    icon: "TrendingUp"
  },
  {
    title: "Ready For Immediate Registration",
    description: "No long waiting periods. Plots are demarcated, paved, serviced with utilities, and ready for on-the-spot registration and villa construction.",
    icon: "Key"
  },
  {
    title: "Only 55 Limited Plots",
    description: "Low-density boutique community of only 111 total plots ensuring exclusivity, serene living, and superior capital appreciation.",
    icon: "Flame"
  },
  {
    title: "Exceptional Price Value",
    description: "At ₹7,699/Sq.Ft, enjoy early-mover advantage in a high-demand residential corridor with high projected rental yield and capital appreciation.",
    icon: "BadgePercent"
  },
  {
    title: "Developed by MVK",
    description: "Backed by MVK Builders & Developers LLP with a proven commitment to infrastructure excellence, transparent documentation, and on-time delivery.",
    icon: "CheckCircle2"
  }
];

export const GALLERY_ITEMS = [
  {
    src: "/images/grand-entrance.jpg",
    title: "Grand Entrance Plaza",
    category: "Architecture",
    subtitle: "Majestic security gateway with architectural lighting and palm boulevard"
  },
  {
    src: "/images/master-layout-plan.jpg",
    title: "Master Layout Blueprint",
    category: "Layout",
    subtitle: "Detailed 111-plot layout plan showing road widths, park zone, and utilities"
  },
  {
    src: "/images/avenue-street-view.jpg",
    title: "30 Ft Wide Avenue Roads",
    category: "Infrastructure",
    subtitle: "Tree-lined concrete avenues, underground drainage, and modern streetlamps"
  },
  {
    src: "/images/aerial-layout-view.jpg",
    title: "Aerial 3D Master Overview",
    category: "Overview",
    subtitle: "6-Acre lush green community overview with 3 dedicated entry gates"
  }
];

export const FAQS = [
  {
    q: "What is the exact location of MVK Venkatadri Enclave?",
    a: "The project is located at Gunduru Village, Bidarahalli Hobali, Bangalore East Taluk, Bangalore Urban District - 560049 (Near Hoskote / Budigere corridor). It is situated right opposite Discovery National School."
  },
  {
    q: "What authorities have approved this project?",
    a: "The layout is officially approved by HPA (Hoskote Planning Authority) and BMRDA (Bangalore Metropolitan Region Development Authority). It comes with clear A & E Khata and clean title deeds."
  },
  {
    q: "Can I get a bank loan for purchasing a plot?",
    a: "Yes! Since the project is HPA and BMRDA approved with clear legal titles, all leading nationalized and private banks (SBI, HDFC, ICICI, Axis, Bank of Baroda, etc.) provide loan sanctions up to 75-80% of plot value."
  },
  {
    q: "What are the available plot dimensions?",
    a: "We offer standard 30×40 (1,200 sq.ft), 30×45 (1,350 sq.ft), 30×50 (1,500 sq.ft), premium corner plots (dual road facing), and unique odd-shaped custom villa plots."
  },
  {
    q: "Are the plots ready for immediate registration and construction?",
    a: "Yes, all 55 currently available plots are fully demarcated with boundary stones, 30 ft concrete roads, underground electricity, and water lines ready for immediate registration and house construction."
  },
  {
    q: "How can I schedule a site visit?",
    a: "You can click on the 'Book Site Visit' button on this page, call our sales desk directly at +91 98450 12345, or reach us on WhatsApp. We also arrange complimentary cab pickups for families."
  }
];
