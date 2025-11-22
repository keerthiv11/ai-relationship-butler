import pool from "../config/db.js";

export const createNote = async (userId, content) => {
    const result = await pool.query(
        `INSERT INTO notes (user_id, content) VALUES ($1, $2) RETURNING *`,
        [userId, content]
    );
    return result.rows[0];
};

export const getNotesByUser = async (userId) => {
    const result = await pool.query(
        `SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
    );
    return result.rows;
};
