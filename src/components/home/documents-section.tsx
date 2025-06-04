import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { GlowEffectButton } from "@/components/ui/glow-effect-button";
import { DATA } from "@/data/resume";

interface DocumentsSectionProps {
  blurFadeDelay: number;
}

// Helper function to sort documents by date
const sortDocumentsByDate = (documents: typeof DATA.work) => {
  return [...documents].sort((a, b) => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);
    return dateA.getTime() - dateB.getTime(); // Ascending order (oldest first)
  });
};

export function DocumentsSection({ blurFadeDelay }: DocumentsSectionProps) {
  // Sort documents by date before filtering
  const sortedDocuments = sortDocumentsByDate(DATA.work);
  
  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={blurFadeDelay * 5}>
          <h2 className="text-xl font-bold mb-4">Officially Released Documents</h2>
        </BlurFade>
        {sortedDocuments
          .filter((work) => work.showOnHomepage)
          .map((work, id) => (
          <BlurFade
            key={work.company}
            delay={blurFadeDelay * 6 + id * 0.05}
          >
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              badges={work.badges}
              period={work.start}
              description={work.description}
            />
          </BlurFade>
        ))}
        <BlurFade delay={blurFadeDelay * 7}>
          <div className="flex justify-end mt-4">
            <GlowEffectButton />
          </div>
        </BlurFade>
      </div>
    </section>
  );
} 