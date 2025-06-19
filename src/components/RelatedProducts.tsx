import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  sku: string;
  description?: string;
}

interface Props {
  currentProductId: string;
  category: string;
}

export default function RelatedProducts({ currentProductId, category }: Props) {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      const filtered = data.filter((p: Product) => p.category === category && p._id !== currentProductId);
      setRelated(filtered.slice(0, 4));
      setLoading(false);
    }
    fetchRelated();
  }, [currentProductId, category]);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : related.length === 0 ? (
        <div className="text-gray-400">No related products found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 