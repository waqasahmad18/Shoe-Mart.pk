'use client';
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProductCount(Array.isArray(data) ? data.length : 0));
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full p-2 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to the Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-black">
            {productCount === null ? '...' : productCount}
          </span>
          <span className="text-gray-500 mt-2">Products</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-black">45</span>
          <span className="text-gray-500 mt-2">Orders</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-black">32</span>
          <span className="text-gray-500 mt-2">Customers</span>
        </div>
      </div>
    </div>
  );
} 