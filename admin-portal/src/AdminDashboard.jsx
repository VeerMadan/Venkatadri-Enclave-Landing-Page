import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Lock, Unlock, ArrowLeft, Download, Upload, 
  Save, RefreshCw, Search, Filter, Check, X, Edit3, 
  Building2, Sparkles, CheckCircle2, AlertCircle, Database,
  TrendingUp, Layers, Compass, Eye, Sun, Moon, FileSpreadsheet,
  KeyRound, EyeOff, Users, Phone, MessageSquare, Trash2,
  Settings, Globe, ExternalLink, Calendar, MapPin, DollarSign,
  Send, Plus, Sliders, LayoutGrid, List, CheckSquare, Square,
  Tag, Info, ChevronRight, Hash
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

  // Primary Navigation
  const [activeNav, setActiveNav] = useState('inventory'); // 'inventory' | 'leads' | 'content' | 'analytics'

  // Inventory Management State
  const [inventory, setInventory] = useState([]);
  const [selectedPlotId, setSelectedPlotId] = useState(1);
  const [selectedPlotsForBulk, setSelectedPlotsForBulk] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [inventoryViewMode, setInventoryViewMode] = useState('avenue'); // 'avenue' | 'grid' | 'table'
  const [isBulkMode, setIsBulkMode] = useState(false);

  // Leads CRM State
  const [leads, setLeads] = useState([]);
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings());
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Check existing session
  useEffect(() => {
    const isAuth = sessionStorage.getItem('mvk_admin_auth_token') === 'mvk_secure_session_token_granted';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Sync data with storage & custom events
  useEffect(() => {
    const refreshData = () => {
      setInventory(getStoredInventory());
      setLeads(getStoredLeads());
      setSiteSettings(getStoredSiteSettings());
    };

    refreshData();

    const handleInventoryUpdate = () => setInventory(getStoredInventory());
    const handleLeadsUpdate = () => setLeads(getStoredLeads());
    const handleSettingsUpdate = () => setSiteSettings(getStoredSiteSettings());

    window.addEventListener('mvk_inventory_updated', handleInventoryUpdate);
    window.addEventListener(LEADS_UPDATED_EVENT, handleLeadsUpdate);
    window.addEventListener(LEAD_SYNC_EVENT, handleLeadsUpdate);
    window.addEventListener(SETTINGS_SYNC_EVENT, handleSettingsUpdate);
    window.addEventListener('storage', refreshData);

    return () => {
      window.removeEventListener('mvk_inventory_updated', handleInventoryUpdate);
      window.removeEventListener(LEADS_UPDATED_EVENT, handleLeadsUpdate);
      window.removeEventListener(LEAD_SYNC_EVENT, handleLeadsUpdate);
      window.removeEventListener(SETTINGS_SYNC_EVENT, handleSettingsUpdate);
      window.removeEventListener('storage', refreshData);
    };
  }, []);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcodeInput === STRICT_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mvk_admin_auth_token', 'mvk_secure_session_token_granted');
      setAuthError('');
      showNotification('Welcome to MVK Venkatadri Enclave Admin Console');
    } else {
      setAuthError('Invalid passcode. Please re-enter the authorized admin code.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mvk_admin_auth_token');
    setIsAuthenticated(false);
    setPasscodeInput('');
  };

  const currentSelectedPlot = useMemo(() => {
    return inventory.find(p => p.id === selectedPlotId) || inventory[0];
  }, [inventory, selectedPlotId]);

  // Overall Financial & Plot Metrics
  const stats = useMemo(() => {
    const total = inventory.length;
    const available = inventory.filter(p => p.status === 'available');
    const booked = inventory.filter(p => p.status === 'booked');
    const sold = inventory.filter(p => p.status === 'sold');

    const totalValuation = inventory.reduce((sum, p) => sum + (p.totalPrice || 0), 0);
    const availableValuation = available.reduce((sum, p) => sum + (p.totalPrice || 0), 0);
    const bookedValuation = booked.reduce((sum, p) => sum + (p.totalPrice || 0), 0);
    const soldValuation = sold.reduce((sum, p) => sum + (p.totalPrice || 0), 0);

    return {
      total,
      availableCount: available.length,
      bookedCount: booked.length,
      soldCount: sold.length,
      totalValuation,
      availableValuation,
      bookedValuation,
      soldValuation
    };
  }, [inventory]);

  // Filtered Plots
  const filteredPlots = useMemo(() => {
    return inventory.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchNo = p.number.toString().includes(q) || p.plotNo.toLowerCase().includes(q);
        const matchBlock = (p.block || '').toLowerCase().includes(q);
        const matchDim = (p.dimensions || '').toLowerCase().includes(q);
        if (!matchNo && !matchBlock && !matchDim) return false;
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

  // Group filtered plots by official CAD Blueprint Avenues
  const avenueSections = useMemo(() => {
    return [
      {
        id: 'ave1',
        name: 'Avenue 1: West Crescent (Entry 1)',
        subtitle: 'Plots 76–111 • 30 Ft Concrete Avenue with Entry 1 Gateway Access',
        plots: filteredPlots.filter(p => p.number >= 76 && p.number <= 111)
      },
      {
        id: 'ave2',
        name: 'Avenue 2: Central Boulevard (Entry 2)',
        subtitle: 'Plots 44–75 • Grand Central Promenade with Palm Corridors',
        plots: filteredPlots.filter(p => p.number >= 44 && p.number <= 75)
      },
      {
        id: 'ave3',
        name: 'Avenue 3: Park Promenade (Entry 3)',
        subtitle: 'Plots 7–20 & 30–43 • Immediate Walk to North Park Zone A & Gazebo',
        plots: filteredPlots.filter(p => (p.number >= 30 && p.number <= 43) || (p.number >= 7 && p.number <= 20))
      },
      {
        id: 'ave4',
        name: 'Avenue 4: CA & Eastern Enclave',
        subtitle: 'Plots 1–6 & 21–29 • Adjacent to Civic Amenities & Boundary Views',
        plots: filteredPlots.filter(p => (p.number >= 1 && p.number <= 6) || (p.number >= 21 && p.number <= 29))
      }
    ].filter(section => section.plots.length > 0);
  }, [filteredPlots]);

  // Leads CRM filtering
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      if (leadStatusFilter !== 'all' && lead.status !== leadStatusFilter) return false;
      if (leadSearchQuery.trim()) {
        const q = leadSearchQuery.toLowerCase().trim();
        const matchName = (lead.name || '').toLowerCase().includes(q);
        const matchPhone = (lead.phone || '').includes(q);
        const matchPurpose = (lead.purpose || '').toLowerCase().includes(q);
        const matchBudget = (lead.budget || '').toLowerCase().includes(q);
        const matchSize = (lead.plotSizeInterest || '').toLowerCase().includes(q);
        const matchTimeline = (lead.timeline || '').toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchPurpose && !matchBudget && !matchSize && !matchTimeline) return false;
      }
      return true;
    });
  }, [leads, leadStatusFilter, leadSearchQuery]);

  const newLeadsCount = useMemo(() => {
    return leads.filter(l => l.status === 'New').length;
  }, [leads]);

  // Single Plot Status Updater
  const handleUpdatePlotStatus = (plotId, newStatus) => {
    const updated = inventory.map(p => p.id === plotId ? { ...p, status: newStatus } : p);
    setInventory(updated);
    saveStoredInventory(updated);
    showNotification(`Plot #${plotId} updated to ${newStatus.toUpperCase()}`);
  };

  // Single Plot Field Updater
  const handleUpdatePlotField = (field, value) => {
    if (!currentSelectedPlot) return;
    let val = value;
    if (field === 'areaSqFt') val = parseInt(value, 10) || 1200;

    const updated = inventory.map(p => {
      if (p.id === currentSelectedPlot.id) {
        const mod = { ...p, [field]: val };
        if (field === 'areaSqFt') {
          mod.totalPrice = mod.areaSqFt * (mod.baseRate || siteSettings.baseRatePerSqFt || 7699);
          mod.formattedPrice = formatINR(mod.totalPrice);
          mod.emiEstimate = calculateEMI(mod.totalPrice);
          mod.formattedEmi = `₹${mod.emiEstimate.toLocaleString('en-IN')}/mo`;
        }
        return mod;
      }
      return p;
    });

    setInventory(updated);
    saveStoredInventory(updated);
    showNotification(`Plot #${currentSelectedPlot.id} saved`);
  };

  // Bulk Selection Handlers
  const handleTogglePlotInBulk = (plotId) => {
    if (selectedPlotsForBulk.includes(plotId)) {
      setSelectedPlotsForBulk(prev => prev.filter(id => id !== plotId));
    } else {
      setSelectedPlotsForBulk(prev => [...prev, plotId]);
    }
  };

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
    const count = selectedPlotsForBulk.length;
    setSelectedPlotsForBulk([]);
    setIsBulkMode(false);
    showNotification(`Updated ${count} plots to ${newStatus.toUpperCase()}`);
  };

  // Settings Save Handler
  const handleSaveSiteSettings = (e) => {
    e.preventDefault();
    const updated = saveStoredSiteSettings(siteSettings);
    if (updated) {
      setSettingsSavedToast(true);
      setTimeout(() => setSettingsSavedToast(false), 3000);
      showNotification('Website settings synchronized live!');
    }
  };

  // System Backup Handler
  const handleExportSystemBackup = () => {
    const backupData = {
      project: "MVK Venkatadri Enclave",
      version: "2.1",
      exportedAt: new Date().toISOString(),
      siteSettings,
      inventory,
      leads
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Venkatadri_Enclave_Admin_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotification('System JSON Backup downloaded successfully');
  };

  const handleResetInventory = () => {
    if (window.confirm('Reset all 111 plots to official certified CAD blueprint layout?')) {
      const fresh = resetStoredInventory();
      setInventory(fresh);
      showNotification('Inventory reset to certified CAD drawing');
    }
  };

  // Status Styling Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return {
          pill: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25',
          dot: 'bg-emerald-500',
          label: 'Available'
        };
      case 'booked':
        return {
          pill: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25',
          dot: 'bg-amber-500',
          label: 'Booked'
        };
      case 'sold':
        return {
          pill: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/25',
          dot: 'bg-rose-500',
          label: 'Sold Out'
        };
      default:
        return {
          pill: 'bg-slate-500/10 text-slate-500 border border-slate-500/25',
          dot: 'bg-slate-400',
          label: status
        };
    }
  };

  // =========================================================================
  // LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070b0e] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-[#0e141a] rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-amber-500 cursor-pointer transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-center space-y-2.5 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                MVK Developers LLP
              </span>
              <h1 className="font-serif-luxury text-2xl font-bold text-slate-900 dark:text-white mt-3">
                Venkatadri <span className="text-amber-500 font-sans font-light">Admin Console</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your authorized credentials to access plots and customer CRM.
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5 pl-1">
                Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter Passcode"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 pr-11 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-2xl shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <a href="/" className="text-xs text-slate-500 hover:text-amber-500 inline-flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED MANAGEMENT CONSOLE
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b0e] text-slate-900 dark:text-slate-100 font-sans pb-24 transition-colors duration-300 selection:bg-amber-400 selection:text-black">
      
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

      {/* Floating Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 pt-3 pb-2 backdrop-blur-md">
        <div className="max-w-7xl mx-auto bg-white/90 dark:bg-[#0e141a]/90 backdrop-blur-xl rounded-3xl px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border border-slate-200/80 dark:border-white/10 shadow-sm">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold font-serif-luxury text-sm flex items-center justify-center shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wider">
                  VENKATADRI <span className="text-amber-500 uppercase font-light">ADMIN</span>
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  v2.1
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                HPA & BMRDA Sanctioned Layout • 111 Villa Plots
              </p>
            </div>
          </div>

          {/* Nav Tab Bar */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs">
            <button
              onClick={() => setActiveNav('inventory')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeNav === 'inventory'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Plots (111)</span>
            </button>

            <button
              onClick={() => setActiveNav('leads')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeNav === 'leads'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
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
              onClick={() => setActiveNav('content')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeNav === 'content'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Site Settings</span>
            </button>

            <button
              onClick={() => setActiveNav('analytics')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeNav === 'analytics'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Valuation & Backup</span>
            </button>
          </div>

          {/* Actions & Theme */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-amber-500 cursor-pointer transition-all"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-amber-600" />}
            </button>

            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:border-amber-400/50 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="p-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-rose-500 cursor-pointer transition-all"
              title="Logout"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-5 space-y-6">

        {/* ========================================================================= */}
        {/* TAB 1: PLOT INVENTORY MANAGEMENT                                          */}
        {/* ========================================================================= */}
        {activeNav === 'inventory' && (
          <div className="space-y-6">
            
            {/* Top Stat Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <span className="text-[10.5px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total Units</span>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono my-1">{stats.total}</p>
                <span className="text-xs text-amber-500 font-semibold">6.0 Acre Community</span>
              </div>
              
              <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">Available</span>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono my-1">{stats.availableCount}</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">{formatINR(stats.availableValuation)} Open</span>
              </div>

              <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <span className="text-[10.5px] text-amber-600 dark:text-amber-400 uppercase font-bold tracking-wider">Booked</span>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 font-mono my-1">{stats.bookedCount}</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">{formatINR(stats.bookedValuation)} In Pipeline</span>
              </div>

              <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <span className="text-[10.5px] text-rose-600 dark:text-rose-400 uppercase font-bold tracking-wider">Sold Out</span>
                <p className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 font-mono my-1">{stats.soldCount}</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">{formatINR(stats.soldValuation)} Closed</span>
              </div>
            </div>

            {/* Filter & View Switcher Bar */}
            <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-wrap items-center justify-between gap-3.5">
              
              {/* Left Search & Dropdowns */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search plot #, size, avenue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 w-52 sm:w-64 transition-all"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="all">All Statuses ({inventory.length})</option>
                  <option value="available">Available ({stats.availableCount})</option>
                  <option value="booked">Booked ({stats.bookedCount})</option>
                  <option value="sold">Sold Out ({stats.soldCount})</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="all">All Dimensions</option>
                  <option value="30x40">30 × 40 (85 Plots)</option>
                  <option value="30x45">30 × 45 (2 Plots)</option>
                  <option value="30x50">30 × 50 (5 Plots)</option>
                  <option value="odd">Odd Plots (19 Plots)</option>
                </select>
              </div>

              {/* Right View Modes & Bulk Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsBulkMode(!isBulkMode);
                    if (isBulkMode) setSelectedPlotsForBulk([]);
                  }}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isBulkMode
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-amber-500'
                  }`}
                >
                  {isBulkMode ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                  <span>{isBulkMode ? 'Exit Bulk Mode' : 'Multi-Select'}</span>
                </button>

                <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs">
                  <button
                    onClick={() => setInventoryViewMode('avenue')}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      inventoryViewMode === 'avenue'
                        ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Avenue Cards View"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Avenues</span>
                  </button>

                  <button
                    onClick={() => setInventoryViewMode('grid')}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      inventoryViewMode === 'grid'
                        ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Comfortable Matrix Grid"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Matrix</span>
                  </button>

                  <button
                    onClick={() => setInventoryViewMode('table')}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      inventoryViewMode === 'table'
                        ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Data Spreadsheet"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Table</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bulk Action Bar (Appears when plots are checked) */}
            <AnimatePresence>
              {selectedPlotsForBulk.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-3xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md"
                >
                  <div className="flex items-center gap-2 pl-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedPlotsForBulk.length} plot{selectedPlotsForBulk.length > 1 ? 's' : ''} selected
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBulkStatusChange('available')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:brightness-105 cursor-pointer shadow-sm"
                    >
                      Mark Available
                    </button>
                    <button
                      onClick={() => handleBulkStatusChange('booked')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:brightness-105 cursor-pointer shadow-sm"
                    >
                      Mark Booked
                    </button>
                    <button
                      onClick={() => handleBulkStatusChange('sold')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:brightness-105 cursor-pointer shadow-sm"
                    >
                      Mark Sold
                    </button>
                    <button
                      onClick={() => setSelectedPlotsForBulk([])}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Plots Viewport + Side Inspector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Plots Views (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* ------------------------------------------------------------- */}
                {/* VIEW 1: AVENUE SECTIONS (Generous, readable, comfortable!)    */}
                {/* ------------------------------------------------------------- */}
                {inventoryViewMode === 'avenue' && (
                  <div className="space-y-6">
                    {avenueSections.map((section) => (
                      <div
                        key={section.id}
                        className="bg-white dark:bg-[#0e141a] rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 shadow-sm space-y-4"
                      >
                        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                          <div>
                            <h3 className="font-serif-luxury text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-amber-500" />
                              <span>{section.name}</span>
                            </h3>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {section.subtitle}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-slate-500 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5">
                            {section.plots.length} Plots
                          </span>
                        </div>

                        {/* Generous plot cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {section.plots.map((plot) => {
                            const isSelected = selectedPlotId === plot.id;
                            const isChecked = selectedPlotsForBulk.includes(plot.id);
                            const badge = getStatusBadge(plot.status);

                            return (
                              <div
                                key={plot.id}
                                onClick={() => {
                                  if (isBulkMode) {
                                    handleTogglePlotInBulk(plot.id);
                                  } else {
                                    setSelectedPlotId(plot.id);
                                  }
                                }}
                                className={`rounded-2xl p-4 border transition-all cursor-pointer relative group flex flex-col justify-between gap-3 ${
                                  isSelected && !isBulkMode
                                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                                    : 'bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/10 hover:border-amber-400/50 hover:shadow-sm'
                                }`}
                              >
                                {/* Top Row */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    {isBulkMode && (
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleTogglePlotInBulk(plot.id)}
                                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                                      />
                                    )}
                                    <div>
                                      <span className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-1">
                                        Plot #{plot.number}
                                      </span>
                                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                                        {plot.dimensions}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Status Pill with direct dropdown */}
                                  <select
                                    value={plot.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleUpdatePlotStatus(plot.id, e.target.value)}
                                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-none transition-all ${badge.pill}`}
                                  >
                                    <option value="available">Available</option>
                                    <option value="booked">Booked</option>
                                    <option value="sold">Sold Out</option>
                                  </select>
                                </div>

                                {/* Bottom Info Row */}
                                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/50 dark:border-white/5">
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {plot.facing} Facing
                                  </span>
                                  <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                                    {plot.formattedPrice}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* VIEW 2: COMFORTABLE MATRIX GRID (Spacious, large cards!)       */}
                {/* ------------------------------------------------------------- */}
                {inventoryViewMode === 'grid' && (
                  <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10 text-xs text-slate-500">
                      <span>Showing {filteredPlots.length} plots</span>
                      <span className="text-[11px]">Click any plot card to view and edit details</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
                      {filteredPlots.map((plot) => {
                        const isSelected = selectedPlotId === plot.id;
                        const isChecked = selectedPlotsForBulk.includes(plot.id);
                        const badge = getStatusBadge(plot.status);

                        return (
                          <div
                            key={plot.id}
                            onClick={() => {
                              if (isBulkMode) {
                                handleTogglePlotInBulk(plot.id);
                              } else {
                                setSelectedPlotId(plot.id);
                              }
                            }}
                            className={`rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between gap-2 min-h-[90px] ${
                              isSelected && !isBulkMode
                                ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                                : 'bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/10 hover:border-amber-400/50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                                #{plot.number}
                              </span>
                              <span className={`w-2.5 h-2.5 rounded-full ${badge.dot}`}></span>
                            </div>

                            <div>
                              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate">
                                {plot.dimensions.split(' ')[0]}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                {plot.facing} • {plot.areaSqFt} SqFt
                              </p>
                            </div>

                            <div className="text-[10.5px] font-bold text-amber-600 dark:text-amber-400 font-mono">
                              {plot.formattedPrice}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* VIEW 3: DATA SPREADSHEET TABLE                                */}
                {/* ------------------------------------------------------------- */}
                {inventoryViewMode === 'table' && (
                  <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                          <th className="py-3 px-3">Plot #</th>
                          <th className="py-3 px-3">Avenue</th>
                          <th className="py-3 px-3">Dimensions</th>
                          <th className="py-3 px-3">Area</th>
                          <th className="py-3 px-3">Facing</th>
                          <th className="py-3 px-3">Price</th>
                          <th className="py-3 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {filteredPlots.map((plot) => {
                          const isSelected = selectedPlotId === plot.id;
                          const badge = getStatusBadge(plot.status);

                          return (
                            <tr
                              key={plot.id}
                              onClick={() => setSelectedPlotId(plot.id)}
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-amber-500/10'
                                  : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                              }`}
                            >
                              <td className="py-3 px-3 font-bold font-mono text-slate-900 dark:text-white">
                                #{plot.number}
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                                {plot.block}
                              </td>
                              <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                                {plot.dimensions}
                              </td>
                              <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                                {plot.areaSqFt} SqFt
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                                {plot.facing}
                              </td>
                              <td className="py-3 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                                {plot.formattedPrice}
                              </td>
                              <td className="py-3 px-3">
                                <select
                                  value={plot.status}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => handleUpdatePlotStatus(plot.id, e.target.value)}
                                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-none ${badge.pill}`}
                                >
                                  <option value="available">Available</option>
                                  <option value="booked">Booked</option>
                                  <option value="sold">Sold Out</option>
                                </select>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>

              {/* Right Column: Dedicated Plot Inspector (4 cols) */}
              <div className="lg:col-span-4 sticky top-20 bg-white dark:bg-[#0e141a] rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-500">
                      Inspector
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold text-slate-900 dark:text-white font-mono">
                      Plot #{currentSelectedPlot?.number}
                    </h3>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    getStatusBadge(currentSelectedPlot?.status).pill
                  }`}>
                    {currentSelectedPlot?.status}
                  </span>
                </div>

                {/* Status Quick Buttons */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    Quick Status Toggle
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'available', label: 'Available', color: 'bg-emerald-500 text-slate-950' },
                      { id: 'booked', label: 'Booked', color: 'bg-amber-500 text-slate-950' },
                      { id: 'sold', label: 'Sold', color: 'bg-rose-500 text-white' }
                    ].map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleUpdatePlotStatus(currentSelectedPlot.id, st.id)}
                        className={`py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          currentSelectedPlot?.status === st.id
                            ? `${st.color} shadow-sm scale-102`
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plot Properties Form */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Plot Area (Sq.Ft)
                    </label>
                    <input
                      type="number"
                      value={currentSelectedPlot?.areaSqFt || 1200}
                      onChange={(e) => handleUpdatePlotField('areaSqFt', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Dimensions String
                    </label>
                    <input
                      type="text"
                      value={currentSelectedPlot?.dimensions || ''}
                      onChange={(e) => handleUpdatePlotField('dimensions', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Facing Direction
                    </label>
                    <select
                      value={currentSelectedPlot?.facing || 'East'}
                      onChange={(e) => handleUpdatePlotField('facing', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="East">East Facing (Surya Vastu)</option>
                      <option value="West">West Facing (Sunset Promenade)</option>
                      <option value="North">North Facing (Kubera Vastu)</option>
                      <option value="North-East">North-East Corner</option>
                    </select>
                  </div>
                </div>

                {/* Financial Breakdown Card */}
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Rate / SqFt:</span>
                    <span className="font-mono font-bold text-amber-500">₹{currentSelectedPlot?.baseRate || 7699}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Total Valuation:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{currentSelectedPlot?.formattedPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Est. EMI (80%):</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{currentSelectedPlot?.formattedEmi}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LEADS & INQUIRIES CRM                                              */}
        {/* ========================================================================= */}
        {activeNav === 'leads' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by customer name or phone..."
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 w-56 sm:w-80"
                  />
                </div>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="all">All Inquiries ({leads.length})</option>
                  <option value="New">New ({newLeadsCount})</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Visit Scheduled">Visit Scheduled</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                onClick={exportLeadsToCSV}
                disabled={!leads.length}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-sm hover:brightness-105 cursor-pointer disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export to Excel / CSV</span>
              </button>
            </div>

            {/* Inquiries Cards */}
            {filteredLeads.length === 0 ? (
              <div className="bg-white dark:bg-[#0e141a] rounded-3xl py-16 text-center space-y-3 border border-slate-200 dark:border-white/10">
                <Users className="w-10 h-10 mx-auto text-slate-400 opacity-40" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">No Customer Inquiries</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  When visitors book a site visit on the landing page, their inquiries will appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white dark:bg-[#0e141a] rounded-3xl p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-3.5 hover:border-amber-400/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 font-bold text-sm flex items-center justify-center shadow-sm">
                          {(lead.name || 'C').slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{lead.name}</h4>
                          <span className="text-[10.5px] text-slate-400 font-mono">{lead.formattedDate || lead.createdAt?.slice(0, 16)}</span>
                        </div>
                      </div>

                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer border ${
                          lead.status === 'New' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25' :
                          lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25' :
                          lead.status === 'Visit Scheduled' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25' :
                          'bg-slate-500/10 text-slate-500 border-slate-500/25'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Visit Scheduled">Visit Scheduled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-xs py-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Mobile:</span>
                        <span className="font-mono font-bold text-amber-500">+91 {lead.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Purpose:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.purpose || 'To build a home'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Budget Range:</span>
                        <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">{lead.budget || '₹92+ Lakhs'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Plot Size:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.plotSizeInterest || lead.plotType || '1,200 Sq.Ft.'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Timeline:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{lead.timeline || 'This Weekend'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Chauffeur Cab:</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.cab === 'yes' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-slate-500/10 text-slate-500'
                        }`}>
                          {lead.cab === 'yes' ? 'Cab Requested' : 'Self Visit'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:+91${lead.phone}`}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 hover:border-emerald-400"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>

                        <a
                          href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20your%20interest%20in%20MVK%20Venkatadri%20Enclave.%20How%20may%20we%20assist%20you%20with%20your%20site%20visit%3F`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 hover:border-emerald-400"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete lead from ${lead.name}?`)) {
                            deleteLead(lead.id);
                            showNotification('Lead removed');
                          }
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 cursor-pointer"
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
        {/* TAB 3: SITE CONTENT & SETTINGS                                            */}
        {/* ========================================================================= */}
        {activeNav === 'content' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <form onSubmit={handleSaveSiteSettings} className="bg-white dark:bg-[#0e141a] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-slate-900 dark:text-white">
                    Website Content & Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Modifications update the public landing page instantly without code changes.
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-105 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>

              {settingsSavedToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Website content updated and broadcasted live!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Project Brand Title</label>
                  <input
                    type="text"
                    value={siteSettings.projectName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, projectName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Developer Slogan</label>
                  <input
                    type="text"
                    value={siteSettings.slogan}
                    onChange={(e) => setSiteSettings({ ...siteSettings, slogan: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Hero Opening Tagline</label>
                  <input
                    type="text"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Base Price Rate (₹ / Sq.Ft)</label>
                  <input
                    type="number"
                    value={siteSettings.baseRatePerSqFt}
                    onChange={(e) => setSiteSettings({ ...siteSettings, baseRatePerSqFt: parseInt(e.target.value, 10) || 7699 })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-amber-500 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Sales WhatsApp URL</label>
                  <input
                    type="text"
                    value={siteSettings.whatsappUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsappUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Official Sales Phone</label>
                  <input
                    type="text"
                    value={siteSettings.salesPhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, salesPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Official Sales Email</label>
                  <input
                    type="email"
                    value={siteSettings.salesEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, salesEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Layout Official Address</label>
                  <input
                    type="text"
                    value={siteSettings.locationFull}
                    onChange={(e) => setSiteSettings({ ...siteSettings, locationFull: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>Webhook Integration URL (Optional)</span>
                    <span className="text-[10px] text-slate-400">Google Sheets / Zapier / Make.com</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/... or https://hooks.zapier.com/..."
                    value={siteSettings.webhookUrl || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, webhookUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all website content back to developer default copy?')) {
                      const reset = resetStoredSiteSettings();
                      setSiteSettings(reset);
                      showNotification('Settings reset to defaults');
                    }
                  }}
                  className="text-xs text-rose-500 hover:underline cursor-pointer"
                >
                  Reset to Default Copy
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-105 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: VALUATION & SYSTEM BACKUP                                          */}
        {/* ========================================================================= */}
        {activeNav === 'analytics' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <span>Project Financial Valuation Summary</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Total Layout Valuation</span>
                  <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">{formatINR(stats.totalValuation)}</p>
                  <span className="text-[10.5px] text-slate-500">111 Plots @ ₹{siteSettings.baseRatePerSqFt}/SqFt</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">Available Inventory Value</span>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{formatINR(stats.availableValuation)}</p>
                  <span className="text-[10.5px] text-slate-500">{stats.availableCount} Plots Open for Sale</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-bold">Booked Pipeline Value</span>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">{formatINR(stats.bookedValuation)}</p>
                  <span className="text-[10.5px] text-slate-500">{stats.bookedCount} Plots Committed</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0e141a] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
              <h3 className="font-serif-luxury text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-500" />
                <span>System Data Snapshots & CAD Blueprint Reset</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Download a complete JSON snapshot containing all 111 plots, customer CRM leads, and website settings. You can also reset all 111 plots to match the certified CAD drawing at any time.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExportSystemBackup}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-105 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download System Snapshot (.JSON)</span>
                </button>

                <button
                  onClick={handleResetInventory}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-amber-600 dark:text-amber-400 font-bold text-xs hover:border-amber-400/50 flex items-center gap-2 cursor-pointer"
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
