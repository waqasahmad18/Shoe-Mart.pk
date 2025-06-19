import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ['pending', 'published'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Review = models.Review || model('Review', ReviewSchema);

export async function POST(req: NextRequest) {
  await connectDB();
  const { productId, name, rating, text } = await req.json();
  if (!productId || !name || !rating || !text) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const review = await Review.create({ productId, name, rating, text, status: 'pending' });
  return NextResponse.json(review, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  const admin = searchParams.get('admin');
  const filter: Record<string, unknown> = {};
  if (productId) filter.productId = productId;
  if (!admin) filter.status = 'published';
  const reviews = await Review.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(reviews);
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { id, action } = await req.json();
  if (!id || !action) {
    return NextResponse.json({ error: 'Missing id or action' }, { status: 400 });
  }
  if (action === 'publish') {
    const review = await Review.findByIdAndUpdate(id, { status: 'published' }, { new: true });
    return NextResponse.json(review);
  } else if (action === 'remove') {
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
} 