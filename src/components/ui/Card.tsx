import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  hover = false,
  glass = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        glass ? "card-glass" : "card-elegant",
        !hover && "[&:not(:hover)]:transform-none",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
