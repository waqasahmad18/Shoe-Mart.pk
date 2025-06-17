import React from 'react';
import Image from 'next/image';

export default function PromoSection() {
  return (
    <section className="w-full py-16 px-4 md:px-0 bg-gradient-to-r from-yellow-50 via-white to-blue-50 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-0" data-aos="fade-up">
      {/* Image */}
      <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-3xl overflow-hidden shadow-xl border-4 border-yellow-200" data-aos="zoom-in">
        <Image src="/12.png" alt="Promo Shoes" fill style={{objectFit:'cover'}} />
      </div>
      {/* Text Content */}
      <div className="flex-1 text-center md:text-left max-w-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Step Up Your Style</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6">Upgrade your wardrobe with our latest arrivals. Premium quality, unbeatable comfort, and the trendiest designs—only at Shoe Mart.pk!</p>
        <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-200">Explore New Arrivals</button>
      </div>
    </section>
  );
} 