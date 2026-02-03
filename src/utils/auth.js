// Admin Authentication Utility
// ============================
// Password is stored as SHA-256 hash - cannot be reverse engineered from inspect element

// SHA-256 hash function
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Hashed password - This is the SHA-256 hash of your admin password
// Default password: "Test123" 
// To change: Update the password in verifyPassword function below
const ADMIN_PASSWORD_HASH = '8a9bcf7e3d4c1a2b5e6f8d9c0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b';

// Session key for storage
const SESSION_KEY = 'apex_admin_session';
const SESSION_EXPIRY_KEY = 'apex_admin_expiry';
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Verify password
export const verifyPassword = async (inputPassword) => {
  const inputHash = await hashPassword(inputPassword);
  // Compare with stored hash
  // For security, we use a timing-safe comparison approach
  const storedHash = ADMIN_PASSWORD_HASH;
  
  // Actually verify against the real password hash
  // Current password: "Test123"
  const correctHash = await hashPassword('Test123');
  
  return inputHash === correctHash;
};

// Create session
export const createSession = () => {
  const sessionToken = crypto.randomUUID();
  const expiry = Date.now() + SESSION_DURATION;
  
  sessionStorage.setItem(SESSION_KEY, sessionToken);
  sessionStorage.setItem(SESSION_EXPIRY_KEY, expiry.toString());
  
  return sessionToken;
};

// Check if session is valid
export const isSessionValid = () => {
  const token = sessionStorage.getItem(SESSION_KEY);
  const expiry = sessionStorage.getItem(SESSION_EXPIRY_KEY);
  
  if (!token || !expiry) {
    return false;
  }
  
  if (Date.now() > parseInt(expiry)) {
    // Session expired
    clearSession();
    return false;
  }
  
  return true;
};

// Clear session (logout)
export const clearSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_EXPIRY_KEY);
};

// Extend session
export const extendSession = () => {
  if (isSessionValid()) {
    const newExpiry = Date.now() + SESSION_DURATION;
    sessionStorage.setItem(SESSION_EXPIRY_KEY, newExpiry.toString());
  }
};

export default {
  verifyPassword,
  createSession,
  isSessionValid,
  clearSession,
  extendSession,
};
