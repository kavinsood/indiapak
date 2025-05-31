import React from "react";
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription,
  DrawerClose 
} from "@/components/ui/drawer";
import { X } from "lucide-react";

interface InfoDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InfoDrawer({ open, onOpenChange }: InfoDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <div style={{ display: 'none' }} />
      </DrawerTrigger>
      <DrawerContent className="custom-drawer-content max-w-2xl mx-auto fixed">
        <DrawerHeader className="text-center sm:text-center relative">
          <DrawerClose asChild>
            <button 
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </DrawerClose>
          <DrawerTitle className="text-2xl font-bold tracking-tight text-foreground mb-6">
            Why This Matters
          </DrawerTitle>
          <div className="px-4 pb-8 space-y-6">
            <DrawerDescription className="text-base leading-relaxed text-foreground/80">
              War times heighten emotions and hostility. Online articles filled with misinformation can further affect our feelings due to the surrounding hostility.
            </DrawerDescription>
            
            <DrawerDescription className="text-base leading-relaxed text-foreground/80">
              AI search tools helping find accurate information by trying to filter through biases and misunderstandings is something we&apos;ve never had before. This website is so that trying information properly does not pull strongly on anyone&apos;s soul.
            </DrawerDescription>
            
            <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <DrawerDescription className="text-sm font-medium text-foreground/70 italic">
                Number mentioned - 1.7 billion (India + Pakistan populations) + ~800 million (global interest estimate based on media coverage, geopolitical significance, and online engagement trends for major conflicts). Total: ~2.5 billion.
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
} 