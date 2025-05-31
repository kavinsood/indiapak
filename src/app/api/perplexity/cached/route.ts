import { NextResponse } from 'next/server';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Cache duration: 3.5 days (half a week) in seconds
const CACHE_DURATION = 3.5 * 24 * 60 * 60;

// Generic sanitization function
function sanitizeText(text: string | null): string {
  if (!text) return '';
  return text
    .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold markdown (**text**)
    .replace(/\[\d+\]/g, '')          // Remove citations like [1], [2]
    .replace(/^\d+\.\s+/gm, '')         // Remove leading numbers like "1. ", "2. "
    .trim();
}

async function fetchFromPerplexity(type: 'reddit-sentiment' | 'news-links') {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!apiKey || apiKey === 'your_perplexity_api_key_here') {
    return null;
  }

  let payload;

  if (type === 'reddit-sentiment') {
    payload = {
      model: "sonar-pro",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Provide a concise summary of online discussions. Avoid using markdown like bolding or numbered lists. Do not include any citation markers like [1] or [2]."
        },
        {
          role: "user",
          content: "What's the latest this week on India and Pakistan online forums about the recent war? I'm a regular reader of both, checking every other day, and want a concise summary of current discussions. Include specific examples, e.g., 'One user said...'. Keep the response under 15 lines, focusing on this week. I want to understand the general sentiment, conflicting opinions, and common themes from communities in both India and Pakistan. Instead of mentioning specific forum names, refer to them generally (e.g., 'users in India', 'popular posts in Pakistan'). Conclude with a brief note on the perceived empathy gap and a tiny suggestion for improving relations between the people. Ensure the output is plain text without any markdown formatting (no bolding, no numbering, no citations like [1])."
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };
  } else {
    payload = {
      model: "sonar",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Provide the latest news about India and Pakistan in a structured format. For each news item, provide: 1) A clear title, 2) The source URL, 3) The date (in YYYY-MM-DD format), and 4) A brief description. Format each item clearly separated by newlines. Ensure the title and description are plain text without markdown like bolding or numbered lists."
        },
        {
          role: "user",
          content: "latest news this week on india pakistan war conflict. Provide 5-10 most important news items with their URLs, dates, and brief descriptions. Ensure titles and descriptions are plain text without markdown."
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      return_images: false
    };
  }

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', await response.text());
      return null;
    }

    const data = await response.json();
    // Apply initial sanitization here if needed, though prompt engineering is preferred
    return sanitizeText(data.choices?.[0]?.message?.content || null);
  } catch (error) {
    console.error('Error fetching from Perplexity:', error);
    return null;
  }
}

function parseNewsContent(content: string): Array<{
  title: string;
  url: string;
  date: string;
  description?: string;
}> {
  if (!content) return [];

  const newsItems: Array<{
    title: string;
    url: string;
    date: string;
    description?: string;
  }> = [];

  // Split content into sections
  const sections = content.split(/\n\n+|\n---\n/); // Split by double newlines or markdown horizontal rules
  
  for (const section of sections) {
    const lines = section.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) continue;

    let title = '';
    let url = '';
    let date = '';
    let descriptionLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // Remove potential date lines like "- **Date:** YYYY-MM-DD" or "Date: YYYY-MM-DD"
      if (line.match(/^(-\s*\*\*Date:\*\*|-\s*Date:|Date:)\s*\d{4}-\d{2}-\d{2}/i)) {
        continue; // Skip this line
      }
      
      // Sanitize line content
      line = sanitizeText(line);

      const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch && !url) {
        url = urlMatch[0].replace(/[,;.!?)]+$/, '');
        // If URL is on its own line, don't treat it as title/description
        if (line === url) continue;
      }

      const dateMatch = line.match(/\b(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.? \d{1,2},?(?:st|nd|rd|th)? \d{4})\b/i);
      if (dateMatch && !date) {
        const dateStr = dateMatch[0];
        try {
          const parsedDate = new Date(dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1')); // Handle ordinal suffixes
          if (!isNaN(parsedDate.getTime())) {
            date = parsedDate.toISOString().split('T')[0];
          }
        } catch {
          // Fallback if parsing fails
          date = new Date().toISOString().split('T')[0]; 
        }
         // If date is on its own line, or part of a line that's mostly date, skip for title/desc
        if (line.length < dateStr.length + 10) continue;
      }
      
      if (!title && !line.includes('http') && line.length > 10 && !dateMatch) {
        title = line;
      } else if (title && !line.includes('http') && !dateMatch) {
        descriptionLines.push(line);
      }
    }

    if (title && url) {
      if (!date) {
        // Try to extract date from URL if desperate, or default
        const urlDateMatch = url.match(/(\d{4})[\/-](\d{2})[\/-](\d{2})/);
        if (urlDateMatch) {
          date = `${urlDateMatch[1]}-${urlDateMatch[2]}-${urlDateMatch[3]}`;
        } else {
          date = new Date().toISOString().split('T')[0]; // Default to today if no date found
        }
      }
      
      newsItems.push({
        title: sanitizeText(title.substring(0, 200)),
        url: url,
        date: date,
        description: sanitizeText(descriptionLines.join(' ').substring(0, 300))
      });
    }
  }
  return newsItems.slice(0, 10);
}

export async function GET() {
  const [redditResponseContent, newsResponseContent] = await Promise.all([
    fetchFromPerplexity('reddit-sentiment'),
    fetchFromPerplexity('news-links')
  ]);

  // Sanitize reddit content after fetching (as a fallback to prompt engineering)
  const finalRedditContent = sanitizeText(redditResponseContent);
  const newsItems = newsResponseContent ? parseNewsContent(newsResponseContent) : [];

  const response = NextResponse.json({
    redditContent: finalRedditContent || '',
    newsItems: newsItems || [],
    cached: false,
    lastUpdated: new Date().toISOString()
  });

  response.headers.set('Cache-Control', `s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
  return response;
}

export async function POST() {
  const response = await GET();
  return NextResponse.json({ 
    message: 'Cache warmed successfully',
    timestamp: new Date().toISOString()
  });
} 