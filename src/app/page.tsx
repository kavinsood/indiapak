"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ResumeCard } from "@/components/resume-card";
import Carousel from "@/components/ui/carousel";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

const carouselSlides = [
  {
    title: "Pahalgam Attacks",
    button: "Learn More",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
  },
  {
    title: "India retaliates",
    button: "Read Story",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  }
];

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex justify-start items-start">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter">
                  <LineShadowText 
                    className="text-foreground"
                    shadowColor="#666"
                  >
                    indiapak.
                  </LineShadowText>
                  <LineShadowText 
                    className="text-green-500"
                    shadowColor="#22c55e"
                  >
                    live
                  </LineShadowText>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">Govt Released Documents</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 4 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="carousel" className="py-10">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-xl font-bold text-center">Look at the war</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="flex justify-center">
              <Carousel slides={carouselSlides} />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="number-ticker-section" className="py-10">
        <div className="flex justify-center">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="flex items-center space-x-4">
              <p className="text-4xl font-bold">
                <NumberTicker value={177} />
              </p>
              <p className="text-2xl text-muted-foreground">lives lost</p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
