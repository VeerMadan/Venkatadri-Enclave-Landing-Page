import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Lock, Unlock, ArrowLeft, Download, Upload, 
  Save, RefreshCw, Search, Filter, Check, X, Edit3, 
  Building2, Sparkles, CheckCircle2, AlertCircle, Database,
  TrendingUp, Layers, Compass, Eye, Sun, Moon, FileSpreadsheet,
  KeyRound, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getStoredInventory, 
  saveStoredInventory, 
  resetStoredInventory,
  formatINR,
  calculateEMI,
  BASE_RATE_PER_SQFT
} from '../../src/data/plotInventoryData';
import { useTheme } from '../../src/context/ThemeContext';

// STRICT ADMIN PASSCODE (Only this exact string is permitted)
const STRICT_ADMIN_PASSCODE = "MVK@enclave123";

export default function AdminDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);

  const [inventory, setInventory] = useState([]);
  const [selectedPlotId, setSelectedPlotId] = useState(1);
  const [selectedPlotsForBulk, setSelectedPlotsForBulk] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [blockFilter, setBlockFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const [toastMessage, setToastMessage] = useState(null);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');

  // Check session auth token
  useEffect(() => {
    const isAuth = sessionStorage.getItem('mvk_admin_auth_token') === 'mvk_secure_session_token_granted';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Load inventory
  useEffect(() => {
    const data = getStoredInventory();
    setInventory(data);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (failedAttempts >= 5) {
      setAuthError('Too many failed attempts. Please reload to try again.');
      return;
    }

    // STRICT comparison: ONLY MVK@enclave123 is accepted
    if (passcodeInput === STRICT_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mvk_admin_auth_token', 'mvk_secure_session_token_granted');
      setAuthError('');
      showToast('Authenticated: Master Plot Database Loaded');
    } else {
      setFailedAttempts(prev => prev + 1);
      setAuthError(`Access Denied. Incorrect Passcode. (${5 - (failedAttempts + 1)} attempts remaining)`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mvk_admin_auth_token');
    setIsAuthenticated(false);
    setPasscodeInput('');
  };

  const currentPlot = useMemo(() => {
    return inventory.find(p => p.id === selectedPlotId) || inventory[0];
  }, [inventory, selectedPlotId]);

  // Financial Analytics
  const analytics = useMemo(() => {
    const totalCount = inventory.length;
    const availablePlots = inventory.filter(p => p.status === 'available');
    const bookedPlots = inventory.filter(p => p.status === 'booked');
    const soldPlots = inventory.filter(p => p.status === 'sold');

    const totalValuation = inventory.reduce((sum, p) => sum + p.totalPrice, 0);
    const availableValuation = availablePlots.reduce((sum, p) => sum + p.totalPrice, 0);
    const bookedValuation = bookedPlots.reduce((sum, p) => sum + p.totalPrice, 0);
    const soldValuation = soldPlots.reduce((sum, p) => sum + p.totalPrice, 0);

    return {
      totalCount,
      availableCount: availablePlots.length,
      bookedCount: bookedPlots.length,
      soldCount: soldPlots.length,
      totalValuation,
      availableValuation,
      bookedValuation,
      soldValuation
    };
  }, [inventory]);

  // Update single plot field
  const handleFieldChange = (field, val) => {
    setInventory(prev => prev.map(p => {
      if (p.id === selectedPlotId) {
        const updated = { ...p, [field]: val };

        if (field === 'areaSqFt' || field === 'baseRate') {
          const area = Number(field === 'areaSqFt' ? val : p.areaSqFt) || 0;
          const rate = Number(field === 'baseRate' ? val : p.baseRate) || BASE_RATE_PER_SQFT;
          const price = area * rate;
          const emi = calculateEMI(price);
          
          updated.areaSqFt = area;
          updated.baseRate = rate;
          updated.areaSqMt = +(area * 0.092903).toFixed(2);
          updated.totalPrice = price;
          updated.formattedPrice = formatINR(price);
          updated.emiEstimate = emi;
          updated.formattedEmi = `₹${emi.toLocaleString('en-IN')}/mo`;
        }

        if (field === 'type') {
          if (val === '30x40') updated.color = '#EF4444';
          else if (val === '30x45') updated.color = '#14B8A6';
          else if (val === '30x50') updated.color = '#3B82F6';
          else if (val === 'corner') updated.color = '#F59E0B';
          else if (val === 'odd') updated.color = '#EAB308';
        }

        return updated;
      }
      return p;
    }));
  };

  // Save changes to central database
  const handleSaveToDatabase = () => {
    saveStoredInventory(inventory);
    showToast('Saved & published changes to central database!');
  };

  // Bulk status change
  const handleBulkStatusChange = (newStatus) => {
    if (selectedPlotsForBulk.length === 0) return;
    const updated = inventory.map(p => {
      if (selectedPlotsForBulk.includes(p.id)) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    setInventory(updated);
    saveStoredInventory(updated);
    setSelectedPlotsForBulk([]);
    showToast(`Updated ${selectedPlotsForBulk.length} plots to ${newStatus.toUpperCase()}`);
  };

  // Bulk rate update
  const handleBulkRateUpdate = () => {
    const rateInput = prompt("Enter new Base Rate (₹/Sq.Ft) for selected plots:", "7699");
    if (!rateInput) return;
    const newRate = Number(rateInput);
    if (isNaN(newRate) || newRate <= 0) {
      alert("Please enter a valid numeric rate.");
      return;
    }

    const updated = inventory.map(p => {
      if (selectedPlotsForBulk.length === 0 || selectedPlotsForBulk.includes(p.id)) {
        const price = p.areaSqFt * newRate;
        const emi = calculateEMI(price);
        return {
          ...p,
          baseRate: newRate,
          totalPrice: price,
          formattedPrice: formatINR(price),
          emiEstimate: emi,
          formattedEmi: `₹${emi.toLocaleString('en-IN')}/mo`
        };
      }
      return p;
    });
    setInventory(updated);
    saveStoredInventory(updated);
    setSelectedPlotsForBulk([]);
    showToast(`Updated base rate to ₹${newRate}/Sq.Ft`);
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inventory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mvk_venkatadri_inventory_master_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Database exported to JSON');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Plot_No", "Block", "Category", "Dimensions", "Area_SqFt", "Area_SqMt", "Facing", "Base_Rate", "Total_Price_INR", "Status", "Road_Width", "Vastu_Note"];
    const rows = inventory.map(p => [
      p.number,
      `"${p.block}"`,
      p.type,
      `"${p.dimensions}"`,
      p.areaSqFt,
      p.areaSqMt,
      `"${p.facing}"`,
      p.baseRate,
      p.totalPrice,
      p.status,
      `"${p.roadWidth}"`,
      `"${p.vastu || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mvk_venkatadri_plot_inventory_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Database exported to CSV spreadsheet');
  };

  // Reset database
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all 111 plots to factory baseline data? This cannot be undone.")) {
      const fresh = resetStoredInventory();
      setInventory(fresh);
      showToast('Database restored to factory baseline');
    }
  };

  // Filter list
  const filteredPlots = useMemo(() => {
    return inventory.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNum = p.number.toString().includes(q) || p.plotNo.toLowerCase().includes(q);
        const matchBlock = p.block.toLowerCase().includes(q);
        const matchDim = p.dimensions.toLowerCase().includes(q);
        if (!matchNum && !matchBlock && !matchDim) return false;
      }
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (blockFilter !== 'all' && p.block !== blockFilter) return false;
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      return true;
    });
  }, [inventory, searchQuery, statusFilter, blockFilter, typeFilter]);

  // Login Screen (Secure Passcode Gate)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-page-main text-main-color flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel rounded-3xl p-8 border-theme-subtle shadow-2xl space-y-6 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <KeyRound className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-widest badge-luxury px-3 py-1 rounded-full">
              MVK Internal Portal
            </span>
            <h2 className="font-serif-luxury text-2xl font-bold text-main-color pt-2">
              Developer & Admin Portal
            </h2>
            <p className="text-xs text-sub-color">
              Secure Central Inventory & Plot Data Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-sub-color mb-1.5">
                Master Security Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter master passcode"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl neo-inset text-main-color text-xs focus:outline-none focus:border-amber-500/50"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sub-color hover:text-main-color"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <p className="text-[11px] text-rose-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unlock Admin Database</span>
            </button>
          </form>

          <div className="pt-2 border-t border-theme-subtle">
            <a 
              href="/"
              className="text-xs text-sub-color hover:text-amber-500 flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Landing Page</span>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-main text-main-color font-sans pb-12">
      
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-theme-subtle px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold font-serif-luxury shadow-inner">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-base sm:text-lg font-bold text-main-color">
                  Plot Inventory Master Database
                </h1>
                <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/30">
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-sub-color">
                MVK Venkatadri Enclave • 6 Acres • 111 Plots
              </p>
            </div>
          </div>

          {/* Quick Global Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl glass-panel text-xs font-semibold text-sub-color hover:text-main-color flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              <span>View Landing Page ↗</span>
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl glass-panel text-sub-color hover:text-main-color"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleSaveToDatabase}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl glass-panel text-rose-400 hover:text-rose-300 text-xs"
              title="Logout"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        
        {/* Executive KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="glass-panel rounded-2xl p-4 border-theme-subtle space-y-1">
            <span className="text-[10.5px] uppercase font-bold text-sub-color tracking-wider">Total Layout Value</span>
            <p className="text-xl sm:text-2xl font-black text-main-color font-serif-luxury">
              {formatINR(analytics.totalValuation)}
            </p>
            <p className="text-[10px] text-sub-color">111 Total Villa Plots</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 border-emerald-500/30 space-y-1 bg-emerald-500/[0.03]">
            <span className="text-[10.5px] uppercase font-bold text-emerald-500 tracking-wider">Available Pipeline</span>
            <p className="text-xl sm:text-2xl font-black text-emerald-500 font-serif-luxury">
              {formatINR(analytics.availableValuation)}
            </p>
            <p className="text-[10px] text-emerald-500/80 font-bold">{analytics.availableCount} Plots Available for Sale</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 border-amber-500/30 space-y-1 bg-amber-500/[0.03]">
            <span className="text-[10.5px] uppercase font-bold text-amber-500 tracking-wider">Booked Under Token</span>
            <p className="text-xl sm:text-2xl font-black text-amber-500 font-serif-luxury">
              {formatINR(analytics.bookedValuation)}
            </p>
            <p className="text-[10px] text-amber-500/80 font-bold">{analytics.bookedCount} Plots in Legal Verification</p>
          </div>

          <div className="glass-panel rounded-2xl p-4 border-rose-500/30 space-y-1 bg-rose-500/[0.03]">
            <span className="text-[10.5px] uppercase font-bold text-rose-400 tracking-wider">Sold & Registered</span>
            <p className="text-xl sm:text-2xl font-black text-rose-400 font-serif-luxury">
              {formatINR(analytics.soldValuation)}
            </p>
            <p className="text-[10px] text-rose-400/80 font-bold">{analytics.soldCount} Plots Registered to Owners</p>
          </div>
        </div>

        {/* Database Toolbar & Action Center */}
        <div className="glass-panel rounded-2xl p-4 border-theme-subtle space-y-3">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-sub-color" />
              <input
                type="text"
                placeholder="Search plot #, block name, dimension..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-8 py-2 rounded-xl neo-inset text-main-color text-xs focus:outline-none placeholder-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sub-color">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Export & Reset Tools */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 rounded-xl glass-panel text-xs text-sub-color hover:text-main-color flex items-center gap-1 cursor-pointer"
                title="Export CSV for Excel"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-xl glass-panel text-xs text-sub-color hover:text-main-color flex items-center gap-1 cursor-pointer"
                title="Export JSON"
              >
                <Download className="w-3.5 h-3.5 text-amber-500" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={() => {
                  setJsonText(JSON.stringify(inventory, null, 2));
                  setJsonModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl glass-panel text-xs text-sub-color hover:text-main-color flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
              </button>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

          </div>

          {/* Filter Dropdowns & Bulk Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-theme-subtle text-xs">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sub-color font-bold uppercase text-[10px]">Filter By:</span>

              {/* Status Select */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg neo-inset text-main-color text-xs bg-page-main"
              >
                <option value="all">All Status</option>
                <option value="available">🟢 Available ({analytics.availableCount})</option>
                <option value="booked">🟡 Booked ({analytics.bookedCount})</option>
                <option value="sold">🔴 Sold ({analytics.soldCount})</option>
              </select>

              {/* Block Select */}
              <select
                value={blockFilter}
                onChange={(e) => setBlockFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg neo-inset text-main-color text-xs bg-page-main"
              >
                <option value="all">All Blocks</option>
                <option value="North Boulevard">Block A: North Boulevard</option>
                <option value="Central Park Avenue">Block B: Central Park Avenue</option>
                <option value="South Greens Enclave">Block C: South Greens Enclave</option>
                <option value="East Gate Crescent">Block D: East Gate Crescent</option>
              </select>

              {/* Footprint Select */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg neo-inset text-main-color text-xs bg-page-main"
              >
                <option value="all">All Footprints</option>
                <option value="30x40">30 × 40 (1,200 SqFt)</option>
                <option value="30x45">30 × 45 (1,350 SqFt)</option>
                <option value="30x50">30 × 50 (1,500 SqFt)</option>
                <option value="corner">Corner Plots</option>
                <option value="odd">Odd Plots</option>
              </select>
            </div>

            {/* Bulk Batch Actions */}
            {selectedPlotsForBulk.length > 0 && (
              <div className="flex items-center gap-2 p-1 px-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-[11px] font-bold text-amber-500">
                  {selectedPlotsForBulk.length} Selected:
                </span>
                
                <button
                  onClick={() => handleBulkStatusChange('available')}
                  className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold"
                >
                  Mark Available
                </button>

                <button
                  onClick={() => handleBulkStatusChange('booked')}
                  className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold"
                >
                  Mark Booked
                </button>

                <button
                  onClick={() => handleBulkStatusChange('sold')}
                  className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold"
                >
                  Mark Sold
                </button>

                <button
                  onClick={handleBulkRateUpdate}
                  className="px-2 py-0.5 rounded glass-panel text-main-color text-[10px] font-bold"
                >
                  Update Rate
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Main Work Area: Inventory Table + Side Inspector Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Data Grid / Table (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-4 border-theme-subtle space-y-3">
            
            <div className="flex items-center justify-between pb-2 border-b border-theme-subtle text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (selectedPlotsForBulk.length === filteredPlots.length) {
                      setSelectedPlotsForBulk([]);
                    } else {
                      setSelectedPlotsForBulk(filteredPlots.map(p => p.id));
                    }
                  }}
                  className="text-[10px] font-semibold text-sub-color hover:text-amber-500 cursor-pointer"
                >
                  {selectedPlotsForBulk.length === filteredPlots.length ? 'Deselect All' : 'Select All Visible'}
                </button>
                <span className="text-sub-color">•</span>
                <span className="text-sub-color">Showing {filteredPlots.length} plots</span>
              </div>

              <span className="text-[10px] text-amber-500 font-semibold">Click a row to edit details</span>
            </div>

            {/* Scrollable Table */}
            <div className="overflow-x-auto max-h-[600px] scrollbar-thin">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-page-main border-b border-theme-subtle text-sub-color uppercase text-[9.5px]">
                  <tr>
                    <th className="p-2 w-8">#</th>
                    <th className="p-2">Plot</th>
                    <th className="p-2">Block</th>
                    <th className="p-2">Footprint</th>
                    <th className="p-2">Area</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme-subtle">
                  {filteredPlots.map(plot => {
                    const isSelected = selectedPlotId === plot.id;
                    const isChecked = selectedPlotsForBulk.includes(plot.id);

                    return (
                      <tr
                        key={plot.id}
                        onClick={() => setSelectedPlotId(plot.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-amber-500/20 font-semibold' : 'hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <td className="p-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPlotsForBulk(prev => [...prev, plot.id]);
                              } else {
                                setSelectedPlotsForBulk(prev => prev.filter(id => id !== plot.id));
                              }
                            }}
                            className="accent-amber-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-2 font-mono font-bold text-main-color">
                          #{plot.number}
                        </td>
                        <td className="p-2 text-sub-color text-[11px]">{plot.block}</td>
                        <td className="p-2">
                          <span 
                            className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white shadow-sm"
                            style={{ backgroundColor: plot.color }}
                          >
                            {plot.dimensions}
                          </span>
                        </td>
                        <td className="p-2 font-mono text-main-color text-[11px]">{plot.areaSqFt} SqFt</td>
                        <td className="p-2 font-mono text-amber-500 font-bold text-[11px]">
                          {plot.formattedPrice}
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            plot.status === 'available' ? 'bg-emerald-500/10 text-emerald-500' :
                            plot.status === 'booked' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {plot.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

          {/* Right Column: Detailed Plot Inspector Form (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            {currentPlot ? (
              <div className="glass-panel rounded-3xl p-5 border-theme-subtle shadow-xl space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-theme-subtle">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                      Plot Information Dossier
                    </span>
                    <h3 className="font-serif-luxury text-xl font-bold text-main-color">
                      {currentPlot.plotNo} ({currentPlot.dimensions})
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      currentPlot.status === 'available' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' :
                      currentPlot.status === 'booked' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}>
                      {currentPlot.status}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-3 text-xs">
                  
                  {/* Status Toggle Radio */}
                  <div>
                    <label className="block text-sub-color font-semibold mb-1">Status on Live Site</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['available', 'booked', 'sold'].map(st => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleFieldChange('status', st)}
                          className={`py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                            currentPlot.status === st
                              ? st === 'available' ? 'bg-emerald-500 text-white shadow' :
                                st === 'booked' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-rose-500 text-white shadow'
                              : 'glass-panel text-sub-color hover:text-main-color'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Plot Label */}
                    <div>
                      <label className="block text-sub-color font-semibold mb-1">Plot Title</label>
                      <input
                        type="text"
                        value={currentPlot.plotNo}
                        onChange={(e) => handleFieldChange('plotNo', e.target.value)}
                        className="w-full p-2 rounded-xl neo-inset text-main-color font-mono"
                      />
                    </div>

                    {/* Avenue Block */}
                    <div>
                      <label className="block text-sub-color font-semibold mb-1">Avenue Block</label>
                      <select
                        value={currentPlot.block}
                        onChange={(e) => handleFieldChange('block', e.target.value)}
                        className="w-full p-2 rounded-xl neo-inset text-main-color bg-page-main"
                      >
                        <option value="North Boulevard">North Boulevard</option>
                        <option value="Central Park Avenue">Central Park Avenue</option>
                        <option value="South Greens Enclave">South Greens Enclave</option>
                        <option value="East Gate Crescent">East Gate Crescent</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Area SqFt */}
                    <div>
                      <label className="block text-sub-color font-semibold mb-1">Area (Sq.Ft)</label>
                      <input
                        type="number"
                        value={currentPlot.areaSqFt}
                        onChange={(e) => handleFieldChange('areaSqFt', Number(e.target.value))}
                        className="w-full p-2 rounded-xl neo-inset text-main-color font-mono font-bold"
                      />
                    </div>

                    {/* Base Rate */}
                    <div>
                      <label className="block text-sub-color font-semibold mb-1">Rate (₹/Sq.Ft)</label>
                      <input
                        type="number"
                        value={currentPlot.baseRate || BASE_RATE_PER_SQFT}
                        onChange={(e) => handleFieldChange('baseRate', Number(e.target.value))}
                        className="w-full p-2 rounded-xl neo-inset text-main-color font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Facing */}
                    <div>
                      <label className="block text-sub-color font-semibold mb-1">Facing</label>
                      <select
                        value={currentPlot.facing}
                        onChange={(e) => handleFieldChange('facing', e.target.value)}
                        className="w-full p-2 rounded-xl neo-inset text-main-color bg-page-main"
                      >
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="North-East">North-East</option>
                        <option value="South-East">South-East</option>
                      </select>
                    </div>

                    {/* Dimensions Text */}
                    <div>
                      <label className="block text-sub-color font-semibold mb-1">Dimensions Text</label>
                      <input
                        type="text"
                        value={currentPlot.dimensions}
                        onChange={(e) => handleFieldChange('dimensions', e.target.value)}
                        className="w-full p-2 rounded-xl neo-inset text-main-color"
                      />
                    </div>
                  </div>

                  {/* Calculated Price Display */}
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-amber-500 uppercase font-semibold">Total Price</p>
                      <p className="text-xl font-bold text-main-color font-serif-luxury">{currentPlot.formattedPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-sub-color uppercase">Monthly EMI</p>
                      <p className="text-xs font-mono font-bold text-emerald-500">{currentPlot.formattedEmi}</p>
                    </div>
                  </div>

                  {/* Vastu note */}
                  <div>
                    <label className="block text-sub-color font-semibold mb-1">Vastu / Notes</label>
                    <input
                      type="text"
                      value={currentPlot.vastu}
                      onChange={(e) => handleFieldChange('vastu', e.target.value)}
                      className="w-full p-2 rounded-xl neo-inset text-main-color"
                    />
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveToDatabase}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Update Database</span>
                  </button>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>

      {/* JSON Import/Export Modal */}
      {jsonModalOpen && (
        <div 
          onClick={() => setJsonModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="max-w-2xl w-full glass-panel rounded-3xl p-6 border-theme-subtle space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-lg font-bold text-main-color">
                Raw JSON Inventory Database
              </h3>
              <button onClick={() => setJsonModalOpen(false)} className="p-1 rounded-full glass-panel">
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={14}
              className="w-full p-3.5 rounded-2xl neo-inset font-mono text-xs text-main-color"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setJsonModalOpen(false)}
                className="px-4 py-2 rounded-xl glass-panel text-xs text-sub-color"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  try {
                    const parsed = JSON.parse(jsonText);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      setInventory(parsed);
                      saveStoredInventory(parsed);
                      setJsonModalOpen(false);
                      showToast(`Imported ${parsed.length} plots successfully!`);
                    } else {
                      alert('JSON must be an array of plot objects.');
                    }
                  } catch (err) {
                    alert('Invalid JSON: ' + err.message);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow"
              >
                Save & Apply JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white border border-amber-400/40 shadow-2xl flex items-center gap-2 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
