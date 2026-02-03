// Google Analytics 4 + Microsoft Clarity Setup
// ===========================================
// 
// SETUP INSTRUCTIONS:
// 
// 1. GOOGLE ANALYTICS 4:
//    - Go to https://analytics.google.com/
//    - Create account > Create Property
//    - Get your Measurement ID (starts with "G-")
//    - Replace 'G-XXXXXXXXXX' below with your ID
//
// 2. MICROSOFT CLARITY (Optional - for heatmaps):
//    - Go to https://clarity.microsoft.com/
//    - Create project > Get Project ID
//    - Replace 'CLARITY_PROJECT_ID' below with your ID
//
// ===========================================

// Configuration - REPLACE THESE WITH YOUR IDs
export const ANALYTICS_CONFIG = {
  googleAnalyticsId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
  clarityProjectId: 'CLARITY_PROJECT_ID', // Replace with your Clarity ID
};

// Initialize Google Analytics 4
export const initGoogleAnalytics = () => {
  if (ANALYTICS_CONFIG.googleAnalyticsId === 'G-XXXXXXXXXX') {
    console.log('Google Analytics: Add your Measurement ID in src/utils/analytics.js');
    return;
  }

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.googleAnalyticsId);

  console.log('Google Analytics initialized');
};

// Initialize Microsoft Clarity (for heatmaps & session recordings)
export const initClarity = () => {
  if (ANALYTICS_CONFIG.clarityProjectId === 'CLARITY_PROJECT_ID') {
    console.log('Microsoft Clarity: Add your Project ID in src/utils/analytics.js');
    return;
  }

  (function(c, l, a, r, i, t, y) {
    c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", ANALYTICS_CONFIG.clarityProjectId);

  console.log('Microsoft Clarity initialized');
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Track form submissions
export const trackFormSubmission = (formName, formData = {}) => {
  trackEvent('form_submission', {
    form_name: formName,
    ...formData,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, destination = '') => {
  trackEvent('button_click', {
    button_name: buttonName,
    destination: destination,
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    action: 'open_chat',
  });
};

// Track phone calls
export const trackPhoneCall = () => {
  trackEvent('phone_call', {
    action: 'call_initiated',
  });
};

// Initialize all analytics
export const initAnalytics = () => {
  initGoogleAnalytics();
  initClarity();
};

export default initAnalytics;
