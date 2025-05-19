
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

    // System prompt that defines the advisor's capabilities
    const systemPrompt = {
      role: 'system',
      content: `You are an AI investment advisor specializing in personalized investment advice and AI integration recommendations.
      
Your capabilities:
- Analyze investment portfolios and provide tailored advice
- Recommend AI integrations for investment strategies
- Calculate potential returns for various investment scenarios
- Explain investment concepts in an easy-to-understand way

Always be respectful of the user's investment choices. Never suggest changing their established goals, only provide information to help them understand their investments better.

When calculating investment returns, show your work clearly with formatting to make the numbers easy to read.
When asked about AI integrations, provide specific product recommendations with brief explanations of their benefits.`
    };

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
          ...formattedHistory,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
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
      fallback: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
