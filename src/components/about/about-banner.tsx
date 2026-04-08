"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Head from "next/head";

export default function AboutBanner() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
      <Head>
        {/* Preload video and poster for instant rendering */}
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto/f_auto/v1775095878/about-video_pmag3j.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dgcedsrzf/image/upload/v1761553124/about-video_jukfvo_poster.jpg"
        />
      </Head>

      <section
        ref={aboutRef}
        className="relative flex items-center justify-center text-white overflow-hidden min-h-screen bg-black"
      >
        {/* 🎥 Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto/f_auto/v1775095878/about-video_pmag3j.mp4"
          poster="https://res.cloudinary.com/dgcedsrzf/image/upload/v1761553124/about-video_jukfvo_poster.jpg"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          disableRemotePlayback
        />

        {/* Overlay semi-transparan */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* Konten di atas video */}
        <div ref={contentRef} className="relative z-20 text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 tracking-tight">
            ABOUT BAYAN RUN 2026
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-10 tracking-wide">
            THE NEXT LEVEL
          </p>
        </div>
      </section>
    </>
  );
}
