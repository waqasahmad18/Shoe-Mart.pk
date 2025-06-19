"use client";
import React, { useState } from "react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Shoe Mart.pk");
  const [storeEmail, setStoreEmail] = useState("info@shoemart.pk");
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Store Info</h2>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-700">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
            className="border rounded px-3 py-2 text-black"
          />
          <label className="text-sm font-medium text-gray-700 mt-2">Store Email</label>
          <input
            type="email"
            value={storeEmail}
            onChange={e => setStoreEmail(e.target.value)}
            className="border rounded px-3 py-2 text-black"
          />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Maintenance Mode</h2>
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Off</span>
          <button
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${maintenance ? 'bg-yellow-400' : 'bg-gray-300'}`}
            onClick={() => setMaintenance(m => !m)}
            aria-pressed={maintenance}
          >
            <span
              className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-200 ${maintenance ? 'translate-x-6' : ''}`}
            />
          </button>
          <span className="text-gray-700">On</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">(UI only, no backend logic)</div>
      </div>
      <button className="bg-black hover:bg-yellow-400 hover:text-black text-white font-bold py-2 px-6 rounded-lg transition-all">Save Changes</button>
    </div>
  );
} 