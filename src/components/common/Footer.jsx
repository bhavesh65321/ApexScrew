import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { companyInfo, getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Request Meeting', href: '/request-meeting' },
  ];

  const productLinks = [
    { name: 'Screws', href: '/products?category=screws' },
    { name: 'Bolts', href: '/products?category=bolts' },
    { name: 'Nuts', href: '/products?category=nuts' },
    { name: 'Custom Fasteners', href: '/products?category=custom' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="bg-brand-teal">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                Ready to Start Your Project?
              </h3>
              <p className="text-white/80">Get in touch for premium fastening solutions</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="btn bg-brand-orange text-white hover:bg-brand-orange-dark">
                Contact Us
                <ArrowRight size={18} />
              </Link>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-white">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {/* Company Info - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4 md:mb-6">
              <img 
                src="/logo.png" 
                alt="Apex ScrewBolta" 
                className="h-12 md:h-16 w-auto"
              />
            </Link>
            <p className="text-slate-400 mb-4 md:mb-6 text-sm leading-relaxed">
              "{companyInfo.tagline}" - Your trusted partner for premium industrial fasteners.
            </p>
            <div className="flex gap-3">
              {[Facebook, Linkedin, Instagram].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="w-9 h-9 md:w-10 md:h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-teal transition-colors text-slate-400 hover:text-white"
                >
                  <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Same row as Products on mobile */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider mb-4 md:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-brand-orange transition-colors text-xs md:text-sm flex items-center gap-1.5 md:gap-2"
                  >
                    <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products - Same row as Quick Links on mobile */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider mb-4 md:mb-6">
              Products
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-brand-orange transition-colors text-xs md:text-sm flex items-center gap-1.5 md:gap-2"
                  >
                    <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider mb-4 md:mb-6">
              Contact
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-orange mt-0.5 flex-shrink-0 md:w-[18px] md:h-[18px]" />
                <span className="text-slate-400 text-xs md:text-sm leading-relaxed">{companyInfo.address.full}</span>
              </li>
              <li>
                <a href={getCallUrl()} className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
                  <Phone size={16} className="text-brand-orange flex-shrink-0 md:w-[18px] md:h-[18px]" />
                  <div className="text-xs md:text-sm">
                    <div>{companyInfo.contact.phone}</div>
                    <div>{companyInfo.contact.phone2}</div>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.contact.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <Mail size={16} className="text-brand-orange flex-shrink-0 md:w-[18px] md:h-[18px]" />
                  <span className="text-xs md:text-sm">{companyInfo.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-brand-orange mt-0.5 flex-shrink-0 md:w-[18px] md:h-[18px]" />
                <div className="text-xs md:text-sm text-slate-400">
                  <p>Mon-Fri: {companyInfo.businessHours.weekdays}</p>
                  <p>Sat: {companyInfo.businessHours.saturday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            GST: {companyInfo.gst}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
