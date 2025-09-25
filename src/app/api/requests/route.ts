import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Request from "@/models/Request";

export async function GET(): Promise<NextResponse> {
  await connectDB();
  const requests = await Request.find()
    .populate("userId boardId votes");
  return NextResponse.json(requests);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const data = await req.json();
  const request = await Request.create(data);
  return NextResponse.json(request, { status: 201 });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const { id, ...updates } = await req.json();
  const request = await Request.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(request);
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const { id } = await req.json();
  const request = await Request.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  return NextResponse.json(request);
}
