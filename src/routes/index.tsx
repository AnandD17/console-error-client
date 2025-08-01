import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/screens/dashboard/Dashboard";
import Analytics from "@/screens/dashboard/Analytics";
import Users from "@/screens/dashboard/Users";
import Reports from "@/screens/dashboard/Reports";
import Settings from "@/screens/dashboard/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
