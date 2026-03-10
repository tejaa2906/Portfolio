import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stack: { type: [String], default: [] },
    liveUrl: { type: String, default: "" },
    repoUrl: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
