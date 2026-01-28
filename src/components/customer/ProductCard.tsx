import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, ProductImage } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product & { images?: ProductImage[] };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const hasDiscount = product.discount_percentage > 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl bg-card transition-all duration-300 hover-lift",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-muted">
        <Link to={`/product/${product.slug}`}>
          {primaryImage?.image_url ? (
            <img
              src={primaryImage.image_url}
              alt={primaryImage.alt_text || product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          {hasDiscount && (
            <Badge className="bg-destructive text-destructive-foreground">
              {product.discount_percentage}% OFF
            </Badge>
          )}
          {product.is_featured && (
            <Badge className="bg-accent text-accent-foreground">Featured</Badge>
          )}
          {product.stock_quantity <= product.low_stock_threshold && product.stock_quantity > 0 && (
            <Badge variant="outline" className="bg-background/80">
              Only {product.stock_quantity} left
            </Badge>
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
            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur"
            disabled={product.stock_quantity === 0}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg font-medium text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="capitalize">{product.fabric_type}</span>
          <span>•</span>
          <span className="capitalize">{product.occasion}</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold text-primary">
            {formatPrice(product.final_price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        {product.has_blouse_piece && (
          <p className="mt-2 text-xs text-muted-foreground">
            ✓ Blouse piece included
          </p>
        )}
      </div>
    </div>
  );
}

// Skeleton loader for product card
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
