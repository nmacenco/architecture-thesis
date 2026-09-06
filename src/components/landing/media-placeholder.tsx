type MediaPlaceholderProps = {
  label: string;
  className?: string;
  description?: string;
};

export function MediaPlaceholder({
  label,
  className = "",
  description,
}: MediaPlaceholderProps) {
  return (
    <div
      className={`image-placeholder ${className}`}
      role={description ? "img" : undefined}
      aria-label={description}
    >
      <span>{label}</span>
    </div>
  );
}
