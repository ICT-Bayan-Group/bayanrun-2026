"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import Head from "next/head";
import CountdownTimer from "./countdown";
import { Instagram, Globe, Calendar, MapPin, Zap } from "lucide-react";
import { Button } from "../ui/button";

export default function AboutBanner() {
  const pathname = usePathname();
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
        <link rel="preload" as="video"
          href="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto/f_auto/v1769479898/bayanrun-video_ifpuhz.mp4"
          type="video/mp4"
        />
        <link rel="preload" as="image"
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
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Split Layout */}
          <div
            ref={contentRef}
            className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 py-24"
          >
            {/* ── LEFT: Judul & Info ── */}
            <div className="flex-1 text-left">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-2 border border-blue-400/60 rounded-full px-4 py-1 backdrop-blur-sm bg-blue-400/10 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
                    Pendaftaran Dibuka
                  </span>
                </div>
              </div>

  
              {/* Title - Logo */}
              <div className="mb-4 -ml-6 sm:-ml-8 md:-ml-10">
                <img
                  src="https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1775466723/LOGO_BR2026_vbixvo.png"
                  alt="Bayan RUN 2026"
                  className="w-auto max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-64 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                />
              </div>

              {/* Tagline */}
              <p className="text-xl sm:text-2xl font-bold italic text-white/60 mb-8 tracking-widest uppercase">
                — The Biggest Running Event in{" "}
                <span className="text-yellow-400 not-italic">Kalimantan</span>
              </p>

              {/* Date & Location */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-lg font-medium">11 Oktober 2026</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-lg font-medium">Lapangan Merdeka 3, Balikpapan | BSCC Dome, Balikpapan</span>
                </div>
              </div>
              </div>

           <div className="w-full lg:w-[420px] flex-shrink-0">
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-2xl">
                {/* Card Badge */}
                <div className="inline-flex items-center gap-2 bg-red-700 rounded-full px-4 py-1 mb-5">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    Open Registration
                  </span>
                </div>
             

                <h2 className="text-2xl font-black text-white mb-2 leading-snug">
                  Secure Your Spot Early &<br />Get Exclusive Perks
                </h2>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Daftarkan diri sekarang dan dapatkan race pack eksklusif, finisher medal, dan berbagai hiburan lainnya !
                </p>

                {/* Details */}
                <div className="flex flex-col gap-2 mb-4 text-xs sm:text-sm">
                <CountdownTimer targetDate="2026-10-11T06:00:00" />
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full py-5 text-lg font-black tracking-widest uppercase
                    bg-blue-800 hover:bg-blue-700 active:bg-blue-700
                    border border-blue-400/30
                    rounded-xl
                    h-auto
                    shadow-[0_0_24px_rgba(59,130,246,0.5)]
                    hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]
                    transition-all duration-300
                    cursor-pointer"
                >
                  Daftar Sekarang
                </Button>
              </div>
            </div>
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