'use client';
import React, { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  sku: string;
  category: string;
  description?: string;
  images: string[];
}

interface InventoryItem {
  _id: string;
  productId: Product;
  quantity: number;
  location: string;
  updatedAt?: string;
}

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch('/api/inventory').then(res => res.json()).then(setInventory);
  }, []);

  const openForm = (item: InventoryItem) => {
    setSelected(item);
    setQuantity(item.quantity.toString());
    setShowForm(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    await fetch('/api/inventory', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: selected?.productId._id, quantity: Number(quantity) }),
    });
    setShowForm(false);
    setUpdating(false);
    fetch('/api/inventory').then(res => res.json()).then(setInventory);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Inventory</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-xl shadow text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 md:p-3">Product</th>
              <th className="p-2 md:p-3">SKU</th>
              <th className="p-2 md:p-3">Quantity</th>
              <th className="p-2 md:p-3">Location</th>
              <th className="p-2 md:p-3">Last Updated</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item: InventoryItem) => (
              <tr key={item._id} className="border-b">
                <td className="p-2 md:p-3 font-semibold">{item.productId?.name}</td>
                <td className="p-2 md:p-3">{item.productId?.sku}</td>
                <td className="p-2 md:p-3">{item.quantity}</td>
                <td className="p-2 md:p-3">{item.location}</td>
                <td className="p-2 md:p-3">{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '-'}</td>
                <td className="p-2 md:p-3 flex flex-col md:flex-row gap-2">
                  <button className="bg-black text-white px-4 py-1 rounded" onClick={() => openForm(item)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Update Inventory Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 relative" onSubmit={handleUpdate}>
            <button type="button" className="absolute top-2 right-2 text-2xl" onClick={() => setShowForm(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-2">Update Inventory</h2>
            <div><b>Product:</b> {selected?.productId?.name}</div>
            <input type="number" min={0} value={quantity} onChange={e => setQuantity(e.target.value)} required className="border p-2 rounded" placeholder="Quantity" />
            <button type="submit" className="bg-black text-white py-2 rounded-lg font-semibold mt-2" disabled={updating}>{updating ? 'Updating...' : 'Update'}</button>
          </form>
        </div>
      )}
    </div>
  );
} 