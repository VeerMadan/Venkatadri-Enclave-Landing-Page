import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Lock, Unlock, ArrowLeft, Download, Upload, 
  Save, RefreshCw, Search, Filter, Check, X, Edit3, 
  Building2, Sparkles, CheckCircle2, AlertCircle, Database,
  TrendingUp, Layers, Compass, Eye, Sun, Moon, FileSpreadsheet,
  KeyRound, EyeOff, Users, Phone, MessageSquare, Trash2,
  Settings, Globe, ExternalLink, Calendar, MapPin, DollarSign,
  Send, Plus, Sliders
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

// STRICT ADMIN PASSCODE (Only this exact string is permitted)
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
  const [blockFilter, setBlockFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Leads CRM State
  const [leads, setLeads] = useState([]);
  const [leadFilterStatus, setLeadFilterStatus] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');
  const [activeLeadNotes, setActiveLeadNotes] = useState({});

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Notifications / Modal
  const [toastMessage, setToastMessage] = useState(null);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');

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
      showToast('Authenticated: Master Control Center Loaded');
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
      if (blockFilter !== 'all' && p.block !== blockFilter) return false;
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      return true;
    });
  }, [inventory, searchQuery, statusFilter, blockFilter, typeFilter]);

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
      showToast('Website Settings Saved & Synchronized Live!');
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
    if (window.confirm('Reset all 111 plots to official certified CAD blueprint layout? (Custom manual overrides will be reset)')) {
      const fresh = resetStoredInventory();
      setInventory(fresh);
      showToast('Inventory Reset to Certified CAD Blueprint');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070a0d] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 border-theme-subtle shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-serif-luxury text-2xl font-bold text-white">
              MVK <span className="gold-gradient-text">ADMIN PORTAL</span>
            </h1>
            <p className="text-xs text-slate-400">
              Internal Developer & Sales Management Console
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter Secure Passcode"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl neo-inset bg-black/40 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Authenticate & Enter Console</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-amber-400 flex items-center justify-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Return to Public Landing Page</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a0d] text-slate-100 font-sans pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#070a0d]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold font-serif-luxury text-sm">
              M
            </div>
            <div>
              <h1 className="font-serif-luxury text-sm sm:text-base font-bold text-white tracking-wider flex items-center gap-2">
                VENKATADRI <span className="text-amber-400">ADMIN CONTROL</span>
              </h1>
              <p className="text-[10px] text-slate-400">
                Live Inventory & Leads Engine • HPA & BMRDA Approved
              </p>
            </div>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inventory' ? 'bg-amber-400 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Inventory</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'leads' ? 'bg-amber-400 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Leads CRM</span>
              {newLeadsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {newLeadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'content' ? 'bg-amber-400 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Content & Copy</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'backup' ? 'bg-amber-400 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Analytics & Backup</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-amber-400 hover:text-amber-300 border border-amber-400/30 flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Live Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 cursor-pointer"
              title="Logout"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Tab Views */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">

        {/* ========================================================================= */}
        {/* TAB 1: PLOT INVENTORY CRUD                                                */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass-panel rounded-2xl p-4 border-theme-subtle">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Total Plots</span>
                <p className="text-xl font-bold text-white font-mono mt-0.5">{analytics.totalCount}</p>
                <span className="text-[10px] text-amber-400">6.0 Acre Layout</span>
              </div>
              <div className="glass-panel rounded-2xl p-4 border-theme-subtle">
                <span className="text-[10px] text-emerald-400 uppercase font-medium">Available</span>
                <p className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{analytics.availableCount}</p>
                <span className="text-[10px] text-slate-400">{formatINR(analytics.availableValuation)} Value</span>
              </div>
              <div className="glass-panel rounded-2xl p-4 border-theme-subtle">
                <span className="text-[10px] text-amber-400 uppercase font-medium">Booked</span>
                <p className="text-xl font-bold text-amber-400 font-mono mt-0.5">{analytics.bookedCount}</p>
                <span className="text-[10px] text-slate-400">{formatINR(analytics.bookedValuation)} Booked</span>
              </div>
              <div className="glass-panel rounded-2xl p-4 border-theme-subtle">
                <span className="text-[10px] text-rose-400 uppercase font-medium">Sold Out</span>
                <p className="text-xl font-bold text-rose-400 font-mono mt-0.5">{analytics.soldCount}</p>
                <span className="text-[10px] text-slate-400">{formatINR(analytics.soldValuation)} Realized</span>
              </div>
            </div>

            {/* Inventory Controls & Filters */}
            <div className="glass-panel rounded-2xl p-4 border-theme-subtle flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Plot # or Avenue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl neo-inset bg-black/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 w-48 sm:w-60"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl neo-inset bg-black/40 text-xs text-white focus:outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available ({analytics.availableCount})</option>
                  <option value="booked">Booked ({analytics.bookedCount})</option>
                  <option value="sold">Sold ({analytics.soldCount})</option>
                </select>

                {/* Dimension Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl neo-inset bg-black/40 text-xs text-white focus:outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="all">All Dimensions</option>
                  <option value="30x40">30 × 40 (85 Plots)</option>
                  <option value="30x45">30 × 45 (2 Plots)</option>
                  <option value="30x50">30 × 50 (5 Plots)</option>
                  <option value="odd">Odd Plots (19 Plots)</option>
                </select>
              </div>

              {/* Bulk Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSelectAll}
                  className="px-3 py-1.5 rounded-xl glass-panel text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  {selectedPlotsForBulk.length === filteredInventory.length ? 'Deselect All' : 'Select All Filtered'}
                </button>

                {selectedPlotsForBulk.length > 0 && (
                  <div className="flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-xl border border-white/10">
                    <span className="text-[11px] text-amber-400 font-bold px-1">{selectedPlotsForBulk.length} Selected:</span>
                    <button
                      onClick={() => handleBulkStatusChange('available')}
                      className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    >
                      Available
                    </button>
                    <button
                      onClick={() => handleBulkStatusChange('booked')}
                      className="px-2 py-1 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                    >
                      Booked
                    </button>
                    <button
                      onClick={() => handleBulkStatusChange('sold')}
                      className="px-2 py-1 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                    >
                      Sold
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Layout Matrix & Detail Inspector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Plot Tiles Grid (8 cols) */}
              <div className="lg:col-span-8 glass-panel rounded-3xl p-5 border-theme-subtle">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs text-slate-400">
                  <span>Showing {filteredInventory.length} of 111 Plots</span>
                  <div className="flex items-center gap-3 text-[10.5px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Booked</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Sold</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredInventory.map(plot => {
                    const isSelected = selectedPlotId === plot.id;
                    const isChecked = selectedPlotsForBulk.includes(plot.id);
                    const statusBg = plot.status === 'available'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : plot.status === 'booked'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-400';

                    return (
                      <div
                        key={plot.id}
                        onClick={() => setSelectedPlotId(plot.id)}
                        className={`relative rounded-xl p-2 text-center border transition-all cursor-pointer select-none group ${statusBg} ${
                          isSelected ? 'ring-2 ring-amber-400 scale-105 z-10 shadow-lg' : 'hover:scale-102'
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
                          className="absolute top-1 left-1 w-3 h-3 accent-amber-400 cursor-pointer"
                        />
                        <div className="text-xs font-mono font-bold mt-1">#{plot.number}</div>
                        <div className="text-[9px] opacity-75 truncate">{plot.dimensions.split(' ')[0]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual Plot Editor (4 cols) */}
              <div className="lg:col-span-4 glass-panel rounded-3xl p-5 border-theme-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentPlot?.color }}></span>
                    <h3 className="text-base font-bold text-white font-mono">
                      Plot #{currentPlot?.number}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase ${
                    currentPlot?.status === 'available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    currentPlot?.status === 'booked' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {currentPlot?.status}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Status Toggle Buttons */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Set Status</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['available', 'booked', 'sold'].map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdatePlotStatus(currentPlot.id, st)}
                          className={`py-1.5 rounded-xl font-bold text-xs uppercase transition-all cursor-pointer ${
                            currentPlot.status === st
                              ? st === 'available' ? 'bg-emerald-500 text-slate-950 shadow'
                                : st === 'booked' ? 'bg-amber-500 text-slate-950 shadow'
                                : 'bg-rose-500 text-white shadow'
                              : 'glass-panel text-slate-300 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area Sq.Ft */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Plot Area (Sq.Ft)</label>
                    <input
                      type="number"
                      value={currentPlot?.areaSqFt || 1200}
                      onChange={(e) => handleUpdatePlotDetails('areaSqFt', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neo-inset bg-black/40 text-white font-mono focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {/* Dimensions Label */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Dimensions Text</label>
                    <input
                      type="text"
                      value={currentPlot?.dimensions || ''}
                      onChange={(e) => handleUpdatePlotDetails('dimensions', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {/* Facing */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Facing Direction</label>
                    <select
                      value={currentPlot?.facing || 'East'}
                      onChange={(e) => handleUpdatePlotDetails('facing', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="East">East Facing (Surya Vastu)</option>
                      <option value="West">West Facing (Sunset View)</option>
                      <option value="North">North Facing (Kubera Vastu)</option>
                      <option value="North-East">North-East Corner</option>
                    </select>
                  </div>

                  {/* Valuation preview */}
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Rate:</span>
                      <span className="font-mono font-bold text-amber-400">₹{currentPlot?.baseRate || 7699} / SqFt</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Total Price:</span>
                      <span className="font-mono font-bold text-white">{currentPlot?.formattedPrice}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Est. EMI (80%):</span>
                      <span className="font-mono text-emerald-400">{currentPlot?.formattedEmi}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LEADS & SITE VISITS CRM                                           */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Leads Header & Action Bar */}
            <div className="glass-panel rounded-2xl p-4 border-theme-subtle flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by customer name or phone..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl neo-inset bg-black/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 w-56 sm:w-72"
                  />
                </div>

                {/* Filter Status */}
                <select
                  value={leadFilterStatus}
                  onChange={(e) => setLeadFilterStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-xl neo-inset bg-black/40 text-xs text-white focus:outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="all">All Enquiries ({leads.length})</option>
                  <option value="New">New ({newLeadsCount})</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Visit Scheduled">Visit Scheduled</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportLeadsToCSV}
                  disabled={!leads.length}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export to CSV / Excel</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="glass-panel rounded-3xl p-5 border-theme-subtle overflow-hidden">
              {filteredLeads.length === 0 ? (
                <div className="py-12 text-center space-y-2 text-slate-400">
                  <Users className="w-8 h-8 mx-auto text-slate-500 opacity-50" />
                  <p className="text-sm font-semibold">No Enquiries Found</p>
                  <p className="text-xs">Visitor submissions from "Book Free Site Visit" and "Download Brochure" will show up here in real-time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                        <th className="py-3 px-3">Date & Time</th>
                        <th className="py-3 px-3">Customer</th>
                        <th className="py-3 px-3">WhatsApp Number</th>
                        <th className="py-3 px-3">Inquiry Type</th>
                        <th className="py-3 px-3">Free Cab</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                            {lead.formattedDate || lead.createdAt?.slice(0, 16)}
                          </td>
                          <td className="py-3 px-3 font-bold text-white">
                            {lead.name}
                          </td>
                          <td className="py-3 px-3 font-mono text-amber-400">
                            +91 {lead.phone}
                          </td>
                          <td className="py-3 px-3 capitalize text-slate-300">
                            {lead.type} {lead.plotType ? `(${lead.plotType})` : ''}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              lead.cab === 'yes' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'
                            }`}>
                              {lead.cab === 'yes' ? 'Cab Requested' : 'Self Drive'}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold cursor-pointer bg-black/50 border ${
                                lead.status === 'New' ? 'text-rose-400 border-rose-500/40' :
                                lead.status === 'Contacted' ? 'text-amber-400 border-amber-500/40' :
                                lead.status === 'Visit Scheduled' ? 'text-emerald-400 border-emerald-500/40' :
                                'text-slate-400 border-slate-500/40'
                              }`}
                            >
                              <option value="New">New Lead</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Visit Scheduled">Visit Scheduled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              {/* Direct Call */}
                              <a
                                href={`tel:+91${lead.phone}`}
                                className="p-1.5 rounded-lg glass-panel hover:border-emerald-400/50 text-emerald-400"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>

                              {/* WhatsApp Direct Trigger */}
                              <a
                                href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20your%20inquiry%20regarding%20MVK%20Venkatadri%20Enclave.%20How%20may%20we%20assist%20you%20with%20your%20site%20visit%3F`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg glass-panel hover:border-emerald-400/50 text-emerald-400"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>

                              {/* Delete Lead */}
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete lead inquiry from ${lead.name}?`)) {
                                    deleteLead(lead.id);
                                    showToast('Lead inquiry removed');
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WEBSITE CONTENT & COPY CONTROLS                                    */}
        {/* ========================================================================= */}
        {activeTab === 'content' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <form onSubmit={handleSaveSettings} className="glass-panel rounded-3xl p-6 sm:p-8 border-theme-subtle space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white">
                    Website Content & <span className="gold-gradient-text">Copy Settings</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Changes made here sync live to the public landing page in real-time.
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>

              {settingsSaved && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Website content synchronized live across all visitor viewports!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Project Brand Title</label>
                  <input
                    type="text"
                    value={siteSettings.projectName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, projectName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Developer Slogan</label>
                  <input
                    type="text"
                    value={siteSettings.slogan}
                    onChange={(e) => setSiteSettings({ ...siteSettings, slogan: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Hero Opening Tagline</label>
                  <input
                    type="text"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Base Price Rate (₹ / Sq.Ft)</label>
                  <input
                    type="number"
                    value={siteSettings.baseRatePerSqFt}
                    onChange={(e) => setSiteSettings({ ...siteSettings, baseRatePerSqFt: parseInt(e.target.value, 10) || 7699 })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Sales WhatsApp API URL</label>
                  <input
                    type="text"
                    value={siteSettings.whatsappUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsappUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Official Sales Phone Display</label>
                  <input
                    type="text"
                    value={siteSettings.salesPhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, salesPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Official Sales Email</label>
                  <input
                    type="email"
                    value={siteSettings.salesEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, salesEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Layout Official Address</label>
                  <input
                    type="text"
                    value={siteSettings.locationFull}
                    onChange={(e) => setSiteSettings({ ...siteSettings, locationFull: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>Webhook Integration URL (Optional)</span>
                    <span className="text-[10px] text-slate-400">Google Sheets / Zapier / Telegram</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/... or https://hooks.zapier.com/..."
                    value={siteSettings.webhookUrl || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, webhookUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl neo-inset bg-black/40 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    When populated, every "Book Site Visit" lead inquiry is instantly POSTed to this webhook in real-time.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all website content back to developer default copy?')) {
                      const reset = resetStoredSiteSettings();
                      setSiteSettings(reset);
                      showToast('Settings reset to defaults');
                    }
                  }}
                  className="text-xs text-rose-400 hover:underline cursor-pointer"
                >
                  Reset to Default Copy
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
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
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border-theme-subtle space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                Project Financial Valuation Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase">Gross Project Valuation</span>
                  <p className="text-xl font-bold text-white font-mono">{formatINR(analytics.totalValuation)}</p>
                  <span className="text-[10.5px] text-slate-400">111 Plots @ ₹{siteSettings.baseRatePerSqFt}/SqFt</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase">Available Inventory Value</span>
                  <p className="text-xl font-bold text-emerald-400 font-mono">{formatINR(analytics.availableValuation)}</p>
                  <span className="text-[10.5px] text-slate-400">{analytics.availableCount} Plots Open for Booking</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
                  <span className="text-[10px] text-amber-400 uppercase">Committed / Booked Value</span>
                  <p className="text-xl font-bold text-amber-400 font-mono">{formatINR(analytics.bookedValuation)}</p>
                  <span className="text-[10.5px] text-slate-400">{analytics.bookedCount} Plots In Pipeline</span>
                </div>
              </div>
            </div>

            {/* Backup & Blueprint Reset Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border-theme-subtle space-y-5">
              <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                System Data Operations & Certified CAD Blueprint Reset
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download full snapshots of your inventory state, customer leads CRM data, and custom website settings. You can re-import this JSON anytime to restore state.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExportFullBackup}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full System Backup (.JSON)</span>
                </button>

                <button
                  onClick={handleResetToBlueprint}
                  className="px-4 py-2.5 rounded-xl glass-panel text-amber-400 font-semibold text-xs hover:border-amber-400/40 flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
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
