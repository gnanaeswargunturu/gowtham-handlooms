import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (fetchError) throw fetchError;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, error, refetch: fetchCategories };
}

export function useCategory(slug: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", slug)
          .single();

        if (fetchError) throw fetchError;
        setCategory(data);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  return { category, isLoading, error };
}
