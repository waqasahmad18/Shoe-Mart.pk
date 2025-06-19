"use client";
import React, { useEffect, useState } from "react";

interface OrderItem {
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  items: OrderItem[];
  status: string;
  createdAt?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePack = async (orderId: string) => {
    setUpdating(orderId);
    await fetch(`/api/orders`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status: "packed" }),
    });
    await fetchOrders();
    setUpdating(null);
  };

  const handleDelete = async (orderId: string) => {
    setUpdating(orderId);
    await fetch(`/api/orders`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId }),
    });
    await fetchOrders();
    setUpdating(null);
  };

  return (
    <div className="w-full p-2 md:p-8">
      <h1 className="text-2xl font-bold text-black mb-6">Orders</h1>
      {loading ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Contact</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4 font-semibold">{order.name}</td>
                  <td className="py-2 px-4 text-sm">
                    <div>{order.email}</div>
                    <div>{order.phone}</div>
                  </td>
                  <td className="py-2 px-4 text-sm">
                    <div>{order.address}</div>
                    <div>{order.city}, {order.zip}</div>
                  </td>
                  <td className="py-2 px-4 text-sm">
                    <ul className="list-disc ml-4">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} ({item.size}, {item.color}) x {item.quantity} - Rs. {item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 capitalize font-bold">
                    {order.status}
                  </td>
                  <td className="py-2 px-4">
                    {order.status !== "packed" ? (
                      <>
                        <button
                          onClick={() => handlePack(order._id)}
                          disabled={updating === order._id}
                          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-1 px-4 rounded-lg shadow transition-all disabled:opacity-50 mr-2 mb-1.5"
                        >
                          {updating === order._id ? "Packing..." : "Pack"}
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          disabled={updating === order._id}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-lg shadow transition-all disabled:opacity-50 mt-2 md:mt-0"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-green-600 font-semibold">Packed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 