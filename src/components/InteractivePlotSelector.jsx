import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Filter, Check, X, ShieldCheck, ArrowRight, 
  MapPin, Compass, Tag, Layers, RefreshCw, Eye, 
  List, Grid3X3, Sparkles, Phone, MessageSquare, Car,
  ChevronRight, Building2, Trees, CheckCircle2, AlertCircle,
  Lock, BellRing, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getStoredInventory, 
  formatINR,
  calculateEMI
} from '../data/plotInventoryData';

export default function InteractivePlotSelector({ onOpenModal, initialTypeFilter = 'all' }) {
  const [inventory, setInventory] = useState([]);
  const [selectedPlotId, setSelectedPlotId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, available, booked, sold
  const [typeFilter, setTypeFilter] = useState(initialTypeFilter || 'all'); // all, 30x40, 30x45, 30x50, odd
  const [facingFilter, setFacingFilter] = useState('all'); // all, East, West, North
  const [sortBy, setSortBy] = useState('number'); // number, price_asc, price_desc, size_asc, size_desc
  const [viewMode, setViewMode] = useState('matrix'); // matrix, blueprint, list

  // Sync with initialTypeFilter from parent
  useEffect(() => {
    if (initialTypeFilter && initialTypeFilter !== 'all') {
      setTypeFilter(initialTypeFilter);
    }
  }, [initialTypeFilter]);

  // Sync inventory with central database and listen for real-time admin updates
  useEffect(() => {
    const loadData = () => {
      const data = getStoredInventory();
      setInventory(data);
      if (data.length > 0 && !selectedPlotId) {
        const firstAvail = data.find(p => p.status === 'available') || data[0];
        setSelectedPlotId(firstAvail.id);
      }
    };

    loadData();

    // Listen to custom update event from admin dashboard & storage event
    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('mvk_inventory_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('mvk_inventory_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Live inventory stats
  const stats = useMemo(() => {
    const total = inventory.length;
    const available = inventory.filter(p => p.status === 'available').length;
    const booked = inventory.filter(p => p.status === 'booked').length;
    const sold = inventory.filter(p => p.status === 'sold').length;
    const availablePercent = total ? Math.round((available / total) * 100) : 0;
    return { total, available, booked, sold, availablePercent };
  }, [inventory]);

  // Filtered & Sorted plots
  const filteredPlots = useMemo(() => {
    let result = inventory.filter(plot => {
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesNum = plot.number.toString().includes(q) || plot.plotNo.toLowerCase().includes(q);
        const matchesBlock = (plot.block || '').toLowerCase().includes(q);
        const matchesDim = (plot.dimensions || '').toLowerCase().includes(q);
        if (!matchesNum && !matchesBlock && !matchesDim) return false;
      }
      if (statusFilter !== 'all' && plot.status !== statusFilter) return false;
      if (typeFilter !== 'all') {
        if (typeFilter === 'odd' && (plot.type === 'odd' || plot.type === 'corner')) {
          // match odd/corner
        } else if (plot.type !== typeFilter) {
          return false;
        }
      }
      if (facingFilter !== 'all' && !plot.facing.toLowerCase().includes(facingFilter.toLowerCase())) return false;

      return true;
    });

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.totalPrice - a.totalPrice);
    } else if (sortBy === 'size_asc') {
      result.sort((a, b) => a.areaSqFt - b.areaSqFt);
    } else if (sortBy === 'size_desc') {
      result.sort((a, b) => b.areaSqFt - a.areaSqFt);
    } else {
      result.sort((a, b) => a.number - b.number);
    }

    return result;
  }, [inventory, searchQuery, statusFilter, typeFilter, facingFilter, sortBy]);

  // Currently selected plot
  const selectedPlot = useMemo(() => {
    return inventory.find(p => p.id === selectedPlotId) || inventory[0];
  }, [inventory, selectedPlotId]);

  // Status color helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
          dot: 'bg-emerald-500',
          label: 'Available',
          cardBorder: 'hover:border-emerald-500/60',
          cellBg: 'hover:bg-emerald-500/10'
        };
      case 'booked':
        return {
          bg: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
          dot: 'bg-amber-500',
          label: 'Booked',
          cardBorder: 'hover:border-amber-500/60',
          cellBg: 'hover:bg-amber-500/10'
        };
      case 'sold':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-500',
          label: 'Sold Out',
          cardBorder: 'hover:border-rose-500/60',
          cellBg: 'hover:bg-rose-500/10 opacity-60'
        };
      default:
        return {
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          dot: 'bg-slate-500',
          label: 'Unknown',
          cardBorder: '',
          cellBg: ''
        };
    }
  };

  // Group plots by Blueprint Avenues for Matrix View
  const avenueBlocks = useMemo(() => {
    return [
      {
        name: 'Avenue 1: West Crescent (Entry 1)',
        subtitle: 'Plots 76–111 • Dedicated Entry 1 Gateway & Avenue',
        plots: filteredPlots.filter(p => (p.number >= 76 && p.number <= 111))
      },
      {
        name: 'Avenue 2: Central Boulevard (Entry 2)',
        subtitle: 'Plots 44–75 • Central 30 Ft Avenue & Grand Promenade',
        plots: filteredPlots.filter(p => (p.number >= 44 && p.number <= 75))
      },
      {
        name: 'Avenue 3: Park Promenade (Entry 3)',
        subtitle: 'Plots 30–43 & 7–20 • Immediate North Park Zone (A) Access',
        plots: filteredPlots.filter(p => (p.number >= 30 && p.number <= 43) || (p.number >= 7 && p.number <= 20))
      },
      {
        name: 'Avenue 4: CA & Eastern Enclave',
        subtitle: 'Plots 1–6 & 21–29 • Adjacent to Civic Amenities & Entry 3',
        plots: filteredPlots.filter(p => (p.number >= 1 && p.number <= 6) || (p.number >= 21 && p.number <= 29))
      }
    ];
  }, [filteredPlots]);

  return (
    <section id="plot-finder" className="py-12 sm:py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Interactive Master Layout
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Interactive Plot Matrix & <span className="gold-gradient-text">Live Availability</span>
          </h2>
          <p className="text-xs sm:text-sm text-sub-color mt-1">
            Click any villa plot to view exact dimensions, pricing breakdown, Vastu orientation, and architectural specifications.
          </p>
        </motion.div>

        {/* Live Inventory Status Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="glass-panel rounded-2xl p-3.5 sm:p-4 mb-6 border-theme-subtle shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            
            {/* Real-time Status Badges */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl neo-inset">
                <span className="text-[10px] text-sub-color uppercase font-medium">Total:</span>
                <span className="text-xs font-bold text-main-color font-mono">{stats.total}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-emerald-500 font-semibold uppercase">Available:</span>
                <span className="text-xs font-extrabold text-emerald-500 font-mono">{stats.available}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-[10px] text-amber-500 font-semibold uppercase">Booked:</span>
                <span className="text-xs font-extrabold text-amber-500 font-mono">{stats.booked}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="text-[10px] text-rose-400 font-semibold uppercase">Sold:</span>
                <span className="text-xs font-extrabold text-rose-400 font-mono">{stats.sold}</span>
              </div>
            </div>

            {/* Inventory Reservation Progress Bar */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="w-28 sm:w-36 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${100 - stats.availablePercent}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-sub-color font-mono whitespace-nowrap">
                {100 - stats.availablePercent}% Reserved
              </span>
            </div>

          </div>
        </motion.div>

        {/* Search, Filter Toolbar & View Switcher */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-5">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-sub-color" />
            <input
              type="text"
              placeholder="Search plot # (e.g. 15, 42) or block..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-8 py-2 rounded-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sub-color hover:text-main-color"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl neo-inset self-start md:self-auto">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grid Matrix</span>
            </button>

            <button
              onClick={() => setViewMode('blueprint')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'blueprint'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Blueprint</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-theme-subtle">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] uppercase font-bold text-sub-color tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-amber-500" /> Filter:
            </span>

            {/* Status Chips */}
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'available', label: 'Available', dot: 'bg-emerald-500' },
                { id: 'booked', label: 'Booked', dot: 'bg-amber-500' },
                { id: 'sold', label: 'Sold', dot: 'bg-rose-500' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setStatusFilter(item.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    statusFilter === item.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'glass-panel text-sub-color hover:text-main-color hover:border-amber-400/30'
                  }`}
                >
                  {item.dot && <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>

            {/* Blueprint Dimensions Chips */}
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: 'all', label: 'All Sizes' },
                { id: '30x40', label: '30 × 40' },
                { id: '30x45', label: '30 × 45' },
                { id: '30x50', label: '30 × 50' },
                { id: 'odd', label: 'Odd Plots' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setTypeFilter(item.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    typeFilter === item.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'glass-panel text-sub-color hover:text-main-color hover:border-amber-400/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>

            {/* Facing Chips */}
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'All Facing' },
                { id: 'East', label: 'East' },
                { id: 'West', label: 'West' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFacingFilter(item.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    facingFilter === item.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'glass-panel text-sub-color hover:text-main-color hover:border-amber-400/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Reset Filters button if any filter is active */}
            {(statusFilter !== 'all' || typeFilter !== 'all' || facingFilter !== 'all' || searchQuery || sortBy !== 'number') && (
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setTypeFilter('all');
                  setFacingFilter('all');
                  setSearchQuery('');
                  setSortBy('number');
                }}
                className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all flex items-center gap-1 cursor-pointer ml-1"
                title="Reset All Filters"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Sort By Dropdown & Count */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-sub-color tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1 rounded-lg neo-inset text-main-color text-xs focus:outline-none focus:border-amber-500/50 bg-page-main cursor-pointer"
              >
                <option value="number">Plot # (1 to 111)</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="size_asc">Size: Small to Large</option>
                <option value="size_desc">Size: Large to Small</option>
              </select>
            </div>

            <div className="text-[11px] text-sub-color pl-2 border-l border-theme-subtle">
              <strong className="text-main-color font-mono">{filteredPlots.length}</strong> / 111
            </div>
          </div>
        </div>

        {/* Main Work Area: Grid/Canvas + Detail Inspector */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Visual Plot Matrix / Blueprint / List (8 cols) */}
          <div className="w-full lg:col-span-8 space-y-4">
            
            {/* VIEW 1: INTERACTIVE AVENUE MATRIX GRID */}
            {viewMode === 'matrix' && (
              <div className="space-y-4 max-h-[65vh] lg:max-h-none overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin">
                
                {/* Visual Landmark Signage */}
                <div className="p-2.5 rounded-2xl neo-inset flex flex-wrap items-center justify-between gap-2 text-xs sticky top-0 z-20 bg-page-main/90 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
                       <Building2 className="w-3 h-3" />
                    </div>
                    <span className="font-semibold text-main-color">Grand 3-Gateway Entrance</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-500 font-medium">
                    <Trees className="w-3 h-3" />
                    <span>Park Zone</span>
                  </div>
                </div>

                {filteredPlots.length === 0 ? (
                  <div className="glass-panel rounded-3xl p-10 text-center space-y-2">
                    <AlertCircle className="w-7 h-7 text-amber-500 mx-auto" />
                    <h4 className="text-sm font-bold text-main-color">No matching plots found</h4>
                    <p className="text-xs text-sub-color">
                      Try clearing search query or resetting filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                        setTypeFilter('all');
                        setFacingFilter('all');
                      }}
                      className="px-3.5 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer mt-2"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  avenueBlocks.map((block, bIdx) => {
                    if (block.plots.length === 0) return null;
                    return (
                      <motion.div 
                        key={bIdx} 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 350, damping: 25, delay: bIdx * 0.1 }}
                        className="glass-panel rounded-2xl p-3.5 sm:p-4 border-theme-subtle relative overflow-hidden"
                      >
                        
                        {/* Block Title */}
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-theme-subtle">
                          <div>
                            <h4 className="font-serif-luxury text-xs sm:text-sm font-bold text-main-color">
                              {block.name}
                            </h4>
                            <p className="text-[9.5px] text-sub-color">{block.subtitle}</p>
                          </div>
                          <span className="text-[9.5px] px-2 py-0.5 rounded-full neo-inset text-amber-500 font-mono">
                            {block.plots.length} Plots
                          </span>
                        </div>

                        {/* Plots Matrix Grid for this Block */}
                        <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {block.plots.map((plot) => {
                            const badge = getStatusBadge(plot.status);
                            const isSelected = selectedPlotId === plot.id;

                            return (
                              <motion.button
                                key={plot.id}
                                onClick={() => setSelectedPlotId(plot.id)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-center items-center min-h-[90px] overflow-hidden ${
                                  isSelected
                                    ? 'shadow-[0_0_20px_rgba(251,191,36,0.3)] ring-2 ring-amber-400 z-10'
                                    : 'hover:shadow-lg'
                                }`}
                              >
                                {/* Gradient Background based on status */}
                                <div className={`absolute inset-0 opacity-[0.15] dark:opacity-20 ${
                                  plot.status === 'available' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                                  plot.status === 'booked' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                                  'bg-gradient-to-br from-rose-500 to-red-600'
                                }`}></div>
                                
                                {/* Glass Overlay */}
                                <div className="absolute inset-0 glass-panel backdrop-blur-md opacity-80 border-t border-white/10"></div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center justify-center w-full">
                                  <span className={`text-2xl sm:text-3xl font-black font-serif-luxury tracking-tighter ${
                                    plot.status === 'available' ? 'text-emerald-500 dark:text-emerald-400 drop-shadow-[0_2px_4px_rgba(16,185,129,0.2)]' :
                                    plot.status === 'booked' ? 'text-amber-500 dark:text-amber-400 drop-shadow-[0_2px_4px_rgba(245,158,11,0.2)]' :
                                    'text-rose-500/80 dark:text-rose-400/80 drop-shadow-[0_2px_4px_rgba(225,29,72,0.2)]'
                                  }`}>
                                    {plot.number}
                                  </span>
                                  
                                  <div className="flex items-center gap-1 mt-1 opacity-90">
                                    <span 
                                      className={`w-1.5 h-1.5 rounded-full shadow-sm ${
                                        plot.status === 'available' ? 'bg-emerald-500 shadow-emerald-500/50' :
                                        plot.status === 'booked' ? 'bg-amber-500 shadow-amber-500/50' :
                                        'bg-rose-500 shadow-rose-500/50'
                                      }`}
                                    ></span>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${
                                      plot.status === 'available' ? 'text-emerald-600 dark:text-emerald-400' :
                                      plot.status === 'booked' ? 'text-amber-600 dark:text-amber-400' :
                                      'text-rose-600/80 dark:text-rose-400/80'
                                    }`}>
                                      {plot.status === 'available' ? 'Avail' : plot.status === 'booked' ? 'Booked' : 'Sold'}
                                    </span>
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                      </motion.div>
                    );
                  })
                )}

              </div>
            )}

            {/* VIEW 2: BLUEPRINT MAP WITH INTERACTIVE CALLOUTS */}
            {viewMode === 'blueprint' && (
              <div className="glass-panel rounded-3xl p-4 sm:p-5 border-theme-subtle space-y-3">
                <div className="flex items-center justify-between text-xs text-sub-color pb-2 border-b border-theme-subtle">
                  <span>Layout Blueprint Plan • HPA Approved</span>
                  <span className="text-amber-500 font-semibold">Click any plot below to select</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-black/10 dark:bg-black/50 p-2 text-center">
                  <img
                    src="/images/master-layout-plan.jpg"
                    alt="MVK Venkatadri Layout Plan"
                    loading="lazy"
                    className="w-full h-auto max-h-[550px] object-contain rounded-xl mx-auto"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full neo-inset text-[10px] text-amber-500 font-mono flex items-center gap-1">
                    <Compass className="w-3 h-3" />
                    <span>NORTH ⬆</span>
                  </div>
                </div>

                {/* Quick Plot Scroller */}
                <div className="pt-2">
                  <p className="text-xs font-semibold text-main-color mb-1.5">Quick Plot Selector:</p>
                  <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                    {filteredPlots.map(plot => (
                      <button
                        key={plot.id}
                        onClick={() => setSelectedPlotId(plot.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                          selectedPlotId === plot.id
                            ? 'bg-amber-400 text-slate-950 shadow'
                            : 'glass-panel text-sub-color hover:text-main-color'
                        }`}
                      >
                        #{plot.number} ({plot.dimensions})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: INVENTORY TABLE LIST */}
            {viewMode === 'list' && (
              <div className="glass-panel rounded-3xl p-4 border-theme-subtle overflow-hidden max-h-[65vh] lg:max-h-none flex flex-col">
                <div className="overflow-x-auto overflow-y-auto pr-2 scrollbar-thin flex-1">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-page-alt/90 backdrop-blur z-10">
                      <tr className="border-b border-theme-subtle text-sub-color uppercase text-[10px] tracking-wider">
                        <th className="pb-2.5 px-2.5">Plot #</th>
                        <th className="pb-2.5 px-2.5">Block</th>
                        <th className="pb-2.5 px-2.5">Dimensions</th>
                        <th className="pb-2.5 px-2.5">Area</th>
                        <th className="pb-2.5 px-2.5">Facing</th>
                        <th className="pb-2.5 px-2.5">Est. Value</th>
                        <th className="pb-2.5 px-2.5">Status</th>
                        <th className="pb-2.5 px-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-theme-subtle">
                      {filteredPlots.map((plot) => {
                        const badge = getStatusBadge(plot.status);
                        const isSelected = selectedPlotId === plot.id;
                        return (
                          <tr
                            key={plot.id}
                            onClick={() => setSelectedPlotId(plot.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-amber-500/10'
                                : 'hover:bg-black/5 dark:hover:bg-white/5'
                            }`}
                          >
                            <td className="py-2.5 px-2.5 font-mono font-bold text-main-color">
                              #{plot.number}
                            </td>
                            <td className="py-2.5 px-2.5 text-sub-color">{plot.block}</td>
                            <td className="py-2.5 px-2.5">
                              <span 
                                className="px-1.5 py-0.2 rounded text-[9.5px] font-bold text-white shadow-sm"
                                style={{ backgroundColor: plot.color }}
                              >
                                {plot.dimensions}
                              </span>
                            </td>
                            <td className="py-2.5 px-2.5 text-main-color font-mono">{plot.areaSqFt} Sq.Ft</td>
                            <td className="py-2.5 px-2.5 text-sub-color">{plot.facing}</td>
                            <td className="py-2.5 px-2.5 text-amber-500 font-bold font-mono">
                              {plot.formattedPrice}
                            </td>
                            <td className="py-2.5 px-2.5">
                              <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold border inline-flex items-center gap-1 ${badge.bg}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                                {badge.label}
                              </span>
                            </td>
                            <td className="py-2.5 px-2.5 text-right">
                              {plot.status === 'available' ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPlotId(plot.id);
                                    onOpenModal('quote', plot.plotNo);
                                  }}
                                  className="px-2 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] rounded-lg shadow cursor-pointer transition-all"
                                >
                                  Book
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPlotId(plot.id);
                                    onOpenModal('visit', `${plot.plotNo} Waitlist`);
                                  }}
                                  className="px-2 py-1 glass-panel text-sub-color hover:text-main-color font-semibold text-[10px] rounded-lg cursor-pointer transition-all"
                                >
                                  Waitlist
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Plot Detail Dossier Inspector (4 cols) */}
          <div className="w-full lg:col-span-4 lg:sticky lg:top-24 space-y-3 relative z-30">
            
            {selectedPlot ? (
              <motion.div
                key={selectedPlot.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="apple-living-glass rounded-3xl p-5 shadow-2xl space-y-4"
              >
                
                {/* Dossier Header */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-theme-subtle">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif-luxury text-2xl font-black text-main-color">
                        {selectedPlot.plotNo}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: selectedPlot.color }}
                      >
                        {selectedPlot.dimensions}
                      </span>
                    </div>
                    <p className="text-xs text-sub-color mt-0.5">
                      Block {selectedPlot.block} • {selectedPlot.areaSqFt} Sq.Ft ({selectedPlot.facing} Facing)
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedPlotId(null)}
                    className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-sub-color hover:text-main-color transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Plot Attributes Table */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-theme-subtle">
                    <span className="text-sub-color">Status</span>
                    <span className={`font-bold uppercase tracking-wider text-[11px] ${
                      selectedPlot.status === 'available' ? 'text-emerald-500' :
                      selectedPlot.status === 'booked' ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {selectedPlot.status}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-theme-subtle">
                    <span className="text-sub-color">Road Width</span>
                    <span className="font-medium text-main-color">{selectedPlot.roadWidth}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-theme-subtle">
                    <span className="text-sub-color">Base Rate</span>
                    <span className="font-medium text-main-color">₹{PROJECT_INFO.baseRatePerSqFt}/Sq.Ft</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-theme-subtle">
                    <span className="text-sub-color">Est. Base Price</span>
                    <span className="font-bold text-amber-500 font-mono">
                      {formatLakhs(selectedPlot.areaSqFt * PROJECT_INFO.baseRatePerSqFt)}
                    </span>
                  </div>
                </div>

                {/* Vastu Note */}
                <div className="p-2 rounded-xl neo-inset text-[10.5px] text-sub-color flex items-start gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{selectedPlot.vastu}</span>
                </div>

                {/* CONDITIONAL ACTION CTA BUTTONS BASED ON STATUS */}
                <div className="space-y-2 pt-1">
                  
                  {/* CASE 1: AVAILABLE */}
                  {selectedPlot.status === 'available' && (
                    <>
                      <a
                        href={`https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20I%20am%20interested%20in%20inquiring%20about%20Plot%20${selectedPlot.plotNo}%20(${selectedPlot.dimensions}%2C%20${selectedPlot.areaSqFt}%20SqFt)%20at%20Venkatadri%20Enclave.`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
                        <span>Inquire Specifications for {selectedPlot.plotNo}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="#calculator"
                          onClick={() => setSelectedPlotId(null)}
                          className="py-2 px-2 rounded-xl glass-panel text-main-color hover:text-amber-500 text-[10.5px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all"
                        >
                          <ArrowRight className="w-3 h-3 text-amber-500" />
                          <span>EMI Calculator</span>
                        </a>

                        <a
                          href={`https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20please%20share%20the%20complete%20dimension%20sheet%20for%20Plot%20${selectedPlot.plotNo}.`}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 px-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20 text-[10.5px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp Info</span>
                        </a>
                      </div>
                    </>
                  )}

                  {/* CASE 2: BOOKED */}
                  {selectedPlot.status === 'booked' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
                        <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-bold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Under Token / Reserved</span>
                        </div>
                        <p className="text-[10px] text-sub-color">
                          Advance token received. You can inquire about cancellation updates.
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20I%20noticed%20Plot%20${selectedPlot.plotNo}%20is%20currently%20reserved.%20Please%20notify%20me%20if%20this%20plot%20becomes%20available.`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow hover:bg-amber-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
                        <span>Inquire Waitlist on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          const nextAvail = inventory.find(p => p.status === 'available' && p.block === selectedPlot.block) || inventory.find(p => p.status === 'available');
                          if (nextAvail) setSelectedPlotId(nextAvail.id);
                        }}
                        className="w-full py-2 rounded-xl glass-panel text-amber-500 hover:border-amber-500/40 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Next Available Plot in This Block</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* CASE 3: SOLD OUT */}
                  {selectedPlot.status === 'sold' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center space-y-1">
                        <div className="flex items-center justify-center gap-1 text-rose-400 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Plot Sold & Registered</span>
                        </div>
                        <p className="text-[10px] text-sub-color">
                          This unit has been sold out. Booking is closed for this plot.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const nextAvail = inventory.find(p => p.status === 'available');
                          if (nextAvail) setSelectedPlotId(nextAvail.id);
                          setStatusFilter('available');
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-xs rounded-xl shadow hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Show Available Plots ({stats.available} Remaining)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20I%20noticed%20${selectedPlot.plotNo}%20is%20sold.%20Can%20you%20share%20other%20available%20options%20in%20${selectedPlot.block}%3F`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 rounded-xl glass-panel text-emerald-500 hover:border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire About Adjacent Available Plots</span>
                      </a>
                    </div>
                  )}

                </div>

              </motion.div>
            ) : null}

          </div>

        </div>

      </div>
    </section>
  );
}
