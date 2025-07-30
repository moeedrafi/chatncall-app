import { z } from "zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { BASE_URL } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CreateGroupModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  members: z.array(z.any()).min(3, "At least 3 members are required"),
});

const CreateGroupModal = ({ isOpen, setIsOpen }: CreateGroupModalProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
      members: [],
    },
  });

  const onSubmit = () => {};

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_URL}/friends/add-group`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ searchQuery }),
        });

        const data = await response.json();
        console.log(data);
        setShowDropdown(true);
      } catch (error) {
        console.log("Search error: ", error);
      }
    }, 5000);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  return (
    <Dialog open={isOpen}>
      <form>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        type="text"
                        placeholder="New Group"
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Members</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          required
                          {...field}
                          type="text"
                          className="text-sm"
                          value={searchQuery}
                          placeholder="Search..."
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {showDropdown && (
                          <div className="absolute top-8 z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                            <ul className="py-1">
                              <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                                <img
                                  src="/noAvatar.png"
                                  alt=""
                                  className="h-8 w-8"
                                />
                                <p className="font-medium text-sm">john_do</p>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                <p className="text-sm font-medium">Selected Members:</p>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border">
                  <div className="flex items-center gap-3">
                    <img src="/noAvatar.png" alt="" className="h-8 w-8" />
                    <p className="font-medium text-sm">john_do</p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateGroupModal;
