import mongoose, { Document } from "mongoose";

interface IBoard extends Document {
  title: string;
  description?: string;
  visibility: "public" | "private";
  ownerId: mongoose.Types.ObjectId;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default (mongoose.models.Board as mongoose.Model<IBoard>) || mongoose.model<IBoard>("Board", BoardSchema);
export type { IBoard };
