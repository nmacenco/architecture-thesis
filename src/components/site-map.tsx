type SiteMapProps = {
  label: string;
  description: string;
  className?: string;
};

export function SiteMap({ label, description, className = "" }: SiteMapProps) {
  return (
    <figure
      className={`relative m-0 overflow-hidden bg-[var(--bg-main)] ${className}`}
      data-plan-reveal
      aria-label={label}
    >
      <svg className="block h-full w-full" viewBox="0 0 640 440" role="img" aria-label={description}>
        <path className="fill-[var(--border-color)]" d="M0 46C124 4 206 86 324 54S510 18 640 52V440H0Z" />
        <path className="fill-none stroke-[var(--text-primary)] stroke-[3]" data-plan-path d="M50 334C158 268 212 376 298 292S470 320 610 220" />
        <path className="fill-none stroke-[var(--text-primary)] stroke-[3]" data-plan-path d="M36 236L196 184L312 240L482 132L598 174" />
        <path className="fill-none stroke-[var(--text-primary)] stroke-[3]" data-plan-path d="M96 92L210 152L298 96L416 178L556 98" />
        <path className="fill-none stroke-[var(--text-primary)] stroke-[3]" data-plan-path d="M282 180L394 224L350 334L236 288Z" />
        <path className="fill-[var(--color-primary-base)] opacity-80" d="M282 180L394 224L350 334L236 288Z" />
      </svg>
      <figcaption className="absolute right-3 bottom-3 bg-[var(--bg-surface)]/90 px-2 py-1 text-[0.61rem] tracking-[0.09em] text-[var(--text-secondary)] uppercase">
        {label}
      </figcaption>
    </figure>
  );
}
