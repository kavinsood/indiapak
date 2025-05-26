"use client";

import { SmoothCursor, SmoothCursorProps } from "@/components/ui/smooth-cursor";
import { useIsMobile } from "@/lib/use-is-mobile";
import { useEffect, useState } from "react";

export function DesktopSmoothCursor(props: SmoothCursorProps) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything during SSR or if we're on mobile
  if (!isClient || isMobile) {
    return null;
  }

  // Additional safety check for mobile user agents
  if (typeof window !== 'undefined' && navigator.userAgent) {
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
    if (mobileCheck) {
      return null;
    }
  }

  return <SmoothCursor {...props} />;
}