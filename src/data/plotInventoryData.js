// MVK VENKATADRI ENCLAVE - 111 Plot Inventory Dataset

export const BASE_RATE_PER_SQFT = 7699;

// Helper to calculate exact price
export const calculatePlotPrice = (areaSqFt) => {
  return areaSqFt * BASE_RATE_PER_SQFT;
};

// Helper to format Indian Currency
export const formatINR = (val) => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(val / 100000).toFixed(2)} Lakhs`;
};

// Helper to estimate 20-year EMI @ 8.5% with 20% down payment
export const calculateEMI = (totalPrice, tenureYears = 20, interestRate = 8.5) => {
  const loanAmount = totalPrice * 0.8; // 80% loan
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  return emi;
};

// Generate 111 plots matching the project layout
const generate111Plots = () => {
  const plots = [];

  // Define Layout Avenue Blocks
  // Block A: North Boulevard (Plots 1 to 24)
  // Block B: Central Park Avenue (Plots 25 to 54)
  // Block C: South Greens Enclave (Plots 55 to 84)
  // Block D: East Gate Crescent (Plots 85 to 111)

  for (let i = 1; i <= 111; i++) {
    let type = '30x40';
    let dimensions = '30 × 40 Ft';
    let areaSqFt = 1200;
    let facing = i % 2 === 0 ? 'East' : 'West';
    let block = 'North Boulevard';
    let color = '#EF4444'; // Red-orange for 30x40

    // Determine block
    if (i <= 24) {
      block = 'North Boulevard';
    } else if (i <= 54) {
      block = 'Central Park Avenue';
    } else if (i <= 84) {
      block = 'South Greens Enclave';
    } else {
      block = 'East Gate Crescent';
    }

    // Assign specific dimensions & odd/corner plots realistically
    if ([1, 12, 13, 24, 25, 38, 39, 54, 55, 70, 71, 84, 85, 98, 99, 111].includes(i)) {
      type = 'corner';
      dimensions = 'Corner (Dual Road)';
      areaSqFt = 1450 + ((i * 37) % 450); // 1450 - 1900 sqft
      facing = (i % 4 === 0) ? 'North-East' : (i % 4 === 1) ? 'East' : (i % 4 === 2) ? 'North' : 'South-East';
      color = '#F59E0B'; // Amber
    } else if ([7, 8, 19, 20, 31, 32, 45, 46, 61, 62, 77, 78, 91, 92, 105, 106].includes(i)) {
      type = '30x50';
      dimensions = '30 × 50 Ft';
      areaSqFt = 1500;
      facing = i % 3 === 0 ? 'North' : i % 2 === 0 ? 'East' : 'West';
      color = '#3B82F6'; // Blue
    } else if ([4, 5, 16, 17, 28, 29, 41, 42, 50, 51, 67, 68, 80, 81, 95, 96, 108, 109].includes(i)) {
      type = '30x45';
      dimensions = '30 × 45 Ft';
      areaSqFt = 1350;
      facing = i % 2 === 0 ? 'East' : 'West';
      color = '#14B8A6'; // Teal
    } else if ([23, 53, 83, 110].includes(i)) {
      type = 'odd';
      dimensions = 'Custom Odd Shape';
      areaSqFt = 1620;
      facing = 'East';
      color = '#EAB308'; // Yellow
    }

    // Realistic Initial Status distribution: 55 Available, 28 Booked, 28 Sold
    let status = 'available';
    if ([2, 6, 11, 14, 18, 22, 27, 33, 37, 40, 44, 49, 56, 60, 65, 69, 73, 76, 82, 86, 90, 94, 97, 101, 104, 107, 110, 111].includes(i)) {
      status = 'sold';
    } else if ([3, 9, 15, 21, 26, 30, 36, 43, 48, 52, 58, 63, 66, 72, 75, 79, 87, 89, 93, 100, 103, 108, 1, 13, 25, 39, 55, 71].includes(i)) {
      status = 'booked';
    } else {
      status = 'available';
    }

    const price = calculatePlotPrice(areaSqFt);
    const emi = calculateEMI(price);

    let vastuNote = '100% Vastu Compliant with unobstructed morning sunlight';
    if (facing.includes('East')) vastuNote = 'East Facing – Auspicious morning sun & maximum energy flow';
    if (facing.includes('North')) vastuNote = 'North Facing – Kubera position, high prosperity & cool ambiance';
    if (facing.includes('West')) vastuNote = 'West Facing – High evening breeze and grand terrace sunset views';

    plots.push({
      id: i,
      plotNo: `Plot #${i}`,
      number: i,
      block,
      type,
      dimensions,
      areaSqFt,
      areaSqMt: +(areaSqFt * 0.092903).toFixed(2),
      facing,
      roadWidth: '30 Ft Wide Concrete Avenue',
      color,
      status, // 'available' | 'booked' | 'sold'
      baseRate: BASE_RATE_PER_SQFT,
      totalPrice: price,
      formattedPrice: formatINR(price),
      emiEstimate: emi,
      formattedEmi: `₹${emi.toLocaleString('en-IN')}/mo`,
      vastu: vastuNote,
      highlights: [
        'HPA & BMRDA Approved Sanction',
        'Individual A & E Khata Title',
        'Underground Water & Power Connection Ready',
        '30 Ft Concrete Avenue Frontage',
        i <= 54 ? "Walking distance to Children's Park & Gazebo" : "Quick access to Grand Entrance Gateway"
      ]
    });
  }

  return plots;
};

export const INITIAL_PLOT_INVENTORY = generate111Plots();

// Storage key for persistent user adjustments/interactive sales state
export const INVENTORY_STORAGE_KEY = 'mvk_venkatadri_inventory_v1';

export const getStoredInventory = () => {
  try {
    const data = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length === 111) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load stored inventory:', err);
  }
  return INITIAL_PLOT_INVENTORY;
};

export const saveStoredInventory = (inventory) => {
  try {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mvk_inventory_updated', { detail: inventory }));
    }
  } catch (err) {
    console.error('Failed to save stored inventory:', err);
  }
};

export const resetStoredInventory = () => {
  try {
    localStorage.removeItem(INVENTORY_STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mvk_inventory_updated', { detail: INITIAL_PLOT_INVENTORY }));
    }
  } catch (err) {
    console.error('Failed to reset inventory:', err);
  }
  return INITIAL_PLOT_INVENTORY;
};

