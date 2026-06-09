import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "success" | "error" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  glow?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  accent:
    "bg-accent/15 text-accent-light border-accent/30 shadow-[0_0_10px_rgba(249,115,22,0.15)]",
  success:
    "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
  error:
    "bg-red-500/15 text-red-300 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]",
  neutral:
    "bg-white/5 text-foreground/70 border-white/10",
};

export default function Badge({
  children,
  variant = "neutral",
  glow = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        glow && "shadow-[0_0_14px_currentColor]",
        className
      )}
    >
      {children}
    </span>
  );
}
