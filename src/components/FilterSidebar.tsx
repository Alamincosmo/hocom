'use client';

import { X, RotateCcw } from 'lucide-react';
import { Gender, FilterState } from '@/types';
import { useStore } from '@/store/useStore';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onCloseMobile?: () => void;
  availableCategories: string[];
  availableBrands: string[];
}

const COLORS = [
  { name: 'Black', hex: '#0f172a' },
  { name: 'White', hex: '#ffffff', border: true },
  { name: 'Green', hex: '#3e4f3a' },
  { name: 'Blue', hex: '#1e3a8a' },
  { name: 'Amber Gold', hex: '#D97706' },
  { name: 'Orange', hex: '#EA580C' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Brown', hex: '#78350f' },
];

export default function FilterSidebar({
  filters,
  setFilters,
  onCloseMobile,
  availableCategories,
  availableBrands,
}: FilterSidebarProps) {
  const { currencySymbol } = useStore();

  const handleGenderChange = (gender: Gender | 'ALL') => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(category);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists
          ? prev.brands.filter((b) => b !== brand)
          : [...prev.brands, brand],
      };
    });
  };

  const handleColorToggle = (colorHex: string) => {
    setFilters((prev) => ({
      ...prev,
      color: prev.color === colorHex ? null : colorHex,
    }));
  };

  const handleDiscountChange = (discount: number) => {
    setFilters((prev) => ({
      ...prev,
      discountRange: prev.discountRange === discount ? 0 : discount,
    }));
  };

  const handleReset = () => {
    setFilters({
      gender: 'ALL',
      categories: [],
      brands: [],
      priceRange: [0, 15000],
      discountRange: 0,
      color: null,
      sortBy: 'RECOMMENDED',
      searchQuery: '',
    });
  };

  const activeFilterCount =
    (filters.gender !== 'ALL' ? 1 : 0) +
    filters.categories.length +
    filters.brands.length +
    (filters.discountRange > 0 ? 1 : 0) +
    (filters.color ? 1 : 0) +
    (filters.priceRange[1] < 15000 ? 1 : 0);

  return (
    <aside className="w-full bg-white border border-[#EFE6D8] rounded-xl p-5 divide-y divide-[#EFE6D8] text-xs shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm text-[#241A14] tracking-wider uppercase">
            FILTERS
          </span>
          {activeFilterCount > 0 && (
            <span className="bg-[#EA580C] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={handleReset}
              className="text-[#EA580C] font-extrabold text-xs hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>CLEAR ALL</span>
            </button>
          )}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden text-[#6B5D52] hover:text-[#241A14] p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Gender Filter (Radio) */}
      <div className="py-4">
        <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase mb-3 tracking-wider">
          Gender
        </h4>
        <div className="space-y-2">
          {[
            { label: 'All Gender', value: 'ALL' },
            { label: 'Men', value: 'MEN' },
            { label: 'Women', value: 'WOMEN' },
            { label: 'Kids', value: 'KIDS' },
          ].map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-2.5 cursor-pointer text-[#241A14] hover:text-[#EA580C] transition"
            >
              <input
                type="radio"
                name="genderFilter"
                checked={filters.gender === item.value}
                onChange={() => handleGenderChange(item.value as Gender | 'ALL')}
                className="w-4 h-4 accent-[#EA580C] cursor-pointer"
              />
              <span className="font-semibold">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories Filter (Checkboxes) */}
      <div className="py-4">
        <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase mb-3 tracking-wider">
          Categories
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableCategories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2.5 cursor-pointer text-[#241A14] hover:text-[#EA580C] transition"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 rounded accent-[#EA580C] cursor-pointer"
              />
              <span className="font-semibold">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter (Checkboxes) */}
      <div className="py-4">
        <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase mb-3 tracking-wider">
          Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 cursor-pointer text-[#241A14] hover:text-[#EA580C] transition"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-4 h-4 rounded accent-[#EA580C] cursor-pointer"
              />
              <span className="font-semibold">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="py-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase tracking-wider">
            Price Range
          </h4>
          <span className="text-xs font-black text-[#EA580C]">
            Up to {currencySymbol}{filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="15000"
          step="500"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)],
            }))
          }
          className="w-full accent-[#EA580C] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#6B5D52] mt-1 font-bold">
          <span>{currencySymbol}500</span>
          <span>{currencySymbol}15,000</span>
        </div>
      </div>

      {/* Color Swatches */}
      <div className="py-4">
        <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase mb-3 tracking-wider">
          Color
        </h4>
        <div className="flex items-center gap-2.5 flex-wrap">
          {COLORS.map((col) => {
            const isSelected = filters.color === col.hex;
            return (
              <button
                key={col.name}
                onClick={() => handleColorToggle(col.hex)}
                title={col.name}
                className={`w-6 h-6 rounded-full transition-all relative ${
                  col.border ? 'border border-[#EFE6D8]' : ''
                } ${isSelected ? 'ring-2 ring-offset-2 ring-[#EA580C] scale-110' : 'hover:scale-105'}`}
                style={{ backgroundColor: col.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Discount Range (Radio) */}
      <div className="py-4">
        <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase mb-3 tracking-wider">
          Discount Range
        </h4>
        <div className="space-y-2">
          {[10, 30, 40, 50, 60].map((disc) => (
            <label
              key={disc}
              className="flex items-center gap-2.5 cursor-pointer text-[#241A14] hover:text-[#EA580C] transition"
            >
              <input
                type="radio"
                name="discountFilter"
                checked={filters.discountRange === disc}
                onChange={() => handleDiscountChange(disc)}
                className="w-4 h-4 accent-[#EA580C] cursor-pointer"
              />
              <span className="font-semibold">{disc}% and above</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
