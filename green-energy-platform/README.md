## Green Energy Platform

Plateforme web Next.js pour la conception et le suivi de projets solaires On-grid, Off-grid et pompage.

### Périmètre

- Landing page marketing multisections (services, atouts, témoignages, CTA).
- Authentification UI (connexion / inscription, Google sign-in).
- Tableau de bord interactif avec statistiques, filtres et graphiques.
- Assistant de dimensionnement multi-étapes avec export PDF / Excel.
- Pages résultats, profil utilisateur, à propos, contact, mentions légales.
- Responsive design avec animations Framer Motion et thème Green Energy.

### Lancement local

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000.

### Déploiement Vercel

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-b44323b7
```

Après déploiement, vérifiez :

```bash
curl https://agentic-b44323b7.vercel.app
```
