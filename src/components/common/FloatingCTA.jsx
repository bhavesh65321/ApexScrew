import { useState } from 'react';
import { MessageCircle, Phone, Calendar, X, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col items-end gap-3">
      {/* Expanded Options */}
      <div className={`flex flex-col gap-3 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* Meeting Request */}
        <Link
          to="/request-meeting"
          className="flex items-center gap-3 bg-white text-slate-700 pl-5 pr-3 py-3 rounded-full shadow-soft-lg border border-slate-100 hover:border-brand-orange transition-all"
        >
          <span className="whitespace-nowrap font-medium text-sm">Request Meeting</span>
          <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center">
            <Calendar size={18} className="text-white" />
          </div>
        </Link>

        {/* Call Button */}
        <a
          href={getCallUrl()}
          className="flex items-center gap-3 bg-white text-slate-700 pl-5 pr-3 py-3 rounded-full shadow-soft-lg border border-slate-100 hover:border-brand-teal transition-all"
        >
          <span className="whitespace-nowrap font-medium text-sm">Call Now</span>
          <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center">
            <Phone size={18} className="text-white" />
          </div>
        </a>
      </div>

      {/* WhatsApp Button - Always Visible */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#25D366] text-white pl-5 pr-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <span className="whitespace-nowrap font-semibold text-sm">Get Instant Quote</span>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <MessageCircle size={24} />
        </div>
      </a>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 bg-white text-slate-600 rounded-full shadow-soft-lg border border-slate-100 hover:border-brand-teal transition-all flex items-center justify-center"
      >
        {isExpanded ? <X size={20} /> : <ChevronUp size={20} />}
      </button>
    </div>
  );
};

export default FloatingCTA;
