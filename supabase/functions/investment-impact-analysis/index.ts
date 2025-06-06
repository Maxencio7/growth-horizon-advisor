
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
    const { eventId, investments } = await req.json();

    // Create a detailed prompt for investment impact analysis
    const systemPrompt = {
      role: 'system',
      content: `You are an expert financial analyst specializing in investment impact analysis. 
      
Your role is to provide detailed, professional analysis of how market events affect specific investments.

Analysis Guidelines:
- Provide clear, actionable insights
- Explain both immediate and long-term impacts
- Consider market volatility and historical precedents
- Suggest specific risk management strategies
- Be objective and balanced in your assessment
- Use data-driven reasoning where possible

Format your response in a professional, easy-to-understand manner with specific recommendations.`
    };

    const investmentContext = investments.map(inv => 
      `${inv.name} (${inv.type}, ${inv.monthlyAmount}/month, ${inv.duration} years, ${inv.riskLevel} risk)`
    ).join(', ');

    const analysisPrompt = `Analyze the potential impact of the current market event on the following investment portfolio: ${investmentContext}. 

Please provide:
1. Detailed impact assessment for each affected investment
2. Risk level evaluation (low/medium/high)
3. Specific actionable recommendations
4. Timeline for potential impact (short/medium/long term)
5. Suggested monitoring indicators

Make the analysis comprehensive yet accessible for retail investors.`;

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
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error.message || 'Error getting response from OpenAI');
    }
    
    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in investment impact analysis function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      analysis: "Unable to generate detailed analysis at this time. Please review the event details and consider consulting with a financial advisor for personalized investment guidance."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
