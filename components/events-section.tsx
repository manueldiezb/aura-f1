import { GP_EVENTS } from "@/lib/gp-events";
import type { EventCategory } from "@/lib/gp-events";

interface EventsSectionProps {
  city: string;
  countryName: string;
}

const CATEGORY_LABELS: Record<EventCategory, string> = {
  oficial: "Oficial",
  fan: "Fan Zone",
  fiesta: "Fiesta",
  cultura: "Cultura",
  deporte: "Deporte",
  gastronomia: "Gastronomía",
};

const CATEGORY_CLASSES: Record<EventCategory, string> = {
  oficial:
    "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  fan: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30",
  fiesta:
    "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30",
  cultura:
    "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
  deporte:
    "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30",
  gastronomia:
    "bg-pink-500/15 text-pink-400 ring-1 ring-pink-500/30",
};

function formatPrice(isFree: boolean, priceFrom?: number): string {
  if (isFree) return "Gratis";
  if (priceFrom !== undefined) return `Desde €${priceFrom}`;
  return "Ver precio";
}

export function EventsSection({ city, countryName }: EventsSectionProps) {
  const events = GP_EVENTS[city];

  if (!events || events.length === 0) {
    return (
      <div className="rounded-xl bg-zinc-900/60 p-5 ring-1 ring-zinc-700/40">
        <h3 className="mb-2 text-base font-semibold text-zinc-100">
          Eventos en {city} durante el GP
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-zinc-400">
          Los eventos del GP se anuncian semanas antes de la carrera. Consulta
          estas plataformas para tickets y actividades en {countryName}.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://www.eventbrite.com/d/${encodeURIComponent(city)}/formula-1/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-100 ring-1 ring-zinc-700/60 transition-colors hover:bg-zinc-700"
          >
            Buscar en Eventbrite
            <span aria-hidden="true" className="text-zinc-500">
              ↗
            </span>
          </a>
          <a
            href={`https://www.ticketmaster.com/search?q=formula+1+${encodeURIComponent(city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-100 ring-1 ring-zinc-700/60 transition-colors hover:bg-zinc-700"
          >
            Buscar en Ticketmaster
            <span aria-hidden="true" className="text-zinc-500">
              ↗
            </span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => {
        const priceLabel = formatPrice(event.isFree, event.priceFrom);

        return (
          <div
            key={event.name}
            className="rounded-xl bg-zinc-900/60 p-4 ring-1 ring-zinc-700/40"
          >
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-zinc-100 leading-snug">
                {event.name}
              </h3>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_CLASSES[event.category]}`}
              >
                {CATEGORY_LABELS[event.category]}
              </span>
            </div>

            <p className="mb-0.5 text-xs text-zinc-500">{event.venue}</p>
            <p className="mb-2 text-xs text-zinc-500">{event.dateDescription}</p>

            <p className="mb-3 text-xs leading-relaxed text-zinc-400">
              {event.description}
            </p>

            <div className="flex items-center justify-between gap-3">
              <span
                className={`text-xs font-medium ${
                  event.isFree ? "text-emerald-400" : "text-zinc-300"
                }`}
              >
                {priceLabel}
              </span>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-100 ring-1 ring-zinc-700/60 transition-colors hover:bg-zinc-700"
              >
                Ver evento
                <span aria-hidden="true" className="text-zinc-500">
                  ↗
                </span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
