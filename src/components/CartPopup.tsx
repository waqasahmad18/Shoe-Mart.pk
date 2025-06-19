import React from 'react';
import { useCart } from './CartContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface CartPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function CartPopup({ open, onClose }: CartPopupProps) {
  const { items, clearCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-full max-w-xs md:max-w-sm h-full bg-white shadow-2xl z-50 flex flex-col p-2 md:p-0"
        >
          {/* Cross Button */}
          <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-xl shadow-md z-10">
            <FiX />
          </button>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Your Bag</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-10 gap-2">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M9 16h6"/></svg>
                <div>Your bag is empty.</div>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center border-b pb-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden border">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">Size: <span className="font-bold">{item.size}</span> | Color: <span className="font-bold">{item.color}</span></div>
                    <div className="text-sm text-gray-700">Price: Rs. {item.price} x {item.quantity}</div>
                  </div>
                  <div className="font-bold text-lg text-black">Rs. {item.price * item.quantity}</div>
                </div>
              ))
            )}
          </div>
          {/* Empty Cart Button */}
          {items.length > 0 && (
            <button onClick={clearCart} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg mb-2 transition-all">Empty Cart</button>
          )}
          <div className="p-4 border-t flex flex-col gap-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg text-lg shadow-lg transition-all duration-200">Checkout</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 