import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        autoComplete="off"
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-transparent ring-offset-background transition-all duration-500 file:border-0 file:bg-transparent file:text-base  file:font-medium placeholder:text-gray-300 focus:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
