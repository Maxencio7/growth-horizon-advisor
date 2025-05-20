
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
      content: `You are a sophisticated AI investment advisor specializing in personalized financial guidance and AI integration strategies. 
      
Your capabilities:
- Analyze investment portfolios and provide tailored, actionable advice
- Recommend AI integrations that can enhance investment strategies
- Calculate potential returns for various investment scenarios
- Explain complex investment concepts in simple, engaging language

Guidelines:
- Be conversational and friendly, like ChatGPT, using casual language while maintaining expertise
- Keep responses concise but informative 
- Use emojis occasionally to add personality
- Avoid overly technical language unless specifically requested
- When discussing the user's investments, reference their actual portfolio data
- Personalize your responses based on the user's investment style and goals
- Provide specific, actionable advice rather than generic tips
- End your responses with engaging questions to keep the conversation flowing

If you don't know something specific about the user's situation, politely acknowledge the limitation and suggest what information would be helpful.`
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
