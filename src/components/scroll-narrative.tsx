"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function ScrollNarrative({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frameId = 0;

    const update = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-scroll-scene]").forEach((scene) => {
        gsap.fromTo(scene, { autoAlpha: 0.35, y: 44 }, {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: scene, start: "top 82%", end: "top 36%", scrub: true },
        });
      });

      gsap.utils.toArray<SVGPathElement>("[data-plan-path]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: path.closest("[data-plan-reveal]"), start: "top 76%", end: "bottom 42%", scrub: true },
        });
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 761px)", () => {
        const proposal = document.querySelector<HTMLElement>("[data-proposal-scene]");
        if (proposal) ScrollTrigger.create({ trigger: proposal, start: "top top", end: "+=55%", pin: proposal, pinSpacing: true });
      });

      return () => media.revert();
    });

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      context.revert();
    };
  }, []);

  return <>{children}</>;
}
