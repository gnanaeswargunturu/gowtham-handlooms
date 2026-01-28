import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { Product, ProductImage } from "@/types";

// Sample featured products for now
const sampleProducts: (Product & { images?: ProductImage[] })[] = [
  {
    id: "1",
    name: "Royal Kuppadam Silk Saree",
    slug: "royal-kuppadam-silk-saree",
    description: "Exquisite Kuppadam silk with traditional zari border",
    fabric_type: "silk",
    occasion: "wedding",
    saree_length: "6.3 meters",
    has_blouse_piece: true,
    original_price: 15000,
    discount_percentage: 10,
    final_price: 13500,
    stock_quantity: 5,
    low_stock_threshold: 3,
    wash_care: "Dry clean only",
    is_featured: true,
    is_enabled: true,
    created_at: "",
    updated_at: "",
    images: [],
  },
  {
    id: "2",
    name: "Classic Pochampally Ikat",
    slug: "classic-pochampally-ikat",
    description: "Vibrant geometric patterns in pure cotton",
    fabric_type: "cotton",
    occasion: "festive",
    saree_length: "6 meters",
    has_blouse_piece: true,
    original_price: 8500,
    discount_percentage: 0,
    final_price: 8500,
    stock_quantity: 12,
    low_stock_threshold: 5,
    wash_care: "Hand wash in cold water",
    is_featured: true,
    is_enabled: true,
    created_at: "",
    updated_at: "",
    images: [],
  },
  {
    id: "3",
    name: "Elegant Uppada Jamdani",
    slug: "elegant-uppada-jamdani",
    description: "Delicate jamdani weave with intricate floral motifs",
    fabric_type: "silk",
    occasion: "party",
    saree_length: "6.3 meters",
    has_blouse_piece: true,
    original_price: 12000,
    discount_percentage: 15,
    final_price: 10200,
    stock_quantity: 8,
    low_stock_threshold: 3,
    wash_care: "Dry clean recommended",
    is_featured: true,
    is_enabled: true,
    created_at: "",
    updated_at: "",
    images: [],
  },
  {
    id: "4",
    name: "Traditional Mangalgiri Cotton",
    slug: "traditional-mangalgiri-cotton",
    description: "Soft cotton with distinctive nizam border",
    fabric_type: "cotton",
    occasion: "daily",
    saree_length: "6 meters",
    has_blouse_piece: false,
    original_price: 4500,
    discount_percentage: 0,
    final_price: 4500,
    stock_quantity: 20,
    low_stock_threshold: 5,
    wash_care: "Machine wash gentle cycle",
    is_featured: true,
    is_enabled: true,
    created_at: "",
    updated_at: "",
    images: [],
  },
];

interface FeaturedProductsProps {
  products?: (Product & { images?: ProductImage[] })[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export function FeaturedProducts({
  products = sampleProducts,
  isLoading = false,
  title = "Featured Collection",
  subtitle = "Handpicked sarees that define elegance and tradition",
}: FeaturedProductsProps) {
  if (isLoading) {
    return (
      <section className="py-12 bg-secondary/20">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold">{title}</h2>
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-secondary/20">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <Button variant="outline" className="gap-2 self-start" asChild>
            <Link to="/shop">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
