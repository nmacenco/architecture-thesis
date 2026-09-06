import type { LandingAsset } from "@/content/landing-page";

export type HeroMediaState = "approved" | "pending" | "unavailable";

export function getHeroMediaState(asset: LandingAsset | undefined): HeroMediaState {
  if (
    asset?.status === "approved" &&
    asset.src?.startsWith("/") &&
    !asset.src.startsWith("//")
  ) {
    return "approved";
  }
  if (!asset || asset.status === "unavailable" || asset.status === "approved") return "unavailable";
  return "pending";
}
