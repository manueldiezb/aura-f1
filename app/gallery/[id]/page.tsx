import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PADDOCK_PHOTOS } from "@/lib/paddock-photos";
import { Badge } from "@/components/ui/badge";
import { OutfitAnalyzer } from "@/components/outfit-analysis";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const photo = PADDOCK_PHOTOS.find((p) => p.id === id);

  const title = photo?.person
    ? `${photo.person} — Paddock Style | Aura F1`
    : "Paddock Style | Aura F1";

  return {
    title,
    openGraph: {
      title,
      type: "website",
    },
  };
}

export default async function PhotoDetailPage({ params }: Props) {
  const { id } = await params;
  const photo = PADDOCK_PHOTOS.find((p) => p.id === id);

  if (!photo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Sticky back header */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/60 bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80">
        <div className="mx-auto max-w-lg px-4 py-3">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Volver
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg pb-16">
        {/* Photo */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={photo.photoUrl}
            alt={
              photo.person
                ? `${photo.person} en el ${photo.gp}`
                : `Paddock ${photo.gp}`
            }
            fill
            unoptimized
            className="object-cover rounded-b-2xl"
            sizes="(max-width: 1024px) 100vw, 512px"
            priority
          />
        </div>

        {/* Info */}
        <div className="px-4 mt-4 space-y-1">
          {photo.role && (
            <Badge variant="secondary" className="text-xs">
              {photo.role}
            </Badge>
          )}
          {photo.person && (
            <h2 className="text-xl font-bold text-white mt-2">{photo.person}</h2>
          )}
          <p className="text-sm text-zinc-400">
            {photo.gp}
            {photo.tags.length > 0 && (
              <>
                {" "}
                &middot;{" "}
                <span className="text-zinc-500">{photo.tags.join(", ")}</span>
              </>
            )}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-4 mt-5 mb-5 h-px bg-zinc-800" />

        {/* Outfit Analyzer — client component created by parallel agent */}
        <div className="px-4">
          <OutfitAnalyzer photoUrl={photo.photoUrl} photoId={photo.id} />
        </div>

        {/* Legal note */}
        <p className="mt-6 px-4 text-[11px] text-zinc-600 leading-relaxed">
          Las fotos son de uso ilustrativo. El análisis de IA puede no ser
          exacto.
        </p>
      </main>
    </div>
  );
}
