import type { SVGProps } from "react";
import type { ServiceIcon } from "@/content/services";
import type { HighlightIcon, TrustIcon } from "@/content/trust";
import type { SocialPlatform } from "@/content/social";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 3h3l1.7 4.2-2 1.4a11 11 0 0 0 7.2 7.2l1.4-2L21 15.5v3A2.5 2.5 0 0 1 18.5 21 15.5 15.5 0 0 1 3 5.5 2.5 2.5 0 0 1 5.5 3Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const StarIcon = ({ filled = true, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? "currentColor" : "none"}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8L12 3.5Z" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base(p)} strokeWidth={1.6}>
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z" />
    <path d="M9.2 8.6c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.5l-.5.6c-.1.1-.2.3 0 .5a6 6 0 0 0 2.8 2.7c.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.4 0 .3-.1 1.1-.6 1.5-.5.4-1.2.6-1.9.4A8.4 8.4 0 0 1 8.6 12c-.5-1-.6-1.9-.2-2.6.3-.5.5-.7.8-.8Z" fill="currentColor" stroke="none" />
  </svg>
);

export const QuoteIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M7.5 6A4.5 4.5 0 0 0 3 10.5V18h7v-7H6.2A1.8 1.8 0 0 1 8 9.2V6H7.5Zm9 0A4.5 4.5 0 0 0 12 10.5V18h7v-7h-3.8A1.8 1.8 0 0 1 17 9.2V6h-.5Z" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const UsersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 19.5a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 19.5a6.5 6.5 0 0 0-4.5-6.2" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12l1-8Z" />
  </svg>
);

export const RollerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="13" height="6" rx="2" />
    <path d="M17 7h2.5a1 1 0 0 1 1 1v3a1.5 1.5 0 0 1-1.5 1.5H12V15" />
    <rect x="10" y="15" width="4" height="6" rx="1.5" />
  </svg>
);

/* ---- Service icons ---- */

const FacadeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 21h18M5 21V8l7-4 7 4v13" />
    <path d="M9 21v-5h6v5M9 11h2m4 0h-2M9 14h2m4 0h-2" />
  </svg>
);

const BrushIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4h12v6H4zM16 6h3a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2h-7v2" />
    <path d="M9 14h4v6a2 2 0 0 1-4 0v-6Z" />
  </svg>
);

const TrowelIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 5h11l4 4-1 1-4-4-8 8 4 4-1 1-6-6Z" />
    <path d="M13.5 13.5 21 6" />
  </svg>
);

const BuildingIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 21h18M6 21V4h8v17M14 9h4v12" />
    <path d="M9 7h2M9 11h2M9 15h2M16 13h1M16 17h1" />
  </svg>
);

export function ServiceGlyph({ icon, ...props }: IconProps & { icon: ServiceIcon }) {
  switch (icon) {
    case "facade":
      return <FacadeIcon {...props} />;
    case "brush":
      return <BrushIcon {...props} />;
    case "trowel":
      return <TrowelIcon {...props} />;
    case "building":
      return <BuildingIcon {...props} />;
  }
}

export function HighlightGlyph({ icon, ...props }: IconProps & { icon: HighlightIcon }) {
  switch (icon) {
    case "shield":
      return <ShieldIcon {...props} />;
    case "users":
      return <UsersIcon {...props} />;
    case "bolt":
      return <BoltIcon {...props} />;
    case "check":
      return <CheckIcon {...props} />;
    case "sparkles":
      return <SparklesIcon {...props} />;
  }
}

/* ---- Trust icons ---- */

const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.9 7.5 9.5 4.3-1.6 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SparklesIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4l1.8 4.7L18.5 10.5l-4.7 1.8L12 17l-1.8-4.7L5.5 10.5l4.7-1.8L12 4Z" />
    <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16ZM5 3l.5 1.3L6.8 4.8l-1.3.5L5 6.6l-.5-1.3-1.3-.5 1.3-.5L5 3Z" />
  </svg>
);

const HandshakeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m3 9 3-3h4l3 3-3 3 3 3 3 3M21 9l-3-3h-4M8 12l-2 2M11 15l-2 2M14 18l-2 2" />
  </svg>
);

const MapIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6ZM9 4v14M15 6v14" />
  </svg>
);

const LeafIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 4c-9 0-15 5-15 12a5 5 0 0 0 5 5c7 0 12-6 12-15V4h-2Z" />
    <path d="M5 21c3-6 7-9 12-12" />
  </svg>
);

export function TrustGlyph({ icon, ...props }: IconProps & { icon: TrustIcon }) {
  switch (icon) {
    case "shield":
      return <ShieldIcon {...props} />;
    case "clock":
      return <ClockIcon {...props} />;
    case "sparkles":
      return <SparklesIcon {...props} />;
    case "handshake":
      return <HandshakeIcon {...props} />;
    case "map":
      return <MapIcon {...props} />;
    case "leaf":
      return <LeafIcon {...props} />;
  }
}

/* ---- Social icons ---- */

export function SocialGlyph({ platform, ...props }: IconProps & { platform: SocialPlatform }) {
  switch (platform) {
    case "instagram":
      return (
        <svg {...base(props)}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="3.8" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...base(props)}>
          <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6H14v-6h2.5l.5-3.5h-3V8Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...base(props)}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
          <path d="M8 10.5v6M8 7.6v.1M12 16.5v-3.4a2 2 0 0 1 4 0v3.4M12 10.5v6" />
        </svg>
      );
    case "google":
      return (
        <svg {...base(props)}>
          <path d="M20 12.2c0-.6-.1-1.1-.2-1.7H12v3.3h4.5a3.9 3.9 0 0 1-1.7 2.6v2.1h2.8c1.6-1.5 2.4-3.7 2.4-6.3Z" />
          <path d="M12 20.5c2.3 0 4.2-.8 5.6-2l-2.8-2.1c-.8.5-1.7.8-2.8.8-2.2 0-4-1.5-4.7-3.5H4.5v2.2a8.5 8.5 0 0 0 7.5 4.6Z" />
          <path d="M7.3 13.7a5.1 5.1 0 0 1 0-3.3V8.2H4.5a8.5 8.5 0 0 0 0 7.7l2.8-2.2Z" />
          <path d="M12 6.9c1.3 0 2.4.4 3.3 1.3l2.5-2.5A8.5 8.5 0 0 0 4.5 8.2l2.8 2.2C8 8.4 9.8 6.9 12 6.9Z" />
        </svg>
      );
    case "whatsapp":
      return <WhatsAppIcon {...props} />;
    case "localch":
      return (
        <svg {...base(props)}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v4.5l3 2" />
        </svg>
      );
  }
}
