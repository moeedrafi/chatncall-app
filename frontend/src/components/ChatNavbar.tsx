import { Link } from "react-router";
import { ArrowLeft, Menu, Phone, Video } from "lucide-react";

interface BaseChatNavbarProps {
  name: string;
  image: string;
}

interface GroupChatNavbarProps extends BaseChatNavbarProps {
  isGroup: true;
  totalMembers: number;
}

interface OneToOneChatNavbarProps extends BaseChatNavbarProps {
  isGroup: false;
}

type ChatNavbarProps = GroupChatNavbarProps | OneToOneChatNavbarProps;

export const ChatNavbar = (props: ChatNavbarProps) => {
  const { image, isGroup, name } = props;

  return (
    <div className="border-b border-gray-300 px-2 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/chat" className="p-1 hover:bg-gray-300 rounded-full">
          <ArrowLeft size={20} className="md:hidden" />
        </Link>

        <img
          src={image}
          alt={`${name} pic`}
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-full"
        />

        <div>
          <h3 className="font-semibold">{name}</h3>
          {isGroup ? (
            <h5 className="text-sm text-gray-400">
              {props.totalMembers} members
            </h5>
          ) : (
            <h5 className="text-sm text-green-500">Active</h5>
          )}
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
