import OpenAI from "openai";
import { type NextRequest } from "next/server";

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

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function extractJson(raw: string): string {
  // Strip markdown code fences if present
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();
  // Strip any leading/trailing non-JSON characters
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1) return raw.slice(start, end + 1);
  return raw.trim();
}

const client = new OpenAI();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const photoUrl =
    body && typeof body === "object" && "photoUrl" in body
      ? (body as Record<string, unknown>).photoUrl
      : undefined;

  if (!photoUrl || typeof photoUrl !== "string" || photoUrl.trim() === "") {
    return Response.json(
      { error: "photoUrl is required and must be a non-empty string." },
      { status: 400 }
    );
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Eres un crítico de moda experto en el paddock de Fórmula 1. Respondes ÚNICAMENTE con JSON válido, sin markdown, sin bloques de código, sin texto adicional antes o después.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analiza exhaustivamente el outfit de la imagen. Identifica cada prenda y accesorio con el máximo nivel de detalle posible — incluyendo el modelo exacto cuando lo puedas determinar.

IMPORTANTE: Responde SOLO con el JSON siguiente, sin ningún texto extra, sin \`\`\`json, sin markdown:

{
  "person": "nombre completo si es una persona pública reconocible, si no: null",
  "personRole": "uno de: Piloto F1 / Team Principal / Celebrity / WAG / Influencer / Modelo / Directivo F1 / Desconocido",
  "overallRating": número entero del 1 al 10,
  "aesthetic": "nombre del estilo en 2-4 palabras (ej: 'Paddock Royalty', 'Tech Luxe', 'Monaco Street', 'Quiet Luxury Sport')",
  "occasion": "contexto del look (ej: 'Paddock walk del Gran Premio', 'Hospitality VIP', 'Vuelo privado')",
  "colorPalette": ["color1", "color2", "color3"],
  "styleVerdict": "frase crítica de 15-25 palabras sobre la esencia del look",
  "items": [
    {
      "type": "tipo de prenda en español (chaqueta, camiseta, pantalón, zapatillas, gafas de sol, reloj, bolso...)",
      "color": "color exacto y descriptivo con acabado si procede (ej: 'montura carey sobre dorado', 'negro azabache', 'blanco hueso')",
      "brand": "marca + modelo específico cuando sea identificable (ej: 'Ray-Ban Clubmaster Classic RB3016', 'Nike Air Force 1 Low', 'Rolex Daytona', 'Stone Island Shadow Project', 'Fear of God Essentials'); null si no hay certeza",
      "description": "descripción técnica de 10-15 palabras: modelo, forma, materiales, detalles distintivos y colorway exacto (ej: 'lentes G-15 verde degradado en montura browline carey sobre oro')",
      "isLuxury": true o false,
      "material": "material específico del fabricante si es identificable (ej: 'acetato italiano', 'lana merino 18 micras', 'cuero napa', 'denim selvedge japonés', 'Gore-Tex')",
      "fit": "silueta (ej: 'slim fit', 'oversized', 'tailored', 'relaxed', null si no aplica)",
      "priceRange": "precio aproximado en euros (ej: '€175-200', '€500-800', '€12.000+')",
      "styleNote": "observación experta de 10-15 palabras sobre qué hace especial esta pieza"
    }
  ]
}

Reglas estrictas:
- Para gafas: incluye forma de montura, tipo de lente, color exacto del cristal y del armazón.
- Para relojes: incluye referencia/modelo si es identificable, material de caja y correa.
- Para zapatillas: incluye modelo exacto, colorway y cualquier detalle de colaboración.
- Para ropa: incluye el corte, tejido y cualquier detalle constructivo visible (costuras, botones, solapa).
- Máximo 7 items. Si no puedes analizar la imagen devuelve items:[] y overallRating:0.`,
            },
            {
              type: "image_url",
              image_url: { url: photoUrl, detail: "high" },
            },
          ],
        },
      ],
      max_tokens: 1800,
    });

    const rawContent = response.choices[0]?.message?.content ?? "";
    const cleaned = extractJson(rawContent);

    let result: AnalysisResult;
    try {
      result = JSON.parse(cleaned) as AnalysisResult;
    } catch (parseError) {
      console.error("JSON parse error. Raw content:", rawContent, parseError);
      return Response.json(
        { error: "Failed to parse AI response." },
        { status: 500 }
      );
    }

    return Response.json({ ...result });
  } catch (error) {
    console.error("OpenAI error:", error);
    return Response.json(
      { error: "Failed to analyze image. Please try again." },
      { status: 500 }
    );
  }
}
