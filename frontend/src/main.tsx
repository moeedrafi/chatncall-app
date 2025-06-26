import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/pages/Login.tsx";
import { Toaster } from "sonner";
import Home from "@/pages/Home.tsx";
import Chat from "@/pages/Chat.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Register from "@/pages/Register.tsx";
import ChatGroup from "@/pages/ChatGroup.tsx";
import Settings from "@/pages/Settings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/chat/:id", element: <Chat /> },
      { path: "/chat/group", element: <ChatGroup /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </StrictMode>
);
