import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
