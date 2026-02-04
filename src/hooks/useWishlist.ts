import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price: number | null;
    stock_quantity: number;
    images: { image_url: string }[];
  };
}

export function useWishlist() {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select(`
          id,
          product_id,
          product:products (
            id,
            name,
            slug,
            price,
            compare_at_price,
            stock_quantity,
            images:product_images (image_url)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems((data as unknown as WishlistItem[]) || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product_id === productId);
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to wishlist",
        variant: "destructive",
      });
      return false;
    }

    try {
      const existingItem = items.find((item) => item.product_id === productId);

      if (existingItem) {
        // Remove from wishlist
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("id", existingItem.id);

        if (error) throw error;
        toast({
          title: "Removed from wishlist",
          description: "Item removed from your wishlist",
        });
      } else {
        // Add to wishlist
        const { error } = await supabase.from("wishlist").insert({
          user_id: user.id,
          product_id: productId,
        });

        if (error) throw error;
        toast({
          title: "Added to wishlist",
          description: "Item added to your wishlist",
        });
      }

      await fetchWishlist();
      return true;
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      await fetchWishlist();
      toast({
        title: "Removed",
        description: "Item removed from wishlist",
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  return {
    items,
    isLoading,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    refetch: fetchWishlist,
  };
}
