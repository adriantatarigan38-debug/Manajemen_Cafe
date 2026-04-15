"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "glass";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-soft-blue text-white hover:bg-[#7faecc] shadow-soft border border-white/20",
  secondary:
    "bg-soft-mint text-slate-700 hover:bg-[#b3d0c2] shadow-soft border border-white/20",
  ghost:
    "bg-white/10 text-soft-foreground hover:bg-white/20 border border-white/20 backdrop-blur-md",
  glass:
    "glass glass-hover text-soft-foreground",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-soft-blue/40 disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
