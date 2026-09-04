// MVK Leads & Site Visit Enquiries CRM Engine

import { getStoredSiteSettings } from './siteSettings';

const LEADS_STORAGE_KEY = 'mvk_leads_db_v1';
const RATE_LIMIT_STORAGE_KEY = 'mvk_lead_submission_history';
export const LEAD_SYNC_EVENT = 'mvk_lead_created';
export const LEADS_UPDATED_EVENT = 'mvk_leads_updated';

// 1. Strict Indian Mobile Validation (10 digits starting with 6-9)
export const validateIndianMobile = (rawPhone) => {
  const digits = (rawPhone || '').replace(/\D/g, '');
  
  if (!digits) {
    return { isValid: false, error: 'Mobile number is required', formatted: '' };
  }
  
  if (digits.length !== 10) {
    return { 
      isValid: false, 
      error: `Must be exactly 10 digits (currently ${digits.length})`, 
      formatted: digits 
    };
  }
  
  if (!/^[6-9]/.test(digits)) {
    return { 
      isValid: false, 
      error: 'Invalid number: Indian mobile numbers must start with 6, 7, 8, or 9', 
      formatted: digits 
    };
  }
  
  return { isValid: true, error: '', formatted: digits };
};

// 2. Rate Limiting Engine: Max 3 bookings per 24 hours
export const checkRateLimit = () => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const history = raw ? JSON.parse(raw) : [];
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    // Filter out submissions older than 24 hours
    const recent = history.filter(ts => ts > oneDayAgo);
    const MAX_ALLOWED = 3;
    
    if (recent.length >= MAX_ALLOWED) {
      return {
        allowed: false,
        remaining: 0,
        message: "You have reached the maximum booking requests (3) for today. Our sales specialist will contact you shortly, or call us at +91 99000 90049."
      };
    }
    
    return {
      allowed: true,
      remaining: MAX_ALLOWED - recent.length
    };
  } catch {
    return { allowed: true, remaining: 3 };
  }
};

const recordSubmissionTimestamp = () => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const history = raw ? JSON.parse(raw) : [];
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recent = history.filter(ts => ts > oneDayAgo);
    recent.push(Date.now());
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(recent));
  } catch (err) {
    console.error("Failed to record submission timestamp:", err);
  }
};

// Helper: Generate Pre-Typed WhatsApp Message Link for Automation Bot
export const generateBrochureWhatsAppUrl = (leadData) => {
  const settings = getStoredSiteSettings();
  const phone = settings.salesPhoneRaw || "9900090049";

  const message = `Hello MVK Team! I am interested in Venkatadri Enclave and would like to receive the official project brochure.

• Name: ${leadData.name || 'Visitor'}
• Mobile: +91 ${leadData.phone || ''}
• Purpose: ${leadData.purpose || 'Not Specified'}
• Budget Range: ${leadData.budget || 'Not Specified'}
• Plot Size Interest: ${leadData.plotSizeInterest || leadData.plotType || 'Not Specified'}
• Purchase Timeline: ${leadData.timeline || 'Not Specified'}

Please send me the brochure PDF.`;

  return `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
};

// 3. Leads Database CRUD
export const getStoredLeads = () => {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveLead = async (leadData) => {
  try {
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      return { success: false, error: rateCheck.message };
    }

    const phoneValidation = validateIndianMobile(leadData.phone);
    if (!phoneValidation.isValid) {
      return { success: false, error: phoneValidation.error };
    }

    const existingLeads = getStoredLeads();
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      name: (leadData.name || '').trim(),
      phone: phoneValidation.formatted,
      type: leadData.type || 'brochure', // brochure, visit, quote, calculator
      cab: leadData.cab || 'no', // yes, no
      plotType: leadData.plotType || leadData.plotSizeInterest || '1,200 Sq.Ft.',
      plotNumber: leadData.plotNumber || '',
      purpose: leadData.purpose || 'To build a home',
      budget: leadData.budget || '₹92+ Lakhs',
      plotSizeInterest: leadData.plotSizeInterest || '1,200 Sq.Ft.',
      timeline: leadData.timeline || 'This Weekend',
      status: 'New', // New, Contacted, Visit Scheduled, Closed
      notes: leadData.notes || '',
      source: window.location.pathname || '/'
    };

    const updatedLeads = [newLead, ...existingLeads];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    recordSubmissionTimestamp();

    // Broadcast live event to Admin Portal
    window.dispatchEvent(new CustomEvent(LEAD_SYNC_EVENT, { detail: newLead }));
    window.dispatchEvent(new CustomEvent(LEADS_UPDATED_EVENT, { detail: updatedLeads }));

    // Optional Webhook Forwarding (Zapier / Google Sheets)
    const settings = getStoredSiteSettings();
    if (settings.webhookUrl && settings.webhookUrl.startsWith('http')) {
      try {
        fetch(settings.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead),
          mode: 'no-cors'
        }).catch(() => {});
      } catch {}
    }

    const whatsappUrl = generateBrochureWhatsAppUrl(newLead);

    return { success: true, lead: newLead, whatsappUrl };
  } catch (err) {
    console.error("Failed to save lead:", err);
    return { success: false, error: "Failed to store lead inquiry. Please try again." };
  }
};

export const updateLeadStatus = (leadId, status, notes = null) => {
  try {
    const leads = getStoredLeads();
    const index = leads.findIndex(l => l.id === leadId);
    if (index === -1) return null;

    leads[index].status = status;
    if (notes !== null) {
      leads[index].notes = notes;
    }
    leads[index].updatedAt = new Date().toISOString();

    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent(LEADS_UPDATED_EVENT, { detail: leads }));
    return leads[index];
  } catch (err) {
    console.error("Failed to update lead status:", err);
    return null;
  }
};

export const deleteLead = (leadId) => {
  try {
    const leads = getStoredLeads();
    const filtered = leads.filter(l => l.id !== leadId);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(LEADS_UPDATED_EVENT, { detail: filtered }));
    return true;
  } catch {
    return false;
  }
};

// 4. Export Leads to CSV / Excel
export const exportLeadsToCSV = () => {
  const leads = getStoredLeads();
  if (!leads.length) return false;

  const headers = [
    "Lead ID", 
    "Date & Time", 
    "Customer Name", 
    "Phone", 
    "Inquiry Type", 
    "Purpose", 
    "Budget Range", 
    "Plot Size Interest", 
    "Purchase Timeline", 
    "Free Cab", 
    "Status", 
    "Notes"
  ];
  
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.formattedDate || l.createdAt}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"+91 ${l.phone}"`,
    `"${l.type || 'brochure'}"`,
    `"${(l.purpose || 'Not Specified').replace(/"/g, '""')}"`,
    `"${(l.budget || 'Not Specified').replace(/"/g, '""')}"`,
    `"${(l.plotSizeInterest || l.plotType || 'Not Specified').replace(/"/g, '""')}"`,
    `"${(l.timeline || 'Not Specified').replace(/"/g, '""')}"`,
    `"${l.cab || 'no'}"`,
    `"${l.status || 'New'}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `MVK_Venkatadri_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};
