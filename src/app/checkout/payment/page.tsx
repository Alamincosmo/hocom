'use client';

import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Banknote,
  Smartphone,
  CreditCard,
  Building,
  ShieldCheck,
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Clock,
} from 'lucide-react';
import CheckoutHeader from '@/components/CheckoutHeader';
import Toast from '@/components/Toast';
import { useStore } from '@/store/useStore';

export default function PaymentPage() {
  const {
    cart,
    clearCart,
    addresses,
    selectedAddressId,
    appliedCoupon,
    couponDiscount,
    currencySymbol,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BKASH' | 'CARD' | 'NETBANKING'>('COD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const totalSellingPrice = cart.reduce(
    (acc, item) => acc + item.product.discountPrice * item.quantity,
    0
  );
  const platformFee = cart.length > 0 ? 20 : 0;
  const shippingFee = totalSellingPrice > 999 || cart.length === 0 ? 0 : 70;
  const finalTotal = Math.max(
    0,
    totalSellingPrice - couponDiscount + platformFee + shippingFee
  );

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `HOC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderSuccess(true);
      clearCart();

      // Trigger Confetti Celebration with Golden Orange colors
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#EA580C', '#D97706', '#F59E0B', '#241A14', '#FEF3C7'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF8]">
        <CheckoutHeader currentStep="PAYMENT" />

        <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-center w-full">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#059669] mb-5 shadow-lg">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#059669] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Placed Successfully
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-[#241A14] mt-3 uppercase tracking-tight">
            Thank you for shopping with Hocom!
          </h1>
          <p className="text-xs text-[#6B5D52] mt-1 font-medium">
            Order Confirmation ID: <strong className="text-[#241A14] font-mono">{orderId}</strong>
          </p>

          {/* Delivery & Timeline Card */}
          <div className="mt-8 bg-[#FAF4EB] border border-[#EFE6D8] rounded-2xl p-6 text-left space-y-6">
            <div>
              <h3 className="font-black text-xs text-[#241A14] uppercase tracking-wider mb-2">
                Delivering to:
              </h3>
              <p className="text-xs text-[#241A14] font-bold">{selectedAddress?.fullName}</p>
              <p className="text-xs text-[#6B5D52]">
                {selectedAddress?.streetAddress}, {selectedAddress?.locality}, {selectedAddress?.city} - {selectedAddress?.pincode}
              </p>
              <p className="text-xs text-[#6B5D52] mt-1">Mobile: {selectedAddress?.mobile}</p>
            </div>

            {/* Tracking timeline */}
            <div className="border-t border-[#EFE6D8] pt-5">
              <h3 className="font-black text-xs text-[#241A14] uppercase tracking-wider mb-4">
                Order Tracking Timeline
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold mb-1 shadow-sm">
                    ✓
                  </div>
                  <span className="font-bold text-[#241A14]">Ordered</span>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold mb-1">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#6B5D52]">Packed</span>
                  <span className="text-[10px] text-slate-400">Tomorrow</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold mb-1">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#6B5D52]">Shipped</span>
                  <span className="text-[10px] text-slate-400">In 2 days</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold mb-1">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#6B5D52]">Delivered</span>
                  <span className="text-[10px] text-slate-400">Wed, Nov 12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-black text-xs px-8 py-3.5 rounded-md uppercase tracking-wider shadow-md hover:shadow-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF8]">
      <CheckoutHeader currentStep="PAYMENT" />

      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Payment Options Tabs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-black text-sm text-[#241A14] uppercase tracking-wider pb-3 border-b border-[#EFE6D8]">
              Choose Payment Mode
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 border border-[#EFE6D8] rounded-xl overflow-hidden bg-white text-xs shadow-2xs">
              {/* Vertical / Horizontal Tabs */}
              <div className="sm:col-span-1 bg-[#FAF4EB] border-b sm:border-b-0 sm:border-r border-[#EFE6D8] flex sm:flex-col divide-y divide-[#EFE6D8]">
                <button
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3.5 text-left font-bold transition flex items-center gap-2 ${
                    paymentMethod === 'COD'
                      ? 'bg-white text-[#EA580C] border-l-4 border-l-[#EA580C]'
                      : 'text-[#6B5D52] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Banknote className="w-4 h-4 shrink-0" />
                  <span>Cash on Delivery</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('BKASH')}
                  className={`p-3.5 text-left font-bold transition flex items-center gap-2 ${
                    paymentMethod === 'BKASH'
                      ? 'bg-white text-[#EA580C] border-l-4 border-l-[#EA580C]'
                      : 'text-[#6B5D52] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 shrink-0 text-[#EA580C]" />
                  <span>bKash / Nagad</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3.5 text-left font-bold transition flex items-center gap-2 ${
                    paymentMethod === 'CARD'
                      ? 'bg-white text-[#EA580C] border-l-4 border-l-[#EA580C]'
                      : 'text-[#6B5D52] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('NETBANKING')}
                  className={`p-3.5 text-left font-bold transition flex items-center gap-2 ${
                    paymentMethod === 'NETBANKING'
                      ? 'bg-white text-[#EA580C] border-l-4 border-l-[#EA580C]'
                      : 'text-[#6B5D52] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Building className="w-4 h-4 shrink-0" />
                  <span>Net Banking / UPI</span>
                </button>
              </div>

              {/* Tab Content Panel */}
              <div className="sm:col-span-3 p-6 space-y-4">
                {paymentMethod === 'COD' && (
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-[#241A14]">
                      Cash on Delivery (Cash / POS on Doorstep)
                    </h4>
                    <p className="text-xs text-[#6B5D52]">
                      You can pay via Cash, bKash, or POS Card machine to the courier delivery executive upon receiving the parcel.
                    </p>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-[#059669] font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Zero advance payment needed. 100% buyer protection guarantee.</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'BKASH' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#EA580C] text-white font-black text-sm flex items-center justify-center">
                        bK
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#241A14]">
                          Instant Mobile Wallet (bKash / Nagad)
                        </h4>
                        <p className="text-xs text-[#6B5D52]">Direct merchant gateway payment</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#241A14]">
                        Enter Your Mobile Banking Number
                      </label>
                      <input
                        type="tel"
                        placeholder="017XXXXXXXX"
                        className="w-full border border-[#EFE6D8] bg-[#FAF4EB] rounded p-2.5 text-xs font-mono font-bold focus:border-[#EA580C] focus:outline-hidden"
                      />
                      <span className="text-[11px] text-[#6B5D52] block">
                        A secure OTP verification popup will open on clicking Pay.
                      </span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'CARD' && (
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-[#241A14]">
                      Credit / Debit Card (Visa, Mastercard, Amex)
                    </h4>
                    <input
                      type="text"
                      placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                      className="w-full border border-[#EFE6D8] bg-[#FAF4EB] rounded p-2.5 text-xs font-mono focus:border-[#EA580C] focus:outline-hidden"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="border border-[#EFE6D8] bg-[#FAF4EB] rounded p-2.5 text-xs font-mono focus:border-[#EA580C] focus:outline-hidden"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        className="border border-[#EFE6D8] bg-[#FAF4EB] rounded p-2.5 text-xs font-mono focus:border-[#EA580C] focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'NETBANKING' && (
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-sm text-[#241A14]">
                      Net Banking & UPI
                    </h4>
                    <p className="text-xs text-[#6B5D52]">
                      Supports all major partner banks (City Bank, BRAC, Eastern Bank, HDFC, ICICI, SBI).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Payment Amount & Confirm Button (5 cols) */}
          <div className="lg:col-span-5 border border-[#EFE6D8] rounded-xl p-5 bg-white shadow-2xs space-y-4 text-xs">
            <h4 className="font-black text-[12px] text-[#241A14] uppercase tracking-wider border-b border-[#EFE6D8] pb-2">
              PRICE BREAKDOWN
            </h4>

            <div className="space-y-2 text-[#6B5D52]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#241A14]">{currencySymbol}{totalSellingPrice}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#059669]">
                  <span>Coupon Discount</span>
                  <span className="font-bold">- {currencySymbol}{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Convenience / Platform Fee</span>
                <span className="font-bold text-[#241A14]">{currencySymbol}{platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Delivery</span>
                <span className="font-bold text-[#059669]">
                  {shippingFee === 0 ? 'FREE' : `${currencySymbol}${shippingFee}`}
                </span>
              </div>
            </div>

            <div className="border-t border-[#EFE6D8] pt-3 flex justify-between font-black text-sm text-[#241A14]">
              <span>Amount to Pay</span>
              <span className="text-base text-[#EA580C]">
                {currencySymbol}{finalTotal}
              </span>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-black text-sm py-3.5 rounded-md uppercase tracking-wider shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isProcessing ? 'Processing Secure Order...' : 'PAY NOW / CONFIRM ORDER'}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>Safe & Secure 256-bit SSL Encrypted Payments</span>
            </div>
          </div>
        </div>
      </main>

      <Toast />
    </div>
  );
}
