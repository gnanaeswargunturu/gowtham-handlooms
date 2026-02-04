import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Package, Heart, LogOut, Plus, Pencil, Trash2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses } from "@/hooks/useAddresses";
import { useOrders } from "@/hooks/useOrders";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, updateProfile, signOut, isLoading: authLoading } = useAuth();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, isLoading: addressLoading } = useAddresses();
  const { orders, isLoading: ordersLoading } = useOrders();
  const { items: wishlistItems, isLoading: wishlistLoading } = useWishlist();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address form state
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    is_default: false,
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await updateProfile({
      full_name: fullName.trim(),
      email: email.trim() || null,
    });

    setIsSubmitting(false);
    if (!error) {
      setIsEditingProfile(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingAddress) {
      await updateAddress(editingAddress.id, addressForm);
    } else {
      await addAddress(addressForm);
    }

    setIsSubmitting(false);
    setIsAddressDialogOpen(false);
    setEditingAddress(null);
    setAddressForm({
      label: "Home",
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      is_default: false,
    });
  };

  const openEditAddress = (address: any) => {
    setEditingAddress(address);
    setAddressForm({
      label: address.label,
      full_name: address.full_name,
      phone: address.phone,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      is_default: address.is_default,
    });
    setIsAddressDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "packed": return "bg-purple-100 text-purple-800";
      case "shipped": return "bg-indigo-100 text-indigo-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <CustomerLayout>
      <div className="container max-w-4xl py-8">
        <h1 className="mb-8 font-serif text-3xl font-bold">My Account</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Full Name</Label>
                      <p className="text-lg">{profile?.full_name || "Not set"}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Phone</Label>
                      <p className="text-lg">{profile?.phone || user?.phone || "Not set"}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <p className="text-lg">{profile?.email || "Not set"}</p>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFullName(profile?.full_name || "");
                          setEmail(profile?.email || "");
                          setIsEditingProfile(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                      <Button variant="destructive" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your delivery addresses</CardDescription>
                </div>
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingAddress(null);
                        setAddressForm({
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
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
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
                          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editingAddress ? "Update" : "Save"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {addressLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : addresses.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No addresses saved yet. Add one to make checkout faster!
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="relative rounded-lg border p-4"
                      >
                        {address.is_default && (
                          <Badge className="absolute right-2 top-2">Default</Badge>
                        )}
                        <p className="font-medium">{address.label}</p>
                        <p className="text-sm">{address.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.address_line1}
                          {address.address_line2 && `, ${address.address_line2}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground">{address.phone}</p>
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditAddress(address)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          {!address.is_default && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteAddress(address.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No orders yet</p>
                    <Button className="mt-4" onClick={() => navigate("/shop")}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => navigate(`/orders/${order.id}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{order.order_number}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.placed_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <p className="mt-1 font-medium">₹{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Your wishlist is empty</p>
                    <Button className="mt-4" onClick={() => navigate("/shop")}>
                      Explore Sarees
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-lg border p-3 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => navigate(`/product/${item.product.slug}`)}
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          {item.product.images?.[0] && (
                            <img
                              src={item.product.images[0].image_url}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-primary font-semibold">
                            ₹{Number(item.product.price).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
}
