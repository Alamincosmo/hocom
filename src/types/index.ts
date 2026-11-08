export type Gender = 'MEN' | 'WOMEN' | 'KIDS' | 'UNISEX';

export interface ProductSpecification {
  fabric: string;
  fit: string;
  pattern: string;
  washCare: string;
  neckType?: string;
  sleeveLength?: string;
  fastening?: string;
  soleMaterial?: string;
  closure?: string;
  batteryLife?: string;
  movement?: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  description: string;
  category: string;
  subCategory: string;
  gender: Gender;
  basePrice: number; // MRP
  discountPrice: number; // Selling price
  discountPercent: number; // e.g. 40 (40% OFF)
  images: string[];
  sizes: {
    size: string;
    stock: number;
  }[];
  colors: string[];
  rating: number; // e.g. 4.3
  reviewCount: number; // e.g. 1420
  specifications: ProductSpecification;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  pincode: string;
  streetAddress: string;
  locality: string;
  city: string;
  state: string;
  type: 'HOME' | 'WORK';
  isDefault: boolean;
}

export interface FilterState {
  gender: Gender | 'ALL';
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  discountRange: number; // e.g. 10, 20, 30, 50%
  color: string | null;
  sortBy: 'RECOMMENDED' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW' | 'DISCOUNT' | 'RATING' | 'WHATS_NEW';
  searchQuery: string;
}
