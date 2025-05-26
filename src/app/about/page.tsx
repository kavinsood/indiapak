"use client";
import React from "react";
import dynamic from "next/dynamic";
import BlurFade from "@/components/magicui/blur-fade";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

const BLUR_FADE_DELAY = 0.04;

// Dynamically import AboutCards with no SSR
const AboutCards = dynamic(() => import("@/components/about-cards"), { 
  ssr: false,
  loading: () => (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-background w-full gap-8 mx-auto max-w-6xl">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-black/[0.2] dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] rounded-lg animate-pulse bg-gray-200 dark:bg-gray-800" />
      ))}
    </div>
  )
});

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16">
      {/* Header Section */}
      <section id="hero" className="pt-8">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="text-left">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-12">
                <LineShadowText 
                  className="text-foreground"
                  shadowColor="#666"
                >
                  about
                </LineShadowText>
              </div>
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <h2 className="text-xl font-bold text-left px-4 sm:px-8 lg:px-12">indiapak.live is an intricate analysis and visualisation project made for information and insights.</h2>
              </BlurFade>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Canvas Reveal Cards Section */}
      <section id="team" className="py-16">
        <div className="px-8">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <AboutCards />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}