import { Link } from "react-router";
import { ArrowLeft, Menu, Phone, Video } from "lucide-react";

const friend = {
  name: "Ash Ketchum",
  description: "Ash: What are you doing?",
  message: 4,
  image:
    "https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const ChatNavbar = () => {
  return (
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
        <div>
          <h3 className="font-semibold">{friend.name}</h3>
          <h5 className="text-sm text-green-500">Active</h5>
        </div>
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
  );
};
