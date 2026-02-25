# GlucoTrack Backend

RESTful API built with Node.js, Express, and MongoDB for diabetes management.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGOOSE_URI=mongodb://localhost:27017/glucotrack
SECRET=your_jwt_secret_key
```

## Running the Server

Development mode:

```bash
npm start
```

Seed database:

```bash
npm run seed
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description       | Body                                                          |
| ------ | -------------------- | ----------------- | ------------------------------------------------------------- |
| POST   | `/api/auth/register` | Register new user | `{ name, email, password, age, diabetesType, targetGlucose }` |
| POST   | `/api/auth/login`    | Login user        | `{ email, password }`                                         |
| POST   | `/api/auth/logout`   | Logout user       | -                                                             |
| GET    | `/api/auth/profile`  | Get user profile  | -                                                             |

### Meals

| Method | Endpoint         | Description        | Body                                               |
| ------ | ---------------- | ------------------ | -------------------------------------------------- |
| GET    | `/api/meals`     | Get all user meals | -                                                  |
| POST   | `/api/meals`     | Create meal        | `{ name, category, carbsPerServing, servingSize }` |
| GET    | `/api/meals/:id` | Get single meal    | -                                                  |
| PUT    | `/api/meals/:id` | Update meal        | `{ name, category, carbsPerServing, servingSize }` |
| DELETE | `/api/meals/:id` | Delete meal        | -                                                  |

### Logs

| Method | Endpoint        | Description       | Body                                          |
| ------ | --------------- | ----------------- | --------------------------------------------- |
| GET    | `/api/logs`     | Get all user logs | -                                             |
| POST   | `/api/logs`     | Create log        | `{ type, glucoseLevel, mealId, notes, date }` |
| GET    | `/api/logs/:id` | Get single log    | -                                             |
| PUT    | `/api/logs/:id` | Update log        | `{ type, glucoseLevel, mealId, notes, date }` |
| DELETE | `/api/logs/:id` | Delete log        | -                                             |

## Database Models

### User

| Field         | Type   | Required | Unique |
| ------------- | ------ | -------- | ------ |
| name          | String | Yes      | No     |
| email         | String | Yes      | Yes    |
| password      | String | Yes      | No     |
| age           | Number | Yes      | No     |
| diabetesType  | String | Yes      | No     |
| targetGlucose | Object | Yes      | No     |
| role          | String | Yes      | No     |

### Meal

| Field           | Type     | Required | Reference |
| --------------- | -------- | -------- | --------- |
| name            | String   | Yes      | -         |
| category        | String   | Yes      | -         |
| carbsPerServing | Number   | Yes      | -         |
| servingSize     | String   | Yes      | -         |
| userId          | ObjectId | Yes      | User      |

### Log

| Field        | Type     | Required | Reference |
| ------------ | -------- | -------- | --------- |
| userId       | ObjectId | Yes      | User      |
| type         | String   | Yes      | -         |
| glucoseLevel | Number   | Yes      | -         |
| mealId       | ObjectId | No       | Meal      |
| notes        | String   | No       | -         |
| date         | Date     | Yes      | -         |

## Authentication

Uses JWT tokens stored in HTTP-only cookies. Token expires after 3 days.

Protected routes require valid JWT in cookie.

## Project Structure

```
backend/
├── controllers/        # Request handlers
├── models/            # Mongoose schemas
├── routes/            # API routes
├── middleware/        # Auth middleware
├── seeds/             # Database seeding
├── data/              # CSV seed data
└── app.js             # Express app setup
```

## Security Features

- Password hashing with bcrypt
- HTTP-only cookies
- CORS configuration
- JWT authentication
- User data isolation
- ObjectId validation
