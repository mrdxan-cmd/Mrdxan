/**
 * Social & external profiles.
 * Set `url` to null to hide a link. VERIFY every URL against the live website.
 */
export type SocialPlatform = "google" | "instagram" | "facebook" | "linkedin" | "localch" | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string | null;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "localch",
    label: "local.ch",
    // Listing confirmed via search results: "Phönix Fo GmbH – Maler in Näfels | local.ch"
    url: "https://www.local.ch/de/d/naefels/8752/maler/phoenix-fo-gmbh-A2Kk7-HxuqRtMpG2-V9aIA",
  },
  { platform: "google", label: "Google Unternehmensprofil", url: null }, // VERIFY: add Google Business Profile link
  { platform: "instagram", label: "Instagram", url: null }, // VERIFY
  { platform: "facebook", label: "Facebook", url: null }, // VERIFY
  { platform: "linkedin", label: "LinkedIn", url: null }, // VERIFY
];

export const activeSocialLinks = socialLinks.filter((l): l is SocialLink & { url: string } => Boolean(l.url));

/** Direct link to write a Google review (VERIFY: replace with the Place-ID based link). */
export const googleReviewUrl: string | null = null;
