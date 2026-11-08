import Link from 'next/link';
import { ShieldCheck, RefreshCw, Truck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF4EB] text-[#241A14] border-t border-[#EFE6D8] pt-10 sm:pt-12 pb-8 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        {/* Top 4 Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#EFE6D8]">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-[#EA580C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#241A14]">
                100% ORIGINAL
              </h5>
              <p className="text-[12px] text-[#6B5D52] mt-0.5">
                Guarantee for all products at Hocom
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-[#D97706]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#241A14]">
                Return within 14days
              </h5>
              <p className="text-[12px] text-[#6B5D52] mt-0.5">
                Hassle-free exchange & quick pickups
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-[#059669]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#241A14]">
                Free Delivery
              </h5>
              <p className="text-[12px] text-[#6B5D52] mt-0.5">
                On eligible orders above ৳999 / ₹799
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-[#C2410C]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#241A14]">
                COD & Instant bKash
              </h5>
              <p className="text-[12px] text-[#6B5D52] mt-0.5">
                Secure 256-bit SSL encrypted checkout
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-[#EFE6D8] text-xs">
          <div>
            <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase tracking-wider mb-4">
              ONLINE SHOPPING
            </h4>
            <ul className="space-y-2 text-[#6B5D52]">
              <li><Link href="/products?gender=MEN" className="hover:text-[#EA580C] transition">Men</Link></li>
              <li><Link href="/products?gender=WOMEN" className="hover:text-[#EA580C] transition">Women</Link></li>
              <li><Link href="/products?gender=KIDS" className="hover:text-[#EA580C] transition">Kids</Link></li>
              <li><Link href="/products?category=Beauty" className="hover:text-[#EA580C] transition">Beauty & Cosmetics</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-[#EA580C] transition">Gift Cards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase tracking-wider mb-4">
              CUSTOMER POLICIES
            </h4>
            <ul className="space-y-2 text-[#6B5D52]">
              <li><span className="hover:text-[#EA580C] cursor-pointer">Contact Us</span></li>
              <li><span className="hover:text-[#EA580C] cursor-pointer">FAQ & Help Center</span></li>
              <li><span className="hover:text-[#EA580C] cursor-pointer">T&C</span></li>
              <li><span className="hover:text-[#EA580C] cursor-pointer">Terms Of Use</span></li>
              <li><span className="hover:text-[#EA580C] cursor-pointer">Track Orders</span></li>
              <li><span className="hover:text-[#EA580C] cursor-pointer">Shipping & Delivery</span></li>
              <li><span className="hover:text-[#EA580C] cursor-pointer">Cancellation & Returns</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase tracking-wider mb-4">
              EXPERIENCE HOCOM APP
            </h4>
            <p className="text-[12px] text-[#6B5D52] mb-3">
              Fast, smooth & exclusive app-only fashion drops.
            </p>
            <div className="flex flex-col gap-2">
              <div className="bg-[#241A14] text-white px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-black transition">
                <span className="text-[10px] uppercase font-bold">Google Play</span>
              </div>
              <div className="bg-[#241A14] text-white px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-black transition">
                <span className="text-[10px] uppercase font-bold">Apple App Store</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-[12px] text-[#241A14] uppercase tracking-wider mb-4">
              KEEP IN TOUCH
            </h4>
            <div className="flex gap-3 text-slate-600 mb-4">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-xs hover:text-[#EA580C] cursor-pointer border border-[#EFE6D8]">FB</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-xs hover:text-[#EA580C] cursor-pointer border border-[#EFE6D8]">IG</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-xs hover:text-[#EA580C] cursor-pointer border border-[#EFE6D8]">YT</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-xs hover:text-[#EA580C] cursor-pointer border border-[#EFE6D8]">X</span>
            </div>
            <p className="text-[11px] text-[#6B5D52]">
              In case of any concern, <strong>support@hocom.com</strong>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6B5D52] gap-4">
          <p>© 2026 www.hocom.com. All rights reserved. Built with Next.js 16 & Tailwind CSS.</p>
          <p className="font-semibold text-[#241A14]">Hocom Lifestyle & Premium Fashion</p>
        </div>
      </div>
    </footer>
  );
}
