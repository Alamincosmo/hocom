import { Suspense } from 'react';
import { MOCK_PRODUCTS } from '@/data/products';
import ProductDetailsClient from '@/components/ProductDetailsClient';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-xs font-bold text-[#535766]">
          Loading fashion apparel...
        </div>
      }
    >
      <ProductDetailsClient product={product} />
    </Suspense>
  );
}
