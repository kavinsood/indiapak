"use client";

import { Meteors } from "@/components/magicui/meteors";
import { BackgroundLines } from "@/components/ui/background-lines";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

export default function NuclearPage() {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      {/* Upper Section - Nuclear Research with Meteors */}
      <section className="relative flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden bg-white dark:bg-black">
        <Meteors 
          number={30} 
          className="absolute inset-0 z-0" 
          angle={45}
        />
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Nuclear Research Initiative
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
              Advanced nuclear technology and strategic capabilities.
            </p>
            <Link href="/blog/nuclear-research">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Research Details
              </Button>
            </Link>
          </div>
        </BlurFade>
      </section>

      {/* Lower Section - Nuclear Defense with Background Lines */}
      <section className="relative flex-1 w-full overflow-hidden">
        <div className="absolute inset-0"> 
            <BackgroundLines 
              className="w-full h-full" 
              svgOptions={{ duration: 8 }}
            >
              {null}
            </BackgroundLines>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-6">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
                Strategic Nuclear Defense
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive defense systems and deterrence capabilities.
              </p>
              <Link href="/blog/nuclear-defense">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Defense Overview
                </Button>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
} 