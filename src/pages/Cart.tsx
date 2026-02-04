import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, isLoading, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();

  if (!user) {
    return (
      <CustomerLayout>
        <div className="container flex flex-col items-center justify-center py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Please login to view your cart</p>
          <Button className="mt-6" onClick={() => navigate("/auth")}>
            Login to Continue
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="container flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </CustomerLayout>
    );
  }

  if (items.length === 0) {
    return (
      <CustomerLayout>
        <div className="container flex flex-col items-center justify-center py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add some beautiful sarees to your cart!</p>
          <Button className="mt-6" onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  const shippingCost = subtotal >= 5000 ? 0 : 150;
  const total = subtotal + shippingCost;

  return (
    <CustomerLayout>
      <div className="container py-8">
        <h1 className="mb-8 font-serif text-3xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border bg-card p-4"
              >
                <Link
                  to={`/product/${item.product.slug}`}
                  className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                >
                  {item.product.images?.[0] && (
                    <img
                      src={item.product.images[0].image_url}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock_quantity}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        ₹{(Number(item.product.price) * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          ₹{Number(item.product.price).toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-card p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} item{itemCount > 1 ? "s" : ""})
                  </span>
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
                {shippingCost > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders above ₹5,000
                  </p>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
