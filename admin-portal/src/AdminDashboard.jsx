import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Lock, Unlock, ArrowLeft, Download, Upload, 
  Save, RefreshCw, Search, Filter, Check, X, Edit3, 
  Building2, Sparkles, CheckCircle2, AlertCircle, Database,
  TrendingUp, Layers, Compass, Eye, Sun, Moon, FileSpreadsheet,
  KeyRound, EyeOff, Users, Phone, MessageSquare, Trash2,
  Settings, Globe, ExternalLink, Calendar, MapPin, DollarSign,
  Send, Plus, Sliders, ChevronRight
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
import { 
  getStoredLeads, 
  updateLeadStatus, 
  deleteLead, 
  exportLeadsToCSV,
  LEAD_SYNC_EVENT,
  LEADS_UPDATED_EVENT 
} from '../../src/data/leadsData';
import { 
  getStoredSiteSettings, 
  saveStoredSiteSettings, 
  resetStoredSiteSettings,
  SETTINGS_SYNC_EVENT 
} from '../../src/data/siteSettings';
import { useTheme } from '../../src/context/ThemeContext';

// STRICT ADMIN PASSCODE
const STRICT_ADMIN_PASSCODE = "MVK@enclave123";

export default function AdminDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Active Admin Section Tab
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'leads', 'content', 'backup'

  // Inventory State
  const [inventory, setInventory] = useState([]);
  const [selectedPlotId, setSelectedPlotId] = useState(1);
  const [selectedPlotsForBulk, setSelectedPlotsForBulk] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Leads CRM State
  const [leads, setLeads] = useState([]);
  const [leadFilterStatus, setLeadFilterStatus] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Check session auth token on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('mvk_admin_auth_token') === 'mvk_secure_session_token_granted';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Load inventory, leads, and settings
  useEffect(() => {
    const loadAll = () => {
      setInventory(getStoredInventory());
      setLeads(getStoredLeads());
      setSiteSettings(getStoredSiteSettings());
    };

    loadAll();

    const handleInventoryUpdate = () => setInventory(getStoredInventory());
    const handleLeadsUpdate = () => setLeads(getStoredLeads());
    const handleSettingsUpdate = () => setSiteSettings(getStoredSiteSettings());

    window.addEventListener('mvk_inventory_updated', handleInventoryUpdate);
    window.addEventListener(LEADS_UPDATED_EVENT, handleLeadsUpdate);
    window.addEventListener(LEAD_SYNC_EVENT, handleLeadsUpdate);
    window.addEventListener(SETTINGS_SYNC_EVENT, handleSettingsUpdate);
    window.addEventListener('storage', loadAll);

    return () => {
      window.removeEventListener('mvk_inventory_updated', handleInventoryUpdate);
      window.removeEventListener(LEADS_UPDATED_EVENT, handleLeadsUpdate);
      window.removeEventListener(LEAD_SYNC_EVENT, handleLeadsUpdate);
      window.removeEventListener(SETTINGS_SYNC_EVENT, handleSettingsUpdate);
      window.removeEventListener('storage', loadAll);
    };
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

    if (passcodeInput === STRICT_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mvk_admin_auth_token', 'mvk_secure_session_token_granted');
      setAuthError('');
      showToast('Master Control Center Loaded');
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

  // Filtered inventory
  const filteredInventory = useMemo(() => {
    return inventory.filter(p => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchNo = p.number.toString().includes(q) || p.plotNo.toLowerCase().includes(q);
        const matchBlock = (p.block || '').toLowerCase().includes(q);
        if (!matchNo && !matchBlock) return false;
      }
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (typeFilter !== 'all') {
        if (typeFilter === 'odd' && (p.type === 'odd' || p.type === 'corner')) {
          // match odd
        } else if (p.type !== typeFilter) {
          return false;
        }
      }
      return true;
    });
  }, [inventory, searchQuery, statusFilter, typeFilter]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (leadFilterStatus !== 'all' && l.status !== leadFilterStatus) return false;
      if (leadSearch.trim()) {
        const q = leadSearch.toLowerCase();
        const matchName = (l.name || '').toLowerCase().includes(q);
        const matchPhone = (l.phone || '').includes(q);
        if (!matchName && !matchPhone) return false;
      }
      return true;
    });
  }, [leads, leadFilterStatus, leadSearch]);

  const newLeadsCount = useMemo(() => {
    return leads.filter(l => l.status === 'New').length;
  }, [leads]);

  // Update Individual Plot
  const handleUpdatePlotStatus = (plotId, newStatus) => {
    const updated = inventory.map(p => p.id === plotId ? { ...p, status: newStatus } : p);
    setInventory(updated);
    saveStoredInventory(updated);
    showToast(`Plot #${plotId} marked as ${newStatus.toUpperCase()}`);
  };

  const handleUpdatePlotDetails = (field, value) => {
    if (!currentPlot) return;
    let val = value;
    if (field === 'areaSqFt') val = parseInt(value, 10) || 1200;

    const updated = inventory.map(p => {
      if (p.id === currentPlot.id) {
        const newPlot = { ...p, [field]: val };
        if (field === 'areaSqFt') {
          newPlot.totalPrice = newPlot.areaSqFt * (newPlot.baseRate || siteSettings.baseRatePerSqFt || 7699);
          newPlot.formattedPrice = formatINR(newPlot.totalPrice);
          newPlot.emiEstimate = calculateEMI(newPlot.totalPrice);
          newPlot.formattedEmi = `₹${newPlot.emiEstimate.toLocaleString('en-IN')}/mo`;
        }
        return newPlot;
      }
      return p;
    });

    setInventory(updated);
    saveStoredInventory(updated);
    showToast(`Plot #${currentPlot.id} ${field} updated`);
  };

  // Bulk Status Update
  const handleBulkStatusChange = (newStatus) => {
    if (!selectedPlotsForBulk.length) return;
    const updated = inventory.map(p => {
      if (selectedPlotsForBulk.includes(p.id)) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    setInventory(updated);
    saveStoredInventory(updated);
    setSelectedPlotsForBulk([]);
    showToast(`${selectedPlotsForBulk.length} plots updated to ${newStatus.toUpperCase()}`);
  };

  const toggleSelectAll = () => {
    if (selectedPlotsForBulk.length === filteredInventory.length) {
      setSelectedPlotsForBulk([]);
    } else {
      setSelectedPlotsForBulk(filteredInventory.map(p => p.id));
    }
  };

  // Site Settings Save
  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updated = saveStoredSiteSettings(siteSettings);
    if (updated) {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
      showToast('Website Settings Saved & Live!');
    }
  };

  // Export / Import System Backup
  const handleExportFullBackup = () => {
    const fullBackup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      siteSettings,
      inventory,
      leads
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MVK_Venkatadri_FullBackup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Full System JSON Backup Downloaded');
  };

  const handleResetToBlueprint = () => {
    if (window.confirm('Reset all 111 plots to official certified CAD blueprint layout?')) {
      const fresh = resetStoredInventory();
      setInventory(fresh);
      showToast('Inventory Reset to Certified CAD Blueprint');
    }
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN: Soft Claymorphism & Neomorphic Luxury Depth
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-page-main text-main-color flex items-center justify-center p-4 selection:bg-amber-400 selection:text-black">
        <div className="max-w-md w-full clay-card p-8 sm:p-10 border-theme-subtle shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Top Theme Switcher */}
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full clay-btn text-sub-color hover:text-amber-500 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-center space-y-3 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest px-2.5 py-0.5 rounded-full badge-luxury">
                MVK Developers LLP
              </span>
              <h1 className="font-serif-luxury text-2xl font-bold text-main-color mt-2">
                Venkatadri <span className="gold-gradient-text">Admin Portal</span>
              </h1>
              <p className="text-xs text-sub-color mt-1">
                Enter your administrative passcode to manage inventory & customer inquiries.
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-sub-color mb-1.5 pl-1">
                Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter Secure Passcode"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-sub-color hover:text-main-color cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 clay-btn-gold text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Enter Management Console</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <a href="/" className="text-xs text-sub-color hover:text-amber-500 flex items-center justify-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Landing Page</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD: Soft Claymorphism & Neomorphic Design
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-page-main text-main-color font-sans pb-20 selection:bg-amber-400 selection:text-black transition-colors duration-300">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Top Header Island */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 pt-3 pb-2 backdrop-blur-md">
        <div className="max-w-7xl mx-auto clay-card px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#070a0c] rounded-full flex items-center justify-center">
                <span className="font-serif-luxury font-bold text-amber-400 text-[11px]">M</span>
              </div>
            </div>
            <div>
              <h1 className="font-serif-luxury text-xs sm:text-sm font-bold text-main-color tracking-wider flex items-center gap-1.5">
                VENKATADRI <span className="text-amber-500 uppercase font-light">ADMIN</span>
              </h1>
              <p className="text-[10px] text-sub-color hidden sm:block">
                HPA & BMRDA Sanctioned • 111 Plots Central Console
              </p>
            </div>
          </div>

          {/* Claymorphic Tab Navigation Pill Bar */}
          <div className="flex items-center gap-1.5 p-1 rounded-full neo-inset text-xs">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inventory'
                  ? 'clay-btn-gold shadow-sm'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Plots (111)</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'leads'
                  ? 'clay-btn-gold shadow-sm'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Leads CRM</span>
              {newLeadsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-bold">
                  {newLeadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'content'
                  ? 'clay-btn-gold shadow-sm'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Site Copy</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'backup'
                  ? 'clay-btn-gold shadow-sm'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Analytics</span>
            </button>
          </div>

          {/* Actions & Theme Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full clay-btn text-sub-color hover:text-amber-500 cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-amber-600" />}
            </button>

            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full clay-btn text-xs font-semibold text-amber-500 hover:text-amber-600"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full clay-btn text-sub-color hover:text-rose-500 cursor-pointer"
              title="Logout"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-5 space-y-6">

        {/* ========================================================================= */}
        {/* TAB 1: PLOT INVENTORY CRUD                                                */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Stat Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
                <span className="text-[10px] text-sub-color uppercase font-bold tracking-wider">Total Units</span>
                <p className="text-2xl font-bold text-main-color font-mono my-1">{analytics.totalCount}</p>
                <span className="text-[10.5px] text-amber-500 font-semibold">6.0 Acres • HPA Sanctioned</span>
              </div>
              <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
                <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">Available</span>
                <p className="text-2xl font-bold text-emerald-500 font-mono my-1">{analytics.availableCount}</p>
                <span className="text-[10.5px] text-sub-color">{formatINR(analytics.availableValuation)} Open</span>
              </div>
              <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
                <span className="text-[10px] text-amber-500 uppercase font-bold tracking-wider">Booked</span>
                <p className="text-2xl font-bold text-amber-500 font-mono my-1">{analytics.bookedCount}</p>
                <span className="text-[10.5px] text-sub-color">{formatINR(analytics.bookedValuation)} Pipeline</span>
              </div>
              <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
                <span className="text-[10px] text-rose-500 uppercase font-bold tracking-wider">Sold Out</span>
                <p className="text-2xl font-bold text-rose-500 font-mono my-1">{analytics.soldCount}</p>
                <span className="text-[10.5px] text-sub-color">{formatINR(analytics.soldValuation)} Realized</span>
              </div>
            </div>

            {/* Inventory Controls & Filters */}
            <div className="clay-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-sub-color" />
                  <input
                    type="text"
                    placeholder="Search Plot # or Avenue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-2xl neo-inset text-xs text-main-color placeholder-slate-400 focus:outline-none focus:border-amber-500/50 w-48 sm:w-64"
                  />
                </div>

                {/* Status Selector */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-2xl neo-inset text-xs text-main-color focus:outline-none focus:border-amber-500/50 bg-page-main cursor-pointer"
                >
                  <option value="all">All Statuses ({inventory.length})</option>
                  <option value="available">Available ({analytics.availableCount})</option>
                  <option value="booked">Booked ({analytics.bookedCount})</option>
                  <option value="sold">Sold ({analytics.soldCount})</option>
                </select>

                {/* Blueprint Dimension Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-2xl neo-inset text-xs text-main-color focus:outline-none focus:border-amber-500/50 bg-page-main cursor-pointer"
                >
                  <option value="all">All Sizes</option>
                  <option value="30x40">30 × 40 (85 Plots)</option>
                  <option value="30x45">30 × 45 (2 Plots)</option>
                  <option value="30x50">30 × 50 (5 Plots)</option>
                  <option value="odd">Odd Plots (19 Plots)</option>
                </select>
              </div>

              {/* Bulk Select & Quick Change */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSelectAll}
                  className="px-3 py-2 rounded-2xl clay-btn text-xs text-sub-color hover:text-main-color cursor-pointer"
                >
                  {selectedPlotsForBulk.length === filteredInventory.length ? 'Deselect All' : 'Select All Filtered'}
                </button>

                {selectedPlotsForBulk.length > 0 && (
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl neo-inset">
                    <span className="text-[11px] text-amber-500 font-bold px-2">
                      {selectedPlotsForBulk.length} Selected:
                    </span>
                    <button
                      onClick={() => handleBulkStatusChange('available')}
                      className="px-2.5 py-1 rounded-xl text-[10.5px] font-bold bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 cursor-pointer"
                    >
                      Available
                    </button>
                    <button
                      onClick={() => handleBulkStatusChange('booked')}
                      className="px-2.5 py-1 rounded-xl text-[10.5px] font-bold bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 cursor-pointer"
                    >
                      Booked
                    </button>
                    <button
                      onClick={() => handleBulkStatusChange('sold')}
                      className="px-2.5 py-1 rounded-xl text-[10.5px] font-bold bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 cursor-pointer"
                    >
                      Sold
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Layout Grid + Detail Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Plot Tiles Grid (8 cols) */}
              <div className="lg:col-span-8 clay-card p-5 sm:p-6 border-theme-subtle">
                <div className="flex items-center justify-between pb-3 border-b border-theme-subtle mb-4 text-xs text-sub-color">
                  <span>Showing <strong>{filteredInventory.length}</strong> of 111 Plots</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Booked</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Sold</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-10 gap-2 max-h-[62vh] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredInventory.map(plot => {
                    const isSelected = selectedPlotId === plot.id;
                    const isChecked = selectedPlotsForBulk.includes(plot.id);
                    
                    // Refined soft status tints
                    const statusClass = plot.status === 'available'
                      ? 'border-emerald-500/30 bg-emerald-500/[0.07] text-emerald-600 dark:text-emerald-400'
                      : plot.status === 'booked'
                      ? 'border-amber-500/30 bg-amber-500/[0.07] text-amber-600 dark:text-amber-400'
                      : 'border-rose-500/30 bg-rose-500/[0.07] text-rose-600 dark:text-rose-400 opacity-60';

                    return (
                      <div
                        key={plot.id}
                        onClick={() => setSelectedPlotId(plot.id)}
                        className={`relative rounded-2xl p-2.5 text-center border transition-all cursor-pointer select-none group ${statusClass} ${
                          isSelected ? 'ring-2 ring-amber-400 shadow-md scale-105 z-10 bg-amber-500/10' : 'hover:scale-102'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (isChecked) {
                              setSelectedPlotsForBulk(prev => prev.filter(id => id !== plot.id));
                            } else {
                              setSelectedPlotsForBulk(prev => [...prev, plot.id]);
                            }
                          }}
                          className="absolute top-1.5 left-1.5 w-3 h-3 accent-amber-500 cursor-pointer"
                        />
                        <div className="text-xs font-mono font-bold mt-1">#{plot.number}</div>
                        <div className="text-[9.5px] opacity-75 truncate">{plot.dimensions.split(' ')[0]}</div>
                        <div className="text-[8.5px] opacity-60 uppercase">{plot.facing.slice(0, 1)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual Plot Editor (4 cols) */}
              <div className="lg:col-span-4 clay-card p-5 sm:p-6 border-theme-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-theme-subtle">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: currentPlot?.color }}></span>
                    <h3 className="text-base font-bold text-main-color font-mono">
                      Plot #{currentPlot?.number}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase ${
                    currentPlot?.status === 'available' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' :
                    currentPlot?.status === 'booked' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                  }`}>
                    {currentPlot?.status}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* Status Toggle Buttons */}
                  <div>
                    <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Set Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['available', 'booked', 'sold'].map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdatePlotStatus(currentPlot.id, st)}
                          className={`py-2 rounded-xl font-bold text-xs uppercase transition-all cursor-pointer ${
                            currentPlot.status === st
                              ? st === 'available' ? 'bg-emerald-500 text-slate-950 shadow-md'
                                : st === 'booked' ? 'bg-amber-500 text-slate-950 shadow-md'
                                : 'bg-rose-500 text-white shadow-md'
                              : 'clay-btn text-sub-color hover:text-main-color'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area Sq.Ft */}
                  <div>
                    <label className="block text-[11px] font-semibold text-sub-color mb-1">Plot Area (Sq.Ft)</label>
                    <input
                      type="number"
                      value={currentPlot?.areaSqFt || 1200}
                      onChange={(e) => handleUpdatePlotDetails('areaSqFt', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color font-mono focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {/* Dimensions Label */}
                  <div>
                    <label className="block text-[11px] font-semibold text-sub-color mb-1">Dimensions Text</label>
                    <input
                      type="text"
                      value={currentPlot?.dimensions || ''}
                      onChange={(e) => handleUpdatePlotDetails('dimensions', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {/* Facing Direction */}
                  <div>
                    <label className="block text-[11px] font-semibold text-sub-color mb-1">Facing Direction</label>
                    <select
                      value={currentPlot?.facing || 'East'}
                      onChange={(e) => handleUpdatePlotDetails('facing', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50 bg-page-main"
                    >
                      <option value="East">East Facing (Surya Vastu)</option>
                      <option value="West">West Facing (Sunset View)</option>
                      <option value="North">North Facing (Kubera Vastu)</option>
                      <option value="North-East">North-East Corner</option>
                    </select>
                  </div>

                  {/* Price & EMI Live Card */}
                  <div className="p-3.5 rounded-2xl neo-inset space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-sub-color">Rate per SqFt:</span>
                      <span className="font-mono font-bold text-amber-500">₹{currentPlot?.baseRate || 7699}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sub-color">Valuation:</span>
                      <span className="font-mono font-bold text-main-color">{currentPlot?.formattedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sub-color">Est. EMI (80%):</span>
                      <span className="font-mono font-bold text-emerald-500">{currentPlot?.formattedEmi}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LEADS & SITE VISITS CRM (Comfortable & Easy on the Eyes)           */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Filter & Action Bar */}
            <div className="clay-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-sub-color" />
                  <input
                    type="text"
                    placeholder="Search by customer name or phone..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-2xl neo-inset text-xs text-main-color placeholder-slate-400 focus:outline-none focus:border-amber-500/50 w-56 sm:w-80"
                  />
                </div>

                {/* Filter Status */}
                <select
                  value={leadFilterStatus}
                  onChange={(e) => setLeadFilterStatus(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl neo-inset text-xs text-main-color focus:outline-none focus:border-amber-500/50 bg-page-main cursor-pointer"
                >
                  <option value="all">All Inquiries ({leads.length})</option>
                  <option value="New">New ({newLeadsCount})</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Visit Scheduled">Visit Scheduled</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <button
                  onClick={exportLeadsToCSV}
                  disabled={!leads.length}
                  className="px-5 py-2.5 clay-btn-gold text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export to Excel / CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Card Directory */}
            {filteredLeads.length === 0 ? (
              <div className="clay-card py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full neo-inset flex items-center justify-center mx-auto text-sub-color">
                  <Users className="w-6 h-6 opacity-40" />
                </div>
                <h4 className="text-base font-bold text-main-color">No Customer Inquiries Found</h4>
                <p className="text-xs text-sub-color max-w-sm mx-auto">
                  Customer bookings submitted from "Book Free Site Visit" on the landing page will appear here instantly in real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="clay-card p-4 sm:p-5 border-theme-subtle flex flex-col justify-between space-y-3 hover:border-amber-500/40 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 font-bold text-xs flex items-center justify-center shadow-sm">
                          {(lead.name || 'C').slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-main-color leading-tight">{lead.name}</h4>
                          <span className="text-[10.5px] text-sub-color font-mono">{lead.formattedDate || lead.createdAt?.slice(0, 16)}</span>
                        </div>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer neo-inset border ${
                          lead.status === 'New' ? 'text-rose-500 border-rose-500/30' :
                          lead.status === 'Contacted' ? 'text-amber-500 border-amber-500/30' :
                          lead.status === 'Visit Scheduled' ? 'text-emerald-500 border-emerald-500/30' :
                          'text-sub-color border-slate-500/30'
                        } bg-page-main`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Visit Scheduled">Visit Scheduled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    {/* Details Badges */}
                    <div className="space-y-1.5 text-xs py-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sub-color text-[11px]">WhatsApp:</span>
                        <span className="font-mono font-bold text-amber-500">+91 {lead.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sub-color text-[11px]">Interest:</span>
                        <span className="capitalize font-semibold text-main-color">
                          {lead.type} {lead.plotType ? `• ${lead.plotType}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sub-color text-[11px]">Chauffeur Cab:</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.cab === 'yes' ? 'bg-amber-500/15 text-amber-500' : 'bg-slate-500/10 text-sub-color'
                        }`}>
                          {lead.cab === 'yes' ? 'Cab Requested' : 'Self Visit'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="pt-2 border-t border-theme-subtle flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Direct Call */}
                        <a
                          href={`tel:+91${lead.phone}`}
                          className="px-3 py-1.5 rounded-full clay-btn text-xs text-emerald-500 font-semibold flex items-center gap-1 hover:border-emerald-400/40"
                          title="Call Customer"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>

                        {/* WhatsApp Message */}
                        <a
                          href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20your%20inquiry%20regarding%20MVK%20Venkatadri%20Enclave.%20How%20may%20we%20assist%20you%20with%20your%20site%20visit%3F`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-full clay-btn text-xs text-emerald-500 font-semibold flex items-center gap-1 hover:border-emerald-400/40"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete inquiry from ${lead.name}?`)) {
                            deleteLead(lead.id);
                            showToast('Lead removed');
                          }
                        }}
                        className="p-1.5 rounded-full clay-btn text-sub-color hover:text-rose-500 cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WEBSITE CONTENT & COPY CONTROLS                                    */}
        {/* ========================================================================= */}
        {activeTab === 'content' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <form onSubmit={handleSaveSettings} className="clay-card p-6 sm:p-8 border-theme-subtle space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-theme-subtle">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-main-color">
                    Website Content & <span className="gold-gradient-text">Copy Settings</span>
                  </h3>
                  <p className="text-xs text-sub-color mt-0.5">
                    Changes made here sync live to the public landing page in real-time.
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 clay-btn-gold text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>

              {settingsSaved && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Website content updated and broadcasted live!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Project Brand Title</label>
                  <input
                    type="text"
                    value={siteSettings.projectName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, projectName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Developer Slogan</label>
                  <input
                    type="text"
                    value={siteSettings.slogan}
                    onChange={(e) => setSiteSettings({ ...siteSettings, slogan: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Hero Opening Tagline</label>
                  <input
                    type="text"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Base Price Rate (₹ / Sq.Ft)</label>
                  <input
                    type="number"
                    value={siteSettings.baseRatePerSqFt}
                    onChange={(e) => setSiteSettings({ ...siteSettings, baseRatePerSqFt: parseInt(e.target.value, 10) || 7699 })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-amber-500 font-mono font-bold focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Sales WhatsApp URL</label>
                  <input
                    type="text"
                    value={siteSettings.whatsappUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsappUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Official Sales Phone</label>
                  <input
                    type="text"
                    value={siteSettings.salesPhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, salesPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Official Sales Email</label>
                  <input
                    type="email"
                    value={siteSettings.salesEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, salesEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5">Layout Official Address</label>
                  <input
                    type="text"
                    value={siteSettings.locationFull}
                    onChange={(e) => setSiteSettings({ ...siteSettings, locationFull: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-sub-color mb-1.5 flex items-center justify-between">
                    <span>Webhook Integration URL (Optional)</span>
                    <span className="text-[10px] text-sub-color">Google Sheets / Zapier / Make.com</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/... or https://hooks.zapier.com/..."
                    value={siteSettings.webhookUrl || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, webhookUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color font-mono placeholder-slate-400 focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-[10px] text-sub-color mt-1">
                    When configured, every site visit submission is asynchronously POSTed to this endpoint in JSON format.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-theme-subtle flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all website content back to developer default copy?')) {
                      const reset = resetStoredSiteSettings();
                      setSiteSettings(reset);
                      showToast('Settings reset to defaults');
                    }
                  }}
                  className="text-xs text-rose-500 hover:underline cursor-pointer"
                >
                  Reset to Default
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 clay-btn-gold text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FINANCIAL ANALYTICS & SYSTEM BACKUP                                */}
        {/* ========================================================================= */}
        {activeTab === 'backup' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Financial Overview Card */}
            <div className="clay-card p-6 sm:p-8 border-theme-subtle space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-main-color flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Project Financial Valuation Breakdown
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl neo-inset space-y-1">
                  <span className="text-[10px] text-sub-color uppercase font-bold">Gross Project Value</span>
                  <p className="text-xl font-bold text-main-color font-mono">{formatINR(analytics.totalValuation)}</p>
                  <span className="text-[10.5px] text-sub-color">111 Plots @ ₹{siteSettings.baseRatePerSqFt}/SqFt</span>
                </div>
                <div className="p-4 rounded-2xl neo-inset space-y-1">
                  <span className="text-[10px] text-emerald-500 uppercase font-bold">Available Inventory Value</span>
                  <p className="text-xl font-bold text-emerald-500 font-mono">{formatINR(analytics.availableValuation)}</p>
                  <span className="text-[10.5px] text-sub-color">{analytics.availableCount} Plots Open for Sale</span>
                </div>
                <div className="p-4 rounded-2xl neo-inset space-y-1">
                  <span className="text-[10px] text-amber-500 uppercase font-bold">Committed Value</span>
                  <p className="text-xl font-bold text-amber-500 font-mono">{formatINR(analytics.bookedValuation)}</p>
                  <span className="text-[10.5px] text-sub-color">{analytics.bookedCount} Plots In Pipeline</span>
                </div>
              </div>
            </div>

            {/* Backup & Blueprint Reset Card */}
            <div className="clay-card p-6 sm:p-8 border-theme-subtle space-y-5">
              <h3 className="font-serif-luxury text-lg font-bold text-main-color flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-500" />
                System Data Operations & Certified CAD Blueprint Reset
              </h3>
              <p className="text-xs text-sub-color leading-relaxed">
                Download full snapshots of your inventory state, customer leads CRM data, and custom website settings. You can re-import this JSON anytime to restore state.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExportFullBackup}
                  className="px-5 py-2.5 clay-btn-gold text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full System Backup (.JSON)</span>
                </button>

                <button
                  onClick={handleResetToBlueprint}
                  className="px-4 py-2.5 rounded-full clay-btn text-amber-500 font-semibold text-xs hover:text-amber-600 flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-500" />
                  <span>Reset All to Certified CAD Blueprint</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
