import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

interface VoyagerSectionProps {
  blurFadeDelay: number;
}

// New component for the YouTube embed logic
function YouTubeEmbed() {
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  // Only autoplay if in view, otherwise pause (autoplay=1 or 0)
  // Do NOT mute the video
  const baseSrc = "https://www.youtube.com/embed/fCB35lTiqT4";
  // Conditionally add autoplay=1 only when inView is true.
  // Otherwise, do not add autoplay parameter, or explicitly set autoplay=0 if needed.
  // For simplicity and to ensure it stops when out of view, we'll reconstruct params.
  const params = inView ? "autoplay=1" : "autoplay=0"; // Or simply "" if autoplay=0 is default
  const src = `${baseSrc}?${params}`;

  return (
    <div ref={containerRef} className="w-full" style={{ aspectRatio: "16/9" }}>
      <iframe
        className="youtube-embed"
        src={src}
        title="YouTube video player"
        style={{ width: "100%", height: "100%", minHeight: 300, border: 0, borderRadius: 12 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

export function VoyagerSection({ blurFadeDelay }: VoyagerSectionProps) {
  return (
    <section id="voyager-message" className="py-16">
      <div className="mx-auto w-full max-w-2xl space-y-8 px-4 sm:px-8 lg:px-12">
        <BlurFade delay={blurFadeDelay * 4}>
          {/*
            Autoplay YouTube video when in view using Intersection Observer.
            We append &autoplay=1 to the src when in view.
            The video is NOT muted when it starts.
          */}
          <YouTubeEmbed />
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