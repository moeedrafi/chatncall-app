import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { registerSchema } from "@/lib/schemas";
import { useAuthStore } from "@/hooks/useAuth";
import type { RegisterSchema } from "@/lib/schemas";

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

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterSchema) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      login(data.data);
      form.reset();
      navigate("/");
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <section className="h-screen py-4 px-4 md:px-8 lg:px-16 xl:px-32 flex items-center justify-center">
      <Card className="w-full shadow-lg border-gray-300 max-w-sm md:max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        type="text"
                        placeholder="johndoe"
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="john@doe.com"
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
                {form.formState.isSubmitting ? "LOADING..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full cursor-pointer">
            Login with Google
          </Button>

          <Button
            variant="link"
            type="button"
            className="w-full cursor-pointer"
          >
            <Link to="/login">Already have an account? Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Register;
