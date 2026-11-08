import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

interface CheckoutHeaderProps {
  currentStep: 'BAG' | 'ADDRESS' | 'PAYMENT';
}

export default function CheckoutHeader({ currentStep }: CheckoutHeaderProps) {
  return (
    <header className="border-b border-[#E8E0D5] bg-[#FAF7F2] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-2xs flex items-center justify-center bg-white p-1 border border-[#E8E0D5]">
            <Image
              src="/logo.png"
              alt="Hocom Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-black tracking-tight text-[#2B231D]">Hocom</span>
        </Link>

        {/* Center: 3-Step Progress Indicator */}
        <nav className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-bold tracking-widest uppercase">
          <Link
            href="/checkout/bag"
            className={`transition-colors ${
              currentStep === 'BAG'
                ? 'text-[#5C3317] border-b-2 border-[#5C3317] pb-1'
                : 'text-[#6B5E52] hover:text-[#2B231D]'
            }`}
          >
            BAG
          </Link>
          <span className="text-slate-300">----------</span>

          <Link
            href="/checkout/address"
            className={`transition-colors ${
              currentStep === 'ADDRESS'
                ? 'text-[#5C3317] border-b-2 border-[#5C3317] pb-1'
                : 'text-[#6B5E52] hover:text-[#2B231D]'
            }`}
          >
            ADDRESS
          </Link>
          <span className="text-slate-300">----------</span>

          <span
            className={`transition-colors ${
              currentStep === 'PAYMENT'
                ? 'text-[#5C3317] border-b-2 border-[#5C3317] pb-1'
                : 'text-[#6B5E52]'
            }`}
          >
            PAYMENT
          </span>
        </nav>

        {/* Right: Security Badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6B5E52] font-semibold">
          <ShieldCheck className="w-5 h-5 text-[#C59B27]" />
          <span>100% SECURE</span>
        </div>
      </div>
    </header>
  );
}
