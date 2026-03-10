import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    intro: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
