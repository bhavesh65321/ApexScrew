// Google Sheets Integration for Enquiries & Visitor Tracking
// ===========================================================
// This sends form enquiries AND tracks website visitors to your Google Sheet
//
// SETUP (One-time, 10 minutes):
// 
// 1. Create a new Google Sheet: https://sheets.google.com
// 2. Name it: "Apex ScrewBolta Dashboard"
// 3. Create TWO sheets/tabs at the bottom:
//    - Tab 1: "Enquiries" (for form submissions)
//    - Tab 2: "Visitors" (for website visitor tracking)
//
// 4. Go to Extensions → Apps Script
// 5. Delete existing code and paste the APPS_SCRIPT_CODE below
// 6. Click Deploy → New Deployment
// 7. Select "Web app"
// 8. Set "Execute as" = Me
// 9. Set "Who has access" = Anyone
// 10. Click Deploy and copy the Web App URL
// 11. Paste the URL below in GOOGLE_SHEET_URL
//
// ===========================================================

// ⚠️ PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

// Check if configured
export const isGoogleSheetsConfigured = () => {
  return GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL' && GOOGLE_SHEET_URL.includes('script.google.com');
};

// Submit to Google Sheets
export const submitToGoogleSheets = async (formData, formType = 'enquiry') => {
  // Prepare data
  const payload = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    formType: formType,
    name: formData.name || '',
    company: formData.company || '',
    mobile: formData.mobile || '',
    email: formData.email || '',
    requirement: formData.requirement || formData.message || '',
    preferredDate: formData.preferredDate || '',
    meetingType: formData.meetingType || '',
    status: 'New'
  };

  // If not configured, log instructions
  if (!isGoogleSheetsConfigured()) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 GOOGLE SHEETS NOT CONFIGURED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('To receive enquiries in Google Sheets:');
    console.log('1. Open: src/services/googleSheetsSubmit.js');
    console.log('2. Follow the setup instructions at the top');
    console.log('3. Paste your Web App URL in GOOGLE_SHEET_URL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Enquiry Data (not sent):', payload);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return { success: false, reason: 'not_configured', data: payload };
  }

  try {
    // Send to Google Sheets via Apps Script
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('✅ Enquiry sent to Google Sheets:', payload.name, '-', payload.company);
    return { success: true, data: payload };
    
  } catch (error) {
    console.error('❌ Failed to send to Google Sheets:', error);
    return { success: false, error: error.message, data: payload };
  }
};

// Submit visitor tracking data
export const submitVisitorToSheets = async (visitorData) => {
  if (!isGoogleSheetsConfigured()) {
    console.log('📊 Visitor tracking: Google Sheets not configured');
    return { success: false, reason: 'not_configured' };
  }

  try {
    const payload = {
      type: 'visitor',
      ...visitorData,
    };

    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('👤 Visitor tracked to Google Sheets');
    return { success: true };
  } catch (error) {
    console.error('Failed to track visitor:', error);
    return { success: false, error: error.message };
  }
};

// ============================================
// GOOGLE APPS SCRIPT - Copy this to your Sheet
// ============================================
export const APPS_SCRIPT_CODE = `
// ==========================================================
// APEX SCREWBOLTA - GOOGLE SHEETS DASHBOARD
// ==========================================================
// Handles BOTH form enquiries AND website visitor tracking
// 
// SETUP:
// 1. Create two sheets: "Enquiries" and "Visitors"
// 2. Paste this code in Extensions → Apps Script
// 3. Deploy as Web App (Anyone can access)
// ==========================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    
    // Route to appropriate sheet based on type
    if (data.type === 'visitor') {
      return handleVisitor(ss, data);
    } else {
      return handleEnquiry(ss, data);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle form enquiries
function handleEnquiry(ss, data) {
  var sheet = ss.getSheetByName('Enquiries') || ss.getActiveSheet();
  
  // Add headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Form Type', 'Name', 'Company', 'Mobile', 
      'Email', 'Requirement', 'Preferred Date', 'Meeting Type', 'Status'
    ]);
    formatHeader(sheet, 10);
  }
  
  sheet.appendRow([
    data.timestamp || new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}),
    data.formType || 'enquiry',
    data.name || '',
    data.company || '',
    data.mobile || '',
    data.email || '',
    data.requirement || '',
    data.preferredDate || '',
    data.meetingType || '',
    data.status || 'New'
  ]);
  
  sheet.autoResizeColumns(1, 10);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, type: 'enquiry' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handle visitor tracking
function handleVisitor(ss, data) {
  var sheet = ss.getSheetByName('Visitors');
  
  // Create Visitors sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Visitors');
  }
  
  // Add headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Visitor ID', 'Device', 'Browser', 'Page', 
      'Source', 'Referrer', 'UTM Source', 'UTM Medium', 'UTM Campaign',
      'Screen Size', 'Language', 'Visit Count', 'New Visitor'
    ]);
    formatHeader(sheet, 14);
  }
  
  sheet.appendRow([
    data.timestamp || new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}),
    data.visitorId || '',
    data.device || '',
    data.browser || '',
    data.page || '',
    data.source || 'direct',
    data.referrer || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.screenSize || '',
    data.language || '',
    data.visitCount || 1,
    data.isNewVisitor ? 'Yes' : 'No'
  ]);
  
  sheet.autoResizeColumns(1, 14);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, type: 'visitor' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Format header row with brand color
function formatHeader(sheet, numCols) {
  var headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange.setBackground('#1B6B7C');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
}

// ========== UTILITY FUNCTIONS ==========

// Get summary stats - run from script editor
function getDashboardStats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var enquiriesSheet = ss.getSheetByName('Enquiries');
  var visitorsSheet = ss.getSheetByName('Visitors');
  
  var stats = {
    totalEnquiries: enquiriesSheet ? enquiriesSheet.getLastRow() - 1 : 0,
    totalVisitors: visitorsSheet ? visitorsSheet.getLastRow() - 1 : 0,
    timestamp: new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})
  };
  
  Logger.log('Dashboard Stats: ' + JSON.stringify(stats));
  return stats;
}

// Test enquiry submission
function testEnquiry() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        formType: 'test',
        name: 'Test User',
        company: 'Test Company',
        mobile: '9876543210',
        email: 'test@example.com',
        requirement: 'Test enquiry - please ignore',
        status: 'New'
      })
    }
  };
  doPost(testData);
  Logger.log('Test enquiry added - check Enquiries sheet!');
}

// Test visitor tracking
function testVisitor() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        type: 'visitor',
        visitorId: 'test_visitor_123',
        device: 'desktop',
        browser: 'Chrome',
        page: '/test',
        source: 'direct',
        visitCount: 1,
        isNewVisitor: true
      })
    }
  };
  doPost(testData);
  Logger.log('Test visitor added - check Visitors sheet!');
}
`;

export default submitToGoogleSheets;
