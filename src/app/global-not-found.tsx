import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 — ROLTEK",
  robots: { index: false },
};

/**
 * Served for URLs outside any locale. The language is unknown here,
 * so the page speaks both.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-dvh items-center bg-bg">
        <main className="container-site">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
          <h1 className="mt-6 text-headline font-semibold">This route doesn&apos;t exist.</h1>
          <p lang="es" className="mt-2 text-headline font-semibold text-muted">
            Esta ruta no existe.
          </p>
          <div className="mt-10 flex gap-3 font-mono text-sm">
            <Link href="/en" className="rounded-full border border-line-strong px-4 py-2 hover:border-white/25">
              Home
            </Link>
            <Link href="/es" lang="es" className="rounded-full border border-line-strong px-4 py-2 hover:border-white/25">
              Inicio
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
