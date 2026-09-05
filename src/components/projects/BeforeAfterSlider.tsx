"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { ProjectImage } from "@/content/projects";

/**
 * Accessible before/after compare slider (mockup project cards).
 * A native range input drives the clip – works with mouse, touch and keyboard.
 */
export function BeforeAfterSlider({ before, after, sizes }: { before: ProjectImage; after: ProjectImage; sizes?: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className="relative h-full w-full select-none overflow-hidden">
      <Image src={after.src} alt={after.alt} width={after.width} height={after.height} sizes={sizes} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <Image src={before.src} alt={before.alt} width={before.width} height={before.height} sizes={sizes} className="absolute inset-0 h-full w-full max-w-none object-cover" style={{ width: `${10000 / pos}%` }} />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Vorher</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Nachher</span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `calc(${pos}% - 1px)` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-900 shadow-card">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Vorher/Nachher-Vergleich verschieben
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="compare-range absolute inset-0 h-full w-full"
        aria-valuetext={`${pos}% Vorher`}
      />
    </div>
  );
}
