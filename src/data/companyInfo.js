export const companyInfo = {
  name: 'Apex ScrewBolta',
  shortName: 'ScrewBolta',
  tagline: 'Fastening trust, one bolt at a time',
  description: "India's Premier Industrial Fastener Supplier",
  
  contact: {
    phone: '+91 955 96 096 55',
    phone2: '+91 96491 15051',
    whatsapp: '919559609655',
    email: 'apexscrewbolta@gmail.com',
  },
  
  address: {
    line1: 'New No. 206, Old No. 167',
    line2: 'M.T.H Road, Mannurpet',
    line3: 'PO Padi, Ambattur',
    city: 'Chennai',
    pincode: '600 050',
    state: 'Tamil Nadu',
    country: 'India',
    full: 'New No. 206, Old No. 167, M.T.H Road, Mannurpet, PO Padi, Ambattur, Chennai - 600 050',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0!2d80.15!3d13.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3362%3A0x6e61a70b6e262c91!2sAmbattur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890',
  },

  gst: '33FPHPS2688M1Z2',
  
  team: {
    salesManager: {
      name: 'Govind Soni',
      title: 'Sales Manager',
      phone: '+91 955 96 096 55',
      email: 'apexscrewbolta@gmail.com',
    }
  },
  
  businessHours: {
    weekdays: '9:00 AM - 7:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: 'Closed',
  },
  
  stats: {
    products: '10,000+',
    experience: '15+',
    clients: '500+',
    cities: '50+',
  },
  
  social: {
    facebook: 'https://facebook.com/apexscrewbolta',
    linkedin: 'https://linkedin.com/company/apexscrewbolta',
    instagram: 'https://instagram.com/apexscrewbolta',
  },
  
  whatsappMessage: 'Hello Apex ScrewBolta Team, I am interested in your fasteners. Please contact me.',
};

export const getWhatsAppUrl = (customMessage = null) => {
  const message = customMessage || companyInfo.whatsappMessage;
  return `https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const getCallUrl = (phoneNumber = null) => {
  const phone = phoneNumber || companyInfo.contact.phone;
  return `tel:${phone.replace(/\s/g, '')}`;
};
