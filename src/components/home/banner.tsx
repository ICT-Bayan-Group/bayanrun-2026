"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Calendar, MapPin, BarChart3, Download, ArrowRight } from "lucide-react";
import {
  AMBILFOTO_URL,
  AMBILFOTO_LOGO,
  RESULT_URL,
  SURAT_KUASA_URL,
  SURAT_KUASA_FILENAME,
} from "@/lib/links";

// ── Config ───────────────────────────────────────────────────────────────────
const RACE_DAY_ISO = "2026-10-10T06:00:00+08:00";
const HERO_IMG =
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630070/20251012053734_-_BOM_6641_nxp5w0.jpg";

// ── Server-time offset hook ──────────────────────────────────────────────────
function useServerTimeOffset() {
  const [offset, setOffset] = useState<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchOffset = async () => {
      try {
        const before = Date.now();
        const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Makassar");
        const after = Date.now();
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setOffset(data.unixtime * 1000 - (before + after) / 2);
      } catch {
        try {
          const before = Date.now();
          const res = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Asia/Makassar");
          const after = Date.now();
          if (!res.ok) throw new Error();
          const data = await res.json();
          setOffset(new Date(data.dateTime).getTime() - (before + after) / 2);
        } catch {
          setOffset(0);
        }
      } finally {
        setReady(true);
      }
    };
    fetchOffset();
  }, []);

  const getReliableNow = useCallback(() => Date.now() + offset, [offset]);
  return { getReliableNow, ready };
}

// ── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(targetISO: string, getReliableNow: () => number) {
  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetISO).getTime() - getReliableNow();
      if (diff <= 0) return null;
      const s = Math.floor(diff / 1000);
      return {
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        minutes: Math.floor((s % 3600) / 60),
        seconds: s % 60,
      };
    };
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetISO, getReliableNow]);

  return time;
}

// ── CountdownBlock ───────────────────────────────────────────────────────────
function CountdownBlock({
  label,
  targetISO,
  getReliableNow,
}: {
  label: string;
  targetISO: string;
  getReliableNow: () => number;
}) {
  const t = useCountdown(targetISO, getReliableNow);
  if (!t) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { val: t.days, unit: "Hari" },
    { val: t.hours, unit: "Jam" },
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

// ── ActionButton (glass style, icon atau logo) ───────────────────────────────
function ActionButton({
  href,
  icon: Icon,
  logo,
  title,
  subtitle,
  download,
  external = true,
  className = "",
}: {
  href: string;
  icon?: React.ElementType;
  logo?: string;
  title: string;
  subtitle: string;
  download?: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(download ? { download } : {})}
      {...(external && !download ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group flex items-center gap-3 sm:gap-4 w-full rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-3.5 sm:px-4 py-3 shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      {logo ? (
        <span className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-[0_0_18px_rgba(255,255,255,0.35)] flex-shrink-0 p-1.5">
          <img
            src={logo}
            alt="AmbilFoto.id"
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </span>
      ) : (
        Icon && (
          <span className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-800 shadow-[0_0_18px_rgba(59,130,246,0.55)] flex-shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
          </span>
        )
      )}
      <span className="flex flex-col flex-1 min-w-0 text-left">
        <span className="flex items-center gap-1.5 text-white font-bold text-sm sm:text-base leading-tight">
          <span className="about-pulse w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" aria-hidden="true" />
          {title}
        </span>
        <span className="text-white/60 text-[11px] sm:text-xs font-medium leading-snug mt-0.5 truncate">
          {subtitle}
        </span>
      </span>
      <ArrowRight
        className="w-4 h-4 text-white/70 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}

// ── AboutBanner ──────────────────────────────────────────────────────────────
export default function AboutBanner() {
  const { getReliableNow, ready } = useServerTimeOffset();

  return (
    <>
      <style jsx global>{`
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
          50%      { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes shimmerBadge {
          0%   { box-shadow: 0 0 0px rgba(59,130,246,0); }
          50%  { box-shadow: 0 0 18px rgba(59,130,246,0.45); }
          100% { box-shadow: 0 0 0px rgba(59,130,246,0); }
        }

        .about-section    { animation: bannerFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .about-content    { animation: contentFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .about-ticker     { animation: tickerScroll 24s linear infinite; }
        .about-pulse      { animation: pulseDot 1.6s ease-in-out infinite; }
        .about-badge-glow { animation: shimmerBadge 2.8s ease-in-out infinite; }

        .about-s1 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .about-s2 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.48s both; }
        .about-s3 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.60s both; }
        .about-s4 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.72s both; }
        .about-s5 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.84s both; }
        .about-sc { animation: contentFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
      `}</style>

      <section className="about-section relative flex flex-col text-white overflow-hidden bg-black">
        {/* ── Hero ── */}
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
          <img
            src={HERO_IMG}
            alt="Bayan RUN 2026 Background"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/30 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent z-10" />

          {/* Content */}
          <div className="about-content relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 lg:gap-10 py-12 sm:py-16 lg:py-24">
            {/* ── LEFT ── */}
            <div className="flex-1 text-left w-full">
              {/* Badge */}
              <div className="about-s1 flex items-center gap-2 mb-4 sm:mb-5">
                <div className="about-badge-glow flex items-center gap-2 border border-blue-400/60 rounded-full px-3 sm:px-4 py-1 backdrop-blur-sm bg-blue-400/10 w-fit">
                  <span className="about-pulse w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" aria-hidden="true" />
                  <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                    Segera Dimulai
                  </span>
                </div>
              </div>

              {/* Logo */}
              <div className="about-s2 mb-3 sm:mb-4 -ml-2 sm:-ml-6 md:-ml-8 lg:-ml-10">
                <img
                  src="https://ik.imagekit.io/nwtwwkdgu/LOGO_BR2026_WHITEALL_f04hnk.png?updatedAt=1787729794843"
                  alt="Bayan RUN 2026"
                  width={640}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="w-auto max-h-28 sm:max-h-40 md:max-h-52 lg:max-h-64 object-contain"
                  style={{ filter: "drop-shadow(0 0 20px rgba(59,130,246,0.5))" }}
                />
              </div>

              {/* Tagline */}
              <p className="about-s3 text-base sm:text-xl lg:text-2xl font-bold italic text-white/70 mb-5 sm:mb-6 tracking-wider sm:tracking-widest uppercase">
                — The Biggest Running Event in{" "}
                <span className="text-yellow-400 not-italic">Kalimantan</span>
              </p>

              {/* Action buttons: 2 atas, 1 bawah */}
              <div className="about-s4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-[720px] mb-6 sm:mb-8">
                <ActionButton
                  href={RESULT_URL}
                  icon={BarChart3}
                  title="Race Result"
                  subtitle="Lihat hasil lomba Bayan Run 2026"
                />
                <ActionButton
                  href={AMBILFOTO_URL}
                  logo={AMBILFOTO_LOGO}
                  title="Ambil Foto Kamu"
                  subtitle="Temukan foto larimu di AmbilFoto.id"
                />
                <ActionButton
                  href={SURAT_KUASA_URL}
                  icon={Download}
                  title="Download Surat Kuasa"
                  subtitle="Surat Kuasa Bayan Open 2026"
                  download={SURAT_KUASA_FILENAME}
                  external={false}
                  className="sm:col-span-2"
                />
              </div>

              {/* Date & Location */}
              <div className="about-s5 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-8 sm:gap-y-3 pt-4 border-t border-white/20 max-w-[720px]">
                <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm sm:text-base font-medium">10 – 11 Oktober 2026</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 text-white/90">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm sm:text-base font-medium leading-snug">
                    Lapangan Merdeka 3, Balikpapan | BSCC Dome, Balikpapan
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Countdown Card ── */}
            <div className="about-sc w-full lg:w-[400px] flex-shrink-0">
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 sm:p-6 lg:p-8 shadow-2xl">
                <div className="inline-flex items-center gap-2 bg-red-700 rounded-full px-3 sm:px-4 py-1 mb-4 sm:mb-5">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    Get Ready
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                  Bersiaplah!<br />Bayan Run Akan Segera Dimulai
                </h2>
                <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                  Siapkan dirimu, atur strategi larimu, dan sampai jumpa di garis start
                  Bayan Run 2026!
                </p>

                <div className="min-h-[88px]">
                  {ready && (
                    <CountdownBlock
                      label="Countdown to Race Day"
                      targetISO={RACE_DAY_ISO}
                      getReliableNow={getReliableNow}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="relative bg-gray-200 py-4 sm:py-6 md:py-8 overflow-hidden">
          <div className="about-ticker flex whitespace-nowrap" style={{ width: "200%" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center flex-shrink-0" aria-hidden={i > 0 ? "true" : undefined}>
                <span className="text-2xl sm:text-3xl md:text-5xl font-black text-blue-900 tracking-tight uppercase mx-5 sm:mx-8">
                  THE NEXT LEVEL
                </span>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-blue-900 mx-3 sm:mx-4" aria-hidden="true">•</span>
                <span className="text-2xl sm:text-3xl md:text-5xl font-black text-red-600 tracking-tight uppercase mx-5 sm:mx-8">
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