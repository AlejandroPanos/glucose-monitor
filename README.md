# GlucoTrack

A full-stack MERN application for diabetes management. Track glucose levels, manage meals, and visualize health data.

## Features

- User authentication with JWT
- Glucose level tracking and logging
- Personal meal library management
- Data visualization with interactive charts
- Customizable target glucose ranges
- Gravatar profile integration
- Responsive design

## Tech Stack

**Frontend:** React, React Router, TanStack Query, Axios, Recharts, Tailwind CSS, Vite

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Prerequisites

- Node.js v18+
- MongoDB v6+
- npm or yarn

## API Endpoints

### Admin

```
GET   /api/admin/users
DELETE   /api/admin/users/:id
```

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
POST    /api/auth/profile
```

### Meals

```
GET    /api/meals
POST   /api/meals
GET    /api/meals/:id
PUT    /api/meals/:id
DELETE /api/meals/:id
```

### Logs

```
GET    /api/logs
POST   /api/logs
GET    /api/logs/:id
PUT    /api/logs/:id
DELETE /api/logs/:id
```

## License

MIT License - see LICENSE file for details

## Contact

Alejandro Paños - (https://github.com/AlejandroPanos)

Project Link: [https://github.com/yourusername/glucotrack](https://github.com/yourusername/glucotrack)
