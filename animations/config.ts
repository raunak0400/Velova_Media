"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/**
 * Registers GSAP plugins exactly once, client-side only. Both ScrollTrigger
 * and SplitText are free as of GSAP's Webflow-era licensing change — no
 * Club GreenSock membership required. See Design Architecture §11.
 */
export function registerGSAP() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out" });
  // On mobile the address bar collapsing/expanding fires resize events that
  // make ScrollTrigger recalculate start/end positions mid-scroll — a common
  // source of visible stutter. Ignoring those resizes keeps scroll-linked
  // motion steady while the viewport height flickers.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };
