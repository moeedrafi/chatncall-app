import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
}

export const PasswordInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  label,
}: PasswordInputProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            required
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder="******"
            className="text-sm"
          />

          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer absolute top-2 right-2 transition-transform duration-200 hover:scale-110"
          >
            {showPassword ? <Eye width={20} /> : <EyeClosed width={20} />}
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
