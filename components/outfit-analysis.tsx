"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getShoppingLinks } from "@/lib/shopping-links";
import {
  getRemainingAnalyses,
  consumeAnalysis,
  hasReachedLimit,
} from "@/lib/analysis-limit";

interface OutfitItem {
  type: string;
  color: string;
  brand: string | null;
  description: string;
  isLuxury: boolean;
  material: string | null;
  fit: string | null;
  priceRange: string | null;
  styleNote: string | null;
}

interface AnalysisResult {
  person: string | null;
  personRole: string;
  overallRating: number;
  aesthetic: string;
  occasion: string;
  colorPalette: string[];
  styleVerdict: string;
  items: OutfitItem[];
}

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: AnalysisResult }
  | { status: "error"; message: string }
  | { status: "limit-reached" };

interface OutfitAnalyzerProps {
  photoUrl: string;
  photoId: string;
}

function typeEmoji(type: string): string {
  const lower = type.toLowerCase();
  if (lower.includes("chaqueta") || lower.includes("abrigo") || lower.includes("blazer") || lower.includes("bomber"))
    return "🧥";
  if (lower.includes("camiseta") || lower.includes("camisa") || lower.includes("polo") || lower.includes("sudadera"))
    return "👕";
  if (lower.includes("pantalón") || lower.includes("pantalon") || lower.includes("vaqueros") || lower.includes("shorts"))
    return "👖";
  if (lower.includes("zapatillas") || lower.includes("zapatos") || lower.includes("botas") || lower.includes("sneakers"))
    return "👟";
  if (lower.includes("gafas")) return "🕶️";
  if (lower.includes("reloj")) return "⌚";
  if (lower.includes("bolso") || lower.includes("mochila") || lower.includes("clutch"))
    return "👜";
  if (lower.includes("sombrero") || lower.includes("gorra") || lower.includes("cap"))
    return "🧢";
  if (lower.includes("vestido") || lower.includes("falda")) return "👗";
  if (lower.includes("cinturón")) return "🪡";
  if (lower.includes("collar") || lower.includes("cadena") || lower.includes("anillo") || lower.includes("pulsera"))
    return "💍";
  return "👔";
}

function RatingDisplay({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i < filled ? "bg-[#e10600]" : "bg-white/15"
          }`}
          style={{ width: i < filled ? "12px" : "8px" }}
        />
      ))}
      <span className="ml-1.5 text-sm font-bold text-white">{rating}/10</span>
    </div>
  );
}

function ColorDot({ color }: { color: string }) {
  const colorMap: Record<string, string> = {
    negro: "#0a0a0a",
    "negro azabache": "#0a0a0a",
    blanco: "#f5f5f5",
    "blanco hueso": "#f0ede8",
    rojo: "#cc0000",
    azul: "#1a4fad",
    "azul marino": "#0d1b3e",
    "azul cielo": "#87ceeb",
    verde: "#2d7a2d",
    "verde militar": "#4a5240",
    gris: "#666666",
    "gris antracita": "#383838",
    beige: "#c9b99a",
    camel: "#c19a6b",
    "camel tostado": "#b8864e",
    marrón: "#7b4a2d",
    dorado: "#c9a84c",
    plateado: "#aaaaaa",
    naranja: "#e07020",
    rosa: "#e890a0",
    morado: "#6a3d9a",
    crema: "#f5f0e8",
    burdeos: "#800020",
    caqui: "#8b7355",
    lavanda: "#b39ddb",
    amarillo: "#e8c040",
  };

  const hex = colorMap[color.toLowerCase()] ?? "#888888";

  return (
    <div
      title={color}
      className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
      style={{ backgroundColor: hex }}
    />
  );
}

export function OutfitAnalyzer({ photoUrl }: OutfitAnalyzerProps) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [remaining, setRemaining] = useState<number>(3);

  useEffect(() => {
    if (hasReachedLimit()) {
      setState({ status: "limit-reached" });
    } else {
      setRemaining(getRemainingAnalyses());
    }
  }, []);

  async function analyze() {
    if (hasReachedLimit()) {
      setState({ status: "limit-reached" });
      return;
    }

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/analyze-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setState({
          status: "error",
          message:
            (errorData as { error?: string }).error ?? "Error desconocido",
        });
        return;
      }

      const data = (await res.json()) as AnalysisResult;
      consumeAnalysis();
      setRemaining(getRemainingAnalyses());
      setState({ status: "success", data });
    } catch {
      setState({ status: "error", message: "Error de conexión" });
    }
  }

  if (state.status === "limit-reached") {
    return (
      <div className="mt-6 px-4">
        <div className="rounded-2xl border border-[#e10600]/30 bg-[#1a0000]/60 p-5 text-center space-y-3">
          <p className="text-2xl">✨</p>
          <p className="font-bold text-white text-base">
            Has usado tus 3 análisis gratuitos de hoy
          </p>
          <p className="text-sm text-white/50">
            Los análisis se recargan cada día a medianoche
          </p>
          <div className="pt-1">
            <p className="text-xs text-white/30">
              Próximamente: suscripción Premium con análisis ilimitados
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="mt-6 px-4 space-y-3">
        <div className="animate-pulse space-y-3">
          <div className="h-16 rounded-xl bg-white/5" />
          <div className="h-10 rounded-xl bg-white/5" />
          <div className="h-28 rounded-xl bg-white/5" />
          <div className="h-28 rounded-xl bg-white/5" />
          <div className="h-28 rounded-xl bg-white/5" />
        </div>
        <p className="text-center text-xs text-white/30 pt-1">
          Analizando outfit en detalle con IA...
        </p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="mt-6 px-4">
        <div className="rounded-xl bg-white/5 p-4 text-center space-y-2">
          <p className="text-white/60 text-sm">No se pudo analizar la imagen</p>
          <button
            onClick={() => setState({ status: "idle" })}
            className="text-xs text-[#e10600]"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (state.status === "success") {
    const { data } = state;
    return (
      <div className="mt-6 px-4 space-y-4">
        {/* Header: persona + rating */}
        <div className="rounded-2xl bg-[#141414] border border-white/8 p-4 space-y-3">
          {data.person && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e10600]/20 flex items-center justify-center text-sm">
                👤
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">{data.person}</p>
                <p className="text-[11px] text-white/40">{data.personRole}</p>
              </div>
            </div>
          )}

          {!data.person && (
            <p className="text-xs text-white/40 font-medium uppercase tracking-wider">{data.personRole}</p>
          )}

          <div className="space-y-1.5">
            <RatingDisplay rating={data.overallRating} />
            <p className="text-xs text-white/40">Puntuación del look</p>
          </div>
        </div>

        {/* Estética + Ocasión */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-[#141414] border border-white/8 p-3 space-y-1">
            <p className="text-[10px] text-white/35 uppercase tracking-wider font-medium">Estética</p>
            <p className="text-sm font-semibold text-white leading-tight">{data.aesthetic}</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-white/8 p-3 space-y-1">
            <p className="text-[10px] text-white/35 uppercase tracking-wider font-medium">Ocasión</p>
            <p className="text-sm font-semibold text-white leading-tight">{data.occasion}</p>
          </div>
        </div>

        {/* Paleta de colores */}
        {data.colorPalette?.length > 0 && (
          <div className="rounded-xl bg-[#141414] border border-white/8 p-3">
            <p className="text-[10px] text-white/35 uppercase tracking-wider font-medium mb-2">Paleta</p>
            <div className="flex items-center gap-2 flex-wrap">
              {data.colorPalette.map((color, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <ColorDot color={color} />
                  <span className="text-xs text-white/60 capitalize">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Veredicto de estilo */}
        {data.styleVerdict && (
          <div className="rounded-xl border border-[#e10600]/25 bg-[#e10600]/5 px-4 py-3">
            <p className="text-[10px] text-[#e10600]/70 uppercase tracking-wider font-medium mb-1">
              Veredicto
            </p>
            <p className="text-sm text-white/90 leading-snug italic">
              &ldquo;{data.styleVerdict}&rdquo;
            </p>
          </div>
        )}

        {/* Prendas */}
        <div className="space-y-3">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#141414] border border-white/8 p-4 space-y-3"
            >
              {/* Fila superior: emoji + tipo + badges */}
              <div className="flex items-start gap-2.5">
                <span className="text-xl leading-none mt-0.5">{typeEmoji(item.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-sm text-white capitalize">
                      {item.type}
                    </span>
                    {item.brand && (
                      <Badge className="text-[10px] bg-[#e10600]/20 text-[#e10600] border-[#e10600]/30 px-1.5">
                        {item.brand}
                      </Badge>
                    )}
                    {item.isLuxury && (
                      <Badge className="text-[10px] px-1.5">✨ Lujo</Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/55 mt-0.5 leading-snug">
                    {item.color} · {item.description}
                  </p>
                </div>
              </div>

              {/* Detalles: material, fit, precio */}
              {(item.material || item.fit || item.priceRange) && (
                <div className="flex flex-wrap gap-1.5">
                  {item.material && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/45 bg-white/5 rounded-md px-2 py-1">
                      🧵 {item.material}
                    </span>
                  )}
                  {item.fit && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/45 bg-white/5 rounded-md px-2 py-1">
                      📐 {item.fit}
                    </span>
                  )}
                  {item.priceRange && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-white/45 bg-white/5 rounded-md px-2 py-1">
                      💰 {item.priceRange}
                    </span>
                  )}
                </div>
              )}

              {/* Nota de estilo */}
              {item.styleNote && (
                <p className="text-[11px] text-white/40 leading-snug border-t border-white/6 pt-2.5">
                  {item.styleNote}
                </p>
              )}

              {/* Links de compra */}
              <div className="flex flex-wrap gap-1.5">
                {getShoppingLinks(item.type, item.brand).map((link) => (
                  <a
                    key={link.store}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/60 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {link.emoji} {link.store}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-white/20 text-center px-4 pb-2">
          Análisis generado por IA · Puede contener imprecisiones
        </p>
      </div>
    );
  }

  // idle
  return (
    <div className="mt-6 px-4">
      <button
        onClick={analyze}
        className="w-full py-4 rounded-2xl bg-[#e10600] text-white font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        ✨ Analizar outfit con IA
      </button>
      <p className="text-center text-xs text-white/30 mt-2">
        {remaining} análisis gratuitos restantes hoy
      </p>
    </div>
  );
}
