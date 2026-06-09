import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className,
  ...props
}: InputProps) {
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
      <input
        id={id}
        className={cn("input-field w-full rounded-xl px-4 py-3", className)}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-400/90">{error}</p>
      )}
    </div>
  );
}
