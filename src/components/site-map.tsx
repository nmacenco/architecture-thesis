type SiteMapProps = { label: string; description: string };

export function SiteMap({ label, description }: SiteMapProps) {
  return (
    <figure className="site-map" data-plan-reveal aria-label={label}>
      <svg viewBox="0 0 640 440" role="img" aria-label={description}>
        <path className="site-map-water" d="M0 46C124 4 206 86 324 54S510 18 640 52V440H0Z" />
        <path data-plan-path d="M50 334C158 268 212 376 298 292S470 320 610 220" />
        <path data-plan-path d="M36 236L196 184L312 240L482 132L598 174" />
        <path data-plan-path d="M96 92L210 152L298 96L416 178L556 98" />
        <path data-plan-path d="M282 180L394 224L350 334L236 288Z" />
        <path className="site-map-project" d="M282 180L394 224L350 334L236 288Z" />
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
