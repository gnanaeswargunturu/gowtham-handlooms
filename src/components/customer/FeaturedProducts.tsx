import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const fallbackImages = [product1, product2, product3, product4, product5, product6, product7, product8];
const badges = ["Best Seller", "New", "", "New", "Best Seller", "", "New", ""];

export function FeaturedProducts() {
  const { products, isLoading } = useProducts({ featured: true, limit: 8 });

  // Use DB products if available, otherwise use fallback sample data
  const displayProducts = products.length > 0 ? products : [
    { id: "1", name: "Royal Kuppadam Silk Saree", slug: "royal-kuppadam-silk-saree", price: 13500, compare_at_price: 15000, stock_quantity: 5, fabric_type: "silk", occasion: "wedding", has_blouse_piece: true, is_featured: true, is_active: true, low_stock_threshold: 3, images: [{ id: "i1", image_url: product1, alt_text: "Royal Kuppadam silk saree", sort_order: 0 }] },
    { id: "2", name: "Classic Pochampally Ikat", slug: "classic-pochampally-ikat", price: 8500, compare_at_price: null, stock_quantity: 12, fabric_type: "cotton", occasion: "festive", has_blouse_piece: true, is_featured: true, is_active: true, low_stock_threshold: 5, images: [{ id: "i2", image_url: product2, alt_text: "Pochampally Ikat saree", sort_order: 0 }] },
    { id: "3", name: "Elegant Uppada Jamdani", slug: "elegant-uppada-jamdani", price: 10200, compare_at_price: 12000, stock_quantity: 8, fabric_type: "silk", occasion: "party", has_blouse_piece: true, is_featured: true, is_active: true, low_stock_threshold: 3, images: [{ id: "i3", image_url: product3, alt_text: "Uppada Jamdani saree", sort_order: 0 }] },
    { id: "4", name: "Traditional Mangalgiri Cotton", slug: "traditional-mangalgiri-cotton", price: 4500, compare_at_price: null, stock_quantity: 20, fabric_type: "cotton", occasion: "daily", has_blouse_piece: false, is_featured: true, is_active: true, low_stock_threshold: 5, images: [{ id: "i4", image_url: product4, alt_text: "Mangalgiri cotton saree", sort_order: 0 }] },
    { id: "5", name: "Dharmavaram Silk Elegance", slug: "dharmavaram-silk-elegance", price: 17100, compare_at_price: 18000, stock_quantity: 3, fabric_type: "silk", occasion: "wedding", has_blouse_piece: true, is_featured: true, is_active: true, low_stock_threshold: 3, images: [{ id: "i5", image_url: product5, alt_text: "Dharmavaram silk saree", sort_order: 0 }] },
    { id: "6", name: "Gadwal Silk Cotton Blend", slug: "gadwal-silk-cotton-blend", price: 9500, compare_at_price: null, stock_quantity: 15, fabric_type: "silk-cotton", occasion: "festive", has_blouse_piece: true, is_featured: true, is_active: true, low_stock_threshold: 5, images: [{ id: "i6", image_url: product6, alt_text: "Gadwal saree", sort_order: 0 }] },
    { id: "7", name: "Venkatagiri Pure Cotton", slug: "venkatagiri-pure-cotton", price: 5500, compare_at_price: null, stock_quantity: 18, fabric_type: "cotton", occasion: "casual", has_blouse_piece: true, is_featured: true, is_active: true, low_stock_threshold: 5, images: [{ id: "i7", image_url: product7, alt_text: "Venkatagiri cotton saree", sort_order: 0 }] },
    { id: "8", name: "Grand Kuppadam Wedding Silk", slug: "grand-kuppadam-wedding-silk", price: 22500, compare_at_price: 25000, stock_quantity: 4, fabric_type: "silk", occasion: "wedding", has_blouse_piece: true, is_featured: true, is_active: true, low_stock_threshold: 3, images: [{ id: "i8", image_url: product8, alt_text: "Grand Kuppadam wedding saree", sort_order: 0 }] },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Curated Collection</span>
          <h2 className="font-serif text-3xl font-bold lg:text-4xl">Featured & New Arrivals</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Handpicked sarees from our finest collections — each one a masterpiece of Andhra weaving tradition.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : displayProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                  <ProductCard product={product as any} badge={badges[index] || undefined} />
                </div>
              ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/shop">
              View All Sarees <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
