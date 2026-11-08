'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, CheckCircle2, Home, Briefcase, ArrowRight } from 'lucide-react';
import CheckoutHeader from '@/components/CheckoutHeader';
import Toast from '@/components/Toast';
import { useStore } from '@/store/useStore';
import { Address } from '@/types';

export default function AddressPage() {
  const router = useRouter();
  const {
    cart,
    addresses,
    selectedAddressId,
    setSelectedAddress,
    addAddress,
    couponDiscount,
    currencySymbol,
  } = useStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    streetAddress: '',
    locality: '',
    city: 'Dhaka',
    state: 'Dhaka Division',
    type: 'HOME' as 'HOME' | 'WORK',
  });

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.streetAddress) return;
    addAddress({
      ...formData,
      isDefault: false,
    });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF8]">
      <CheckoutHeader currentStep="ADDRESS" />

      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Saved Addresses & Add New (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE6D8]">
              <h2 className="font-black text-sm text-[#241A14] uppercase tracking-wider">
                Select Delivery Address
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1 uppercase"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Add Address Form Modal / Accordion */}
            {showAddForm && (
              <form
                onSubmit={handleFormSubmit}
                className="p-5 border border-[#FDBA74] rounded-xl bg-[#FFF7ED] space-y-3.5 text-xs animate-fadeIn"
              >
                <h4 className="font-extrabold text-xs text-[#241A14] uppercase">
                  Add Delivery Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B5D52] mb-1 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Asif Mahmud"
                      className="w-full bg-white border border-[#EFE6D8] rounded p-2 text-xs focus:border-[#EA580C] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B5D52] mb-1 font-semibold">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 01711223344"
                      className="w-full bg-white border border-[#EFE6D8] rounded p-2 text-xs focus:border-[#EA580C] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B5D52] mb-1 font-semibold">Pincode / Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="e.g. 1212"
                      className="w-full bg-white border border-[#EFE6D8] rounded p-2 text-xs focus:border-[#EA580C] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B5D52] mb-1 font-semibold">Locality / Area *</label>
                    <input
                      type="text"
                      required
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="e.g. Banani / Gulshan"
                      className="w-full bg-white border border-[#EFE6D8] rounded p-2 text-xs focus:border-[#EA580C] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B5D52] mb-1 font-semibold">Street Address / House / Road *</label>
                  <input
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    placeholder="e.g. House 14, Road 5, Block B"
                    className="w-full bg-white border border-[#EFE6D8] rounded p-2 text-xs focus:border-[#EA580C] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <span className="text-[#6B5D52] font-semibold">Type:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.type === 'HOME'}
                      onChange={() => setFormData({ ...formData, type: 'HOME' })}
                      className="accent-[#EA580C]"
                    />
                    <span>Home</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.type === 'WORK'}
                      onChange={() => setFormData({ ...formData, type: 'WORK' })}
                      className="accent-[#EA580C]"
                    />
                    <span>Office / Work</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#EA580C] to-[#D97706] text-white font-black px-6 py-2 rounded uppercase tracking-wider"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="border border-[#EFE6D8] px-4 py-2 rounded text-[#6B5D52]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Address Cards List */}
            <div className="space-y-3">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`border rounded-xl p-5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#EA580C] bg-[#FFF7ED]/50 shadow-xs ring-1 ring-[#EA580C]'
                        : 'border-[#EFE6D8] bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={isSelected}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="w-4 h-4 accent-[#EA580C] cursor-pointer"
                        />
                        <span className="font-extrabold text-sm text-[#241A14]">
                          {addr.fullName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FAF4EB] text-[#6B5D52]">
                          {addr.type === 'HOME' ? <Home className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          {addr.type}
                        </span>
                      </div>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          DEFAULT
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#6B5D52] mt-2 pl-6 space-y-0.5">
                      <p>{addr.streetAddress}, {addr.locality}</p>
                      <p>{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                      <p className="pt-1 text-[#241A14]">
                        Mobile: <strong>{addr.mobile}</strong>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Order Summary (5 cols) */}
          <div className="lg:col-span-5 border border-[#EFE6D8] rounded-xl p-5 bg-white shadow-2xs space-y-4 text-xs">
            <h4 className="font-black text-[12px] text-[#241A14] uppercase tracking-wider border-b border-[#EFE6D8] pb-2">
              DELIVERY ESTIMATES
            </h4>

            <div className="text-xs text-[#6B5D52] space-y-1">
              <p>Estimated Delivery: <strong className="text-[#059669]">Within 2-3 Business Days</strong></p>
              <p>Express Courier dispatch within 24 hours.</p>
            </div>

            <div className="border-t border-[#EFE6D8] pt-3 space-y-2">
              <div className="flex justify-between text-[#241A14]">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between text-[#241A14]">
                <span>Subtotal</span>
                <span>{currencySymbol}{totalSellingPrice}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#059669]">
                  <span>Coupon Savings</span>
                  <span>- {currencySymbol}{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm text-[#241A14] border-t border-[#EFE6D8] pt-2">
                <span>Total Payable</span>
                <span className="text-[#EA580C]">{currencySymbol}{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout/payment')}
              className="w-full bg-gradient-to-r from-[#EA580C] to-[#D97706] hover:from-[#C2410C] hover:to-[#B45309] text-white font-black text-sm py-3.5 rounded-md uppercase tracking-wider shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>CONTINUE TO PAYMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <Toast />
    </div>
  );
}
