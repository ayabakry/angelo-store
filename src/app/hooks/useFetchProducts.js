"use client";

import { useState, useEffect, useCallback } from 'react';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
};

export default useFetchProducts;

