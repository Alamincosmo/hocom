'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_SLIDES = [
  {
    image: '/persion with bag.webp',
    tag: 'মডার্ন লাইফস্টাইল ও ট্রাভেল',
    line1: 'অনায়াস ফ্যাশন,',
    line2Word: 'দৈনন্দিন',
    line2Rest: 'আভিজাত্য।',
    primaryCta: { label: 'কালেকশন দেখুন', href: '/products?category=Activewear' },
    secondaryCta: { label: 'স্টুডিও এক্সপ্লোর', href: '/products' },
  },
  {
    image: '/airpodsPhones.webp',
    tag: 'স্মার্ট গ্যাজেট ও অ্যাক্সেসরিজ',
    line1: 'আধুনিক প্রযুক্তি,',
    line2Word: 'স্মার্ট',
    line2Rest: 'লাইফস্টাইল।',
    primaryCta: { label: 'গ্যাজেট দেখুন', href: '/products?category=Accessories' },
    secondaryCta: { label: 'স্টুডিও এক্সপ্লোর', href: '/products' },
  },
  {
    image: '/shoes.webp',
    tag: 'প্রিমিয়াম ফুটওয়্যার ২০২৬',
    line1: 'আরামদায়ক পদক্ষেপ,',
    line2Word: 'আকর্ষণীয়',
    line2Rest: 'স্নিকার্স।',
    primaryCta: { label: 'জুতো কালেকশন', href: '/products?category=Footwear' },
    secondaryCta: { label: 'স্টুডিও এক্সপ্লোর', href: '/products' },
  },
  {
    image: '/header1.webp',
    tag: 'শীত ও উৎসব ২০২৬',
    line1: 'আধুনিক আভিজাত্য,',
    line2Word: 'পরিপাটি',
    line2Rest: 'সাজ।',
    primaryCta: { label: 'মেনস কালেকশন', href: '/products?gender=MEN' },
    secondaryCta: { label: 'স্টুডিও এক্সপ্লোর', href: '/products' },
  },
  {
    image: '/header2.webp',
    tag: 'হস্তশিল্প ও রাজকীয় বুনন',
    line1: 'ঐতিহ্যের বুনন,',
    line2Word: 'উৎসবের',
    line2Rest: 'ছোঁয়া।',
    primaryCta: { label: 'উৎসব কালেকশন', href: '/products?category=Ethnic+Wear' },
    secondaryCta: { label: 'স্টুডিও এক্সপ্লোর', href: '/products' },
  },
  {
    image: '/bag.webp',
    tag: 'আর্টিসান লেদার ব্যাগ',
    line1: 'হ্যান্ডক্রাফটেড চামড়া,',
    line2Word: 'অনবদ্য',
    line2Rest: 'ক্লাসিক রূপ।',
    primaryCta: { label: 'ব্যাগ কালেকশন', href: '/products?category=Accessories' },
    secondaryCta: { label: 'স্টুডিও এক্সপ্লোর', href: '/products' },
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2800);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Hero Carousel"
      className="relative overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center border-b border-[#E8DFD3] bg-[#181311]"
    >
      {/* Background Slides with Transition */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.line1}
                fill
                priority={idx === 0}
                className="object-cover object-[85%_center] sm:object-[80%_center] lg:object-[80%_center]"
              />
            </div>
          </div>
        ))}

        {/* Ambient Dark Gradients for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 via-50% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0.55) 100%)',
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-12 sm:pb-16 w-full">
        <div className="max-w-xl space-y-5 sm:space-y-7">
          
          {/* Season Tag */}
          <div className="inline-flex items-center gap-2 bg-black/45 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs text-[#E5DCD0]">
            <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
            <span
              style={{ fontFamily: 'var(--font-bengali-nihar), var(--font-bengali)' }}
              className="font-medium text-xs text-[#FDBA74] tracking-wide"
            >
              {activeSlide.tag}
            </span>
          </div>

          {/* Headline Stage: Clean single-slide active display to prevent text overlap */}
          <div className="space-y-1.5 transition-all duration-300">
            {/* Line 1: Li Manowar Nihar for Modern Minimalist Bengali Typography */}
            <p
              style={{ fontFamily: 'var(--font-bengali-nihar), var(--font-bengali)' }}
              className="text-xl sm:text-3xl lg:text-[2.2rem] font-medium text-white/95 tracking-wide drop-shadow-sm"
            >
              {activeSlide.line1}
            </p>

            {/* Line 2: Li SK Bishal for Majestic Bold Luxury Headline */}
            <h1
              style={{ fontFamily: 'var(--font-bengali-bishal), var(--font-bengali)' }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.25] drop-shadow-md flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span
                style={{ fontFamily: 'var(--font-bengali-bishal)', fontStyle: 'italic' }}
                className="text-[#FDBA74] mr-1"
              >
                {activeSlide.line2Word}
              </span>
              <span>
                {activeSlide.line2Rest}
              </span>
            </h1>
          </div>

          {/* Buttons: Fluid scaling on mobile screens */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-4 sm:pt-8">
            <Link
              href={activeSlide.primaryCta.href}
              style={{ fontFamily: 'var(--font-ubuntu), "Ubuntu", sans-serif' }}
              className="px-5 py-3 sm:px-8 sm:py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer"
            >
              <span>{activeSlide.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href={activeSlide.secondaryCta.href}
              style={{ fontFamily: 'var(--font-ubuntu), "Ubuntu", sans-serif' }}
              className="px-5 py-3 sm:px-8 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-full border border-white/30 backdrop-blur-md transition-all duration-200 flex items-center cursor-pointer"
            >
              <span>{activeSlide.secondaryCta.label}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Dynamic Sliding Diamond Pagination - Borderless, elevated, aligned with Header Search */}
      <div
        aria-label="Carousel pagination"
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-auto"
      >
        <div className="relative w-[112px] h-6 flex items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_22%,black_78%,transparent)]">
          <motion.div
            className="absolute flex items-center"
            style={{ left: '50%' }}
            animate={{
              x: -(currentSlide * 16 + 8),
            }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 24,
              mass: 0.8,
            }}
          >
            {HERO_SLIDES.map((_, i) => {
              const distance = Math.abs(i - currentSlide);
              const isActive = i === currentSlide;

              // Smooth scale decay: center is 1.0, 1 away is 0.72, 2 away is 0.5, 3+ is 0.35
              const scale = distance === 0 ? 1 : distance === 1 ? 0.72 : distance === 2 ? 0.5 : 0.35;
              const opacity = distance === 0 ? 1 : distance === 1 ? 0.65 : distance === 2 ? 0.38 : 0.18;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}${isActive ? ' (Current)' : ''}`}
                  className="w-4 h-6 flex items-center justify-center cursor-pointer shrink-0 focus:outline-hidden"
                >
                  {/* Delicate Sharp Diamond with Smooth Spring Animation */}
                  <motion.span
                    className="block rotate-45 rounded-[0.5px]"
                    animate={{
                      width: 6,
                      height: 6,
                      scale: scale,
                      opacity: opacity,
                      backgroundColor: isActive ? '#FFFFFF' : '#E2E8F0',
                      boxShadow: isActive
                        ? '0 0 7px 1.5px rgba(255, 255, 255, 0.8), 0 0 3px rgba(245, 158, 11, 0.2)'
                        : 'none',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                    }}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}