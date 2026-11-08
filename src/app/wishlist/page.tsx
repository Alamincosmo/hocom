'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import LenisScroll from '@/components/LenisScroll';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, currencySymbol } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [sizePromptProduct, setSizePromptProduct] = useState<Product | null>(null);

  const handleMoveToBag = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0]?.size || 'M';
    addToCart(product, size, 1);
    removeFromWishlist(product.id);
    setSizePromptProduct(null);
  };

  return (
    <LenisScroll>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
          <div className="flex items-baseline gap-3 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-[#EFE6D8]">
            <h1 className="text-xl sm:text-2xl font-black text-[#241A14] uppercase tracking-tight">
              My Wishlist
            </h1>
            <span className="text-sm font-medium text-[#6B5D52]">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {wishlist.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-6">
              {wishlist.map(({ product }) => (
                <div
                  key={product.id}
                  className="group relative bg-[#FAF9F6] border border-[#E8DFD3] hover:border-[#DECBB7] shadow-[0_1.5px_0_0_#DECBB7,0_6px_16px_rgba(30,24,21,0.04)] hover:shadow-[0_5px_0_0_#CFBCA8,0_16px_32px_rgba(30,24,21,0.09)] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Remove Button - Dynamic Overlay Contrast & 36px Min Tap Target */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 z-20 w-8 h-8 bg-white/90 hover:bg-white text-[#4B5563] hover:text-[#EA580C] rounded-full flex items-center justify-center shadow-xs transition-all border border-black/5 backdrop-blur-md active:scale-95"
                    title="Remove from Wishlist"
                    aria-label="Remove from Wishlist"
                  >
                    <X className="w-4 h-4 stroke-[2]" />
                  </button>

                  <Link href={`/products/${product.id}`} className="block relative aspect-[1/1.04] bg-[#F4EFE8] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover object-top group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  <div className="rounded-t-[16px] bg-[#FAF9F6] -mt-3 relative z-10 p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10.5px] font-bold text-[#4B5563] tracking-[0.08em] uppercase truncate block">
                        {product.brand}
                      </span>
                      <h4 className="text-[12.5px] font-semibold text-[#1E1815] truncate mt-1 leading-snug">
                        {product.title}
                      </h4>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-sm font-black text-[#1E1815] tracking-tight">
                          {currencySymbol}{product.discountPrice}
                        </span>
                        <span className="text-[11px] text-[#4B5563] line-through font-normal">
                          {currencySymbol}{product.basePrice}
                        </span>
                        <span className="text-[11.5px] font-semibold text-[#EA580C] bg-[#FFF7ED] px-2 py-0.5 rounded-sm tracking-wide">
                          {product.discountPercent}% OFF
                        </span>
                      </div>
                    </div>

                    {/* Move to bag button - Refined & Non-aggressive */}
                    <button
                      onClick={() => setSizePromptProduct(product)}
                      className="mt-3.5 w-full border border-[#1E1815] bg-[#1E1815] hover:bg-[#322822] text-white font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#FAF4EB] rounded-2xl max-w-xl mx-auto p-8 border border-[#EFE6D8]">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto text-[#EA580C] mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-black text-[#241A14] uppercase">
                YOUR WISHLIST IS EMPTY
              </h2>
              <p className="text-xs text-[#6B5D52] mt-2 max-w-sm mx-auto">
                Explore our curated trends, save the fashion outfits you love and purchase anytime.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-black text-xs uppercase px-8 py-3 rounded-md shadow-md transition"
              >
                <span>CONTINUE SHOPPING</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </main>

        <Footer />
        <Toast />

        {/* Size Selection Modal when Move to Bag is clicked */}
        {sizePromptProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#FDFBF8] rounded-xl p-6 max-w-sm w-full border border-[#EFE6D8] shadow-2xl animate-scaleIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE6D8]">
                <h3 className="font-extrabold text-sm text-[#241A14] uppercase">
                  Select Size to Move
                </h3>
                <button
                  onClick={() => setSizePromptProduct(null)}
                  className="text-slate-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 py-4">
                <div className="relative w-12 h-16 bg-slate-100 rounded overflow-hidden">
                  <Image
                    src={sizePromptProduct.images[0]}
                    alt={sizePromptProduct.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#241A14]">{sizePromptProduct.brand}</h4>
                  <p className="text-xs text-[#EA580C] font-black">
                    {currencySymbol}{sizePromptProduct.discountPrice}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 py-2 flex-wrap">
                {sizePromptProduct.sizes.map(({ size, stock }) => {
                  const isSelected =
                    (selectedSizes[sizePromptProduct.id] || sizePromptProduct.sizes[0]?.size) === size;
                  return (
                    <button
                      key={size}
                      disabled={stock === 0}
                      onClick={() =>
                        setSelectedSizes((prev) => ({
                          ...prev,
                          [sizePromptProduct.id]: size,
                        }))
                      }
                      className={`w-10 h-10 rounded-full font-bold text-xs border ${
                        isSelected
                          ? 'border-[#EA580C] text-[#EA580C] bg-[#FFF7ED]'
                          : 'border-[#EFE6D8] bg-white text-[#241A14]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handleMoveToBag(sizePromptProduct)}
                className="mt-6 w-full bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-black text-xs py-3 rounded uppercase tracking-wider transition shadow-sm"
              >
                DONE & ADD TO BAG
              </button>
            </div>
          </div>
        )}
      </div>
    </LenisScroll>
  );
}
