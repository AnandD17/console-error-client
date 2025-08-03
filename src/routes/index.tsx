import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/screens/dashboard/Dashboard";
import Settings from "@/screens/dashboard/Settings";
import CreateApp from "@/screens/apps/CreateApp";
import Issues from "@/screens/issues/Issues";
import IssueDetail from "@/screens/issues/IssueDetail";

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
        path: "settings",
        element: <Settings />,
      },
      {
        path: "create-app",
        element: <CreateApp />,
      },
      {
        path: "issues",
        element: <Issues />,
      },
      {
        path: "issues/:id",
        element: <IssueDetail />,
      },
    ],
  },
]);
