import { cn } from "@/lib/utils";

/**
 * Subtle Glarus mountain silhouette used behind dark sections (mockup shows
 * alpine photography; until real photos are supplied this SVG keeps the mood
 * without using stock or AI imagery).
 */
export function MountainBackdrop({ className, opacity = 0.35 }: { className?: string; opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-[60%] w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="mtn-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3f5c" />
          <stop offset="1" stopColor="#0b0c18" />
        </linearGradient>
        <linearGradient id="mtn-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23263a" />
          <stop offset="1" stopColor="#07070f" />
        </linearGradient>
        <linearGradient id="snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path fill="url(#mtn-a)" d="M0 300 120 200 210 250 330 120 420 190 520 90 640 200 760 60 880 180 980 110 1100 210 1220 130 1330 220 1440 150V420H0Z" />
      <path fill="url(#snow)" d="M520 90 480 140 510 132 540 150 570 128 600 156 640 200 560 140Zm240-30-40 60 30-8 26 30 24-20 30 40 50 8-80-110Zm220 50-34 46 22-4 24 26 22-18 28 36 30-2Z" />
      <path fill="url(#mtn-b)" d="M0 420V330l140-70 130 60 150-90 140 70 160-110 170 90 150-60 160 100 120-40 120 80v60Z" />
    </svg>
  );
}
