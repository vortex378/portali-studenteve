"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import LogoutButton from "@/components/auth/LogoutButton";

const lidhjet = [
  { href: "/", etiketa: "Kryefaqja" },
  { href: "/login", etiketa: "Hyrja" },
  { href: "/dashboard", etiketa: "Paneli" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuHapur, setMenuHapur] = useState(false);

  const mbyllMenune = useCallback(() => setMenuHapur(false), []);

  useEffect(() => {
    mbyllMenune();
  }, [pathname, mbyllMenune]);

  useEffect(() => {
    if (!menuHapur) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") mbyllMenune();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuHapur, mbyllMenune]);

  return (
    <nav className="relative sticky top-0 z-50 border-b border-white/8 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="icon-accent-box flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <Shield className="h-5 w-5 text-accent" />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-bold leading-tight text-foreground">
              Portali i Studentëve
            </p>
            <p className="truncate text-xs text-accent-light/90">
              Akademia e Forcave të Armatosura
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {lidhjet.map((lidhja) => (
            <Link
              key={lidhja.href}
              href={lidhja.href}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                pathname === lidhja.href
                  ? "bg-accent/15 text-accent-light"
                  : "text-foreground/65 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {lidhja.etiketa}
            </Link>
          ))}
          {pathname === "/dashboard" && <LogoutButton variant="compact" />}
        </div>

        <button
          type="button"
          className="mobile-burger-btn relative flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
          onClick={() => setMenuHapur((hapur) => !hapur)}
          aria-label={menuHapur ? "Mbyll menunë" : "Hap menunë"}
          aria-expanded={menuHapur}
          aria-controls="mobile-nav-panel"
          data-open={menuHapur}
        >
          <Menu
            className="mobile-burger-icon mobile-burger-icon--menu absolute h-5 w-5 text-foreground"
            aria-hidden
          />
          <X
            className="mobile-burger-icon mobile-burger-icon--close absolute h-5 w-5 text-accent-light"
            aria-hidden
          />
        </button>
      </div>

      {/* Overlay — fixed, jashtë flow-it; nuk shtyn përmbajtjen */}
      <div
        className="mobile-menu-overlay md:hidden"
        data-open={menuHapur}
        onClick={mbyllMenune}
        aria-hidden={!menuHapur}
      />

      {/* Panel — absolute poshtë navbar-it, jashtë flow-it */}
      <div
        id="mobile-nav-panel"
        className="mobile-menu-panel md:hidden"
        data-open={menuHapur}
        aria-hidden={!menuHapur}
        inert={menuHapur ? undefined : true}
      >
        <div className="space-y-1.5">
          {lidhjet.map((lidhja) => {
            const aktive = pathname === lidhja.href;

            return (
              <Link
                key={lidhja.href}
                href={lidhja.href}
                className={`mobile-nav-link block rounded-xl px-4 py-3.5 text-sm font-medium ${
                  aktive
                    ? "bg-[rgba(249,115,22,0.18)] text-accent-light"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                }`}
                onClick={mbyllMenune}
              >
                {lidhja.etiketa}
              </Link>
            );
          })}

          {pathname === "/dashboard" && (
            <div
              className="mobile-nav-logout px-1 pt-1"
              onClickCapture={mbyllMenune}
            >
              <LogoutButton variant="compact" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
