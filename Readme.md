# Query Craft

A full-stack web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with integrations including **Firebase Authentication**, **MongoDB Atlas**, and **Azure PostgreSQL**.

Please visit this link for project explaination:-
[Watch the demo video](https://drive.google.com/file/d/1geJWT4IPUntVA5V0vlVsOCTkDWWG5HZT/view?usp=drive_link)

---

## 🚀 Features

- 🔐 Firebase Authentication
- 🌐 MongoDB Atlas for NoSQL storage
- 💾 Azure PostgreSQL for relational data
- ⚙️ Environment-based configuration
- 🧠 Structured backend and frontend separation
- ⚡ Vite-powered React frontend
- 🔁 Live-reloading with `nodemon` for backend

---

## 📁 Folder Structure

project-root/
├── client/ # React frontend
│ └── .env # Frontend environment variables
├── server/ # Express backend
│ ├── .env # Backend environment variables
│ ├── server.js # Entry point
│ └── configs/
│ └── final-project-9a212-firebase-adminsdk-4lbfq-7123055594.json
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Setup Frontend (Client)

```bash
cd client
npm install
```

Create a .env file in the client/ directory:

```env
VITE_API_KEY=""
VITE_AUTH_DOMAIN=""
VITE_PROJECT_ID=""
VITE_STORAGE_BUCKET=""
VITE_MESSAGING_SENDER_ID=""
VITE_APP_ID=""
VITE_MEASUREMENT_ID=""
VITE_PORT=5000
VITE_WEBSITE_URL="http://localhost"
```

Start the frontend server:

``` bash
npm run dev
```

### 3. Setup Backend (Server)

```bash
cd server
npm install
```

Create a .env file in the server/ directory:

```env
PORT=5000
MONGO_URL=""
API_URL="http://127.0.0.1:"
AZURE_POSTGRE_SQL_USER=""
AZURE_POSTGRE_SQL_PASSWORD=""
AZURE_POSTGRE_SQL_HOST=""
AZURE_POSTGRE_SQL_DATABASE=""
AZURE_POSTGRE_SQL_PORT=
FIREBASE_API_KEY=""
GROQ_API_KEY=""
FRONTEND_URL="http://localhost"
FRONTEND_PORT=5173
```

Add your Firebase Admin SDK file at:

server/configs/final-project-9a212-firebase-adminsdk-4lbfq-7123055594.json

With the following structure:
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}
```
Start the backend server:
```bash
npx nodemon server.js
```
☁️ Cloud Setup Guide
🔐 Firebase
Visit Firebase Console

Create a new project

Enable Authentication (Email/Password, Google, etc.)

Add config to client/.env

🍃 MongoDB Atlas
Visit MongoDB Atlas

Create a cluster and database

Whitelist your IP address

Add the connection string to MONGO_URL in server/.env

🐘 Azure PostgreSQL
Visit Azure Portal

Create a PostgreSQL Flexible Server

Get your credentials and populate the relevant AZURE_POSTGRE_SQL_* variables in server/.env

🧪 Tech Stack
Frontend: React, Vite

Backend: Node.js, Express

Databases: MongoDB Atlas, Azure PostgreSQL

Authentication: Firebase

Hosting/Cloud: Firebase, Azure

📦 Build for Production
To create a production build of the frontend:

```bash
cd client
npm run build
```

📬 Contact
For issues or feature requests, please open an issue or contact the maintainer.

Let me know if you want to include GitHub Actions CI, Docker support, deployment instructions (like Vercel, Netlify, or Render), or contribution guidelines.
