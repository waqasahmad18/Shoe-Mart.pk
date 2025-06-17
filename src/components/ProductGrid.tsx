import React from 'react';
import Image from 'next/image';

const products = [
  {
    id: 1,
    title: 'Classic Brown Boots',
    price: 4999,
    image: '/1.png',
    rating: 4.5,
    reviews: 120,
    discount: 20,
  },
  {
    id: 2,
    title: 'Sporty Sneakers',
    price: 3499,
    image: '/2.png',
    rating: 4.0,
    reviews: 98,
    discount: 15,
  },
  {
    id: 3,
    title: 'Elegant Heels',
    price: 5999,
    image: '/3.png',
    rating: 4.8,
    reviews: 75,
    discount: 30,
  },
  {
    id: 4,
    title: 'Kids Fun Shoes',
    price: 1999,
    image: '/4.png',
    rating: 4.3,
    reviews: 60,
    discount: 10,
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={i} width="16" height="16" fill="#FFD700" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 19.897 4.665 24 6 15.268 0 9.423l8.332-1.268z"/></svg>
      ))}
      {halfStar && <svg width="16" height="16" fill="#FFD700" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 19.897V.587z"/></svg>}
    </div>
  );
}

export default function ProductGrid() {
  return (
    <section className="w-full py-10 px-2 md:px-0" data-aos="fade-up">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product, idx) => (
          <div key={product.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-2xl" data-aos="zoom-in" data-aos-delay={idx * 100}>
            {/* Discount Badge */}
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">-{product.discount}%</span>
            {/* Product Image */}
            <div className="w-full h-48 relative">
              <Image src={product.image} alt={product.title} fill style={{objectFit:'cover'}} />
            </div>
            {/* Product Info */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-lg text-gray-900 truncate">{product.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-black">Rs. {product.price}</span>
                <StarRating rating={product.rating} />
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
              {/* Add to Cart Button (on hover) */}
              <button className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 