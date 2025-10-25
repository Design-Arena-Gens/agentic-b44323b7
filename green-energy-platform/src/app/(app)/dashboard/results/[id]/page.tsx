"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useProjects } from "@/contexts/ProjectContext";

const MONTHLY_FACTORS = [0.86, 0.88, 0.94, 1, 1.05, 1.08, 1.12, 1.08, 1.02, 0.96, 0.9, 0.84];

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { projects } = useProjects();

  const project = useMemo(() => projects.find((item) => item.id === id), [projects, id]);

  const monthlyData = useMemo(() => {
    if (!project) return [];
    const base = project.result.production / MONTHLY_FACTORS.reduce((acc, value) => acc + value, 0);
    return MONTHLY_FACTORS.map((factor, index) => ({
      name: new Date(0, index).toLocaleString("fr-FR", { month: "short" }),
      production: Math.round(base * factor),
    }));
  }, [project]);

  if (!project) {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-white/95 p-10 text-center text-sm text-slate-600">
        <p>Projet introuvable.</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white"
        >
          Revenir au tableau de bord
        </button>
      </div>
    );
  }

  const fileName = project.inputs.name.toLowerCase().replace(/[^a-z0-9]+/gi, "-") || "note-de-calcul";

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(31, 138, 112);
    doc.text("Rapport de calcul", 20, 25);
    doc.setFontSize(12);
    doc.setTextColor(60, 72, 88);
    doc.text(`Projet : ${project.inputs.name}`, 20, 40);
    doc.text(`Localisation : ${project.inputs.location}`, 20, 48);
    doc.text(`Mode : ${project.inputs.mode}`, 20, 56);
    doc.text(`Production : ${project.result.production.toLocaleString()} kWh/an`, 20, 72);
    doc.text(`Couverture : ${project.result.coverageRate}%`, 20, 80);
    doc.text(`ROI : ${project.result.roi}%`, 20, 88);
    doc.text(`Économies : ${project.result.savings.toLocaleString()} €`, 20, 96);
    doc.text(`Période de retour : ${Math.round(project.result.paybackMonths / 12 * 10) / 10} ans`, 20, 104);
    doc.text(`CO₂ évité : ${project.result.co2Offset} t/an`, 20, 112);
    doc.save(`${fileName}.pdf`);
  };

  const exportExcel = () => {
    const sheetData = [
      { clé: "Nom du projet", valeur: project.inputs.name },
      { clé: "Client", valeur: project.inputs.client },
      { clé: "Localisation", valeur: project.inputs.location },
      { clé: "Mode", valeur: project.inputs.mode },
      { clé: "Puissance (kWc)", valeur: project.inputs.peakPowerKw },
      { clé: "Production (kWh/an)", valeur: project.result.production },
      { clé: "Couverture (%)", valeur: project.result.coverageRate },
      { clé: "ROI (%)", valeur: project.result.roi },
      { clé: "Économies (€)", valeur: project.result.savings },
      { clé: "Retour (mois)", valeur: project.result.paybackMonths },
      { clé: "CO₂ évité (t/an)", valeur: project.result.co2Offset },
    ];
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapport");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Résultats</p>
          <h1 className="text-2xl font-semibold text-slate-900">{project.inputs.name}</h1>
          <p className="text-sm text-slate-500">{project.inputs.location}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportPdf}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-600"
          >
            <Download className="h-4 w-4" /> Télécharger PDF
          </button>
          <button
            onClick={exportExcel}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-600"
          >
            <Download className="h-4 w-4" /> Export Excel
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.7fr_0.3fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-slate-900">Synthèse énergétique</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Production</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-800">{project.result.production.toLocaleString()} kWh</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">ROI</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{project.result.roi}%</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Retour</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(project.result.paybackMonths / 12 * 10) / 10} ans
              </p>
            </div>
          </div>
          <div className="mt-8 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f8a70" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#1f8a70" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${Math.round(value / 1000)} MWh`} />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} kWh`} cursor={{ fill: "#f0fdf4" }} />
                <Area type="monotone" dataKey="production" stroke="#0f766e" fill="url(#color)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Résumé</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Puissance installée : <strong>{project.inputs.peakPowerKw} kWc</strong></li>
              <li>Consommation : <strong>{project.inputs.dailyConsumptionKwh} kWh/j</strong></li>
              <li>Stockage : <strong>{project.inputs.storageCapacityKwh} kWh</strong></li>
              <li>Économies : <strong>{project.result.savings.toLocaleString()} €</strong></li>
              <li>CO₂ évité : <strong>{project.result.co2Offset} t/an</strong></li>
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 text-sm text-slate-600 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Actions rapides</p>
            <div className="mt-4 space-y-3">
              <Link
                href="/dashboard/projects"
                className="block rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-center font-semibold text-emerald-600 transition hover:border-emerald-200"
              >
                Retour aux projets
              </Link>
              <Link
                href="/dashboard/new"
                className="block rounded-2xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
              >
                Nouvelle simulation
              </Link>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" /> Revenir
          </button>
        </motion.div>
      </div>
    </div>
  );
}
