"use client";

import { Meteors } from "@/components/magicui/meteors";
import { BackgroundLines } from "@/components/ui/background-lines";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

export default function MilitaryOperationsPage() {
  return (
    <main className="flex flex-col h-screen">
      {/* Upper Section - Operation Sindoor with Meteors */}
      <section className="relative flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-8">
        <Meteors number={50} className="absolute inset-0 z-0" />
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Operation Sindoor
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Strategic precision & tactical excellence showcased.
            </p>
            <Link href="/blog/operation-sindoor">
              <Button 
                variant="outline" 
                size="sm"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Full Report
              </Button>
            </Link>
          </div>
        </BlurFade>
      </section>

      {/* Lower Section - Operation Bunyam-Um-Marsoos with Background Lines */}
      <section className="relative flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-8">
        <BackgroundLines className="absolute inset-0 z-0">{null}</BackgroundLines>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
              Operation Bunyam-Um-Marsoos
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
              Advanced tactical operations demonstrating strategic capabilities.
            </p>
            <Link href="/blog/operation-bunyam-um-marsoos">
              <Button 
                variant="outline" 
                size="sm"
                className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Full Report
              </Button>
            </Link>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}