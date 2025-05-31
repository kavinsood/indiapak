"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { useToggle } from "@/lib";
import { CardAvatar, CardHeaderContent, ExpandableContent } from "./resume-card/";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const { value: isExpanded, toggle } = useToggle(false);

  const handleMainClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      toggle();
    }
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    // Link component will handle the navigation
  };

  return (
    <Card className="flex">
      <CardAvatar 
        logoUrl={logoUrl}
        altText={altText}
        href={href}
        onClick={handleAvatarClick}
      />
      
      <div 
        className="flex-grow ml-4 items-center flex-col group cursor-pointer"
        onClick={handleMainClick}
      >
        <CardHeader>
          <CardHeaderContent
            title={title}
            subtitle={subtitle}
            badges={badges}
            period={period}
            hasDescription={!!description}
            isExpanded={isExpanded}
          />
        </CardHeader>
        
        {description && (
          <ExpandableContent
            description={description}
            isExpanded={isExpanded}
          />
        )}
      </div>
    </Card>
  );
};
