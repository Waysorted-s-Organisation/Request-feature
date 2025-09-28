import mongoose, { Model } from "mongoose";
import { INotification } from "../types/index.js";

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["comment", "vote", "system"], required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default (mongoose.models.Notification as Model<INotification>) || mongoose.model<INotification>("Notification", NotificationSchema);
