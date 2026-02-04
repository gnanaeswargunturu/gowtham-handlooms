import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  fabric_type: string | null;
  occasion: string | null;
  color: string | null;
  length_meters: number | null;
  has_blouse_piece: boolean;
  blouse_length_meters: number | null;
  wash_care: string | null;
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  stock_quantity: number;
  low_stock_threshold: number;
  is_featured: boolean;
  is_active: boolean;
  category_id: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  images: {
    id: string;
    image_url: string;
    alt_text: string | null;
    sort_order: number;
  }[];
}

interface UseProductsOptions {
  categorySlug?: string;
  featured?: boolean;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "name";
  limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("products")
        .select(`
          *,
          category:categories (id, name, slug),
          images:product_images (id, image_url, alt_text, sort_order)
        `)
        .eq("is_active", true);

      if (options.categorySlug) {
        query = query.eq("category.slug", options.categorySlug);
      }

      if (options.featured) {
        query = query.eq("is_featured", true);
      }

      if (options.search) {
        query = query.or(
          `name.ilike.%${options.search}%,description.ilike.%${options.search}%`
        );
      }

      // Sorting
      switch (options.sortBy) {
        case "price_asc":
          query = query.order("price", { ascending: true });
          break;
        case "price_desc":
          query = query.order("price", { ascending: false });
          break;
        case "name":
          query = query.order("name", { ascending: true });
          break;
        case "newest":
        default:
          query = query.order("created_at", { ascending: false });
          break;
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProducts((data as unknown as Product[]) || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [options.categorySlug, options.featured, options.search, options.sortBy, options.limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("products")
          .select(`
            *,
            category:categories (id, name, slug),
            images:product_images (id, image_url, alt_text, sort_order)
          `)
          .eq("slug", slug)
          .single();

        if (fetchError) throw fetchError;
        setProduct(data as unknown as Product);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, isLoading, error };
}
