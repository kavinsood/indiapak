"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ResumeCard } from "@/components/resume-card";
import Carousel from "@/components/ui/carousel";
import { GlowEffectButton } from "@/components/ui/glow-effect-button";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { NewsDashboard } from "@/components/news-dashboard";

const BLUR_FADE_DELAY = 0.04;

const carouselSlides = [
  {
    title: "Pahalgam Attacks",
    button: "Read Story",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Pahalgam_views_91.JPG/960px-Pahalgam_views_91.JPG"
  },
  {
    title: "Pakistan Denies Involvement",
    button: "Read Story",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "India Retaliates: Strikes Terror Camp",
    button: "Read Story",
    src: "https://akm-img-a-in.tosshub.com/indiatoday/inline-images/Bahwalpur_pic_damage.png?VersionId=Nt17_09b3mYKtYmgoisIWhCbcRaJHTe9&size=750:*"
  },
  {
    title: "Pakistan Downs Indian Drones, Vows Retaliation",
    button: "Read Story",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Heavy Clashes Erupt Between Both Sides",
    button: "Read Story",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "US-Brokered Ceasefire Brings Conflict to End",
    button: "Read Story",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    title: "Both Nations Claim Victory",
    button: "Read Story",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  }
];

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex justify-between items-start">
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
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <Link
                href="/about"
                className="inline-block"
              >
                <span className="text-sm font-semibold text-foreground hover:text-green-500 transition-colors duration-200 mt-2 cursor-pointer">
                  about
                </span>
              </Link>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="news-dashboard" className="py-10">
        <div className="mx-auto w-full px-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <NewsDashboard />
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold mb-4">Officially Released Documents</h2>
          </BlurFade>
          {DATA.work
            .filter((work) => work.showOnHomepage)
            .map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
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
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="flex justify-end mt-4">
              <GlowEffectButton />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="carousel" className="py-10">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold">Look at the war</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <div className="flex justify-center">
              <Carousel slides={carouselSlides} />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="number-ticker-section" className="py-10">
        <div className="flex justify-center">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="flex items-center space-x-4">
              <p className="text-4xl font-bold">
                <NumberTicker value={203} />
              </p>
              <p className="text-2xl text-muted-foreground">Lives lost</p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
