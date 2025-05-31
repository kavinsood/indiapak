import { NextRequest, NextResponse } from 'next/server';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    // Get API key from environment variable
    const apiKey = process.env.PERPLEXITY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    let payload;

    if (type === 'reddit-sentiment') {
      // Left widget - Reddit sentiment analysis
      payload = {
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant"
          },
          {
            role: "user",
            content: "What's the latest this week on India and Pakistan subreddits about the recent war? I'm a regular reader of both, checking every other day, and want a concise summary of current discussions. Include specific examples, e.g., One user said...'. Keep the response under 15 lines , this week , i want you to replace the scrolling that i would do extensively on subreddits like r/pakistan , r/jammu , r/karachi , r/islamabad , r/india , r/india social etc , tell me what has been happening , if people are having conflicting opinions let me know , dont shy away from letting me know that they are making fun of each other ,what most posts are really about , and in the end point out the distance and lack of empathy and add a extremely small note about a solution to this (india and pakistan relations between people), and ps -instead of saying subreddits or reddits or mentioning reddit , since this report is for everyday people of india who dont know what reddit is , also include top most posts this week and say users in india have said x and popular posts being about x , and similarly with pakistan"
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      };
    } else if (type === 'news-links') {
      // Right widget - Latest news links
      payload = {
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant"
          },
          {
            role: "user",
            content: "latest news this week on india pakistan"
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        return_images: false
      };
    } else {
      return NextResponse.json(
        { error: 'Invalid request type' },
        { status: 400 }
      );
    }

    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', errorText);
      return NextResponse.json(
        { error: 'API request failed', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the content from the response
    const content = data.choices?.[0]?.message?.content || '';
    
    // Parse news links if it's a news request
    if (type === 'news-links') {
      // Extract news items from the content
      const newsItems = parseNewsContent(content);
      return NextResponse.json({ newsItems });
    }
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error in Perplexity API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function parseNewsContent(content: string): Array<{
  title: string;
  url: string;
  date: string;
  description?: string;
}> {
  // This is a simple parser - you might need to adjust based on actual response format
  const newsItems: Array<{
    title: string;
    url: string;
    date: string;
    description?: string;
  }> = [];

  // Example parsing logic - adjust based on actual response format
  const lines = content.split('\n');
  let currentItem: any = {};
  
  for (const line of lines) {
    if (line.includes('http')) {
      // Extract URL
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        currentItem.url = urlMatch[0];
      }
    }
    // Add more parsing logic as needed
  }

  // For now, return sample data - replace with actual parsing
  return [
    {
      title: "Chinese Military Evades Questions On Performance Of Weapons Used By Pak",
      url: "https://www.ndtv.com/world-news/operation-sindoor-india-pakistan-chinese-military-evades-questions-on-performance-of-weapons-used-by-pak-8541197",
      date: "2025-05-29"
    },
    {
      title: "'Talks suspended till ... ': India rejects Pakistan PM Shehbaz Sharif's call for dialogue on Indus Waters",
      url: "https://timesofindia.indiatimes.com/india/talks-suspended-till-india-rejects-pakistan-pm-shehbaz-sharifs-call-for-dialogue-on-indus-waters-treaty-terror-kashmir/articleshow/121489929.cms",
      date: "2025-05-29"
    },
    {
      title: "What Happens if INDIA ATTACKS Pakistan Again: Defence Update",
      url: "https://www.youtube.com/watch?v=Oa5OF-GgLKE",
      date: "2025-05-30"
    },
    {
      title: "Four Days in May: The India-Pakistan Crisis of 2025 - Stimson Center",
      url: "https://www.stimson.org/2025/four-days-in-may-the-india-pakistan-crisis-of-2025/",
      date: "2025-05-28"
    },
    {
      title: "Top Pakistan army official raises spectre of nuclear war with India",
      url: "https://www.moneycontrol.com/news/india/top-pakistan-army-official-raises-spectre-of-nuclear-war-with-india-strategic-miscalculation-13072675.html",
      date: "2025-05-30"
    }
  ];
} 