const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Auto-create table if it doesn't exist (Antigravity Magic)
const initDb = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        room VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        time VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("Database initialized: 'messages' table check passed.");
        client.release();
    } catch (err) {
        console.error("Database connection error:", err.message);
        console.error("Please check your .env file and ensure PostgreSQL is running.");
    }
};

initDb();

module.exports = pool;
