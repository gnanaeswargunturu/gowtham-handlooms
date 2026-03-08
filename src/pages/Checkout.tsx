import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { MapPin, Plus, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useAddresses } from "@/hooks/useAddresses";
import { useCreateOrder } from "@/hooks/useOrders";

export default function Checkout() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { addresses, addAddress, isLoading: addressLoading } = useAddresses();
  const { createOrder, isLoading: orderLoading } = useCreateOrder();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find((a) => a.is_default)?.id || addresses[0]?.id || null
  );
  const [notes, setNotes] = useState("");
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Address form state
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    is_default: addresses.length === 0,
  });

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const shippingCost = subtotal >= 5000 ? 0 : 150;
  const total = subtotal + shippingCost;
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await addAddress(addressForm);

    setIsSubmitting(false);
    if (!error) {
      setIsAddressDialogOpen(false);
      // Select the newly added address
      setTimeout(() => {
        const newAddr = addresses[addresses.length - 1];
        if (newAddr) setSelectedAddressId(newAddr.id);
      }, 500);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return;

    const orderItems = items.map((item) => ({
      product_id: item.product_id,
      product_name: item.product.name,
      product_image: item.product.images?.[0]?.image_url,
      quantity: item.quantity,
      price: Number(item.product.price),
    }));

    const { order, error } = await createOrder({
      shippingAddress: {
        full_name: selectedAddress.full_name,
        phone: selectedAddress.phone,
        address_line1: selectedAddress.address_line1,
        address_line2: selectedAddress.address_line2 || undefined,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
      },
      items: orderItems,
      subtotal,
      shippingCost,
      notes: notes || undefined,
    });

    if (order && !error) {
      await clearCart();
      navigate(`/orders/${order.id}?success=true`);
    }
  };

  return (
    <CustomerLayout>
      <div className="container py-8">
        <h1 className="mb-8 font-serif text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Address & Notes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                      <DialogDescription>
                        Enter your delivery address details
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Label</Label>
                          <Input
                            value={addressForm.label}
                            onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                            placeholder="Home, Work, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Full Name *</Label>
                          <Input
                            value={addressForm.full_name}
                            onChange={(e) => setAddressForm({ ...addressForm, full_name: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone *</Label>
                        <Input
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Address Line 1 *</Label>
                        <Input
                          value={addressForm.address_line1}
                          onChange={(e) => setAddressForm({ ...addressForm, address_line1: e.target.value })}
                          placeholder="House/Flat No., Building Name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Address Line 2</Label>
                        <Input
                          value={addressForm.address_line2}
                          onChange={(e) => setAddressForm({ ...addressForm, address_line2: e.target.value })}
                          placeholder="Street, Landmark"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City *</Label>
                          <Input
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State *</Label>
                          <Input
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Pincode *</Label>
                        <Input
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                          required
                        />
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Address"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {addressLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : addresses.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    Please add a delivery address to continue
                  </p>
                ) : (
                  <RadioGroup
                    value={selectedAddressId || ""}
                    onValueChange={setSelectedAddressId}
                    className="space-y-3"
                  >
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                          selectedAddressId === address.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-muted-foreground/50"
                        }`}
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{address.label}</span>
                            {address.is_default && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm">{address.full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.address_line1}
                            {address.address_line2 && `, ${address.address_line2}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Cash on Delivery</span>
                        <Badge variant="secondary" className="text-xs">Available</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pay when your order is delivered
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-not-allowed opacity-60`}
                  >
                    <RadioGroupItem value="upi" id="upi" className="mt-1" disabled />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">UPI Payment</span>
                        <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pay via Google Pay, PhonePe, Paytm, etc.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-not-allowed opacity-60`}
                  >
                    <RadioGroupItem value="bank" id="bank" className="mt-1" disabled />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Bank Transfer</span>
                        <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Direct bank transfer / NEFT / IMPS
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special instructions for your order..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-card p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.product.images?.[0] && (
                        <img
                          src={item.product.images[0].image_url}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-primary">
                        ₹{(Number(item.product.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-4 border-t" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={!selectedAddressId || orderLoading}
              >
                {orderLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                Payment method: Cash on Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
