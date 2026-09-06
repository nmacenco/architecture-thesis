import {
  getMediaPlaceholderClasses,
  type MediaPlaceholderVariant,
} from "@/components/landing/media-placeholder-styles";

type MediaPlaceholderProps = {
  label: string;
  className?: string;
  description?: string;
  variant?: MediaPlaceholderVariant;
};

export function MediaPlaceholder({
  label,
  className = "",
  description,
  variant = "default",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`${getMediaPlaceholderClasses(variant)} ${className}`}
      role={description ? "img" : undefined}
      aria-label={description}
    >
      <span className="relative p-4 text-[0.61rem] tracking-[0.09em] uppercase">{label}</span>
    </div>
  );
}
