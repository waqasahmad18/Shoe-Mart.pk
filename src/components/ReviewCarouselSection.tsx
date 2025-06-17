'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const reviews = [
  {
    img: '/g1.jpg',
    name: 'Ayesha Khan',
    review: 'Absolutely love my new shoes! Super comfortable and stylish. Will shop again!',
    rating: 5,
  },
  {
    img: '/g6.jpg',
    name: 'Alizay Raza',
    review: 'Fast delivery and the quality is top-notch. Highly recommended!',
    rating: 5,
  },
  {
    img: '/g7.jpg',
    name: 'Sara Ahmed',
    review: 'Great variety and amazing discounts. My go-to store for shoes!',
    rating: 4,
  },
  {
    img: '/g4.jpg',
    name: 'Uzman Tariq',
    review: 'Customer support was very helpful. The shoes fit perfectly.',
    rating: 5,
  },
  {
    img: '/g5.jpg',
    name: 'Mehwish Butt',
    review: 'Loved the packaging and the shoes are so trendy. 10/10!',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="20" height="20" fill={i < rating ? '#FFD700' : '#E5E7EB'} viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568L24 9.423l-6 5.845L19.335 24 12 19.897 4.665 24 6 15.268 0 9.423l8.332-1.268z"/></svg>
      ))}
    </div>
  );
}

export default function ReviewCarouselSection() {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-br from-yellow-100 via-white to-blue-100 flex flex-col items-center justify-center" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">Customer Love</h2>
      <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Review Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center min-h-[340px] transition-all duration-500 ease-in-out" data-aos="zoom-in">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-yellow-400 shadow-lg">
            <Image src={reviews[current].img} alt={reviews[current].name} width={128} height={128} style={{objectFit:'cover'}} />
          </div>
          <h3 className="font-bold text-xl mb-1 text-gray-900">{reviews[current].name}</h3>
          <StarRating rating={reviews[current].rating} />
          <p className="text-gray-700 text-lg mt-4 mb-2 italic">“{reviews[current].review}”</p>
        </div>
        {/* Carousel Controls */}
        <div className="flex gap-8 mt-8">
          <button onClick={prev} aria-label="Previous Review" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-yellow-400 transition-colors shadow-lg text-2xl">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={next} aria-label="Next Review" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-yellow-400 transition-colors shadow-lg text-2xl">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        {/* Dots */}
        <div className="flex gap-2 mt-6">
          {reviews.map((_, idx) => (
            <span key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-yellow-500 scale-125' : 'bg-gray-300'}`}></span>
          ))}
        </div>
      </div>
    </section>
  );
} 