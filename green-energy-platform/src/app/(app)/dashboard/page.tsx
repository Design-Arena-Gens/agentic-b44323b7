"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileSpreadsheet, Gauge, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useProjects } from "@/contexts/ProjectContext";

const MonthCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-3xl border border-emerald-100 bg-white/85 p-6 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">{label}</p>
    <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
  </div>
);

export default function DashboardHome() {
  const { projects } = useProjects();

  const totals = projects.reduce(
    (acc, project) => {
      acc.production += project.result.production;
      acc.savings += project.result.savings;
      acc.co2 += project.result.co2Offset;
      return acc;
    },
    { production: 0, savings: 0, co2: 0 },
  );

  const chartData = projects.slice(0, 6).map((project) => ({
    name: project.inputs.name.split(" ").slice(0, 2).join(" "),
    production: project.result.production,
    roi: project.result.roi,
  }));

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-600 to-teal-500 p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">Production annuelle</p>
              <p className="mt-3 text-3xl font-semibold">{Math.round(totals.production).toLocaleString()} kWh</p>
            </div>
            <Gauge className="h-10 w-10 text-yellow-200" />
          </div>
          <p className="mt-4 text-xs text-emerald-100">Somme des simulations validées cette année.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Économies estimées</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{Math.round(totals.savings).toLocaleString()} €</p>
            </div>
            <TrendingUp className="h-10 w-10 text-emerald-500" />
          </div>
          <p className="mt-4 text-xs text-slate-500">Investissements amortis en moyenne en 4,8 ans.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">CO₂ évité</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{Math.round(totals.co2).toLocaleString()} t</p>
            </div>
            <ArrowUpRight className="h-10 w-10 text-emerald-500" />
          </div>
          <p className="mt-4 text-xs text-slate-500">Basé sur un facteur d’émission 0,495 tCO₂/MWh.</p>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Performance des projets</h2>
              <p className="text-xs text-slate-500">Production vs retour sur investissement</p>
            </div>
            <Link href="/dashboard/projects" className="text-xs font-semibold text-emerald-600 hover:text-emerald-500">
              Voir tous
            </Link>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f8a70" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#1f8a70" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${Math.round(value / 1000)} MWh`} />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} kWh`} cursor={{ fill: "#ecfeff" }} />
                <Area type="monotone" dataKey="production" stroke="#0f766e" fill="url(#colorProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="space-y-4"
        >
          <MonthCard label="Projets actifs" value={`${projects.length}`} />
          <MonthCard label="ROI moyen" value={`${projects.length ? Math.round(chartData.reduce((acc, item) => acc + item.roi, 0) / chartData.length) : 0} %`} />
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-600 to-teal-500 p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold">Rapports instantanés</h3>
            <p className="mt-3 text-sm text-emerald-100">
              Exportez vos simulations vers PDF ou Excel et gagnez du temps lors de vos comités.
            </p>
            <Link
              href="/dashboard/projects"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/25"
            >
              <FileSpreadsheet className="h-4 w-4" /> Gérer les rapports
            </Link>
          </div>
        </motion.div>
      </div>

      <section className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Dernières notes de calcul</h2>
          <Link href="/dashboard/new" className="text-xs font-semibold text-emerald-600 hover:text-emerald-500">
            + Nouvelle note
          </Link>
        </div>
        <div className="mt-6 space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white p-4 text-sm text-slate-600 shadow-sm transition hover:border-emerald-200 hover:shadow-md md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-base font-semibold text-slate-900">{project.inputs.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">{project.inputs.mode.toUpperCase()}</p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <span>
                  Production : <strong>{project.result.production.toLocaleString()} kWh</strong>
                </span>
                <span>
                  ROI : <strong>{project.result.roi}%</strong>
                </span>
                <span>
                  Payback : <strong>{Math.round(project.result.paybackMonths / 12 * 10) / 10} ans</strong>
                </span>
              </div>
              <Link
                href={`/dashboard/results/${project.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
              >
                Voir le rapport
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
