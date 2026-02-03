import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../../data/companyInfo';
import productsData from '../../data/products.json';

// Hexagonal icons for categories
const categoryIcons = {
  screws: '🔩',
  bolts: '⚙️',
  nuts: '🔧',
  custom: '⚡',
};

const ProductCategories = () => {
  const { categories } = productsData;

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="card-hover p-6 group"
            >
              {/* Hexagonal Icon */}
              <div className="w-16 h-16 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange/10 transition-colors mx-auto"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                <span className="text-3xl">{categoryIcons[category.id] || '⚙️'}</span>
              </div>
              
              <h3 className="text-xl font-heading font-bold text-slate-800 mb-2 text-center">
                {category.name}
              </h3>
              
              <p className="text-slate-600 text-sm mb-4 text-center line-clamp-2">
                {category.description}
              </p>

              {/* Subcategories */}
              <ul className="space-y-2 mb-6">
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

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <a
                  href={getWhatsAppUrl(`Hi, I'm interested in ${category.name}. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-sm py-2.5 justify-center"
                >
                  <MessageCircle size={16} />
                  Enquire Now
                </a>
                <Link 
                  to={`/products?category=${category.id}`}
                  className="btn-outline text-sm py-2.5 justify-center"
                >
                  View Products
                  <ArrowRight size={14} />
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
