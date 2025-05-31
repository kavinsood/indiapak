"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Globe, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import BlurFade from '@/components/magicui/blur-fade';

interface NewsItem {
  title: string;
  url: string;
  date: string;
  description?: string;
}

// Helper function to get domain from URL
function getDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return '';
  }
}

// Helper function to get logo URL for a domain
function getLogoUrl(domain: string): string {
  // Using Google's favicon service as a fallback
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

const BLUR_FADE_DELAY = 0.04;

export function NewsDashboard() {
  const [redditContent, setRedditContent] = useState<string>('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/perplexity/cached');
        const data = await response.json();
        
        if (data.redditContent) {
          setRedditContent(data.redditContent);
        }
        
        if (data.newsItems) {
          setNewsItems(data.newsItems);
        }
        
        if (data.lastUpdated) {
          setLastUpdated(new Date(data.lastUpdated));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Live News</h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Last updated: {format(lastUpdated, 'PP')}
              </span>
            )}
          </div>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Widget - People & Discussions */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <Card className="overflow-hidden h-full">
            <div className="p-6 pb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                People & Discussions
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                What both sides are saying about the war
              </p>
            </div>
            <div className="px-6 pb-6">
              <ScrollArea className="h-[600px] rounded-md border bg-muted/20 p-4">
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - Math.random() * 20}%` }} />
                    ))}
                  </div>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {redditContent.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="mb-4 text-sm leading-relaxed text-foreground/80">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </Card>
        </BlurFade>

        {/* Right Widget - News Links */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Card className="overflow-hidden h-full">
            <div className="p-6 pb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Latest News
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time news updates from verified sources
              </p>
            </div>
            <div className="px-6 pb-6">
              <ScrollArea className="h-[600px] rounded-md border bg-muted/20">
                {loading ? (
                  <div className="space-y-4 p-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <Skeleton className="h-8 w-8 rounded flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {newsItems.map((item, index) => {
                      const domain = getDomainFromUrl(item.url);
                      const logoUrl = getLogoUrl(domain);
                      
                      return (
                        <a
                          key={index}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 hover:bg-accent/50 transition-all duration-200 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={logoUrl}
                                alt={domain}
                                className="w-8 h-8 rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ccircle cx="12" cy="12" r="10"%3E%3C/circle%3E%3Cpath d="M2 12h20"%3E%3C/path%3E%3Cpath d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"%3E%3C/path%3E%3C/svg%3E';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                  {item.title}
                                </h4>
                                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                              </div>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs text-muted-foreground font-medium">
                                  {domain}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          </Card>
        </BlurFade>
      </div>
    </div>
  );
} 