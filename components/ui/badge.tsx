import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/30 bg-white/30 px-2.5 py-1 text-xs font-medium text-soft-foreground backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  );
}
