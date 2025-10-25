import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Green Energy",
    default: "Green Energy | Plateforme de simulations solaires",
  },
  description:
    "Plateforme tout-en-un pour dimensionner, simuler et présenter vos projets solaires On-grid, Off-grid et Pompage.",
  metadataBase: new URL("https://agentic-b44323b7.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
