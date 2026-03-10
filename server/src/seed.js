import dotenv from "dotenv";
import mongoose from "mongoose";

import { defaultProfile, defaultProjects } from "./data/defaultPortfolio.js";
import { Profile } from "./models/Profile.js";
import { Project } from "./models/Project.js";

dotenv.config();

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required for seeding.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  await Profile.deleteMany({});
  await Project.deleteMany({});

  await Profile.create(defaultProfile);
  await Project.insertMany(defaultProjects);

  console.log("Seed complete.");
  await mongoose.connection.close();
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
