import { Award, Users, Target, Eye, CheckCircle, Factory, Building2, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/companyInfo';

const AboutPage = () => {
  const industries = [
    { icon: Factory, name: 'Manufacturing' },
    { icon: Building2, name: 'Construction' },
    { icon: Truck, name: 'Automotive' },
    { icon: Award, name: 'Engineering' },
  ];

  return (
    <div className="pb-20 md:pb-0 bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-teal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-20 bg-brand-orange rounded-bl-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-20 bg-brand-orange rounded-tr-[80px]"></div>
        
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="w-16 h-1 bg-brand-orange rounded-full mb-6"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              About <span className="text-brand-orange">Apex ScrewBolta</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              With over {companyInfo.stats.experience} years of experience, we have 
              established ourselves as a trusted name in industrial fasteners.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="accent-line mb-6"></div>
              <h2 className="section-title mb-8">Our Story</h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  {companyInfo.name} was founded with a simple mission: to provide Indian 
                  industries with reliable, high-quality fasteners at competitive prices.
                </p>
                <p>
                  Our journey has been driven by an unwavering commitment to quality and customer 
                  satisfaction. We understand that in manufacturing and construction, every 
                  component matters.
                </p>
                <p>
                  Today, we offer over {companyInfo.stats.products} products, ranging from standard 
                  fasteners to custom-manufactured solutions.
                </p>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: companyInfo.stats.products, label: 'Products', icon: Package },
                { value: `${companyInfo.stats.experience}+`, label: 'Years Experience', icon: Award },
                { value: companyInfo.stats.clients, label: 'Happy Clients', icon: Users },
                { value: companyInfo.stats.cities, label: 'Cities Served', icon: Truck },
              ].map((stat, idx) => (
                <div key={idx} className="card-hover p-6 text-center">
                  <div className="text-3xl font-heading font-bold text-brand-orange mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-brand-teal" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-800 mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most reliable supplier of industrial fasteners in India, providing 
                quality products, competitive pricing, and exceptional service.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="text-brand-orange" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-800 mb-4">
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To become India's leading fastener distributor by continuously expanding our 
                product range and building long-term partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="accent-line-teal mx-auto mb-4"></div>
            <h2 className="section-title">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', description: 'Every product meets stringent industrial standards.' },
              { title: 'Customer Focus', description: 'We go the extra mile to fulfill your requirements.' },
              { title: 'Integrity', description: 'Honest dealings and transparent pricing always.' },
            ].map((value, index) => (
              <div key={index} className="card-hover p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="text-green-600" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section bg-brand-teal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-16 bg-brand-orange rounded-bl-[60px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-16 bg-brand-orange rounded-tr-[60px]"></div>

        <div className="container-custom relative">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-brand-orange rounded-full mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                <industry.icon className="mx-auto mb-3 text-brand-orange" size={40} />
                <h3 className="font-semibold text-white">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="accent-line mx-auto mb-4"></div>
            <h2 className="section-title">Meet Our Team</h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="card p-8 text-center">
              <div className="w-24 h-24 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-5">
                <Users className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-800 mb-1">
                {companyInfo.team.salesManager.name}
              </h3>
              <p className="text-brand-orange font-medium mb-4">
                {companyInfo.team.salesManager.title}
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                <p>{companyInfo.team.salesManager.phone}</p>
                <p>{companyInfo.team.salesManager.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-50">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Ready to Work Together?</h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8">
            Get in touch with our team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <Link to="/products" className="btn-outline">Browse Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add missing import
import { Package } from 'lucide-react';

export default AboutPage;
