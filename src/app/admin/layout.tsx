'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const navLinks = [
  { name: 'Dashboard', href: '/admin', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  ) },
  { name: 'Products', href: '/admin/products', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
  ) },
  { name: 'Inventory', href: '/admin/inventory', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
  ) },
  { name: 'Orders', href: '/admin/orders', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10"/><path d="M7 10h10"/><path d="M7 6h10"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/></svg>
  ) },
  { name: 'Customer Reviews', href: '/admin/reviews', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
  ) },
  { name: 'Settings', href: '/admin/settings', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06-.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06A1.65 1.65 0 0 0 19.4 8c.14.31.22.65.22 1v.09A1.65 1.65 0 0 0 21 12c0 .35-.08.69-.22 1z"/></svg>
  ) },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Optionally clear any admin session here
    router.push('/');
  };

  return (
    <div className="min-h-screen h-full w-full flex flex-row items-stretch">
      {/* Sidebar */}
      <aside
        className={`bg-black text-white flex flex-col py-8 px-4 gap-4 border-r border-gray-900 w-64
          fixed z-50 top-0 left-0 h-full transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:h-auto`}
      >
        <div className="mb-8 text-2xl font-extrabold tracking-wide text-center md:block hidden">Admin Panel</div>
        <button className="md:hidden absolute top-4 right-4 text-2xl" onClick={() => setSidebarOpen(false)}>&times;</button>
        <nav className="flex flex-col gap-2 mt-8 md:mt-0">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              onClick={() => setSidebarOpen(false)}
            >
              <span>{link.icon}</span>
              <span className="text-white font-semibold">{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#f7f7f7] mt-14 md:mt-0">
        {/* Remove custom admin top bar's logout button, NavbarDashboard handles it */}
        <main className="flex-1 p-2 md:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
} 