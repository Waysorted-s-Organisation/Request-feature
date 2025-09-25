import mongoose, { Document } from "mongoose";

interface IVote extends Document {
  requestId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VoteSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

// Prevent duplicate votes per user per request
VoteSchema.index({ requestId: 1, userId: 1 }, { unique: true });

export default (mongoose.models.Vote as mongoose.Model<IVote>) || mongoose.model<IVote>("Vote", VoteSchema);
export type { IVote };
