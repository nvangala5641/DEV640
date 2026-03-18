import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { AppNavigation } from "@/components/app-navigation";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PulseNet Internal Hub",
  description: "Team 2 startup internal social networking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <div className="min-h-screen pb-8">
          <header className="mx-auto max-w-7xl px-4 pt-8">
            <div className="card flex flex-wrap items-center justify-between gap-3 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  DEV 640 · Team 2
                </p>
                <Link href="/" className="font-display text-2xl font-semibold text-slate-900">
                  PulseNet Internal Hub
                </Link>
              </div>
              <p className="text-sm text-slate-600">
                Startup social network for internal communication
              </p>
            </div>
          </header>
          <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="card h-fit p-4 lg:sticky lg:top-6">
              <AppNavigation />
            </aside>
            <main className="card p-5 sm:p-7">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
