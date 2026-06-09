"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "compact";
}

export default function LogoutButton({
  className = "",
  variant = "default",
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-purple/20 hover:text-gold ${className}`}
      >
        <LogOut className="h-4 w-4" />
        Dil
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm ${className}`}
    >
      <LogOut className="h-4 w-4" />
      Dil nga llogaria
    </button>
  );
}
