"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, LineChart, ShieldCheck, Sparkles } from "lucide-react";

const services = [
  {
    title: "Calcul On-grid",
    description: "Optimisez vos installations raccordées pour maximiser l’autoconsommation et la revente.",
    icon: LineChart,
  },
  {
    title: "Calcul Off-grid",
    description: "Dimensionnez vos solutions autonomes avec stockage et couverture énergétique optimale.",
    icon: ShieldCheck,
  },
  {
    title: "Pompage solaire",
    description: "Évaluez la production et les pompes adaptées pour l’irrigation et l’eau potable.",
    icon: Leaf,
  },
];

const partners = [
  "/partners/partner-1.svg",
  "/partners/partner-2.svg",
  "/partners/partner-3.svg",
  "/partners/partner-4.svg",
];

const testimonials = [
  {
    name: "Sofia Benali",
    role: "Cheffe de projets énergies renouvelables",
    quote:
      "Les simulations sont rapides et fiables. Les rapports PDF sont parfaits pour nos comités d’investissement.",
  },
  {
    name: "Yassine Traoré",
    role: "Ingénieur solaire",
    quote:
      "La plateforme nous fait gagner plusieurs heures par projet avec un dimensionnement Off-grid ultra précis.",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="hero-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/80 to-amber-50/90" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Plateforme Green Energy
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            </span>
            <h1 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              Optimisez vos projets solaires <span className="text-emerald-600">facilement</span>.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Simulez, comparez et générez vos notes de calcul en quelques étapes. Une application unique pour les
              projets On-grid, Off-grid et pompage solaire.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard/new"
                className="gradient-border inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500"
              >
                Créer une note de calcul <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-600"
              >
                Voir le tableau de bord
              </Link>
            </div>
            <dl className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-white/60 px-4 py-5 text-center shadow-sm">
                <dt className="text-sm font-medium text-emerald-700">Projets suivis</dt>
                <dd className="mt-2 text-3xl font-bold text-slate-900">+1 200</dd>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white/60 px-4 py-5 text-center shadow-sm">
                <dt className="text-sm font-medium text-emerald-700">Économie moyenne</dt>
                <dd className="mt-2 text-3xl font-bold text-slate-900">35%</dd>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white/60 px-4 py-5 text-center shadow-sm">
                <dt className="text-sm font-medium text-emerald-700">Satisfaction</dt>
                <dd className="mt-2 text-3xl font-bold text-slate-900">4.9/5</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex-1"
          >
            <div className="glass-panel relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80"
                alt="Panneaux solaires modernes"
                width={900}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-amber-500/20" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -bottom-10 right-8 w-64 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Impact carbone</p>
              <p className="mt-2 text-5xl font-bold text-slate-900">-72%</p>
              <p className="mt-2 text-xs text-slate-500">Réduction moyenne par projet dimensionné.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="section-title">Nos services</h2>
          <p className="section-subtitle">
            Des outils intelligents et adaptés à chaque scénario énergétique pour vous aider à décider en toute
            confiance.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45 }}
              className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-lg shadow-emerald-100 transition hover:-translate-y-1 hover:shadow-emerald-200"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 opacity-0 transition group-hover:opacity-100" />
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-emerald-50/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h2 className="section-title">Pourquoi nous choisir</h2>
            <p className="section-subtitle">
              Un ecosystème complet qui combine intelligence énergétique, expérience utilisateur premium et
              automatisation des livrables.
            </p>
            <ul className="mt-8 space-y-5 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  1
                </span>
                <div>
                  <p className="text-base font-semibold text-slate-900">Économie</p>
                  <p>Optimisez vos CAPEX & OPEX avec des simulations précises et des ROI détaillés.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  2
                </span>
                <div>
                  <p className="text-base font-semibold text-slate-900">Fiabilité</p>
                  <p>Algorithmes validés par des experts terrain et mises à jour en continu avec les données météo.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  3
                </span>
                <div>
                  <p className="text-base font-semibold text-slate-900">Durabilité</p>
                  <p>Mesurez l’impact environnemental, la réduction CO₂ et valorisez vos engagements RSE.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="glass-panel space-y-6 p-10"
            >
              <div className="flex justify-between text-sm text-slate-600">
                <span>Rendement moyen</span>
                <span className="font-semibold text-slate-900">82%</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Taux d’autoconsommation</span>
                <span className="font-semibold text-slate-900">68%</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Période de retour</span>
                <span className="font-semibold text-slate-900">5,4 ans</span>
              </div>
              <p className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                +23% de rentabilité moyenne observée sur un panel de 80 projets industriels accompagnés depuis 2022.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h2 className="section-title">Témoignages & partenaires</h2>
            <p className="section-subtitle">
              Une communauté d’experts, bureaux d’étude et installateurs qui construisent la transition énergétique.
            </p>
            <div className="mt-10 space-y-6">
              {testimonials.map((testimonial) => (
                <motion.blockquote
                  key={testimonial.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45 }}
                  className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm"
                >
                  <p className="text-sm leading-6 text-slate-700">“{testimonial.quote}”</p>
                  <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    {testimonial.name} — {testimonial.role}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-8">
            {partners.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex h-20 w-36 items-center justify-center rounded-2xl border border-emerald-100 bg-white/70 shadow-inner"
              >
                <Image src={logo} alt="Partenaire Green Energy" width={120} height={60} className="opacity-80" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-10 text-white shadow-xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="text-3xl font-semibold">Lancez votre prochain projet solaire dès aujourd’hui.</h3>
            <p className="max-w-2xl text-sm text-emerald-100">
              Planifiez, simulez et partagez vos notes de calcul avec votre équipe ou vos clients en un clic.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
