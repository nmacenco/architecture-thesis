"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("accessibility");

  return (
    <div className="language-switcher" aria-label={t("languageSelector")}>
      {(["es", "en"] as const).map((value) => (
        <button
          aria-pressed={locale === value}
          className={locale === value ? "is-active" : ""}
          key={value}
          onClick={() => router.replace(pathname, { locale: value })}
          type="button"
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
