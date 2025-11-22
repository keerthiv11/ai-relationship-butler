import express from "express";
import cors from "cors";
import "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/ai", aiRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Cupid Companion API running" });
});

export { app };
