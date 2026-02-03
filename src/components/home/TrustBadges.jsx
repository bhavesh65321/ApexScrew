import { Package, Award, Clock, Users } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

const TrustBadges = () => {
  const badges = [
    {
      icon: Package,
      value: companyInfo.stats.products,
      label: 'Products',
      description: 'Comprehensive range'
    },
    {
      icon: Award,
      value: `${companyInfo.stats.experience}+`,
      label: 'Years',
      description: 'Industry experience'
    },
    {
      icon: Users,
      value: companyInfo.stats.clients,
      label: 'Clients',
      description: 'Trust us nationwide'
    },
    {
      icon: Clock,
      value: '24hr',
      label: 'Response',
      description: 'Quick turnaround'
    },
  ];

  return (
    <section className="section bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="accent-line mx-auto mb-4"></div>
          <h2 className="section-title">
            Why Industries <span className="text-brand-teal">Trust Us</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Delivering quality fasteners to manufacturing and construction leaders across India
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="card-hover p-6 text-center"
            >
              <div className="w-14 h-14 bg-brand-teal/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <badge.icon className="text-brand-teal" size={28} />
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-orange mb-1">
                {badge.value}
              </div>
              <div className="text-lg font-semibold text-slate-800 mb-1">
                {badge.label}
              </div>
              <p className="text-sm text-slate-500">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
