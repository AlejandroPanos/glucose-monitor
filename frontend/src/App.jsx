import { createBrowserRouter, Router, RouterProvider } from "react-router";

import "./App.css";

// Import Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";

// Public Pages
import Home from "./landing/Home";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";

// Private Pages
import Dashboard from "./features/dashboard/pages/Dashboard";
import Meals from "./features/meals/pages/Meals";
import Logs from "./features/glucoselogs/pages/Logs";
import Meal from "./features/meals/pages/Meal";
import Log from "./features/glucoselogs/pages/Log";
import EditMeal from "./features/meals/pages/EditMeal";
import EditLog from "./features/glucoselogs/pages/EditLog";
import AddMeal from "./features/meals/pages/AddMeal";
import AddLog from "./features/glucoselogs/pages/AddLog";
import Settings from "./features/settings/pages/Settings";
import Users from "./features/users/pages/Users";

// Route checkers
import PublicRoute from "./components/routes/PublicRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "meals",
        element: (
          <ProtectedRoute>
            <Meals />
          </ProtectedRoute>
        ),
      },
      {
        path: "logs",
        element: (
          <ProtectedRoute>
            <Logs />
          </ProtectedRoute>
        ),
      },
      {
        path: "meals/:id",
        element: (
          <ProtectedRoute>
            <Meal />
          </ProtectedRoute>
        ),
      },
      {
        path: "logs/:id",
        element: (
          <ProtectedRoute>
            <Log />
          </ProtectedRoute>
        ),
      },
      {
        path: "meals/:id/edit",
        element: (
          <ProtectedRoute>
            <EditMeal />
          </ProtectedRoute>
        ),
      },
      {
        path: "logs/:id/edit",
        element: (
          <ProtectedRoute>
            <EditLog />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <ProtectedRoute>
            <AddMeal />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-log",
        element: (
          <ProtectedRoute>
            <AddLog />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
