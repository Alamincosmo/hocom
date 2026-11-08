'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Tag,
  X,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import CheckoutHeader from '@/components/CheckoutHeader';
import Toast from '@/components/Toast';
import { useStore } from '@/store/useStore';

export default function BagPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartQty,
    updateCartSize,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    currencySymbol,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  // Price calculations
  const totalMRP = cart.reduce(
    (acc, item) => acc + item.product.basePrice * item.quantity,
    0
  );
  const totalSellingPrice = cart.reduce(
    (acc, item) => acc + item.product.discountPrice * item.quantity,
    0
  );
  const discountOnMRP = totalMRP - totalSellingPrice;
  const platformFee = cart.length > 0 ? 20 : 0;
  const shippingFee = totalSellingPrice > 999 || cart.length === 0 ? 0 : 70;
  const finalTotal = Math.max(
    0,
    totalSellingPrice - couponDiscount + platformFee + shippingFee
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponStatus(res);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF8]">
      <CheckoutHeader currentStep="BAG" />

      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Bag Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Delivery Offer Banner */}
              <div className="bg-[#FFF7ED] border border-[#FDBA74] p-3.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#241A14] font-medium">
                  Deliver to: <strong>Dhaka - 1212</strong>
                </span>
                <span className="text-[#EA580C] font-black">Standard Express Delivery</span>
              </div>

              {/* Items Card List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="relative border border-[#EFE6D8] rounded-xl p-4 flex gap-4 bg-white shadow-2xs hover:shadow-xs transition"
                  >
                    {/* Remove Cross Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-[#EA580C] p-1"
                      title="Remove Item"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Image */}
                    <div className="relative w-24 h-32 bg-[#FAF4EB] rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover object-top"
                        sizes="96px"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h3 className="font-extrabold text-sm text-[#241A14] uppercase truncate">
                        {item.product.brand}
                      </h3>
                      <p className="text-xs text-[#6B5D52] truncate mt-0.5">
                        {item.product.title}
                      </p>

                      {/* Dropdowns for Size & Qty */}
                      <div className="flex items-center gap-3 mt-3">
                        {/* Size Dropdown */}
                        <div className="flex items-center gap-1 bg-[#FAF4EB] px-2.5 py-1 rounded-md text-xs font-bold text-[#241A14] border border-[#EFE6D8]">
                          <span className="text-[10px] text-[#6B5D52]">Size:</span>
                          <select
                            value={item.selectedSize}
                            onChange={(e) => updateCartSize(item.id, e.target.value)}
                            className="bg-transparent focus:outline-hidden cursor-pointer"
                          >
                            {item.product.sizes.map(({ size }) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Qty Dropdown */}
                        <div className="flex items-center gap-1 bg-[#FAF4EB] px-2.5 py-1 rounded-md text-xs font-bold text-[#241A14] border border-[#EFE6D8]">
                          <span className="text-[10px] text-[#6B5D52]">Qty:</span>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateCartQty(item.id, Number(e.target.value))}
                            className="bg-transparent focus:outline-hidden cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5].map((q) => (
                              <option key={q} value={q}>
                                {q}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="font-black text-sm text-[#EA580C]">
                          {currencySymbol}{item.product.discountPrice * item.quantity}
                        </span>
                        <span className="text-xs text-[#6B5D52] line-through">
                          {currencySymbol}{item.product.basePrice * item.quantity}
                        </span>
                        <span className="text-xs text-[#D97706] font-extrabold">
                          ({item.product.discountPercent}% OFF)
                        </span>
                      </div>

                      {/* Return Guarantee Note */}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#6B5D52] mt-2.5">
                        <RotateCcw className="w-3.5 h-3.5 text-[#059669]" />
                        <span><strong>14 days</strong> return available</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Coupons & Price Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Coupons Card */}
              <div className="border border-[#EFE6D8] rounded-xl p-4 bg-white shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#241A14] uppercase tracking-wider mb-3">
                  <Tag className="w-4 h-4 text-[#EA580C]" />
                  <span>APPLY COUPONS</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs">
                    <div>
                      <span className="font-extrabold text-[#059669] tracking-wider">
                        {appliedCoupon} APPLIED!
                      </span>
                      <p className="text-[11px] text-[#6B5D52] mt-0.5">
                        You saved {currencySymbol}{couponDiscount} with this code.
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-[#EA580C] hover:underline uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter coupon (e.g. HOCOM200)"
                        className="flex-1 uppercase border border-[#EFE6D8] bg-[#FAF4EB] rounded px-3 py-2 text-xs font-bold focus:border-[#EA580C] focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="bg-[#241A14] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider transition"
                      >
                        Apply
                      </button>
                    </div>
                    {couponStatus && (
                      <p
                        className={`text-[11px] font-bold ${
                          couponStatus.success ? 'text-[#059669]' : 'text-[#EA580C]'
                        }`}
                      >
                        {couponStatus.message}
                      </p>
                    )}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-[#6B5D52]">
                      <span>Quick coupon:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCouponInput('HOCOM200');
                          applyCoupon('HOCOM200');
                        }}
                        className="font-bold text-[#EA580C] underline"
                      >
                        HOCOM200
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Price Details */}
              <div className="border border-[#EFE6D8] rounded-xl p-5 bg-white shadow-2xs space-y-3.5 text-xs">
                <h4 className="font-black text-[12px] text-[#241A14] uppercase tracking-wider border-b border-[#EFE6D8] pb-2">
                  PRICE DETAILS ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
                </h4>

                <div className="flex justify-between text-[#241A14]">
                  <span>Total MRP</span>
                  <span>{currencySymbol}{totalMRP}</span>
                </div>

                <div className="flex justify-between text-[#059669]">
                  <span>Discount on MRP</span>
                  <span className="font-bold">- {currencySymbol}{discountOnMRP}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#059669]">
                    <span>Coupon Discount</span>
                    <span className="font-bold">- {currencySymbol}{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#241A14]">
                  <span>Platform Fee</span>
                  <span>{currencySymbol}{platformFee}</span>
                </div>

                <div className="flex justify-between text-[#241A14]">
                  <span>Shipping Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-[#059669]">FREE</strong>
                    ) : (
                      `${currencySymbol}${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="border-t border-[#EFE6D8] pt-3 flex justify-between font-black text-sm text-[#241A14]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#EA580C]">
                    {currencySymbol}{finalTotal}
                  </span>
                </div>

                <button
                  onClick={() => router.push('/checkout/address')}
                  className="w-full bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-black text-sm py-3.5 rounded-md uppercase tracking-wider shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-[#FAF4EB] rounded-2xl max-w-xl mx-auto p-8 border border-[#EFE6D8]">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto text-[#EA580C] mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-[#241A14] uppercase">
              HEY, YOUR SHOPPING BAG IS EMPTY!
            </h2>
            <p className="text-xs text-[#6B5D52] mt-2 max-w-sm mx-auto">
              There is nothing in your bag. Let&apos;s add some trendy items from today&apos;s collections.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-black text-xs uppercase px-8 py-3 rounded-md shadow-md transition"
            >
              <span>EXPLORE FASHION CATALOG</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      <Toast />
    </div>
  );
}
