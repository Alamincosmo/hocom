import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import Toast from '@/components/Toast';
import LenisScroll from '@/components/LenisScroll';

// Progressive dynamic imports for below-the-fold components
// Ensures instant initial render for what is visible on screen, loading subsequent sections progressively
const ShopByCategory = dynamic(() => import('@/components/ShopByCategory'), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="h-6 w-44 bg-[#F2ECE4] rounded-lg animate-pulse mb-6" />
      <div className="h-56 bg-[#F8F5F0] rounded-2xl animate-pulse" />
    </div>
  ),
});

const BrandInFocus = dynamic(() => import('@/components/BrandInFocus'), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-20 bg-[#F8F5F0] rounded-xl animate-pulse" />
    </div>
  ),
});

const TrendingNow = dynamic(() => import('@/components/TrendingNow'), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="h-6 w-52 bg-[#F2ECE4] rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-72 bg-[#F8F5F0] rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <LenisScroll>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          {/* Above-the-fold: Renders immediately */}
          <HeroBanner />
          {/* Below-the-fold: Progressive progressive loading */}
          <ShopByCategory />
          <BrandInFocus />
          <TrendingNow />
        </main>
        <Footer />
        <Toast />
      </div>
    </LenisScroll>
  );
}
