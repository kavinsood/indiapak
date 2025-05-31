"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import BlurFade from "@/components/magicui/blur-fade";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription,
  DrawerClose 
} from "@/components/ui/drawer";
import { Info, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    let originalBodyOverflow = '';
    let originalBodyPaddingRight = '';
    let originalBodyMarginRight = '';
    let originalHtmlOverflow = '';

    if (open) {
      originalBodyOverflow = body.style.overflow;
      originalBodyPaddingRight = body.style.paddingRight;
      originalBodyMarginRight = body.style.marginRight;
      originalHtmlOverflow = html.style.overflow;

      body.style.setProperty('overflow', 'auto', 'important');
      body.style.setProperty('padding-right', '0px', 'important');
      body.style.setProperty('margin-right', '0px', 'important');
      html.style.setProperty('overflow', 'auto', 'important');
    } else {
      // Only restore if they were changed by this effect
      if (body.style.getPropertyValue('overflow') === 'auto' && body.style.getPropertyPriority('overflow') === 'important') {
        body.style.overflow = originalBodyOverflow;
      }
      if (body.style.getPropertyValue('padding-right') === '0px' && body.style.getPropertyPriority('padding-right') === 'important') {
        body.style.paddingRight = originalBodyPaddingRight;
      }
      if (body.style.getPropertyValue('margin-right') === '0px' && body.style.getPropertyPriority('margin-right') === 'important') {
        body.style.marginRight = originalBodyMarginRight;
      }
      if (html.style.getPropertyValue('overflow') === 'auto' && html.style.getPropertyPriority('overflow') === 'important') {
        html.style.overflow = originalHtmlOverflow;
      }
    }

    // Cleanup function to restore original styles when component unmounts or before re-running due to `open` changing
    return () => {
      body.style.overflow = originalBodyOverflow;
      body.style.paddingRight = originalBodyPaddingRight;
      body.style.marginRight = originalBodyMarginRight;
      html.style.overflow = originalHtmlOverflow;
    };
  }, [open]);

  return (
    <>
      <main className="main-content-container">
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
                  <h2 className="text-xl font-bold text-left px-4 sm:px-8 lg:px-12">indiapak.live is an intricate analysis and visualisation website made for finding information and insights during the 2025 India Pakistan tensions.</h2>
                </BlurFade>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Canvas Reveal Cards Section */}
        <section id="team" className="py-16">
          <div className="px-8">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="relative">
                <AboutCards />
                
                <div className="info-button-container">
                  <button 
                    onClick={() => setOpen(true)}
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
      </main>

      <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
        <DrawerTrigger asChild>
          <div style={{ display: 'none' }} />
        </DrawerTrigger>
        <DrawerContent className="custom-drawer-content max-w-2xl mx-auto fixed">
          <DrawerHeader className="text-center sm:text-center relative">
            <DrawerClose asChild>
              <button 
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </DrawerClose>
            <DrawerTitle className="text-2xl font-bold tracking-tight text-foreground mb-6">
              Why This Matters
            </DrawerTitle>
            <div className="px-4 pb-8 space-y-6">
              <DrawerDescription className="text-base leading-relaxed text-foreground/80">
                War times heighten emotions and hostility. Online articles filled with misinformation can further affect our feelings due to the surrounding hostility.
              </DrawerDescription>
              
              <DrawerDescription className="text-base leading-relaxed text-foreground/80">
                AI search tools helping find accurate information by trying to filter through biases and misunderstandings is something we&apos;ve never had before. This website is so that trying information properly does not pull strongly on anyone&apos;s soul.
              </DrawerDescription>
              
              <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                <DrawerDescription className="text-sm font-medium text-foreground/70 italic">
                  Number mentioned - 1.7 billion (India + Pakistan populations) + ~800 million (global interest estimate based on media coverage, geopolitical significance, and online engagement trends for major conflicts). Total: ~2.5 billion.
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>

      {/* New Section for YouTube Embed and Text */}
      <section id="voyager-message" className="py-16">
        <div className="mx-auto w-full max-w-2xl space-y-8 px-4 sm:px-8 lg:px-12">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/ecFf8xJgApo"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
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

      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          height: 100%; 
          width: 100%;
        }

        .main-content-container {
          /* Removed display:flex and related properties to restore block flow */
          /* min-height: 100vh; /* Optional: only if vertical centering of the whole container is desired and content is sparse */
          max-width: 1200px; 
          margin-left: auto !important;
          margin-right: auto !important;
          padding-left: 20px; 
          padding-right: 20px; 
          text-align: center; /* Default text alignment for children, can be overridden */
        }

        .main-content-container > section {
           width: 100%; /* Sections take full width of the centered container */
        }

        /* Specific centering for text within the #hero section */
        .main-content-container #hero,
        .main-content-container #hero h2 {
           text-align: center !important;
        }
        
        /* Ensure the direct child of BlurFade within #hero also respects this if it has its own text-align */
        .main-content-container #hero .text-left { /* Assuming .text-left is the class on the div a_component_with_the_text_is_in */
           text-align: center !important; 
        }

        .info-button-container {
          display: flex;
          justify-content: center;
          margin-top: 32px; 
        }

        @media (min-width: 1024px) { 
          .info-button-container {
            position: absolute;
            top: 32rem; 
            left: 50%;
            transform: translateX(-50%);
            margin-top: 0;
          }
        }

        .custom-drawer-content {
          z-index: 50 !important; 
        }

        html[data-vaul-drawer-open],
        body[data-vaul-drawer-open] {
          overflow: auto !important; 
          margin-right: 0px !important; 
          padding-right: 0px !important; 
        }

        [data-vaul-drawer-wrapper] {
          position: static !important; 
          width: auto !important;
          height: auto !important;
          transform: none !important;
          background-color: transparent !important; 
        }
      `}</style>
    </>
  );
}