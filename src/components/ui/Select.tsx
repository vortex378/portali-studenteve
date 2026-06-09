import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function Select({
  label,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-foreground/85"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn("select-field w-full rounded-xl px-4 py-3 pr-10", className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/80"
          aria-hidden
        />
      </div>
    </div>
  );
}
