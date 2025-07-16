import "./index.css";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { lazy, StrictMode, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.tsx";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import NotFound from "@/pages/NotFound.tsx";

const Chat = lazy(() => import("@/pages/Chat.tsx"));
const Settings = lazy(() => import("@/pages/Settings.tsx"));
const ChatGroup = lazy(() => import("@/pages/ChatGroup.tsx"));

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
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </Suspense>
  </StrictMode>
);
