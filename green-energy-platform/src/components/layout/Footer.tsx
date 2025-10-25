import Link from "next/link";
import { Facebook, Linkedin, Mail, Phone } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/30 bg-emerald-900 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-2xl">
              ⚡
            </span>
            Green Energy
          </div>
          <p className="mt-4 text-sm leading-6 text-emerald-100">
            Optimisez vos projets solaires grâce à une plateforme intuitive, des simulations précises et des
            rapports prêts à partager avec vos clients et partenaires.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-200">Navigation</h3>
          <ul className="mt-4 space-y-3 text-sm text-emerald-100">
            <li>
              <Link href="/" className="transition hover:text-white">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="transition hover:text-white">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/legal" className="transition hover:text-white">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-200">Contact</h3>
          <ul className="mt-4 space-y-4 text-sm text-emerald-100">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-yellow-300" />
              <span>support@greenenergy.app</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-yellow-300" />
              <span>+33 1 86 65 20 30</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-200">Suivez-nous</h3>
          <div className="mt-4 flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-700 bg-emerald-800 transition hover:-translate-y-1 hover:border-yellow-300 hover:text-yellow-300"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-emerald-700/70">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-emerald-200">
          © {new Date().getFullYear()} Green Energy. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
