import { Phone, Mail, MapPin, Clock, MessageCircle, User } from 'lucide-react';
import { companyInfo, getWhatsAppUrl, getCallUrl } from '../data/companyInfo';
import EnquiryForm from '../components/forms/EnquiryForm';

const ContactPage = () => {
  return (
    <div className="pb-20 md:pb-0 bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-brand-teal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-16 bg-brand-orange rounded-bl-[60px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-16 bg-brand-orange rounded-tr-[60px]"></div>
        
        <div className="container-custom relative">
          <div className="w-16 h-1 bg-brand-orange rounded-full mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/80 max-w-2xl text-lg">
            Have questions about our products or need a quote? We're here to help.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Contact Cards */}
            <div className="card p-6">
              <h3 className="text-lg font-heading font-bold text-slate-800 mb-5 flex items-center gap-3">
                <div className="w-1 h-8 bg-brand-teal rounded-full"></div>
                Quick Contact
              </h3>
              
              <div className="space-y-4">
                <a href={getCallUrl()} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-brand-orange" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-brand-orange transition-colors">Call Us</p>
                    <p className="text-slate-600 text-sm">{companyInfo.contact.phone}</p>
                    <p className="text-slate-600 text-sm">{companyInfo.contact.phone2}</p>
                  </div>
                </a>

                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-green-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-green-600 transition-colors">WhatsApp</p>
                    <p className="text-slate-600 text-sm">Quick response guaranteed</p>
                  </div>
                </a>

                <a href={`mailto:${companyInfo.contact.email}`} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-brand-teal" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-brand-teal transition-colors">Email Us</p>
                    <p className="text-slate-600 text-sm">{companyInfo.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="card p-6">
              <h3 className="text-lg font-heading font-bold text-slate-800 mb-5">
                Visit Our Office
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-orange" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 mb-1">Office Address</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{companyInfo.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-brand-teal" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 mb-1">Business Hours</p>
                    <p className="text-slate-600 text-sm">Mon-Fri: {companyInfo.businessHours.weekdays}</p>
                    <p className="text-slate-600 text-sm">Sat: {companyInfo.businessHours.saturday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Contact */}
            <div className="card p-6 bg-brand-teal/5 border-brand-teal/20">
              <h3 className="text-lg font-heading font-bold text-slate-800 mb-4">
                Sales Contact
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-brand-teal rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{companyInfo.team.salesManager.name}</p>
                  <p className="text-brand-orange text-sm font-medium mb-2">{companyInfo.team.salesManager.title}</p>
                  <p className="text-slate-600 text-sm">{companyInfo.team.salesManager.phone}</p>
                </div>
              </div>
            </div>

            <div className="card p-4 bg-slate-50">
              <p className="text-sm text-slate-500">
                <span className="font-medium">GST:</span> {companyInfo.gst}
              </p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2 space-y-8">
            <EnquiryForm 
              title="Send Us Your Enquiry"
              subtitle="Fill out the form and we'll get back to you within 24 hours"
            />

            {/* Map */}
            <div className="card overflow-hidden">
              <div className="aspect-video bg-slate-100">
                <iframe
                  src={companyInfo.address.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Apex ScrewBolta Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
