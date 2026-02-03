import { useState, useEffect, useMemo } from 'react';
import useGoogleSheets from './useGoogleSheets';
import localProducts from '../data/products.json';

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
 * Uses Google Sheets if configured, falls back to local JSON data
 */
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local'); // 'local' | 'sheets'

  // Google Sheets data
  const sheetsData = useGoogleSheets(
    GOOGLE_SHEET_CONFIG.sheetId,
    GOOGLE_SHEET_CONFIG.sheetName,
    GOOGLE_SHEET_CONFIG.enabled
  );

  useEffect(() => {
    if (GOOGLE_SHEET_CONFIG.enabled) {
      // Use Google Sheets data
      if (!sheetsData.loading) {
        if (sheetsData.error || sheetsData.data.length === 0) {
          // Fall back to local data on error
          console.log('Falling back to local product data');
          setProducts(localProducts.products);
          setSource('local');
          setError(sheetsData.error);
        } else {
          setProducts(sheetsData.data);
          setSource('sheets');
          setError(null);
        }
        setLoading(false);
      }
    } else {
      // Use local JSON data
      setProducts(localProducts.products);
      setSource('local');
      setLoading(false);
    }
  }, [sheetsData.loading, sheetsData.data, sheetsData.error]);

  // Categories from local data (categories are defined locally)
  const categories = useMemo(() => localProducts.categories, []);

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
    refetch: sheetsData.refetch,
  };
};

export default useProducts;
