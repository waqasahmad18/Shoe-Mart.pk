'use client';
import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-black text-white px-4 md:px-6 py-5 shadow-md relative z-40">
      <div className="flex items-center justify-between w-full">
        {/* Hamburger (mobile) */}
        <div className="flex-1 flex items-center md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Open Menu">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Logo (center on mobile, left on desktop) */}
        <div className="flex-1 flex justify-center md:justify-start items-center md:static absolute left-0 right-0">
          <Link href="/" className="flex items-center gap-2 mx-auto md:mx-0">
            <Image src="/men.png" alt="Shoe Mart Logo" width={32} height={32} className="rounded-full bg-white" />
            <span className="font-bold text-lg tracking-wide hidden sm:inline">Shoe Mart.pk</span>
          </Link>
        </div>
        {/* Right Side Icons */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:flex items-center border border-gray-600 rounded px-2 py-1">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span className="ml-1 font-semibold text-sm">SEARCH</span>
          </div>
          <button aria-label="Wishlist">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"/></svg>
          </button>
          <button aria-label="Cart">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
          <button aria-label="User">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
          </button>
        </div>
      </div>
      {/* Menu (desktop) */}
      <ul className="hidden md:flex gap-7 mt-4 md:mt-0 justify-start md:ml-10">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="font-semibold hover:text-yellow-400 transition-colors duration-200">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Mobile Dropdown Menu */}
      {open && (
        <ul className="absolute top-full left-0 w-full bg-black z-50 flex flex-col gap-2 py-4 px-6 md:hidden animate-fadeIn border-t border-gray-800">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="block py-2 font-semibold hover:text-yellow-400 transition-colors duration-200" onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
} 