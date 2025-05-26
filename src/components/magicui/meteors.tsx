"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  useEffect(() => {
    if (!isClientMounted) {
      return;
    }
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle, isClientMounted]);

  if (!isClientMounted) {
    return null;
  }

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "pointer-events-none absolute z-50 size-1 rotate-[var(--angle)] animate-meteor rounded-full bg-white shadow-[0_0_0_1px_#ffffff50] before:content-[''] before:absolute before:-inset-2 before:animate-pulse before:rounded-full before:bg-white before:opacity-20",
            className,
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[2px] w-[100px] -translate-y-1/2 bg-gradient-to-r from-white via-white/50 to-transparent" />
        </span>
      ))}
    </>
  );
};
