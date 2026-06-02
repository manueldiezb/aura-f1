import OpenAI from "openai";
import { type NextRequest } from "next/server";

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
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Eres un experto en moda y estilismo del paddock de Fórmula 1.
Analiza la imagen y responde SOLO con JSON válido, sin markdown, sin texto extra:
{
  "person": "nombre completo si es una persona pública reconocible, si no: null",
  "personRole": "Piloto F1 / Team Principal / Celebrity / Modelo / Desconocido",
  "items": [
    {
      "type": "tipo de prenda en español (chaqueta, camiseta, pantalón, zapatillas, gafas, reloj, bolso...)",
      "color": "color principal",
      "brand": "marca si es claramente visible en la imagen o identificable con certeza, si no: null",
      "description": "descripción breve de máximo 8 palabras",
      "isLuxury": true o false
    }
  ]
}
Incluye solo prendas claramente visibles. Máximo 6 items. Si no puedes analizar la imagen, devuelve items vacío.`,
            },
            {
              type: "image_url",
              image_url: { url: photoUrl, detail: "low" },
            },
          ],
        },
      ],
      max_tokens: 800,
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
