"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Head from "next/head";
import { Instagram, Globe, Calendar, MapPin } from "lucide-react";

export default function AboutBanner() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const topTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, y: 200, visibility: "hidden" },
        { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power2.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    },
    { scope: aboutRef }
  );

  useEffect(() => {
    const topText = topTextRef.current;
    if (topText) {
      gsap.fromTo(topText,
        { x: "-50%" },
        { x: "0%", duration: 20, ease: "none", repeat: -1 }
      );
    }
    return () => {
      gsap.killTweensOf(topTextRef.current);
    };
  }, []);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto/f_auto/v1769479898/bayanrun-video_ifpuhz.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dgcedsrzf/image/upload/v1761553124/202510271554_poster.jpg"
        />
      </Head>

      <section
        ref={aboutRef}
        className="relative flex flex-col text-white overflow-hidden bg-black"
      >
        {/* ── Hero ── */}
        <div className="relative flex items-center justify-center min-h-screen">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto/f_auto/v1769479898/bayanrun-video_ifpuhz.mp4"
            poster="https://res.cloudinary.com/dgcedsrzf/image/upload/v1761553124/202510271554_poster.jpg"
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            disableRemotePlayback
          />

          <div className="absolute inset-0 bg-black/20 z-10" />

          <div ref={contentRef} className="relative z-20 text-center px-6 flex flex-col items-center">
            {/* Coming Soon Badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-2 border border-yellow-400/60 rounded-full px-5 py-1.5 backdrop-blur-sm bg-yellow-400/10">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-yellow-400 text-sm sm:text-base font-semibold tracking-[0.3em] uppercase">
                  Coming Soon
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight">
              BAYAN RUN 2026
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl font-light tracking-wide">
                  11 Oktober 2026
                </span>
              </div>
              <span className="hidden sm:block text-white/40">|</span>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl font-light tracking-wide">
                  Lapangan Merdeka 3, Balikpapan
                </span>
              </div>
            </div>

            {/* Socmed */}
            <div className="flex items-center justify-center gap-6 flex-wrap mb-10">
              <a
                href="https://instagram.com/bayan_open"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
              >
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base sm:text-lg">bayan_open</span>
              </a>
              <a
                href="https://www.bayanrun.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
              >
                <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base sm:text-lg">www.bayanrun.com</span>
              </a>
            </div>

            {/* Subtitle — di bawah socmed, masih dalam hero */}
            <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-widest text-white/70 uppercase">
              The Biggest Running Event in{" "}
              <span className="text-yellow-400 font-semibold">Kalimantan</span>
            </p>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="relative bg-gray-200 py-6 md:py-8 overflow-hidden">
          <div
            ref={topTextRef}
            className="flex whitespace-nowrap"
            style={{ width: "200%" }}
          >
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center flex-shrink-0">
                <span className="text-3xl md:text-5xl lg:text-5xl font-black text-blue-900 tracking-tight uppercase mx-8">
                  THE NEXT LEVEL
                </span>
                <span className="text-3xl md:text-5xl lg:text-5xl font-black text-blue-900 mx-4">•</span>
                <span className="text-3xl md:text-5xl lg:text-5xl font-black text-red-600 tracking-tight uppercase mx-8">
                  KEEP MOVING KEEP STRONG
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-red-900 mx-4">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}