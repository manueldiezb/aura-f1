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
          role: "user",
          content: [
            {
              type: "text",
              text: `Eres el mejor crítico de moda del paddock de Fórmula 1. Tienes conocimiento enciclopédico de marcas de lujo, streetwear, sastrería y tendencias actuales. Tu análisis es preciso, detallado y específico — nunca genérico.

Analiza exhaustivamente el outfit de la imagen y responde SOLO con JSON válido, sin markdown, sin texto extra:

{
  "person": "nombre completo si es una persona pública reconocible del mundo F1, moda o entretenimiento, si no: null",
  "personRole": "uno de: Piloto F1 / Team Principal / Celebrity / WAG / Influencer / Modelo / Directivo F1 / Desconocido",
  "overallRating": número del 1 al 10 (sé exigente: 10 solo para looks icónicos perfectos),
  "aesthetic": "nombre del estilo en 2-4 palabras, específico y creativo (ej: 'Paddock Royalty', 'Tech Luxe', 'Monaco Street', 'Pit Lane Chic', 'Dark Academia Racing', 'Quiet Luxury Sport'...)",
  "occasion": "contexto del look (ej: 'Paddock walk del Gran Premio', 'Gala de premios FIA', 'Vuelo privado', 'Hospitality VIP', 'Día casual fuera del circuito', 'Photocall de patrocinadores'...)",
  "colorPalette": ["color1", "color2", "color3"] (máximo 4 colores principales del look, en español),
  "styleVerdict": "frase crítica de 15-25 palabras que capture la esencia del look, con opinión experta y contexto F1 si aplica",
  "items": [
    {
      "type": "tipo de prenda en español (chaqueta, camiseta, pantalón, zapatillas, gafas de sol, reloj, bolso, cinturón, collar, anillo...)",
      "color": "color exacto y descriptivo (ej: 'negro azabache', 'blanco hueso', 'camel tostado', 'azul marino')",
      "brand": "marca si es claramente identificable por logo, silueta, detalles característicos o contexto — sé específico (ej: 'Nike Air Force 1', 'Loro Piana', 'Fear of God Essentials'); null si no hay certeza",
      "description": "descripción específica de 8-12 palabras que describa el modelo, corte y detalles visuales clave",
      "isLuxury": true si la prenda o marca supera ~€300,
      "material": "material/tejido probable (ej: 'lana merino', 'denim selvedge', 'cuero napa', 'algodón pima', 'nylon ripstop', 'cachemira', null si no es identificable)",
      "fit": "silueta del ajuste (ej: 'slim fit', 'oversized', 'tailored', 'relaxed', 'cropped', 'slim tapered', null si no aplica)",
      "priceRange": "rango de precio estimado en euros (ej: '€30-60', '€150-250', '€500-800', '€2.000+'); null si no es estimable",
      "styleNote": "observación de estilo de 10-15 palabras: qué funciona, qué hace especial esta pieza en el contexto del look"
    }
  ]
}

Reglas:
- Incluye TODAS las prendas y accesorios visibles (ropa, calzado, gafas, relojes, joyas, bolsos, gorras).
- Máximo 7 items. Prioriza los más visibles y relevantes.
- Sé específico: nada de "camiseta básica" — di "camiseta de cuello redondo oversized con dobladillo doblado".
- Si reconoces a la persona, adapta el análisis a su estilo habitual y rol en F1.
- El styleVerdict debe ser memorable, con voz propia, no una lista.
- Si no puedes analizar la imagen, devuelve items vacío y overallRating: 0.`,
            },
            {
              type: "image_url",
              image_url: { url: photoUrl, detail: "high" },
            },
          ],
        },
      ],
      max_tokens: 1500,
    });

    const rawContent = response.choices[0]?.message?.content ?? "";

    let result: AnalysisResult;
    try {
      result = JSON.parse(rawContent) as AnalysisResult;
    } catch {
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
