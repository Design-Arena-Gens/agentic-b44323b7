"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Message envoyé ! Nous revenons vers vous rapidement.");
    (event.target as HTMLFormElement).reset();
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-panel p-10"
        >
          <h1 className="text-3xl font-semibold text-slate-900">Contact & support</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Discutons de vos projets, demandes de démonstration ou besoins spécifiques d’intégration.
          </p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Nom</label>
              <input
                type="text"
                required
                className="mt-2 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400"
                placeholder="Votre nom complet"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Email</label>
              <input
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400"
                placeholder="prenom@entreprise.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Sujet</label>
              <input
                type="text"
                className="mt-2 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400"
                placeholder="Type de projet"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Message</label>
              <textarea
                required
                rows={5}
                className="mt-2 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400"
                placeholder="Décrivez votre besoin..."
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
            >
              <Send className="h-4 w-4" /> Envoyer
            </button>
            {status && <p className="text-xs font-semibold text-emerald-600">{status}</p>}
          </form>
        </motion.div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900">Nous joindre</h2>
            <ul className="mt-4 space-y-4 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-500" /> support@greenenergy.app
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-500" /> +33 1 86 65 20 30
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-emerald-500" /> 42 Rue des Énergies, 75002 Paris
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-emerald-100 shadow-lg">
            <iframe
              title="Localisation Green Energy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.922182219152!2d2.339527415674172!3d48.86471607928839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06b52c37%3A0x5f4e7edc8db05d2b!2s2%20Rue%20de%20Palatine%2C%2075006%20Paris!5e0!3m2!1sfr!2sfr!4v1708086726719!5m2!1sfr!2sfr"
              width="100%"
              height="320"
              loading="lazy"
              className="w-full"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
