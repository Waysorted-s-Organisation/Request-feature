import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const user = await User.create(data);
  return NextResponse.json(user, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, ...updates } = await req.json();
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(user);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const user = await User.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  return NextResponse.json(user);
}
