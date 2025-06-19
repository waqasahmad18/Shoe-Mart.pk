"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import RelatedProducts from '@/components/RelatedProducts';
import Reviews from '@/components/Reviews';
import { useCart } from '@/components/CartContext';
import CartPopup from '@/components/CartPopup';
import QuantitySelector from '@/components/QuantitySelector';

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  sku: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, text: '' });
  const [reviewError, setReviewError] = useState('');
  const [thankYou, setThankYou] = useState(false);
  const [publishedReviews, setPublishedReviews] = useState<{name: string, rating: number, text: string}[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartError, setCartError] = useState('');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`/api/products`);
      const data = await res.json();
      const found = data.find((p: Product) => p._id === id);
      setProduct(found || null);
      setLoading(false);
      if (found) {
        console.log('Product detail fetched:', found);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchPublishedReviews() {
      const res = await fetch(`/api/reviews?productId=${id}`);
      if (res.ok) {
        const data = await res.json();
        setPublishedReviews(data);
      }
    }
    fetchPublishedReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  const isOnSale = product.salePrice && product.salePrice < product.price;
  const discount = isOnSale ? Math.round(100 - ((product.salePrice! / product.price) * 100)) : 0;
  const formatPrice = (price: number) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(price);

  // Review form handlers
  const handleReviewInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReviewForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      setReviewError('Name and review are required.');
      return;
    }
    // Send review to backend for moderation
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: id,
        name: reviewForm.name.trim(),
        rating: Number(reviewForm.rating),
        text: reviewForm.text.trim(),
      }),
    });
    if (res.ok) {
      setThankYou(true);
      setReviewForm({ name: '', rating: 5, text: '' });
      setTimeout(() => setThankYou(false), 3000);
    } else {
      setReviewError('Failed to submit review.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-1 flex flex-col gap-4">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-white">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain p-6 bg-white"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {isOnSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg z-10">
                -{discount}%
              </div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 justify-center">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded-lg border-2 ${selectedImage === i ? 'border-yellow-400' : 'border-gray-200'} overflow-hidden bg-white`}>
                <Image src={img} alt={product.name} width={64} height={64} className="object-contain" />
              </button>
            ))}
          </div>
        </motion.div>
        {/* Product Info */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-1 flex flex-col gap-6 justify-center">
          <Link href={`/${product.category.toLowerCase()}`} className="text-sm text-gray-500 hover:underline mb-2">&larr; Back to {product.category}</Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-2">
            {isOnSale ? (
              <>
                <span className="text-2xl font-bold text-gray-900">{formatPrice(product.salePrice!)}</span>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-{discount}%</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            )}
          </div>
          {/* Reviews */}
          <div className="flex items-center gap-1 text-yellow-400 text-base mb-2">
            {/* Static 4.5 stars */}
            {[1,2,3,4].map(i => <svg key={i} width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>)}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" fill="url(#half)"/></svg>
            <span className="text-gray-700 ml-2">4.5 (12 reviews)</span>
          </div>
          {/* Sizes */}
          <div className="mb-2">
            <div className="font-semibold text-gray-900 mb-1">Select Size:</div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-200 text-black ${selectedSize === size ? 'border-yellow-400 bg-yellow-100' : 'border-gray-300 bg-white hover:border-yellow-400'}`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <span className="text-gray-700 text-sm">No sizes available</span>
              )}
            </div>
          </div>
          {/* Colors */}
          <div className="mb-2">
            <div className="font-semibold text-gray-900 mb-1">Select Color:</div>
            <div className="flex gap-2 flex-wrap">
              {product.colors && product.colors.length > 0 ? (
                product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-300'} bg-white flex items-center justify-center`}
                    style={{ background: color.toLowerCase() }}
                    title={color}
                  >
                    {selectedColor === color && <span className="block w-3 h-3 bg-white rounded-full border border-yellow-400"></span>}
                  </button>
                ))
              ) : (
                <span className="text-gray-700 text-sm">No colors available</span>
              )}
            </div>
          </div>
          <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={10} className="text-black" />
          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full py-4 bg-black text-white rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-200"
            onClick={() => {
              setCartError('');
              if (!selectedSize || !selectedColor) {
                setCartError('Please select size and color.');
                return;
              }
              addToCart({
                id: product._id,
                name: product.name,
                image: product.images[0],
                price: isOnSale ? product.salePrice! : product.price,
                size: selectedSize,
                color: selectedColor,
                quantity,
              });
              setCartOpen(true);
            }}
          >
            Add to Bag
          </motion.button>
          {cartError && <div className="text-red-600 text-sm mt-2">{cartError}</div>}
          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <div className="font-semibold text-gray-900 mb-1">Description:</div>
              <p className="text-gray-900 text-base leading-relaxed">{product.description}</p>
            </div>
          )}
        </motion.div>
      </div>
      {/* Reviews Section */}
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleReviewSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          {thankYou && <div className="text-green-600 text-sm">Thank you for your feedback!</div>}
          {reviewError && <div className="text-red-600 text-sm">{reviewError}</div>}
          <input name="name" value={reviewForm.name} onChange={handleReviewInput} placeholder="Your Name" className="border p-2 rounded" required />
          <select name="rating" value={reviewForm.rating} onChange={handleReviewInput} className="border p-2 rounded w-32">
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
          </select>
          <textarea name="text" value={reviewForm.text} onChange={handleReviewInput} placeholder="Your review..." className="border p-2 rounded" rows={3} required />
          <button type="submit" className="bg-black text-white py-2 rounded-lg font-semibold">Submit Review</button>
        </form>
        <div className="mt-8">
          <div className="font-bold text-xl text-black mb-2">Customer Reviews</div>
          <Reviews reviews={publishedReviews} />
        </div>
      </div>
      {/* Related Products at the end */}
      <div className="font-bold text-xl text-black mb-2">Related Products</div>
      <RelatedProducts currentProductId={product._id} category={product.category} />
      <Footer />
      <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
} 