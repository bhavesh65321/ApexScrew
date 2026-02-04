import { useState, useEffect, useMemo, useCallback } from 'react';
import useGoogleSheets from './useGoogleSheets';
import localProducts from '../data/products.json';
import { getAllProducts, getAllCategories, getCustomProducts } from '../utils/productStorage';

/**
 * Configuration for Google Sheets integration
 * Replace these values with your actual Google Sheet details
 */
const GOOGLE_SHEET_CONFIG = {
  enabled: false, // Set to true when you have a Google Sheet ready
  sheetId: 'YOUR_GOOGLE_SHEET_ID', // Replace with your sheet ID
  sheetName: 'Products',
};

/**
 * Custom hook for managing products
 * Combines: Custom products (localStorage) + Static products (JSON) + Google Sheets (if enabled)
 */
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local'); // 'local' | 'sheets' | 'mixed'
  const [refreshKey, setRefreshKey] = useState(0);

  // Google Sheets data
  const sheetsData = useGoogleSheets(
    GOOGLE_SHEET_CONFIG.sheetId,
    GOOGLE_SHEET_CONFIG.sheetName,
    GOOGLE_SHEET_CONFIG.enabled
  );

  // Load products from all sources
  const loadProducts = useCallback(() => {
    const customProducts = getCustomProducts();
    
    if (GOOGLE_SHEET_CONFIG.enabled && !sheetsData.loading) {
      if (sheetsData.error || sheetsData.data.length === 0) {
        // Combine custom + local products
        const allProducts = getAllProducts(localProducts.products);
        setProducts(allProducts);
        setSource(customProducts.length > 0 ? 'mixed' : 'local');
        setError(sheetsData.error);
      } else {
        // Combine custom + sheets products
        const allProducts = getAllProducts(sheetsData.data);
        setProducts(allProducts);
        setSource(customProducts.length > 0 ? 'mixed' : 'sheets');
        setError(null);
      }
    } else if (!GOOGLE_SHEET_CONFIG.enabled) {
      // Combine custom + local JSON products
      const allProducts = getAllProducts(localProducts.products);
      setProducts(allProducts);
      setSource(customProducts.length > 0 ? 'mixed' : 'local');
    }
    
    setLoading(false);
  }, [sheetsData.loading, sheetsData.data, sheetsData.error]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, refreshKey]);

  // Refresh products (call after adding/updating)
  const refreshProducts = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  // Categories from local + custom data
  const categories = useMemo(() => {
    return getAllCategories(localProducts.categories);
  }, [refreshKey]);

  // Filter products by category
  const getProductsByCategory = (categoryId) => {
    if (!categoryId) return products;
    return products.filter(p => p.category === categoryId);
  };

  // Filter products by subcategory
  const getProductsBySubcategory = (subcategory) => {
    if (!subcategory) return products;
    return products.filter(p => p.subcategory === subcategory);
  };

  // Search products
  const searchProducts = (query) => {
    if (!query) return products;
    const lowercaseQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description?.toLowerCase().includes(lowercaseQuery) ||
      p.material?.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    products,
    categories,
    loading,
    error,
    source,
    getProductsByCategory,
    getProductsBySubcategory,
    searchProducts,
    refreshProducts,
    refetch: sheetsData.refetch,
  };
};

export default useProducts;
