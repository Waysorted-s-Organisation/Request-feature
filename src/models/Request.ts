import mongoose, { Document } from "mongoose";

interface IRequest extends Document {
  title: string;
  description?: string;
  type: "feature" | "bug";
  status: "planned" | "in-progress" | "not done" | "released";
  userId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  attachments: string[];
  votes: mongoose.Types.ObjectId[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ["feature", "bug"], required: true },
  status: { type: String, enum: ["planned", "in-progress", "not done", "released"], default: "planned" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  attachments: [{ type: String }], // Azure Blob URLs
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default (mongoose.models.Request as mongoose.Model<IRequest>) || mongoose.model<IRequest>("Request", RequestSchema);
export type { IRequest };
