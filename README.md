# Apex ScrewBolta - Premium Industrial Fasteners Website

A modern, elegant, high-conversion React web application for Apex ScrewBolta, India's premier industrial fastener supplier with 10,000+ products.

![Apex ScrewBolta](https://via.placeholder.com/1200x600/0a1929/fbbf24?text=Apex+ScrewBolta)

## Features

- **Premium Dark Theme** - Elegant navy & gold color scheme inspired by the visiting card
- **Modern React Frontend** - Built with React 18, Vite, and Tailwind CSS
- **Mobile-First Design** - Fully responsive with sticky mobile CTA bar
- **Lead Capture System** - 8 entry points for customer enquiries
- **Floating CTAs** - Always-visible WhatsApp, Call, and Meeting buttons
- **Google Sheets Integration** - Product catalog managed via Google Sheets
- **Animated UI** - Smooth animations, glassmorphism, and gradient effects

## Design Highlights

- **Color Palette**: Navy (#0a1929) + Gold (#fbbf24) + Steel grays
- **Typography**: Poppins for headings, Inter for body text
- **Effects**: Glassmorphism, gradient buttons, glow effects, subtle animations
- **UX**: Clear CTAs, trust badges, quick enquiry forms

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Forms | React Hook Form |
| Icons | Lucide React |
| Data | Google Sheets API + Local JSON |

## Contact Information (from Visiting Card)

- **Phone**: +91 955 96 096 55 / +91 96491 15051
- **Email**: apexscrewbolta@gmail.com
- **Address**: New No. 206, Old No. 167, M.T.H Road, Mannurpet, PO Padi, Ambattur, Chennai - 600 050
- **GST**: 33FPHPS2688M1Z2
- **Contact Person**: Govind Soni (Sales Manager)

## Quick Start

```bash
# Navigate to project
cd /Users/bhavesh.soni/ApexScrew

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app runs at **http://localhost:3000**

## Project Structure

```
src/
├── components/
│   ├── common/         # Header, Footer, FloatingCTA, MobileStickyCTA
│   ├── forms/          # EnquiryForm, QuickEnquiryForm, MeetingRequestForm
│   ├── home/           # HeroSection, TrustBadges, ProductCategories, WhyChooseUs
│   └── products/       # ProductCard, ProductGrid, CategoryFilter
├── pages/              # HomePage, ProductsPage, AboutPage, ContactPage, MeetingRequestPage
├── hooks/              # useGoogleSheets, useProducts
├── services/           # googleSheetsService
├── data/               # companyInfo.js, products.json
└── styles/             # globals.css (Tailwind + custom styles)
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - Hero, trust badges, product categories, why choose us |
| `/products` | Product catalog with category filters |
| `/about` | Company story, mission, team info |
| `/contact` | Contact details, enquiry form, map |
| `/request-meeting` | Meeting/visit scheduling form |

## Lead Capture Entry Points

1. Hero section quick enquiry form
2. Hero section WhatsApp CTA
3. Hero section Call CTA
4. Floating WhatsApp button (all pages)
5. Floating Call button (all pages)
6. Product cards "Enquire Now" buttons
7. Contact page full enquiry form
8. Meeting request page dedicated form

## Configuration

### Update Contact Details

Edit `src/data/companyInfo.js` to update:
- Phone numbers and WhatsApp
- Email address
- Office address
- Team information
- Business hours

### Google Sheets Integration

1. Create a Google Sheet with columns:
   - ID, Name, Category, SubCategory, Material, SizeRange, ImageURL, Description

2. Publish the sheet (File > Share > Publish to web)

3. Update `src/hooks/useProducts.js`:
   ```js
   const GOOGLE_SHEET_CONFIG = {
     enabled: true,
     sheetId: 'YOUR_SHEET_ID',
     sheetName: 'Products',
   };
   ```

### Google Drive Images

- Upload product images to Google Drive
- Set folder to "Anyone with link can view"
- Use sharing URL in sheet's ImageURL column

## Deployment

### Netlify / Vercel

```bash
npm run build
# Deploy the 'dist' folder
```

### Environment Variables

No environment variables required for basic deployment.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Private - Apex ScrewBolta

## Contact

**Govind Soni** - Sales Manager  
Phone: +91 955 96 096 55  
Email: apexscrewbolta@gmail.com
