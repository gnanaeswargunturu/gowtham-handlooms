// Gowtham Handlooms - TypeScript Type Definitions

// User Roles
export type AppRole = 'admin' | 'owner' | 'customer';

// User Profile
export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// User Role assignment
export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

// Shop Settings
export interface ShopSettings {
  id: string;
  shop_name: string;
  logo_url: string | null;
  banner_url: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  business_hours: string | null;
  about: string | null;
  heritage_description: string | null;
  flat_shipping_rate: number;
  free_shipping_above: number | null;
  return_policy: string | null;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Category
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Fabric Type
export type FabricType = 'silk' | 'cotton' | 'mixed' | 'other';

// Occasion Type
export type OccasionType = 'wedding' | 'festive' | 'daily' | 'party' | 'casual' | 'other';

// Product / Saree
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  fabric_type: FabricType;
  occasion: OccasionType;
  saree_length: string | null;
  has_blouse_piece: boolean;
  original_price: number;
  discount_percentage: number;
  final_price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  wash_care: string | null;
  is_featured: boolean;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Product with category info
export interface ProductWithCategories extends Product {
  categories: Category[];
  images: ProductImage[];
}

// Product Image
export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

// Product Category junction
export interface ProductCategory {
  id: string;
  product_id: string;
  category_id: string;
}

// Wishlist Item
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

// Cart Item
export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

// Customer Address
export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Order Status
export type OrderStatus = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

// Payment Status
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Order
export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  address_id: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  address?: Address;
  items?: OrderItem[];
  profile?: Profile;
}

// Order Item
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  product?: Product;
}

// Review
export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  order_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

// Return Request Status
export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'completed';

// Return Request
export interface ReturnRequest {
  id: string;
  order_id: string;
  user_id: string;
  reason: string;
  status: ReturnStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  order?: Order;
}

// Homepage Banner
export interface Banner {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  is_enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Filter options for product catalog
export interface ProductFilters {
  categories?: string[];
  fabricTypes?: FabricType[];
  occasions?: OccasionType[];
  minPrice?: number;
  maxPrice?: number;
  hasBlousePiece?: boolean;
  inStock?: boolean;
}

// Sort options
export type SortOption = 'newest' | 'price_low' | 'price_high' | 'popularity' | 'name';

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  totalProducts: number;
  totalCustomers: number;
}

// Order Status Timeline Entry
export interface OrderStatusEntry {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}
