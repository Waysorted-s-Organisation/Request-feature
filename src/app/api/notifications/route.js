import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notification from "@/models/Notification";

export async function GET() {
  await connectDB();
  const notifications = await Notification.find().populate("userId");
  return NextResponse.json(notifications);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const notification = await Notification.create(data);
  return NextResponse.json(notification, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, ...updates } = await req.json();
  const notification = await Notification.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(notification);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const notification = await Notification.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  return NextResponse.json(notification);
}
