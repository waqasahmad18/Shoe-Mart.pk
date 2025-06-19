"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-12 px-4 flex flex-col items-center pb-0">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        About Shoe Mart.pk
      </motion.h1>
      <motion.div
        className="max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <p className="text-lg text-gray-700 leading-relaxed">
          <span className="font-bold text-yellow-500">Shoe Mart.pk</span> was founded with a passion for bringing the latest trends and unbeatable comfort to every step you take. Our journey began in 2023, and since then, we have been committed to providing premium quality footwear for men, women, and kids across Pakistan.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <span className="font-bold text-yellow-500">Our Mission:</span> To make stylish, comfortable, and affordable shoes accessible to everyone, while delivering an exceptional shopping experience both online and offline.
        </p>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Our Values</h2>
          <ul className="list-disc ml-6 text-gray-700 text-base">
            <li>Premium Quality & Craftsmanship</li>
            <li>Customer Satisfaction First</li>
            <li>Innovation & Trendsetting</li>
            <li>Integrity & Transparency</li>
            <li>Community & Sustainability</li>
          </ul>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
} 