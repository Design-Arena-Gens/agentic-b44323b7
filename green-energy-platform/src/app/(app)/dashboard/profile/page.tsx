"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Save, Settings2 } from "lucide-react";
import Image from "next/image";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const themes = [
  { id: "clair", label: "Clair" },
  { id: "sombre", label: "Sombre" },
];

const units = [
  { id: "metric", label: "Métrique" },
  { id: "imperial", label: "Impérial" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useLocalStorage("green-energy-profile", {
    name: "Claire Dupont",
    email: "claire.dupont@greenenergy.app",
    company: "Green Energy",
    phone: "+33 6 12 34 56 78",
    theme: "clair",
    unit: "metric",
    language: "fr",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      const timeout = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [saved]);

  const handleChange = (field: string, value: string) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Profil utilisateur</h1>
          <p className="text-sm text-slate-500">Mettez à jour vos informations et préférences d’affichage.</p>
        </div>
        <button
          onClick={() => setSaved(true)}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
        >
          <Save className="h-4 w-4" /> Sauvegarder
        </button>
      </header>

      {saved && <p className="text-xs font-semibold text-emerald-600">Modifications enregistrées.</p>}

      <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-100 bg-white/95 p-6 text-sm text-slate-600 shadow-lg"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Image src="/avatar.svg" alt="Avatar" width={120} height={120} className="rounded-full" />
              <button className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-900">{profile.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">{profile.company}</p>
            </div>
            <p className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Statut : Actif
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-6"
        >
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900">Informations personnelles</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Nom</span>
                <input
                  value={profile.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Email</span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Entreprise</span>
                <input
                  value={profile.company}
                  onChange={(event) => handleChange("company", event.target.value)}
                  className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Téléphone</span>
                <input
                  value={profile.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900">Préférences</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Unité</span>
                <div className="flex gap-3">
                  {units.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleChange("unit", item.id)}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        profile.unit === item.id
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/40"
                          : "border border-emerald-100 bg-white text-emerald-600"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Thème</span>
                <div className="flex gap-3">
                  {themes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleChange("theme", item.id)}
                      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        profile.theme === item.id
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/40"
                          : "border border-emerald-100 bg-white text-emerald-600"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Langue</span>
                <select
                  value={profile.language}
                  onChange={(event) => handleChange("language", event.target.value)}
                  className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
              <Settings2 className="h-4 w-4" />
              Personnalisez l’export de vos rapports (unités, devise) dans cette section.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
