import { useState, useEffect } from 'react';
import { Phone, Calendar, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';

// Custom WhatsApp Icon
const WhatsAppIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Show pulse animation for first 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col items-end gap-4">
      {/* Expanded Options */}
      <div className={`flex flex-col gap-3 transition-all duration-500 ${
        isExpanded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}>
        {/* Meeting Request */}
        <Link
          to="/request-meeting"
          className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm text-slate-700 pl-5 pr-3 py-3 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="whitespace-nowrap font-semibold text-sm group-hover:text-brand-orange transition-colors">
            Request Meeting
          </span>
          <div className="w-11 h-11 bg-gradient-to-br from-brand-orange to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <Calendar size={20} className="text-white" />
          </div>
        </Link>

        {/* Call Button */}
        <a
          href={getCallUrl()}
          className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm text-slate-700 pl-5 pr-3 py-3 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="whitespace-nowrap font-semibold text-sm group-hover:text-brand-teal transition-colors">
            Call Now
          </span>
          <div className="w-11 h-11 bg-gradient-to-br from-brand-teal to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <Phone size={20} className="text-white" />
          </div>
        </a>
      </div>

      {/* WhatsApp Button - Premium Design with Real WhatsApp Icon */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-gradient-to-r from-[#25D366] via-[#20BD5A] to-[#128C7E] text-white pl-5 pr-4 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
        
        {/* Pulsing dot */}
        {showPulse && (
          <>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-[9px] font-bold">1</span>
            </span>
          </>
        )}
        
        <div className="flex flex-col items-start">
          <span className="text-white/70 text-[10px] font-medium">Chat with us</span>
          <span className="whitespace-nowrap font-bold text-sm -mt-0.5">Get Instant Quote</span>
        </div>
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <WhatsAppIcon size={30} />
        </div>
      </a>

      {/* Toggle Button - Elegant */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isExpanded 
            ? 'bg-slate-800 text-white' 
            : 'bg-gradient-to-br from-white to-slate-50 text-brand-teal hover:from-brand-teal hover:to-teal-600 hover:text-white border border-slate-100'
        }`}
      >
        <X size={24} className={`transition-transform duration-500 ${isExpanded ? 'rotate-0' : 'rotate-45'}`} />
      </button>
    </div>
  );
};

export default FloatingCTA;
