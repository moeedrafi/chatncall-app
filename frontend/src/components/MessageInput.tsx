import { SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MessageInput = () => {
  return (
    <div className="p-4 border-t border-t-gray-300">
      <div className="rounded-full flex items-center gap-2">
        <Input placeholder="Type a message" className="rounded-full" />
        <button className="bg-green-400 p-2 rounded-full hover:bg-green-500 cursor-pointer">
          <SendHorizonal size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};
