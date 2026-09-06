import { ArrowDown, ArrowUpRight, Download, Menu } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";
import { landingSectionRegistry } from "@/components/landing/section-registry";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ImageComparison } from "@/components/image-comparison";
import { PlanReveal } from "@/components/plan-reveal";
import { ScrollNarrative } from "@/components/scroll-narrative";
import {
  getLandingSection,
  getNextEnabledSection,
  getUnresolvedDecisionsForSection,
} from "@/content/landing-page";

const navigation = [
  ["concept", "#concept"],
  ["site", "#site"],
  ["process", "#process"],
  ["proposal", "#proposal"],
  ["credits", "#credits"],
] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const references = t.raw("references.items") as { name: string; place: string }[];
  const processSteps = t.raw("process.steps") as string[];
  const programme = t.raw("program.items") as string[];
  const proposalImages = t.raw("proposal.imageLabels") as string[];
  const heroSection = getLandingSection("hero");
  const heroNextSection = getNextEnabledSection("hero");
  const heroDecisions = getUnresolvedDecisionsForSection("hero");
  const conceptSection = getLandingSection("concept");
  const siteSection = getLandingSection("site");
  const siteDecisions = getUnresolvedDecisionsForSection("site");
  const HeroModule = landingSectionRegistry.hero;
  const ConceptModule = landingSectionRegistry.concept;
  const SiteModule = landingSectionRegistry.site;

  return (
    <ScrollNarrative>
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label={t("accessibility.backToTop")}>A—</a>
        <nav aria-label={t("nav.menu")}>
          {navigation.map(([key, href]) => <a href={href} key={key}>{t(`nav.${key}`)}</a>)}
        </nav>
        <LanguageSwitcher />
        <Menu className="menu-icon" aria-hidden="true" size={20} />
      </header>

      <HeroModule
        section={heroSection}
        nextAnchor={heroNextSection?.navigation.anchor}
        hasUnresolvedDecisions={heroDecisions.length > 0}
      />

      <ConceptModule section={conceptSection} />

      <SiteModule
        section={siteSection}
        hasUnresolvedDecisions={siteDecisions.length > 0}
      />

      <section className="editorial-section references" data-scroll-scene>
        <p className="eyebrow">{t("references.label")}</p><h2>{t("references.title")}</h2>
        <div className="reference-grid">{references.map((reference, index) => <article className="reference-card" key={reference.place}><MediaPlaceholder label={`0${index + 1}`} variant="reference" /><p>{reference.place}</p><h3>{reference.name}</h3><ArrowUpRight size={18} /></article>)}</div>
      </section>

      <section className="editorial-section process" data-scroll-scene id="process">
        <p className="eyebrow">{t("process.label")}</p><h2>{t("process.title")}</h2>
        <PlanReveal label={t("process.planLabel")} description={t("interactions.processPlanDescription")} />
        <div className="process-line">{processSteps.map((step, index) => <div key={step}><span>0{index + 1}</span><i /><strong>{step}</strong></div>)}</div>
      </section>

      <section className="editorial-section programme" data-scroll-scene>
        <div><p className="eyebrow">{t("program.label")}</p><h2>{t("program.title")}</h2><p className="intro-copy">{t("program.body")}</p></div>
        <div className="programme-diagram">{programme.map((item, index) => <div className={`programme-item item-${index}`} key={item}>{item}</div>)}</div>
      </section>

      <section className="proposal" data-proposal-scene id="proposal">
        <div className="proposal-heading"><p className="eyebrow light">{t("proposal.label")}</p><h2>{t("proposal.title")}</h2><p>{t("proposal.body")}</p></div>
        <div className="proposal-gallery">{proposalImages.map((label, index) => <MediaPlaceholder className={`proposal-image proposal-${index}`} key={label} label={label} />)}</div>
        <ImageComparison beforeLabel={t("proposal.beforeLabel")} afterLabel={t("proposal.afterLabel")} instruction={t("interactions.comparisonInstruction")} />
      </section>

      <section className="editorial-section material-grid" data-scroll-scene>
        <div><p className="eyebrow">{t("material.label")}</p><h2>{t("material.title")}</h2><p className="intro-copy">{t("material.body")}</p></div>
        <MediaPlaceholder label={t("material.imageLabel")} variant="material" />
      </section>

      <section className="editorial-section model-grid" data-scroll-scene>
        <MediaPlaceholder label={t("model.imageLabel")} variant="model" />
        <div><p className="eyebrow">{t("model.label")}</p><h2>{t("model.title")}</h2><p className="intro-copy">{t("model.body")}</p></div>
      </section>

      <section className="reflection" data-scroll-scene><p className="eyebrow">{t("reflection.label")}</p><blockquote>“{t("reflection.quote")}”</blockquote></section>

      <footer id="credits">
        <p className="eyebrow light">{t("credits.label")}</p><h2>{t("credits.title")}</h2>
        <div className="credits-grid"><p><span>{t("credits.author")}</span>{t("hero.author")}</p><p><span>{t("credits.tutor")}</span>—</p><p><span>{t("credits.institution")}</span>{t("hero.institution")}</p></div>
        <div className="footer-actions"><button disabled><Download size={16} />{t("credits.pdf")}</button><a href="mailto:hello@example.com">{t("credits.contact")} <ArrowUpRight size={16} /></a><a href="#top" aria-label={t("accessibility.backToTop")}><ArrowDown className="up-arrow" size={19} /></a></div>
      </footer>
    </main>
    </ScrollNarrative>
  );
}
