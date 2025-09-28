import mongoose, { Model } from "mongoose";
import { IComment } from "../types/index.js";

const CommentSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // threaded comments
  text: { type: String, required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default (mongoose.models.Comment as Model<IComment>) || mongoose.model<IComment>("Comment", CommentSchema);
