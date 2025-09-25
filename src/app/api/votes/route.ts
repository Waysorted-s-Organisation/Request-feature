import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";

export async function GET(): Promise<NextResponse> {
  await connectDB();
  const votes = await Vote.find().populate("userId requestId");
  return NextResponse.json(votes);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const data = await req.json();
  try {
    const vote = await Vote.create(data);
    return NextResponse.json(vote, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Duplicate vote" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const { id } = await req.json();
  await Vote.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
