'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  Layers,
  Shirt,
  Crown,
  Smile,
  Droplets,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';

type TabKey = 'ALL' | 'MEN' | 'WOMEN' | 'KIDS' | 'BEAUTY';

const CATEGORY_TABS: { key: TabKey; label: string; icon: typeof Layers }[] = [
  { key: 'ALL', label: 'সকল কালেকশন', icon: Layers },
  { key: 'MEN', label: 'মেনস', icon: Shirt },
  { key: 'WOMEN', label: 'ওমেনস', icon: Crown },
  { key: 'KIDS', label: 'কিডস', icon: Smile },
  { key: 'BEAUTY', label: 'বিউটি কেয়ার', icon: Droplets },
];

export default function TrendingNow() {
  const [activeTab, setActiveTab] = useState<TabKey>('ALL');

  const filtered = MOCK_PRODUCTS.filter((prod) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'BEAUTY') return prod.category === 'Beauty';
    return prod.gender === activeTab;
  }).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">
      {/* ======================================================== */}
      {/* TITLE ROW: Top Tag Badge, Main Title, Sub-Description */}
      {/* ======================================================== */}
      <div className="mb-5 sm:mb-6">
        {/* Subtle Tag Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF5EB] border border-[#FDBA74]/50 text-[#EA580C] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2 sm:mb-3">
          <Flame className="w-3.5 h-3.5 fill-[#EA580C] text-[#EA580C]" />
          <span>এডিটর্স পিক ২০২৬</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-[#1E1815] tracking-tight leading-tight flex items-baseline gap-2 flex-wrap">
          <span>TRENDING NOW</span>
          <span
            style={{ fontFamily: 'var(--font-display), "Cormorant Garamond", Georgia, serif' }}
            className="text-[#EA580C] font-normal italic text-xl sm:text-2xl md:text-3xl"
          >
            — দ্য কিউরেটেড এডিট
          </span>
        </h2>

        <p className="text-xs sm:text-[13.5px] text-[#78695C] font-medium mt-1.5 leading-relaxed max-w-2xl">
          শীর্ষ ফ্যাশন এডিটর ও স্টাইলিস্টদের নির্বাচিত চলতি সপ্তাহের সেরা ট্রেন্ডিং পোশাক ও অ্যাক্সেসরিজ।
        </p>
      </div>

      {/* ======================================================== */}
      {/* FILTER CAPSULES: Fixed Left & Top Clipping with Padding Space */}
      {/* ======================================================== */}
      <div className="pt-2 pb-6 sm:pb-8 border-b border-[#EAE2D7]">
        <div className="flex items-center gap-2 sm:gap-3.5 overflow-x-auto py-2.5 px-1 sm:px-3 -mx-1 sm:-mx-3 scrollbar-none">
          {CATEGORY_TABS.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`group relative inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-gradient-to-b from-[#EA580C] to-[#C2410C] text-white shadow-[0_4px_12px_rgba(234,88,12,0.32),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-[#C2410C] scale-102 -translate-y-0.5'
                    : 'bg-[#EDE7DE] hover:bg-[#E4DCD0] text-[#4A3D34] hover:text-[#1E1815] border border-[#DDD3C5] shadow-[0_2px_4px_rgba(30,24,21,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner'
                }`}
              >
                <Icon
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${
                    isActive ? 'text-[#FEF3C7]' : 'text-[#7D6E63] group-hover:text-[#EA580C]'
                  }`}
                />
                <span className="tracking-wide">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4 Column Product Grid with Generous Upper Clearance from Filter Bar */}
      {/* ======================================================== */}
      <div className="pt-8 sm:pt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 sm:gap-x-5 gap-y-6 sm:gap-y-10 lg:gap-x-6 lg:gap-y-12">
        {filtered.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {/* View Full Catalog CTA - Soft Gray, No Shadow, Rounded-10px, Bold Text & Bold Arrow */}
      <div className="mt-14 sm:mt-18 text-center">
        <Link
          href="/products"
          className="group inline-flex items-center gap-2.5 bg-[#E8E2D9] hover:bg-[#DDD6CB] text-[#2D231C] hover:text-[#1E1815] font-sans font-bold text-xs sm:text-[13px] px-7 py-3 rounded-[10px] shadow-none border border-[#D5CCC0] transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          <span>সম্পূর্ণ ক্যাটালগ দেখুন (২০+ আইটেম)</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#2D231C] group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
}