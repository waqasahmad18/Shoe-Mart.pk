'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

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

export default function WomenCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      const womenProducts = data.filter((product: Product) => product.category === 'Women');
      setProducts(womenProducts);
      setFilteredProducts(womenProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.salePrice || product.price;
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Assuming products have createdAt field, for now just keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center mb-4">
            Women&apos;s Collection
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Discover our premium collection of women&apos;s footwear. From elegant heels to comfortable sneakers, 
            find your perfect style.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Results Count */}
            <div className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Price Range Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Price:</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-2000">Under ₨2,000</option>
                  <option value="2000-5000">₨2,000 - ₨5,000</option>
                  <option value="5000-10000">₨5,000 - ₨10,000</option>
                  <option value="10000-">Over ₨10,000</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">👠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters to find what you&apos;re looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 