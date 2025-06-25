import { Fragment, useMemo } from "react";

import { cn } from "@/lib/utils";
import { ChatNavbar } from "@/components/ChatNavbar";
import { MessageInput } from "@/components/MessageInput";
import { MessageDropdown } from "@/components/MessageDropdown";

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
          "https://images.unsplash.com/photo-1750086721456-28c384a8896b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        readAt: "2:34 PM",
      },
    ],
  },
  {
    id: "4",
    text: "That sounds great!",
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
  {
    id: "5",
    text: "Perfect! I'll handle the cooking as usual 👨‍🍳",
    sender: "Brock",
    senderId: "brock",
    timestamp: "2:37 PM",
    isOwn: false,
    senderImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    status: "read" as const,
  },
  {
    id: "6",
    text: "Perfect!",
    sender: "Brock",
    senderId: "brock",
    timestamp: "2:37 PM",
    isOwn: false,
    senderImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    status: "read" as const,
  },
  {
    id: "7",
    text: "Nigga!",
    sender: "Brock",
    senderId: "brock",
    timestamp: "2:37 PM",
    isOwn: false,
    senderImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    status: "read" as const,
  },
];

const ChatGroup = () => {
  const latestSeenMap = useMemo(() => {
    const map = new Map<string, string>();
    const ownMessages = initialMessages.filter((m) => m.isOwn);

    ownMessages.forEach((message) => {
      if (!message.readBy) return;

      message.readBy.map((reader) => {
        const existingMessageId = map.get(reader.id);

        if (!existingMessageId) {
          map.set(reader.id, message.id);
        } else {
          const existingIndex = ownMessages.findIndex(
            (m) => m.id === existingMessageId
          );

          const currentIndex = ownMessages.findIndex(
            (m) => m.id === message.id
          );

          if (currentIndex > existingIndex) {
            map.set(reader.id, message.id);
          }
        }
      });
    });

    return map;
  }, []);

  const groupMessages = initialMessages.map((message, index) => {
    const prevMessage = initialMessages[index - 1];
    const nextMessage = initialMessages[index + 1];

    const isFirstInGroup =
      !prevMessage || message.senderId !== prevMessage.senderId;
    const isLastInGroup =
      !nextMessage || message.senderId !== nextMessage.senderId;

    return {
      ...message,
      isFirstInGroup,
      isLastInGroup,
    };
  });

  return (
    <section className="bg-gray-50 h-full w-full order-3">
      <div className="h-full flex flex-col justify-between">
        <ChatNavbar
          totalMembers={4}
          isGroup={true}
          name="Pokemon Trainers"
          image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop"
        />

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2 p-2 sm:p-4">
            {groupMessages.map((message) => (
              <Fragment key={message.id}>
                {message.isOwn ? (
                  <div className="self-end flex gap-2 group">
                    <MessageDropdown />

                    {message.isFirstInGroup ? (
                      <img
                        src={message.senderImage}
                        width={32}
                        height={32}
                        className="order-1 w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="order-1 w-8 h-8" />
                    )}

                    {/* MESSAGE + SEEN */}
                    <div className="flex flex-col">
                      <div
                        className={cn(
                          "flex gap-2 p-3 bg-green-500 text-white shadow-sm",
                          message.isFirstInGroup
                            ? "rounded-b-lg rounded-l-lg"
                            : "rounded-lg"
                        )}
                      >
                        <p className="text-xs sm:text-sm max-w-[200px] sm:max-w-md w-max">
                          {message.text}
                        </p>
                        <span className="self-end text-xs text-gray-300">
                          2:33 PM
                        </span>
                      </div>

                      <div className="self-end flex gap-1">
                        {message.readBy &&
                          message.readBy.map((seen) => (
                            <div key={seen.id} className="mt-1">
                              {message.id === latestSeenMap.get(seen.id) && (
                                <img
                                  src={seen.avatar || "/placeholder.svg"}
                                  alt={`Read by`}
                                  className="w-3 h-3 rounded-full object-cover"
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 group">
                    {message.isFirstInGroup ? (
                      <img
                        src={message.senderImage}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8" />
                    )}

                    <div
                      className={cn(
                        "flex gap-2 p-3 border border-gray-300 shadow-sm",
                        message.isFirstInGroup
                          ? "rounded-b-lg rounded-r-lg"
                          : "rounded-lg"
                      )}
                    >
                      <p className="text-xs sm:text-sm max-w-[200px] sm:max-w-md w-max">
                        {message.text}
                      </p>
                      <span className="self-end text-xs text-gray-300">
                        2:33 PM
                      </span>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <MessageInput />
      </div>
    </section>
  );
};

export default ChatGroup;
