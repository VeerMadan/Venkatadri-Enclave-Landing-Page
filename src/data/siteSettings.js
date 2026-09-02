// Site Settings & Content Configuration with LocalStorage Sync

export const DEFAULT_SITE_SETTINGS = {
  projectName: "VENKATADRI ENCLAVE",
  tagline: "Where artistry and nature flourish in harmonious abundance",
  locationShort: "Bagaluru Main Road, Yelahanka",
  locationFull: "Bagaluru Main Road, Yelahanka, Bengaluru - 560064",
  baseRatePerSqFt: 7699,
  salesPhone: "+91 99000 90049",
  salesPhoneRaw: "9900090049",
  whatsappUrl: "https://wa.me/919900090049",
  salesEmail: "sales@mvkdevelopers.com",
  developerName: "MVK Builders & Developers LLP",
  slogan: "Build Better With MVK",
  webhookUrl: "", // Optional webhook (Google Sheets / Zapier / Telegram)
  layoutHeadline: "6-Acre Master Layout Plan",
  layoutSubtext: "111 Handcrafted Villa Plots • HPA & BMRDA Sanctioned • Ready for Immediate Registration"
};

const SETTINGS_STORAGE_KEY = 'mvk_site_settings_v1';
export const SETTINGS_SYNC_EVENT = 'mvk_settings_updated';

export const getStoredSiteSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_SETTINGS;
    return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
};

export const saveStoredSiteSettings = (newSettings) => {
  try {
    const updated = { ...getStoredSiteSettings(), ...newSettings };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(SETTINGS_SYNC_EVENT, { detail: updated }));
    return updated;
  } catch (err) {
    console.error("Failed to save site settings:", err);
    return null;
  }
};

export const resetStoredSiteSettings = () => {
  try {
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(SETTINGS_SYNC_EVENT, { detail: DEFAULT_SITE_SETTINGS }));
    return DEFAULT_SITE_SETTINGS;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
};
