import { useMutation, useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";
import { BASE_URL, getMessages } from "@/lib/api";
import type { Message } from "@/lib/types";
import { useAuthStore } from "@/hooks/useAuth";

import { MessageDropdown } from "@/components/MessageDropdown";

const useMessages = (id: string) => {
  return useQuery({
    queryKey: ["messages", { id }],
    queryFn: () => getMessages(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

const useSeenMessage = () => {
  return useMutation({
    mutationFn: async (messageId: string) => {
      await fetch(`${BASE_URL}/messages/${messageId}/seen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    },
  });
};

interface GroupMessagesProps {
  id: string;
}

type GroupedMessage = Message & {
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
};

export const GroupMessages = ({ id }: GroupMessagesProps) => {
  const { user } = useAuthStore();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { data: messagesData = [], status: messageStatus } = useMessages(id);

  const { mutate: markSeen } = useSeenMessage();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    if (messageStatus === "success" && messagesData.length > 0 && user) {
      const unseenMessages = messagesData.filter(
        (msg: Message) =>
          msg.sender !== user._id && !msg.seenBy.some((u) => u._id === user._id)
      );

      unseenMessages.forEach((msg: Message) => markSeen(msg._id));
    }
  }, [messagesData, markSeen, messageStatus, user]);

  const latestSeenMap = useMemo(() => {
    const map = new Map<string, string>();
    const ownMessages: Message[] = messagesData.filter(
      (msg: Message) => msg.sender === user?._id
    );

    ownMessages.forEach((message: Message) => {
      if (!message.seenBy) return;

      message.seenBy.map((reader) => {
        const existingMessageId = map.get(reader._id);

        if (!existingMessageId) {
          map.set(reader._id, message._id);
        } else {
          const existingIndex = ownMessages.findIndex(
            (msg) => msg._id === existingMessageId
          );

          const currentIndex = ownMessages.findIndex(
            (msg) => msg._id === message._id
          );

          if (currentIndex > existingIndex) {
            map.set(reader._id, message._id);
          }
        }
      });
    });

    return map;
  }, [messagesData, user?._id]);

  if (messageStatus === "pending") return <p>Loading...</p>;

  const groupMessages = messagesData.map((message: Message, index: number) => {
    const prevMessage = messagesData[index - 1];
    const nextMessage = messagesData[index + 1];

    const isFirstInGroup =
      !prevMessage || message.sender !== prevMessage.sender;
    const isLastInGroup = !nextMessage || message.sender !== nextMessage.sender;

    return {
      ...message,
      isFirstInGroup,
      isLastInGroup,
    };
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-2 p-2 sm:p-4">
        {groupMessages.length > 0 ? (
          groupMessages.map((message: GroupedMessage) => {
            const isOwnMessage = message.sender === user?._id;

            return (
              <Fragment key={message._id}>
                <div
                  className={cn("flex gap-2 group", isOwnMessage && "self-end")}
                >
                  {isOwnMessage && (
                    <MessageDropdown
                      conversationId={id as string}
                      messageId={message._id}
                    />
                  )}

                  {message.isFirstInGroup ? (
                    <img
                      src="/noAvatar.png"
                      width={32}
                      height={32}
                      className={`w-8 h-8 rounded-full object-cover ${
                        isOwnMessage ? "order-1" : ""
                      }`}
                    />
                  ) : isOwnMessage && !message.isFirstInGroup ? (
                    <div className="order-1 w-8 h-8" />
                  ) : (
                    <div className="w-8 h-8" />
                  )}

                  {/* MESSAGE + SEEN */}
                  <div className="flex flex-col">
                    <div
                      className={cn(
                        "flex gap-2 p-3 shadow-sm rounded-lg",
                        isOwnMessage
                          ? "bg-green-500 text-white"
                          : "border border-gray-300",
                        message.isFirstInGroup
                          ? "rounded-b-lg rounded-l-lg"
                          : "rounded-lg"
                      )}
                    >
                      <p className="text-xs sm:text-sm max-w-[200px] sm:max-w-md w-max">
                        {message.body}
                      </p>
                      <span className="self-end text-xs text-gray-300">
                        2:33 PM
                      </span>
                    </div>

                    {isOwnMessage && (
                      <div className="self-end flex gap-1">
                        {message.seenBy &&
                          message.seenBy.map((seen) => (
                            <div key={seen._id} className="mt-1">
                              {message._id === latestSeenMap.get(seen._id) && (
                                <img
                                  src={seen.avatar || "/placeholder.svg"}
                                  alt={`Read by`}
                                  className="w-3 h-3 rounded-full object-cover"
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <h3 className="flex items-center justify-center text-3xl font-bold">
            Start a conversation
          </h3>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
