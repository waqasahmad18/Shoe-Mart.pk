import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { model as inventoryModel, models as inventoryModels, Schema as InventorySchema } from 'mongoose';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  sku: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Men', 'Women', 'Kids'], required: true },
  images: {
    type: [String],
    validate: [(arr: string[]) => arr.length > 0 && arr.length <= 5, 'Must have 1-5 images'],
    required: true,
  },
  description: String,
  inventory: { type: Number, default: 0 },
}, { timestamps: true });

const Product = models.Product || model('Product', ProductSchema);

// Inventory model for creating inventory record after product creation
const Inventory = inventoryModels.Inventory || inventoryModel('Inventory', new InventorySchema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  location: { type: String, default: 'Main Warehouse' },
  updatedAt: { type: Date, default: Date.now },
}));

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  // Check content type
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    // Handle image upload
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      if (!file) {
        return NextResponse.json({ error: 'No file found' }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }).end(buffer);
      });
      return NextResponse.json(uploaded);
    } catch (err) {
      console.error('Upload Error:', JSON.stringify(err));
      return NextResponse.json({ error: 'Upload failed', details: JSON.stringify(err) }, { status: 500 });
    }
  } else {
    // Handle product creation
    await connectDB();
    const data = await req.json();
    if (!data.images || !Array.isArray(data.images) || data.images.length === 0 || data.images.length > 5) {
      return NextResponse.json({ error: 'Please upload 1-5 images.' }, { status: 400 });
    }
    const product = await Product.create(data);
    // Create inventory record for this product with default quantity 0
    await Inventory.create({ productId: product._id, quantity: 0, location: 'Main Warehouse' });
    return NextResponse.json(product, { status: 201 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
  }
  // Delete product
  await Product.findByIdAndDelete(id);
  // Delete inventory record(s) for this product
  await Inventory.deleteMany({ productId: id });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
  }
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
} 