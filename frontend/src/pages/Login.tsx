import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { loginSchema } from "@/lib/schemas";
import { useAuthStore } from "@/hooks/useAuth";
import type { LoginSchema } from "@/lib/schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/PasswordInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      login(data.data);
      toast(data.message);
      form.reset();
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <section className="h-screen py-4 px-4 md:px-8 lg:px-16 xl:px-32 flex items-center justify-center">
      <Card className="w-full shadow-lg border-gray-300 max-w-sm md:max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        type="email"
                        placeholder="john@do.com"
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <PasswordInput field={field} label="Password" />
                )}
              />
              <Button
                type="submit"
                variant="default"
                className={cn(
                  "w-full",
                  form.formState.isSubmitting
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                )}
              >
                {form.formState.isSubmitting ? "LOADING..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button variant="ghost" className="w-full cursor-pointer">
            Login with Google
          </Button>

          <Button
            variant="link"
            type="button"
            className="w-full cursor-pointer"
          >
            <Link to="/register">Don't have an account? Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
