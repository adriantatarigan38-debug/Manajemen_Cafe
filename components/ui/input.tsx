import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-white/30 bg-white/40 px-4 py-3 text-sm text-soft-foreground placeholder:text-soft-slate/80 shadow-soft outline-none backdrop-blur-md transition focus:border-soft-blue/40 focus:ring-2 focus:ring-soft-blue/20",
        className,
      )}
      {...props}
    />
  );
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-2xl border border-white/30 bg-white/40 px-4 py-3 text-sm text-soft-foreground placeholder:text-soft-slate/80 shadow-soft outline-none backdrop-blur-md transition focus:border-soft-blue/40 focus:ring-2 focus:ring-soft-blue/20",
        className,
      )}
      {...props}
    />
  );
}
