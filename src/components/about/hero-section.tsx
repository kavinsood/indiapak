import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

interface HeroSectionProps {
  blurFadeDelay: number;
}

export function HeroSection({ blurFadeDelay }: HeroSectionProps) {
  return (
    <section id="hero" className="pt-8">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <BlurFade delay={blurFadeDelay}>
          <div className="text-left">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-12">
              <LineShadowText 
                className="text-foreground"
                shadowColor="#666"
              >
                about
              </LineShadowText>
            </div>
            <BlurFade delay={blurFadeDelay * 2}>
              <h2 className="text-xl font-bold text-left px-4 sm:px-8 lg:px-12">
                indiapak.live is an intricate analysis and visualisation website made for finding information and insights during the 2025 India Pakistan tensions.
              </h2>
            </BlurFade>
          </div>
        </BlurFade>
      </div>
    </section>
  );
} 