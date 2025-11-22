import OpenAI from "openai";
import { createNote } from "../models/notes.model.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAiReply = async (userId, content) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a relationship support assistant that helps users reflect on their interactions." },
      { role: "user", content }
    ],
    max_tokens: 200
  });

  const aiReply = response.choices[0].message.content;

  await createNote(userId, aiReply);

  return aiReply;
};
