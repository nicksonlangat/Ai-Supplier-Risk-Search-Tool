import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { tools } from '../../lib/tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Log the incoming request to help with debugging
    console.log('Received chat request:', {
        messageCount: messages.length,
        lastMessage: messages.length > 0 ? messages[messages.length - 1].content : null
    });

    const result = streamText({
        model: openai('gpt-4o'),
        messages,
        tools,
        system: `You are a supplier risk management assistant that helps users find information about suppliers.

IMPORTANT: For ANY question about suppliers, ALWAYS use the searchSuppliers tool immediately, even on the first interaction.

When a user asks about:
- Suppliers with high/low risk scores: Use action="byRiskScore" with appropriate count and order
- Suppliers in a specific industry: Use action="byIndustry" with the industry name as query
- Suppliers with specific risk categories: Use action="byRiskCategory" with the category as query
- Suppliers in a location: Use action="byLocation" with the location as query
- General supplier search: Use action="search" with the search term as query

After getting results, summarize key insights about the suppliers found.`,
        temperature: 0.2, // Lower temperature for more deterministic behavior
        maxSteps: 10, // Ensure enough steps for tool usage
    });

    return result.toDataStreamResponse();
}