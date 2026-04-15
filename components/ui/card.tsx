import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("glass rounded-[28px] p-5 md:p-6", className)}>{children}</div>
  );
}

export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-subtitle mt-1">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
