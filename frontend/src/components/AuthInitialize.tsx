import { useEffect, useState } from "react";
import { useAuthStore } from "@/hooks/useAuth";
import { Spinner } from "@/components/Spinner";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { login, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [login, logout]);

  if (isLoading) return <Spinner />;

  return <>{children}</>;
};
