import { toast } from "sonner";
import { useState } from "react";
import { EllipsisVertical, Trash2 } from "lucide-react";

import { BASE_URL } from "@/lib/api";
import { Alert } from "@/components/Alert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type User = {
  _id: string;
  username: string;
  avatar: string;
};

type Message = {
  _id: string;
  body: string;
  conversation: string;
  sender: string;
  seenBy: User[];
};

const useDeleteMessage = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) =>
      fetch(`${BASE_URL}/messages/${messageId}`, {
        method: "DELETE",
        credentials: "include",
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to send");
        return res.json();
      }),
    onMutate: async (messageId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", { id }],
      });

      const snapshot = queryClient.getQueryData(["messages", { id }]);

      queryClient.setQueryData(
        ["messages", { id }],
        (previousMessages: Message[] = []) =>
          previousMessages.filter((msg) => msg._id !== messageId)
      );

      return () => {
        queryClient.setQueryData(["messages", { id }], snapshot);
      };
    },
    onError: (error, _, rollback) => {
      console.log("error: ", error);
      rollback?.();
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["messages", { id }],
      }),
  });
};

export const MessageDropdown = ({
  conversationId,
  messageId,
}: {
  conversationId: string;
  messageId: string;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const deleteMessage = useDeleteMessage(conversationId);

  const handleDelete = async () => {
    deleteMessage.mutate(messageId, {
      onSuccess: () => toast("Message deleted successfully"),
      onError: (error) => toast(`Couldn't delete message: ${error}`),
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-full cursor-pointer">
            <EllipsisVertical size={16} className="text-gray-400" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 focus:text-red-600 cursor-pointer"
          >
            <Trash2 size={16} className="mr-2" />
            Delete Message
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <Alert
          heading="Delete message"
          handleDelete={handleDelete}
          subHeading="Are you sure you want to delete this message? This action cannot be undone."
        />
      </AlertDialog>
    </div>
  );
};
