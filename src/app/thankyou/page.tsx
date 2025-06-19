"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiTruck } from "react-icons/fi";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col min-h-screen justify-between bg-gradient-to-br from-yellow-100 via-white to-blue-100">
      <div className="flex flex-col items-center justify-center flex-1">
        <motion.h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 mb-6 mt-10" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          Shoe Mart.pk
        </motion.h1>
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: [ -200, 300, 0 ] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          className="mb-8"
        >
          <FiTruck size={64} className="text-yellow-500 drop-shadow-lg" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-2 text-green-600">Thank You for Your Order!</h2>
          <p className="text-gray-700 mb-4">We have received your order and will contact you soon.</p>
          <p className="text-gray-500 text-sm">You will receive a confirmation email and SMS shortly.</p>
        </motion.div>
      </div>
    </div>
  );
} 