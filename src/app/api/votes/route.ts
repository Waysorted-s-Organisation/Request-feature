import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Vote from "@/models/Vote";
import { IVote, ApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<IVote[] | ApiResponse>> {
  try {
    await connectDB();
    const votes = await Vote.find().populate("userId requestId") as IVote[];
    return NextResponse.json(votes);
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch votes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<IVote | ApiResponse>> {
  try {
    await connectDB();
    const data = await req.json();
    const vote = await Vote.create(data) as IVote;
    return NextResponse.json(vote, { status: 201 });
  } catch (err) {
    console.error("Error creating vote:", err);
    return NextResponse.json({ success: false, error: "Duplicate vote" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    await connectDB();
    const { id } = await req.json();
    await Vote.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vote:", error);
    return NextResponse.json({ success: false, error: "Failed to delete vote" }, { status: 500 });
  }
}
