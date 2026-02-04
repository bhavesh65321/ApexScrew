import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Search, MessageCircle } from 'lucide-react';
import { companyInfo, getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

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
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Apex ScrewBolta - Industrial Fasteners" 
              className="h-10 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products... (bolts, screws, nuts)"
                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-teal text-white rounded-full flex items-center justify-center hover:bg-brand-teal-dark transition-colors"
              >
                <Search size={16} />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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

          {/* Desktop CTAs - Elegant Design */}
          <div className="hidden lg:flex items-center gap-2 ml-6">
            {/* WhatsApp Button - Pulsing */}
            <a 
              href={getWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="font-semibold text-sm">WhatsApp</span>
            </a>

            {/* Call Button - Gradient */}
            <a 
              href={getCallUrl()} 
              className="group flex items-center gap-2 bg-gradient-to-r from-brand-orange to-amber-500 text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Phone size={18} className="group-hover:animate-pulse" />
              <span className="font-semibold text-sm">Call Now</span>
            </a>
          </div>

          {/* Mobile: Search + Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-600 hover:text-brand-teal transition-colors"
            >
              <Search size={24} />
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-teal transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isSearchOpen ? 'max-h-20 pb-4' : 'max-h-0'
        }`}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
              autoFocus={isSearchOpen}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-teal text-white rounded-lg flex items-center justify-center"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
        }`}>
          <nav className="flex flex-col gap-1 pt-4 border-t border-slate-100">
            {/* Mobile Search in Menu */}
            <form onSubmit={handleSearch} className="relative px-4 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal"
              />
              <button 
                type="submit"
                className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-teal text-white rounded-lg flex items-center justify-center"
              >
                <Search size={18} />
              </button>
            </form>

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
            
            {/* Mobile CTAs - Elegant */}
            <div className="flex flex-col gap-3 mt-4 px-4">
              {/* WhatsApp - Full width, gradient */}
              <a 
                href={getWhatsAppUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle size={20} />
                <span className="font-semibold">WhatsApp Us</span>
              </a>
              
              <div className="flex gap-3">
                <a 
                  href={getCallUrl()} 
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-amber-500 text-white py-3 rounded-xl shadow-md"
                >
                  <Phone size={18} />
                  <span className="font-semibold text-sm">Call</span>
                </a>
                <Link
                  to="/request-meeting"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-teal to-teal-600 text-white py-3 rounded-xl shadow-md"
                >
                  <span className="font-semibold text-sm">Get Quote</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
