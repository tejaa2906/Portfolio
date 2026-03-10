import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { defaultProfile, defaultProjects } from "./data/defaultPortfolio.js";
import { Message } from "./models/Message.js";
import { Profile } from "./models/Profile.js";
import { Project } from "./models/Project.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const inMemoryMessages = [];

app.use(
  cors({
    origin: clientUrl
  })
);
app.use(express.json());

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI missing. Running without MongoDB persistence.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed. Running with fallback data.", error.message);
    return false;
  }
};

const dbConnected = await connectToDatabase();

app.get("/api/health", (_, res) => {
  res.json({
    status: "ok",
    database: dbConnected ? "connected" : "fallback"
  });
});

app.get("/api/profile", async (_, res) => {
  if (!dbConnected) {
    return res.json(defaultProfile);
  }

  const profile = await Profile.findOne().lean();
  return res.json(profile || defaultProfile);
});

app.get("/api/projects", async (_, res) => {
  if (!dbConnected) {
    return res.json(defaultProjects);
  }

  const projects = await Project.find().sort({ order: 1, title: 1 }).lean();
  return res.json(projects.length ? projects : defaultProjects);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }

  if (dbConnected) {
    const saved = await Message.create({ name, email, message });
    return res.status(201).json({
      message: "Message received.",
      storedIn: "mongodb",
      id: saved._id
    });
  }

  inMemoryMessages.push({
    id: inMemoryMessages.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  });

  return res.status(201).json({
    message: "Message received.",
    storedIn: "memory"
  });
});

app.use((_, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((error, _, res, __) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  if (dbConnected) {
    await mongoose.connection.close();
  }

  process.exit(0);
});
