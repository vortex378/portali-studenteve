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
      <select
        id={id}
        className={cn("input-field w-full rounded-xl px-4 py-3", className)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
