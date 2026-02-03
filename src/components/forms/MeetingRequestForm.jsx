import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, CheckCircle, Loader2 } from 'lucide-react';
import { submitForm } from '../../services/formSubmission';
import { trackFormSubmission } from '../../utils/analytics';

const MeetingRequestForm = ({ className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Submit to email/sheets
    await submitForm(data, 'meeting_request');
    
    // Track in analytics
    trackFormSubmission('meeting_request', { meetingType: data.meetingType });
    
    console.log('Meeting request submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <div className={`card p-10 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-heading font-semibold text-slate-800 mb-2">
          Meeting Request Received!
        </h3>
        <p className="text-slate-600">
          Our sales team will call you to confirm the meeting.
        </p>
      </div>
    );
  }

  return (
    <div className={`card p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center">
          <Calendar className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-slate-800">
            Schedule Your Meeting
          </h3>
          <p className="text-slate-500 text-sm">Factory visit, bulk order, or vendor onboarding</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label">Name *</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`input-field ${errors.name ? 'border-red-400' : ''}`}
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Company Name *</label>
            <input
              type="text"
              {...register('company', { required: 'Company name is required' })}
              className={`input-field ${errors.company ? 'border-red-400' : ''}`}
              placeholder="Your Company"
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label">Mobile Number *</label>
            <input
              type="tel"
              {...register('mobile', { 
                required: 'Mobile number is required',
                pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit number' }
              })}
              className={`input-field ${errors.mobile ? 'border-red-400' : ''}`}
              placeholder="10-digit mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="label">Preferred Date *</label>
            <input
              type="date"
              min={minDate}
              {...register('preferredDate', { required: 'Select a date' })}
              className={`input-field ${errors.preferredDate ? 'border-red-400' : ''}`}
            />
            {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Meeting Purpose *</label>
          <select
            {...register('meetingType', { required: 'Select purpose' })}
            className={`input-field ${errors.meetingType ? 'border-red-400' : ''}`}
          >
            <option value="">Select purpose...</option>
            <option value="factory-visit">Factory Visit</option>
            <option value="bulk-order">Bulk Order Discussion</option>
            <option value="vendor-onboarding">Vendor Onboarding</option>
            <option value="product-demo">Product Demo</option>
            <option value="other">Other</option>
          </select>
          {errors.meetingType && <p className="text-red-500 text-sm mt-1">{errors.meetingType.message}</p>}
        </div>

        <div>
          <label className="label">Additional Message (Optional)</label>
          <textarea
            {...register('message')}
            rows={4}
            className="input-field resize-none"
            placeholder="Any specific requirements..."
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-70">
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={20} /> Submitting...</>
          ) : (
            <><Calendar size={20} /> Request Meeting</>
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          We'll confirm the meeting within 24 hours
        </p>
      </form>
    </div>
  );
};

export default MeetingRequestForm;
