import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CategoryCard, CategoryCardSkeleton } from "./CategoryCard";
import { Category } from "@/types";

import catKuppadam from "@/assets/category-kuppadam.jpg";
import catPochampally from "@/assets/category-pochampally.jpg";
import catDharmavaram from "@/assets/category-dharmavaram.jpg";
import catUppada from "@/assets/category-uppada.jpg";
import catMangalgiri from "@/assets/category-mangalgiri.jpg";
import catGadwal from "@/assets/category-gadwal.jpg";
import catVenkatagiri from "@/assets/category-venkatagiri.jpg";

const categoryImages: Record<string, string> = {
  "kuppadam-pattu": catKuppadam,
  "pochampally-ikat": catPochampally,
  "dharmavaram-silk": catDharmavaram,
  "uppada-jamdani": catUppada,
  "mangalgiri-cotton": catMangalgiri,
  "gadwal": catGadwal,
  "venkatagiri": catVenkatagiri,
};

const defaultCategories: Category[] = [
  { id: "1", name: "Kuppadam Pattu", slug: "kuppadam-pattu", description: "Traditional Kuppadam silk sarees with rich zari work", image_url: null, is_enabled: true, sort_order: 1, created_at: "", updated_at: "" },
  { id: "2", name: "Pochampally Ikat", slug: "pochampally-ikat", description: "Geometric ikat patterns in vibrant colors", image_url: null, is_enabled: true, sort_order: 2, created_at: "", updated_at: "" },
  { id: "3", name: "Dharmavaram Silk", slug: "dharmavaram-silk", description: "Lustrous silk sarees with contrasting borders", image_url: null, is_enabled: true, sort_order: 3, created_at: "", updated_at: "" },
  { id: "4", name: "Uppada Jamdani", slug: "uppada-jamdani", description: "Delicate jamdani weave with intricate motifs", image_url: null, is_enabled: true, sort_order: 4, created_at: "", updated_at: "" },
  { id: "5", name: "Mangalgiri Cotton", slug: "mangalgiri-cotton", description: "Soft cotton sarees with distinctive nizam border", image_url: null, is_enabled: true, sort_order: 5, created_at: "", updated_at: "" },
  { id: "6", name: "Gadwal", slug: "gadwal", description: "Lightweight silk-cotton blend with pure silk borders", image_url: null, is_enabled: true, sort_order: 6, created_at: "", updated_at: "" },
  { id: "7", name: "Venkatagiri", slug: "venkatagiri", description: "Fine cotton sarees with subtle zari patterns", image_url: null, is_enabled: true, sort_order: 7, created_at: "", updated_at: "" },
];

interface CategoryGridProps {
  categories?: Category[];
  isLoading?: boolean;
}

export function CategoryGrid({ categories = defaultCategories, isLoading = false }: CategoryGridProps) {
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground">Explore our curated collection of Andhra handloom sarees</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">Explore our curated collection of Andhra handloom sarees</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.filter(c => c.is_enabled).map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CategoryCard
                category={category}
                fallbackImage={categoryImages[category.slug]}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/shop">
              View All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
