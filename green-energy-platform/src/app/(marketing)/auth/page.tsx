"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail, Lock, UserRound, Loader2 } from "lucide-react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden pb-16 pt-10">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-r from-emerald-100/90 via-white to-amber-100/60" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 md:flex-row md:items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 md:w-1/2"
        >
          <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow-sm">
            Authentification sécurisée
          </span>
          <h1 className="text-4xl font-bold text-slate-900">
            {isSignUp ? "Rejoignez la plateforme" : "Connexion à votre espace"}
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Accédez à votre tableau de bord, vos notes de calcul et vos rapports. Profitez d’une expérience fluide et
            responsive, pensée pour les équipes énergie.
          </p>
          <ul className="space-y-4 text-sm text-slate-600">
            <li>• Gestion de projets multi-sites</li>
            <li>• Génération de rapports PDF & Excel</li>
            <li>• Collaboration et partage sécurisé</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="glass-panel relative overflow-hidden">
            <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300" />
            <div className="flex items-center justify-between px-6 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Green Energy</p>
              <button
                type="button"
                onClick={toggleMode}
                className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-600"
              >
                {isSignUp ? "Je possède un compte" : "Créer un compte"}
              </button>
            </div>
            <form className="space-y-4 px-6 pb-8 pt-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Nom complet
                  </label>
                  <div className="gradient-border flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                    <UserRound className="h-4 w-4 text-emerald-500" />
                    <input
                      id="name"
                      type="text"
                      placeholder="Ex. Claire Dupont"
                      className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email professionnel
                </label>
                <div className="gradient-border flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  <input
                    id="email"
                    type="email"
                    placeholder="prenom@entreprise.com"
                    className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Mot de passe
                </label>
                <div className="gradient-border flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                  <Lock className="h-4 w-4 text-emerald-500" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label htmlFor="confirm" className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Confirmation
                  </label>
                  <div className="gradient-border flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                    <Lock className="h-4 w-4 text-emerald-500" />
                    <input
                      id="confirm"
                      type="password"
                      placeholder="••••••••"
                      className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-500">
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="gradient-border flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {isSignUp ? "Créer un compte" : "Se connecter"}
              </button>

              <div className="relative py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span className="relative bg-white px-3">OU</span>
                <span className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <Image src="/google.svg" alt="Google" width={20} height={20} />
                </span>
                Continuer avec Google
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
