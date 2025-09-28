import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import { IComment, ApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<IComment[] | ApiResponse>> {
  try {
    await connectDB();
    const comments = await Comment.find()
      .populate("userId requestId parentId") as IComment[];
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<IComment | ApiResponse>> {
  try {
    await connectDB();
    const data = await req.json();
    const comment = await Comment.create(data) as IComment;
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ success: false, error: "Failed to create comment" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse<IComment | ApiResponse>> {
  try {
    await connectDB();
    const { id, ...updates } = await req.json();
    const comment = await Comment.findByIdAndUpdate(id, updates, { new: true }) as IComment;
    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ success: false, error: "Failed to update comment" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<IComment | ApiResponse>> {
  try {
    await connectDB();
    const { id } = await req.json();
    const comment = await Comment.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }) as IComment;
    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ success: false, error: "Failed to delete comment" }, { status: 500 });
  }
}
