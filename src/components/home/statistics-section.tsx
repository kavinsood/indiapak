import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";

interface StatisticsSectionProps {
  blurFadeDelay: number;
  livesLost: number;
}

export function StatisticsSection({ blurFadeDelay, livesLost }: StatisticsSectionProps) {
  return (
    <section id="number-ticker-section" className="py-10">
      <div className="flex justify-center">
        <BlurFade delay={blurFadeDelay * 10}>
          <div className="flex items-center space-x-4">
            <p className="text-4xl font-bold">
              <NumberTicker value={livesLost} />
            </p>
            <p className="text-2xl text-muted-foreground">Lives lost</p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
} 