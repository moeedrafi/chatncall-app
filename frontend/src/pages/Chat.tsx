import React from "react";
import { useParams } from "react-router";
import { EllipsisVertical } from "lucide-react";

import { ChatNavbar } from "@/components/ChatNavbar";
import { MessageInput } from "@/components/MessageInput";

const friend = {
  id: "ash-ketchum",
  name: "Ash Ketchum",
  image:
    "https://plus.unsplash.com/premium_photo-1749846961895-464c17182d86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const currentUser = {
  id: "current-user",
  name: "You",
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
};

const initialMessages = [
  {
    id: "1",
    text: "Hey everyone! Ready for our Pokémon adventure?",
    sender: "Ash Ketchum",
    senderId: "ash-ketchum",
    timestamp: "2:30 PM",
    isOwn: false,
    senderImage: friend.image,
    status: "read" as const,
  },
  {
    id: "2",
    text: "Can't wait to explore the new region!",
    sender: "Ash Ketchum",
    senderId: "ash-ketchum",
    timestamp: "2:30 PM",
    isOwn: false,
    senderImage: friend.image,
    status: "read" as const,
  },
  {
    id: "3",
    text: "I'm so excited! I've prepared all my water Pokémon.",
    sender: "Misty",
    senderId: "misty",
    timestamp: "2:32 PM",
    isOwn: false,
    senderImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
    status: "read" as const,
  },
  {
    id: "4",
    text: "Count me in! I'll bring snacks for everyone.",
    sender: "You",
    senderId: "current-user",
    timestamp: "2:33 PM",
    isOwn: true,
    senderImage: currentUser.image,
    status: "read" as const,
    readBy: [
      {
        id: "ash-ketchum",
        name: "Ash Ketchum",
        avatar: friend.image,
        readAt: "2:34 PM",
      },
      {
        id: "misty",
        name: "Misty",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
        readAt: "2:35 PM",
      },
    ],
  },
  {
    id: "5",
    text: "That sounds great Lorem Ipsum is simply dummy text of th asda d sad sad asdasdasdsa d asd asdasdasdasd ",
    sender: "You",
    senderId: "current-user",
    timestamp: "2:33 PM",
    isOwn: true,
    senderImage: currentUser.image,
    status: "read" as const,
    readBy: [
      {
        id: "ash-ketchum",
        name: "Ash Ketchum",
        avatar: friend.image,
        readAt: "2:34 PM",
      },
      {
        id: "brock",
        name: "Brock",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        readAt: "2:36 PM",
      },
    ],
  },
];

const Chat = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <section className="bg-gray-50 h-full w-full order-3">
      <div className="h-full flex flex-col justify-between">
        <ChatNavbar />

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2 p-2 sm:p-4">
            {initialMessages.map((message) => (
              <React.Fragment key={message.id}>
                {message.isOwn ? (
                  <div className="self-end flex gap-2 group">
                    {/* MENU */}
                    <button className="self-center p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full">
                      <EllipsisVertical size={16} className="text-gray-400" />
                    </button>

                    {/* PROFILE PIC */}
                    <img
                      src={message.senderImage}
                      width={32}
                      height={32}
                      className="order-1 w-8 h-8 rounded-full object-cover"
                    />

                    {/* MESSAGE + SEEN */}
                    <div className="flex flex-col group">
                      <div className="flex gap-2 p-3 bg-green-500 text-white shadow-sm rounded-lg">
                        <p className="text-xs sm:text-sm max-w-[200px] sm:max-w-md w-max">
                          {message.text}
                        </p>
                        <span className="self-end text-xs text-gray-300">
                          2:33 PM
                        </span>
                      </div>

                      {message.readBy && (
                        <div className="self-end mt-1">
                          <img
                            src={message.readBy[0].avatar || "/placeholder.svg"}
                            alt={`Read by`}
                            className="w-3 h-3 rounded-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 group">
                    <button className="order-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full">
                      <EllipsisVertical size={16} className="text-gray-400" />
                    </button>

                    <img
                      src={message.senderImage}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <div className="flex gap-2 p-3 border border-gray-300 shadow-sm rounded-lg">
                      <p className="text-xs sm:text-sm max-w-[200px] sm:max-w-md w-max">
                        {message.text}
                      </p>
                      <span className="self-end text-xs text-gray-300">
                        2:33 PM
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <MessageInput />
      </div>
    </section>
  );
};

export default Chat;
