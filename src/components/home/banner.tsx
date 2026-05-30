"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";

/* ─────────────────────────────────────────
   Inline countdown — no external dependency
───────────────────────────────────────── */
function useCountdown(targetISO: string) {
  const calc = () => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (diff <= 0) return null;
    const s = Math.floor(diff / 1000);
    return {
      days:    Math.floor(s / 86400),
      hours:   Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
  };

  const [time, setTime] = useState<ReturnType<typeof calc>>(null);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return time;
}

function CountdownBlock({
  label,
  targetISO,
}: {
  label: string;
  targetISO: string;
}) {
  const t = useCountdown(targetISO);

  if (!t) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { val: t.days,    unit: "Hari" },
    { val: t.hours,   unit: "Jam" },
    { val: t.minutes, unit: "Menit" },
    { val: t.seconds, unit: "Detik" },
  ];

  return (
    <div className="w-full">
      <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3">
        {label}
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {units.map(({ val, unit }) => (
          <div
            key={unit}
            className="flex flex-col items-center bg-white/10 rounded-xl py-2.5 sm:py-3 border border-white/15"
          >
            <span className="text-xl sm:text-2xl font-black text-white tabular-nums leading-none">
              {pad(val)}
            </span>
            <span className="text-[8px] sm:text-[10px] text-white/50 mt-1 uppercase tracking-wider">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function AboutBanner() {
  const REG_OPEN_ISO = "2026-06-13T00:00:00";
  const RACE_DAY_ISO = "2026-10-10T06:00:00";

  const [regOpen, setRegOpen] = useState(false);

  useEffect(() => {
    const check = () =>
      setRegOpen(new Date(REG_OPEN_ISO).getTime() <= Date.now());
    check();
    const id = setInterval(check, 60_000); // FIX: cek tiap menit saja, tidak perlu per-detik
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/*
        FIX PERF: Hapus bgKenBurns — animasi ini non-composited (transform + scale
        pada <img> tanpa isolation layer) dan menjadi penyebab utama "element render delay"
        4.6 detik pada LCP. Diganti dengan background statis — gambar tetap menarik
        tanpa mengorbankan LCP.

        FIX PERF: Hapus animasi cardFloat (akan-transform non-composited juga).
        Animations yang tersisa (fadeUp, ticker, pulseDot, shimmerBadge) sudah composited
        atau tidak menyentuh LCP element.
      */}
      <style global jsx>{`
        @keyframes bannerFadeUp {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes contentFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes shimmerBadge {
          0%   { box-shadow: 0 0 0px rgba(59,130,246,0); }
          50%  { box-shadow: 0 0 18px rgba(59,130,246,0.45); }
          100% { box-shadow: 0 0 0px rgba(59,130,246,0); }
        }

        /* FIX PERF: Hapus bgKenBurns & cardFloat — keduanya non-composited */
        .about-section    { animation: bannerFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .about-content    { animation: contentFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .about-ticker     { animation: tickerScroll 24s linear infinite; }
        .about-pulse      { animation: pulseDot 1.6s ease-in-out infinite; }
        .about-badge-glow { animation: shimmerBadge 2.8s ease-in-out infinite; }

        .about-s1 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .about-s2 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.48s both; }
        .about-s3 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.60s both; }
        .about-s4 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.72s both; }
        .about-sc { animation: contentFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
      `}</style>

      <section className="about-section relative flex flex-col text-white overflow-hidden bg-black">

        {/* ── Hero ── */}
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">

          {/*
            FIX LCP #1: fetchpriority="high" → browser prioritaskan fetch ini
            FIX LCP #2: Tidak ada loading="lazy" (default eager)
            FIX LCP #3: Hilangkan className about-bg (animasi Ken Burns dihapus)
            FIX LCP #4: Tambah width/height eksplisit → browser bisa hitung layout
                        tanpa nunggu gambar selesai (penting untuk CLS juga)
            FIX ACCESSIBILITY: alt sudah ada ✓
            NOTE: Pasangkan dengan <link rel="preload"> di _document.tsx / layout.tsx:
              <link rel="preload" as="image" href="https://res.cloudinary.com/..." fetchpriority="high" />
          */}
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1780041585/DJI_20251012054325_0006_D_p3yx0k_edwqb7.webp"
            alt="Bayan RUN 2026 Background"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/55 z-10" />

          {/* Content */}
          <div className="about-content relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 py-12 sm:py-16 lg:py-24">

            {/* ── LEFT ── */}
            <div className="flex-1 text-left w-full">

              {/* Badge */}
              <div className="about-s1 flex items-center gap-2 mb-4 sm:mb-5">
                <div className="about-badge-glow flex items-center gap-2 border border-blue-400/60 rounded-full px-3 sm:px-4 py-1 backdrop-blur-sm bg-blue-400/10 w-fit">
                  <span className="about-pulse w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" aria-hidden="true" />
                  <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                    {regOpen ? "Pendaftaran Dibuka" : "Coming Soon"}
                  </span>
                </div>
              </div>

              {/* Logo */}
              <div className="about-s2 mb-3 sm:mb-4 -ml-2 sm:-ml-6 md:-ml-8 lg:-ml-10">
                <img
                  src="https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1775466723/LOGO_BR2026_vbixvo.png"
                  alt="Bayan RUN 2026"
                  width={640}
                  height={320}
                  loading="lazy"   // Logo bukan LCP, boleh lazy
                  decoding="async"
                  className="w-auto max-h-28 sm:max-h-40 md:max-h-52 lg:max-h-64 object-contain"
                  style={{ filter: "drop-shadow(0 0 20px rgba(59,130,246,0.5))" }}
                />
              </div>

              {/* Tagline */}
              <p className="about-s3 text-base sm:text-xl lg:text-2xl font-bold italic text-white/60 mb-5 sm:mb-8 tracking-wider sm:tracking-widest uppercase">
                — The Biggest Running Event in{" "}
                <span className="text-yellow-400 not-italic">Kalimantan</span>
              </p>

              {/* Date & Location */}
              <div className="about-s4 flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-base sm:text-lg font-medium">10 – 11 Oktober 2026</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 text-white/90">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm sm:text-base lg:text-lg font-medium leading-snug">
                    Lapangan Merdeka 3, Balikpapan | BSCC Dome, Balikpapan
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Card ── */}
            <div className="about-sc w-full lg:w-[420px] flex-shrink-0">
              {/* FIX PERF: Hapus about-card-float (non-composited transform animation) */}
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 sm:p-6 lg:p-8 shadow-2xl">

                <div className="inline-flex items-center gap-2 bg-red-700 rounded-full px-3 sm:px-4 py-1 mb-4 sm:mb-5">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    {regOpen ? "Open Registration" : "Coming Soon"}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  Secure Your Spot Early &<br />Get Exclusive Perks
                </h2>
                <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                  Daftarkan diri sekarang dan dapatkan race pack eksklusif, finisher medal,
                  dan berbagai hiburan lainnya!
                </p>

                {/* ── Countdown block ── */}
                <div className="mb-4 sm:mb-6">
                  {!regOpen ? (
                    <CountdownBlock
                      label="Countdown to Registration"
                      targetISO={REG_OPEN_ISO}
                    />
                  ) : (
                    <CountdownBlock
                      label="Countdown to Race Day"
                      targetISO={RACE_DAY_ISO}
                    />
                  )}
                </div>

                {/* ── Button ── */}
                {regOpen ? (
                  <Button
                    className="w-full py-4 sm:py-5 text-base sm:text-lg font-black tracking-widest uppercase
                      bg-blue-800 hover:bg-blue-700 active:bg-blue-700
                      border border-blue-400/30
                      rounded-xl h-auto
                      shadow-[0_0_24px_rgba(59,130,246,0.5)]
                      hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]
                      transition-all duration-300 cursor-pointer"
                  >
                    Daftar Sekarang
                  </Button>
                ) : (
                  <Button
                    disabled
                    aria-disabled="true"
                    className="w-full py-3 sm:py-4 text-xs sm:text-sm font-black tracking-normal sm:tracking-wider uppercase
                      bg-white border border-white/20
                      rounded-xl h-auto
                      text-black
                      whitespace-normal leading-tight
                      cursor-not-allowed
                      transition-all duration-300"
                  >
                    Pendaftaran Dibuka 13 Juni 2026
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="relative bg-gray-200 py-4 sm:py-6 md:py-8 overflow-hidden">
          <div className="about-ticker flex whitespace-nowrap" style={{ width: "200%" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center flex-shrink-0" aria-hidden={i > 0 ? "true" : undefined}>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-black text-blue-900 tracking-tight uppercase mx-5 sm:mx-8">
                  THE NEXT LEVEL
                </span>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-blue-900 mx-3 sm:mx-4" aria-hidden="true">•</span>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-black text-red-600 tracking-tight uppercase mx-5 sm:mx-8">
                  KEEP MOVING KEEP STRONG
                </span>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-red-600 mx-3 sm:mx-4" aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}