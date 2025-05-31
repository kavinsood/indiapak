import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLinkIcon } from "lucide-react";

interface CardAvatarProps {
  logoUrl: string;
  altText: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export function CardAvatar({ logoUrl, altText, href, onClick }: CardAvatarProps) {
  return (
    <div className="flex-none relative group">
      <Link
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onClick={onClick}
      >
        <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground hover:ring-2 hover:ring-primary transition-all cursor-pointer">
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className="object-contain"
          />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
        {href && (
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLinkIcon className="size-3 text-primary bg-background rounded-full p-0.5 border" />
          </div>
        )}
      </Link>
    </div>
  );
} 