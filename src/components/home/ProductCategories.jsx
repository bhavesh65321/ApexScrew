import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../../data/companyInfo';
import useProducts from '../../hooks/useProducts';

// Hexagonal icons for categories
const categoryIcons = {
  screws: '🔩',
  bolts: '⚙️',
  nuts: '🔧',
  custom: '⚡',
  washers: '⭕',
  rivets: '📍',
  anchors: '⚓',
  studs: '📌',
};

const ProductCategories = () => {
  const { categories } = useProducts();

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="accent-line-teal mx-auto mb-4"></div>
          <h2 className="section-title">
            Our Product <span className="text-brand-orange">Range</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Comprehensive selection of industrial fasteners for every application
          </p>
        </div>

        {/* 2x2 grid on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="card-hover p-4 md:p-6 group"
            >
              {/* Hexagonal Icon */}
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:bg-brand-orange/10 transition-colors mx-auto"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                <span className="text-2xl md:text-3xl">{categoryIcons[category.id] || '⚙️'}</span>
              </div>
              
              <h3 className="text-base md:text-xl font-heading font-bold text-slate-800 mb-1 md:mb-2 text-center">
                {category.name}
              </h3>
              
              <p className="text-slate-600 text-xs md:text-sm mb-3 md:mb-4 text-center line-clamp-2 hidden md:block">
                {category.description}
              </p>

              {/* Subcategories - Hidden on mobile */}
              <ul className="space-y-2 mb-4 md:mb-6 hidden md:block">
                {category.subcategories.slice(0, 3).map((sub, idx) => (
                  <li key={idx} className="text-sm text-slate-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
                    {sub}
                  </li>
                ))}
                {category.subcategories.length > 3 && (
                  <li className="text-sm text-brand-orange font-medium">
                    +{category.subcategories.length - 3} more
                  </li>
                )}
              </ul>

              {/* Mobile: Show count */}
              <p className="text-xs text-brand-teal font-medium text-center mb-3 md:hidden">
                {category.subcategories.length} types
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <a
                  href={getWhatsAppUrl(`Hi, I'm interested in ${category.name}. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-xs md:text-sm py-2 md:py-2.5 justify-center"
                >
                  <MessageCircle size={14} className="md:w-4 md:h-4" />
                  <span className="hidden md:inline">Enquire Now</span>
                  <span className="md:hidden">Enquire</span>
                </a>
                <Link 
                  to={`/products?category=${category.id}`}
                  className="btn-outline text-xs md:text-sm py-2 md:py-2.5 justify-center"
                >
                  <span className="hidden md:inline">View Products</span>
                  <span className="md:hidden">View</span>
                  <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/products" className="btn-primary">
            Browse All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
