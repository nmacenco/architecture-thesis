type PlanRevealProps = { label: string; description: string; className?: string };

export function PlanReveal({ label, description, className = "" }: PlanRevealProps) {
  return (
    <figure className={`plan-reveal ${className}`} data-plan-reveal aria-label={label}>
      <svg viewBox="0 0 640 420" role="img" aria-label={description}>
        <path data-plan-path d="M72 92H307V48H556V314H455V370H162V287H72Z" />
        <path data-plan-path d="M162 92V287M307 92V314M455 48V212H556M72 190H307M162 190H455M307 314H455" />
        <path data-plan-path d="M206 92V190M355 48V190M355 190V314M455 212H307" />
        <path data-plan-path d="M92 112H142M92 132H142M92 152H142M92 172H142" />
        <path data-plan-path d="M475 68H536M475 88H536M475 108H536M475 128H536" />
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
