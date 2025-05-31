import React from 'react';

interface AboutPageLayoutProps {
  children: React.ReactNode;
}

export default function AboutPageLayout({ children }: AboutPageLayoutProps) {
  return (
    <div 
      id="about-main-content-wrapper" 
      className="fixed top-0 left-0 w-screen h-screen z-1 overflow-y-auto flex justify-center items-start pt-16 pb-16 bg-background transform-none transition-none"
    >
      <div 
        id="about-inner-content-container" 
        className="w-[90%] max-w-7xl bg-background p-0 transform-none transition-none mx-0 my-0"
      >
        {children}
      </div>
    </div>
  );
} 