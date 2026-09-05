import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline-light" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember-500 text-white shadow-[0_10px_30px_-10px_rgb(244_95_20/0.7)] hover:bg-ember-600 active:bg-ember-700",
  secondary: "bg-ink-900 text-white hover:bg-ink-800",
  dark: "bg-ink-900 text-white hover:bg-ink-700",
  ghost: "bg-transparent text-ink-800 hover:bg-ink-100",
  "outline-light":
    "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12 hover:border-white/40",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-5 text-[15px] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

const baseClass =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-[background-color,border-color,transform,box-shadow] duration-200 select-none whitespace-nowrap active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonButtonProps = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = ButtonLinkProps | ButtonButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(baseClass, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonLinkProps;
    void _v; void _s; void _c; void _ch;
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(rest as ComponentProps<"a">)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonButtonProps;
  void _v; void _s; void _c; void _ch;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
