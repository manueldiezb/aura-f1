import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura F1",
  description: "Tu compañero de viaje para los Grandes Premios de Fórmula 1",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aura F1",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Aura F1",
    description: "Tu compañero de viaje para los Grandes Premios de Fórmula 1",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e10600",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <main className="flex-1 pb-20">{children}</main>
        <Nav />
      </body>
    </html>
  );
}
