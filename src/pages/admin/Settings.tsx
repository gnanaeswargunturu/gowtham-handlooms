import { useState, useEffect } from "react";
import { Loader2, QrCode, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminSettings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [shopName, setShopName] = useState("Gowtham Handlooms");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [flatShippingRate, setFlatShippingRate] = useState("150");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("5000");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("shop_settings")
        .select("*")
        .limit(1)
        .single();

      if (data) {
        setSettingsId(data.id);
        setQrCodeUrl((data as any).payment_qr_url || "");
        setShopName(data.shop_name || "Gowtham Handlooms");
        setPhone(data.phone || "");
        setWhatsapp(data.whatsapp || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setFlatShippingRate(String(data.flat_shipping_rate || 150));
        setFreeShippingThreshold(String(data.free_shipping_threshold || 5000));
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const settingsData = {
        shop_name: shopName,
        phone,
        whatsapp,
        email,
        address,
        flat_shipping_rate: parseFloat(flatShippingRate) || 0,
        free_shipping_threshold: parseFloat(freeShippingThreshold) || null,
        payment_qr_url: qrCodeUrl || null,
      };

      if (settingsId) {
        const { error } = await supabase
          .from("shop_settings")
          .update(settingsData as any)
          .eq("id", settingsId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("shop_settings")
          .insert({ ...settingsData, shop_owner_id: user.id } as any);
        if (error) throw error;
      }

      toast({ title: "Settings saved", description: "Your settings have been updated successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <AdminLayout><div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-serif text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage shop settings, payment QR code, and more</p>
        </div>

        {/* Payment QR Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5" /> Payment QR Code</CardTitle>
            <CardDescription>Upload or enter the URL of your payment QR code image. This will be shown to customers at checkout.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>QR Code Image URL</Label>
              <Input
                value={qrCodeUrl}
                onChange={(e) => setQrCodeUrl(e.target.value)}
                placeholder="https://example.com/your-qr-code.png"
              />
              <p className="text-xs text-muted-foreground">Enter a direct URL to your UPI/payment QR code image</p>
            </div>
            {qrCodeUrl && (
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <img
                  src={qrCodeUrl}
                  alt="Payment QR Code"
                  className="max-w-[200px] rounded-lg border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shop Info */}
        <Card>
          <CardHeader>
            <CardTitle>Shop Information</CardTitle>
            <CardDescription>Update your shop details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Shop Name</Label>
              <Input value={shopName} onChange={(e) => setShopName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Shipping */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Flat Shipping Rate (₹)</Label>
                <Input type="number" value={flatShippingRate} onChange={(e) => setFlatShippingRate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Free Shipping Above (₹)</Label>
                <Input type="number" value={freeShippingThreshold} onChange={(e) => setFreeShippingThreshold(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save All Settings
        </Button>
      </div>
    </AdminLayout>
  );
}
