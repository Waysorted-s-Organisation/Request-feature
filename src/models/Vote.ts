import mongoose, { Model } from "mongoose";
import { IVote } from "../types/index.js";

const VoteSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

// Prevent duplicate votes per user per request
VoteSchema.index({ requestId: 1, userId: 1 }, { unique: true });

export default (mongoose.models.Vote as Model<IVote>) || mongoose.model<IVote>("Vote", VoteSchema);
