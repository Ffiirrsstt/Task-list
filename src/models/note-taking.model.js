import mongoose, { Schema } from "mongoose";

//ชื่อ คำอธิบาย สถานะ แท็ก
const noteTakingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: [
      "Pending",
      "In-Progress",
      "Completed",
      "Cancelled",
      "Deferred",
      "Overdue",
      "Blocked",
    ],
    required: true,
  },
  tag: { type: String },
});

export const noteTakingModel = mongoose.model("note-taking", noteTakingSchema);
