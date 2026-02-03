import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { companyInfo, getWhatsAppUrl, getCallUrl } from '../../data/companyInfo';
import QuickEnquiryForm from '../forms/QuickEnquiryForm';

const HeroSection = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-white">
      {/* Decorative Elements - Like Visiting Card */}
      <div className="absolute top-0 right-0 w-1/3 h-32 bg-brand-orange rounded-bl-[100px]"></div>
      <div className="absolute top-32 right-0 w-1/4 h-24 bg-brand-teal rounded-bl-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-24 bg-brand-orange rounded-tr-[80px]"></div>
      <div className="absolute bottom-24 left-0 w-1/5 h-16 bg-brand-teal rounded-tr-[60px]"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-brand-teal rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Trusted by {companyInfo.stats.clients} Businesses</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-800 leading-tight mb-6">
              <span className="text-brand-orange">Fastening</span> Trust,
              <br />
              <span className="text-brand-teal">One Bolt</span> at a Time
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              India's trusted supplier of premium industrial fasteners. 
              <span className="font-semibold text-slate-800"> {companyInfo.stats.products} products</span> for 
              manufacturing and construction excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={20} />
                Get Instant Quote
              </a>
              <a href={getCallUrl()} className="btn-outline">
                <Phone size={20} />
                Call Now
              </a>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-6">
              {['Quality Assured', 'Fast Delivery', '15+ Years Experience'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600">
                  <CheckCircle size={18} className="text-brand-teal" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Enquiry Form */}
          <div className="hidden lg:block">
            <QuickEnquiryForm />
          </div>
        </div>

        {/* Hexagonal Product Icons - Like Visiting Card */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { icon: '🔩', name: 'Bolts' },
              { icon: '⚙️', name: 'Screws' },
              { icon: '🔧', name: 'Nuts' },
              { icon: '⛓️', name: 'Washers' },
              { icon: '🛠️', name: 'Anchors' },
              { icon: '📦', name: 'Custom' },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center mb-2 group-hover:border-brand-orange group-hover:bg-brand-orange/5 transition-all duration-300 mx-auto"
                  style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                  <span className="text-2xl md:text-3xl">{item.icon}</span>
                </div>
                <span className="text-xs md:text-sm text-slate-600 font-medium">{item.name}</span>
              </div>
            ))}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-teal text-white rounded-xl flex items-center justify-center mb-2 mx-auto"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                <div className="text-center">
                  <div className="text-lg md:text-xl font-bold">10K+</div>
                  <div className="text-[8px] md:text-[10px] uppercase">Products</div>
                </div>
              </div>
              <span className="text-xs md:text-sm text-slate-600 font-medium">& More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
