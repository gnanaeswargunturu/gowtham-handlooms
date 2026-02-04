import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OwnerLayout } from "@/components/layout/OwnerLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface ShopSettings {
  id: string;
  shop_name: string;
  shop_description: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  shipping_policy: string | null;
  return_policy: string | null;
  flat_shipping_rate: number;
  free_shipping_threshold: number | null;
}

export default function OwnerSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    shop_name: "",
    shop_description: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    shipping_policy: "",
    return_policy: "",
    flat_shipping_rate: "150",
    free_shipping_threshold: "5000",
  });

  useEffect(() => {
    fetchSettings();
  }, [user]);

  const fetchSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("shop_settings")
        .select("*")
        .eq("shop_owner_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setSettings(data);
        setForm({
          shop_name: data.shop_name || "",
          shop_description: data.shop_description || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          address: data.address || "",
          shipping_policy: data.shipping_policy || "",
          return_policy: data.return_policy || "",
          flat_shipping_rate: String(data.flat_shipping_rate || 150),
          free_shipping_threshold: String(data.free_shipping_threshold || 5000),
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);

    try {
      const settingsData = {
        shop_owner_id: user.id,
        shop_name: form.shop_name,
        shop_description: form.shop_description || null,
        phone: form.phone || null,
        whatsapp: form.whatsapp || null,
        email: form.email || null,
        address: form.address || null,
        shipping_policy: form.shipping_policy || null,
        return_policy: form.return_policy || null,
        flat_shipping_rate: parseFloat(form.flat_shipping_rate) || 150,
        free_shipping_threshold: parseFloat(form.free_shipping_threshold) || null,
      };

      if (settings) {
        const { error } = await supabase
          .from("shop_settings")
          .update(settingsData)
          .eq("id", settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("shop_settings")
          .insert(settingsData);

        if (error) throw error;
      }

      toast({ title: "Settings saved successfully" });
      fetchSettings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <OwnerLayout>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </OwnerLayout>
    );
  }

  return (
    <OwnerLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-serif text-3xl font-bold">Shop Settings</h1>
          <p className="text-muted-foreground">Configure your shop details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your shop's public details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Shop Name *</Label>
                <Input
                  value={form.shop_name}
                  onChange={(e) => setForm({ ...form, shop_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Shop Description</Label>
                <Textarea
                  value={form.shop_description}
                  onChange={(e) => setForm({ ...form, shop_description: e.target.value })}
                  rows={3}
                  placeholder="Tell your story..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How customers can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="shop@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  rows={2}
                  placeholder="Shop address..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>Configure shipping costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Flat Shipping Rate (₹)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.flat_shipping_rate}
                    onChange={(e) => setForm({ ...form, flat_shipping_rate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Free Shipping Above (₹)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.free_shipping_threshold}
                    onChange={(e) => setForm({ ...form, free_shipping_threshold: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Shipping Policy</Label>
                <Textarea
                  value={form.shipping_policy}
                  onChange={(e) => setForm({ ...form, shipping_policy: e.target.value })}
                  rows={3}
                  placeholder="Describe your shipping terms..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Returns */}
          <Card>
            <CardHeader>
              <CardTitle>Return Policy</CardTitle>
              <CardDescription>Your return and exchange terms</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={form.return_policy}
                onChange={(e) => setForm({ ...form, return_policy: e.target.value })}
                rows={4}
                placeholder="Describe your return policy..."
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </form>
      </div>
    </OwnerLayout>
  );
}
