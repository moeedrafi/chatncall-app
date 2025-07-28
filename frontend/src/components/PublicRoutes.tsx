import { Navigate } from "react-router";
import { useAuthStore } from "@/hooks/useAuth";

export const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, user } = useAuthStore();

  return isLoggedIn || user ? <Navigate to="/" /> : children;
};
