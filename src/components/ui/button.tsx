import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2  focus:ring-offset-2 hover:bg-slate-800 hover:text-slate-100 disabled:opacity-50 focus:ring-slate-400 disabled:pointer-events-none focus:ring-offset-slate-900  data-[state=open]:bg-slate-800 bg-slate-50 text-slate-900",
  {
    variants: {
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
