import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductGrid from '../components/products/ProductGrid';
import productsData from '../data/products.json';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category'));
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubcategory]);

  useEffect(() => {
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  const filteredProducts = productsData.products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
    return true;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowMobileFilter(false);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowMobileFilter(false);
  };

  const currentCategoryName = selectedCategory 
    ? productsData.categories.find(c => c.id === selectedCategory)?.name 
    : 'All Products';

  return (
    <div className="pb-20 md:pb-0 bg-white min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-brand-teal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/4 h-16 bg-brand-orange rounded-bl-[60px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-16 bg-brand-orange rounded-tr-[60px]"></div>
        
        <div className="container-custom relative">
          <div className="accent-line bg-brand-orange mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-white/80 max-w-2xl text-lg">
            Browse our comprehensive range of industrial fasteners. 
            From standard screws and bolts to custom solutions.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChange={handleSubcategoryChange}
              />
              
              {/* Enquiry CTA */}
              <div className="card p-6 bg-brand-teal/5 border-brand-teal/20">
                <h4 className="font-heading font-bold text-slate-800 mb-2">
                  Can't find what you need?
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  We supply 10,000+ products. Contact us for custom requirements.
                </p>
                <a href="/contact" className="btn-primary w-full justify-center text-sm py-2.5">
                  Contact Us
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-slate-800">
                  {currentCategoryName}
                </h2>
                <p className="text-sm text-slate-500">
                  {filteredProducts.length} products
                </p>
              </div>
              <button
                onClick={() => setShowMobileFilter(true)}
                className="btn-outline py-2 px-4 text-sm"
              >
                <Filter size={16} />
                Filter
              </button>
            </div>

            {/* Active Filters */}
            {(selectedCategory || selectedSubcategory) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1.5 rounded-full text-sm font-medium">
                    {currentCategoryName}
                    <button onClick={() => handleCategoryChange(null)} className="hover:text-brand-orange-dark">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedSubcategory && (
                  <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm">
                    {selectedSubcategory}
                    <button onClick={() => handleSubcategoryChange(null)} className="hover:text-slate-900">
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-800">
                  {currentCategoryName}
                </h2>
                <p className="text-slate-500">
                  Showing {filteredProducts.length} products
                </p>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} loading={loading} />

            {/* Bottom CTA */}
            <div className="mt-16 card p-8 md:p-10 text-center bg-slate-50">
              <h3 className="text-2xl font-heading font-bold text-slate-800 mb-3">
                Need Custom Fasteners?
              </h3>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                We can manufacture or source any type of fastener according to your specifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-primary">
                  Request Custom Quote
                </a>
                <a href="/request-meeting" className="btn-outline">
                  Schedule Technical Discussion
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilter(false)}
          ></div>
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-slate-800">Filter Products</h3>
              <button 
                onClick={() => setShowMobileFilter(false)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChange={handleSubcategoryChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
