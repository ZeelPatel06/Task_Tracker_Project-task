# Task Tracker - MERN Stack Application

A full-stack Task Tracker web application built using the MERN stack (MongoDB, Express, React, Node.js). This project provides complete task CRUD functionalities (Create, Read, Update, Delete) with status filtering, real-time title search, validation, and toast notifications.

---

## Tech Stack

### Frontend
- **React (Vite)**: Fast, modern UI development
- **Axios**: Dedicated service layer for REST API communication
- **Vanilla CSS**: Clean, responsive layout with custom design variables, transitions, and glassmorphic elements

### Backend
- **Node.js & Express.js**: RESTful routing and server-side logic
- **MongoDB & Mongoose**: Object modeling and document storage
- **Cors & Dotenv**: Cross-origin resource sharing and configuration management

---

## Project Structure

```text
task-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx      # Add/Edit Task Form with validation
│   │   │   ├── TaskCard.jsx      # Displays single task details
│   │   │   └── TaskList.jsx      # Map list & handles empty state
│   │   ├── pages/
│   │   │   └── Home.jsx          # App coordinator & state management
│   │   ├── services/
│   │   │   └── api.js            # Axios client configuration
│   │   ├── App.jsx               # Renders Home component
│   │   ├── main.jsx              # Application entry point
│   │   └── index.css             # Premium custom stylesheet
│   └── package.json
│
└── server/
    ├── config/
    │   └── db.js                 # MongoDB connection
    ├── controllers/
    │   └── taskController.js     # DB controllers & validation
    ├── models/
    │   └── Task.js               # Mongoose Schema
    ├── routes/
    │   └── taskRoutes.js         # API endpoint definitions
    ├── .env.example
    ├── server.js                 # Main server entry file
    └── package.json
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or a local MongoDB instance running

### 1. Backend Setup
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` to create your own configuration:
   ```bash
   cp .env.example .env
   ```
4. Update the variables in `.env` with your Mongo URI:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-tracker
   ```
5. Run in development mode:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` to create your own configuration:
   ```bash
   cp .env.example .env
   ```
4. Ensure `VITE_API_URL` points to your backend URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
5. Run Vite dev server:
   ```bash
   npm run dev
   ```
The app will be available locally at `http://localhost:3000`.

---

## Environment Variables

### Backend (`server/.env`)
- `PORT`: Server port number (default `5000`)
- `MONGO_URI`: The connection string for your MongoDB instance
- `NODE_ENV`: Runtime environment (`development` or `production`)

### Frontend (`client/.env`)
- `VITE_API_URL`: The entry point for the REST API (e.g., `http://localhost:5000/api`)

---

## API Endpoints

All routes are prefixed with `/api`.

| Method | Endpoint | Description | Request Body | Response Codes |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Get all tasks | None | `200` (Success), `500` (Error) |
| **GET** | `/api/tasks/:id` | Get single task by ID | None | `200` (Success), `400` (Invalid ID), `404` (Not Found), `500` |
| **POST** | `/api/tasks` | Create a new task | `{ "title": "String", "description": "String", "status": "Pending"\|"Completed" }` | `201` (Created), `400` (Validation Error), `500` |
| **PUT** | `/api/tasks/:id` | Update task details | `{ "title": "String", "description": "String", "status": "Pending"\|"Completed" }` | `200` (Success), `400` (Validation Error), `404` (Not Found), `500` |
| **DELETE** | `/api/tasks/:id` | Delete task by ID | None | `200` (Success), `404` (Not Found), `500` |

---

## Deployment Links

- **Frontend Deployment (Vercel)**: `[Live Frontend URL Placeholder]`
- **Backend Deployment (Render)**: `[Live Backend API Placeholder]`
