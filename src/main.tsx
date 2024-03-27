import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./components/Layout/Layout";
import UserList from "./pages/user/UserList";
import UserCreate from "./pages/user/UserCreate";
import UserDetail from "./pages/user/UserDetail";
import Dashboard from "./pages/dashboard/Dashboard";
import MaterialList from "./pages/material/MaterialList";
import MaterialCreate from "./pages/material/MaterialCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "user",
        children: [
          {
            path: "list",
            element: <UserList />,
          },
          {
            path: "create",
            element: <UserCreate />,
          },
          {
            path: "detail",
            element: <UserDetail />,
          },
        ],
      },
      {
        path: "material",
        children: [
          {
            path: "list",
            element: <MaterialList />,
          },
          {
            path: "create",
            element: <MaterialCreate />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
