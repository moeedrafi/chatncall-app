import { Link, useMatch } from "react-router";

import { cn } from "@/lib/utils";
import { useRoutes } from "@/hooks/useRoutes";

export const NavLinks = () => {
  const routes = useRoutes();
  const isChatRoute = useMatch("/chat/:id");

  return (
    <aside
      className={cn(
        "py-4 sm:py-6 px-4 w-full sm:w-20 bg-slate-800 h-[80px] sm:h-full order-2 sm:order-1 border-t sm:border-t-0 md:border-r border-gray-400",
        isChatRoute ? "hidden md:block" : "block"
      )}
    >
      <div className="flex flex-row sm:flex-col gap-5 items-center justify-around md:border-none">
        {routes.map(({ active, href, Icon, label }) => (
          <Link
            to={href}
            key={href}
            className="flex flex-col items-center group"
          >
            <Icon
              size={30}
              strokeWidth={active ? 2.5 : 1.5}
              className={cn(
                "text-gray-400 group-hover:text-gray-100",
                active && "text-gray-50"
              )}
            />
            <span
              className={cn(
                "text-gray-400 group-hover:text-gray-100 md:hidden lg:block",
                active && "text-gray-50 font-semibold"
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};
