import { useEffect } from "react";
import { useAuthStore } from "@/hooks/useAuth";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/users/check-auth",
          { credentials: "include" }
        );

        const data = await res.json();

        if (data.success) {
          login(data.data);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    };

    checkAuth();
  }, [login, logout]);

  return <>{children}</>;
};
