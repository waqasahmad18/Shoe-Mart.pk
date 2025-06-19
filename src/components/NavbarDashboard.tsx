import React from 'react';
import { useRouter } from 'next/navigation';

export default function NavbarDashboard() {
  const router = useRouter();
  const handleLogout = () => {
    router.push('/');
  };
  return (
    <nav className="w-full bg-black border-b border-gray-900 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm z-50">
      <div className="flex items-center gap-3">
        <svg width="32" height="32" fill="none" stroke="yellow" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span className="text-2xl font-extrabold tracking-wide text-yellow-400">Admin Dashboard</span>
      </div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg text-lg transition-all">Logout</button>
    </nav>
  );
} 