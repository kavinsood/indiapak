"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function DocumentsPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-4xl mx-auto px-4 py-8">
      <section id="header">
        <div className="text-center">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-3xl font-bold">Official Release Documents</h1>
          </BlurFade>
        </div>
      </section>
      
      <section id="documents" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center">
            Complete collection of officially released documents from government sources 
            regarding recent diplomatic and military developments between India and Pakistan.
          </p>
        </BlurFade>
        
        <div className="space-y-4">
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 3 + id * 0.05}
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
        </div>
      </section>
    </main>
  );
} 