import { Link } from "react-router-dom";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={cn(
        "group relative block aspect-[3/4] overflow-hidden rounded-xl bg-muted transition-all duration-300 hover-lift",
        className
      )}
    >
      {/* Background image or placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10">
        {category.image_url ? (
          <img
            src={category.image_url}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10" />
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-serif text-lg font-semibold">{category.name}</h3>
        {category.description && (
          <p className="mt-1 line-clamp-2 text-sm text-white/80">
            {category.description}
          </p>
        )}
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-accent/50" />
    </Link>
  );
}

// Skeleton loader for category card
export function CategoryCardSkeleton() {
  return (
    <div className="aspect-[3/4] animate-pulse rounded-xl bg-muted">
      <div className="flex h-full flex-col justify-end p-4">
        <div className="h-5 w-3/4 rounded bg-muted-foreground/20" />
        <div className="mt-2 h-3 w-1/2 rounded bg-muted-foreground/10" />
      </div>
    </div>
  );
}
