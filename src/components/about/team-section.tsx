import React from "react";
import dynamic from "next/dynamic";
import BlurFade from "@/components/magicui/blur-fade";
import { Info } from "lucide-react";

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

interface TeamSectionProps {
  blurFadeDelay: number;
  onInfoClick: () => void;
}

export function TeamSection({ blurFadeDelay, onInfoClick }: TeamSectionProps) {
  return (
    <section id="team" className="py-16">
      <div className="px-8">
        <BlurFade delay={blurFadeDelay * 3}>
          <div className="relative">
            <AboutCards />
            
            <div className="info-button-container">
              <button 
                onClick={onInfoClick}
                className="info-button-actual group flex items-center justify-center w-12 h-12 rounded-full border-2 border-black/[0.2] dark:border-white/[0.2] bg-background hover:bg-muted transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Information about this website"
              >
                <Info 
                  className="w-6 h-6 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" 
                />
              </button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
} 