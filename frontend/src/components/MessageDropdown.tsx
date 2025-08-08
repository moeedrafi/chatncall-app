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

export const MessageDropdown = ({ messageId }: { messageId: string }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const handleDelete = async (messageId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/messages/${messageId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        toast(data.message || "Deletion failed");
        return;
      }

      toast(data.message);
      setShowDeleteDialog(false);
    } catch (error) {
      toast("Delete Message error:" + error);
    }
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
          handleDelete={() => handleDelete(messageId)}
          subHeading="Are you sure you want to delete this message? This action cannot be undone."
        />
      </AlertDialog>
    </div>
  );
};
