"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarHapur, setSidebarHapur] = useState(false);

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-background">
      <AdminSidebar
        hapur={sidebarHapur}
        onMbyll={() => setSidebarHapur(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-surface/90 px-4 py-3.5 backdrop-blur-xl lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarHapur(true)}
              className="rounded-xl p-2 text-foreground transition-colors hover:bg-white/5 lg:hidden"
              aria-label="Hap menunë"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">
                Paneli i Administratorit
              </p>
              <p className="truncate text-xs text-muted">
                Akademia e Forcave të Armatosura
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden text-sm text-muted transition-colors hover:text-accent-light sm:inline"
            >
              Kthehu në Portal
            </Link>
            <LogoutButton variant="compact" />
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
