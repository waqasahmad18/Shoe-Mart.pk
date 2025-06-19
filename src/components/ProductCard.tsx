import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOnSale = product.salePrice && product.salePrice < product.price;
  const discount = isOnSale ? Math.round(100 - ((product.salePrice! / product.price) * 100)) : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/products/${product._id}`} className="block group cursor-pointer">
      <div className="bg-white rounded-2xl shadow relative overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
        {/* Image + Sale Badge */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={
              product.images[0]
                ? product.images[0].startsWith('http') || product.images[0].startsWith('/')
                  ? product.images[0]
                  : '/' + product.images[0]
                : '/file.svg'
            }
            alt={product.name}
            fill
            className="object-contain bg-white group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
              -{discount}%
            </div>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col p-4 gap-2">
          <h3 className="font-semibold text-gray-900 text-base truncate" title={product.name}>
            {product.name}
          </h3>
          {/* Price */}
          <div className="flex items-end gap-2 mb-1">
            {isOnSale ? (
              <>
                <span className="text-lg font-bold text-gray-900">{formatPrice(product.salePrice!)}</span>
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            )}
          </div>
          {/* Reviews */}
          <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
            {/* TODO: Replace static stars and review count with dynamic data from backend */}
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" fill="url(#half)"/></svg>
            <span className="text-gray-500 ml-1">4.5 (12 reviews)</span>
          </div>
          {/* Add to Cart Button (hover) */}
          <div className="mt-auto">
            <button className="w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
} 