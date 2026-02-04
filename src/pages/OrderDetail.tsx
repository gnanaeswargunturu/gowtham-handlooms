import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Package, MapPin, Check, Clock, Truck, XCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useOrder } from "@/hooks/useOrders";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const orderSteps = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: Check },
  { key: "packed", label: "Packed", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Check },
];

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { order, isLoading } = useOrder(orderId || "");

  const isSuccess = searchParams.get("success") === "true";

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "🎉 Order Placed Successfully!",
        description: "Thank you for your order. We'll notify you when it ships.",
      });
    }
  }, [isSuccess]);

  if (!user) {
    navigate("/auth");
    return null;
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

  if (!order) {
    return (
      <CustomerLayout>
        <div className="container flex flex-col items-center justify-center py-16">
          <h2 className="font-serif text-2xl font-bold">Order not found</h2>
          <Button className="mt-4" onClick={() => navigate("/profile")}>
            View All Orders
          </Button>
        </div>
      </CustomerLayout>
    );
  }

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

  const currentStepIndex = orderSteps.findIndex((s) => s.key === order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <CustomerLayout>
      <div className="container max-w-4xl py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Order Placed Successfully!</h3>
                <p className="text-sm text-green-600">
                  Your order {order.order_number} has been placed. We'll notify you when it ships.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold">{order.order_number}</h1>
            <p className="text-muted-foreground">
              Placed on{" "}
              {new Date(order.placed_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <Badge className={cn("text-sm", getStatusColor(order.status))}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        {/* Order Timeline */}
        {!isCancelled && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                {orderSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                          isCompleted
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={cn(
                          "mt-2 text-xs text-center",
                          isCurrent ? "font-medium text-primary" : "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </span>
                      {index < orderSteps.length - 1 && (
                        <div
                          className={cn(
                            "absolute h-0.5 w-full top-5",
                            isCompleted ? "bg-primary" : "bg-muted"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cancelled Banner */}
        {isCancelled && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="flex items-center gap-3 pt-6">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="font-medium text-red-800">Order Cancelled</p>
                {order.cancelled_reason && (
                  <p className="text-sm text-red-600">Reason: {order.cancelled_reason}</p>
                )}
                {order.cancelled_at && (
                  <p className="text-sm text-red-600">
                    Cancelled on{" "}
                    {new Date(order.cancelled_at).toLocaleDateString("en-IN")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Items */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.product_image && (
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ₹{Number(item.price).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-medium">₹{Number(item.total).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{Number(order.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {Number(order.shipping_cost) === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${Number(order.shipping_cost).toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">₹{Number(order.total).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{order.shipping_address.full_name}</p>
              <p className="text-muted-foreground">{order.shipping_address.address_line1}</p>
              {order.shipping_address.address_line2 && (
                <p className="text-muted-foreground">{order.shipping_address.address_line2}</p>
              )}
              <p className="text-muted-foreground">
                {order.shipping_address.city}, {order.shipping_address.state} -{" "}
                {order.shipping_address.pincode}
              </p>
              <p className="mt-2 text-muted-foreground">{order.shipping_address.phone}</p>
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button variant="outline" onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
          {order.status === "pending" && (
            <Button variant="destructive">Cancel Order</Button>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
