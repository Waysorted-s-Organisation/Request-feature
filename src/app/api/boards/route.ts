import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Board from "@/models/Board";

export async function GET(): Promise<NextResponse> {
  await connectDB();
  const boards = await Board.find().populate("ownerId");
  return NextResponse.json(boards);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const data = await req.json();
  const board = await Board.create(data);
  return NextResponse.json(board, { status: 201 });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const { id, ...updates } = await req.json();
  const board = await Board.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(board);
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const { id } = await req.json();
  const board = await Board.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  return NextResponse.json(board);
}
