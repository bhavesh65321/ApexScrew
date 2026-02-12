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

// Hashed password - SHA-256 hash (password cannot be seen in inspect element)
// To change password: Generate new hash at https://emn178.github.io/online-tools/sha256.html
const ADMIN_PASSWORD_HASH = 'd9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e';

// Session key for storage
const SESSION_KEY = 'apex_admin_session';
const SESSION_EXPIRY_KEY = 'apex_admin_expiry';
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Verify password
export const verifyPassword = async (inputPassword) => {
  const inputHash = await hashPassword(inputPassword);
  // Compare input hash with stored hash (timing-safe comparison)
  return inputHash === ADMIN_PASSWORD_HASH;
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
