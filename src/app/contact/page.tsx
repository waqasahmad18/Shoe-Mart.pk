"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-12 px-4 flex flex-col items-center pb-0">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Contact Us
      </motion.h1>
      <motion.div
        className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-4 py-3 text-lg text-gray-900 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-4 py-3 text-lg text-gray-900 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="border rounded px-4 py-3 text-lg text-gray-900 focus:ring-2 focus:ring-yellow-400 outline-none min-h-[120px]"
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-200 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {sent && (
          <motion.div
            className="text-green-600 text-center font-semibold mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Thank you! Your message has been sent.
          </motion.div>
        )}
        <div className="mt-8 text-gray-600 text-center text-base">
          <div className="mb-2">Email: <span className="text-gray-900 font-semibold">support@shoemart.pk</span></div>
          <div>Phone: <span className="text-gray-900 font-semibold">+92 300 1234567</span></div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
} 