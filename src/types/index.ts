import { Document, Types } from "mongoose";
import { DefaultSession } from "next-auth";

// User types
export interface IUser extends Document {
  _id: Types.ObjectId;
  initials: string;
  fullName?: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  paymentTokenId?: string;
  subscriptionStatus: "free" | "paid" | "expired";
  requests: Types.ObjectId[];
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Request types
export interface IRequest extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  type: "feature" | "bug";
  status: "planned" | "in-progress" | "not done" | "released";
  userId: Types.ObjectId;
  boardId: Types.ObjectId;
  attachments: string[];
  votes: Types.ObjectId[];
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Board types
export interface IBoard extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  visibility: "public" | "private";
  ownerId: Types.ObjectId;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Vote types
export interface IVote extends Document {
  _id: Types.ObjectId;
  requestId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Comment types
export interface IComment extends Document {
  _id: Types.ObjectId;
  requestId: Types.ObjectId;
  userId: Types.ObjectId;
  parentId?: Types.ObjectId;
  text: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Notification types
export interface INotification extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: "comment" | "vote" | "system";
  message: string;
  read: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Authentication types
export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  initials: string;
  role: "user" | "admin";
}

// NextAuth types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    email?: string;
  }
}

// Context types
export interface RequestContextType {
  requests: IRequest[];
  setRequests: (requests: IRequest[]) => void;
  fetchRequests: () => Promise<void>;
  addRequest: (request: IRequest) => void;
  updateRequest: (id: string, updates: Partial<IRequest>) => void;
  deleteRequest: (id: string) => void;
}

export interface ChatContextType {
  messages: any[];
  setMessages: (messages: any[]) => void;
  addMessage: (message: any) => void;
}

export interface MyRequestContextType {
  myRequests: IRequest[];
  setMyRequests: (requests: IRequest[]) => void;
  fetchMyRequests: () => Promise<void>;
  files: File[];
  setFiles: (files: File[]) => void;
}

// MyRequest interface for local context
export interface MyRequest {
  id: string;
  title: string;
  description: string;
  details: string;
  status: string;
  votes: number;
  date: string;
}