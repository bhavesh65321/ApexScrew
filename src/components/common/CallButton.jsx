import { Phone } from 'lucide-react';
import { getCallUrl, companyInfo } from '../../data/companyInfo';

const CallButton = ({ 
  text = 'Call Now', 
  phoneNumber = null, 
  className = '', 
  size = 'default',
  showIcon = true,
  variant = 'primary' // 'primary' | 'orange' | 'outline'
}) => {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3',
    large: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'btn-primary',
    orange: 'btn-call',
    outline: 'btn-outline',
  };

  return (
    <a
      href={getCallUrl(phoneNumber)}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Phone size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />}
      {text}
    </a>
  );
};

export default CallButton;
