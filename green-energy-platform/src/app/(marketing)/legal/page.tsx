const legalSections = [
  {
    title: "Éditeur",
    content:
      "Green Energy SAS — 42 Rue des Énergies, 75002 Paris. Capital social : 120 000 €. RCS Paris 902 123 456. Directeur de la publication : Nadia El-Mansouri.",
  },
  {
    title: "Hébergement",
    content: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
  },
  {
    title: "Propriété intellectuelle",
    content:
      "L’ensemble des contenus (textes, marques, logos, illustrations, infographies) est protégé par le droit d’auteur. Toute reproduction totale ou partielle sans autorisation est interdite.",
  },
  {
    title: "Protection des données",
    content:
      "Green Energy collecte uniquement les données nécessaires à la gestion des comptes et des projets. Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Contact : privacy@greenenergy.app.",
  },
  {
    title: "Cookies",
    content:
      "Le site utilise des cookies nécessaires au fonctionnement et des cookies analytiques. Vous pouvez gérer vos préférences à tout moment via le centre de confidentialité.",
  },
];

const privacySections = [
  {
    title: "Données traitées",
    items: [
      "Informations de compte : email, nom, mot de passe haché.",
      "Données de projets : paramètres techniques, localisations, rapports générés.",
      "Journalisation : connexions, actions réalisées sur la plateforme.",
    ],
  },
  {
    title: "Durées de conservation",
    items: [
      "Compte actif : tant que le compte est actif.",
      "Projets : 5 ans après la dernière activité.",
      "Logs : 12 mois pour raisons de sécurité.",
    ],
  },
  {
    title: "Sécurité",
    items: [
      "Chiffrement des données en transit (TLS 1.2+).",
      "Segmentation des environnements et sauvegardes quotidiennes.",
      "Audit de sécurité annuel et tests d’intrusion.",
    ],
  },
];

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900">Mentions légales & Politique de confidentialité</h1>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        L’accès et l’utilisation de la plateforme impliquent l’acceptation des présentes mentions légales et de notre
        politique de confidentialité.
      </p>

      <section className="mt-10 space-y-8 text-sm leading-6 text-slate-600">
        {legalSections.map((section) => (
          <div key={section.title} className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-2">{section.content}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Politique de confidentialité</h2>
        <p className="mt-2 text-sm text-slate-600">
          Green Energy met en place des mesures techniques et organisationnelles pour protéger vos données.
        </p>
        <div className="mt-6 space-y-6 text-sm">
          {privacySections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-600">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
