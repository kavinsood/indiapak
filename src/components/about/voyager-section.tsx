import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

interface VoyagerSectionProps {
  blurFadeDelay: number;
}

export function VoyagerSection({ blurFadeDelay }: VoyagerSectionProps) {
  return (
    <section id="voyager-message" className="py-16">
      <div className="mx-auto w-full max-w-2xl space-y-8 px-4 sm:px-8 lg:px-12">
        <BlurFade delay={blurFadeDelay * 4}>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="youtube-embed"
              src="https://www.youtube.com/embed/ecFf8xJgApo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </BlurFade>
        <BlurFade delay={blurFadeDelay * 5}>
          <div className="text-center space-y-4 text-foreground/80">
            <p>
              The Voyager golden record away in the solar system for other civilizations was decided to not include pictures of war when sent.
            </p>
            <p>
              India, Pakistan and the rest of the world all feel like the same place to ones seeing us from just a little distance.
            </p>
            <p className="font-bold text-foreground">
              A reminder that we are all connected.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
} 