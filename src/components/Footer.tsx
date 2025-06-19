import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQs', href: '/faqs' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#111] text-gray-200 pt-14 pb-6 px-0 border-t border-gray-800 mt-0" data-aos="fade-up">
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-center md:items-center mb-8 text-center md:text-left w-full px-6">
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start gap-3 max-w-xs">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <Image src="/men.png" alt="Shoe Mart Logo" width={36} height={36} className="rounded-full bg-white" />
            <span className="font-bold text-xl tracking-wide text-white">Shoe Mart.pk</span>
          </div>
          <p className="text-gray-400 text-sm">Pakistan&rsquo;s premium online shoe store. Trendy, comfortable, and affordable footwear for everyone.</p>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col gap-2 min-w-[120px] items-center md:items-start">
          <h4 className="font-semibold text-white mb-2">Quick Links</h4>
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-yellow-400 hover:underline transition-colors text-sm">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact & Social */}
        <div className="flex flex-col gap-3 min-w-[180px] items-center md:items-start">
          <h4 className="font-semibold text-white mb-2">Contact</h4>
          <span className="text-sm text-gray-400">support@shoemart.pk</span>
          <span className="text-sm text-gray-400">+92 300 1234567</span>
          <div className="flex gap-4 mt-2 justify-center md:justify-start">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="hover:text-yellow-400">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="hover:text-yellow-400">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.094 12 2.094zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.635.4 3.661 1.374c-.974.974-1.246 2.241-1.308 3.608C2.175 8.414 2.163 8.794 2.163 12c0 3.206.012 3.586.07 4.85.062 1.366.334 2.633 1.308 3.608.974.974 2.241 1.246 3.608 1.308 1.266.058 1.646.069 4.85.069s3.584-.012 4.85-.07c1.366-.062 2.633-.334 3.608-1.308.974-.974 1.246-2.241 1.308-3.608.058-1.266.069-1.646.069-4.85s-.012-3.584-.07-4.85c-.062-1.366-.334-2.633-1.308-3.608-.974-.974-2.241-1.246-3.608-1.308C15.647 2.175 15.267 2.163 12 2.163z"/><circle cx="12" cy="12" r="3.5"/><circle cx="18.406" cy="5.594" r="1.44"/></svg>
            </a>
            {/* Twitter */}
            <a href="#" aria-label="Twitter" className="hover:text-yellow-400">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-gray-500 text-xs border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} Shoe Mart.pk. All rights reserved.
      </div>
    </footer>
  );
} 