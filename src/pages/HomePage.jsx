import HeroSection from '../components/home/HeroSection';
import TrustBadges from '../components/home/TrustBadges';
import ProductCategories from '../components/home/ProductCategories';
import WhyChooseUs from '../components/home/WhyChooseUs';
import EnquiryForm from '../components/forms/EnquiryForm';

const HomePage = () => {
  return (
    <div className="pb-20 md:pb-0 bg-white">
      <HeroSection />
      <TrustBadges />
      <ProductCategories />
      <WhyChooseUs />
      
      {/* Mobile Enquiry Form Section */}
      <section className="section bg-slate-50 lg:hidden">
        <div className="container-custom">
          <EnquiryForm 
            title="Get Your Quote Now"
            subtitle="Fill the form and we'll get back to you within 24 hours"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
