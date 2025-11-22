import express from "express";
import { addNote, getMyNotes } from "../controllers/notes.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addNote);
router.get("/", authMiddleware, getMyNotes);

export default router;
