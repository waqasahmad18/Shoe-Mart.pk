import { NextRequest, NextResponse } from 'next/server';
import { Schema, model, models } from 'mongoose';
import { connectDB } from '@/lib/mongodb';

const InventorySchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  location: { type: String, default: 'Main Warehouse' },
  updatedAt: { type: Date, default: Date.now },
});

const Inventory = models.Inventory || model('Inventory', InventorySchema);

export async function GET() {
  await connectDB();
  const inventory = await Inventory.find().populate('productId');
  return NextResponse.json(inventory);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const record = await Inventory.create(data);
  return NextResponse.json(record, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { productId, quantity } = await req.json();
  const record = await Inventory.findOneAndUpdate(
    { productId },
    { $set: { quantity, updatedAt: new Date() } },
    { new: true }
  );
  return NextResponse.json(record);
} 