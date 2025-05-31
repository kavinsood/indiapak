import React from "react";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

interface HeroSectionProps {
  blurFadeDelay: number;
}

export function HeroSection({ blurFadeDelay }: HeroSectionProps) {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex justify-between items-start">
          <BlurFade delay={blurFadeDelay}>
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
          <BlurFade delay={blurFadeDelay * 2}>
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
  );
} 