"use client";

import React from "react";
import { 
  HeroSection, 
  NewsSection, 
  DocumentsSection, 
  CarouselSection, 
  StatisticsSection 
} from "@/components/home";
import { CAROUSEL_SLIDES } from "@/data/carousel";

const BLUR_FADE_DELAY = 0.04;
const LIVES_LOST = 203;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <HeroSection blurFadeDelay={BLUR_FADE_DELAY} />
      <NewsSection blurFadeDelay={BLUR_FADE_DELAY} />
      <DocumentsSection blurFadeDelay={BLUR_FADE_DELAY} />
      <CarouselSection 
        blurFadeDelay={BLUR_FADE_DELAY} 
        slides={CAROUSEL_SLIDES} 
      />
      <StatisticsSection 
        blurFadeDelay={BLUR_FADE_DELAY} 
        livesLost={LIVES_LOST} 
      />
    </main>
  );
}
