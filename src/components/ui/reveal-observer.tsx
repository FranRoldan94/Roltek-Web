"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * Drives every <Reveal />: marks elements as revealed when they enter the
 * viewport. Elements already visible on load are revealed at once, so nothing
 * that was painted by the server disappears after hydration.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveal = (element: Element) => element.setAttribute("data-revealed", "");

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    const track = (scope: ParentNode, initial = false) => {
      for (const element of scope.querySelectorAll(SELECTOR)) {
        if (initial && element.getBoundingClientRect().top < window.innerHeight) {
          reveal(element);
        } else {
          intersection.observe(element);
        }
      }
    };

    track(document, true);
    root.setAttribute("data-reveal-ready", "");

    // Client-side navigations insert new sections.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(SELECTOR)) intersection.observe(node);
          track(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
      root.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
