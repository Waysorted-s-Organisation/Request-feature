import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // threaded comments
  text: { type: String, required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
