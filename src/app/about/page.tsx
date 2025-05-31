"use client";
import React, { useState } from "react";
import { useDrawerScroll } from "@/lib";
import { 
  HeroSection, 
  TeamSection, 
  VoyagerSection, 
  InfoDrawer 
} from "@/components/about";
import AboutPageLayout from "./AboutPageLayout";
import "./about.css";

const BLUR_FADE_DELAY = 0.04;

export default function AboutPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Use custom hook for drawer scroll management
  useDrawerScroll({ open: drawerOpen });

  const handleInfoClick = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <AboutPageLayout>
        <main className="main-content-container">
          <HeroSection blurFadeDelay={BLUR_FADE_DELAY} />
          <TeamSection 
            blurFadeDelay={BLUR_FADE_DELAY} 
            onInfoClick={handleInfoClick} 
          />
          <VoyagerSection blurFadeDelay={BLUR_FADE_DELAY} />
        </main>
      </AboutPageLayout>

      <InfoDrawer 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </>
  );
}