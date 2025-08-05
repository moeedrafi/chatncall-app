import { z } from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type FormEvent } from "react";

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

type User = {
  _id: string;
  username: string;
  avatar: string;
};

const formSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  members: z.array(z.any()).min(3, "At least 3 members are required"),
});

const CreateGroupModal = ({ isOpen, setIsOpen }: CreateGroupModalProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchResults, setSearchedResults] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
      members: [],
    },
  });

  const watchSelectedMembers: User[] = form.watch("members");

  const selectUser = (user: User) => {
    if (!watchSelectedMembers.some((member) => member._id === user._id)) {
      form.setValue("members", [...watchSelectedMembers, user]);
      setSelectedMembers((prev) => [...prev, user]);
    }

    setSearchQuery("");
    setSearchedResults([]);
    setShowDropdown(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      groupName: values.groupName,
      members: values.members.map((member) => member._id),
    };

    try {
      const response = await fetch(`${BASE_URL}/conversations/group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast(data.message || "Login failed");
        return;
      }

      form.reset();
      toast(data.message);
    } catch (error) {
      toast("Group creation error:" + error);
    }
  };

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
        const filteredResults = data.data.filter(
          (user: User) =>
            !watchSelectedMembers.some((member) => member._id === user._id)
        );

        setSearchedResults(filteredResults);
        setShowDropdown(true);
      } catch (error) {
        console.log("Search error: ", error);
      }
    }, 5000);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, watchSelectedMembers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Dialog open={isOpen}>
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
                  <FormLabel>
                    Members ({watchSelectedMembers.length}/3 minimum)
                  </FormLabel>
                  <FormControl>
                    <div ref={searchRef} className="relative">
                      <Input
                        {...field}
                        type="text"
                        className="text-sm"
                        value={searchQuery}
                        placeholder="Search..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      {showDropdown && searchResults.length > 0 && (
                        <div className="absolute top-8 z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                          <ul className="py-1">
                            {searchResults.map((user) => (
                              <li
                                key={user._id}
                                onClick={() => selectUser(user)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              >
                                <img
                                  src={user.avatar || "/noAvatar.png"}
                                  alt=""
                                  className="h-8 w-8"
                                />
                                <p className="font-medium text-sm">
                                  {user.username}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {showDropdown &&
                        searchQuery &&
                        searchResults.length === 0 && (
                          <div className="absolute top-full z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-3 text-center">
                            <p className="text-sm text-gray-500">
                              No users found
                            </p>
                          </div>
                        )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchSelectedMembers.length > 0 && (
              <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                <p className="text-sm font-medium">Selected Members:</p>

                {watchSelectedMembers.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar || "/noAvatar.png"}
                        alt=""
                        className="h-8 w-8"
                      />
                      <p className="font-medium text-sm">{member.username}</p>
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
                ))}
              </div>
            )}

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
    </Dialog>
  );
};

export default CreateGroupModal;
