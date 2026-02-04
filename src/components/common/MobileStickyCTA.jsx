import { Link } from 'react-router-dom';
import { getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';

// Custom unique icons as SVG components
const PhoneRingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 2c.83.5 1.5 1.17 2 2M17.5 2a6 6 0 013 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="19" cy="5" r="2" fill="currentColor" className="animate-ping opacity-75"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 8h10M7 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="17" cy="15" r="3" fill="currentColor"/>
    <path d="M16 15l1 1 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MobileStickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
      {/* Glass Background */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <div className="flex items-stretch justify-around p-2 gap-2">
          
          {/* Call Button */}
          <a
            href={getCallUrl()}
            className="group flex-1 flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl bg-gradient-to-br from-orange-500 via-brand-orange to-amber-500 shadow-lg shadow-orange-200 active:scale-95 transition-all"
          >
            <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-1 group-active:scale-90 transition-transform">
              <PhoneRingIcon />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide">CALL</span>
          </a>

          {/* WhatsApp Button - Center & Prominent */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-1 flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl bg-gradient-to-br from-[#25D366] via-[#20BD5A] to-[#128C7E] shadow-lg shadow-green-200 active:scale-95 transition-all -mt-3"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl blur-md opacity-40 -z-10"></div>
            
            {/* Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white border-2 border-white shadow-sm">
              1
            </span>
            
            <div className="w-10 h-10 bg-white/25 backdrop-blur rounded-xl flex items-center justify-center mb-1 group-active:scale-90 transition-transform text-white">
              <WhatsAppIcon />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide">WHATSAPP</span>
          </a>

          {/* Quote Button */}
          <Link
            to="/request-meeting"
            className="group flex-1 flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl bg-gradient-to-br from-brand-teal via-teal-500 to-teal-600 shadow-lg shadow-teal-200 active:scale-95 transition-all"
          >
            <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-1 group-active:scale-90 transition-transform text-white">
              <QuoteIcon />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide">QUOTE</span>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
