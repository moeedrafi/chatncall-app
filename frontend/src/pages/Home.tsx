import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Menu, Search } from "lucide-react";
import { useRoutes } from "@/hooks/useRoutes";

const friends = [
  {
    name: "Ash Ketchum",
    description: "Ash: What are you doing?",
    message: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Nigga Chin",
    message: 0,
    description: "Me: What are you doing?",
    image:
      "https://images.unsplash.com/photo-1750086721456-28c384a8896b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "John Doe",
    message: 4,
    description: "John: What are you doing?",
    image:
      "https://images.unsplash.com/photo-1728443814449-7a2ad4d86ec3?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Home = () => {
  const routes = useRoutes();

  return (
    <main className="h-dvh flex flex-col sm:flex-row overflow-hidden">
      {/* SIDEBAR */}
      <aside className="py-4 sm:py-6 px-4 w-full sm:w-20 bg-slate-800 h-[80px] sm:h-full order-2 sm:order-1 border-t sm:border-t-0 md:border-r border-gray-400">
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

      {/* CHAT AREA */}
      <section className="md:w-[30%] md:flex-none flex-1 overflow-scroll space-y-5 bg-slate-900 sm:order-2 py-4 px-4">
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
          {friends.map((friend, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-slate-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.image}
                  alt={`${friend.name} profile picture`}
                  width={14}
                  height={14}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg text-slate-100 font-medium">
                    {friend.name}
                  </h2>
                  <p className="text-sm text-slate-400">{friend.description}</p>
                </div>
              </div>
              {friend.message > 0 && (
                <span className="text-sm font-semibold text-slate-100 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                  {friend.message}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="hidden md:block order-3">WHAT</section>
    </main>
  );
};

export default Home;

// <section className="flex-1 overflow-scroll space-y-5 bg-blue-50 md:order-2 py-4 px-4 md:px-8 lg:px-16 xl:px-32">
//   {/* LOGO + MENU ICON */}
//   <div className="flex items-center justify-between">
//     <div className="text-2xl font-bold">ChatnCall</div>
//     <Menu size={30} />
//   </div>

//   {/* SEARCH BAR FOR CHAT SEARCH */}
//   <div className="md:hidden flex bg-gray-600 text-gray-100 p-2 items-center gap-2 rounded-full">
//     <Search className="" />
//     <input
//       type="text"
//       placeholder="Search a chat..."
//       className="bg-transparent outline-none"
//     />
//   </div>

//   {/* LIST OF CHATS */}
//   <div className="flex flex-col divide-y divide-gray-200">
//     {friends.map((friend, index) => (
//       <div
//         key={index}
//         className="flex items-center justify-between gap-4 py-4"
//       >
//         <div className="flex items-center gap-3">
//           <img
//             src={friend.image}
//             alt={`${friend.name} profile picture`}
//             width={14}
//             height={14}
//             className="w-14 h-14 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="text-lg text-gray-900 font-medium">
//               {friend.name}
//             </h2>
//             <p className="text-sm text-gray-500">{friend.description}</p>
//           </div>
//         </div>
//         {friend.message > 0 && (
//           <span className="text-sm font-semibold text-white bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center">
//             {friend.message}
//           </span>
//         )}
//       </div>
//     ))}
//   </div>
// </section>
