import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#5563F5] to-[#A284EC] text-white hover:shadow-lg hover:shadow-[#5563F5]/30 hover:scale-105 border border-white/20",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 border border-white/20",
        outline: "glass-card text-white hover:glass-hover border-white/20",
        secondary:
          "glass-card text-white hover:bg-white/10 border border-white/10",
        ghost: "text-white hover:bg-white/10 hover:backdrop-blur-sm rounded-lg",
        link: "text-[#A284EC] underline-offset-4 hover:underline hover:text-[#5563F5]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
