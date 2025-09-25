import mongoose, { Document } from "mongoose";

interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: "comment" | "vote" | "system";
  message: string;
  read: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["comment", "vote", "system"], required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default (mongoose.models.Notification as mongoose.Model<INotification>) || mongoose.model<INotification>("Notification", NotificationSchema);
export type { INotification };
