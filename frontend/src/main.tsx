import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/pages/Login.tsx";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //     path: "/c",
  //     element: <Chat />,
  // },
  // {
  //     path: "/sign-up",
  //     element: <SignUp />,
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </StrictMode>
);
