"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/auth", label: "Connexion" },
];

const highlightPaths = new Set(["/dashboard", "/dashboard/new", "/dashboard/profile"]);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isDashboard = useMemo(() => {
    return [...highlightPaths].some((path) => pathname.startsWith(path));
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-emerald-800 transition hover:text-emerald-600"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
            ⚡
          </span>
          Green Energy
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {isDashboard && (
            <Link
              href="/dashboard"
              className="ml-4 rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-600"
            >
              Tableau de bord
            </Link>
          )}
        </nav>

        <button
          type="button"
          aria-label="Ouvrir la navigation"
          className="rounded-full border border-emerald-100 bg-white p-2 text-emerald-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="mx-6 mb-4 rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-lg">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-emerald-600 text-white shadow-inner"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {isDashboard && (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg"
                >
                  Tableau de bord
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
