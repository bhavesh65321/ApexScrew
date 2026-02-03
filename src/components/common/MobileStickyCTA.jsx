import { Phone, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';

const MobileStickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 md:hidden">
      <div className="grid grid-cols-3">
        {/* Call Button */}
        <a
          href={getCallUrl()}
          className="flex flex-col items-center justify-center py-3 text-brand-orange hover:bg-brand-orange/5 transition-colors border-r border-slate-100"
        >
          <Phone size={22} />
          <span className="text-xs font-medium mt-1">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 text-[#25D366] hover:bg-green-50 transition-colors border-r border-slate-100"
        >
          <MessageCircle size={22} />
          <span className="text-xs font-medium mt-1">WhatsApp</span>
        </a>

        {/* Quote Button */}
        <Link
          to="/request-meeting"
          className="flex flex-col items-center justify-center py-3 text-brand-teal hover:bg-brand-teal/5 transition-colors"
        >
          <FileText size={22} />
          <span className="text-xs font-medium mt-1">Get Quote</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
