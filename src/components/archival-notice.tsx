"use client";

import { useEffect, useRef } from "react";
import Toaster, { ToasterRef } from "@/components/ui/toast";

export function ArchivalNotice() {
  const toasterRef = useRef<ToasterRef>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      toasterRef.current?.show({
        title: "This site is under archival",
        message:
          "Content reflects the India-Pakistan conflict of April–May 2025. No further updates will be made.",
        variant: "warning",
        position: "bottom-right",
        duration: 8000,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return <Toaster ref={toasterRef} />;
}
