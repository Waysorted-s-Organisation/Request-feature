import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Board from "@/models/Board";
import { IBoard, ApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<IBoard[] | ApiResponse>> {
  try {
    await connectDB();
    const boards = await Board.find().populate("ownerId") as IBoard[];
    return NextResponse.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch boards" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<IBoard | ApiResponse>> {
  try {
    await connectDB();
    const data = await req.json();
    const board = await Board.create(data) as IBoard;
    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error("Error creating board:", error);
    return NextResponse.json({ success: false, error: "Failed to create board" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse<IBoard | ApiResponse>> {
  try {
    await connectDB();
    const { id, ...updates } = await req.json();
    const board = await Board.findByIdAndUpdate(id, updates, { new: true }) as IBoard;
    return NextResponse.json(board);
  } catch (error) {
    console.error("Error updating board:", error);
    return NextResponse.json({ success: false, error: "Failed to update board" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<IBoard | ApiResponse>> {
  try {
    await connectDB();
    const { id } = await req.json();
    const board = await Board.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }) as IBoard;
    return NextResponse.json(board);
  } catch (error) {
    console.error("Error deleting board:", error);
    return NextResponse.json({ success: false, error: "Failed to delete board" }, { status: 500 });
  }
}
