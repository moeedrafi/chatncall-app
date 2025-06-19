import { MessageSquare, UserRoundPlus, Settings } from "lucide-react";
import { useLocation } from "react-router";

export const useRoutes = () => {
  const location = useLocation();

  return [
    {
      href: "/",
      label: "Chats",
      Icon: MessageSquare,
      active: location.pathname === "/",
    },
    {
      href: "/add",
      label: "Requests",
      Icon: UserRoundPlus,
      active: location.pathname === "/add",
    },
    {
      href: "/settings",
      label: "Settings",
      Icon: Settings,
      active: location.pathname === "/settings",
    },
  ];
};
