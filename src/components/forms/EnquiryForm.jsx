import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { submitForm } from '../../services/formSubmission';
import { trackFormSubmission } from '../../utils/analytics';

const EnquiryForm = ({ 
  title = 'Send Us Your Enquiry', 
  subtitle = '',
  showTitle = true,
  compact = false,
  className = '',
  onSubmit: externalOnSubmit = null 
}) => {
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
    await submitForm(data, 'enquiry');
    
    // Track in analytics
    trackFormSubmission('enquiry', { company: data.company });
    
    if (externalOnSubmit) {
      await externalOnSubmit(data);
    }
    
    console.log('Form submitted:', data);
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
        <h3 className="text-xl font-heading font-semibold text-slate-800 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600">
          We have received your enquiry. Our team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className={`card ${compact ? 'p-4 md:p-6' : 'p-6 md:p-8'} ${className}`}>
      {showTitle && (
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-12 bg-brand-teal rounded-full"></div>
          <div>
            <h3 className={`font-heading font-bold text-slate-800 ${compact ? 'text-lg' : 'text-xl'}`}>
              {title}
            </h3>
            {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className={compact ? '' : 'grid md:grid-cols-2 gap-4'}>
          <div>
            <label className="label">Name *</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`input-field ${errors.name ? 'border-red-400' : ''}`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label">Company Name *</label>
            <input
              type="text"
              {...register('company', { required: 'Company name is required' })}
              className={`input-field ${errors.company ? 'border-red-400' : ''}`}
              placeholder="Your Company"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Mobile Number *</label>
          <input
            type="tel"
            {...register('mobile', { 
              required: 'Mobile number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
            className={`input-field ${errors.mobile ? 'border-red-400' : ''}`}
            placeholder="10-digit mobile number"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
        </div>

        {!compact && (
          <div>
            <label className="label">Email (Optional)</label>
            <input
              type="email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              className={`input-field ${errors.email ? 'border-red-400' : ''}`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        )}

        <div>
          <label className="label">Your Requirement *</label>
          <textarea
            {...register('requirement', { required: 'Please describe your requirement' })}
            rows={compact ? 3 : 4}
            className={`input-field resize-none ${errors.requirement ? 'border-red-400' : ''}`}
            placeholder="Describe the products you need, quantity, specifications..."
          />
          {errors.requirement && (
            <p className="text-red-500 text-sm mt-1">{errors.requirement.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit Enquiry
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          We respond within 24 hours
        </p>
      </form>
    </div>
  );
};

export default EnquiryForm;
