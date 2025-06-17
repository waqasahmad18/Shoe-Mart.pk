import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 text-white pt-8 pb-16 px-4 md:px-16" data-aos="fade-up">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Step Into Style<br />with <span className="text-yellow-400">Shoe Mart.pk</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-xl">
            Discover the latest trends in footwear for Men, Women, and Kids. Unbeatable prices, exclusive collections, and fast delivery!
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-200">
            Shop Now
          </button>
        </div>
        {/* Right: Main Hero Image */}
        <div className="flex-1 flex flex-col gap-4 items-center" data-aos="zoom-in">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/hero.jpg" alt="Hero Banner" fill style={{objectFit:'cover'}} priority />
          </div>
          {/* Collage of category images */}
          <div className="flex gap-4 mt-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-yellow-400 flex items-center justify-center">
              <Image src="/men.png" alt="Men Category" width={96} height={96} style={{objectFit:'cover', width: '100%', height: '100%'}} />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-pink-400 flex items-center justify-center">
              <Image src="/women.png" alt="Women Category" width={96} height={96} style={{objectFit:'cover', width: '100%', height: '100%'}} />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-blue-400 flex items-center justify-center">
              <Image src="/baloon.png" alt="Kids Category" width={96} height={96} style={{objectFit:'cover', width: '100%', height: '100%'}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 