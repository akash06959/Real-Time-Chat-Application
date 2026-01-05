const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity in development; tighten this for production
        methods: ["GET", "POST"],
    },
});

const pool = require("./db");

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", async (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);

        // Fetch last 50 messages from DB
        try {
            const result = await pool.query(
                "SELECT * FROM messages WHERE room = $1 ORDER BY id ASC LIMIT 50",
                [data]
            );
            // Emit strictly to the user who just joined
            socket.emit("load_messages", result.rows);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    });

    socket.on("send_message", async (data) => {
        console.log("Message received:", data);

        // Save to DB
        try {
            await pool.query(
                "INSERT INTO messages (room, author, message, time) VALUES ($1, $2, $3, $4)",
                [data.room, data.author, data.message, data.time]
            );
        } catch (err) {
            console.error("Error saving message:", err);
        }

        // Broadcast
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
