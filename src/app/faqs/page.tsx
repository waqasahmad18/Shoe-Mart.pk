"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "How can I place an order?",
    a: "Simply browse our products, add your favorite items to the bag, and proceed to checkout. Fill in your details and confirm your order!",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash on Delivery, Bank Transfer, and most major credit/debit cards.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery usually takes 2-5 business days depending on your location.",
  },
  {
    q: "Can I return or exchange my order?",
    a: "Yes! We offer a 7-day hassle-free return/exchange policy. Please see our Returns page for details.",
  },
  {
    q: "How can I contact support?",
    a: "You can reach us via the Contact page, email, or phone. We're here to help!",
  },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-12 px-4 flex flex-col items-center pb-0">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Frequently Asked Questions
      </motion.h1>
      <div className="max-w-2xl w-full mx-auto">
        {faqs.map((faq, idx) => (
          <motion.div key={idx} className="mb-4 rounded-xl shadow bg-white overflow-hidden">
            <button
              className="w-full text-left px-6 py-4 font-semibold text-lg text-gray-900 focus:outline-none flex justify-between items-center"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              {faq.q}
              <span className="ml-2 text-yellow-400 text-2xl">{open === idx ? '-' : '+'}</span>
            </button>
            <AnimatePresence>
              {open === idx && (
                <motion.div
                  className="px-6 pb-4 text-gray-700 text-base"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
} 