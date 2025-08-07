import "./index.css";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { lazy, StrictMode, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import NotFound from "@/pages/NotFound.tsx";
import { FullPageLoader } from "@/components/FullPageLoader";
import { PublicRoutes } from "@/components/PublicRoutes.tsx";
import { ProtectedRoutes } from "@/components/ProtectedRoutes.tsx";
import { AuthInitializer } from "@/components/AuthInitialize.tsx";

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
          <Suspense fallback={<FullPageLoader />}>
            <ProtectedRoutes>
              <Chat />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "/chat/group",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <ProtectedRoutes>
              <ChatGroup />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          </Suspense>
        ),
      },
      {
        path: "/add",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <ProtectedRoutes>
              <FriendRequest />
            </ProtectedRoutes>
          </Suspense>
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
      <Toaster position="top-right" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
