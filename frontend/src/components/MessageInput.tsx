import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
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

export const MessageInput = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const form = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: "" },
  });

  const onSubmit = async (values: ChatSchema) => {
    try {
      const response = await fetch(`${BASE_URL}/messages/${conversationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast("Message sent failed");
        return;
      }

      form.reset();
    } catch (error) {
      toast("Couldnt send message:" + error);
    }
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
