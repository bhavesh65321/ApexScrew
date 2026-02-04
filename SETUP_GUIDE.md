# Apex ScrewBolta - Setup Guide

This guide explains how to configure **visitor tracking**, **form submissions**, and **SEO** for your website.

---

## 1. VISITOR TRACKING (Know who visited your website)

### Option A: Google Analytics 4 (Recommended - FREE)

**What it shows:** Number of visitors, pages viewed, time spent, location, device, traffic sources

**Setup Steps:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" → Create Account
4. Enter account name: "Apex ScrewBolta"
5. Create a property → Enter "Apex ScrewBolta Website"
6. Select "Web" platform
7. Enter your website URL
8. Copy your **Measurement ID** (looks like: `G-XXXXXXXXXX`)
9. Open `src/utils/analytics.js` in your code
10. Replace `'G-XXXXXXXXXX'` with your actual ID

**View Reports:** analytics.google.com → Reports → Real-time (to see live visitors)

### Option B: Microsoft Clarity (FREE - Heatmaps & Recordings)

**What it shows:** Heatmaps of where users click, session recordings to watch exactly how users navigate

**Setup Steps:**
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with Microsoft account
3. Click "Add new project"
4. Enter your website URL
5. Copy your **Project ID**
6. Open `src/utils/analytics.js`
7. Replace `'CLARITY_PROJECT_ID'` with your ID

---

## 2. RECEIVING ENQUIRIES (Get notified when customer submits form)

You can use **EmailJS** (receive emails) or **Google Sheets** (save to spreadsheet), or both!

### Option A: EmailJS (Receive enquiries via Email)

**Free tier:** 200 emails/month

**Setup Steps:**

1. Go to [EmailJS](https://www.emailjs.com/) and create account
2. Verify your email address
3. **Add Email Service:**
   - Go to "Email Services" → "Add New Service"
   - Select Gmail (or your email provider)
   - Connect your Gmail account
   - Note the **Service ID** (e.g., `service_abc123`)

4. **Create Email Template:**
   - Go to "Email Templates" → "Create New Template"
   - Use this template content:
   
   ```
   Subject: New Enquiry from {{name}} - {{form_type}}
   
   New enquiry received from your website!
   
   Form Type: {{form_type}}
   Name: {{name}}
   Company: {{company}}
   Mobile: {{mobile}}
   Email: {{email}}
   Requirement: {{requirement}}
   Preferred Date: {{preferred_date}}
   Meeting Type: {{meeting_type}}
   Submitted: {{submitted_at}}
   ```
   
   - Save template
   - Note the **Template ID** (e.g., `template_xyz789`)

5. **Get Public Key:**
   - Go to "Account" → "General"
   - Copy your **Public Key**

6. **Update Code:**
   - Open `src/services/formSubmission.js`
   - Replace the values:
   ```javascript
   export const EMAILJS_CONFIG = {
     serviceId: 'service_abc123',      // Your Service ID
     templateId: 'template_xyz789',    // Your Template ID
     publicKey: 'your_public_key',     // Your Public Key
   };
   ```

### Option B: Google Sheets (Save enquiries + Track visitors)

This is the **recommended** option - it saves BOTH enquiry forms AND visitor tracking data!

**Setup Steps:**

1. Create a new Google Sheet: [sheets.google.com](https://sheets.google.com)
2. Name it **"Apex ScrewBolta Dashboard"**
3. Create **TWO tabs** at the bottom:
   - Click the **+** button to add a new tab
   - Name Tab 1: **"Enquiries"**
   - Name Tab 2: **"Visitors"**

4. Go to **Extensions → Apps Script**
5. Delete any existing code
6. Paste this complete code:

```javascript
// ==========================================================
// APEX SCREWBOLTA - GOOGLE SHEETS DASHBOARD
// ==========================================================
// Handles BOTH form enquiries AND website visitor tracking
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

// Test enquiry submission (run from script editor)
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
  Logger.log('Test enquiry added!');
}

// Test visitor tracking (run from script editor)
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
  Logger.log('Test visitor added!');
}
```

7. Click **Deploy → New Deployment**
8. Click the gear icon ⚙️ → Select **Web app**
9. Set "Execute as": **Me**
10. Set "Who has access": **Anyone**
11. Click **Deploy**
12. **Authorize** the app (click through permissions)
13. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/xxx.../exec`)

14. **Update your code:**
    - Open `src/services/googleSheetsSubmit.js`
    - Find line with `GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'`
    - Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with your copied URL

**Test it:**
- In Apps Script editor, run `testEnquiry` function
- Check your "Enquiries" sheet - you should see a test row!
- Run `testVisitor` function
- Check your "Visitors" sheet - you should see a test row!

**What you'll see in your Google Sheet:**

| Enquiries Sheet | Visitors Sheet |
|-----------------|----------------|
| Timestamp | Timestamp |
| Form Type | Visitor ID |
| Name | Device (mobile/desktop) |
| Company | Browser |
| Mobile | Page visited |
| Email | Traffic source |
| Requirement | Referrer URL |
| Status | Visit count |

---

## 3. SEO (Rank in Google search)

### Already Implemented ✅

- Meta tags with keywords
- Schema.org structured data (Organization + Local Business)
- Sitemap.xml
- Robots.txt
- Open Graph tags for social sharing
- Local SEO geo tags

### After Deployment - Submit to Google

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add your website property
3. Verify ownership (add verification meta tag)
4. Submit your sitemap: `https://yourwebsite.com/sitemap.xml`

### SEO Tips for Better Rankings

1. **Add more content pages:** Blog posts about fasteners, guides
2. **Get backlinks:** List on industrial directories, IndiaMart, TradeIndia
3. **Google My Business:** Create/claim your business listing
4. **Add testimonials:** Customer reviews help rankings
5. **Fast loading:** Already optimized with Vite
6. **Mobile-friendly:** Already implemented

### Target Keywords (already included)

- industrial fasteners Chennai
- screws bolts nuts supplier India
- bulk fasteners manufacturer
- hex bolts wholesale
- industrial hardware Chennai

---

## 4. ADDING PRODUCTS (Admin Panel)

### Complete Process to Add a New Product

#### Step 1: Prepare Your Product Image

**Option A: Using Google Drive (Recommended)**

1. Open [Google Drive](https://drive.google.com)
2. Click **"+ New"** → **"File upload"**
3. Select your product image (JPG, PNG, or WebP)
4. Wait for upload to complete
5. **Right-click** the uploaded image
6. Click **"Share"**
7. Click **"Change to anyone with the link"**
8. Make sure it says **"Anyone with the link" → "Viewer"**
9. Click **"Copy link"**
10. You'll get a link like: `https://drive.google.com/file/d/1ABC123xyz.../view?usp=sharing`

**Option B: Using Direct Image URL**

If your image is already hosted online:
- Use the direct URL (e.g., `https://example.com/images/bolt.jpg`)

---

#### Step 2: Access Admin Panel

1. Open your website
2. Go to: `yourwebsite.com/apex-portal-9x7k2m`
3. Enter password: `Test123` (or your custom password)
4. Click **"Access Dashboard"**

---

#### Step 3: Add the Product

1. Click the **"Products"** tab
2. Click **"+ Add Product"** button
3. Fill in the form:

| Field | Example | Required |
|-------|---------|----------|
| **Product Name** | Hex Bolt M10x50 SS304 | ✅ Yes |
| **Category** | bolts | ✅ Yes |
| **Subcategory** | Hex Bolts | Optional |
| **Material** | Stainless Steel 304 | Optional |
| **Size Range** | M6 - M24 | Optional |
| **Description** | High-strength hex bolt for industrial use | Optional |
| **Image URL** | (paste Google Drive link) | Optional |

4. Click **"Add Product"**

---

#### Step 4: Verify Product Added

1. Your product appears in the **Custom Products** table
2. Go to your website's **Products** page
3. The new product should be visible!

---

### Creating New Categories

When you type a **new category name** that doesn't exist, it's automatically created!

**Example:**
- You want to add "Washers" category
- In Category field, type: `washers`
- Add your product
- "Washers" category is now available in filters!

---

### Managing Products

**View Products:**
- Admin Panel → Products tab → See all custom products

**Delete Product:**
- Click the 🗑️ trash icon next to any product

**Edit Product:**
- Currently, delete and re-add with correct information

---

### Image Tips

1. **Image Size:** Use images around 400x400 pixels for best results
2. **Format:** JPG or PNG work best
3. **Google Drive:** Always set sharing to "Anyone with the link"
4. **If image doesn't show:** Check that the Google Drive link is shared publicly

---

### Quick Reference

| Task | Where to Go |
|------|-------------|
| Add Product | Admin → Products → Add Product |
| View Products | Website → Products page |
| Delete Product | Admin → Products → Click trash icon |
| Add Category | Type new name in Category field |

---

## 5. DEPLOYMENT

### Option A: Vercel (Recommended - FREE)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Deploy (automatic)
5. Get your URL (e.g., apexscrewbolta.vercel.app)
6. Connect custom domain

### Option B: Netlify (FREE)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import from GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

---

## Quick Checklist

**Initial Setup:**
- [ ] Configure Google Analytics (analytics.google.com)
- [ ] Configure Microsoft Clarity (clarity.microsoft.com)
- [ ] Setup Google Sheets for enquiries & visitor tracking
- [ ] Deploy website (Vercel/Netlify)
- [ ] Submit sitemap to Google Search Console
- [ ] Create Google My Business listing
- [ ] Update sitemap.xml with actual domain

**Adding Products:**
- [ ] Upload product images to Google Drive
- [ ] Share images with "Anyone with the link"
- [ ] Access Admin Panel (/apex-portal-9x7k2m)
- [ ] Add products with images and details
- [ ] Verify products appear on website

---

## Support

For questions, contact your developer or refer to:
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Google Analytics Help](https://support.google.com/analytics/)
- [Google Search Console Help](https://support.google.com/webmasters/)
