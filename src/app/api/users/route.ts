import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(): Promise<NextResponse> {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const data = await req.json();
  const user = await User.create(data);
  return NextResponse.json(user, { status: 201 });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const { id, ...updates } = await req.json();
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const { id } = await req.json();
  const user = await User.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  return NextResponse.json(user);
}
