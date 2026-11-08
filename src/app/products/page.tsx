'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ChevronRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import Toast from '@/components/Toast';
import LenisScroll from '@/components/LenisScroll';
import { MOCK_PRODUCTS } from '@/data/products';
import { FilterState, Gender } from '@/types';

function ProductListingContent() {
  const searchParams = useSearchParams();

  // Initial params
  const paramGender = (searchParams.get('gender') as Gender) || 'ALL';
  const paramCategory = searchParams.get('category');
  const paramBrand = searchParams.get('brand');
  const paramDiscount = Number(searchParams.get('discount')) || 0;
  const paramSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<FilterState>({
    gender: paramGender,
    categories: paramCategory ? [paramCategory] : [],
    brands: paramBrand ? [paramBrand] : [],
    priceRange: [0, 15000],
    discountRange: paramDiscount,
    color: null,
    sortBy: 'RECOMMENDED',
    searchQuery: paramSearch,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when query params change
  useEffect(() => {
    if (paramCategory) {
      setFilters((prev) => ({
        ...prev,
        categories: [paramCategory],
      }));
    }
    if (paramGender) {
      setFilters((prev) => ({
        ...prev,
        gender: paramGender,
      }));
    }
    if (paramBrand) {
      setFilters((prev) => ({
        ...prev,
        brands: [paramBrand],
      }));
    }
    if (paramDiscount) {
      setFilters((prev) => ({
        ...prev,
        discountRange: paramDiscount,
      }));
    }
    if (paramSearch) {
      setFilters((prev) => ({
        ...prev,
        searchQuery: paramSearch,
      }));
    }
  }, [paramCategory, paramGender, paramBrand, paramDiscount, paramSearch]);

  // Available dynamic categories and brands
  const availableCategories = useMemo(() => {
    return Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)));
  }, []);

  const availableBrands = useMemo(() => {
    return Array.from(new Set(MOCK_PRODUCTS.map((p) => p.brand)));
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Gender
    if (filters.gender !== 'ALL') {
      result = result.filter(
        (p) => p.gender === filters.gender || p.gender === 'UNISEX'
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Brands
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Price
    result = result.filter(
      (p) =>
        p.discountPrice >= filters.priceRange[0] &&
        p.discountPrice <= filters.priceRange[1]
    );

    // Discount
    if (filters.discountRange > 0) {
      result = result.filter((p) => p.discountPercent >= filters.discountRange);
    }

    // Color
    if (filters.color) {
      result = result.filter((p) => p.colors.includes(filters.color!));
    }

    // Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
      );
    }

    // Sort By
    switch (filters.sortBy) {
      case 'PRICE_LOW_HIGH':
        result.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'PRICE_HIGH_LOW':
        result.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'DISCOUNT':
        result.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'RATING':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'WHATS_NEW':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'RECOMMENDED':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="max-w-[1440px] mx-auto px-2.5 sm:px-4 md:pl-4 md:pr-6 lg:pl-6 lg:pr-8 py-4 sm:py-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-[#535766] mb-3 sm:mb-4 overflow-x-auto scrollbar-none whitespace-nowrap">
        <Link href="/" className="hover:text-[#282C3F]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/products" className="hover:text-[#282C3F]">Clothing & Lifestyle</Link>
        {filters.gender !== 'ALL' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="font-bold text-[#282C3F] capitalize">{filters.gender.toLowerCase()}</span>
          </>
        )}
        {filters.categories.length === 1 && (
          <>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="font-bold text-[#282C3F]">{filters.categories[0]}</span>
          </>
        )}
      </nav>

      {/* Top Header & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#EAEAEC] gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-[#282C3F] uppercase tracking-tight">
              {filters.searchQuery
                ? `Search: "${filters.searchQuery}"`
                : filters.categories.length === 1
                ? filters.categories[0]
                : 'Fashion & Lifestyle Catalog'}
            </h1>
            <span className="text-xs sm:text-sm text-[#535766] font-medium">
              - {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Mobile filter button & Sort Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-1.5 text-xs font-bold text-[#282C3F] border border-slate-300 px-3 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer active:scale-95"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>FILTERS</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-[#535766] font-medium hidden sm:inline">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="bg-white border border-[#EAEAEC] text-[#282C3F] font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-md focus:border-[#EA580C] focus:outline-hidden cursor-pointer shadow-2xs text-xs"
            >
              <option value="RECOMMENDED">Recommended</option>
              <option value="WHATS_NEW">What&apos;s New</option>
              <option value="PRICE_LOW_HIGH">Price: Low to High</option>
              <option value="PRICE_HIGH_LOW">Price: High to Low</option>
              <option value="DISCOUNT">Better Discount</option>
              <option value="RATING">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2-Column PLP Layout: Left Sidebar 25%, Right Product Grid 75% */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 items-start">
        {/* Desktop Left Sidebar */}
        <div className="hidden md:block col-span-1 sticky top-28">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            availableCategories={availableCategories}
            availableBrands={availableBrands}
          />
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex justify-end md:hidden animate-fadeIn">
            <div className="w-[85%] max-w-sm h-full bg-white overflow-y-auto p-4 animate-slideLeft">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onCloseMobile={() => setMobileFilterOpen(false)}
                availableCategories={availableCategories}
                availableBrands={availableBrands}
              />
            </div>
          </div>
        )}

        {/* Right: Product Grid (3-4 cols) */}
        <div className="col-span-1 md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#F5F5F6] rounded-xl p-8 border border-slate-200">
              <p className="text-lg font-bold text-[#282C3F]">No products match your selected filters</p>
              <p className="text-xs text-[#535766] mt-1 max-w-sm mx-auto">
                Try clearing some filters or search query to find the fashion style you desire.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    gender: 'ALL',
                    categories: [],
                    brands: [],
                    priceRange: [0, 15000],
                    discountRange: 0,
                    color: null,
                    sortBy: 'RECOMMENDED',
                    searchQuery: '',
                  })
                }
                className="mt-4 bg-[#FF3F6C] text-white font-bold text-xs px-6 py-2.5 rounded uppercase tracking-wider hover:bg-[#e0325b] transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <LenisScroll>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm font-bold text-[#6B5D52]">
                Loading fashion collection...
              </div>
            }
          >
            <ProductListingContent />
          </Suspense>
        </main>
        <Footer />
        <Toast />
      </div>
    </LenisScroll>
  );
}
