import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  { name: 'New & Featured', href: '#' },
  { name: 'Women', href: '#' },
  { name: 'Men', href: '#' },
  { name: 'Kids', href: '#' },
  { name: 'Collaborations', href: '#' },
  { name: 'Sport', href: '#' },
  { name: 'Sale', href: '#' },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 py-5 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/men.png" alt="Shoe Mart Logo" width={32} height={32} className="rounded-full bg-white" />
        </Link>
        <span className="font-bold text-lg tracking-wide">Shoe Mart.pk</span>
      </div>
      {/* Menu */}
      <ul className="hidden md:flex gap-7 ml-10">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="font-semibold hover:text-yellow-400 transition-colors duration-200">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center border border-gray-600 rounded px-2 py-1">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span className="ml-1 font-semibold text-sm">SEARCH</span>
        </div>
        {/* Heart */}
        <button aria-label="Wishlist">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"/></svg>
        </button>
        {/* Cart */}
        <button aria-label="Cart">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </button>
        {/* User */}
        <button aria-label="User">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
        </button>
      </div>
    </nav>
  );
} 