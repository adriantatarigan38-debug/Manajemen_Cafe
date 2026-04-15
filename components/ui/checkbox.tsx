"use client";

import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-soft-foreground">
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-white/30 bg-white/30 text-soft-blue shadow-soft focus:ring-soft-blue/30",
          className,
        )}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
