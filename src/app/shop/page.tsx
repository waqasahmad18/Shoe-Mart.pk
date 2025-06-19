"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

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

const categories = ["All", "Men", "Women", "Kids"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch("/api/products");
      const all = await res.json();
      setProducts(all);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filtered = selected === "All" ? products : products.filter((p) => p.category === selected);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-10 px-2 md:px-0 pb-0">
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Shop All Products
      </motion.h1>
      <motion.div
        className="flex gap-3 justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-200 ${selected === cat ? "bg-yellow-400 text-black border-yellow-400" : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"}`}
          >
            {cat}
          </button>
        ))}
      </motion.div>
      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading products...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-xl">No products found.</div>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {filtered.map((product) => (
            <motion.div
              key={product._id}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
      <Footer />
    </div>
  );
} 