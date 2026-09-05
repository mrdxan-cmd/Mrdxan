import { TrustGlyph } from "@/components/ui/Icons";

export function MapIconWrapper() {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50 text-brand-magenta">
      <TrustGlyph icon="map" size={22} />
    </span>
  );
}
