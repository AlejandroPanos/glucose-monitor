import { createBrowserRouter, Router, RouterProvider } from "react-router";

import "./App.css";

// Import Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";

// Public Pages
import Home from "./pages/public/Home";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";

// Private Pages
import Dashboard from "./pages/private/Dashboard";
import Meals from "./pages/private/Meals";
import Logs from "./pages/private/Logs";
import Meal from "./pages/private/Meal";
import Log from "./pages/private/Log";
import EditMeal from "./pages/private/EditMeal";
import EditLog from "./pages/private/EditLog";
import AddMeal from "./pages/private/AddMeal";
import AddLog from "./pages/private/AddLog";
import Settings from "./pages/private/Settings";
import Users from "./pages/private/Users";

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
