import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-x", className)} {...props} />;
}

interface SectionProps extends ComponentProps<"section"> {
  tone?: "paper" | "white" | "dark" | "tint";
  padding?: "normal" | "tight" | "none";
}

const tones = {
  paper: "bg-paper",
  white: "bg-white",
  dark: "surface-dark",
  tint: "bg-ink-50",
};

const paddings = {
  normal: "py-16 sm:py-20 lg:py-24",
  tight: "py-10 sm:py-14",
  none: "",
};

export function Section({ tone = "paper", padding = "normal", className, ...props }: SectionProps) {
  return <section className={cn(tones[tone], paddings[padding], className)} {...props} />;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/** Mockup pattern: small magenta uppercase eyebrow + large bold headline ending with a period. */
export function SectionHeading({ eyebrow, title, text, align = "left", tone = "light", as: Tag = "h2", className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-extrabold uppercase tracking-[0.18em]", dark ? "text-brand-pink" : "text-brand-magenta")}>
          {eyebrow}
        </p>
      )}
      <Tag className={cn("font-display text-[1.9rem] font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.6rem]", dark ? "text-white" : "text-ink-900")}>
        {title}
      </Tag>
      {text && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-ink-200" : "text-ink-600")}>{text}</p>}
    </div>
  );
}
