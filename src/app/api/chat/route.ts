import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const latestMessage = messages[messages.length - 1];
    const userQuery = latestMessage.content;

    // 1. Generate an embedding for the user's query using Gemini API REST call
    const embedRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${googleApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'models/gemini-embedding-2',
        content: { parts: [{ text: userQuery }] }
      })
    });
    
    const embedData = await embedRes.json();
    if (embedData.error) throw new Error(embedData.error.message);
    const embedding = embedData.embedding.values;

    // 2. Perform vector search in Supabase using the match function
    const { data: matchedContent, error } = await supabase
      .rpc('match_content_items', {
        query_embedding: embedding,
        match_threshold: 0.2,
        match_count: 5
      });

    if (error) {
      console.error("Vector search error:", error);
    }

    // 3. Format the retrieved context
    const contextString = matchedContent && matchedContent.length > 0
      ? matchedContent.map((c: any) => 
          `[Type: ${c.type}] Title: ${c.title}\nSummary: ${c.summary}\nContent: ${c.body || ''}\nLink: /${c.type === 'TRACK' ? 'tracks' : c.type === 'GUIDE' ? 'guides' : 'qa'}/${c.slug}\n`
        ).join("\n---\n")
      : "לא נמצא תוכן רלוונטי במאגר.";

    // 4. Create the System Prompt for Strict Source Mode
    const systemPrompt = `
You are the AI Guide for "מתחזקים" (Mitchazkim).
Your goal is to help a user who wants to get closer to Judaism/God by finding the *exact next step* for them.

CRITICAL RULES:
1. STRICT SOURCE MODE: You must ONLY base your advice, halacha, or Jewish perspective on the CONTEXT provided below. Do not hallucinate external Jewish teachings.
2. If the user's situation is completely unrelated to the CONTEXT, speak generally with empathy, but do not make up Jewish sources.
3. LANGUAGE: Always respond in warm, empathetic, clear, and modern Hebrew ( בגובה העיניים ).
4. STRUCTURE: You MUST respond in this exact structure using markdown:

### אני שומע אותך
[1-2 sentences of deep empathy validating their specific situation]

### משהו שיכול לעזור
[Summarize a specific piece of content from the CONTEXT that fits them. Mention the title.]
[Provide the exact link to the content from the CONTEXT, formatted like: [שם המדריך](/guides/guide-p01) ]

### הצעד שלך
[Give them ONE tiny, highly actionable, non-overwhelming step they can do today based on the context]

### רוצה לעבור מסלול?
[If a TRACK is present in the CONTEXT, recommend it and provide a link: [שם המסלול](/tracks/track-06)]
[If no TRACK is in the context, omit this section entirely]

---
RETRIEVED KNOWLEDGE BASE CONTEXT:
${contextString}
`;

    // 5. Generate the response stream using Gemini
    const result = await streamText({
      model: google('gemini-1.5-pro-latest'),
      system: systemPrompt,
      messages: messages,
    });

    return result.toTextStreamResponse();
    
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
