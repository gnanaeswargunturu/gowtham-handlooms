import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight, Loader2, Check, MessageCircle, Shield, Truck, RefreshCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useReviews, useCreateReview } from "@/hooks/useReviews";
import { useAuth } from "@/contexts/AuthContext";
import { ProductCard } from "@/components/customer/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { product, isLoading, error } = useProduct(slug || "");
  const { addToCart, items: cartItems } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Reviews
  const { reviews, averageRating, refetch: refetchReviews } = useReviews(product?.id || "");
  const { createReview, isLoading: reviewLoading } = useCreateReview();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  // Similar products
  const { products: similarProducts } = useProducts({
    categorySlug: product?.category?.slug,
    limit: 4,
  });

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="container flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </CustomerLayout>
    );
  }

  if (error || !product) {
    return (
      <CustomerLayout>
        <div className="container flex flex-col items-center justify-center py-16">
          <h2 className="font-serif text-2xl font-bold">Product not found</h2>
          <Button className="mt-4" onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
      </CustomerLayout>
    );
  }

  const images = product.images?.length ? product.images.sort((a, b) => a.sort_order - b.sort_order) : [];
  const inCart = cartItems.some((item) => item.product_id === product.id);
  const inWishlist = user ? isInWishlist(product.id) : false;
  const discount = product.compare_at_price
    ? Math.round(((Number(product.compare_at_price) - Number(product.price)) / Number(product.compare_at_price)) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await addToCart(product.id, quantity);
    setIsAddingToCart(false);
  };

  const handleSubmitReview = async () => {
    const { error } = await createReview({
      product_id: product.id,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
    });
    if (!error) {
      setReviewTitle("");
      setReviewComment("");
      setReviewRating(5);
      refetchReviews();
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${product.name}" (₹${Number(product.price).toLocaleString()}). Can you share more details?\n\nProduct link: ${window.location.href}`
  );

  const filteredSimilar = similarProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <CustomerLayout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-foreground">Home</button>
          <span>/</span>
          <button onClick={() => navigate("/shop")} className="hover:text-foreground">Shop</button>
          {product.category && (
            <>
              <span>/</span>
              <button onClick={() => navigate(`/shop?category=${product.category?.slug}`)} className="hover:text-foreground">{product.category.name}</button>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              {images.length > 0 ? (
                <img src={images[selectedImageIndex].image_url} alt={images[selectedImageIndex].alt_text || product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">No Image Available</div>
              )}
              {images.length > 1 && (
                <>
                  <Button variant="secondary" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2" onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              {discount > 0 && <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">{discount}% OFF</Badge>}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button key={image.id} onClick={() => setSelectedImageIndex(index)} className={cn("h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors", selectedImageIndex === index ? "border-primary" : "border-transparent hover:border-muted-foreground/50")}>
                    <img src={image.image_url} alt={image.alt_text || `${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.category && <Badge variant="secondary">{product.category.name}</Badge>}
            <h1 className="font-serif text-3xl font-bold">{product.name}</h1>
            {product.description && <p className="text-muted-foreground">{product.description}</p>}

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={cn("h-4 w-4", s <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">₹{Number(product.price).toLocaleString()}</span>
              {product.compare_at_price && <span className="text-xl text-muted-foreground line-through">₹{Number(product.compare_at_price).toLocaleString()}</span>}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.stock_quantity > 0 ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">{product.stock_quantity <= product.low_stock_threshold ? `Only ${product.stock_quantity} left!` : "In Stock"}</span>
                </>
              ) : (
                <span className="text-destructive">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Actions */}
            {product.stock_quantity > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))} disabled={quantity >= product.stock_quantity}><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={isAddingToCart}>
                    {isAddingToCart ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                    {inCart ? "Add More to Cart" : "Add to Cart"}
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => toggleWishlist(product.id)}>
                    <Heart className={cn("h-4 w-4", inWishlist && "fill-current text-red-500")} />
                  </Button>
                </div>
                <Button variant="outline" size="lg" className="w-full gap-2" asChild>
                  <a href={`https://wa.me/919876543210?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />Buy on WhatsApp
                  </a>
                </Button>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
              {product.fabric_type && <div><span className="text-sm text-muted-foreground">Fabric</span><p className="font-medium">{product.fabric_type}</p></div>}
              {product.color && <div><span className="text-sm text-muted-foreground">Color</span><p className="font-medium">{product.color}</p></div>}
              {product.length_meters && <div><span className="text-sm text-muted-foreground">Saree Length</span><p className="font-medium">{product.length_meters} meters</p></div>}
              {product.has_blouse_piece && <div><span className="text-sm text-muted-foreground">Blouse Piece</span><p className="font-medium">Yes{product.blouse_length_meters ? ` (${product.blouse_length_meters}m)` : ""}</p></div>}
              {product.occasion && <div><span className="text-sm text-muted-foreground">Occasion</span><p className="font-medium capitalize">{product.occasion}</p></div>}
            </div>

            {/* Trust Icons */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /><span>Authentic Handloom</span></div>
              <div className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /><span>5–7 days delivery</span></div>
              <div className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4 text-primary" /><span>7-day returns</span></div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="care" className="flex-1">Wash Care</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews ({reviews.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground whitespace-pre-line">{product.description || "No description available."}</p>
              </TabsContent>
              <TabsContent value="care" className="mt-4">
                <p className="text-muted-foreground whitespace-pre-line">{product.wash_care || "Dry clean recommended. Store in a cool, dry place."}</p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4 space-y-6">
                {/* Write Review */}
                {user && (
                  <div className="rounded-lg border p-4 space-y-3">
                    <h4 className="font-medium">Write a Review</h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setReviewRating(s)}>
                          <Star className={cn("h-5 w-5 transition-colors", s <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-300")} />
                        </button>
                      ))}
                    </div>
                    <Input placeholder="Review title (optional)" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} />
                    <Textarea placeholder="Share your experience..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={3} />
                    <Button onClick={handleSubmitReview} disabled={reviewLoading} size="sm">
                      {reviewLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Submit Review
                    </Button>
                  </div>
                )}

                {/* Reviews List */}
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className={cn("h-3.5 w-3.5", s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
                              ))}
                            </div>
                            {review.is_verified && <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>}
                          </div>
                          <span className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString("en-IN")}</span>
                        </div>
                        {review.title && <p className="mt-2 font-medium">{review.title}</p>}
                        {review.comment && <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>}
                        <p className="mt-2 text-xs text-muted-foreground">
                          {(review as any).profile?.full_name || "Customer"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Similar Products */}
        {filteredSimilar.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredSimilar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
