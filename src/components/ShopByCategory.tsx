'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  image: string;
  link: string;
}

// 8 Curated Categories with High-Res Cutouts
const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-topwear',
    name: "Men's Topwear",
    count: '1,420+ Styles',
    image: '/cat-topwear.webp',
    link: '/products?category=Topwear&gender=MEN',
  },
  {
    id: 'cat-kurta',
    name: 'Ethnic & Festive',
    count: '890+ Styles',
    image: '/cat-kurta.webp',
    link: '/products?category=Ethnic+Wear',
  },
  {
    id: 'cat-saree',
    name: 'Royal Handlooms',
    count: '740+ Styles',
    image: '/cat-saree.webp',
    link: '/products?category=Ethnic+Wear&gender=WOMEN',
  },
  {
    id: 'cat-dress',
    name: 'Western Fits',
    count: '1,120+ Styles',
    image: '/cat-dress.webp',
    link: '/products?category=Dresses',
  },
  {
    id: 'cat-bag',
    name: 'Artisan Leather',
    count: '430+ Styles',
    image: '/cat-bag.webp',
    link: '/products?category=Accessories',
  },
  {
    id: 'cat-gadgets',
    name: 'Audio & Tech',
    count: '310+ Styles',
    image: '/cat-gadgets.webp',
    link: '/products?category=Accessories',
  },
  {
    id: 'cat-watch',
    name: 'Watches & Jewelry',
    count: '520+ Styles',
    image: '/cat-watch.webp',
    link: '/products?category=Accessories',
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Skincare',
    count: '380+ Styles',
    image: '/cat-beauty.webp',
    link: '/products?category=Beauty',
  },
];

export default function ShopByCategory() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const total = CATEGORIES.length;

  // Auto-advance spotlight every 3.8s when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const mobileCurrent = CATEGORIES[activeIndex];

  return (
    <section
      className="relative w-full pt-6 pb-10 sm:pt-10 sm:pb-14 select-none overflow-hidden bg-gradient-to-b from-[#FCFAF7] via-[#F8F3EC] to-[#FCFAF7] border-y border-[#EAE1D5]"
      aria-label="Category Spotlight"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* SECTION HEADER */}
        {/* ======================================================== */}
        <div className="flex items-end justify-between relative z-10">
          <div>
            <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#1E1815] block mb-0.5">
              Shop by
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#C2410C] leading-[1.05]">
              <span className="font-serif italic font-bold">Category</span>
            </h2>
          </div>

          {/* Desktop Top Navigation Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9.5 h-9.5 rounded-full border border-[#DECFC0] bg-white/90 hover:bg-[#1E1815] text-[#1E1815] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous Category"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9.5 h-9.5 rounded-full border border-[#DECFC0] bg-white/90 hover:bg-[#1E1815] text-[#1E1815] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next Category"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* THIN ARCHITECTURAL DIVIDER under header */}
        <div className="mt-3 sm:mt-4 mb-4 sm:mb-6 relative z-10">
          <div className="h-px w-full bg-gradient-to-r from-[#C2410C]/60 via-[#A07050]/25 to-transparent rounded-full" />
        </div>

        {/* ======================================================== */}
        {/* 1. LARGE DEVICES: 3D FLOATING MODEL SPOTLIGHT (NO CARD BOXES) */}
        {/* ======================================================== */}
        <div className="hidden md:flex relative w-full h-[330px] lg:h-[360px] items-center justify-center">
          {/* Soft Ambient Solar Glow behind the Zenith Center Highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#EA580C]/12 via-[#D97706]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Ground Contact Shadow under the Center Item */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-52 h-5 bg-black/12 rounded-full blur-xl pointer-events-none transition-all duration-500" />

          {CATEGORIES.map((cat, idx) => {
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const absOffset = Math.abs(offset);
            // Show center and ±2 items on each side (5 items total)
            if (absOffset > 2.5) return null;

            const isCenter = offset === 0;
            const translateX = offset * 225;
            const arcDrop = Math.pow(absOffset, 1.3) * 6;
            const arcRotate = offset * 0.8;
            const opacity = isCenter ? 1 : Math.max(0.75, 1 - absOffset * 0.12);
            const scale = isCenter ? 1 : 1 - absOffset * 0.04;
            const zIndex = 30 - Math.round(absOffset * 6);

            const imgSize = isCenter
              ? 'w-[200px] h-[200px] lg:w-[220px] lg:h-[220px]'
              : 'w-[160px] h-[160px] lg:w-[175px] lg:h-[175px]';

            return (
              <div
                key={cat.id}
                onClick={() => setActiveIndex(idx)}
                className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center select-none"
                style={{
                  transform: `translate3d(${translateX}px, ${arcDrop}px, 0) rotate(${arcRotate}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                <Link
                  href={cat.link}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  {/* Floating 3D Cutout Image (No card box) */}
                  <div className="h-[210px] lg:h-[230px] flex items-end justify-center">
                    <div
                      className={`relative flex items-center justify-center transition-all duration-500 ${imgSize} ${
                        isCenter ? 'center-floating-hero' : ''
                      }`}
                    >
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="240px"
                        priority={isCenter}
                        className="object-contain p-2 drop-shadow-[0_12px_22px_rgba(30,24,21,0.20)] group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>

                  {/* Typography on Horizontal Baseline */}
                  <div className="mt-2.5 flex flex-col items-center min-h-[46px] justify-start">
                    <h3
                      className={`font-bold tracking-tight transition-colors duration-200 ${
                        isCenter
                          ? 'text-base lg:text-[17px] text-[#1E1815] group-hover:text-[#EA580C]'
                          : 'text-xs lg:text-sm text-[#2D241E] group-hover:text-[#EA580C]'
                      }`}
                    >
                      {cat.name}
                    </h3>

                    <div className="mt-0.5 relative inline-flex items-center gap-1 text-xs font-semibold text-[#6E5D50] group-hover:text-[#C2410C] transition-colors border-b border-[#C2410C]/60 hover:border-[#C2410C] pb-0.5">
                      <span>{cat.count}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 2. SMALL DEVICES (MOBILE): 3-ITEM 3D FLOATING SHOWCASE (NO CARDS) */}
        {/* Displays 3 categories: Left (prev), Center (active/hero), Right (next) */}
        {/* User can tap Left/Right items or bottom buttons to slide */}
        {/* ======================================================== */}
        <div className="md:hidden flex flex-col items-center py-2 relative overflow-hidden">
          {/* Ambient Solar Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-[#EA580C]/12 via-[#D97706]/8 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* 3-Category Stage: Left (peek), Center (hero), Right (peek) */}
          <div className="relative w-full h-[270px] flex items-center justify-center">
            {[-1, 0, 1].map((offset) => {
              const itemIndex = (activeIndex + offset + total) % total;
              const cat = CATEGORIES[itemIndex];
              const isCenter = offset === 0;

              // Smooth 3D placement across the horizontal line
              const translateX = offset === -1 ? '-115px' : offset === 1 ? '115px' : '0px';
              const scale = isCenter ? 'scale-100' : 'scale-[0.78]';
              const opacity = isCenter ? 'opacity-100 z-20' : 'opacity-60 z-10';

              if (!isCenter) {
                return (
                  <div
                    key={`${cat.id}-peek-${offset}`}
                    onClick={offset === -1 ? handlePrev : handleNext}
                    className={`absolute flex flex-col items-center cursor-pointer transition-all duration-500 ease-out ${scale} ${opacity} select-none`}
                    style={{ transform: `translate3d(${translateX}, 0, 0)` }}
                  >
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="160px"
                        className="object-contain p-1 drop-shadow-[0_8px_16px_rgba(30,24,21,0.18)]"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#7A6B5F] mt-1 truncate max-w-[100px]">
                      {cat.name}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={`${cat.id}-center`}
                  className={`absolute flex flex-col items-center z-20 transition-all duration-500 ease-out ${scale} ${opacity} select-none`}
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                >
                  <Link
                    href={cat.link}
                    className="group flex flex-col items-center text-center cursor-pointer"
                  >
                    {/* Center Floating 3D Cutout */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="220px"
                        priority
                        className="object-contain p-1.5 drop-shadow-[0_14px_28px_rgba(30,24,21,0.22)] group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Typography */}
                    <div className="mt-2 flex flex-col items-center">
                      <h3 className="text-base font-black text-[#1E1815] group-hover:text-[#EA580C] transition-colors leading-tight">
                        {cat.name}
                      </h3>
                      <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-[#EA580C] border-b border-[#EA580C]/60 pb-0.5">
                        <span>{cat.count}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* TWO BOTTOM BUTTONS FOR MOBILE SLIDING (Left & Right) */}
          <div className="flex items-center justify-center gap-6 mt-4 relative z-20">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#DECFC0] bg-white text-[#1E1815] hover:bg-[#1E1815] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs active:scale-90 cursor-pointer"
              aria-label="Previous Category"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Slide Position Counter */}
            <span className="text-xs font-black tracking-wider text-[#7A6B5F]">
              {activeIndex + 1} / {total}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[#DECFC0] bg-white text-[#1E1815] hover:bg-[#1E1815] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs active:scale-90 cursor-pointer"
              aria-label="Next Category"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tracking Dots */}
        <div className="hidden md:flex items-center justify-center gap-1.5 mt-2 relative z-10">
          {CATEGORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === activeIndex
                  ? 'w-7 h-1.5 bg-[#EA580C]'
                  : 'w-1.5 h-1.5 bg-[#DECFC0] hover:bg-[#8C7A6D]'
              }`}
              aria-label={`Go to category slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Spotlight Float for Center Hero on Desktop */}
      <style jsx>{`
        .center-floating-hero {
          animation: appleCenterHeroFloat 3.6s ease-in-out infinite;
        }
        @keyframes appleCenterHeroFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }
      `}</style>
    </section>
  );
}
