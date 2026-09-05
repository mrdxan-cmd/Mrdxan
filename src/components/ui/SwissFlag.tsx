export function SwissFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-label="Schweiz" role="img">
      <rect width="32" height="32" rx="4" fill="#e30613" />
      <path fill="#fff" d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z" />
    </svg>
  );
}
