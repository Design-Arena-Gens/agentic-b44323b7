"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, PlusSquare, UserCircle, LogOut, Home } from "lucide-react";

const links = [
  { href: "/dashboard", icon: Home, label: "Accueil" },
  { href: "/dashboard/projects", icon: Layers, label: "Mes projets" },
  { href: "/dashboard/new", icon: PlusSquare, label: "Nouveau calcul" },
  { href: "/dashboard/profile", icon: UserCircle, label: "Profil" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-none bg-gradient-to-b from-emerald-900 to-emerald-800 text-white lg:flex">
      <div className="flex h-full flex-col gap-8 p-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700">⚡</span>
          Green Energy
        </Link>
        <nav className="flex-1 space-y-2">
          {links.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active ? "bg-white/15 shadow-lg" : "hover:bg-white/8"
                }`}
              >
                <Icon className="h-4 w-4 text-emerald-100 transition group-hover:text-yellow-200" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <button className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
        <div className="rounded-2xl bg-white/10 p-4 text-xs text-emerald-100">
          <p className="font-semibold text-yellow-200">Support premium</p>
          <p className="mt-2 leading-5">Besoin d’aide ? Contactez-nous 24/7 pour accompagner vos projets critiques.</p>
        </div>
      </div>
    </aside>
  );
}
