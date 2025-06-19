"use client";
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

export default function ProductGrid() {
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch('/api/products');
      const all = await res.json();
      setMenProducts(all.filter((p: Product) => p.category === 'Men').slice(0, 4));
      setWomenProducts(all.filter((p: Product) => p.category === 'Women').slice(0, 4));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <section className="w-full py-10 px-2 md:px-0" data-aos="fade-up">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Products</h2>
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading products...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto mb-8">
            {menProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
            {womenProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
} 