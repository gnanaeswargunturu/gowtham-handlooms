import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { ProductCard, ProductCardSkeleton } from "@/components/customer/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

type SortOption = "newest" | "price_low" | "price_high" | "name";

const fabricOptions = [
  { value: "silk", label: "Silk" },
  { value: "cotton", label: "Cotton" },
  { value: "silk-cotton", label: "Silk-Cotton" },
];

const occasionOptions = [
  { value: "wedding", label: "Wedding" },
  { value: "festive", label: "Festive" },
  { value: "party", label: "Party" },
  { value: "daily", label: "Daily Wear" },
  { value: "casual", label: "Casual" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || "");
  const [hasBlousePiece, setHasBlousePiece] = useState<boolean | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  const { products, isLoading } = useProducts({
    search: searchQuery || undefined,
    sortBy: sortBy === "price_low" ? "price_asc" : sortBy === "price_high" ? "price_desc" : sortBy === "name" ? "name" : "newest",
  });
  const { categories } = useCategories();

  // Client-side filters for fields not supported by hook
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = Number(product.price);
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.fabric_type || "")) return false;
      if (selectedOccasions.length > 0 && !selectedOccasions.includes(product.occasion || "")) return false;
      if (selectedCategory && product.category?.slug !== selectedCategory) return false;
      if (hasBlousePiece !== null && product.has_blouse_piece !== hasBlousePiece) return false;
      if (inStockOnly && product.stock_quantity === 0) return false;
      return true;
    });
  }, [products, priceRange, selectedFabrics, selectedOccasions, selectedCategory, hasBlousePiece, inStockOnly]);

  const activeFiltersCount = [
    selectedFabrics.length > 0,
    selectedOccasions.length > 0,
    selectedCategory !== "",
    hasBlousePiece !== null,
    inStockOnly,
    priceRange[0] > 0 || priceRange[1] < 50000,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setSelectedCategory("");
    setHasBlousePiece(null);
    setInStockOnly(false);
    setPriceRange([0, 50000]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="mb-3 font-medium">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.slug}`}
                checked={selectedCategory === cat.slug}
                onCheckedChange={(checked) => setSelectedCategory(checked ? cat.slug : "")}
              />
              <Label htmlFor={`cat-${cat.slug}`} className="text-sm">{cat.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 font-medium">Price Range</h4>
        <Slider value={priceRange} onValueChange={setPriceRange} max={50000} min={0} step={500} className="mb-2" />
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
                  if (checked) setSelectedFabrics([...selectedFabrics, option.value]);
                  else setSelectedFabrics(selectedFabrics.filter((f) => f !== option.value));
                }}
              />
              <Label htmlFor={`fabric-${option.value}`} className="text-sm">{option.label}</Label>
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
                  if (checked) setSelectedOccasions([...selectedOccasions, option.value]);
                  else setSelectedOccasions(selectedOccasions.filter((o) => o !== option.value));
                }}
              />
              <Label htmlFor={`occasion-${option.value}`} className="text-sm">{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Other */}
      <div>
        <h4 className="mb-3 font-medium">Other Filters</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="blouse-piece" checked={hasBlousePiece === true} onCheckedChange={(checked) => setHasBlousePiece(checked ? true : null)} />
            <Label htmlFor="blouse-piece" className="text-sm">With Blouse Piece</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(!!checked)} />
            <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
          </div>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>Clear All Filters</Button>
      )}
    </div>
  );

  return (
    <CustomerLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold lg:text-4xl">
            {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name || "Shop" : "Shop All Sarees"}
          </h1>
          <p className="mt-2 text-muted-foreground">Discover our exquisite collection of handwoven Andhra sarees</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Input type="search" placeholder="Search sarees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10" />
          </div>
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />Filters
                  {activeFiltersCount > 0 && <Badge variant="secondary" className="ml-1">{activeFiltersCount}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-6"><FilterContent /></div>
              </SheetContent>
            </Sheet>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="hidden text-sm text-muted-foreground lg:inline">{filteredProducts.length} products</span>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
              </div>
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
                <Filter className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 font-serif text-lg font-medium">No products found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
