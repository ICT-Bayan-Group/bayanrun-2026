"use client";

import React, { useEffect, useRef } from "react";

const STATS = [
  { value: "2026", label: "Year" },
  { value: "6500", label: "Runners" },
  { value: "4", label: "Categories" },
  { value: "21K", label: "Max Distance" },
];

function animateCounter(el: HTMLElement) {
  const raw = el.dataset.value ?? "0";
  const num = parseFloat(raw.replace(/\D/g, ""));
  const suffix = raw.replace(/[\d.]/g, "");
  if (isNaN(num)) return;

  const duration = 1600; // ms
  const start = performance.now();

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out: 1 - (1-t)^3
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * num) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export default function AboutStats() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".amv-stat-num");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full bg-gray-200 text-blue-900">
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

      <div className="mx-auto max-w-6xl px-6 pt-6 pb-2 flex items-center gap-4" />
    </section>
  );
}