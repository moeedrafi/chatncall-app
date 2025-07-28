import { Navigate } from "react-router";
import { useAuthStore } from "@/hooks/useAuth";

export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn, user } = useAuthStore();

  return !isLoggedIn || !user ? <Navigate to="/login" /> : children;
};
