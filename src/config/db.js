import dotenv from "dotenv";
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(() => console.log("📦 PostgreSQL connected"))
  .catch(err => console.error("DB connection error:", err));

export default pool;
