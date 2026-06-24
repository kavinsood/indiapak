import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Globe } from 'lucide-react';
import BlurFade from '@/components/magicui/blur-fade';

interface NewsItem {
  title: string;
  url: string;
  date: string;
  description?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    title: "Pahalgam attack kills 26 civilians",
    url: "https://www.reuters.com/world/asia-pacific/latest-developments-india-pakistan-conflict-2025-05-08/",
    date: "2025-04-22",
    description: "A deadly attack on tourists in Indian-administered Kashmir killed 26 people and became the trigger for the sharpest India-Pakistan escalation in years."
  },
  {
    title: "India suspends the Indus Waters Treaty",
    url: "https://www.reuters.com/world/asia-pacific/what-is-indus-waters-treaty-between-india-pakistan-2025-04-24/",
    date: "2025-04-23",
    description: "India announced it was suspending the 1960 water-sharing treaty after the Kashmir attack, a move that dramatically raised tensions."
  },
  {
    title: "Pakistan closes airspace and rejects India's measures",
    url: "https://www.reuters.com/world/india/india-calls-all-party-meet-summons-top-pakistani-diplomat-after-kashmir-attack-2025-04-24/",
    date: "2025-04-24",
    description: "Pakistan shut its airspace to Indian airlines, suspended trade, and stopped special South Asian visas for Indian citizens."
  },
  {
    title: "Repeated small-arms fire across the Kashmir border",
    url: "https://www.reuters.com/world/asia-pacific/india-pakistan-exchange-small-arms-fire-across-kashmir-border-fourth-night-2025-04-28",
    date: "2025-04-28",
    description: "India said it responded to unprovoked firing from Pakistani posts for the fourth straight night, showing the crisis spreading into active border skirmishes."
  },
  {
    title: "Pakistan signals it may seek international mediation",
    url: "https://www.reuters.com/world/asia-pacific/latest-developments-india-pakistan-conflict-2025-05-08/",
    date: "2025-05-05",
    description: "Pakistan warned of possible Indian strikes, then later asked the United Nations to intervene as the crisis moved toward direct military confrontation."
  },
  {
    title: "India launches Operation Sindoor",
    url: "https://www.reuters.com/world/asia-pacific/what-happened-indias-attack-pakistan-over-kashmir-tourists-killings-2025-05-07/",
    date: "2025-05-07",
    description: "India said it struck nine locations in Pakistan and Pakistan-administered Kashmir, describing them as terrorist infrastructure."
  },
  {
    title: "Pakistan reports drone shootdowns and airspace tensions",
    url: "https://www.reuters.com/world/asia-pacific/blast-heard-pakistans-lahore-amid-tensions-with-india-say-geo-news-reuters-2025-05-08/",
    date: "2025-05-08",
    description: "Pakistan said it shot down multiple Indian drones, while both sides accused each other of escalating the conflict with drones and other munitions."
  },
  {
    title: "Saudi Arabia steps into mediation",
    url: "https://www.saudigazette.com.sa/article/651674/SAUDI-ARABIA/Saudi-Arabia-leads-mediation-efforts-to-ease-India-Pakistan-military-escalation",
    date: "2025-05-09",
    description: "Saudi officials worked to calm the crisis by engaging both governments directly, adding regional diplomacy to U.S.-led pressure for restraint."
  },
  {
    title: "Ceasefire announced after four days of fighting",
    url: "https://www.reuters.com/world/india/india-pakistan-exchange-fire-despite-ceasefire-agreement-2025-05-10/",
    date: "2025-05-10",
    description: "India and Pakistan agreed to a ceasefire after intense exchanges of missile, drone, and artillery fire."
  },
  {
    title: "Water treaty remains suspended despite ceasefire",
    url: "https://www.reuters.com/world/asia-pacific/india-pakistan-water-treaty-remains-suspended-despite-ceasefire-sources-say-2025-05-10/",
    date: "2025-05-10",
    description: "Even after the ceasefire, India's suspension of the Indus Waters Treaty stayed in place, showing political fallout continued after the shooting stopped."
  }
];

const REDDIT_CONTENT = `This week's online discussion was intensely polarized, with users in India mostly framing the war as a justified response to terrorism and users in Pakistan mostly framing it as aggression against civilians. The dominant mood on both sides was anger, fear, and nationalism, but the tone in Pakistan also mixed in grief and dark humor.

One user in Pakistan said, "Why is India bombing innocent civilians!?", while another posted that "not a single Pakistani I saw took joy in the Pahalgam attack," contrasting that with celebratory voices they saw from India.
Popular posts in India leaned toward revenge and escalation, with one roundup describing Indian social media as dominated by "jingoistic calls for escalating violence and revenge."

A common theme was disinformation: users kept sharing clips, claims, and "proof" that each side said showed the other side lying or hiding losses. Both communities also compared the conflict to broader global struggles, especially to Gaza and other wars, as a way to moralize their own side.
There was some anti-war language too, but it was drowned out by louder accounts amplifying pride, outrage, and mockery.

The empathy gap feels very wide right now: many people seem able to humanize their own side's dead, but not the other side's. A tiny improvement would be more cross-border posts that start with civilian loss before blame.`;

function getDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return '';
  }
}

function getLogoUrl(domain: string): string {
  return `/favicons/${domain}.png`;
}

const BLUR_FADE_DELAY = 0.04;

export function NewsDashboard() {
  return (
    <div className="w-full space-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Live News</h2>
          </div>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <Card className="overflow-hidden h-full border-2 border-neutral-700">
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
              <ScrollArea className="h-[600px] rounded-md border border-neutral-700 bg-muted/20 p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {REDDIT_CONTENT.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4 text-sm leading-relaxed text-foreground/80">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Card className="overflow-hidden h-full border-2 border-neutral-700">
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
              <ScrollArea className="h-[600px] rounded-md border border-neutral-700 bg-muted/20">
                <div className="divide-y divide-border">
                  {NEWS_ITEMS.map((item, index) => {
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
                            <img
                              src={logoUrl}
                              alt={domain}
                              className="w-8 h-8 rounded"
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
              </ScrollArea>
            </div>
          </Card>
        </BlurFade>
      </div>
    </div>
  );
}
