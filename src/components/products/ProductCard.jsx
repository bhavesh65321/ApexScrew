import { useState } from 'react';
import { MessageCircle, Package } from 'lucide-react';
import { getWhatsAppUrl } from '../../data/companyInfo';

/**
 * Convert Google Drive sharing link to direct image URL
 * Supports multiple Google Drive URL formats
 */
const getImageUrl = (url) => {
  if (!url) return null;
  
  // If it's already a direct URL (not Google Drive), return as is
  if (!url.includes('drive.google.com')) {
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!fileId && openMatch) {
    fileId = openMatch[1];
  }
  
  // Format: https://drive.google.com/uc?id=FILE_ID
  const ucMatch = url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (!fileId && ucMatch) {
    fileId = ucMatch[1];
  }
  
  if (fileId) {
    // Use thumbnail endpoint for better compatibility
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }
  
  return url;
};

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const enquiryMessage = `Hi, I'm interested in ${product.name} (${product.material}). Please share pricing and availability.`;
  
  const imageUrl = getImageUrl(product.image);

  return (
    <div className="card-hover overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImageError(true)}
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
