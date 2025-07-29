import { Menu, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useMatch } from "react-router";

import { cn } from "@/lib/utils";
import { getAPI } from "@/lib/api";
import { useRoutes } from "@/hooks/useRoutes";

type Conversation = {
  _id: string;
  isGroup: boolean;
  users: {
    _id: string;
    username: string;
    avatar: string;
    lastMessageAt: Date;
  }[];
};

const getConversations = async () => {
  try {
    const data = await getAPI("/conversations/");
    return data.data;
  } catch (error) {
    console.log("Fetching Conversation serror:", error);
  }
};

const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const App = () => {
  const routes = useRoutes();
  const isChatRoute = useMatch("/chat/:id");
  const isSettingsRoute = useMatch("/settings");

  const { data, status } = useConversations();

  if (status === "pending") return <div>Pending...</div>;
  if (status === "error") return <p>error fetching conversation</p>;

  return (
    <main className="h-dvh flex flex-col sm:flex-row overflow-hidden">
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

      <section
        className={cn(
          "md:w-[30%] flex-1 overflow-y-auto space-y-5 bg-slate-900 sm:order-2 py-4 px-4",
          isChatRoute || isSettingsRoute
            ? "hidden md:flex-none md:block"
            : "md:flex-none"
        )}
      >
        {/* LOGO + MENU ICON */}
        <div className="flex items-center justify-between text-slate-100">
          <div className="text-2xl font-bold">ChatnCall</div>
          <Menu size={30} />
        </div>

        {/* SEARCH BAR FOR CHAT SEARCH */}
        <div className="flex bg-slate-800 text-slate-100 p-2 items-center gap-2 rounded-full border border-transparent focus-within:border focus-within:border-green-500">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search a chat..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* LIST OF CHATS */}
        <div className="flex flex-col divide-y divide-gray-800">
          {data &&
            data.map((conversation: Conversation, index: number) => (
              <Link
                key={index}
                to={`/chat/${conversation._id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-slate-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conversation.users[0].avatar || "/noAvatar.png"}
                      alt={`${conversation.users[0].username} profile picture`}
                      width={14}
                      height={14}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="absolute top-2 right-0 w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <h2 className="text-lg text-slate-100 font-medium">
                      {conversation.users[0].username}
                    </h2>
                    {/* <p className="text-sm text-slate-400">{friend.description}</p> */}
                  </div>
                </div>
                {/* {friend.message > 0 && (
                  <span className="text-sm font-semibold text-slate-100 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                    {friend.message}
                  </span>
                )} */}
              </Link>
            ))}
        </div>
      </section>

      <Outlet />
    </main>
  );
};

export default App;
