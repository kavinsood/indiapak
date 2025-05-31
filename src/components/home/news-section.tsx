import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { NewsDashboard } from "@/components/news-dashboard";

interface NewsSectionProps {
  blurFadeDelay: number;
}

export function NewsSection({ blurFadeDelay }: NewsSectionProps) {
  return (
    <section id="news-dashboard" className="py-10">
      <div className="mx-auto w-full px-4">
        <BlurFade delay={blurFadeDelay * 3}>
          <NewsDashboard />
        </BlurFade>
      </div>
    </section>
  );
} 