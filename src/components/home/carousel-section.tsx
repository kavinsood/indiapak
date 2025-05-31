import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import Carousel from "@/components/ui/carousel";

interface CarouselSectionProps {
  blurFadeDelay: number;
  slides: readonly {
    readonly title: string;
    readonly button: string;
    readonly src: string;
  }[];
}

export function CarouselSection({ blurFadeDelay, slides }: CarouselSectionProps) {
  // Convert readonly array to mutable array for Carousel component
  const mutableSlides = slides.map(slide => ({
    title: slide.title,
    button: slide.button,
    src: slide.src
  }));

  return (
    <section id="carousel" className="py-10">
      <div className="flex min-h-0 flex-col gap-y-8">
        <BlurFade delay={blurFadeDelay * 8}>
          <h2 className="text-xl font-bold">Look at the war</h2>
        </BlurFade>
        <BlurFade delay={blurFadeDelay * 9}>
          <div className="flex justify-center">
            <Carousel slides={mutableSlides} />
          </div>
        </BlurFade>
      </div>
    </section>
  );
} 