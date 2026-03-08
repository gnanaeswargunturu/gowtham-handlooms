import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProduct {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  fabric_type?: string | null;
  occasion?: string | null;
  color?: string | null;
  price: number;
  compare_at_price?: number | null;
  stock_quantity: number;
  low_stock_threshold?: number;
  is_featured?: boolean;
  is_active?: boolean;
  has_blouse_piece?: boolean | null;
  category?: { id: string; name: string; slug: string } | null;
  images?: { id: string; image_url: string; alt_text?: string | null; sort_order: number }[];
}

interface ProductCardProps {
  product: ProductCardProduct;
  className?: string;
  badge?: string;
}

export function ProductCard({ product, className, badge }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const primaryImage = product.images?.[0];
  const price = Number(product.price);
  const comparePrice = product.compare_at_price ? Number(product.compare_at_price) : null;
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const lowStock = (product.low_stock_threshold || 5);
  const inWishlist = user ? isInWishlist(product.id) : false;

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

  return (
    <div className={cn("group relative rounded-xl bg-card transition-all duration-300 hover-lift", className)}>
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-muted">
        <Link to={`/product/${product.slug}`}>
          {primaryImage?.image_url ? (
            <img
              src={primaryImage.image_url}
              alt={primaryImage.alt_text || product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center text-muted-foreground">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10" />
                <p className="mt-2 text-xs">Image coming soon</p>
              </div>
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">{discount}% OFF</Badge>
          )}
          {badge && (
            <Badge className="bg-accent text-accent-foreground">{badge}</Badge>
          )}
          {product.is_featured && !badge && (
            <Badge className="bg-accent text-accent-foreground">Featured</Badge>
          )}
          {product.stock_quantity <= lowStock && product.stock_quantity > 0 && (
            <Badge variant="outline" className="bg-background/80">Only {product.stock_quantity} left</Badge>
          )}
          {product.stock_quantity === 0 && (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "h-8 w-8 rounded-full bg-background/90 backdrop-blur",
              inWishlist && "text-red-500"
            )}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur"
            disabled={product.stock_quantity === 0}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg font-medium text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          {product.fabric_type && <span className="capitalize">{product.fabric_type}</span>}
          {product.fabric_type && product.occasion && <span>•</span>}
          {product.occasion && <span className="capitalize">{product.occasion}</span>}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold text-primary">{formatPrice(price)}</span>
          {comparePrice && discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(comparePrice)}</span>
          )}
        </div>

        {product.has_blouse_piece && (
          <p className="mt-2 text-xs text-muted-foreground">✓ Blouse piece included</p>
        )}
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl bg-card">
      <div className="aspect-[3/4] animate-pulse rounded-t-xl bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
