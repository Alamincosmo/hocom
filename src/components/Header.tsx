'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Shirt,
  Crown,
  Scissors,
  Gem,
  Flame,
  Watch,
  Smile,
  Droplets,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { MOCK_PRODUCTS } from '@/data/products';

export default function Header() {
  const router = useRouter();
  const { wishlist, currency, setCurrency, currencySymbol } = useStore();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Nav state
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position for glassmorphism - Optimized to prevent header re-render jitter
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const isScrolled = currentScroll > 30;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          if (progressBarRef.current) {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalScroll > 0 ? Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)) : 0;
            progressBarRef.current.style.width = `${progress}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: "/" to focus search, "Escape" to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalWishlistCount = mounted ? wishlist.length : 0;

  const popularChips = [
    { label: 'কুর্তা সেট', query: 'Kurta' },
    { label: 'Linen Shirts', query: 'Shirt' },
    { label: 'Sneakers', query: 'Sneakers' },
    { label: 'Leather Bags', query: 'Bag' },
    { label: 'Midi Dresses', query: 'Dress' },
  ];

  // Matched products for search suggestions (excluding Men 511 Slim Fit Mid-Rise Stretch Jeans)
  const matchedProducts = useMemo(() => {
    const filteredSource = MOCK_PRODUCTS.filter(
      (p) =>
        !p.title.toLowerCase().includes('511') &&
        !p.title.toLowerCase().includes('stretch jeans')
    );

    if (!searchQuery.trim()) {
      return filteredSource.slice(0, 4);
    }
    const q = searchQuery.toLowerCase();
    return filteredSource
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileSearchOpen(false);
    }
  };

  const handleChipClick = (query: string) => {
    setSearchQuery(query);
    router.push(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMobileSearchOpen(false);
  };

  const navCategories = [
    { name: 'Men', href: '/products?gender=MEN', key: 'MEN' },
    { name: 'Women', href: '/products?gender=WOMEN', key: 'WOMEN' },
    { name: 'Kids', href: '/products?gender=KIDS', key: 'KIDS' },
    { name: 'Beauty', href: '/products?category=Beauty', key: 'BEAUTY' },
    { name: 'Studio', href: '/products', key: 'STUDIO', isNew: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 transform-gpu ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#F0EAE1] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          : 'bg-white/95 backdrop-blur-md border-b border-[#F0EAE1]'
      }`}
    >
      {/* ======================================================== */}
      {/* MAIN ROW: Clean Logo Icon, Centered Soft Search, Actions with '3' Badge */}
      {/* Fully responsive across all devices: 320px phones to 4K displays */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between md:grid md:grid-cols-12 md:gap-3">
        
        {/* Left: Mobile Menu Toggle + Larger Logo & Italic Brand Wordmark */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:col-span-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1E1815] p-1.5 sm:p-2 rounded-xl hover:bg-[#F3EDE2] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Larger Logo + Beautiful Italic Wordmark with Highlight Accent */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Hocom Logo"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-baseline gap-1">
              <span
                style={{ fontFamily: 'var(--font-display), "Cormorant Garamond", Georgia, serif' }}
                className="italic font-bold text-xl sm:text-2xl md:text-[28px] tracking-tight text-[#1E1815] group-hover:text-[#EA580C] transition-colors"
              >
                Hocom
              </span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#F59E0B] shadow-xs mb-1" />
            </div>
          </Link>
        </div>

        {/* Center: PERFECTLY CENTERED PRO SEARCH BAR WITH COLORED ICON COVER */}
        <div className="hidden md:flex md:col-span-6 items-center justify-center">
          <div
            ref={searchContainerRef}
            className="w-full max-w-md lg:max-w-lg relative"
          >
            <form
              onSubmit={handleSearchSubmit}
              className={`relative flex items-center h-10 sm:h-10.5 bg-white/90 hover:bg-white focus-within:bg-white rounded-xl transition-all duration-200 border ${
                searchOpen
                  ? 'border-[#EA580C] ring-3 ring-[#EA580C]/12 bg-white shadow-sm'
                  : 'border-[#E8DFC8] hover:border-[#D9CCA8] shadow-2xs'
              }`}
            >
              {/* Colored Covered Search Icon Container */}
              <div className="pl-2 pr-1.5 flex items-center shrink-0">
                <div className="w-7 h-7 rounded-lg bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center">
                  <Search className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
              </div>

              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search styles, brands, or পোশাক খুঁজুন…"
                style={{ fontFamily: 'var(--font-bengali-nihar), var(--font-sans)' }}
                className="w-full h-full pl-1.5 pr-8 text-xs sm:text-[13.5px] font-medium text-[#1E1815] bg-transparent focus:outline-hidden placeholder-[#9C8A7C]"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-3 text-xs text-[#8C7A6D] hover:text-[#1E1815] font-semibold"
                >
                  Clear
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center justify-center mr-3 px-1.5 py-0.5 text-[10px] font-semibold text-[#8C7A6D] bg-[#FAF6F0] border border-[#E5DACD] rounded-[5px] shadow-2xs">
                  /
                </kbd>
              )}
            </form>

            {/* Search Dropdown Results */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-[#E8DFC8] p-4 z-50 overflow-hidden"
                >
                  {/* Popular Chips Row */}
                  <div className="pb-3 border-b border-[#F0E8DC]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6D] block mb-2">
                      Popular Searches
                    </span>
                    <div className="flex items-center flex-wrap gap-1.5">
                      {popularChips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleChipClick(chip.query)}
                          className="bg-[#F5EFE6] hover:bg-[#EA580C] hover:text-white text-[#3D322B] px-3 py-1 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Matching Product Thumbnails */}
                  <div className="pt-3">
                    <div className="flex items-center justify-between pb-2 text-[11px] font-semibold text-[#8C7A6D]">
                      <span>
                        {searchQuery.trim()
                          ? `Suggested Products (${matchedProducts.length})`
                          : 'Curated Highlights'}
                      </span>
                      <span className="text-[10px] text-[#EA580C] font-medium">Press Enter for all</span>
                    </div>

                    <div className="space-y-1.5">
                      {matchedProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF6F0] transition group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-10 h-12 rounded-lg bg-[#FAF4EB] overflow-hidden shrink-0 border border-[#EBE4D8]">
                              <Image
                                src={p.images[0]}
                                alt={p.title}
                                fill
                                className="object-cover group-hover:scale-105 transition"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-[#1E1815] group-hover:text-[#EA580C] transition truncate">
                                {p.title}
                              </p>
                              <p className="text-[11px] text-[#7A6B5F] truncate">
                                {p.brand} • {p.category}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-2">
                            <span className="text-xs font-bold text-[#EA580C]">
                              {currencySymbol}{p.discountPrice}
                            </span>
                            <span className="block text-[10px] text-[#A6978A] line-through">
                              {currencySymbol}{p.basePrice}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-3 mt-2 border-t border-[#F0E8DC] text-center">
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] inline-flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>View all matching results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Currency Switcher & Action Icons with '3' Notification Badge */}
        <div className="flex items-center justify-end gap-1 sm:gap-3 md:col-span-3 shrink-0">
          
          {/* Mobile Search Trigger */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-1.5 sm:p-2 text-[#3D322B] hover:text-[#EA580C] transition-colors rounded-full hover:bg-[#F3EDE2]"
            aria-label="Open Mobile Search"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Currency Segmented Switcher */}
          <div className="hidden sm:flex items-center bg-[#F3EDE2] p-0.5 rounded-lg text-xs font-medium text-[#5A4D43]">
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-2 py-1 rounded-[6px] transition-all text-[11px] font-semibold cursor-pointer ${
                currency === 'BDT'
                  ? 'bg-white text-[#EA580C] shadow-xs'
                  : 'hover:text-[#1E1815]'
              }`}
            >
              ৳ BDT
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2 py-1 rounded-[6px] transition-all text-[11px] font-semibold cursor-pointer ${
                currency === 'INR'
                  ? 'bg-white text-[#EA580C] shadow-xs'
                  : 'hover:text-[#1E1815]'
              }`}
            >
              ₹ INR
            </button>
          </div>

          <div className="hidden sm:block h-4 w-px bg-[#E5DCD0]" />

          {/* User Account */}
          <Link
            href="/products"
            className="p-2 text-[#3D322B] hover:text-[#EA580C] transition-colors rounded-full hover:bg-[#F3EDE2]"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 text-[#3D322B] hover:text-[#EA580C] transition-colors rounded-full hover:bg-[#F3EDE2] relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {totalWishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center">
                {totalWishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Bag with Notification Badge "3" */}
          <Link
            href="/checkout/bag"
            className="p-2 text-[#3D322B] hover:text-[#EA580C] transition-colors rounded-full hover:bg-[#F3EDE2] relative group"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EA580C] text-white text-[11px] font-black flex items-center justify-center shadow-md ring-2 ring-white">
              3
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Expanded Search */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-[#F0EAE1] bg-[#FDFBF8]">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-[#8C7A6D] absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search styles, brands, or পোশাক খুঁজুন…"
              autoFocus
              className="w-full bg-[#F5EFE6] text-xs font-medium pl-9 pr-16 py-2.5 rounded-xl border border-[#DECFC0] focus:outline-hidden focus:bg-white focus:border-[#EA580C]"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1.5 bg-[#1E1815] text-white text-[11px] font-semibold rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* COMPACT CATEGORY ROW (With Soft Matching Divider Line) */}
      {/* ======================================================== */}
      <div className="hidden md:flex border-t border-[#F0EAE1] bg-[#FAF7F2]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center gap-10 h-9">
          {navCategories.map((item) => {
            const isActive = activeMegaMenu === item.key;
            const isHovered = hoveredNav === item.key;

            return (
              <div
                key={item.key}
                className="h-full flex items-center relative"
                onMouseEnter={() => {
                  setActiveMegaMenu(item.key);
                  setHoveredNav(item.key);
                }}
                onMouseLeave={() => {
                  setActiveMegaMenu(null);
                  setHoveredNav(null);
                }}
              >
                <Link
                  href={item.href}
                  className="h-full flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#3D322B] hover:text-[#EA580C] transition-colors relative"
                >
                  <span>{item.name}</span>
                  {item.isNew && (
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-[#EA580C] text-white px-1.5 py-0.2 rounded-full shadow-2xs">
                      New
                    </span>
                  )}

                  {/* Animated sliding underline */}
                  {(isHovered || isActive) && (
                    <motion.div
                      layoutId="categoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA580C] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {isActive && (
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 pt-2 z-50 animate-fadeIn pointer-events-auto">
                    <div className="w-[760px] bg-[#FCFAF7]/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#E8DFC8] p-6 grid grid-cols-12 gap-6">
                      
                      {/* Subcategories */}
                      <div className="col-span-8 grid grid-cols-2 gap-5">
                        {item.key === 'MEN' && (
                          <>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#F5EFE5] text-[#EA580C] flex items-center justify-center">
                                  <Shirt className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">
                                  Topwear & Tailoring
                                </h4>
                              </div>
                              <ul className="space-y-1.5 text-xs text-[#5A4D43]">
                                <li><Link href="/products?category=Topwear&gender=MEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Casual Linen Shirts</Link></li>
                                <li><Link href="/products?category=Topwear&gender=MEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">T-Shirts & Classic Polos</Link></li>
                                <li><Link href="/products?category=Topwear&gender=MEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Structured Suits & Blazers</Link></li>
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#F5EFE5] text-[#EA580C] flex items-center justify-center">
                                  <Crown className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">
                                  Festive & Ethnic
                                </h4>
                              </div>
                              <ul className="space-y-1.5 text-xs text-[#5A4D43]">
                                <li><Link href="/products?category=Ethnic+Wear&gender=MEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Silk Kurta Pajama Sets</Link></li>
                                <li><Link href="/products?category=Ethnic+Wear&gender=MEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Embroidered Nehru Jackets</Link></li>
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#F5EFE5] text-[#EA580C] flex items-center justify-center">
                                  <Watch className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">
                                  Footwear & Accessories
                                </h4>
                              </div>
                              <ul className="space-y-1.5 text-xs text-[#5A4D43]">
                                <li><Link href="/products?category=Footwear&gender=MEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Minimalist Leather Sneakers</Link></li>
                                <li><Link href="/products?category=Accessories&gender=MEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Bespoke Belts & Wallets</Link></li>
                              </ul>
                            </div>
                          </>
                        )}

                        {item.key === 'WOMEN' && (
                          <>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#FFF2EA] text-[#EA580C] flex items-center justify-center">
                                  <Crown className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">
                                  Ethnic & Festive
                                </h4>
                              </div>
                              <ul className="space-y-1.5 text-xs text-[#5A4D43]">
                                <li><Link href="/products?category=Ethnic+Wear&gender=WOMEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Designer Kurta Sets</Link></li>
                                <li><Link href="/products?category=Ethnic+Wear&gender=WOMEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Handloom Jamdani & Silk Sarees</Link></li>
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#FFF2EA] text-[#EA580C] flex items-center justify-center">
                                  <Scissors className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">
                                  Modern Silhouettes
                                </h4>
                              </div>
                              <ul className="space-y-1.5 text-xs text-[#5A4D43]">
                                <li><Link href="/products?category=Dresses&gender=WOMEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Flowing Midi Dresses</Link></li>
                                <li><Link href="/products?category=Bottomwear&gender=WOMEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">High-Rise Tailored Trousers</Link></li>
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#FFF2EA] text-[#EA580C] flex items-center justify-center">
                                  <Gem className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">
                                  Bags & Footwear
                                </h4>
                              </div>
                              <ul className="space-y-1.5 text-xs text-[#5A4D43]">
                                <li><Link href="/products?category=Accessories&gender=WOMEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Structured Leather Totes</Link></li>
                                <li><Link href="/products?category=Footwear&gender=WOMEN" className="block py-1 hover:text-[#EA580C] hover:translate-x-1 transition font-medium">Sculpted Block Heels</Link></li>
                              </ul>
                            </div>
                          </>
                        )}

                        {item.key === 'KIDS' && (
                          <>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#F5EFE5] text-[#EA580C] flex items-center justify-center">
                                  <Smile className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">Boys & Girls</h4>
                              </div>
                              <ul className="space-y-1 text-xs text-[#5A4D43]">
                                <li><Link href="/products?gender=KIDS" className="block py-1 hover:text-[#EA580C] transition">Festive Kurta Pajamas</Link></li>
                                <li><Link href="/products?gender=KIDS" className="block py-1 hover:text-[#EA580C] transition">Party Frocks & Lehengas</Link></li>
                              </ul>
                            </div>
                          </>
                        )}

                        {item.key === 'BEAUTY' && (
                          <>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#FFF2EA] text-[#EA580C] flex items-center justify-center">
                                  <Droplets className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">Beauty & Fragrance</h4>
                              </div>
                              <ul className="space-y-1 text-xs text-[#5A4D43]">
                                <li><Link href="/products?category=Beauty" className="block py-1 hover:text-[#EA580C] transition">Botanical Dew Serums</Link></li>
                                <li><Link href="/products?category=Beauty" className="block py-1 hover:text-[#EA580C] transition">Warm Amber & Oud Extracts</Link></li>
                              </ul>
                            </div>
                          </>
                        )}

                        {item.key === 'STUDIO' && (
                          <>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-1 border-b border-[#EFE8DD]">
                                <div className="w-7 h-7 rounded-lg bg-[#F5EFE5] text-[#EA580C] flex items-center justify-center">
                                  <TrendingUp className="w-3.5 h-3.5" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1815]">Curated Edits</h4>
                              </div>
                              <ul className="space-y-1 text-xs text-[#5A4D43]">
                                <li><Link href="/products" className="block py-1 hover:text-[#EA580C] transition">Celebrity Festive Capsule</Link></li>
                                <li><Link href="/products" className="block py-1 hover:text-[#EA580C] transition">VIP Runway Drops</Link></li>
                              </ul>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Featured Image Tile */}
                      <div className="col-span-4 bg-[#F5EFE5]/80 rounded-xl p-4 flex flex-col justify-between border border-[#E8DFC8]/60 relative overflow-hidden group">
                        <div className="relative z-10 space-y-1">
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#EA580C] text-white px-2 py-0.5 rounded-full">
                            Spotlight
                          </span>
                          <h5 className="text-sm font-bold text-[#1E1815] leading-snug">
                            {item.key === 'MEN' && 'Modern Sartorial Tailoring'}
                            {item.key === 'WOMEN' && 'Royal Handcrafted Silk Festivities'}
                            {item.key === 'KIDS' && 'Pure Cotton Festive Wear'}
                            {item.key === 'BEAUTY' && 'Luminous Glow Essentials'}
                            {item.key === 'STUDIO' && 'Exclusive Runway Edits'}
                          </h5>
                        </div>

                        <div className="relative h-28 w-full rounded-lg overflow-hidden my-2.5 bg-[#EBE4D8]">
                          <Image
                            src={
                              item.key === 'MEN'
                                ? '/Man_wearing_plaid_shirt_posing_a7e0a9b8 (1).webp'
                                : item.key === 'WOMEN'
                                ? '/Floral_print_midi_dress_7b987da1.webp'
                                : item.key === 'BEAUTY'
                                ? '/cat-beauty.webp'
                                : '/cat-watch.webp'
                            }
                            alt="Spotlight Collection"
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>

                        <Link
                          href={item.href}
                          className="relative z-10 inline-flex items-center justify-between text-xs font-semibold text-[#1E1815] group-hover:text-[#EA580C] transition pt-1"
                        >
                          <span>Explore Collection</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </Link>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Progress Accent Line - Driven directly by ref to prevent re-render jitter */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-[2px] bg-[#EA580C] pointer-events-none transition-[width] duration-75"
        style={{ width: '0%' }}
      />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F0EAE1] bg-[#FDFBF8] px-5 py-5 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[#3D322B]">
            {navCategories.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#F5EFE5] hover:text-[#EA580C] transition flex items-center justify-between"
              >
                <span>{item.name}</span>
                {item.isNew && (
                  <span className="text-[9px] bg-[#EA580C] text-white px-1.5 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
            <span className="text-xs font-medium text-[#7A6B5F]">Currency:</span>
            <div className="flex items-center bg-[#F3EDE2] p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setCurrency('BDT')}
                className={`px-3 py-1 rounded-[6px] transition ${
                  currency === 'BDT' ? 'bg-white text-[#EA580C] shadow-xs' : 'text-[#5A4D43]'
                }`}
              >
                ৳ BDT
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1 rounded-[6px] transition ${
                  currency === 'INR' ? 'bg-white text-[#EA580C] shadow-xs' : 'text-[#5A4D43]'
                }`}
              >
                ₹ INR
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
