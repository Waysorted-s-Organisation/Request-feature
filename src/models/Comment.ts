import mongoose, { Document } from "mongoose";

interface IComment extends Document {
  requestId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId | null;
  text: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // threaded comments
  text: { type: String, required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default (mongoose.models.Comment as mongoose.Model<IComment>) || mongoose.model<IComment>("Comment", CommentSchema);
export type { IComment };
