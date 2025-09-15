import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  initials: { type: String, required: true },
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  paymentTokenId: { type: String },
  subscriptionStatus: { type: String, enum: ["free", "paid", "expired"], default: "free" },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
