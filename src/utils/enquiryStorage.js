// Local Enquiry Storage
// =====================
// Stores enquiries locally as backup and for admin dashboard viewing
// Note: This is in addition to EmailJS/Google Sheets - not a replacement

const STORAGE_KEY = 'apex_enquiries';

// Get all stored enquiries
export const getEnquiries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading enquiries:', error);
    return [];
  }
};

// Add new enquiry
export const addEnquiry = (enquiry) => {
  try {
    const enquiries = getEnquiries();
    const newEnquiry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...enquiry,
      status: 'new', // new, contacted, converted, closed
    };
    enquiries.unshift(newEnquiry); // Add to beginning
    
    // Keep only last 100 enquiries in localStorage
    const trimmed = enquiries.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    
    return newEnquiry;
  } catch (error) {
    console.error('Error saving enquiry:', error);
    return null;
  }
};

// Update enquiry status
export const updateEnquiryStatus = (id, status) => {
  try {
    const enquiries = getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].status = status;
      enquiries[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return false;
  }
};

// Delete enquiry
export const deleteEnquiry = (id) => {
  try {
    const enquiries = getEnquiries();
    const filtered = enquiries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return false;
  }
};

// Get enquiry stats
export const getEnquiryStats = () => {
  const enquiries = getEnquiries();
  const today = new Date().toDateString();
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  
  return {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    today: enquiries.filter(e => new Date(e.timestamp).toDateString() === today).length,
    thisWeek: enquiries.filter(e => new Date(e.timestamp) >= thisWeek).length,
    byType: {
      enquiry: enquiries.filter(e => e.formType === 'enquiry').length,
      quick_enquiry: enquiries.filter(e => e.formType === 'quick_enquiry').length,
      meeting_request: enquiries.filter(e => e.formType === 'meeting_request').length,
    },
    byStatus: {
      new: enquiries.filter(e => e.status === 'new').length,
      contacted: enquiries.filter(e => e.status === 'contacted').length,
      converted: enquiries.filter(e => e.status === 'converted').length,
      closed: enquiries.filter(e => e.status === 'closed').length,
    }
  };
};

// Clear all enquiries (use with caution)
export const clearAllEnquiries = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export default {
  getEnquiries,
  addEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
  clearAllEnquiries,
};
