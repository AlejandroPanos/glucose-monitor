# GlucoTrack Frontend

React-based web application for diabetes management with glucose tracking and data visualization.

## Tech Stack

- React 18
- Vite
- React Router v6
- TanStack Query
- Axios
- Tailwind CSS
- Recharts
- Lucide React

## Installation

```bash
npm install
```

## Running the Application

Development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route components
│   │   ├── public/     # Login, Register, Home
│   │   └── private/    # Dashboard, Meals, Logs
│   ├── layouts/        # Page layouts
│   │   ├── PublicLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── context/        # Global state
│   │   └── authContext.jsx
│   ├── helpers/        # API functions
│   ├── hooks/          # Custom hooks
│   └── App.jsx
└── public/
```

## Routes

### Public Routes

| Path        | Component | Description         |
| ----------- | --------- | ------------------- |
| `/`         | Home      | Landing page        |
| `/login`    | Login     | User authentication |
| `/register` | Register  | User registration   |

### Protected Routes

| Path         | Component | Description          |
| ------------ | --------- | -------------------- |
| `/dashboard` | Dashboard | Overview with charts |
| `/meals`     | Meals     | Meal library         |
| `/logs`      | Logs      | Glucose log history  |
| `/add-meal`  | AddMeal   | Create new meal      |
| `/add-log`   | AddLog    | Create new log       |
| `/settings`  | Settings  | User preferences     |

## State Management

### AuthContext

Global authentication state using React Context API and useReducer.

**State:**

```javascript
{
  user: Object | null,
  loading: Boolean
}
```

**Actions:**

- `SET_USER` - Set user data
- `LOGIN` - User login
- `LOGOUT` - User logout

### TanStack Query

Server state management for data fetching, caching, and synchronization.

**Query Keys:**

- `['meals']` - User meals
- `['logs']` - User glucose logs

## API Integration

### Axios Configuration

All requests include `withCredentials: true` for cookie-based authentication.

Base URL: `http://localhost:3000/api`

### Helper Functions

| Function       | Endpoint        | Method | Description       |
| -------------- | --------------- | ------ | ----------------- |
| `checkAuth()`  | `/auth/profile` | GET    | Verify session    |
| `userLogin()`  | `/auth/login`   | POST   | Authenticate user |
| `userLogout()` | `/auth/logout`  | POST   | Clear session     |

## Components

### Layouts

**PublicLayout**

- Navigation bar
- Public page wrapper

**DashboardLayout**

- Sidebar navigation
- User profile display
- Collapsible menu

### Protected Routes

Uses `ProtectedRoute` component to guard authenticated pages.

Redirects to `/login` if user not authenticated.

Shows loading spinner during auth verification.

## Styling

Tailwind CSS utility classes for responsive design.

Dark mode support configured.

## Data Visualization

Recharts library for interactive glucose trend charts.

**Chart Features:**

- Line chart for glucose levels
- Date-based x-axis
- Custom tooltips
- Responsive container
- Target range indicators
