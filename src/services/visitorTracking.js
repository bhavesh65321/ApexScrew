// Visitor Tracking Service
// ========================
// Tracks website visitors and sends data to Google Sheets
// Works alongside Google Analytics for deeper visitor insights
//
// SETUP:
// 1. Use the same Google Apps Script as enquiries (it handles both)
// 2. Make sure to deploy the updated Apps Script (see SETUP_GUIDE.md)

import { isGoogleSheetsConfigured } from './googleSheetsSubmit';

// Get session storage key for tracking
const SESSION_KEY = 'apex_visitor_session';
const VISITS_KEY = 'apex_visit_count';

// Get visitor fingerprint (simple, privacy-friendly)
const getVisitorFingerprint = () => {
  const data = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

// Get stored visitor ID or create new one
const getVisitorId = () => {
  let visitorId = localStorage.getItem('apex_visitor_id');
  if (!visitorId) {
    visitorId = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('apex_visitor_id', visitorId);
  }
  return visitorId;
};

// Check if this is a new session
const isNewSession = () => {
  const sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionStorage.setItem(SESSION_KEY, Date.now().toString());
    return true;
  }
  return false;
};

// Get visit count for this visitor
const getVisitCount = () => {
  const count = parseInt(localStorage.getItem(VISITS_KEY) || '0', 10);
  return count;
};

// Increment visit count
const incrementVisitCount = () => {
  const count = getVisitCount() + 1;
  localStorage.setItem(VISITS_KEY, count.toString());
  return count;
};

// Get referrer info
const getReferrerInfo = () => {
  const referrer = document.referrer;
  if (!referrer) return { source: 'direct', referrer: '' };
  
  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();
    
    // Detect source
    if (hostname.includes('google')) return { source: 'google', referrer };
    if (hostname.includes('facebook') || hostname.includes('fb.com')) return { source: 'facebook', referrer };
    if (hostname.includes('linkedin')) return { source: 'linkedin', referrer };
    if (hostname.includes('twitter') || hostname.includes('x.com')) return { source: 'twitter', referrer };
    if (hostname.includes('instagram')) return { source: 'instagram', referrer };
    if (hostname.includes('youtube')) return { source: 'youtube', referrer };
    if (hostname.includes('whatsapp')) return { source: 'whatsapp', referrer };
    
    return { source: 'referral', referrer };
  } catch {
    return { source: 'unknown', referrer };
  }
};

// Get UTM parameters
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
  };
};

// Get device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
};

// Get browser name
const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Other';
};

// Track page view
export const trackPageView = async (pageName = '') => {
  const currentPage = pageName || window.location.pathname;
  
  // Only track new sessions to avoid duplicate entries
  const newSession = isNewSession();
  
  const visitorData = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    visitorId: getVisitorId(),
    fingerprint: getVisitorFingerprint(),
    page: currentPage,
    pageTitle: document.title,
    device: getDeviceType(),
    browser: getBrowser(),
    screenSize: `${screen.width}x${screen.height}`,
    language: navigator.language,
    ...getReferrerInfo(),
    ...getUTMParams(),
    visitCount: newSession ? incrementVisitCount() : getVisitCount(),
    isNewSession: newSession,
    isNewVisitor: getVisitCount() === 1,
  };

  // Store locally for admin dashboard
  storeVisitLocally(visitorData);

  // Only send to Google Sheets for new sessions
  if (newSession) {
    await sendToGoogleSheets(visitorData);
  }

  return visitorData;
};

// Store visit data locally
const VISITS_STORAGE_KEY = 'apex_visitor_logs';

const storeVisitLocally = (data) => {
  try {
    const visits = JSON.parse(localStorage.getItem(VISITS_STORAGE_KEY) || '[]');
    visits.unshift({ ...data, localTimestamp: Date.now() });
    
    // Keep only last 200 visits
    const trimmed = visits.slice(0, 200);
    localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error storing visit:', error);
  }
};

// Get stored visits
export const getStoredVisits = () => {
  try {
    return JSON.parse(localStorage.getItem(VISITS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

// Get visitor stats
export const getVisitorStats = () => {
  const visits = getStoredVisits();
  const today = new Date().toDateString();
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  
  // Get unique visitors
  const uniqueVisitors = new Set(visits.map(v => v.visitorId)).size;
  const newVisitors = visits.filter(v => v.isNewVisitor).length;
  
  // Get device breakdown
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
  visits.forEach(v => {
    if (deviceCounts[v.device] !== undefined) {
      deviceCounts[v.device]++;
    }
  });
  
  // Get source breakdown
  const sourceCounts = {};
  visits.forEach(v => {
    const source = v.source || 'direct';
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });
  
  // Get top pages
  const pageCounts = {};
  visits.forEach(v => {
    const page = v.page || '/';
    pageCounts[page] = (pageCounts[page] || 0) + 1;
  });
  
  return {
    totalVisits: visits.length,
    uniqueVisitors,
    newVisitors,
    todayVisits: visits.filter(v => new Date(v.localTimestamp).toDateString() === today).length,
    weekVisits: visits.filter(v => new Date(v.localTimestamp) >= thisWeek).length,
    byDevice: deviceCounts,
    bySource: sourceCounts,
    topPages: Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count })),
  };
};

// Send to Google Sheets
const sendToGoogleSheets = async (data) => {
  try {
    const { submitVisitorToSheets } = await import('./googleSheetsSubmit');
    const result = await submitVisitorToSheets(data);
    
    if (result.success) {
      console.log('👤 Visitor tracked:', data.device, data.source);
    }
    
    return result;
  } catch (error) {
    console.error('Failed to track visitor:', error);
    return { success: false, error };
  }
};

// Clear stored visits
export const clearStoredVisits = () => {
  localStorage.removeItem(VISITS_STORAGE_KEY);
};

export default {
  trackPageView,
  getStoredVisits,
  getVisitorStats,
  clearStoredVisits,
};
