"use client";

import { Meteors } from "@/components/magicui/meteors";
import { BackgroundLines } from "@/components/ui/background-lines";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

export default function MilitaryOperationsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Upper Section - Operation Sindoor with Meteors */}
      <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
        <Meteors number={30} />
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Operation Sindoor
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              A strategic military operation showcasing precision and tactical excellence
            </p>
            <Link href="/blog/operation-sindoor">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Read Full Report
              </Button>
            </Link>
          </div>
        </BlurFade>
      </section>

      {/* Lower Section - Operation Bunyam-Um-Marsoos with Background Lines */}
      <section className="relative">
        <BackgroundLines className="flex items-center justify-center w-full h-screen bg-white dark:bg-black">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="relative z-10 text-center px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-4">
                Operation Bunyam-Um-Marsoos
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Advanced tactical operations demonstrating military strategic capabilities
              </p>
              <Link href="/blog/operation-bunyam-um-marsoos">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                >
                  Read Full Report
                </Button>
              </Link>
            </div>
          </BlurFade>
        </BackgroundLines>
      </section>
    </main>
  );
}