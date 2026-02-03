import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo, getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-soft' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Top Bar */}
      <div className="bg-brand-teal text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={getCallUrl()} className="flex items-center gap-2 hover:text-brand-orange transition-colors">
              <Phone size={14} />
              <span>{companyInfo.contact.phone}</span>
            </a>
            <span className="text-white/40">|</span>
            <a href={`mailto:${companyInfo.contact.email}`} className="flex items-center gap-2 hover:text-brand-orange transition-colors">
              <Mail size={14} />
              <span>{companyInfo.contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin size={14} />
            <span>Chennai, India</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              {/* Logo SVG matching visiting card */}
              <svg width="48" height="48" viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M50 5 L80 25 L65 25 L50 15 L35 25 L20 25 Z" fill="#E5A027"/>
                <path d="M50 20 L70 35 L60 35 L50 28 L40 35 L30 35 Z" fill="#E5A027"/>
                <path d="M25 40 C25 40 25 70 50 85 C75 70 75 40 75 40 L50 55 Z" fill="#1B6B7C"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold">
                <span className="text-brand-orange">Apex</span>
                <span className="text-brand-teal"> ScrewBolta</span>
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Industrial Fasteners</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors relative ${
                  isActive(item.href)
                    ? 'text-brand-orange'
                    : 'text-slate-700 hover:text-brand-teal'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-orange rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={getCallUrl()} className="btn-outline text-sm py-2.5">
              <Phone size={16} />
              Call Now
            </a>
            <Link to="/request-meeting" className="btn-primary text-sm py-2.5">
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-brand-teal transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <nav className="flex flex-col gap-1 pt-4 border-t border-slate-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-brand-orange/10 text-brand-orange'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-3 mt-4 px-4">
              <a href={getCallUrl()} className="btn-outline flex-1 justify-center text-sm py-3">
                <Phone size={16} />
                Call
              </a>
              <Link
                to="/request-meeting"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary flex-1 justify-center text-sm py-3"
              >
                Get Quote
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
