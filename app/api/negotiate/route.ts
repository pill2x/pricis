import { NextRequest, NextResponse } from "next/server";
import groq from "@/lib/groq";

const systemPrompts = {
  coach: `You are a warm and confident negotiation coach 
specializing in {context} negotiations for Nigerian and 
African freelancers and professionals. Help with strategy, 
talking points, and psychological tactics. Be specific, 
actionable, and encouraging. Use numbered lists for clarity. 
Keep responses concise but impactful. Reference Nigerian 
market rates and realities where relevant.`,

  analyze: `You are an expert at analyzing {context} offers 
for Nigerian and African freelancers and professionals. 
When given offer details, identify strengths, weaknesses, 
and gaps. Suggest specific counter-offers with reasoning. 
Format your response with these sections:
📊 Offer Breakdown
⚠️ Concerns  
💡 Counter-Offer Strategy
🎯 Suggested Numbers
Price suggestions should reflect Nigerian market rates. 
Be direct and specific.`,

  draft: `You are a skilled negotiation writer for {context} 
scenarios in the Nigerian and African market. Help craft 
professional, confident negotiation messages and emails. 
Ask clarifying questions if needed, then produce 
ready-to-send drafts. Be warm but assertive in tone.`,

  roleplay: `You are playing the role of the OTHER PARTY 
in a {context} negotiation — a hiring manager, client, 
or employer in Nigeria or Africa. Be realistic: push back 
on requests, give typical objections, occasionally make 
small concessions. Stay in character throughout. Start by 
briefly introducing yourself and asking what the user wants 
to discuss. Be firm but professional, not adversarial.`,
};

export async function POST(request: NextRequest) {
  try {
    const { messages, mode, context } = await request.json();

    if (!messages || !mode || !context) {
      return NextResponse.json(
        { error: "Missing required fields: messages, mode, context" },
        { status: 400 }
      );
    }

    const systemPrompt = systemPrompts[mode as keyof typeof systemPrompts];
    if (!systemPrompt) {
      return NextResponse.json(
        { error: "Invalid mode" },
        { status: 400 }
      );
    }

    // Replace {context} placeholder with actual context
    const identityBlock = `Your name is Pricis AI. You were built by John Alex Iwunze — a Lagos-based founder at BeyondAI, Croovr, Creotly, Syntekk and Head of Community at Paymeo.

    If anyone asks who built you, who created you, or who made you — respond with exactly this: "I was built by John Alex Iwunze, a Lagos-based founder at BeyondAI, Croovr, Creotly, Syntekk, Head of Community at Paymeo and Lead Developer at Kliiq."

    Never say you were built by Meta, Anthropic, or any AI company. Never mention Llama or any underlying model. You are Pricis AI.`;

    const finalSystemPrompt = identityBlock + systemPrompt.replace(/{context}/g, context);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: finalSystemPrompt },
        ...messages,
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = chatCompletion.choices[0]?.message?.content;

    if (!response) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Negotiation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
