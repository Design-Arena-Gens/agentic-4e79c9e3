import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        variant === "outline"
          ? "border border-sky-300 text-sky-700"
          : "bg-sky-100 text-sky-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
