import { Package } from 'lucide-react';

const categoryIcons = {
  screws: '🔩',
  bolts: '⚙️',
  nuts: '🔧',
  custom: '⚡',
  washers: '⭕',
  rivets: '📍',
  anchors: '⚓',
  studs: '📌',
};

const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  categories = []
}) => {
  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-heading font-bold text-slate-800 mb-4">
        Categories
      </h3>

      {/* Main Categories */}
      <div className="space-y-2 mb-6">
        <button
          onClick={() => {
            onCategoryChange(null);
            onSubcategoryChange(null);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            !selectedCategory 
              ? 'bg-brand-teal text-white' 
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Package size={18} />
          <span className="font-medium">All Products</span>
        </button>

        {categories.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id);
                onSubcategoryChange(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-brand-teal text-white' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{categoryIcons[category.id] || '⚙️'}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Subcategories */}
      {currentCategory && (
        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
            {currentCategory.name} Types
          </h4>
          <div className="space-y-1">
            {currentCategory.subcategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => onSubcategoryChange(sub === selectedSubcategory ? null : sub)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                  selectedSubcategory === sub
                    ? 'bg-brand-orange/10 text-brand-orange font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
