"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    label: "Kid Dash",
    sub: "Kids",
    accent: "#09a30e",
    accentBg: "#e6f7e6",
    distance: "±1 KM",
    tagline: "Mulai dari yang kecil!",
    desc: "Saatnya si kecil mengeksplorasi kegembiraan bergerak. Dengan lintasan yang aman dan suasana ceria, kategori ini dirancang khusus untuk menumbuhkan rasa percaya diri serta semangat berolahraga sejak dini.",
  },
  {
    label: "5K",
    sub: "Open & Teens",
    accent: "#3b82f6",
    accentBg: "#eff6ff",
    distance: "5 KM",
    tagline: "Baru mulai berlari?",
    desc: "Pilihan ideal bagi kamu yang ingin merasakan euforia perlombaan lari. Jarak yang bersahabat namun tetap memberikan tantangan seru, sangat pas untuk dinikmati bersama teman atau keluarga.",
  },
  {
    label: "10K",
    sub: "Open",
    accent: "#ef4444",
    accentBg: "#fef2f2",
    distance: "10 KM",
    tagline: "Siap naik level?",
    desc: "Siap melampaui batas rutinitas? Kategori ini diperuntukkan bagi pelari aktif yang ingin menguji daya tahan dan kecepatan. Rasakan sensasi adrenalin yang meningkat di setiap kilometer menuju garis finish.",
  },
  {
    label: "21K",
    sub: "Half Marathon",
    accent: "#8b5cf6",
    accentBg: "#f5f3ff",
    distance: "21 KM",
    tagline: "Untuk jiwa pelari sejati.",
    desc: "Ujian sesungguhnya bagi fisik dan mental. Taklukkan rute yang menantang dan raih kebanggaan tertinggi sebagai penuntas jarak jauh. Ini bukan sekadar lari, ini adalah pembuktian atas disiplin dan kekuatan jiwa kamu.",
  },
];

const tickerItems = [
  "Bayan Run 2026", "·", "Kid Dash", "·", "5K", "·", "10K", "·", "Half Marathon", "·",
  "Bayan Run 2026", "·", "Kid Dash", "·", "5K", "·", "10K", "·", "Half Marathon", "·",
];

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    (context) => {
      const q = context.selector!;

      // --- Heading & subtext entrance ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(q(".anim-heading"), { opacity: 1, y: 0, duration: 0.8 }).to(
        q(".anim-subtext"),
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );

      // --- Cards entrance ---
      q(".anim-card").forEach((card: HTMLElement, i: number) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: 0.6 + i * 0.13,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            once: true,
          },
        });

        // Accent bar wipe animation
        const accentFill = card.querySelector(".accent-fill") as HTMLElement;
        if (accentFill) {
          gsap.fromTo(
            accentFill,
            { left: "-100%" },
            {
              left: "0%",
              duration: 0.6,
              delay: 0.85 + i * 0.13,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 30%",
                once: true,
              },
            }
          );
        }

        // Hover interactions
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.03, duration: 0.3, ease: "power2.out" });
          const shine = card.querySelector(".card-shine") as HTMLElement;
          if (shine) {
            gsap.fromTo(
              shine,
              { left: "-80%" },
              { left: "130%", duration: 0.55, ease: "power1.inOut" }
            );
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: "power2.inOut" });
        });

        card.addEventListener("mousedown", () => {
          gsap.to(card, { scale: 0.97, duration: 0.1 });
        });

        card.addEventListener("mouseup", () => {
          gsap.to(card, { scale: 1.03, duration: 0.15, ease: "back.out(2)" });
        });
      });

      // --- Ticker fade in ---
      gsap.to(q(".anim-ticker"), { opacity: 1, duration: 0.8, delay: 1.3 });

      // --- Ticker marquee ---
      if (tickerRef.current) {
        const trackWidth = tickerRef.current.scrollWidth / 2;
        gsap.to(tickerRef.current, {
          x: -trackWidth,
          duration: 18,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % trackWidth),
          },
        });
      }

      // --- Blob parallax on mouse move ---
      const section = sectionRef.current;
      const blob1 = q(".blob1")[0] as HTMLElement;
      const blob2 = q(".blob2")[0] as HTMLElement;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section!.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width;
        const my = (e.clientY - rect.top) / rect.height;
        gsap.to(blob1, { x: mx * 40 - 20, y: my * 30 - 15, duration: 1.2, ease: "power1.out" });
        gsap.to(blob2, { x: -(mx * 40 - 20), y: -(my * 30 - 15), duration: 1.4, ease: "power1.out" });
      };

      section?.addEventListener("mousemove", handleMouseMove as EventListener);
      return () => section?.removeEventListener("mousemove", handleMouseMove as EventListener);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex justify-center items-center bg-amber-500 overflow-hidden py-20 px-4 sm:px-6 md:px-8"
    >
      {/* Background blobs */}
      <div className="blob1 absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "rgba(254,240,138,0.18)", filter: "blur(60px)" }} />
      <div className="blob2 absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "rgba(239,68,68,0.12)", filter: "blur(60px)" }} />

      <div className="relative z-10 w-full max-w-5xl text-center">
        {/* Heading */}
        <h2
          className="anim-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide mb-3"
          style={{ opacity: 0, transform: "translateY(-30px)" }}
        >
          OUR CATEGORY
        </h2>

        {/* Subtext */}
        <p
          className="anim-subtext text-white/70 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          Pilih kategori yang paling cocok untukmu dan mulai perjalanan larimu di Bayan Run 2026.
        </p>

        {/* Cards Grid */}
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
          {categories.map((cat, index) => (
            <div
              key={cat.label}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="anim-card relative flex flex-col bg-white rounded-2xl overflow-hidden w-full max-w-[330px] sm:max-w-[210px] lg:max-w-none cursor-pointer"
              style={{ opacity: 0, transform: "translateY(60px) scale(0.92)" }}
            >
              {/* Shine overlay */}
              <div
                className="card-shine absolute top-0 h-full w-1/2 pointer-events-none z-10"
                style={{
                  left: "-80%",
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
                }}
              />

              {/* Accent bar with wipe animation */}
              <div className="relative h-1.5 w-full flex-shrink-0 overflow-hidden" style={{ background: cat.accent }}>
                <div
                  className="accent-fill absolute top-0 h-full w-full"
                  style={{ left: "-100%", background: cat.accent }}
                />
              </div>

              <div className="flex flex-col flex-1 p-4 sm:p-5 text-left">
                {/* Label */}
                <span
                  className="text-4xl sm:text-4xl font-black text-center tracking-tight leading-none mb-1"
                  style={{ color: cat.accent }}
                >
                  {cat.label}
                </span>

                {/* Sub */}
                <span className="text-[10px] font-bold text-center tracking-widest uppercase text-gray-400 mb-4">
                  {cat.sub}
                </span>

                {/* Divider */}
                <div className="h-px w-full mb-4" style={{ background: cat.accent }} />

                {/* Tagline */}
                <p className="text-xs font-bold text-gray-800 mb-2">{cat.tagline}</p>

                {/* Desc */}
                <p className="text-[11px] leading-relaxed text-gray-500 flex-1">{cat.desc}</p>

                {/* Distance badge */}
                <span
                  className="mt-4 self-start text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{ background: cat.accentBg, color: cat.accent }}
                >
                  {cat.distance}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ticker */}
      </div>
    </section>
  );
}