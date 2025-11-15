import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn(
        "rounded-3xl border border-white/60 bg-white/80 backdrop-blur shadow-sm",
        "focus-within:ring-2 focus-within:ring-sky-400 focus-within:ring-offset-2 focus-within:ring-offset-sky-50",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex items-center gap-3 px-6 pt-6", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold tracking-tight text-slate-800",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={cn("px-6 pb-6", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div className={cn("px-6 pb-6", className)} {...props} />
  );
}
