import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { generateAiReply } from "../services/ai.service.js";

const router = express.Router();

router.post("/ask", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { content } = req.body;

    try {
        const aiReply = await generateAiReply(userId, content);

        return res.json({
            reply: aiReply
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "AI Error" });
    }
});

export default router;
