/**
 * Google Sheets Service
 * 
 * This service fetches product data from a published Google Sheet.
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet with columns: ID, Name, Category, SubCategory, Material, SizeRange, ImageURL, Description
 * 2. Go to File > Share > Publish to web
 * 3. Select the sheet and choose "Web page" format
 * 4. Copy the published URL
 * 5. Replace SHEET_ID below with your sheet's ID (found in the URL)
 * 
 * Sheet URL format: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
 */

// Replace with your actual Google Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Products'; // Name of the sheet/tab

// Public Google Sheets JSON API endpoint
const getSheetUrl = (sheetId, sheetName) => {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
};

/**
 * Parse Google Sheets JSON response
 * Google Sheets returns data in a specific format that needs parsing
 */
const parseGoogleSheetsResponse = (text) => {
  // Remove the wrapper that Google adds
  const jsonString = text
    .replace(/^.*google\.visualization\.Query\.setResponse\(/, '')
    .replace(/\);$/, '');
  
  const data = JSON.parse(jsonString);
  
  if (!data.table || !data.table.rows) {
    return [];
  }

  // Get column headers
  const headers = data.table.cols.map(col => col.label || col.id);
  
  // Map rows to objects
  const products = data.table.rows.map((row, index) => {
    const product = { id: String(index + 1) };
    
    row.c.forEach((cell, cellIndex) => {
      const header = headers[cellIndex]?.toLowerCase().replace(/\s+/g, '');
      if (header && cell) {
        product[header] = cell.v || cell.f || '';
      }
    });
    
    return product;
  });

  return products;
};

/**
 * Normalize product data from Google Sheets to match expected format
 */
const normalizeProduct = (rawProduct) => {
  return {
    id: rawProduct.id || '',
    name: rawProduct.name || rawProduct.productname || '',
    category: (rawProduct.category || '').toLowerCase(),
    subcategory: rawProduct.subcategory || rawProduct.subcategory || '',
    material: rawProduct.material || '',
    sizeRange: rawProduct.sizerange || rawProduct.size || '',
    description: rawProduct.description || '',
    image: rawProduct.imageurl || rawProduct.image || '',
  };
};

/**
 * Fetch products from Google Sheets
 */
export const fetchProductsFromSheet = async (sheetId = SHEET_ID, sheetName = SHEET_NAME) => {
  try {
    const url = getSheetUrl(sheetId, sheetName);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const text = await response.text();
    const rawProducts = parseGoogleSheetsResponse(text);
    const products = rawProducts.map(normalizeProduct).filter(p => p.name);
    
    return {
      success: true,
      data: products,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

/**
 * Get Google Drive image URL
 * Convert Google Drive sharing link to direct image URL
 * 
 * Input: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/uc?id=FILE_ID
 */
export const getGoogleDriveImageUrl = (driveUrl) => {
  if (!driveUrl) return '';
  
  // If it's already a direct URL, return as is
  if (driveUrl.includes('drive.google.com/uc?id=')) {
    return driveUrl;
  }
  
  // Extract file ID from sharing URL
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?id=${match[1]}`;
  }
  
  // If it's not a Google Drive URL, return as is
  return driveUrl;
};

export default {
  fetchProductsFromSheet,
  getGoogleDriveImageUrl,
};
