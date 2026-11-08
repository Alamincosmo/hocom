'use client';

import Link from 'next/link';
import Image from 'next/image';

interface BrandItem {
  name: string;
  logo: string;
  link: string;
}

const BRANDS: BrandItem[] = [
  {
    name: 'Nike',
    logo: '/brand-nike.webp',
    link: '/products?brand=Nike',
  },
  {
    name: "Levi's",
    logo: '/brand-levis.webp',
    link: "/products?brand=Levi's",
  },
  {
    name: 'Puma',
    logo: '/brand-puma.webp',
    link: '/products?brand=Puma',
  },
  {
    name: 'H&M',
    logo: '/brand-hm.webp',
    link: '/products?brand=H%26M',
  },
  {
    name: 'Bata',
    logo: '/brand-bata.webp',
    link: '/products?brand=Bata',
  },
];

// Duplicate brands for seamless infinite marquee
const MARQUEE_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

export default function BrandInFocus() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 select-none">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-[#EFE8DE]">
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#8C7A6D] block mb-1.5">
            Official Flagship Partners
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1E1815] leading-tight">
            Brands in{' '}
            <span
              style={{ fontFamily: 'var(--font-display), "Cormorant Garamond", Georgia, serif' }}
              className="italic font-bold text-[#EA580C]"
            >
              Focus
            </span>
          </h2>
        </div>

        <Link
          href="/products"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#EA580C] hover:text-[#1E1815] transition-colors border-b border-[#EA580C]/40 hover:border-[#1E1815] pb-0.5 tracking-wide uppercase"
        >
          সকল ব্র্যান্ড দেখুন →
        </Link>
      </div>

      {/* Borderless, Clean Marquee Stage (No card boxes, no outer container card) */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Edge Vignette Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#FDFBF8] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#FDFBF8] to-transparent z-10" />

        {/* Marquee Track: Clean Logos directly on canvas, illuminates & regains full brand color on hover */}
        <div className="flex gap-8 sm:gap-14 items-center marquee-track">
          {MARQUEE_BRANDS.map((brand, i) => (
            <Link
              key={`${brand.name}-${i}`}
              href={brand.link}
              className="group flex-shrink-0 flex items-center justify-center py-2"
              title={brand.name}
            >
              <div className="relative w-28 sm:w-36 h-10 sm:h-12 flex items-center justify-center transition-all duration-300 ease-out filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Marquee Continuous Animation */}
      <style jsx>{`
        .marquee-track {
          animation: marqueeContinuous 30s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeContinuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
