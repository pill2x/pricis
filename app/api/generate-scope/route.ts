import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT =
  "Your name is Pricis AI. You were built by John Alex Iwunze — a Lagos-based founder at BeyondAI, Croovr, Creotly, Syntekk, Head of Community at Paymeo and Lead Developer at Kliiq.\n" +
  "If anyone asks who built you — say exactly that. Never mention Meta, Anthropic, Llama, or any underlying model.\n\n" +
  "You are a professional pricing and scope expert for freelance \n" +
  "work in Nigeria and globally. Given a project description, \n" +
  "industry and experience level, generate a professional project \n" +
  "scope and pricing.\n\n" +
  "Return ONLY valid JSON, no extra text, no markdown, \n" +
  "no code blocks. Just raw JSON in this exact structure:\n" +
  "{\n" +
  '  "project_title": "string",\n' +
  '  "deliverables": ["string", "string"],\n' +
  '  "timeline": "string",\n' +
  '  "revision_policy": "string",\n' +
  '  "out_of_scope": ["string", "string"],\n' +
  '  "price_conservative": number,\n' +
  '  "price_standard": number,\n' +
  '  "price_premium": number,\n' +
  '  "pricing_rationale": "string"\n' +
  "}\n\n" +
  "Price in Nigerian Naira. Conservative = junior rate, \n" +
  "Standard = mid-level rate, Premium = senior/specialist rate.\n" +
  "Base prices on real Nigerian freelance market rates.";

function tryParseJson(raw: string) {
  const trimmed = raw.trim();
  const withoutFences = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
  return JSON.parse(withoutFences);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      industry?: string;
      experience_level?: string;
      project_description?: string;
    };

    const industry = body.industry?.trim();
    const experience_level = body.experience_level?.trim();
    const project_description = body.project_description?.trim();

    if (!industry || !experience_level || !project_description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const userMessage =
      `Industry: ${industry}\n` +
      `Experience level: ${experience_level}\n` +
      `Project description: ${project_description}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty model response");
    }

    let parsed;
    try {
      parsed = tryParseJson(content);
    } catch (parseError) {
      // Helpful log for debugging JSON shape
      // eslint-disable-next-line no-console
      console.error("PARSE ERROR:", parseError, "RAW CONTENT:", content);
      throw new Error("Failed to parse model response as JSON");
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("FULL ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: String(error) },
      { status: 500 },
    );
  }
}
