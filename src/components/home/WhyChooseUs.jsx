import { CheckCircle, Truck, HeadphonesIcon, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'All products meet ISO standards with rigorous quality checks.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Local orders in 24-48 hours. Pan-India shipping network.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Expert Support',
      description: 'Technical guidance for choosing the right fasteners.'
    },
    {
      icon: Users,
      title: 'Bulk Specialists',
      description: 'From 100 to 100,000 pieces - we handle any scale.'
    },
    {
      icon: Zap,
      title: 'Best Pricing',
      description: 'Direct sourcing means competitive wholesale rates.'
    },
    {
      icon: CheckCircle,
      title: 'Credit Facility',
      description: 'Flexible payment options for regular customers.'
    }
  ];

  return (
    <section className="section bg-brand-teal relative overflow-hidden">
      {/* Decorative elements like visiting card */}
      <div className="absolute top-0 right-0 w-1/4 h-20 bg-brand-orange rounded-bl-[60px]"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-20 bg-brand-orange rounded-tr-[60px]"></div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="w-16 h-1 bg-brand-orange rounded-full mb-6"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Why Choose <span className="text-brand-orange">Apex ScrewBolta</span>?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg">
              With over 15 years in the industry, we understand what manufacturing and 
              construction businesses need. Excellence is our standard.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - CTA Card */}
          <div className="bg-white rounded-2xl p-8 shadow-soft-xl">
            <h3 className="text-2xl font-heading font-bold text-slate-800 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-slate-600 mb-6">
              Get your customized quote within 24 hours. No obligation, no hidden costs.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Free consultation for bulk orders',
                'Competitive wholesale pricing',
                'Credit facility for regular clients',
                'Pan-India delivery network'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle className="text-brand-teal flex-shrink-0" size={18} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <Link to="/contact" className="btn-primary justify-center">
                Get Free Quote
              </Link>
              <Link to="/request-meeting" className="btn-outline justify-center">
                Schedule Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
