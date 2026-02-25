# GlucoTrack

A full-stack MERN application for diabetes management. Track glucose levels, manage meals, and visualize health data.

## Overview

GlucoTrack allows diabetes patients to monitor their glucose levels, maintain a personal meal library, and visualize trends through interactive charts. The application supports different diabetes types with customizable target glucose ranges.

## Technology Stack

**Backend**

- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing

**Frontend**

- React 18 with Vite
- React Router v6
- TanStack Query
- Axios
- Tailwind CSS
- Recharts

## Features

- Secure JWT-based authentication with HTTP-only cookies
- Personal meal library with nutritional information
- Glucose tracking with multiple log types (fasting, before/after meal, bedtime, random)
- Interactive data visualization with customizable time ranges
- Gravatar integration for user avatars
- User-specific data isolation with ownership validation
- Responsive design with dark mode support

## Database Schema

### Users

```
name: String
email: String (unique)
password: String (hashed)
age: Number
diabetesType: String (type1, type2, gestational, prediabetes)
targetGlucose: { min: Number, max: Number }
role: String (user, admin)
```

### Meals

```
name: String
category: String (breakfast, lunch, dinner, snack, other)
carbsPerServing: Number
servingSize: String
userId: ObjectId (ref: User)
```

### Logs

```
userId: ObjectId (ref: User)
type: String (fasting, before_meal, after_meal, bedtime, random)
glucoseLevel: Number (20-600 mg/dL)
mealId: ObjectId (ref: Meal, optional)
notes: String
date: Date
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description                 | Auth Required |
| ------ | -------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/register` | Create new user account     | No            |
| POST   | `/api/auth/login`    | Authenticate user           | No            |
| POST   | `/api/auth/logout`   | Clear authentication cookie | Yes           |
| GET    | `/api/auth/profile`  | Get current user data       | Yes           |

### Meals

| Method | Endpoint         | Description        | Auth Required |
| ------ | ---------------- | ------------------ | ------------- |
| GET    | `/api/meals`     | Get all user meals | Yes           |
| POST   | `/api/meals`     | Create new meal    | Yes           |
| GET    | `/api/meals/:id` | Get single meal    | Yes           |
| PUT    | `/api/meals/:id` | Update meal        | Yes           |
| DELETE | `/api/meals/:id` | Delete meal        | Yes           |

### Logs

| Method | Endpoint        | Description          | Auth Required |
| ------ | --------------- | -------------------- | ------------- |
| GET    | `/api/logs`     | Get all user logs    | Yes           |
| POST   | `/api/logs`     | Create new log entry | Yes           |
| GET    | `/api/logs/:id` | Get single log       | Yes           |
| PUT    | `/api/logs/:id` | Update log           | Yes           |
| DELETE | `/api/logs/:id` | Delete log           | Yes           |

## Architecture

### Authentication Flow

1. User submits credentials
2. Backend validates and generates JWT
3. Token stored in HTTP-only cookie
4. Subsequent requests include cookie automatically
5. Middleware verifies token on protected routes

### Data Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 3-day expiration
- HTTP-only cookies prevent XSS attacks
- CORS configured for specific origin
- User data isolated by userId validation

### Frontend Routing

- Public routes: Home, Login, Register
- Protected routes: Dashboard, Meals, Logs, Settings
- Route protection with AuthContext
- Persistent sessions across page refreshes

## Configuration

### Backend Environment Variables

```
PORT=3000
MONGOOSE_URI=mongodb://localhost:27017/glucotrack
SECRET=your_jwt_secret_key
```

### Running the Application

Backend:

```bash
cd backend
npm install
npm start
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Database Seeding

Populate with sample data:

```bash
cd backend
npm run seed
```

Creates 11 users, 100 meals, and 210+ glucose logs.

Test credentials: `john@test.com` / `password123`

## Project Structure

```
glucotrack/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   ├── seeds/           # Database seeding
│   └── data/            # CSV seed files
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Route components
    │   ├── context/     # Global state (Auth)
    │   ├── helpers/     # API calls
    │   ├── hooks/       # Custom hooks
    │   └── layouts/     # Page layouts
    └── public/
```
