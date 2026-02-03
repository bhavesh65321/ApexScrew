import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../../data/companyInfo';

const WhatsAppButton = ({ 
  text = 'WhatsApp Us', 
  customMessage = null, 
  className = '', 
  size = 'default',
  showIcon = true 
}) => {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <a
      href={getWhatsAppUrl(customMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <MessageCircle size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />}
      {text}
    </a>
  );
};

export default WhatsAppButton;
