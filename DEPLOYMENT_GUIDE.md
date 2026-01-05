# 🚀 Ultimate Deployment Guide for Render.com

This guide contains the **exact** step-by-step instructions to host your Real-Time Chat Application on Render.com.

Since your project is a **Monorepo** (Server and Client in one repo), you must deploy them as three separate components in this specific order:
1.  **Database** (PostgreSQL)
2.  **Backend** (Web Service)
3.  **Frontend** (Static Site)

---

## ✅ Phase 1: The Cloud Database
*We need a database first so the backend has something to connect to.*

1.  Log in to [Render Dashboard](https://dashboard.render.com/).
2.  Click the blue **"New +"** button and select **"PostgreSQL"**.
3.  Fill in these details exactly:
    *   **Name**: `chat-db` (or any unique name).
    *   **Database**: `chat_app`
    *   **User**: `postgres`
    *   **Region**: Choose the one closest to you (e.g., Singapore).
    *   **PostgreSQL Version**: 15 or 16 (Latest is fine).
    *   **Instance Type**: Select **"Free"** (Essential for $0 cost).
4.  Click **"Create Database"**.
5.  **WAIT**: It will take 1-2 minutes to be "Available".
6.  Once ready, look for the **"Connections"** section.
7.  Find **"Internal Database URL"**. Click the "Copy to Clipboard" icon.
    *   *Save this! You will need it in Phase 2.*

---

## ✅ Phase 2: The Backend (Node.js Server)
*This is your API server that handles Socket.io connections.*

1.  Click **"New +"** and select **"Web Service"**.
2.  Select **"Build and deploy from a Git repository"**.
3.  Connect your GitHub repository: `Real-Time-Chat-Application`.
4.  Fill in these details exactly:
    *   **Name**: `chat-backend`
    *   **Region**: *Must* be same as Database (e.g., Singapore).
    *   **Branch**: `main`
    *   **Root Directory**: `server`  <-- ⚠️ **CRITICAL**
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
    *   **Instance Type**: **"Free"**
5.  Scroll down to **"Environment Variables"** and click **"Add Environment Variable"**.
    *   **Key**: `DATABASE_URL`
    *   **Value**: *(Paste the Internal Database URL from Phase 1)*
6.  Click **"Create Web Service"**.
7.  **WAIT**: Watch the logs. It will install deps and start.
8.  Once you see "Live" (Green badge), look at the top-left for your URL.
    *   It will look like: `https://chat-backend-xxxx.onrender.com`
    *   *Copy this URL! You need it in Phase 3.*

---

## ✅ Phase 3: The Frontend (React UI)
*This is the website users will actually see.*

1.  Click **"New +"** and select **"Static Site"**.
    *   *Do NOT use Web Service for the frontend. Static Site is faster and free.*
2.  Connect your GitHub repository: `Real-Time-Chat-Application`.
3.  Fill in these details exactly:
    *   **Name**: `chat-frontend`
    *   **Branch**: `main`
    *   **Root Directory**: `client` <-- ⚠️ **CRITICAL**
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
4.  Scroll down to **"Environment Variables"**.
    *   **Key**: `VITE_SERVER_URL`
    *   **Value**: *(Paste the Backend URL from Phase 2)*
        *   Example: `https://chat-backend-xxxx.onrender.com`
5.  Click **"Create Static Site"**.
6.  **WAIT**: It will build your React app.
7.  Once "Live", click the URL at the top (e.g., `https://chat-frontend-yyyy.onrender.com`).

---

## 🎉 You are Live!
*   Open the Frontend URL on your Laptop.
*   Open the Frontend URL on your Phone.
*   Join "Room 1" on both and verify they can chat!
