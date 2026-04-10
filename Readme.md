# TaskAnalyser

TaskAnalyser is a full-stack task tracking app with:

- `Frontend`: React + Vite + Tailwind CSS
- `Backend`: Node.js + Express
- `Database`: MongoDB
- `Container setup`: Docker + Docker Compose

## Project Structure

```text
TaskAnalyser/
|-- Backend/
|   |-- controller/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- Dockerfile
|   |-- package.json
|   `-- server.js
|-- Frontend/
|   |-- public/
|   |-- src/
|   |-- Dockerfile
|   |-- package.json
|   `-- vite.config.js
|-- docker-compose.yml
`-- Readme.md
```

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express
- Mongoose
- JWT authentication
- Cookie-based auth

### DevOps

- Docker
- Docker Compose
- MongoDB

## Prerequisites

Make sure these are installed before setup:

- Node.js 20 or later
- npm
- MongoDB local server, or MongoDB Atlas URI
- Docker Desktop

## Backend Setup

### 1. Move into backend

```bash
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file inside `Backend/`.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
PORT=5000
JWT_SECRET=secretkey
```

### 4. Start the backend

```bash
npm start
```

### 5. Backend runs on

```text
http://localhost:5000
```

### Backend API routes

- `POST /register`
- `POST /login`
- `POST /logout`
- `GET /isAuth`
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Frontend Setup

### 1. Move into frontend

```bash
cd Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Frontend runs on

```text
http://localhost:5173
```

## Running Frontend and Backend Locally

Open two terminals.

### Terminal 1

```bash
cd Backend
npm install
npm start
```

### Terminal 2

```bash
cd Frontend
npm install
npm run dev
```

## Docker Setup

This project includes:

- [Backend/Dockerfile](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Backend\Dockerfile)
- [Frontend/Dockerfile](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Frontend\Dockerfile)
- [docker-compose.yml](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\docker-compose.yml)

### Build and run containers

From the project root:

```bash
docker compose up --build
```

### Run in detached mode

```bash
docker compose up -d --build
```

### Stop containers

```bash
docker compose down
```

### Remove containers and volumes

```bash
docker compose down -v
```

## Docker Services

### MongoDB

- Container name: `task_mongo`
- Default port: `27017`

### Backend

- Container name: `task_backend`
- Intended app port in code: `5000`

### Frontend

- Container name: `task_frontend`
- Exposed port: `5173`

## Important Notes About Current Setup

The current repository has a few configuration mismatches that are worth knowing before you run it.

### 1. Backend port mismatch

The backend server currently listens on port `5000` in [server.js](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Backend\server.js), but:

- [Backend/Dockerfile](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Backend\Dockerfile) exposes `3000`
- [docker-compose.yml](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\docker-compose.yml) maps `3000:3000`

For Docker to work correctly, these should be aligned to the same port.

### 2. Frontend uses deployed backend URLs

The frontend components currently call:

- `https://task-analyser-75tk.onrender.com/login`
- `https://task-analyser-75tk.onrender.com/register`
- `https://task-analyser-75tk.onrender.com/isAuth`
- `https://task-analyser-75tk.onrender.com/tasks`

That means local frontend + local backend will not fully work unless those URLs are changed to your local backend, for example:

```text
http://localhost:5000
```

Affected files:

- [Login.jsx](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Frontend\src\components\Login.jsx)
- [Register.jsx](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Frontend\src\components\Register.jsx)
- [ProtectedRoute.jsx](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Frontend\src\components\ProtectedRoute.jsx)
- [TaskPage.jsx](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Frontend\src\components\TaskPage.jsx)

### 3. Docker compose folder names

The root [docker-compose.yml](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\docker-compose.yml) uses:

```yml
build: ./backend
build: ./frontend
```

But the actual folder names in this repo are:

```text
Backend
Frontend
```

On case-sensitive systems, this can break the build.

### 4. JWT secret is hardcoded in code

Authentication currently uses `"secretkey"` directly in:

- [auth.controller.js](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Backend\controller\auth.controller.js)
- [auth.js](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Backend\middleware\auth.js)

For production, it should be moved to `process.env.JWT_SECRET`.

### 5. Mongo connection happens in model file

MongoDB is currently connected inside [task.model.js](c:\Users\Ayush Kumar Ray\Desktop\TaskAnalyser\Backend\models\task.model.js). A cleaner setup is to connect once during server startup.

## Recommended Environment Improvements

For a cleaner local and Docker setup, consider adding:

- `Frontend/.env` with something like `VITE_API_URL=http://localhost:5000`
- `Backend/.env` with `MONGO_URI`, `PORT`, and `JWT_SECRET`
- a shared config pattern instead of hardcoded URLs

Example frontend env:

```env
VITE_API_URL=http://localhost:5000
```

Then use:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

## Useful Commands

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend

```bash
npm start
```

## Production Deployment Idea

One simple deployment path is:

- Frontend on Vercel
- Backend on Render or Railway
- MongoDB on MongoDB Atlas

If you do that, update:

- backend CORS origin
- frontend API base URL
- cookie settings
- JWT secret

## Summary

To run the project successfully:

1. Start MongoDB.
2. Run the backend on port `5000`.
3. Run the frontend on port `5173`.
4. Update frontend API URLs if you want to use the local backend instead of the deployed Render backend.
5. Align Docker ports and folder names before relying on Docker for local development.
