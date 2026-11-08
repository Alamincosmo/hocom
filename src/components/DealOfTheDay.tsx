'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Flame, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = MOCK_PRODUCTS.filter((p) => p.discountPercent >= 50).slice(0, 4);

  return (
    <section className="bg-gradient-to-b from-[#FFF7ED] to-[#FDFBF8] py-14 border-y border-[#EFE6D8] my-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#F59E0B] text-white flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#241A14] tracking-tight uppercase">
                  DEAL OF THE DAY
                </h2>
                <span className="bg-[#EA580C] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase shadow-xs">
                  FLASH SALE
                </span>
              </div>
              <p className="text-xs text-[#6B5D52] font-medium mt-0.5">
                Top rated styles with minimum 50% discount. Limited inventory deals!
              </p>
            </div>
          </div>

          {/* Flash Timer Badge */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#EFE6D8] shadow-xs">
            <Clock className="w-4 h-4 text-[#EA580C]" />
            <span className="text-xs font-bold text-[#6B5D52] uppercase">Ends in:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-sm text-[#241A14]">
              <span className="bg-[#FAF4EB] px-1.5 py-0.5 rounded border border-[#EFE6D8]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-[#FAF4EB] px-1.5 py-0.5 rounded border border-[#EFE6D8]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-[#FAF4EB] px-1.5 py-0.5 rounded text-[#EA580C] border border-[#EFE6D8]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products?discount=50"
            className="inline-flex items-center gap-2 text-xs font-black text-[#EA580C] hover:text-[#C2410C] border-2 border-[#EA580C] bg-white hover:bg-[#FFF7ED] px-6 py-2.5 rounded uppercase tracking-wider transition shadow-xs"
          >
            <span>EXPLORE ALL FLASH DEALS</span>
            <ArrowRight className="w-4 h-4 text-[#EA580C]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
