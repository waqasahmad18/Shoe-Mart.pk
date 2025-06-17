import React from 'react';
import Image from 'next/image';

export default function NewsletterSection() {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center justify-center bg-[#f7f7f7]" data-aos="fade-up">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-8 p-8 md:p-12" data-aos="zoom-in">
        {/* Image */}
        <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden shadow-lg border-4 border-yellow-200">
          <Image src="/baloon.png" alt="Newsletter Shoes" fill style={{objectFit:'cover'}} />
        </div>
        {/* Text & Form */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Stay in the Loop!</h2>
          <p className="text-md md:text-lg text-gray-600 mb-6">Sign up for our newsletter and get exclusive offers, new arrivals, and the latest trends delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
            <input type="email" required placeholder="Enter your email" className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-64" />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-full text-base shadow-lg transition-all duration-200">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
} 