import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import type { User } from "@/lib/types";
import { getConversation } from "@/lib/api";
import { useAuthStore } from "@/hooks/useAuth";

import { Messages } from "@/components/Messages";
import { ChatNavbar } from "@/components/ChatNavbar";
import { MessageInput } from "@/components/MessageInput";
import { GroupMessages } from "@/components/GroupMessages";

const useConversation = (id: string) => {
  return useQuery({
    queryKey: ["chat", { id }],
    queryFn: () => getConversation(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

const Chat = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { data, status } = useConversation(id as string);

  if (!user) return null;

  if (status === "error") {
    return (
      <p className="text-center text-red-500 font-medium">
        eFrror fetching conversation
      </p>
    );
  }

  const otherUser: User = data?.users.find(
    (friend: User) => friend._id !== user?._id
  );

  return (
    <section className="bg-gray-50 h-full w-full order-3">
      <div className="h-full flex flex-col justify-between">
        {status === "pending" ? (
          <div className="h-16 px-4 py-3 flex items-center border-b">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            <div className="ml-4 h-4 w-1/3 bg-gray-300 animate-pulse rounded" />
          </div>
        ) : data.isGroup ? (
          <>
            <ChatNavbar
              isGroup={true}
              name={data.name}
              totalMembers={data.users.length}
              image="/noAvatar.png"
            />
            <GroupMessages id={id as string} />
            <MessageInput userId={user._id} conversationId={id as string} />
          </>
        ) : (
          <>
            <ChatNavbar
              isGroup={false}
              name={otherUser.username}
              image={otherUser.avatar || "/noAvatar.png"}
            />
            <Messages id={id as string} otherUser={otherUser} />
            <MessageInput userId={user._id} conversationId={id as string} />
          </>
        )}
      </div>
    </section>
  );
};

export default Chat;
