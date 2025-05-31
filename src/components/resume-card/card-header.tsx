import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  badges?: readonly string[];
  period: string;
  hasDescription: boolean;
  isExpanded: boolean;
}

export function CardHeaderContent({ 
  title, 
  subtitle, 
  badges, 
  period, 
  hasDescription, 
  isExpanded 
}: CardHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-x-2 text-base">
        <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
          {title}
          {badges && badges.length > 0 && (
            <span className="inline-flex gap-x-1">
              {badges.map((badge, index) => (
                <Badge
                  variant="secondary"
                  className="align-middle text-xs"
                  key={index}
                >
                  {badge}
                </Badge>
              ))}
            </span>
          )}
          {hasDescription && (
            <ChevronRightIcon
              className={cn(
                "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                isExpanded ? "rotate-90" : "rotate-0"
              )}
            />
          )}
        </h3>
        <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
          {period}
        </div>
      </div>
      {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
    </>
  );
} 