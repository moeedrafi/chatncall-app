import { Link, useParams } from "react-router";
import { ArrowLeft, Menu, Phone, SendHorizonal, Video } from "lucide-react";

import { Input } from "@/components/ui/input";

const friend = {
  name: "Ash Ketchum",
  description: "Ash: What are you doing?",
  message: 4,
  image:
    "https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const Chat = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <section className="bg-gray-50 h-full w-full order-3">
      <div className="h-full flex flex-col justify-between">
        {/* TOPBAR */}
        <div className="border-b border-gray-300 px-2 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/chat" className="p-1 hover:bg-gray-300 rounded-full">
              <ArrowLeft size={20} className="md:hidden" />
            </Link>
            <img
              src={friend.image}
              alt={`${friend.name} pic`}
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="font-semibold">{friend.name}</span>
          </div>

          <div className="flex gap-2">
            {[Video, Phone, Menu].map((Icon, i) => (
              <div
                key={i}
                className="p-2 rounded-full hover:bg-gray-300 cursor-pointer transition"
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-scroll">
          <div className="flex flex-col gap-3 mx-2 my-4 md:mx-4 lg:mx-8">
            <div className="flex gap-1">
              <img
                src="https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="w-max p-2 bg-gray-200 rounded-lg">
                <h3 className="text-muted-foreground text-sm">Ash Ketchum</h3>
                <p className="">What are you doing?</p>
              </div>
            </div>
            <div className="self-end flex gap-1">
              <img
                src="https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={32}
                height={32}
                className="order-1 w-8 h-8 rounded-full object-cover"
              />
              <div className="w-max p-2 bg-green-200 rounded-lg">
                <p>Nothing much. What about you?</p>
              </div>
            </div>
            <div className="flex gap-1">
              <img
                src="https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="w-max p-2 bg-gray-200 rounded-lg">
                <h3 className="text-muted-foreground text-sm">Ash Ketchum</h3>
                <p className="">What are you doing?</p>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-t-gray-300">
          <div className="rounded-full flex items-center gap-2">
            <Input placeholder="Type a message" className="rounded-full" />
            <button className="bg-green-400 p-2 rounded-full hover:bg-green-500 cursor-pointer">
              <SendHorizonal size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
