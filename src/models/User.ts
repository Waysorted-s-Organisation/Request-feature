import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  initials: string;
  fullName?: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  paymentTokenId?: string;
  subscriptionStatus: "free" | "paid" | "expired";
  requests: mongoose.Types.ObjectId[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

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

export default (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
export type { IUser };
