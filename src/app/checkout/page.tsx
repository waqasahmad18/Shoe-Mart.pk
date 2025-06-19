"use client";
import React, { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import BannerSection from "@/components/BannerSection";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.zip) {
      setError("Please fill all fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });
      if (!res.ok) throw new Error("Order failed");
      clearCart();
      router.push("/thankyou");
    } catch (err: any) {
      setError(err.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BannerSection />
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mt-8 mb-4">
        <motion.h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 mb-2" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          Shoe Mart.pk
        </motion.h1>
        <p className="text-lg text-gray-700">Fast, Secure &amp; Easy Checkout</p>
      </motion.div>
      <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 mt-4">
        <input name="name" value={form.name} onChange={handleInput} placeholder="Full Name" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleInput} placeholder="Email" type="email" className="border p-2 rounded" required />
        <input name="phone" value={form.phone} onChange={handleInput} placeholder="Phone" className="border p-2 rounded" required />
        <textarea name="address" value={form.address} onChange={handleInput} placeholder="Address" className="border p-2 rounded" required />
        <div className="flex gap-4">
          <input name="city" value={form.city} onChange={handleInput} placeholder="City" className="border p-2 rounded flex-1" required />
          <input name="zip" value={form.zip} onChange={handleInput} placeholder="ZIP Code" className="border p-2 rounded w-32" required />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg text-lg shadow-lg transition-all duration-200 mt-2" disabled={submitting}>
          {submitting ? "Placing Order..." : "Complete Order"}
        </button>
      </form>
    </div>
  );
} 