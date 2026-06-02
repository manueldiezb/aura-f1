"use client";

import { buildBookingUrl, gpWeekDates } from "@/lib/booking";
import { GP_HOTELS, type Hotel } from "@/lib/hotels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface HotelSectionProps {
  city: string;
  dateStart: string;
  countryCode?: string;
}

function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(date);
}

function HotelCard({ hotel, city, checkIn, checkOut }: { hotel: Hotel; city: string; checkIn: string; checkOut: string }) {
  const reservaUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name + " " + city)}&checkin=${checkIn}&checkout=${checkOut}&aid=304142`;
  return (
    <Card className="border-0 bg-zinc-900/80 ring-1 ring-yellow-500/20 transition-all hover:ring-yellow-500/40">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-bold leading-tight text-zinc-100">
            {hotel.name}
          </CardTitle>
          <Badge
            variant="outline"
            className="shrink-0 border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-xs"
          >
            ⭐⭐⭐⭐⭐
          </Badge>
        </div>

        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
          <span>📍 {hotel.distanceKm === 0 ? "En el circuito" : `${hotel.distanceKm} km del circuito`}</span>
          <span>🚗 {hotel.transport}</span>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">{hotel.neighborhood}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <ul className="space-y-1">
          {hotel.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-1.5 text-xs text-zinc-400">
              <span className="mt-0.5 shrink-0 text-yellow-500/70">✦</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-lg bg-zinc-800/60 px-3 py-2 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-zinc-500">Precio semana GP</p>
            <p className="text-sm font-semibold text-yellow-400">Ver disponibilidad →</p>
          </div>
          <span className="text-xs text-zinc-600 text-right">La disponibilidad<br/>se verifica en<br/>Booking.com</span>
        </div>

        <div className="flex gap-2">
          <a
            href={hotel.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 text-xs"
            >
              Ver hotel
            </Button>
          </a>
          <a
            href={reservaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="sm"
              className="w-full bg-red-600 text-white hover:bg-red-500 active:bg-red-700 text-xs font-semibold"
            >
              Reservar
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export function HotelSection({ city, dateStart, countryCode: _countryCode }: HotelSectionProps) {
  const { checkIn, checkOut } = gpWeekDates(dateStart);
  const bookingUrl = buildBookingUrl(city, checkIn, checkOut);
  const hotels = GP_HOTELS[city] ?? null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-zinc-100">
          🏨 Alojamiento recomendado
        </h3>
        <p className="mt-0.5 text-sm text-zinc-400">
          Selección de hoteles 5⭐ para la semana del GP
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          💡 La disponibilidad y el precio final se muestran al hacer clic en Reservar
        </p>
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-zinc-900/60 p-3 ring-1 ring-zinc-700/40">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Check-in
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-100">
            {formatDisplayDate(checkIn)}
          </p>
          <p className="text-xs text-zinc-500">{checkIn}</p>
        </div>
        <div className="rounded-lg bg-zinc-900/60 p-3 ring-1 ring-zinc-700/40">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Check-out
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-100">
            {formatDisplayDate(checkOut)}
          </p>
          <p className="text-xs text-zinc-500">{checkOut}</p>
        </div>
      </div>

      {/* Hotel cards o fallback */}
      {hotels ? (
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.name} hotel={hotel} city={city} checkIn={checkIn} checkOut={checkOut} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-zinc-900/60 p-5 ring-1 ring-zinc-700/40 text-center space-y-3">
          <p className="text-sm text-zinc-400">
            No tenemos hoteles curados para <span className="text-zinc-200 font-medium">{city}</span> aún.
          </p>
          <p className="text-xs text-zinc-500">
            Busca directamente en Booking.com con las fechas del GP precargadas.
          </p>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            <Button className="mt-1 w-full bg-red-600 text-white hover:bg-red-500 active:bg-red-700 font-bold">
              Buscar hoteles en Booking.com
            </Button>
          </a>
        </div>
      )}

      {/* Separador y CTA genérico */}
      <Separator className="bg-zinc-800" />

      <div className="space-y-2 text-center">
        <p className="text-xs text-zinc-500">
          ¿No encuentras lo que buscas?
        </p>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 text-xs"
          >
            Ver todos los hoteles en Booking.com →
          </Button>
        </a>
        <p className="text-xs text-zinc-600">
          Al reservar a través de Aura F1 apoyáis el proyecto
        </p>
      </div>
    </div>
  );
}
