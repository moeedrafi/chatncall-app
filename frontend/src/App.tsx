import { useState } from "react";
import { UsersRound } from "lucide-react";
import { Outlet, useMatch } from "react-router";

import { cn } from "@/lib/utils";
import { Search } from "@/components/Search";
import { NavLinks } from "@/components/NavLinks";
import { ChatList } from "@/components/ChatList";
import CreateGroupModal from "./components/CreateGroupModal";

const App = () => {
  const isChatRoute = useMatch("/chat/:id");
  const isSettingsRoute = useMatch("/settings");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className="h-dvh flex flex-col sm:flex-row overflow-hidden">
      <NavLinks />

      <section
        className={cn(
          "md:w-[30%] flex-1 overflow-y-auto space-y-5 bg-slate-900 sm:order-2 py-4 px-4",
          isChatRoute || isSettingsRoute
            ? "hidden md:flex-none md:block"
            : "md:flex-none"
        )}
      >
        <div className="flex items-center justify-between text-slate-100">
          <div className="text-2xl font-bold">ChatnCall</div>
          <UsersRound
            size={24}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>

        <Search />
        <ChatList />
      </section>

      {isOpen && <CreateGroupModal isOpen={isOpen} setIsOpen={setIsOpen} />}

      <Outlet />
    </main>
  );
};

export default App;
