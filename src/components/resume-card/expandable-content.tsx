import React from "react";
import { motion } from "framer-motion";

interface ExpandableContentProps {
  description: string;
  isExpanded: boolean;
}

export function ExpandableContent({ description, isExpanded }: ExpandableContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isExpanded ? 1 : 0,
        height: isExpanded ? "auto" : 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mt-2 text-xs sm:text-sm"
    >
      {description}
    </motion.div>
  );
} 