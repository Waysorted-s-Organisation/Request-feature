import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Request from "@/models/Request";
import { IRequest, ApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<IRequest[] | ApiResponse>> {
  try {
    await connectDB();
    const requests = await Request.find()
      .populate("userId boardId votes") as IRequest[];
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch requests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<IRequest | ApiResponse>> {
  try {
    await connectDB();
    const data = await req.json();
    const request = await Request.create(data) as IRequest;
    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json({ success: false, error: "Failed to create request" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse<IRequest | ApiResponse>> {
  try {
    await connectDB();
    const { id, ...updates } = await req.json();
    const request = await Request.findByIdAndUpdate(id, updates, { new: true }) as IRequest;
    return NextResponse.json(request);
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json({ success: false, error: "Failed to update request" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<IRequest | ApiResponse>> {
  try {
    await connectDB();
    const { id } = await req.json();
    const request = await Request.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }) as IRequest;
    return NextResponse.json(request);
  } catch (error) {
    console.error("Error deleting request:", error);
    return NextResponse.json({ success: false, error: "Failed to delete request" }, { status: 500 });
  }
}
