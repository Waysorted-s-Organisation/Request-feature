import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { IUser, ApiResponse } from "@/types";

export async function GET(): Promise<NextResponse<IUser[] | ApiResponse>> {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<IUser | ApiResponse>> {
  try {
    await connectDB();
    const data = await req.json();
    const user = await User.create(data) as IUser;
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse<IUser | ApiResponse>> {
  try {
    await connectDB();
    const { id, ...updates } = await req.json();
    const user = await User.findByIdAndUpdate(id, updates, { new: true }) as IUser;
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<IUser | ApiResponse>> {
  try {
    await connectDB();
    const { id } = await req.json();
    const user = await User.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }) as IUser;
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}
