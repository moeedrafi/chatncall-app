import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatSchema, type ChatSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

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

// const useSendMessage = (conversationId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (values: ChatSchema) =>
//       fetch(`${BASE_URL}/messages/${conversationId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(values),
//       }).then((res) => {
//         if (!res.ok) throw new Error("Failed to send");
//         return res.json();
//       }),
//     onMutate: async (values) => {
//       await queryClient.cancelQueries({
//         queryKey: ["messages", { conversationId }],
//       });

//       const snapshot = queryClient.getQueryData([
//         "messages",
//         { conversationId },
//       ]);

//       const optimisticMessage: Message = {
//         _id: `temp-${Date.now()}`,
//         body: values.message,
//         sender: "me",
//         conversation: "",
//         seenBy: [],
//       };

//       queryClient.setQueryData(
//         ["messages", { conversationId }],
//         (previousMessages: Message[] = []) => [
//           ...previousMessages,
//           optimisticMessage,
//         ]
//       );

//       return { snapshot };
//     },
//     onError: (error, _, context) => {
//       queryClient.setQueryData(
//         ["messages", { conversationId }],
//         context?.snapshot
//       );
//     },
//     onSettled: () =>
//       queryClient.invalidateQueries({
//         queryKey: ["messages", { conversationId }],
//       }),
//   });
// };

const useSendMessage = (id: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ChatSchema) =>
      fetch(`${BASE_URL}/messages/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to send");
        return res.json();
      }),
    onMutate: async (values) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", { id }],
      });

      const snapshot = queryClient.getQueryData(["messages", { id }]);

      const optimisticMessage: Message = {
        _id: `temp-${Date.now()}`,
        body: values.message,
        sender: userId,
        conversation: "",
        seenBy: [],
      };

      queryClient.setQueryData(
        ["messages", { id }],
        (previousMessages: Message[] = []) => [
          ...previousMessages,
          optimisticMessage,
        ]
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

export const MessageInput = ({
  conversationId,
  userId,
}: {
  conversationId: string;
  userId: string;
}) => {
  const form = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: "" },
  });

  const sendMessage = useSendMessage(conversationId, userId);

  const onSubmit = (values: ChatSchema) => {
    sendMessage.mutate(values, {
      onSuccess: () => form.reset(),
      onError: (error) => toast("Couldn't send message" + error),
    });
  };

  return (
    <div className="p-4 border-t border-t-gray-300">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 justify-between"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    required
                    {...field}
                    type="text"
                    placeholder="Type a message"
                    className="text-sm rounded-full border-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="default"
            className={cn(
              "bg-green-400 p-2 rounded-full hover:bg-green-500",
              form.formState.isSubmitting
                ? "cursor-not-allowed"
                : "cursor-pointer"
            )}
          >
            <SendHorizonal size={20} className="text-white" />
          </Button>
        </form>
      </Form>
    </div>
  );
};
