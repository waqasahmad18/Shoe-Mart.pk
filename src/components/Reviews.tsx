import React from 'react';

interface Review {
  name: string;
  rating: number;
  text: string;
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return <div className="text-gray-400">No reviews yet.</div>;
  }
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      <div className="flex flex-col gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{review.name}</span>
              <span className="flex items-center text-yellow-400">
                {[1,2,3,4,5].map((n) => (
                  <svg key={n} width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                  </svg>
                )).slice(0, Math.floor(review.rating))}
                {review.rating % 1 !== 0 && (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                    <defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" fill="url(#half)"/>
                  </svg>
                )}
              </span>
            </div>
            <div className="text-gray-700 text-base">{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 