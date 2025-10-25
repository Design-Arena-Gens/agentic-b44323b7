"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Target, Users } from "lucide-react";

const team = [
  {
    name: "Nadia El-Mansouri",
    role: "CEO & Co-fondatrice",
    bio: "15 ans d’expérience dans la conception de fermes solaires et de micro-réseaux en Afrique et en Europe.",
  },
  {
    name: "Gabriel Morel",
    role: "CTO & Architecte logiciel",
    bio: "Spécialiste data/IA, il dirige le développement des algorithmes de dimensionnement et des API Green Energy.",
  },
  {
    name: "Lina Aït-Belkacem",
    role: "Responsable clients & partenariats",
    bio: "Elle accompagne les installateurs et investisseurs pour accélérer leurs décisions énergétiques.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "Première version",
    description: "Lancement du moteur de simulation On-grid et premiers pilotes avec des bureaux d’étude." ,
  },
  {
    year: "2022",
    title: "Extension Off-grid",
    description: "Ajout du stockage batterie, du pompage solaire et des rapports automatiques.",
  },
  {
    year: "2024",
    title: "Accélération",
    description: "Ouverture de l’API, partenariats avec des énergéticiens et intégration ERP/CRM." ,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 p-10 shadow-xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm">
              Notre mission
              <Sparkles className="h-4 w-4 text-amber-400" />
            </span>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">
              Accélérer la transition énergétique grâce à des outils fiables et accessibles.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Green Energy accompagne les entreprises, collectivités et installateurs dans leurs projets solaires
              depuis 2021. Nous combinons expertise terrain, intelligence de la donnée et expérience utilisateur pour
              démocratiser les projets à haute valeur environnementale.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <span className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white">+800 projets modulaires</span>
              <span className="rounded-full bg-white px-4 py-2 font-semibold text-emerald-700 shadow-sm">35 pays couverts</span>
              <span className="rounded-full bg-white px-4 py-2 font-semibold text-emerald-700 shadow-sm">API ouverte</span>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80"
              alt="Équipe Green Energy"
              width={900}
              height={700}
              className="h-full w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-lg"
        >
          <Target className="h-10 w-10 text-emerald-600" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Vision</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Devenir la référence des solutions logicielles pour dimensionner, piloter et optimiser les installations
            solaires hybrides dans les régions à fort potentiel solaire.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-lg"
        >
          <Users className="h-10 w-10 text-emerald-600" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Équipe</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Une équipe pluridisciplinaire avec des profils ingénierie, data, énergie et design, répartie entre Paris,
            Dakar et Casablanca.
          </p>
        </motion.div>
      </section>

      <section className="mt-16">
        <h2 className="section-title">Notre équipe</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-emerald-100 bg-white/80 p-6 text-sm shadow-lg text-slate-600"
            >
              <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">{member.role}</p>
              <p className="mt-4 leading-6">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="section-title">Étapes clés</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">{milestone.year}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{milestone.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-lg">
        <h2 className="section-title">Documentation & API</h2>
        <p className="section-subtitle">
          Intégrez nos calculs dans vos outils internes grâce à une API robuste et documentée.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href="#"
            className="gradient-border inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-500/40"
          >
            Documentation API
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 font-semibold text-emerald-700"
          >
            SDK JavaScript
          </Link>
        </div>
      </section>
    </div>
  );
}
