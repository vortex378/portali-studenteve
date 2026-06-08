"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarHapur, setSidebarHapur] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        hapur={sidebarHapur}
        onMbyll={() => setSidebarHapur(false)}
      />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gold/10 bg-navy/80 px-4 py-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarHapur(true)}
              className="rounded-lg p-2 text-foreground lg:hidden"
              aria-label="Hap menunë"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <p className="text-sm font-bold text-foreground">
                Paneli i Administratorit
              </p>
              <p className="text-xs text-gold/70">
                Akademia e Forcave të Armatosura
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-foreground/60 transition-colors hover:text-gold"
          >
            Kthehu në Portal
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
