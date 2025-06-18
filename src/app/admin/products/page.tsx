'use client';
import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Men', 'Women', 'Kids'];

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  sku: string;
  category: string;
  description?: string;
  images: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', price: '', salePrice: '', sku: '', category: '', description: '', images: [] as string[], imageFiles: [] as File[]
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 5) as File[];
    setForm(f => ({ ...f, imageFiles: files }));
  };

  const uploadImages = async (files: File[]) => {
    const urls: string[] = [];
    let lastError = '';
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          urls.push(data.secure_url);
        } else if (data.url) {
          urls.push(data.url);
        } else {
          lastError = data.error || JSON.stringify(data);
          console.error('Image upload error:', data);
        }
      } catch (err) {
        lastError = (err as any)?.message || 'Unknown error';
        console.error('Image upload failed:', err);
      }
    }
    if (urls.length === 0 && lastError) {
      throw new Error('Image upload: ' + lastError);
    }
    return urls;
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      salePrice: product.salePrice ? product.salePrice.toString() : '',
      sku: product.sku,
      category: product.category,
      description: product.description || '',
      images: product.images || [],
      imageFiles: [],
    });
    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    fetch('/api/products').then(res => res.json()).then(setProducts);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    try {
      let imageUrls = form.images;
      if (form.imageFiles.length === 0 && !editId) {
        setError('Please select at least 1 image.');
        setUploading(false);
        return;
      }
      if (form.imageFiles.length > 0) {
        imageUrls = await uploadImages(form.imageFiles);
      }
      if (!imageUrls || imageUrls.length === 0) {
        setError('Image upload failed. Please try again.');
        setUploading(false);
        return;
      }
      if (imageUrls.length > 5) {
        setError('Please upload 1-5 images only.');
        setUploading(false);
        return;
      }
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch('/api/products' + (editId ? `?id=${editId}` : ''), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          salePrice: form.salePrice ? Number(form.salePrice) : undefined,
          sku: form.sku,
          category: form.category,
          description: form.description,
          images: imageUrls,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to add product');
      setShowForm(false);
      setForm({ name: '', price: '', salePrice: '', sku: '', category: '', description: '', images: [], imageFiles: [] });
      setEditId(null);
      fetch('/api/products').then(res => res.json()).then(setProducts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold" onClick={() => setShowForm(true)}>Add Product</button>
      </div>
      {/* Product List */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-xl shadow text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 md:p-3">Images</th>
              <th className="p-2 md:p-3">Name</th>
              <th className="p-2 md:p-3">Price</th>
              <th className="p-2 md:p-3">Sale Price</th>
              <th className="p-2 md:p-3">SKU</th>
              <th className="p-2 md:p-3">Category</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => (
              <tr key={p._id} className="border-b">
                <td className="p-2 md:p-3 flex gap-2 flex-wrap">
                  {p.images?.map((img: string, i: number) => (
                    <img key={i} src={img} alt="Product" className="w-10 h-10 md:w-12 md:h-12 object-cover rounded" />
                  ))}
                </td>
                <td className="p-2 md:p-3 font-semibold">{p.name}</td>
                <td className="p-2 md:p-3">Rs. {p.price}</td>
                <td className="p-2 md:p-3">{p.salePrice ? `Rs. ${p.salePrice}` : '-'}</td>
                <td className="p-2 md:p-3">{p.sku}</td>
                <td className="p-2 md:p-3">{p.category}</td>
                <td className="p-2 md:p-3 flex flex-col md:flex-row gap-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Product Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-4 relative" onSubmit={handleSubmit}>
            <button type="button" className="absolute top-2 right-2 text-2xl" onClick={() => setShowForm(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-2">Add Product</h2>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <input name="name" value={form.name} onChange={handleInput} required placeholder="Product Name" className="border p-2 rounded" />
            <input name="price" value={form.price} onChange={handleInput} required placeholder="Price" type="number" className="border p-2 rounded" />
            <input name="salePrice" value={form.salePrice} onChange={handleInput} placeholder="Sale Price" type="number" className="border p-2 rounded" />
            <input name="sku" value={form.sku} onChange={handleInput} required placeholder="SKU" className="border p-2 rounded" />
            <select name="category" value={form.category} onChange={handleInput} required className="border p-2 rounded">
              <option value="">Select Category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea name="description" value={form.description} onChange={handleInput} placeholder="Description" className="border p-2 rounded" />
            <input type="file" accept="image/*" multiple onChange={handleFiles} required className="border p-2 rounded" />
            <div className="flex gap-2 flex-wrap">
              {form.imageFiles.length > 0 && Array.from(form.imageFiles).map((file, i) => (
                <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">{file.name}</span>
              ))}
            </div>
            <button type="submit" className="bg-black text-white py-2 rounded-lg font-semibold mt-2" disabled={uploading}>{uploading ? 'Uploading...' : 'Add Product'}</button>
          </form>
        </div>
      )}
    </div>
  );
} 