// Product Storage Utility
// =======================
// Manages custom products added via admin panel
// Works alongside the static products.json file

const PRODUCTS_KEY = 'apex_custom_products';
const CATEGORIES_KEY = 'apex_custom_categories';

// ============ PRODUCTS ============

// Get all custom products
export const getCustomProducts = () => {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading custom products:', error);
    return [];
  }
};

// Add new product
export const addProduct = (product) => {
  try {
    const products = getCustomProducts();
    const newProduct = {
      id: 'custom_' + Date.now(),
      createdAt: new Date().toISOString(),
      ...product,
    };
    
    products.unshift(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    
    // Auto-create category if it doesn't exist
    if (product.category) {
      ensureCategoryExists(product.category, product.subcategory);
    }
    
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Update product
export const updateProduct = (id, updates) => {
  try {
    const products = getCustomProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
      products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return products[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

// Delete product
export const deleteProduct = (id) => {
  try {
    const products = getCustomProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// ============ CATEGORIES ============

// Get all custom categories
export const getCustomCategories = () => {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading custom categories:', error);
    return [];
  }
};

// Ensure a category exists (auto-create if not)
export const ensureCategoryExists = (categoryId, subcategory = null) => {
  try {
    const categories = getCustomCategories();
    const existingIndex = categories.findIndex(c => c.id === categoryId);
    
    if (existingIndex === -1) {
      // Create new category
      const newCategory = {
        id: categoryId,
        name: formatCategoryName(categoryId),
        description: `Products in ${formatCategoryName(categoryId)} category`,
        subcategories: subcategory ? [subcategory] : [],
        isCustom: true,
        createdAt: new Date().toISOString(),
      };
      categories.push(newCategory);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
      return newCategory;
    } else {
      // Add subcategory if it doesn't exist
      if (subcategory && !categories[existingIndex].subcategories.includes(subcategory)) {
        categories[existingIndex].subcategories.push(subcategory);
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
      }
      return categories[existingIndex];
    }
  } catch (error) {
    console.error('Error managing category:', error);
    return null;
  }
};

// Add new category manually
export const addCategory = (category) => {
  try {
    const categories = getCustomCategories();
    const exists = categories.some(c => c.id === category.id);
    
    if (!exists) {
      const newCategory = {
        id: category.id || category.name.toLowerCase().replace(/\s+/g, '-'),
        name: category.name,
        description: category.description || `Products in ${category.name} category`,
        subcategories: category.subcategories || [],
        isCustom: true,
        createdAt: new Date().toISOString(),
      };
      categories.push(newCategory);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
      return newCategory;
    }
    return null;
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
};

// Delete category
export const deleteCategory = (id) => {
  try {
    const categories = getCustomCategories();
    const filtered = categories.filter(c => c.id !== id);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

// ============ HELPERS ============

// Format category ID to readable name
const formatCategoryName = (id) => {
  return id
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Get all products (static + custom)
export const getAllProducts = (staticProducts = []) => {
  const customProducts = getCustomProducts();
  return [...customProducts, ...staticProducts];
};

// Get all categories (static + custom)
export const getAllCategories = (staticCategories = []) => {
  const customCategories = getCustomCategories();
  
  // Merge: custom categories + static categories (avoid duplicates)
  const merged = [...customCategories];
  
  staticCategories.forEach(staticCat => {
    const exists = merged.some(c => c.id === staticCat.id);
    if (!exists) {
      merged.push(staticCat);
    } else {
      // Merge subcategories
      const existingIndex = merged.findIndex(c => c.id === staticCat.id);
      const existingSubs = merged[existingIndex].subcategories || [];
      const staticSubs = staticCat.subcategories || [];
      merged[existingIndex].subcategories = [...new Set([...existingSubs, ...staticSubs])];
    }
  });
  
  return merged;
};

// Get product stats
export const getProductStats = () => {
  const products = getCustomProducts();
  const categories = getCustomCategories();
  
  return {
    totalCustomProducts: products.length,
    totalCustomCategories: categories.length,
    productsByCategory: products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {}),
  };
};

// Clear all custom data (use with caution)
export const clearAllCustomData = () => {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(CATEGORIES_KEY);
};

export default {
  getCustomProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCustomCategories,
  addCategory,
  deleteCategory,
  getAllProducts,
  getAllCategories,
  getProductStats,
  clearAllCustomData,
};
