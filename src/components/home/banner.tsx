"use client";

import React from "react";
import CountdownTimer from "./countdown";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";

export default function AboutBanner() {
  return (
    <>
      {/* Global keyframes via style tag — works reliably in Next.js App Router */}
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
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes bgKenBurns {
          0%   { transform: scale(1)    translate(0, 0); }
          50%  { transform: scale(1.07) translate(-1%, -0.5%); }
          100% { transform: scale(1)    translate(0, 0); }
        }

        .about-section          { animation: bannerFadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .about-content          { animation: contentFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .about-bg               { animation: bgKenBurns 18s ease-in-out infinite; transform-origin: center center; will-change: transform; }
        .about-ticker           { animation: tickerScroll 24s linear infinite; }
        .about-pulse            { animation: pulseDot 1.6s ease-in-out infinite; }
        .about-badge-glow       { animation: shimmerBadge 2.8s ease-in-out infinite; }
        .about-card-float       { animation: cardFloat 4s ease-in-out infinite; }

        .about-s1 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .about-s2 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.48s both; }
        .about-s3 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.60s both; }
        .about-s4 { animation: contentFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.72s both; }
        .about-sc { animation: contentFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
      `}</style>

      <section className="about-section relative flex flex-col text-white overflow-hidden bg-black">

        {/* ── Hero ── */}
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">

          {/* Background Image with Ken Burns */}
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1767765516/DJI_20251012054325_0006_D_p3yx0k.jpg"
            alt="Bayan RUN 2026 Background"
            className="about-bg absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55 z-10" />

          {/* Content */}
          <div className="about-content relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 py-24">

            {/* ── LEFT ── */}
            <div className="flex-1 text-left">

              {/* Badge */}
              <div className="about-s1 flex items-center gap-2 mb-5">
                <div className="about-badge-glow flex items-center gap-2 border border-blue-400/60 rounded-full px-4 py-1 backdrop-blur-sm bg-blue-400/10 w-fit">
                  <span className="about-pulse w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                  <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
                    Pendaftaran Dibuka
                  </span>
                </div>
              </div>

              {/* Logo */}
              <div className="about-s2 mb-4 -ml-6 sm:-ml-8 md:-ml-10">
                <img
                  src="https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1775466723/LOGO_BR2026_vbixvo.png"
                  alt="Bayan RUN 2026"
                  className="w-auto max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-64 object-contain"
                  style={{ filter: "drop-shadow(0 0 20px rgba(59,130,246,0.5))" }}
                />
              </div>

              {/* Tagline */}
              <p className="about-s3 text-xl sm:text-2xl font-bold italic text-white/60 mb-8 tracking-widest uppercase">
                — The Biggest Running Event in{" "}
                <span className="text-yellow-400 not-italic">Kalimantan</span>
              </p>

              {/* Date & Location */}
              <div className="about-s4 flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-lg font-medium">11 Oktober 2026</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-lg font-medium">
                    Lapangan Merdeka 3, Balikpapan | BSCC Dome, Balikpapan
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Card ── */}
            <div className="about-sc w-full lg:w-[420px] flex-shrink-0">
              <div className="about-card-float rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-2xl">

                <div className="inline-flex items-center gap-2 bg-red-700 rounded-full px-4 py-1 mb-5">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    Open Registration
                  </span>
                </div>

                <h2 className="text-2xl font-black text-white mb-2 leading-snug">
                  Secure Your Spot Early &<br />Get Exclusive Perks
                </h2>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Daftarkan diri sekarang dan dapatkan race pack eksklusif, finisher medal,
                  dan berbagai hiburan lainnya!
                </p>

                <div className="flex flex-col gap-2 mb-4 text-xs sm:text-sm">
                  <CountdownTimer targetDate="2026-10-11T06:00:00" />
                </div>

                <Button
                  className="w-full py-5 text-lg font-black tracking-widest uppercase
                    bg-blue-800 hover:bg-blue-700 active:bg-blue-700
                    border border-blue-400/30
                    rounded-xl h-auto
                    shadow-[0_0_24px_rgba(59,130,246,0.5)]
                    hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]
                    transition-all duration-300 cursor-pointer"
                >
                  Daftar Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="relative bg-gray-200 py-6 md:py-8 overflow-hidden">
          <div className="about-ticker flex whitespace-nowrap" style={{ width: "200%" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                <span className="text-3xl md:text-5xl lg:text-5xl font-black text-blue-900 tracking-tight uppercase mx-8">
                  THE NEXT LEVEL
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-blue-900 mx-4">•</span>
                <span className="text-3xl md:text-5xl lg:text-5xl font-black text-red-600 tracking-tight uppercase mx-8">
                  KEEP MOVING KEEP STRONG
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-red-600 mx-4">•</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}