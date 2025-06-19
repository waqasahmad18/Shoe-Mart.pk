'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import CartPopup from './CartPopup';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Women', href: '/women' },
  { name: 'Men', href: '/men' },
  { name: 'Kids', href: '/kids' },
];

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  sku: string;
  description?: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Dynamic search state
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // Handle search input
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowSuggestions(!!value);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    setSearchLoading(true);
    const res = await fetch('/api/products');
    const products = await res.json();
    const filtered = products.filter((p: Product) => p.name.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filtered.slice(0, 5));
    setSearchLoading(false);
  };

  const handleSuggestionClick = (id: string) => {
    setSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
    router.push(`/products/${id}`);
  };

  return (
    <nav className="w-full bg-black text-white px-4 md:px-6 py-5 shadow-md relative z-40">
      <div className="flex items-center justify-between w-full">
        {/* Hamburger (mobile) */}
        <div className="flex-1 flex items-center md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Open Menu"
            className="w-12 h-12 flex items-center justify-center focus:outline-none active:bg-gray-800 rounded"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Logo (center on mobile, left on desktop) */}
        <div className="flex-1 flex justify-center md:justify-start items-center md:static absolute left-0 right-0">
          <Link href="/" className="flex items-center gap-2 mx-auto md:mx-0">
            <span className="font-extrabold text-xl md:text-2xl tracking-normal text-white">Shoe Mart.pk</span>
          </Link>
        </div>
        {/* Right Side Icons */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center border border-gray-600 rounded px-2 py-1 relative bg-black">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              onFocus={() => setShowSuggestions(!!search)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Search products..."
              className="ml-2 bg-black text-white outline-none border-none font-semibold text-sm w-40"
              style={{ minWidth: 120 }}
            />
            {showSuggestions && (suggestions.length > 0 || searchLoading) && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchLoading ? (
                  <div className="p-2 text-center text-gray-500 text-sm">Searching...</div>
                ) : suggestions.length === 0 ? (
                  <div className="p-2 text-center text-gray-500 text-sm">No products found</div>
                ) : (
                  suggestions.map((s) => (
                    <div
                      key={s._id}
                      className="p-2 hover:bg-yellow-100 cursor-pointer text-sm border-b last:border-b-0"
                      onMouseDown={() => handleSuggestionClick(s._id)}
                    >
                      {s.name}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          {/* Cart Icon */}
          <button aria-label="Cart" className="relative" onClick={() => setCartOpen(true)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
          {/* Account Icon (static, no modal) */}
          <span aria-label="User">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
          </span>
        </div>
      </div>
      {/* Menu (desktop) */}
      <ul className="hidden md:flex gap-7 mt-4 md:mt-0 justify-center">
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
      <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} />
      {/* Mobile Search Bar */}
      <div className="md:hidden flex items-center border border-gray-600 rounded px-2 py-1 relative bg-black mt-4">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onFocus={() => setShowSuggestions(!!search)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Search products..."
          className="ml-2 bg-black text-white outline-none border-none font-semibold text-sm w-full"
        />
        {showSuggestions && (suggestions.length > 0 || searchLoading) && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto">
            {searchLoading ? (
              <div className="p-2 text-center text-gray-500 text-sm">Searching...</div>
            ) : suggestions.length === 0 ? (
              <div className="p-2 text-center text-gray-500 text-sm">No products found</div>
            ) : (
              suggestions.map((s) => (
                <div
                  key={s._id}
                  className="p-2 hover:bg-yellow-100 cursor-pointer text-sm border-b last:border-b-0"
                  onMouseDown={() => handleSuggestionClick(s._id)}
                >
                  {s.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
} 