"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Filter, MapPin, Trash2 } from "lucide-react";
import { useProjects, CalculationMode } from "@/contexts/ProjectContext";

const modeLabels: Record<CalculationMode, string> = {
  "on-grid": "On-grid",
  "off-grid": "Off-grid",
  pumping: "Pompage",
};

export default function ProjectsPage() {
  const { projects, removeProject } = useProjects();
  const [selectedMode, setSelectedMode] = useState<CalculationMode | "all">("all");

  const filtered = useMemo(() => {
    if (selectedMode === "all") return projects;
    return projects.filter((project) => project.inputs.mode === selectedMode);
  }, [projects, selectedMode]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Mes projets</h1>
          <p className="text-sm text-slate-500">
            Retrouvez l’ensemble des notes de calcul enregistrées sur la plateforme.
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
        >
          + Nouvelle note
        </Link>
      </header>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1">
          <Filter className="h-4 w-4 text-emerald-500" /> Filtres
        </span>
        {["all", "on-grid", "off-grid", "pumping"].map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode as CalculationMode | "all")}
            className={`rounded-full px-4 py-2 font-semibold transition ${
              selectedMode === mode
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/40"
                : "border border-emerald-100 bg-white text-emerald-600 hover:border-emerald-200"
            }`}
          >
            {mode === "all" ? "Tous" : modeLabels[mode as CalculationMode]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-5 text-sm text-slate-600 shadow-md transition hover:border-emerald-200 hover:shadow-lg md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-lg font-semibold text-slate-900">{project.inputs.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">{modeLabels[project.inputs.mode]}</p>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-emerald-500" />
                {new Date(project.createdAt).toLocaleDateString("fr-FR")}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                {project.inputs.location}
              </span>
              <span>
                Production <strong>{project.result.production.toLocaleString()} kWh</strong>
              </span>
              <span>
                ROI <strong>{project.result.roi}%</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/results/${project.id}`}
                className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
              >
                Voir le rapport
              </Link>
              <button
                onClick={() => removeProject(project.id)}
                className="rounded-full border border-red-100 bg-white px-3 py-2 text-xs font-semibold text-red-500 transition hover:border-red-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
        {!filtered.length && (
          <div className="rounded-3xl border border-emerald-100 bg-white/90 p-10 text-center text-sm text-slate-500">
            Aucun projet pour ce filtre.
          </div>
        )}
      </div>
    </div>
  );
}
