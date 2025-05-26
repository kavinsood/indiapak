import { useEffect, useState } from "react";

export function useIsMobile() {
  // Start with true to prevent cursor flash on mobile during SSR
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check if we're in browser environment
      if (typeof window === 'undefined') return;
      
      // Check if device is mobile based on user agent
      const userAgent = navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
      
      // Also check for touch capability and screen width
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      // Consider it mobile if it matches mobile user agent OR (has touch AND small screen)
      const mobile = mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen);
      
      setIsMobile(mobile);
    };

    // Initial check with a small delay to ensure proper hydration
    const timer = setTimeout(checkIsMobile, 100);
    
    // Re-check on window resize to handle orientation changes
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}