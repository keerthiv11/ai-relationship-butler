import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.model.js";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(email, hashedPassword);

        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.json({ token, user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
