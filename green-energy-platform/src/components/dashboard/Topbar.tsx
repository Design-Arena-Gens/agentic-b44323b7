"use client";

import { useMemo } from "react";
import { Search, SunMedium } from "lucide-react";
import Image from "next/image";

export function Topbar() {
  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  }, []);

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-emerald-100/70 bg-white/80 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{timeOfDay}</span>
        <h1 className="text-lg font-semibold text-slate-900">Tableau de bord</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm text-slate-500 md:flex">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="Rechercher une note..."
            className="w-48 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <button className="rounded-full border border-emerald-100 bg-white p-2 text-emerald-600 shadow-sm transition hover:border-emerald-200">
          <SunMedium className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-3 py-1 shadow-sm">
          <Image src="/avatar.svg" alt="Avatar" width={36} height={36} className="h-9 w-9 rounded-full" />
          <div className="hidden text-xs font-semibold text-slate-700 sm:block">
            <p>Claire Dupont</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-emerald-500">Ingénieure projet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
