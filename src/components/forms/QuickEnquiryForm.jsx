import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { submitForm } from '../../services/formSubmission';
import { trackFormSubmission } from '../../utils/analytics';

const QuickEnquiryForm = ({ className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Submit to email/sheets
    await submitForm(data, 'quick_enquiry');
    
    // Track in analytics
    trackFormSubmission('quick_enquiry', { company: data.company });
    
    console.log('Quick form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <div className={`card p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-heading font-bold text-slate-800 mb-2">Thank You!</h3>
        <p className="text-slate-600">We'll contact you within 24 hours with your quote.</p>
      </div>
    );
  }

  return (
    <div className={`card p-6 md:p-8 ${className}`}>
      {/* Header with Teal accent bar like visiting card */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1 h-12 bg-brand-teal rounded-full"></div>
        <div>
          <h3 className="text-xl font-heading font-bold text-slate-800">
            Get Instant Quote
          </h3>
          <p className="text-slate-500 text-sm">Free consultation</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              {...register('name', { required: true })}
              className={`input-field ${errors.name ? 'border-red-400' : ''}`}
              placeholder="Your Name *"
            />
          </div>
          <div>
            <input
              type="text"
              {...register('company', { required: true })}
              className={`input-field ${errors.company ? 'border-red-400' : ''}`}
              placeholder="Company *"
            />
          </div>
        </div>

        <input
          type="tel"
          {...register('mobile', { 
            required: true,
            pattern: /^[6-9]\d{9}$/
          })}
          className={`input-field ${errors.mobile ? 'border-red-400' : ''}`}
          placeholder="Mobile Number *"
        />

        <textarea
          {...register('requirement', { required: true })}
          rows={3}
          className={`input-field resize-none ${errors.requirement ? 'border-red-400' : ''}`}
          placeholder="Your Requirement *"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Get Quote
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-500">
          We respond within 24 hours
        </p>
      </form>
    </div>
  );
};

export default QuickEnquiryForm;
