import React from 'react';
import Image from 'next/image';

export default function BannerSection() {
  return (
    <section className="relative w-full h-96 md:h-[600px] lg:h-[800px] flex items-center justify-center my-0 rounded-2xl overflow-hidden shadow-xl" data-aos="fade-up">
      <div className="absolute inset-0 w-full h-full" data-aos="zoom-in">
        <Image src="/18.jpg" alt="Checkout Banner" fill priority style={{objectFit:'cover'}} />
      </div>
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 z-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Mega Sale is Live!</h2>
        <p className="text-md md:text-lg text-gray-200 mb-4 max-w-xl">Up to 50% off on selected styles. Grab your favorite shoes before they are gone!</p>
        <a href="/shop" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-full text-base shadow-lg transition-all duration-200">Shop Sale</a>
      </div>
    </section>
  );
} 