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
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <path d="M50 5 L80 25 L65 25 L50 15 L35 25 L20 25 Z" fill="#E5A027"/>
                <path d="M50 20 L70 35 L60 35 L50 28 L40 35 L30 35 Z" fill="#E5A027"/>
                <path d="M25 40 C25 40 25 70 50 85 C75 70 75 40 75 40 L50 55 Z" fill="#1B6B7C"/>
              </svg>
              <span className="text-xl font-heading font-bold">
                <span className="text-brand-orange">Apex</span>
                <span className="text-white"> ScrewBolta</span>
              </span>
            </Link>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              "{companyInfo.tagline}" - Your trusted partner for premium industrial fasteners.
            </p>
            <div className="flex gap-3">
              {[Facebook, Linkedin, Instagram].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-teal transition-colors text-slate-400 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-brand-orange transition-colors text-sm flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-brand-orange transition-colors text-sm flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm leading-relaxed">{companyInfo.address.full}</span>
              </li>
              <li>
                <a href={getCallUrl()} className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
                  <Phone size={18} className="text-brand-orange flex-shrink-0" />
                  <div className="text-sm">
                    <div>{companyInfo.contact.phone}</div>
                    <div>{companyInfo.contact.phone2}</div>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.contact.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <Mail size={18} className="text-brand-orange flex-shrink-0" />
                  <span className="text-sm">{companyInfo.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-brand-orange mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-400">
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
