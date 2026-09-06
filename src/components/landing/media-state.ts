import type { LandingAsset } from "@/content/landing-page";

export type LandingMediaState = "approved" | "pending" | "unavailable";

export function getLandingMediaState(
  asset: LandingAsset | undefined,
): LandingMediaState {
  if (
    asset?.status === "approved" &&
    asset.src?.startsWith("/") &&
    !asset.src.startsWith("//")
  ) {
    return "approved";
  }

  if (!asset || asset.status === "unavailable" || asset.status === "approved") {
    return "unavailable";
  }

  return "pending";
}
