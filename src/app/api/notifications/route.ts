import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notification from "@/models/Notification";
import { INotification, ApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<INotification[] | ApiResponse>> {
  try {
    await connectDB();
    const notifications = await Notification.find().populate("userId") as INotification[];
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<INotification | ApiResponse>> {
  try {
    await connectDB();
    const data = await req.json();
    const notification = await Notification.create(data) as INotification;
    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse<INotification | ApiResponse>> {
  try {
    await connectDB();
    const { id, ...updates } = await req.json();
    const notification = await Notification.findByIdAndUpdate(id, updates, { new: true }) as INotification;
    return NextResponse.json(notification);
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json({ success: false, error: "Failed to update notification" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<INotification | ApiResponse>> {
  try {
    await connectDB();
    const { id } = await req.json();
    const notification = await Notification.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }) as INotification;
    return NextResponse.json(notification);
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json({ success: false, error: "Failed to delete notification" }, { status: 500 });
  }
}
