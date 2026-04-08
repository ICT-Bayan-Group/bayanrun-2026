"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  // Ticker — pakai useEffect sama persis seperti VideoSection
  useEffect(() => {
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    if (topText && bottomText) {
      // Top: kiri ke kanan — sama seperti VideoSection
      gsap.fromTo(topText,
        { x: "-50%" },
        { x: "0%", duration: 20, ease: "none", repeat: -1 }
      );

      // Bottom: kanan ke kiri — sama seperti VideoSection
      gsap.fromTo(bottomText,
        { x: "0%" },
        { x: "-50%", duration: 20, ease: "none", repeat: -1 }
      );
    }

    return () => {
      gsap.killTweensOf([topTextRef.current, bottomTextRef.current]);
    };
  }, []);

  // Hero scroll trigger — tidak diubah
  useGSAP(
    () => {
      const elements = sectionRef.current?.querySelectorAll(".animate-group");
      gsap.from(elements as NodeListOf<HTMLElement>, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        filter: "blur(6px)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative flex flex-col overflow-hidden">

      {/* ── Hero video — tidak diubah sama sekali ── */}
      <div className="relative min-h-screen -mt-28 lg:mt-0 flex justify-center items-center text-white font-extralight px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(4px) brightness(0.45)", transform: "scale(1.05)" }}
          src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto/f_auto/v1775095878/about-video_pmag3j.mp4"
        />
        <div className="text-center max-w-3xl w-full -mt-12 sm:-mt-8 md:-mt-4 lg:mt-0 relative z-10">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed sm:leading-relaxed md:leading-snug lg:leading-snug mx-auto flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 text-center">
            <span className="animate-group">BAYAN RUN 2026,</span>
            <span className="animate-group">THE</span>
            <span className="animate-group">BIGGEST</span>
            <span className="animate-group">RUNNING</span>
            <span className="animate-group">EVENT</span>
            <span className="animate-group">IN</span>
            <span className="animate-group">KALIMANTAN</span>
          </p>
        </div>
      </div>

      {/* ── Top ticker — putih, biru, sama persis struktur VideoSection ── */}
      <div className="relative bg-white py-6 md:py-8 overflow-hidden">
        <div
          ref={topTextRef}
          className="flex whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-blue-900 tracking-tight uppercase mx-8">
                THE NEXT LEVEL
              </span>
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-blue-900 mx-4">•</span>
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-red-600 tracking-tight uppercase mx-8">
                KEEP MOVING KEEP STRONG
              </span>
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-red-900 mx-4">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom ticker — biru gelap, putih, sama persis struktur VideoSection ── 
      <div className="relative bg-blue-900 py-6 md:py-8 overflow-hidden">
        <div
          ref={bottomTextRef}
          className="flex whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-amber-500 tracking-tight uppercase mx-8">
                THE NEXT LEVEL
              </span>
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-white mx-4">•</span>
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight uppercase mx-8">
                KEEP MOVING KEEP STRONG
              </span>
              <span className="text-3xl md:text-5xl lg:text-7xl font-black text-white mx-4">•</span>
            </div>
          ))}
        </div>
      </div>*/}

    </section>
  );
}