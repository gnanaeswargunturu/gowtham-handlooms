import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, ShoppingCart, Package, TrendingUp, Loader2, QrCode, Star, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalReviews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0, pendingOrders: 0, totalReviews: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        { count: userCount },
        { count: productCount },
        { data: orders },
        { data: recent },
        { count: reviewCount },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("id, status, total"),
        supabase.from("orders").select("id, order_number, status, total, placed_at").order("placed_at", { ascending: false }).limit(10),
        supabase.from("reviews").select("*", { count: "exact", head: true }),
      ]);

      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + Number(o.total), 0) || 0;
      const pendingOrders = orders?.filter((o) => o.status === "pending").length || 0;

      setRecentOrders(recent || []);
      setStats({
        totalUsers: userCount || 0,
        totalProducts: productCount || 0,
        totalOrders,
        totalRevenue,
        pendingOrders,
        totalReviews: reviewCount || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      packed: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/admin/products"><Package className="mr-2 h-4 w-4" />Manage Products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { label: "Total Users", value: stats.totalUsers, icon: Users, sub: "Registered" },
            { label: "Products", value: stats.totalProducts, icon: Package, sub: "In catalog" },
            { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, sub: "All time" },
            { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, sub: "All time" },
            { label: "Pending", value: stats.pendingOrders, icon: ShoppingCart, sub: "Need attention" },
            { label: "Reviews", value: stats.totalReviews, icon: Star, sub: "Customer reviews" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-4">
          <Link to="/admin/products" className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <Package className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium">Products</h3>
            <p className="text-sm text-muted-foreground">Add, edit, delete sarees</p>
          </Link>
          <Link to="/admin/orders" className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <ShoppingCart className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium">Orders</h3>
            <p className="text-sm text-muted-foreground">Manage all orders</p>
          </Link>
          <Link to="/admin/users" className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <Users className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium">Users</h3>
            <p className="text-sm text-muted-foreground">Manage roles & users</p>
          </Link>
          <Link to="/admin/settings" className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <QrCode className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-medium">Payment QR</h3>
            <p className="text-sm text-muted-foreground">Update payment QR code</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.placed_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <p className="mt-1 text-sm font-medium">₹{Number(order.total).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
