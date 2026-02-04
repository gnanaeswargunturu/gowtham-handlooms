import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export function useAddresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddresses = useCallback(async () => {
    if (!user) {
      setAddresses([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = async (address: Omit<Address, "id" | "user_id">) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      // If this is the first address or marked as default, update others
      if (address.is_default && addresses.length > 0) {
        await supabase
          .from("addresses")
          .update({ is_default: false })
          .eq("user_id", user.id);
      }

      const { error } = await supabase.from("addresses").insert({
        ...address,
        user_id: user.id,
        is_default: addresses.length === 0 ? true : address.is_default,
      });

      if (error) throw error;
      await fetchAddresses();
      toast({
        title: "Address added",
        description: "Your address has been saved",
      });
      return { error: null };
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const updateAddress = async (id: string, address: Partial<Address>) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      // If marked as default, update others
      if (address.is_default) {
        await supabase
          .from("addresses")
          .update({ is_default: false })
          .eq("user_id", user.id)
          .neq("id", id);
      }

      const { error } = await supabase
        .from("addresses")
        .update(address)
        .eq("id", id);

      if (error) throw error;
      await fetchAddresses();
      toast({
        title: "Address updated",
        description: "Your address has been updated",
      });
      return { error: null };
    } catch (error) {
      console.error("Error updating address:", error);
      toast({
        title: "Error",
        description: "Failed to update address",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      const { error } = await supabase.from("addresses").delete().eq("id", id);

      if (error) throw error;
      await fetchAddresses();
      toast({
        title: "Address deleted",
        description: "Your address has been removed",
      });
    } catch (error) {
      console.error("Error deleting address:", error);
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive",
      });
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) return;

    try {
      // Unset all defaults
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);

      // Set new default
      await supabase
        .from("addresses")
        .update({ is_default: true })
        .eq("id", id);

      await fetchAddresses();
      toast({
        title: "Default address updated",
        description: "Your default address has been changed",
      });
    } catch (error) {
      console.error("Error setting default:", error);
    }
  };

  const defaultAddress = addresses.find((a) => a.is_default) || addresses[0];

  return {
    addresses,
    defaultAddress,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    refetch: fetchAddresses,
  };
}
