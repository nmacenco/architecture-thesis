export const mediaPlaceholderBaseClasses =
  "flex items-end overflow-hidden text-[var(--bg-surface)] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(125deg,transparent_0_8%,rgb(255_255_255/12%)_8.1%_8.5%,transparent_8.6%_18%)] before:content-['']";

export const mediaPlaceholderVariantClasses = {
  default:
    "relative min-h-60 bg-[linear-gradient(135deg,var(--color-terracotta-dark),var(--color-primary-base)_38%,var(--text-secondary))]",
  hero: "absolute inset-0 m-0 min-h-full bg-[linear-gradient(120deg,var(--color-terracotta-dark),var(--color-primary-base)_35%,var(--color-secondary-base)_72%,var(--text-primary))]",
  material:
    "relative min-h-128 bg-[linear-gradient(145deg,var(--color-primary-base),var(--color-terracotta-dark))]",
  model:
    "relative min-h-128 bg-[linear-gradient(145deg,var(--text-secondary),var(--border-color))]",
} as const;

export type MediaPlaceholderVariant = keyof typeof mediaPlaceholderVariantClasses;

export function getMediaPlaceholderClasses(variant: MediaPlaceholderVariant) {
  return `${mediaPlaceholderBaseClasses} ${mediaPlaceholderVariantClasses[variant]}`;
}
