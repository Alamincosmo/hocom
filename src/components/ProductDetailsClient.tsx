'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  X,
  MapPin,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import LenisScroll from '@/components/LenisScroll';
import SizeChartModal from '@/components/SizeChartModal';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const {
    cart,
    addToCart,
    toggleWishlist,
    isInWishlist,
    currencySymbol,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Delivery pincode checker
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<{
    date: string;
    cod: boolean;
  } | null>(null);

  const reviewsSectionRef = useRef<HTMLDivElement>(null);

  // Reviews Helpful Votes State
  const [reviewVotes, setReviewVotes] = useState<Record<string, { likes: number; dislikes: number; userVote: 'like' | 'dislike' | null }>>({
    'rev-1': { likes: 24, dislikes: 1, userVote: null },
    'rev-2': { likes: 18, dislikes: 0, userVote: null },
    'rev-3': { likes: 11, dislikes: 2, userVote: null },
  });

  const handleVote = (revId: string, type: 'like' | 'dislike') => {
    setReviewVotes((prev) => {
      const current = prev[revId] || { likes: 0, dislikes: 0, userVote: null };
      if (current.userVote === type) {
        return {
          ...prev,
          [revId]: {
            likes: type === 'like' ? current.likes - 1 : current.likes,
            dislikes: type === 'dislike' ? current.dislikes - 1 : current.dislikes,
            userVote: null,
          },
        };
      }
      return {
        ...prev,
        [revId]: {
          likes: type === 'like' ? current.likes + 1 : current.userVote === 'like' ? current.likes - 1 : current.likes,
          dislikes: type === 'dislike' ? current.dislikes + 1 : current.userVote === 'dislike' ? current.dislikes - 1 : current.dislikes,
          userVote: type,
        },
      };
    });
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted && isInWishlist(product.id);
  const isAlreadyInCart = mounted && cart.some(
    (item) => item.productId === product.id && item.selectedSize === selectedSize
  );
  const activeCurrencySymbol = mounted ? currencySymbol : '৳';

  const handleAddCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 800);
      return;
    }
    addToCart(product, selectedSize, 1);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      };
      setDeliveryResult({
        date: date.toLocaleDateString('en-US', options),
        cod: true,
      });
    }
  };

  const scrollToReviews = () => {
    reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rich Catalog Recommendations: same category first, followed by remaining catalog items (always 8+ items)
  const similarProducts = useMemo(() => {
    const sameCat = MOCK_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    const otherCats = MOCK_PRODUCTS.filter(
      (p) => p.category !== product.category && p.id !== product.id
    );
    return [...sameCat, ...otherCats].slice(0, 8);
  }, [product.category, product.id]);

  // Single featured primary image of the product
  const primaryImage = product.images?.[0] || '/cat-topwear.webp';

  return (
    <LenisScroll>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 pt-4 pb-28 lg:pt-8 lg:pb-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#7A6B5F] mb-3 sm:mb-6 overflow-x-auto scrollbar-none whitespace-nowrap">
            <Link href="/" className="hover:text-[#2E241E] transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/products" className="hover:text-[#2E241E] transition">Products</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/products?category=${product.category}`} className="hover:text-[#2E241E] transition">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold text-[#2E241E] truncate max-w-xs">{product.brand}</span>
          </nav>

          {/* Main PDP Layout: Proportioned 1:1 Image with Subtle Curved Details Overlay */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 items-start">
            
            {/* ======================================================== */}
            {/* LEFT: PRODUCT IMAGE (Fixed 1:1 Ratio, Symmetrical Centering, Clean Stage) */}
            {/* ======================================================== */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
              <div
                onClick={() => setFullscreenImage(primaryImage)}
                className="group relative aspect-[1/1] sm:aspect-[4/5] lg:aspect-[4/4.75] w-full max-w-full lg:max-w-[440px] lg:max-h-[520px] bg-[#F7F5F0] lg:bg-white rounded-xl sm:rounded-2xl overflow-hidden cursor-zoom-in border border-[#ECE7DF] lg:border-0 shadow-2xs lg:shadow-none flex items-center justify-center"
              >
                <Image
                  src={primaryImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-center p-3 sm:p-5 transition-transform duration-500 ease-out group-hover:scale-103 drop-shadow-sm"
                />
                
                {/* Maximize Icon */}
                <div className="absolute top-3.5 right-3.5 bg-black/35 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* RIGHT: DETAILS SHEET (Subtle 14px Radius, Flush with Edges, Clean Border) */}
            {/* ======================================================== */}
            <div className="lg:col-span-7 -mt-3.5 sm:-mt-4 lg:mt-0 relative z-10 bg-white rounded-t-[14px] sm:rounded-t-2xl lg:rounded-none p-4 sm:p-6 lg:p-0 border-t border-[#EAE6DF] lg:border-t-0 shadow-[0_-3px_12px_rgba(0,0,0,0.03)] lg:shadow-none space-y-6">
              
              {/* Brand & Title (Semi-Dark Colors) */}
              <div className="border-b border-[#EFE8DD] pb-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E241E] tracking-tight uppercase">
                  {product.brand}
                </h1>
                <p className="text-base text-[#6E5E53] mt-1 font-normal">
                  {product.title}
                </p>

                {/* Rating Display */}
                <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((starIdx) => {
                      const full = starIdx <= Math.floor(product.rating);
                      const half = !full && starIdx === Math.ceil(product.rating) && product.rating % 1 !== 0;

                      if (full) {
                        return (
                          <Star key={starIdx} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                        );
                      }
                      if (half) {
                        return (
                          <div key={starIdx} className="relative w-4 h-4 inline-block">
                            <Star className="w-4 h-4 fill-transparent text-[#D1D5DB]" />
                            <div className="absolute inset-0 overflow-hidden w-[50%]">
                              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                            </div>
                          </div>
                        );
                      }
                      return (
                        <Star key={starIdx} className="w-4 h-4 fill-transparent text-[#D1D5DB]" />
                      );
                    })}
                  </div>

                  <span className="text-sm font-bold text-[#2E241E]">
                    {product.rating.toFixed(1)}
                  </span>

                  <button
                    onClick={scrollToReviews}
                    className="text-xs text-[#7A6B5F] hover:text-[#EA580C] underline decoration-[#DECFC0] hover:decoration-[#EA580C] underline-offset-4 font-medium transition-colors cursor-pointer"
                  >
                    ({product.reviewCount.toLocaleString()} Reviews)
                  </button>
                </div>
              </div>

              {/* Price Details */}
              <div className="border-b border-[#EFE8DD] pb-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-[32px] sm:text-[36px] font-black text-[#EA580C] tracking-tight leading-none">
                    {activeCurrencySymbol}{product.discountPrice}
                  </span>
                  <span className="text-[13px] sm:text-sm text-[#8C7A6D] line-through italic font-normal">
                    MRP {activeCurrencySymbol}{product.basePrice}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#D97706]">
                    ({product.discountPercent}% OFF)
                  </span>
                </div>
                <p className="text-[12px] font-semibold text-[#10B981] mt-1.5">
                  inclusive of all taxes
                </p>
              </div>

              {/* ======================================================== */}
              {/* SPECIFICATIONS & PRODUCT DETAILS (Directly below price line with generous spacing) */}
              {/* Fabric, Fit, Pattern, Wash Care in Semi-Dark Tone */}
              {/* ======================================================== */}
              <div className="pt-2 pb-5 border-b border-[#EFE8DD]">
                <h3 className="font-bold text-[11px] sm:text-xs text-[#7A6B5F] uppercase tracking-wider mb-4">
                  PRODUCT DETAILS & SPECIFICATIONS
                </h3>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
                  <div className="border-b border-[#F4EFE6] pb-2">
                    <span className="text-[#8C7B6E] block text-[11px] mb-0.5 font-medium">Fabric</span>
                    <span className="font-semibold text-[#3D312A] text-[13px]">{product.specifications.fabric}</span>
                  </div>
                  <div className="border-b border-[#F4EFE6] pb-2">
                    <span className="text-[#8C7B6E] block text-[11px] mb-0.5 font-medium">Fit</span>
                    <span className="font-semibold text-[#3D312A] text-[13px]">{product.specifications.fit}</span>
                  </div>
                  <div className="border-b border-[#F4EFE6] pb-2">
                    <span className="text-[#8C7B6E] block text-[11px] mb-0.5 font-medium">Pattern</span>
                    <span className="font-semibold text-[#3D312A] text-[13px]">{product.specifications.pattern}</span>
                  </div>
                  <div className="border-b border-[#F4EFE6] pb-2">
                    <span className="text-[#8C7B6E] block text-[11px] mb-0.5 font-medium">Wash Care</span>
                    <span className="font-semibold text-[#3D312A] text-[13px]">{product.specifications.washCare}</span>
                  </div>
                  {product.specifications.neckType && (
                    <div className="border-b border-[#F4EFE6] pb-2">
                      <span className="text-[#8C7B6E] block text-[11px] mb-0.5 font-medium">Neck Type</span>
                      <span className="font-semibold text-[#3D312A] text-[13px]">{product.specifications.neckType}</span>
                    </div>
                  )}
                  {product.specifications.sleeveLength && (
                    <div className="border-b border-[#F4EFE6] pb-2">
                      <span className="text-[#8C7B6E] block text-[11px] mb-0.5 font-medium">Sleeve Length</span>
                      <span className="font-semibold text-[#3D312A] text-[13px]">{product.specifications.sleeveLength}</span>
                    </div>
                  )}
                </div>

                {/* ======================================================== */}
                {/* DELIGHT & TRUST PERKS: 100% Original, Pay on Delivery, Free Shipping */}
                {/* Arranged neatly in order with Soft Green Accents */}
                {/* ======================================================== */}
                <div className="mt-4 pt-3.5 border-t border-[#F4EFE6] space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-[#3D312A]">
                    <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="font-medium text-[12px]">100% Original Products Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#3D312A]">
                    <RotateCcw className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="font-medium text-[12px]">Pay on Delivery available</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#3D312A]">
                    <Truck className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="font-medium text-[12px]">Free Shipping on orders above {activeCurrencySymbol}999</span>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* SELECT SIZE & ADD TO CART / WISHLIST (Positioned Lower Down) */}
              {/* ======================================================== */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#2E241E] uppercase tracking-wider">
                      SELECT SIZE
                    </span>
                    {sizeError && (
                      <span className="text-xs font-bold text-[#EA580C] animate-pulse">
                        Please pick a size first!
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSizeModalOpen(true)}
                    className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                  >
                    Size Chart &gt;
                  </button>
                </div>

                {/* Size Circular Buttons */}
                <div
                  className={`flex items-center gap-3 flex-wrap ${
                    sizeError ? 'animate-shake' : ''
                  }`}
                >
                  {product.sizes.map(({ size, stock }) => {
                    const isSelected = selectedSize === size;
                    const isOutOfStock = stock === 0;

                    return (
                      <button
                        key={size}
                        disabled={isOutOfStock}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full font-bold text-xs flex flex-col items-center justify-center transition-all border cursor-pointer ${
                          isOutOfStock
                            ? 'border-slate-200 text-slate-300 bg-slate-50 line-through cursor-not-allowed'
                            : isSelected
                            ? 'border-[#EA580C] text-[#EA580C] bg-[#FFF7ED] ring-2 ring-[#EA580C]'
                            : 'border-[#EAE1D5] bg-white text-[#2E241E] hover:border-[#EA580C] hover:text-[#EA580C]'
                        }`}
                      >
                        <span>{size}</span>
                        {stock < 5 && stock > 0 && (
                          <span className="text-[8px] text-[#EA580C] font-semibold -mt-0.5">
                            {stock} left
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Primary Action Buttons: ADD TO CART and WISHLIST (Desktop view) */}
                <div className="hidden lg:grid grid-cols-2 gap-3.5 pt-3">
                  {isAlreadyInCart ? (
                    <Link
                      href="/checkout/bag"
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm py-3.5 sm:py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>GO TO CART</span>
                    </Link>
                  ) : (
                    <button
                      onClick={handleAddCart}
                      className="w-full bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-bold text-sm py-3.5 sm:py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>ADD TO CART</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-full font-bold text-sm py-3.5 sm:py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      inWishlist
                        ? 'border-[#EA580C] bg-[#FFF7ED] text-[#EA580C]'
                        : 'border-[#EAE1D5] bg-white text-[#2E241E] hover:border-[#EA580C]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#EA580C] text-[#EA580C]' : ''}`} />
                    <span>{inWishlist ? 'WISHLISTED' : 'WISHLIST'}</span>
                  </button>
                </div>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="border-t border-[#EFE8DD] pt-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2E241E] uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-[#EA580C]" />
                  <span>CHECK DELIVERY TIMELINE</span>
                </div>

                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter postal code / pincode"
                      className="w-full border border-[#EAE1D5] bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#2E241E] font-medium focus:border-[#EA580C] focus:outline-hidden"
                    />
                    <MapPin className="w-4 h-4 text-[#9C8A7C] absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#2E241E] hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider transition cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {deliveryResult && (
                  <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-xs space-y-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 text-[#059669] font-bold">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span>Estimated delivery by {deliveryResult.date}</span>
                    </div>
                    <p className="text-[#5A4D43] text-[11px]">
                      • Pay on delivery (Cash / bKash) available
                    </p>
                    <p className="text-[#5A4D43] text-[11px]">
                      • Easy 14 days return & exchange policy
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* CUSTOMER REVIEWS SECTION: LEFT-ALIGNED WITH THIN SOFT BORDERS */}
          {/* ======================================================== */}
          <div ref={reviewsSectionRef} className="mt-16 border-t border-[#EFE8DD] pt-10">
            <div className="mb-8 text-left">
              <h2 className="text-xl font-bold text-[#2E241E] uppercase tracking-tight">
                RATINGS & CUSTOMER REVIEWS
              </h2>
              <p className="text-xs text-[#7A6B5F] mt-0.5">
                Verified buyers sharing honest fitting and fabric feedback
              </p>
            </div>

            {/* Overall Rating Breakdown Box - Left Aligned, Soft Golden/Orange, Borderless */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 bg-[#FFF7ED] p-6 rounded-2xl border-0 shadow-none text-left max-w-3xl mr-auto">
              <div className="flex flex-col items-start justify-center text-left border-b md:border-b-0 md:border-r border-[#F3E2CF] pb-4 md:pb-0 pr-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-5xl font-black text-[#2E241E]">{product.rating}</span>
                  <Star className="w-7 h-7 fill-[#F59E0B] text-[#F59E0B]" />
                </div>
                <span className="text-xs text-[#7A6B5F] font-medium mt-1.5">
                  Based on {product.reviewCount.toLocaleString()} verified reviews
                </span>
              </div>

              {/* Star breakdown bars */}
              <div className="md:col-span-2 space-y-2 text-xs">
                {[
                  { star: 5, pct: 72 },
                  { star: 4, pct: 18 },
                  { star: 3, pct: 6 },
                  { star: 2, pct: 2 },
                  { star: 1, pct: 2 },
                ].map(({ star, pct }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-8 font-bold text-[#2E241E] flex items-center gap-0.5">
                      {star} <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                    </span>
                    <div className="flex-1 h-2 bg-[#F3E4D3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#EA580C] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-[11px] text-[#7A6B5F] font-medium">
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Customer Reviews - Soft Golden/Orange, Borderless, Left Aligned, No Verified Badge */}
            <div className="mt-8 space-y-4">
              {[
                {
                  id: 'rev-1',
                  name: 'Sadia Afrin',
                  avatarBg: 'bg-[#FED7AA] text-[#C2410C] border-[#FDBA74]',
                  rating: 5,
                  date: '14 Oct 2026',
                  reviewText: 'পিওর কটন ফেব্রিক এবং ফিনিশিং অসাধারণ! সাইজ সম্পূর্ণ একুরেট হয়েছে। গরমের দিনে পরার জন্য খুবই আরামদায়ক এবং কালার একদম ছবির মতোই। ২ দিনের মধ্যে ডেলিভারি পেয়েছি।',
                },
                {
                  id: 'rev-2',
                  name: 'Tanvir Hasan',
                  avatarBg: 'bg-[#FED7AA] text-[#C2410C] border-[#FDBA74]',
                  rating: 5,
                  date: '02 Oct 2026',
                  reviewText: 'প্রোডাক্টের কোয়ালিটি ছবির চেয়েও বাস্তবে বেশি প্রিমিয়াম লেগেছে। স্টিচিং খুব মজবুত এবং ওয়াশের পর কোনো কালার ফেইড হয়নি। ১০০% রেকমেন্ডেড!',
                },
                {
                  id: 'rev-3',
                  name: 'Anik Chowdhury',
                  avatarBg: 'bg-[#FED7AA] text-[#C2410C] border-[#FDBA74]',
                  rating: 4,
                  date: '28 Sep 2026',
                  reviewText: 'ফিটিং বেশ চমৎকার হয়েছে। ফেব্রিক সফট ও লাইটওয়েট। প্যাকেজিংটাও খুব কেয়ারফুলি করা হয়েছিল। পরবর্তী শপিংয়ে আবার অর্ডার করার ইচ্ছে আছে।',
                },
              ].map((rev) => {
                const feedback = reviewVotes[rev.id] || { likes: 0, dislikes: 0, userVote: null };
                const initial = rev.name.charAt(0);

                return (
                  <div
                    key={rev.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F2] border-0 shadow-none text-left max-w-3xl mr-auto"
                  >
                    {/* Header: Avatar + Name + Stars */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${rev.avatarBg}`}
                      >
                        {initial}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[13.5px] text-[#2E241E] leading-tight">
                          {rev.name}
                        </h4>

                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating
                                    ? 'fill-[#F59E0B] text-[#F59E0B]'
                                    : 'fill-transparent text-[#D1D5DB]'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-[#8C7B6E] font-medium ml-1">
                            {rev.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Review Text */}
                    <p className="text-[12.5px] sm:text-[13px] text-[#4A3D34] mt-2.5 leading-relaxed font-sans pl-0 sm:pl-[48px]">
                      {rev.reviewText}
                    </p>

                    {/* Helpful Vote Buttons */}
                    <div className="mt-3 pt-2.5 border-t border-[#F6ECE0] flex items-center justify-end gap-2">
                      <span className="text-[11px] text-[#8C7B6E] font-medium hidden sm:inline">
                        এই রিভিউটি কি সহায়ক ছিল?
                      </span>

                      {/* Like Button */}
                      <button
                        type="button"
                        onClick={() => handleVote(rev.id, 'like')}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer active:scale-95 ${
                          feedback.userVote === 'like'
                            ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                            : 'bg-white hover:bg-[#FAF6F0] text-[#5A4D43] border-[#E8DFD3]'
                        }`}
                        title="সহায়ক"
                      >
                        <ThumbsUp className={`w-3 h-3 ${feedback.userVote === 'like' ? 'fill-[#10B981]' : ''}`} />
                        <span>{feedback.likes}</span>
                      </button>

                      {/* Dislike Button */}
                      <button
                        type="button"
                        onClick={() => handleVote(rev.id, 'dislike')}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer active:scale-95 ${
                          feedback.userVote === 'dislike'
                            ? 'bg-rose-50 text-rose-700 border-rose-300'
                            : 'bg-white hover:bg-[#FAF6F0] text-[#5A4D43] border-[#E8DFD3]'
                        }`}
                        title="সহায়ক নয়"
                      >
                        <ThumbsDown className={`w-3 h-3 ${feedback.userVote === 'dislike' ? 'fill-rose-600' : ''}`} />
                        <span>{feedback.dislikes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Centered 'See more' Button */}
            <div className="mt-8 text-center flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF6F0] text-[#3D312A] hover:text-[#1E1815] border border-[#DDD3C5] font-semibold text-xs sm:text-[13px] px-8 py-2.5 rounded-xl shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>See more</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8C7B6E]" />
              </button>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-12 sm:mt-16 border-t border-[#EFE8DD] pt-8 sm:pt-10">
              <h2 className="text-lg sm:text-xl font-bold text-[#2E241E] uppercase tracking-tight mb-4 sm:mb-6">
                SIMILAR PRODUCTS YOU MAY LIKE
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />
        <Toast />

        <SizeChartModal
          isOpen={sizeModalOpen}
          onClose={() => setSizeModalOpen(false)}
          category={product.category}
        />

        {fullscreenImage && (
          <div
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 text-white p-2 bg-black/50 hover:bg-black rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-2xl aspect-[3/4] max-h-[85vh]">
              <Image
                src={fullscreenImage}
                alt="Enlarged Fashion View"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MOBILE STICKY BOTTOM ACTION BAR */}
        {/* Wishlist on Left (compact icon button), Add to Cart on Right (full width) */}
        {/* ======================================================== */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE1D5] p-3 px-4 flex items-center gap-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          {/* Wishlist Button - Smaller size on Left */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-95 ${
              inWishlist
                ? 'border-[#EA580C] bg-[#FFF7ED] text-[#EA580C]'
                : 'border-[#EAE1D5] bg-white text-[#2E241E] hover:border-[#EA580C]'
            }`}
            title={inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#EA580C] text-[#EA580C]' : 'text-[#2E241E]'}`} />
          </button>

          {/* Add to Cart Button - Full Width on Right */}
          {isAlreadyInCart ? (
            <Link
              href="/checkout/bag"
              className="flex-1 h-12 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>GO TO CART</span>
            </Link>
          ) : (
            <button
              onClick={handleAddCart}
              className="flex-1 h-12 bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-bold text-xs sm:text-sm rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>ADD TO CART</span>
            </button>
          )}
        </div>
      </div>
    </LenisScroll>
  );
}