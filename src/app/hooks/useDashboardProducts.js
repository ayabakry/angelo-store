"use client";

import { useState, useEffect, useCallback } from 'react';

export const useDashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setPageLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, pageLoading, refetch: fetchProducts };
};

export default useDashboardProducts;

