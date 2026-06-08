"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

const lidhjet = [
  { href: "/", etiketa: "Kryefaqja" },
  { href: "/login", etiketa: "Hyrja" },
  { href: "/dashboard", etiketa: "Paneli" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuHapur, setMenuHapur] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gold/10 bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/40">
            <Shield className="h-6 w-6 text-gold" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-foreground">
              Portali i Studentëve
            </p>
            <p className="text-xs text-gold/80">
              Akademia e Forcave të Armatosura
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {lidhjet.map((lidhja) => (
            <Link
              key={lidhja.href}
              href={lidhja.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                pathname === lidhja.href
                  ? "bg-purple/30 text-gold"
                  : "text-foreground/70 hover:bg-purple/20 hover:text-foreground"
              }`}
            >
              {lidhja.etiketa}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setMenuHapur(!menuHapur)}
          aria-label={menuHapur ? "Mbyll menunë" : "Hap menunë"}
        >
          {menuHapur ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuHapur && (
        <div className="border-t border-gold/10 bg-navy/95 px-4 py-3 md:hidden">
          {lidhjet.map((lidhja) => (
            <Link
              key={lidhja.href}
              href={lidhja.href}
              className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === lidhja.href
                  ? "bg-purple/30 text-gold"
                  : "text-foreground/70"
              }`}
              onClick={() => setMenuHapur(false)}
            >
              {lidhja.etiketa}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
