import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { Product, ProductImage } from "@/types";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const sampleProducts: (Product & { images?: ProductImage[]; tag?: string })[] = [
  {
    id: "1", name: "Royal Kuppadam Silk Saree", slug: "royal-kuppadam-silk-saree",
    description: "Exquisite Kuppadam silk with traditional zari border",
    fabric_type: "silk", occasion: "wedding", saree_length: "6.3 meters",
    has_blouse_piece: true, original_price: 15000, discount_percentage: 10,
    final_price: 13500, stock_quantity: 5, low_stock_threshold: 3,
    wash_care: "Dry clean only", is_featured: true, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i1", product_id: "1", image_url: product1, alt_text: "Royal Kuppadam silk saree – maroon with gold zari border", is_primary: true, sort_order: 0, created_at: "" }],
    tag: "Best Seller",
  },
  {
    id: "2", name: "Classic Pochampally Ikat", slug: "classic-pochampally-ikat",
    description: "Vibrant geometric patterns in pure cotton",
    fabric_type: "cotton", occasion: "festive", saree_length: "6 meters",
    has_blouse_piece: true, original_price: 8500, discount_percentage: 0,
    final_price: 8500, stock_quantity: 12, low_stock_threshold: 5,
    wash_care: "Hand wash in cold water", is_featured: true, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i2", product_id: "2", image_url: product2, alt_text: "Classic Pochampally Ikat cotton saree – blue geometric pattern", is_primary: true, sort_order: 0, created_at: "" }],
    tag: "Featured",
  },
  {
    id: "3", name: "Elegant Uppada Jamdani", slug: "elegant-uppada-jamdani",
    description: "Delicate jamdani weave with intricate floral motifs",
    fabric_type: "silk", occasion: "party", saree_length: "6.3 meters",
    has_blouse_piece: true, original_price: 12000, discount_percentage: 15,
    final_price: 10200, stock_quantity: 8, low_stock_threshold: 3,
    wash_care: "Dry clean recommended", is_featured: true, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i3", product_id: "3", image_url: product3, alt_text: "Elegant Uppada Jamdani silk saree – peach with floral motifs", is_primary: true, sort_order: 0, created_at: "" }],
    tag: "New",
  },
  {
    id: "4", name: "Traditional Mangalgiri Cotton", slug: "traditional-mangalgiri-cotton",
    description: "Soft cotton with distinctive nizam border",
    fabric_type: "cotton", occasion: "daily", saree_length: "6 meters",
    has_blouse_piece: false, original_price: 4500, discount_percentage: 0,
    final_price: 4500, stock_quantity: 20, low_stock_threshold: 5,
    wash_care: "Machine wash gentle cycle", is_featured: true, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i4", product_id: "4", image_url: product4, alt_text: "Traditional Mangalgiri cotton saree – yellow with maroon border", is_primary: true, sort_order: 0, created_at: "" }],
  },
  {
    id: "5", name: "Dharmavaram Silk Elegance", slug: "dharmavaram-silk-elegance",
    description: "Lustrous silk with contrasting pallu",
    fabric_type: "silk", occasion: "wedding", saree_length: "6.3 meters",
    has_blouse_piece: true, original_price: 18000, discount_percentage: 5,
    final_price: 17100, stock_quantity: 3, low_stock_threshold: 3,
    wash_care: "Dry clean only", is_featured: false, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i5", product_id: "5", image_url: product5, alt_text: "Dharmavaram silk saree – emerald green with gold border", is_primary: true, sort_order: 0, created_at: "" }],
    tag: "New",
  },
  {
    id: "6", name: "Gadwal Silk Cotton Blend", slug: "gadwal-silk-cotton-blend",
    description: "Lightweight blend with pure silk borders",
    fabric_type: "mixed", occasion: "festive", saree_length: "6 meters",
    has_blouse_piece: true, original_price: 9500, discount_percentage: 0,
    final_price: 9500, stock_quantity: 15, low_stock_threshold: 5,
    wash_care: "Dry clean recommended", is_featured: false, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i6", product_id: "6", image_url: product6, alt_text: "Gadwal silk cotton blend saree – purple with gold border", is_primary: true, sort_order: 0, created_at: "" }],
    tag: "Featured",
  },
  {
    id: "7", name: "Venkatagiri Fine Cotton", slug: "venkatagiri-fine-cotton",
    description: "Fine cotton sarees with subtle zari patterns",
    fabric_type: "cotton", occasion: "daily", saree_length: "6 meters",
    has_blouse_piece: true, original_price: 5500, discount_percentage: 0,
    final_price: 5500, stock_quantity: 18, low_stock_threshold: 5,
    wash_care: "Hand wash in cold water", is_featured: false, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i7", product_id: "7", image_url: product7, alt_text: "Venkatagiri cotton saree – cream white with golden zari", is_primary: true, sort_order: 0, created_at: "" }],
  },
  {
    id: "8", name: "Royal Kuppadam Temple Border", slug: "royal-kuppadam-temple-border",
    description: "Rich navy blue Kuppadam silk with temple motifs",
    fabric_type: "silk", occasion: "wedding", saree_length: "6.3 meters",
    has_blouse_piece: true, original_price: 16500, discount_percentage: 10,
    final_price: 14850, stock_quantity: 4, low_stock_threshold: 3,
    wash_care: "Dry clean only", is_featured: true, is_enabled: true,
    created_at: "", updated_at: "",
    images: [{ id: "i8", product_id: "8", image_url: product8, alt_text: "Kuppadam Pattu silk saree – navy blue with gold temple border", is_primary: true, sort_order: 0, created_at: "" }],
    tag: "Best Seller",
  },
];

interface FeaturedProductsProps {
  products?: (Product & { images?: ProductImage[]; tag?: string })[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export function FeaturedProducts({
  products = sampleProducts,
  isLoading = false,
  title = "Our Collection",
  subtitle = "Handpicked sarees that define elegance and tradition",
}: FeaturedProductsProps) {
  if (isLoading) {
    return (
      <section className="py-12 bg-secondary/20">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in relative"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {product.tag && (
                <Badge
                  className={`absolute left-4 top-4 z-10 ${
                    product.tag === "New"
                      ? "bg-accent text-accent-foreground"
                      : product.tag === "Best Seller"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {product.tag}
                </Badge>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
