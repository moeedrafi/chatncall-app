import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, LogOut, Palette, Save, Trash2, User } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import { Alert } from "@/components/Alert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/hooks/useAuth";
import { BASE_URL } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
});

const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Settings = () => {
  const { logout } = useAuthStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", fullName: "" },
  });

  const passwordChangeForm = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  const onSubmitPassword = (values: z.infer<typeof passwordChangeSchema>) => {
    console.log(values);
  };

  const logOut = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      logout();
      console.log(data);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <section className="h-screen overflow-y-auto order-1 sm:order-2 w-full space-y-6 py-4 px-4 md:px-8 lg:px-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User />
            <CardTitle className="text-2xl">Profile</CardTitle>
          </div>
          <CardDescription>
            Update your personal information and profile picture.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        type="text"
                        className="text-sm"
                        placeholder="John Doe"
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
                        placeholder="john@do.com"
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default">
                <Save />
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock />
            <CardTitle className="text-2xl">Security</CardTitle>
          </div>
          <CardDescription>
            Manage your password and security preferences.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <h3 className="font-medium">Change Password</h3>
          <Form {...passwordChangeForm}>
            <form
              onSubmit={passwordChangeForm.handleSubmit(onSubmitPassword)}
              className="space-y-6"
            >
              <FormField
                control={passwordChangeForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <PasswordInput field={field} label="Current Password" />
                )}
              />
              <FormField
                control={passwordChangeForm.control}
                name="newPassword"
                render={({ field }) => (
                  <PasswordInput field={field} label="New Password" />
                )}
              />
              <FormField
                control={passwordChangeForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <PasswordInput field={field} label="Confirm Password" />
                )}
              />
              <Button type="submit" variant="default">
                Change Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette />
            <CardTitle className="text-2xl">Appearance</CardTitle>
          </div>
          <CardDescription>
            Customize how the app looks and feels.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Select value="system">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardContent>
          <Select value="medium">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardContent>
          <Select value="english">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between bg-red-50 p-4 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-red-900">Logout</h4>
              <p className="text-sm text-red-700">
                Sign out of your account on this device
              </p>
            </div>
            <Button
              onClick={logOut}
              variant="outline"
              className="text-red-700 border-red-300 hover:bg-red-100 cursor-pointer"
            >
              <LogOut />
              Logout
            </Button>
          </div>

          <div className="flex items-center justify-between bg-red-50 p-4 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
              <p className="text-sm text-red-700">
                Permanently delete your account and all data
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 size={16} className="mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <Alert
                handleDelete={() => {}}
                heading="Are you absolutely sure?"
                subHeading="This action cannot be undone. This will permanently delete your account and remove all your data from our servers."
              />
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Settings;
