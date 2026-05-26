"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: "2026", label: "Year" },
  { value: "6500", label: "Runners" },
  { value: "4", label: "Categories" },
  { value: "21K", label: "Max Distance" },
];

export default function AboutStats() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>(".amv-stat-num").forEach((el) => {
        const raw = el.dataset.value ?? "0";
        const num = parseFloat(raw.replace(/\D/g, ""));
        const suffix = raw.replace(/[\d.]/g, "");
        if (!isNaN(num)) {
          gsap.fromTo(
            el,
            { innerText: "0" },
            {
              innerText: num,
              duration: 1.6,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onUpdate() {
                el.innerText = Math.round(parseFloat(el.innerText)) + suffix;
              },
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-gray-200 text-blue-900"
    >
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-blue-900/15 divide-x divide-y md:divide-y-0 divide-blue-900/15">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 gap-1 group"
            >
              <span
                className="amv-stat-num text-4xl md:text-5xl font-black tracking-tighter text-blue-900 tabular-nums"
                data-value={s.value}
              >
                {s.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-blue-900/50">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial label */}
      <div className="mx-auto max-w-6xl px-6 pt-6 pb-2 flex items-center gap-4">
      </div>
    </section>
  );
}