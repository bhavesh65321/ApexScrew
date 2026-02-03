import { MessageCircle, Package } from 'lucide-react';
import { getWhatsAppUrl } from '../../data/companyInfo';

const ProductCard = ({ product }) => {
  const enquiryMessage = `Hi, I'm interested in ${product.name} (${product.material}). Please share pricing and availability.`;

  return (
    <div className="card-hover overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
            <Package className="text-slate-300" size={64} />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-brand-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.subcategory}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-heading font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
          {product.name}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Specs */}
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Material</span>
            <span className="text-slate-700 font-medium">{product.material}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Size Range</span>
            <span className="text-slate-700 font-medium">{product.sizeRange}</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={getWhatsAppUrl(enquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full justify-center py-2.5 text-sm"
        >
          <MessageCircle size={16} />
          Enquire Now
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
