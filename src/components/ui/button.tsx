import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-elevated hover:bg-primary/90 hover:shadow-luxury hover:scale-105 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-elevated hover:bg-destructive/90 hover:shadow-luxury hover:scale-105",
        outline:
          "border border-primary/20 bg-background/80 backdrop-blur-lg shadow-elevated hover:bg-primary/10 hover:text-primary hover:border-primary/40 hover:shadow-luxury hover:scale-105 hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-elevated hover:bg-secondary/80 hover:shadow-luxury hover:scale-105 hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:-translate-y-0.5 transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow hover:scale-105",
        cyber: "bg-gradient-to-r from-primary via-primary-glow to-primary text-white border border-primary/30 shadow-cyber hover:shadow-glow hover:scale-110 hover:-translate-y-1 glow-interactive font-orbitron font-semibold",
        hero: "bg-gradient-to-r from-primary via-primary-glow to-primary text-white border border-primary/40 shadow-luxury hover:shadow-glow hover:scale-110 hover:-translate-y-1 glow-interactive font-orbitron font-bold text-base",
        silver: "bg-gradient-to-r from-cyborg-silver/30 via-cyborg-silver/20 to-cyborg-silver/30 text-foreground border border-cyborg-silver/40 hover:bg-gradient-to-r hover:from-cyborg-silver/50 hover:via-cyborg-silver/40 hover:to-cyborg-silver/50 hover:shadow-luxury hover:scale-105 hover:-translate-y-0.5 transition-all duration-500",
        electric: "bg-primary-electric text-cyborg-dark hover:bg-primary-electric/90 glow-electric font-orbitron hover:scale-110 hover:-translate-y-1",
        premium: "bg-gradient-luxury text-white border border-primary-glow/50 shadow-glow hover:shadow-cyber hover:scale-110 hover:-translate-y-1 font-orbitron font-bold glow-intense",
        glass: "bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:-translate-y-0.5 shadow-luxury",
        neon: "bg-primary-electric/20 text-primary-electric border-2 border-primary-electric hover:bg-primary-electric hover:text-cyborg-dark hover:scale-110 hover:-translate-y-1 font-orbitron font-bold glow-electric"
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-10 text-base",
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
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };