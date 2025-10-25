"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, FileDown, Zap } from "lucide-react";
import { ResponsiveContainer, RadialBar, RadialBarChart, Tooltip } from "recharts";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { useProjects, CalculationMode, ProjectInputs, ProjectResult } from "@/contexts/ProjectContext";

const steps = [
  { id: 0, title: "Informations générales" },
  { id: 1, title: "Données techniques" },
  { id: 2, title: "Simulation & dimensionnement" },
  { id: 3, title: "Résultats & rapport" },
];

const defaultInputs: ProjectInputs = {
  name: "",
  client: "",
  location: "",
  mode: "on-grid",
  peakPowerKw: 50,
  dailyConsumptionKwh: 250,
  irradiance: 4.5,
  storageCapacityKwh: 20,
  investment: 80_000,
  tariff: 0.16,
  horizonYears: 15,
};

function computeResult(inputs: ProjectInputs): ProjectResult {
  const production = Math.round(inputs.peakPowerKw * inputs.irradiance * 365 * 0.82);
  const demand = inputs.dailyConsumptionKwh * 365;
  const coverageRate = Math.min(100, Math.round((production / demand) * 100));
  const savings = Math.round(inputs.dailyConsumptionKwh * inputs.tariff * 365 * (coverageRate / 100));
  const roi = Math.round((savings / inputs.investment) * 100);
  const paybackMonths = Math.max(12, Math.round((inputs.investment / Math.max(savings, 1)) * 12));
  const co2Offset = Math.round((production / 1000) * 0.495 * 100) / 100;
  return { production, coverageRate, savings, roi, paybackMonths, co2Offset };
}

export default function NewCalculationPage() {
  const router = useRouter();
  const { addProject } = useProjects();
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<ProjectInputs>(defaultInputs);
  const result = useMemo(() => computeResult(inputs), [inputs]);

  const handleChange = (field: keyof ProjectInputs, value: string | number | CalculationMode) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleGenerate = () => {
    const project = addProject({ inputs, result });
    router.push(`/dashboard/results/${project.id}`);
  };

  const baseFileName = (inputs.name || "note-calcul").toLowerCase().replace(/[^a-z0-9]+/gi, "-");

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(31, 138, 112);
    doc.text("Note de calcul solaire", 20, 25);
    doc.setFontSize(12);
    doc.setTextColor(60, 72, 88);
    doc.text(`Projet : ${inputs.name || "Non renseigné"}`, 20, 40);
    doc.text(`Client : ${inputs.client || "Non renseigné"}`, 20, 48);
    doc.text(`Localisation : ${inputs.location || "Non renseigné"}`, 20, 56);
    doc.text(`Mode : ${inputs.mode}`, 20, 64);
    doc.text(`Production annuelle : ${result.production.toLocaleString()} kWh`, 20, 80);
    doc.text(`Couverture énergétique : ${result.coverageRate}%`, 20, 88);
    doc.text(`ROI estimé : ${result.roi}%`, 20, 96);
    doc.text(`Économies annuelles : ${result.savings.toLocaleString()} €`, 20, 104);
    doc.text(`CO₂ évité : ${result.co2Offset} tonnes/an`, 20, 112);
    doc.save(`${baseFileName || "note-de-calcul"}.pdf`);
  };

  const handleExportExcel = () => {
    const sheetData = [
      { clé: "Nom du projet", valeur: inputs.name },
      { clé: "Client", valeur: inputs.client },
      { clé: "Localisation", valeur: inputs.location },
      { clé: "Mode", valeur: inputs.mode },
      { clé: "Puissance (kWc)", valeur: inputs.peakPowerKw },
      { clé: "Consommation journalière (kWh)", valeur: inputs.dailyConsumptionKwh },
      { clé: "Irradiation (kWh/m²/j)", valeur: inputs.irradiance },
      { clé: "Stockage (kWh)", valeur: inputs.storageCapacityKwh },
      { clé: "Production annuelle (kWh)", valeur: result.production },
      { clé: "Couverture (%)", valeur: result.coverageRate },
      { clé: "ROI (%)", valeur: result.roi },
      { clé: "Économies (€)", valeur: result.savings },
      { clé: "CO₂ évité (t/an)", valeur: result.co2Offset },
    ];
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Note de calcul");
    XLSX.writeFile(workbook, `${baseFileName || "note-de-calcul"}.xlsx`);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Nouvelle note de calcul</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Assistant de dimensionnement solaire</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Renseignez vos paramètres pour générer automatiquement une note de dimensionnement On-grid, Off-grid ou
          pompage.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
        <aside className="space-y-4">
          {steps.map((item, index) => {
            const isActive = index === step;
            const isDone = index < step;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : isDone
                      ? "border-emerald-100 bg-white text-slate-600"
                      : "border-emerald-50 text-slate-400"
                }`}
              >
                <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${isActive ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-600"}`}>
                  {isDone ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </span>
                {item.title}
              </div>
            );
          })}
        </aside>

        <div className="space-y-6">
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-slate-900">Informations générales</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Nom du projet</span>
                  <input
                    value={inputs.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    placeholder="Ex. Toit entrepôt logistique"
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Client / entité</span>
                  <input
                    value={inputs.client}
                    onChange={(event) => handleChange("client", event.target.value)}
                    placeholder="Nom de l’entreprise"
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400"
                  />
                </label>
                <label className="space-y-2 text-sm md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Localisation</span>
                  <input
                    value={inputs.location}
                    onChange={(event) => handleChange("location", event.target.value)}
                    placeholder="Ville, pays"
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400"
                  />
                </label>
                <div className="md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Mode de calcul</span>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    {["on-grid", "off-grid", "pumping"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => handleChange("mode", mode as CalculationMode)}
                        className={`rounded-full px-4 py-2 font-semibold transition ${
                          inputs.mode === mode
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/40"
                            : "border border-emerald-100 bg-white text-emerald-600"
                        }`}
                      >
                        {mode === "on-grid" ? "On-grid" : mode === "off-grid" ? "Off-grid" : "Pompage"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-slate-900">Données techniques</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Puissance crête (kWc)</span>
                  <input
                    type="number"
                    min={1}
                    value={inputs.peakPowerKw}
                    onChange={(event) => handleChange("peakPowerKw", Number(event.target.value))}
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Consommation quotidienne (kWh)</span>
                  <input
                    type="number"
                    min={1}
                    value={inputs.dailyConsumptionKwh}
                    onChange={(event) => handleChange("dailyConsumptionKwh", Number(event.target.value))}
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Irradiation moyenne (kWh/m²/j)</span>
                  <input
                    type="number"
                    min={1}
                    step={0.1}
                    value={inputs.irradiance}
                    onChange={(event) => handleChange("irradiance", Number(event.target.value))}
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Stockage batterie (kWh)</span>
                  <input
                    type="number"
                    min={0}
                    value={inputs.storageCapacityKwh}
                    onChange={(event) => handleChange("storageCapacityKwh", Number(event.target.value))}
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </label>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-slate-900">Simulation & dimensionnement</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <label className="space-y-2 text-sm md:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Investissement (€)</span>
                  <input
                    type="number"
                    min={1000}
                    step={500}
                    value={inputs.investment}
                    onChange={(event) => handleChange("investment", Number(event.target.value))}
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </label>
                <label className="space-y-2 text-sm md:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Tarif énergie (€ / kWh)</span>
                  <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    value={inputs.tariff}
                    onChange={(event) => handleChange("tariff", Number(event.target.value))}
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </label>
                <label className="space-y-2 text-sm md:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Horizon d’étude (années)</span>
                  <input
                    type="number"
                    min={5}
                    value={inputs.horizonYears}
                    onChange={(event) => handleChange("horizonYears", Number(event.target.value))}
                    className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                  />
                </label>
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-700">
                <p className="font-semibold">Recommandations dimensionnement :</p>
                <ul className="mt-2 space-y-1 text-emerald-800">
                  <li>• {Math.ceil(inputs.peakPowerKw / 0.55)} modules de 550 Wc</li>
                  <li>• {Math.ceil(inputs.storageCapacityKwh / 5)} batteries 5 kWh (si stockage)</li>
                  <li>• Inverseur {inputs.mode === "pumping" ? "à fréquence variable" : "hybride"} {Math.ceil(inputs.peakPowerKw * 1.1)} kVA</li>
                </ul>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-slate-900">Résultats de la simulation</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">Production annuelle</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">{result.production.toLocaleString()} kWh</p>
                    <p className="mt-2 text-xs text-slate-500">Basée sur votre irradiation et rendement système.</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">ROI estimé</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">{result.roi}%</p>
                    <p className="mt-2 text-xs text-slate-500">Période de retour {Math.round(result.paybackMonths / 12 * 10) / 10} ans.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-[0.6fr_0.4fr]">
                  <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">Couverture énergétique</p>
                    <div className="mt-4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          innerRadius="40%"
                          outerRadius="100%"
                          data={[{ name: "Couverture", value: result.coverageRate }]}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <RadialBar cornerRadius={20} dataKey="value" fill="#1f8a70" />
                          <Tooltip formatter={(value: number) => `${value}%`} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-5 text-sm text-slate-600 shadow-sm">
                    <p>Économies annuelles : <strong>{result.savings.toLocaleString()} €</strong></p>
                    <p>CO₂ évité : <strong>{result.co2Offset} t/an</strong></p>
                    <p>Mode : <strong>{inputs.mode === "on-grid" ? "On-grid" : inputs.mode === "off-grid" ? "Off-grid" : "Pompage"}</strong></p>
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em]">Recommandation</p>
                      <p className="mt-2 text-sm">
                        {result.coverageRate > 90
                          ? "Votre installation couvre l’essentiel de la demande, pensez à des mécanismes de revente."
                          : "Ajoutez 10% de puissance ou optimisez les usages pour dépasser 85% de couverture."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-4">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
                >
                  <Zap className="h-4 w-4" /> Générer la note de calcul
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportPdf}
                    className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-600"
                  >
                    <FileDown className="mr-2 inline h-4 w-4" /> Exporter PDF
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-600"
                  >
                    <FileDown className="mr-2 inline h-4 w-4" /> Exporter Excel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:border-emerald-200 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Étape précédente
            </button>
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
              >
                Étape suivante <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
