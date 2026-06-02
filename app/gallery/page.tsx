import type { Metadata } from "next";
import { PADDOCK_PHOTOS } from "@/lib/paddock-photos";
import { PhotoCard } from "@/components/photo-card";

export const metadata: Metadata = {
  title: "Paddock Style | Aura F1",
  description:
    "Galería de moda en el paddock de Fórmula 1. Analiza los outfits de pilotos y celebrities con IA.",
  openGraph: {
    title: "Paddock Style | Aura F1",
    description:
      "Galería de moda en el paddock de Fórmula 1. Analiza los outfits de pilotos y celebrities con IA.",
    type: "website",
  },
};

export default async function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="pt-12 px-4 pb-6">
        <h1 className="text-3xl font-black tracking-tight leading-none">
          <span className="text-red-600">PADDOCK</span>{" "}
          <span className="text-white">STYLE</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Moda en el paddock &middot; Analiza outfits con IA
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          ✨ 3 análisis gratuitos al día
        </p>
      </header>

      <section className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {PADDOCK_PHOTOS.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      </section>
    </div>
  );
}
