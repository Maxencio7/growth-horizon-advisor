
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, investments, messageHistory } = await req.json();

    // Prepare chat history for OpenAI
    const formattedHistory = messageHistory.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    // Create a detailed system prompt
    const systemPrompt = {
      role: 'system',
      content: `You are a friendly and helpful virtual assistant for Visionary Enterprises, a premium investment management firm. 
      
Your primary role is to provide immediate, accurate responses to customers' frequently asked questions.

Your knowledge base includes:
- Investment services offered by Visionary Enterprises
- Account types and features
- Fee structures and pricing
- Common investment terms and concepts
- Portfolio management strategies
- Basic financial planning guidelines

Communication style:
- Be warm, professional and approachable
- Use simple language, avoiding jargon unless necessary
- Keep responses concise yet informative (under 150 words when possible)
- Use emojis occasionally to appear friendly (1-2 per message maximum)
- Express empathy for customer concerns
- End responses with a follow-up question when appropriate

Important guidelines:
- If you don't know something specific, acknowledge this and offer to connect the user with a human representative
- Never make up information about specific investment returns or guarantees
- Maintain a helpful, positive tone throughout the conversation
- If users ask about their specific portfolio data, reference their investments if available
- Prioritize answering the most common customer questions efficiently`
    };

    // Format investment data for the model
    const portfolioContext = investments.length > 0 
      ? `The user has ${investments.length} investments in their portfolio: ${investments.map(inv => `${inv.name} (${inv.type}, ${inv.initialAmount})`).join(', ')}.` 
      : "The user hasn't added any investments to their portfolio yet.";

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          systemPrompt,
          { role: 'system', content: portfolioContext },
          ...formattedHistory,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error.message || 'Error getting response from OpenAI');
    }
    
    const generatedResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: generatedResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in AI advisor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: "I'm having trouble connecting right now. Can you try again in a moment?"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
