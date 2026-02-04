import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, Search } from 'lucide-react';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductGrid from '../components/products/ProductGrid';
import useProducts from '../hooks/useProducts';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category'));
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  // Get products from hook (includes static + custom products)
  const { products: allProducts, categories, loading: productsLoading } = useProducts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(productsLoading), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubcategory, searchQuery, productsLoading]);

  // Sync URL with filters
  useEffect(() => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  }, [selectedCategory, searchQuery, setSearchParams]);

  // Update search when URL changes (from header search)
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch && urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
      // Clear category when searching
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  }, [searchParams]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.subcategory?.toLowerCase().includes(query) ||
          product.material?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      
      if (selectedCategory && product.category !== selectedCategory) return false;
      if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
      return true;
    });
  }, [allProducts, searchQuery, selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when changing category
    setShowMobileFilter(false);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowMobileFilter(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already reactive via state
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const currentCategoryName = searchQuery 
    ? `Search: "${searchQuery}"`
    : selectedCategory 
      ? categories.find(c => c.id === selectedCategory)?.name 
      : 'All Products';

  return (
    <div className="pb-20 md:pb-0 bg-white min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-brand-teal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/4 h-16 bg-brand-orange rounded-bl-[60px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-16 bg-brand-orange rounded-tr-[60px]"></div>
        
        <div className="container-custom relative">
          <div className="accent-line bg-brand-orange mb-4"></div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            {searchQuery ? `Search Results` : 'Our Products'}
          </h1>
          <p className="text-white/80 max-w-2xl text-lg mb-6">
            {searchQuery 
              ? `Found ${filteredProducts.length} products for "${searchQuery}"`
              : 'Browse our comprehensive range of industrial fasteners. From standard screws and bolts to custom solutions.'
            }
          </p>
          
          {/* Search Bar in Header */}
          <form onSubmit={handleSearch} className="max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products... (e.g., hex bolt, stainless steel, M10)"
                className="w-full pl-5 pr-24 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-slate-800 placeholder-slate-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-orange/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              )}
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-orange text-white rounded-lg flex items-center justify-center hover:bg-brand-orange-dark transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
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
                categories={categories}
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
            {(selectedCategory || selectedSubcategory || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal px-4 py-1.5 rounded-full text-sm font-medium">
                    <Search size={14} />
                    "{searchQuery}"
                    <button onClick={clearSearch} className="hover:text-brand-teal-dark">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1.5 rounded-full text-sm font-medium">
                    {productsData.categories.find(c => c.id === selectedCategory)?.name}
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
                categories={categories}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
