// Form Submission Service
// =======================
// Handles sending form data to email and/or Google Sheets
//
// SETUP OPTIONS:
//
// OPTION 1: EmailJS (Recommended - Free tier: 200 emails/month)
// -------------------------------------------------------------
// 1. Go to https://www.emailjs.com/
// 2. Create account and verify email
// 3. Add Email Service (Gmail, Outlook, etc.)
// 4. Create Email Template with variables: {{name}}, {{company}}, {{mobile}}, {{email}}, {{requirement}}, {{date}}
// 5. Get your Service ID, Template ID, and Public Key
// 6. Update the config below
//
// OPTION 2: Google Sheets (via Google Apps Script)
// ------------------------------------------------
// 1. Create a Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Paste the script from GOOGLE_APPS_SCRIPT below
// 4. Deploy as Web App (Anyone can access)
// 5. Copy the Web App URL and paste below
//
// =======================

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
  templateId: 'YOUR_TEMPLATE_ID',    // Replace with your EmailJS Template ID
  publicKey: 'YOUR_PUBLIC_KEY',      // Replace with your EmailJS Public Key
};

// Google Sheets Configuration
export const SHEETS_CONFIG = {
  webAppUrl: 'YOUR_GOOGLE_APPS_SCRIPT_URL', // Replace with your Apps Script Web App URL
};

// Check if EmailJS is configured
const isEmailJSConfigured = () => {
  return EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
         EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
         EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';
};

// Check if Google Sheets is configured
const isSheetsConfigured = () => {
  return SHEETS_CONFIG.webAppUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_URL';
};

// Load EmailJS SDK
let emailjsLoaded = false;
const loadEmailJS = () => {
  return new Promise((resolve) => {
    if (emailjsLoaded || !isEmailJSConfigured()) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      window.emailjs.init(EMAILJS_CONFIG.publicKey);
      emailjsLoaded = true;
      resolve();
    };
    document.head.appendChild(script);
  });
};

// Send via EmailJS
const sendViaEmailJS = async (formData, formType) => {
  if (!isEmailJSConfigured()) {
    console.log('EmailJS not configured. Add your credentials in src/services/formSubmission.js');
    return { success: false, error: 'EmailJS not configured' };
  }

  await loadEmailJS();

  try {
    const templateParams = {
      form_type: formType,
      name: formData.name || '',
      company: formData.company || '',
      mobile: formData.mobile || '',
      email: formData.email || '',
      requirement: formData.requirement || formData.message || '',
      preferred_date: formData.preferredDate || '',
      meeting_type: formData.meetingType || '',
      submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const result = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('EmailJS: Form sent successfully', result);
    return { success: true, result };
  } catch (error) {
    console.error('EmailJS: Failed to send', error);
    return { success: false, error };
  }
};

// Send to Google Sheets
const sendToGoogleSheets = async (formData, formType) => {
  if (!isSheetsConfigured()) {
    console.log('Google Sheets not configured. Add your Web App URL in src/services/formSubmission.js');
    return { success: false, error: 'Google Sheets not configured' };
  }

  try {
    const payload = {
      formType,
      timestamp: new Date().toISOString(),
      ...formData,
    };

    const response = await fetch(SHEETS_CONFIG.webAppUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Google Sheets: Data sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Google Sheets: Failed to send', error);
    return { success: false, error };
  }
};

// Import local storage for admin dashboard
import { addEnquiry } from '../utils/enquiryStorage';

// Main submission function - sends to all configured services
export const submitForm = async (formData, formType = 'enquiry') => {
  const results = {
    emailjs: null,
    sheets: null,
    local: null,
  };

  // Always save locally for admin dashboard
  try {
    const savedEnquiry = addEnquiry({ ...formData, formType });
    results.local = { success: true, enquiry: savedEnquiry };
    console.log('📋 Enquiry saved locally for admin dashboard');
  } catch (error) {
    console.error('Failed to save locally:', error);
    results.local = { success: false, error };
  }

  // Try EmailJS
  if (isEmailJSConfigured()) {
    results.emailjs = await sendViaEmailJS(formData, formType);
  }

  // Try Google Sheets
  if (isSheetsConfigured()) {
    results.sheets = await sendToGoogleSheets(formData, formType);
  }

  // Check if at least one succeeded
  const anySuccess = results.emailjs?.success || results.sheets?.success || results.local?.success;

  if (!isEmailJSConfigured() && !isSheetsConfigured()) {
    console.warn('⚠️ External services not configured!');
    console.log('📧 Configure EmailJS or Google Sheets in src/services/formSubmission.js');
    console.log('✅ Enquiry saved locally - view in Admin Dashboard');
  }

  return {
    success: anySuccess,
    results,
  };
};

// ============================================
// GOOGLE APPS SCRIPT (Copy this to your Sheet)
// ============================================
export const GOOGLE_APPS_SCRIPT = `
// Paste this in Google Sheets > Extensions > Apps Script

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Form Type', 'Name', 'Company', 'Mobile', 'Email', 'Requirement', 'Preferred Date', 'Meeting Type']);
    }
    
    // Add the form data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.formType || '',
      data.name || '',
      data.company || '',
      data.mobile || '',
      data.email || '',
      data.requirement || data.message || '',
      data.preferredDate || '',
      data.meetingType || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Deploy: Click Deploy > New Deployment > Web App > Anyone can access
`;

export default submitForm;
