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
import { PublicRoutes } from "@/components/PublicRoutes.tsx";
import { ProtectedRoutes } from "@/components/ProtectedRoutes.tsx";
import { AuthInitializer } from "@/components/AuthInitialize.tsx";
import { Spinner } from "@/components/Spinner.tsx";

const Chat = lazy(() => import("@/pages/Chat.tsx"));
const Settings = lazy(() => import("@/pages/Settings.tsx"));
const ChatGroup = lazy(() => import("@/pages/ChatGroup.tsx"));
const FriendRequest = lazy(() => import("@/pages/FriendRequest.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat/:id",
        element: (
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat/group",
        element: (
          <ProtectedRoutes>
            <ChatGroup />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoutes>
            <Settings />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/add",
        element: (
          <ProtectedRoutes>
            <FriendRequest />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoutes>
        <Register />
      </PublicRoutes>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Spinner />}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
      <Toaster position="top-right" />
    </Suspense>
  </StrictMode>
);
