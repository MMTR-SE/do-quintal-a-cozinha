/**
 * Transcribes audio to text using Groq Whisper (whisper-large-v3-turbo).
 * Supports literacy-inclusive product creation for rural producers.
 */

import { Groq } from "groq-sdk";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.url) {
    return new Response(JSON.stringify({ error: "Audio URL is required" }), {
      status: 400,
    });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Audio transcription is not configured" }),
        { status: 503 }
      );
    }

    const groq = new Groq({ apiKey });
    const completion = await groq.audio.transcriptions.create({
      model: "whisper-large-v3-turbo",
      url: body.url,
      language: body.language || "pt",
    });

    return new Response(
      JSON.stringify({
        message: "Audio transcribed successfully",
        data: completion,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Groq transcription error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to transcribe audio", details: error }),
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed. Use POST instead." }),
    { status: 405 }
  );
}
