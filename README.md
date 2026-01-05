# Real-Time Chat Application (ChatStream)

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://real-time-chat-application-yndi.onrender.com)
**Live Link:** [https://real-time-chat-application-yndi.onrender.com](https://real-time-chat-application-yndi.onrender.com)

## 🚀 How to Start the Project

This project consists of two parts: the **Server** (Backend) and the **Client** (Frontend). You need to run both simultaneously.

### Prerequisites
- **PostgreSQL**: Ensure your PostgreSQL database service is running.
- **Node.js**: Installed on your machine.

---

### 1. Start the Backend Server
The server handles the database connections and socket real-time events.

1. Open a terminal.
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies (first time only):
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *You should see: `SERVER RUNNING ON PORT 3001`*

### 2. Start the Frontend Client
The client is the React web interface.

1. Open a **new** terminal window/tab.
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies (first time only):
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run dev
   ```
5. Open the link shown (usually `http://localhost:5173`) in your browser.

---

### 3. Using the App
- Open **http://localhost:5173** in two different browser tabs (or use Incognito mode for the second one).
- Login with different names (e.g., "Alice" and "Bob") but the **same Room ID** (e.g., "1").
- Chat away! Messages will sync in real-time and save to the database.
