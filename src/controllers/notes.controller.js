import { createNote, getNotesByUser } from "../models/notes.model.js";

export const addNote = async (req, res) => {
    const userId = req.user.id;
    const { content } = req.body;

    try {
        const newNote = await createNote(userId, content);
        return res.status(201).json(newNote);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getMyNotes = async (req, res) => {
    const userId = req.user.id;

    try {
        const notes = await getNotesByUser(userId);
        return res.json(notes);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
