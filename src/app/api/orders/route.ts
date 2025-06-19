import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String,
  items: [
    {
      id: String,
      name: String,
      image: String,
      price: Number,
      size: String,
      color: String,
      quantity: Number,
    },
  ],
  status: { type: String, enum: ['pending', 'packed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model('Order', OrderSchema);

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const order = await Order.create({ ...data, status: 'pending' });
  return NextResponse.json(order, { status: 201 });
}

export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
  }
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json(order);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
} 