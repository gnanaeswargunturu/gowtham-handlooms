import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  user_id: string;
  product_id: string;
  order_id: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified: boolean;
  created_at: string;
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export function useReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, profile:profiles!reviews_user_id_fkey(full_name, avatar_url)")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) {
        // If foreign key doesn't exist, fetch without join
        const { data: reviewsOnly, error: err2 } = await supabase
          .from("reviews")
          .select("*")
          .eq("product_id", productId)
          .order("created_at", { ascending: false });
        
        if (err2) throw err2;
        setReviews((reviewsOnly as unknown as Review[]) || []);
        const avg = reviewsOnly?.length
          ? reviewsOnly.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewsOnly.length
          : 0;
        setAverageRating(avg);
      } else {
        setReviews((data as unknown as Review[]) || []);
        const avg = data?.length
          ? data.reduce((sum, r) => sum + r.rating, 0) / data.length
          : 0;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, isLoading, averageRating, refetch: fetchReviews };
}

export function useCreateReview() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const createReview = async (params: {
    product_id: string;
    order_id?: string;
    rating: number;
    title?: string;
    comment?: string;
  }) => {
    if (!user) {
      toast({ title: "Please login", description: "You need to login to leave a review", variant: "destructive" });
      return { error: new Error("Not authenticated") };
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        product_id: params.product_id,
        order_id: params.order_id || null,
        rating: params.rating,
        title: params.title || null,
        comment: params.comment || null,
        is_verified: !!params.order_id,
      } as any);

      if (error) throw error;
      toast({ title: "Review submitted!", description: "Thank you for your feedback" });
      return { error: null };
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to submit review", variant: "destructive" });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  return { createReview, isLoading };
}
