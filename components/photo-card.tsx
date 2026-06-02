import Image from "next/image";
import Link from "next/link";
import type { PaddockPhoto } from "@/lib/paddock-photos";

interface PhotoCardProps {
  photo: PaddockPhoto;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  const visibleTags = photo.tags.slice(0, 2);

  return (
    <Link href={`/gallery/${photo.id}`} className="block">
      <div className="aspect-square relative overflow-hidden rounded-2xl">
        <Image
          src={photo.photoUrl}
          alt={photo.person ? `${photo.person} en el ${photo.gp}` : `Paddock ${photo.gp}`}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60%]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          }}
        />

        {/* Analyze badge — top right */}
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3 text-white"
            aria-hidden="true"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span className="text-[10px] font-semibold text-white leading-none">
            Analizar
          </span>
        </div>

        {/* Info overlay — bottom */}
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
          {photo.person && (
            <p className="text-sm font-bold text-white leading-tight truncate">
              {photo.person}
            </p>
          )}
          <p className="text-xs text-white/60 truncate mt-0.5">{photo.gp}</p>
          {visibleTags.length > 0 && (
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
