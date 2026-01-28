import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { ProductCard, ProductCardSkeleton } from "@/components/customer/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Product, FabricType, OccasionType, SortOption } from "@/types";

// Sample products data
const sampleProducts: Product[] = [
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
  },
  {
    id: "5",
    name: "Dharmavaram Silk Elegance",
    slug: "dharmavaram-silk-elegance",
    description: "Lustrous silk with contrasting pallu",
    fabric_type: "silk",
    occasion: "wedding",
    saree_length: "6.3 meters",
    has_blouse_piece: true,
    original_price: 18000,
    discount_percentage: 5,
    final_price: 17100,
    stock_quantity: 3,
    low_stock_threshold: 3,
    wash_care: "Dry clean only",
    is_featured: false,
    is_enabled: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "6",
    name: "Gadwal Silk Cotton Blend",
    slug: "gadwal-silk-cotton-blend",
    description: "Lightweight blend with pure silk borders",
    fabric_type: "mixed",
    occasion: "festive",
    saree_length: "6 meters",
    has_blouse_piece: true,
    original_price: 9500,
    discount_percentage: 0,
    final_price: 9500,
    stock_quantity: 15,
    low_stock_threshold: 5,
    wash_care: "Dry clean recommended",
    is_featured: false,
    is_enabled: true,
    created_at: "",
    updated_at: "",
  },
];

const fabricOptions: { value: FabricType; label: string }[] = [
  { value: "silk", label: "Silk" },
  { value: "cotton", label: "Cotton" },
  { value: "mixed", label: "Mixed/Blend" },
  { value: "other", label: "Other" },
];

const occasionOptions: { value: OccasionType; label: string }[] = [
  { value: "wedding", label: "Wedding" },
  { value: "festive", label: "Festive" },
  { value: "party", label: "Party" },
  { value: "daily", label: "Daily Wear" },
  { value: "casual", label: "Casual" },
  { value: "other", label: "Other" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "popularity", label: "Popularity" },
  { value: "name", label: "Name A-Z" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [selectedFabrics, setSelectedFabrics] = useState<FabricType[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<OccasionType[]>([]);
  const [hasBlousePiece, setHasBlousePiece] = useState<boolean | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  const isLoading = false;

  // Filter products
  const filteredProducts = sampleProducts.filter((product) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (product.final_price < priceRange[0] || product.final_price > priceRange[1]) {
      return false;
    }
    if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.fabric_type)) {
      return false;
    }
    if (selectedOccasions.length > 0 && !selectedOccasions.includes(product.occasion)) {
      return false;
    }
    if (hasBlousePiece !== null && product.has_blouse_piece !== hasBlousePiece) {
      return false;
    }
    if (inStockOnly && product.stock_quantity === 0) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.final_price - b.final_price;
      case "price_high":
        return b.final_price - a.final_price;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
      default:
        return 0;
    }
  });

  const activeFiltersCount = [
    selectedFabrics.length > 0,
    selectedOccasions.length > 0,
    hasBlousePiece !== null,
    inStockOnly,
    priceRange[0] > 0 || priceRange[1] < 25000,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setHasBlousePiece(null);
    setInStockOnly(false);
    setPriceRange([0, 25000]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="mb-3 font-medium">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={25000}
          min={0}
          step={500}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Fabric Type */}
      <div>
        <h4 className="mb-3 font-medium">Fabric Type</h4>
        <div className="space-y-2">
          {fabricOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`fabric-${option.value}`}
                checked={selectedFabrics.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFabrics([...selectedFabrics, option.value]);
                  } else {
                    setSelectedFabrics(selectedFabrics.filter((f) => f !== option.value));
                  }
                }}
              />
              <Label htmlFor={`fabric-${option.value}`} className="text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h4 className="mb-3 font-medium">Occasion</h4>
        <div className="space-y-2">
          {occasionOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`occasion-${option.value}`}
                checked={selectedOccasions.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedOccasions([...selectedOccasions, option.value]);
                  } else {
                    setSelectedOccasions(selectedOccasions.filter((o) => o !== option.value));
                  }
                }}
              />
              <Label htmlFor={`occasion-${option.value}`} className="text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div>
        <h4 className="mb-3 font-medium">Other Filters</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="blouse-piece"
              checked={hasBlousePiece === true}
              onCheckedChange={(checked) => {
                setHasBlousePiece(checked ? true : null);
              }}
            />
            <Label htmlFor="blouse-piece" className="text-sm">
              With Blouse Piece
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(!!checked)}
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <CustomerLayout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold lg:text-4xl">
            {categoryFromUrl ? `${categoryFromUrl.replace("-", " ")}` : "Shop All Sarees"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover our exquisite collection of handwoven Andhra sarees
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Input
              type="search"
              placeholder="Search sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Results count */}
            <span className="hidden text-sm text-muted-foreground lg:inline">
              {sortedProducts.length} products
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
                <Filter className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 font-serif text-lg font-medium">No products found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
