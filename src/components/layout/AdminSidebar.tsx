"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  Shield,
  UserPlus,
  Users,
  X,
} from "lucide-react";

const menuItems = [
  {
    href: "/admin",
    etiketa: "Paneli Kryesor",
    ikona: LayoutDashboard,
  },
  {
    href: "/admin/students",
    etiketa: "Studentët",
    ikona: Users,
  },
  {
    href: "/admin/students/new",
    etiketa: "Shto Student",
    ikona: UserPlus,
  },
  {
    href: "/admin/exams",
    etiketa: "Provimet",
    ikona: BookOpen,
  },
  {
    href: "/admin/exams/new",
    etiketa: "Shto Provim",
    ikona: BookOpen,
  },
];

interface AdminSidebarProps {
  hapur?: boolean;
  onMbyll?: () => void;
}

export default function AdminSidebar({
  hapur = true,
  onMbyll,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const eshteAktive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {hapur && onMbyll && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMbyll}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gold/10 bg-navy transition-transform duration-300 lg:static lg:translate-x-0 ${
          hapur ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple/40">
              <Shield className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Paneli i Administratorit</p>
              <p className="text-xs text-gold/70">Menaxhimi</p>
            </div>
          </div>
          {onMbyll && (
            <button
              type="button"
              onClick={onMbyll}
              className="rounded-lg p-1 text-foreground/60 hover:text-foreground lg:hidden"
              aria-label="Mbyll menunë"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const Ikona = item.ikona;
            const aktive = eshteAktive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMbyll}
                className={`sidebar-link flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                  aktive
                    ? "active text-gold"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Ikona className="h-5 w-5" />
                {item.etiketa}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
