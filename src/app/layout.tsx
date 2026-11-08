import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, Cormorant_Garamond, Playfair, Noto_Serif_Bengali, Hind_Siliguri } from 'next/font/google';
import FloatingAgent from '@/components/FloatingAgent';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali-serif',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  variable: '--font-bengali',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hocom - Luxury Fashion & Lifestyle',
  description: 'Shop premium apparel, footwear, ethnic wear and beauty collections at Hocom.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} ${cormorant.variable} ${notoSerifBengali.variable} ${hindSiliguri.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-[#1E1815] font-sans selection:bg-[#EA580C]/20 selection:text-[#9A3412]">
        {children}
        <FloatingAgent />
      </body>
    </html>
  );
}
