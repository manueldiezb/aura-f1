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
}

interface AnalysisResult {
  person: string | null;
  personRole: string;
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
  if (lower.includes("chaqueta") || lower.includes("abrigo") || lower.includes("blazer"))
    return "🧥";
  if (
    lower.includes("camiseta") ||
    lower.includes("camisa") ||
    lower.includes("polo")
  )
    return "👕";
  if (lower.includes("pantalón") || lower.includes("pantalon") || lower.includes("vaqueros"))
    return "👖";
  if (
    lower.includes("zapatillas") ||
    lower.includes("zapatos") ||
    lower.includes("botas")
  )
    return "👟";
  if (lower.includes("gafas")) return "👓";
  if (lower.includes("reloj")) return "⌚";
  if (lower.includes("bolso") || lower.includes("mochila")) return "👜";
  if (lower.includes("sombrero") || lower.includes("gorra")) return "🧢";
  if (lower.includes("vestido")) return "👗";
  return "👔";
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
      <div className="mt-6 px-4 space-y-3 animate-pulse">
        <div className="h-12 rounded-xl bg-white/5" />
        <div className="h-24 rounded-xl bg-white/5" />
        <div className="h-24 rounded-xl bg-white/5" />
        <p className="text-center text-xs text-white/30">
          Analizando outfit con IA...
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
        {data.person && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5">
            <span>👤</span>
            <div>
              <p className="font-semibold text-white text-sm">{data.person}</p>
              <p className="text-xs text-white/50">{data.personRole}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#141414] border border-white/8 p-4 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{typeEmoji(item.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-sm text-white capitalize">
                      {item.type}
                    </span>
                    {item.brand && (
                      <Badge className="text-[10px] bg-[#e10600]/20 text-[#e10600] border-[#e10600]/30">
                        {item.brand}
                      </Badge>
                    )}
                    {item.isLuxury && (
                      <Badge className="text-[10px]">✨ Lujo</Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">
                    {item.color} · {item.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {getShoppingLinks(item.type, item.brand).map((link) => (
                  <a
                    key={link.store}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {link.emoji} {link.store}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-white/25 text-center px-4">
          Sugerencias generadas por IA · Pueden no ser exactas
        </p>
      </div>
    );
  }

  // idle
  return (
    <div className="mt-6 px-4">
      <button
        onClick={analyze}
        className="w-full py-4 rounded-2xl bg-[#e10600] text-white font-bold text-base flex items-center justify-center gap-2"
      >
        ✨ Analizar outfit con IA
      </button>
      <p className="text-center text-xs text-white/30 mt-2">
        {remaining} análisis gratuitos restantes hoy
      </p>
    </div>
  );
}
