import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem, WishlistItem, Address } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  appliedCoupon: string | null;
  couponDiscount: number;
  addToCart: (product: Product, selectedSize: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, quantity: number) => void;
  updateCartSize: (cartItemId: string, newSize: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency
  currency: 'BDT' | 'INR';
  currencySymbol: string;
  setCurrency: (curr: 'BDT' | 'INR') => void;

  // Address
  addresses: Address[];
  selectedAddressId: string;
  addAddress: (address: Omit<Address, 'id'>) => void;
  setSelectedAddress: (id: string) => void;

  // Search & Global State
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast / Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Shuvo Ahmed',
    mobile: '01712345678',
    pincode: '1212',
    streetAddress: 'House 42, Road 11, Block D',
    locality: 'Banani',
    city: 'Dhaka',
    state: 'Dhaka Division',
    type: 'HOME',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Shuvo Ahmed (Office)',
    mobile: '01887654321',
    pincode: '1213',
    streetAddress: 'Gulshan Center Point, Level 9',
    locality: 'Gulshan 2',
    city: 'Dhaka',
    state: 'Dhaka Division',
    type: 'WORK',
    isDefault: false,
  },
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      appliedCoupon: null,
      couponDiscount: 0,

      addToCart: (product, selectedSize, quantity = 1) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex(
          (item) => item.productId === product.id && item.selectedSize === selectedSize
        );

        if (existingIndex > -1) {
          const updated = [...currentCart];
          updated[existingIndex].quantity += quantity;
          set({ cart: updated });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${selectedSize}-${Date.now()}`,
            productId: product.id,
            product,
            selectedSize,
            quantity,
          };
          set({ cart: [...currentCart, newItem] });
        }
        get().showToast(`Added ${product.brand} to Bag! 🛍️`);
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId),
        }));
        get().showToast('Item removed from Bag');
      },

      updateCartQty: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      updateCartSize: (cartItemId, newSize) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, selectedSize: newSize } : item
          ),
        }));
        get().showToast(`Size updated to ${newSize}`);
      },

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'HOCOM200' || cleanCode === 'MYNTRA200') {
          set({ appliedCoupon: 'HOCOM200', couponDiscount: 200 });
          return { success: true, message: 'Flat ৳200 / ₹200 OFF applied!' };
        }
        if (cleanCode === 'HOCOM500' || cleanCode === 'MYNTRA500') {
          set({ appliedCoupon: 'HOCOM500', couponDiscount: 500 });
          return { success: true, message: 'Special Mega ৳500 / ₹500 discount applied!' };
        }
        if (cleanCode === 'FIRSTBUY') {
          set({ appliedCoupon: 'FIRSTBUY', couponDiscount: 350 });
          return { success: true, message: 'Welcome coupon applied: ৳350 / ₹350 OFF!' };
        }
        return { success: false, message: 'Invalid coupon code. Try HOCOM200 or HOCOM500.' };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null, couponDiscount: 0 });
        get().showToast('Coupon removed');
      },

      clearCart: () => {
        set({ cart: [], appliedCoupon: null, couponDiscount: 0 });
      },

      // Wishlist
      wishlist: [],
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.some((item) => item.productId === product.id);

        if (exists) {
          set({
            wishlist: currentWishlist.filter((item) => item.productId !== product.id),
          });
          get().showToast('Removed from Wishlist');
          return false;
        } else {
          set({
            wishlist: [
              ...currentWishlist,
              { productId: product.id, product, addedAt: new Date().toISOString() },
            ],
          });
          get().showToast('Saved to Wishlist ❤️');
          return true;
        }
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.productId !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.productId === productId);
      },

      // Currency
      currency: 'BDT',
      currencySymbol: '৳',
      setCurrency: (curr) => {
        set({
          currency: curr,
          currencySymbol: curr === 'BDT' ? '৳' : '₹',
        });
      },

      // Address
      addresses: DEFAULT_ADDRESSES,
      selectedAddressId: 'addr-1',
      addAddress: (newAddr) => {
        const id = `addr-${Date.now()}`;
        const created: Address = { ...newAddr, id };
        set((state) => ({
          addresses: [...state.addresses, created],
          selectedAddressId: id,
        }));
        get().showToast('New address saved!');
      },
      setSelectedAddress: (id) => {
        set({ selectedAddressId: id });
      },

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Toast
      toastMessage: null,
      showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => {
          if (get().toastMessage === msg) {
            set({ toastMessage: null });
          }
        }, 3000);
      },
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'myntra-store-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        appliedCoupon: state.appliedCoupon,
        couponDiscount: state.couponDiscount,
        currency: state.currency,
        currencySymbol: state.currencySymbol,
        addresses: state.addresses,
        selectedAddressId: state.selectedAddressId,
      }),
    }
  )
);
