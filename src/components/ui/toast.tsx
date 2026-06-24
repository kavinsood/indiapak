"use client";

import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "error" | "warning";
type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastOptions {
  title: string;
  message?: string;
  variant?: Variant;
  position?: Position;
  duration?: number;
  highlightTitle?: boolean;
  onDismiss?: () => void;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "outline" | "default";
  };
}

export interface ToasterRef {
  show: (options: ToastOptions) => void;
}

interface ToastItem extends ToastOptions {
  id: string;
}

const variantConfig: Record<
  Variant,
  { icon: React.ReactNode; accent: string; iconColor: string }
> = {
  default: {
    icon: <Info className="w-4 h-4" />,
    accent: "border-l-neutral-400",
    iconColor: "text-neutral-400",
  },
  success: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    accent: "border-l-green-500",
    iconColor: "text-green-500",
  },
  error: {
    icon: <XCircle className="w-4 h-4" />,
    accent: "border-l-red-500",
    iconColor: "text-red-500",
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    accent: "border-l-yellow-400",
    iconColor: "text-yellow-400",
  },
};

const positionClasses: Record<Position, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-20 left-4 items-start",
  "bottom-center": "bottom-20 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-20 right-4 items-end",
};

function SingleToast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const config = variantConfig[toast.variant ?? "default"];

  useEffect(() => {
    if (!toast.duration) return;
    const t = setTimeout(() => {
      onDismiss(toast.id);
      toast.onDismiss?.();
    }, toast.duration);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "flex items-start gap-3 w-80 rounded-lg border border-l-4 bg-background/95 backdrop-blur-sm p-4 shadow-xl",
        config.accent
      )}
    >
      <span className={cn("mt-0.5 shrink-0", config.iconColor)}>
        {config.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium leading-snug",
            toast.highlightTitle ? "text-primary" : "text-foreground"
          )}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {toast.message}
          </p>
        )}
        {toast.actions && (
          <button
            onClick={() => {
              toast.actions?.onClick();
              onDismiss(toast.id);
            }}
            className="mt-2 text-xs font-medium underline underline-offset-2 text-foreground hover:text-primary transition-colors"
          >
            {toast.actions.label}
          </button>
        )}
      </div>
      <button
        onClick={() => {
          onDismiss(toast.id);
          toast.onDismiss?.();
        }}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

const Toaster = forwardRef<ToasterRef>((_props, ref) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useImperativeHandle(ref, () => ({
    show: (options: ToastOptions) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...options, id }]);
    },
  }));

  const grouped = toasts.reduce<Record<string, ToastItem[]>>((acc, toast) => {
    const pos = toast.position ?? "bottom-right";
    acc[pos] = acc[pos] ? [...acc[pos], toast] : [toast];
    return acc;
  }, {});

  return (
    <>
      {(Object.entries(grouped) as [Position, ToastItem[]][]).map(
        ([position, items]) => (
          <div
            key={position}
            className={cn(
              "fixed z-50 flex flex-col gap-2 pointer-events-none",
              positionClasses[position]
            )}
          >
            <AnimatePresence mode="popLayout">
              {items.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                  <SingleToast toast={toast} onDismiss={dismiss} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        )
      )}
    </>
  );
});

Toaster.displayName = "Toaster";

export default Toaster;
export type { ToastOptions, Variant, Position };
