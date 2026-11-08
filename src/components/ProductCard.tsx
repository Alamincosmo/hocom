'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Flame } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, currencySymbol } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted && isInWishlist(product.id);
  const activeCurrencySymbol = mounted ? currencySymbol : '৳';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Dedicated single product image (No hover image flip)
  const productImg = product.images?.[0] || '/cat-topwear.webp';
  const isCutout = productImg.includes('Photoroom') || productImg.includes('cat-');

  return (
    <div className="group relative w-full bg-[#FAF9F6] rounded-2xl overflow-hidden transition-all duration-300 border border-[#E8DFD3] shadow-[0_1.5px_0_0_#DECBB7,0_6px_16px_rgba(30,24,21,0.04)] hover:border-[#DECBB7] hover:shadow-[0_5px_0_0_#CFBCA8,0_16px_32px_rgba(30,24,21,0.09)] hover:-translate-y-1 flex flex-col cursor-pointer">
      <Link href={`/products/${product.id}`} className="block relative flex flex-col h-full w-full">
        {/* Product Image Stage: Stable, Single Hero Image with subtle zoom on hover */}
        <div
          className={`relative w-full aspect-[4/3.35] sm:aspect-[4/3.2] overflow-hidden flex items-center justify-center ${
            isCutout
              ? 'bg-gradient-to-b from-[#F7F2EA] via-[#F3EDE3] to-[#ECE3D5] p-2 sm:p-3'
              : 'bg-[#F2ECE3]'
          }`}
        >
          <Image
            src={productImg}
            alt={product.title}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`transition-transform duration-500 ease-out group-hover:scale-105 ${
              isCutout
                ? 'object-contain p-2 drop-shadow-[0_8px_16px_rgba(30,24,21,0.14)]'
                : 'object-cover object-center'
            }`}
          />

          {/* Minimalist Status Badge */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
            {product.isBestSeller && (
              <div className="flex items-center gap-1 bg-[#1E1815]/85 backdrop-blur-md text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border border-white/15 shadow-2xs">
                <Flame className="w-2.5 h-2.5 text-[#FDBA74] fill-[#FDBA74]" />
                <span>Trending</span>
              </div>
            )}
            {product.isNew && !product.isBestSeller && (
              <div className="bg-[#059669]/90 backdrop-blur-md text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border border-white/15 shadow-2xs">
                <span>New</span>
              </div>
            )}
          </div>

          {/* Floating Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-2 right-2 z-20 w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xs backdrop-blur-md border cursor-pointer ${
              inWishlist
                ? 'bg-white text-[#EA580C] border-[#EA580C]/30 scale-105 opacity-100 ring-2 ring-[#EA580C]/20'
                : 'bg-white/85 hover:bg-white text-[#4A3E36] hover:text-[#EA580C] border-black/5 hover:border-black/10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 active:scale-95'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform active:scale-75 ${
                inWishlist ? 'fill-[#EA580C] text-[#EA580C]' : 'stroke-[1.75]'
              }`}
            />
          </button>
        </div>

        {/* Details Section: Compact and Refined */}
        <div className="rounded-t-[14px] bg-[#FAF9F6] -mt-2.5 relative z-10 p-2 sm:p-3 flex flex-col justify-between flex-1">
          {/* Row 1: Brand & Color Swatches */}
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-0.5">
              <span className="text-[9.5px] sm:text-[10px] font-bold text-[#4B5563] tracking-[0.08em] uppercase truncate">
                {product.brand}
              </span>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1 shrink-0">
                  {product.colors.slice(0, 3).map((c, idx) => (
                    <span
                      key={idx}
                      style={{ backgroundColor: c }}
                      className="w-1.5 h-1.5 rounded-full border border-black/15 shadow-2xs"
                      title={`Color: ${c}`}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-[8.5px] text-[#4B5563] font-medium leading-none">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Row 2: Product Title */}
            <h3 className="text-[11px] sm:text-[12px] font-semibold text-[#1E1815] group-hover:text-[#EA580C] transition-colors truncate leading-tight">
              {product.title}
            </h3>

            {/* Row 3: 5-Star Rating (Stars placed BEFORE numeric rating; 5th star remains unfilled) */}
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= Math.min(Math.round(product.rating), 4);
                  return (
                    <Star
                      key={star}
                      className={`w-2.5 h-2.5 ${
                        isFilled
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'fill-transparent text-[#D1D5DB]'
                      }`}
                    />
                  );
                })}
              </div>

              <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#4B5563]">
                {product.rating.toFixed(1)}
              </span>

              <span className="text-[9.5px] sm:text-[10px] font-normal text-[#4B5563]">
                ({product.reviewCount > 999
                  ? `${(product.reviewCount / 1000).toFixed(1)}k`
                  : product.reviewCount})
              </span>
            </div>
          </div>

          {/* Divider Line with subtle spacing */}
          <div className="w-full h-px bg-[#EFE8DE] my-1.5 sm:my-2" />

          {/* Row 4: Price & Minimalist Soft Orange Discount Badge */}
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <div className="flex items-baseline gap-1">
              <span className="text-[13px] sm:text-[14.5px] font-black text-[#1E1815] tracking-tight">
                {activeCurrencySymbol}{product.discountPrice}
              </span>
              <span className="text-[10px] sm:text-[10.5px] text-[#4B5563] line-through font-normal">
                {activeCurrencySymbol}{product.basePrice}
              </span>
            </div>

            <span className="text-[9.5px] sm:text-[10px] font-semibold text-[#EA580C] bg-[#FFF7ED] px-1.5 py-0.5 rounded-xs tracking-wide">
              {product.discountPercent}% OFF
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
