import React from 'react';

const features = [
  {
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
    ),
    title: 'Premium Quality',
    desc: 'Only the best materials and craftsmanship in every pair.'
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 018 0v2M21 17v-2a8 8 0 10-16 0v2M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"/></svg>
    ),
    title: 'Easy Returns',
    desc: 'Hassle-free 7-day return policy for your peace of mind.'
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
    title: 'Fast Delivery',
    desc: 'Get your order delivered quickly, right to your doorstep.'
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.364 5.636l-1.414 1.414A9 9 0 005.636 18.364l1.414-1.414M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    ),
    title: '24/7 Support',
    desc: 'Our team is always here to help you with any queries.'
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-16 px-4 bg-white flex flex-col items-center justify-center" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">Why Choose <span className="text-yellow-500">Shoe Mart.pk</span>?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-2xl shadow-md p-8 hover:shadow-xl transition-shadow duration-200 text-center" data-aos="zoom-in" data-aos-delay={idx * 100}>
            <div className="mb-4 text-yellow-500">{feature.icon}</div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 