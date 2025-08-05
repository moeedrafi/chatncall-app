import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getAPI } from "@/lib/api";
import { useAuthStore } from "@/hooks/useAuth";

type Conversation = {
  _id: string;
  name: string;
  isGroup: boolean;
  users: User[];
};

type User = {
  _id: string;
  username: string;
  avatar: string;
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

export const ChatList = () => {
  const { user } = useAuthStore();
  const { data, status } = useConversations();

  if (status === "pending") return <div>Pending...</div>;
  if (status === "error") return <p>error fetching conversation</p>;

  return (
    <div className="flex flex-col divide-y divide-gray-800">
      {data.map((conversation: Conversation, index: number) => {
        const otherUser = conversation.users.find(
          (friend) => friend._id !== user?._id
        );

        return (
          <Link
            key={index}
            to={`/chat/${conversation._id}`}
            className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-slate-700 rounded-lg"
          >
            {conversation.isGroup ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={otherUser?.avatar || "/noAvatar.png"}
                    alt={`${otherUser?.username} profile picture`}
                    width={14}
                    height={14}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="absolute top-2 right-0 w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div>
                  <h2 className="text-lg text-slate-100 font-medium">
                    {conversation.name}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {conversation.users.length - 1} Members
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={otherUser?.avatar || "/noAvatar.png"}
                    alt={`${otherUser?.username} profile picture`}
                    width={14}
                    height={14}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="absolute top-2 right-0 w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div>
                  <h2 className="text-lg text-slate-100 font-medium">
                    {otherUser?.username}
                  </h2>
                  {/* <p className="text-sm text-slate-400">{friend.description}</p> */}
                </div>
              </div>
            )}
            {/* {friend.message > 0 && (
                  <span className="text-sm font-semibold text-slate-100 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                    {friend.message}
                  </span>
                )} */}
          </Link>
        );
      })}
    </div>
  );
};
