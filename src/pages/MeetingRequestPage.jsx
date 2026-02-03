import { Calendar, Building2, Package, Users, Phone, ArrowRight } from 'lucide-react';
import MeetingRequestForm from '../components/forms/MeetingRequestForm';
import { companyInfo, getWhatsAppUrl, getCallUrl } from '../data/companyInfo';

const MeetingRequestPage = () => {
  const useCases = [
    { icon: Building2, title: 'Factory Visit', description: 'Visit our facility to see our inventory and processes.' },
    { icon: Package, title: 'Bulk Order Discussion', description: 'Discuss volume requirements and pricing.' },
    { icon: Users, title: 'Vendor Onboarding', description: 'Add us as your regular supplier.' },
    { icon: Calendar, title: 'Product Demo', description: 'See samples and get technical guidance.' },
  ];

  return (
    <div className="pb-20 md:pb-0 bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-brand-teal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-16 bg-brand-orange rounded-bl-[60px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-16 bg-brand-orange rounded-tr-[60px]"></div>
        
        <div className="container-custom relative">
          <div className="w-16 h-1 bg-brand-orange rounded-full mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Request a Meeting
          </h1>
          <p className="text-white/80 max-w-2xl text-lg">
            Schedule a meeting with our sales team for factory visits, bulk orders, or vendor onboarding.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Use Cases */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-heading font-bold text-slate-800">
              Why Request a Meeting?
            </h2>
            
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="card-hover p-5 flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="text-brand-teal" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{useCase.title}</h3>
                    <p className="text-sm text-slate-600">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="card p-6 bg-slate-50">
              <h3 className="font-heading font-bold text-slate-800 mb-3">
                Prefer to Talk First?
              </h3>
              <p className="text-sm text-slate-600 mb-5">
                Call us directly to discuss before scheduling.
              </p>
              <div className="space-y-3">
                <a href={getCallUrl()} className="btn-call w-full justify-center text-sm py-3">
                  <Phone size={16} />
                  {companyInfo.contact.phone}
                </a>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center text-sm py-3">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-2 space-y-8">
            <MeetingRequestForm />
            
            {/* Steps */}
            <div className="card p-6 md:p-8 bg-brand-teal/5 border-brand-teal/20">
              <h3 className="font-heading font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-brand-teal rounded-full"></div>
                What Happens Next?
              </h3>
              <ol className="space-y-4">
                {[
                  'Our team will review your request within 24 hours',
                  'We will call you to confirm the meeting date and time',
                  'You will receive a calendar invite with meeting details',
                  'Our sales manager will personally attend to your requirements'
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-7 h-7 bg-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-slate-700 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRequestPage;
