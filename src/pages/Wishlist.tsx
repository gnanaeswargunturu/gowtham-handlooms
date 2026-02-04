import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

export default function Wishlist() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, isLoading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!user) {
    return (
      <CustomerLayout>
        <div className="container flex flex-col items-center justify-center py-16">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Please login to view your wishlist</p>
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
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Save your favorite sarees here!</p>
          <Button className="mt-6" onClick={() => navigate("/shop")}>
            Explore Sarees
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  const handleAddToCart = async (item: any) => {
    const success = await addToCart(item.product_id);
    if (success) {
      removeFromWishlist(item.id);
    }
  };

  return (
    <CustomerLayout>
      <div className="container py-8">
        <h1 className="mb-8 font-serif text-3xl font-bold">
          My Wishlist ({items.length})
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border bg-card"
            >
              <div
                className="aspect-[3/4] cursor-pointer overflow-hidden bg-muted"
                onClick={() => navigate(`/product/${item.product.slug}`)}
              >
                {item.product.images?.[0] ? (
                  <img
                    src={item.product.images[0].image_url}
                    alt={item.product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3
                  className="font-medium line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => navigate(`/product/${item.product.slug}`)}
                >
                  {item.product.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="font-semibold text-primary">
                    ₹{Number(item.product.price).toLocaleString()}
                  </span>
                  {item.product.compare_at_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{Number(item.product.compare_at_price).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    className="flex-1"
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.product.stock_quantity === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {item.product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
