import { useState, useEffect, useCallback } from 'react';
import { fetchProductsFromSheet } from '../services/googleSheetsService';

/**
 * Custom hook for fetching data from Google Sheets
 * 
 * @param {string} sheetId - Google Sheet ID
 * @param {string} sheetName - Sheet/tab name
 * @param {boolean} enabled - Whether to fetch data
 */
const useGoogleSheets = (sheetId, sheetName = 'Products', enabled = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!enabled || !sheetId || sheetId === 'YOUR_GOOGLE_SHEET_ID') {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const result = await fetchProductsFromSheet(sheetId, sheetName);

    if (result.success) {
      setData(result.data);
      setError(null);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }, [sheetId, sheetName, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useGoogleSheets;
