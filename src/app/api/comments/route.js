import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";

export async function GET() {
  await connectDB();
  const comments = await Comment.find()
    .populate("userId requestId parentId");
  return NextResponse.json(comments);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const comment = await Comment.create(data);
  return NextResponse.json(comment, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, ...updates } = await req.json();
  const comment = await Comment.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(comment);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const comment = await Comment.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  return NextResponse.json(comment);
}
