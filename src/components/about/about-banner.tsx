"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Head from "next/head";

export default function AboutBanner() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const decorRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }

    const colors = ["#f59e0b", "#fcd34d", "#ffffff", "#d97706"];
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.1,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.0008;
        if (p.y < -10 || p.opacity <= 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.opacity = Math.random() * 0.6 + 0.1;
          p.vy = -Math.random() * 0.6 - 0.1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useGSAP(
    () => {
      gsap.set([titleRef.current, taglineRef.current, decorRef.current, scrollRef.current], {
        opacity: 0,
        y: 40,
        visibility: "hidden",
      });
      gsap.set(aboutRef.current, { opacity: 0, visibility: "hidden" });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(aboutRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          decorRef.current,
          { opacity: 1, y: 0, visibility: "visible", duration: 0.7, ease: "power3.out" },
          "-=0.2"
        )
        .to(
          titleRef.current,
          { opacity: 1, y: 0, visibility: "visible", duration: 0.9, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          taglineRef.current,
          { opacity: 1, y: 0, visibility: "visible", duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          scrollRef.current,
          { opacity: 1, y: 0, visibility: "visible", duration: 0.6, ease: "power2.out" },
          "-=0.1"
        );

      // Infinite scroll bounce
      gsap.to(".scroll-arrow", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // Subtle title shimmer loop
      gsap.to(".title-shimmer", {
        backgroundPosition: "200% center",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: aboutRef }
  );

  return (
    <>
      <Head>
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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700&display=swap');

          .title-shimmer {
            background: linear-gradient(
              90deg,
              #ffffff 0%,
              #fcd34d 30%,
              #f59e0b 50%,
              #fcd34d 70%,
              #ffffff 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .year-stroke {
            -webkit-text-stroke: 1.5px rgba(245, 158, 11, 0.6);
            color: transparent;
          }

          .line-accent {
            background: linear-gradient(90deg, transparent, #f59e0b, #fcd34d, #f59e0b, transparent);
          }

          @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; transform: scaleX(1); }
            50% { opacity: 1; transform: scaleX(1.05); }
          }

          .glow-line {
            animation: pulse-glow 2.5s ease-in-out infinite;
          }

          .corner-decor {
            position: absolute;
            width: 60px;
            height: 60px;
            border-color: rgba(245, 158, 11, 0.5);
            border-style: solid;
          }
          .corner-tl { top: 32px; left: 32px; border-width: 2px 0 0 2px; }
          .corner-tr { top: 32px; right: 32px; border-width: 2px 2px 0 0; }
          .corner-bl { bottom: 32px; left: 32px; border-width: 0 0 2px 2px; }
          .corner-br { bottom: 32px; right: 32px; border-width: 0 2px 2px 0; }
        `}</style>
      </Head>

      <section
        ref={aboutRef}
        className="relative flex items-center justify-center text-white overflow-hidden min-h-screen bg-black"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {/* Video Background */}
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

        {/* Gradient overlays — layered for cinematic depth */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.75) 100%)" }} />
        {/* Side vignette */}
        <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
        {/* Warm amber grade from below */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(180,83,9,0.18) 0%, transparent 50%)" }} />

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

        {/* Corner decorations */}
        <div className="corner-decor corner-tl z-30" />
        <div className="corner-decor corner-tr z-30" />
        <div className="corner-decor corner-bl z-30" />
        <div className="corner-decor corner-br z-30" />

        {/* Main Content */}
        <div ref={contentRef} className="relative z-30 text-center px-6 max-w-6xl mx-auto w-full">

          {/* Top label */}
          <div ref={decorRef} className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 sm:w-24 line-accent glow-line" />
            <span
              className="text-xs sm:text-sm tracking-[0.35em] uppercase text-yellow-400 font-semibold"
              style={{ letterSpacing: "0.3em" }}
            >
              Bayan Run
            </span>
            <div className="h-px w-16 sm:w-24 line-accent glow-line" />
          </div>

          {/* Main title */}
          <h1
            ref={titleRef}
            style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 0.92 }}
            className="text-[clamp(3.5rem,12vw,10rem)] font-normal mb-2 tracking-tight select-none"
          >
            <span className="block title-shimmer">ABOUT</span>
            <span className="block year-stroke text-[clamp(3rem,10vw,8rem)] leading-none">
              2026
            </span>
          </h1>

          {/* Accent line */}
          <div className="my-6 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4))" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.4), transparent)" }} />
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-[clamp(1rem,3.5vw,2.2rem)] font-semibold tracking-[0.25em] uppercase mb-8"
            style={{ color: "#fde68a", letterSpacing: "0.25em" }}
          >
            Keep Moving,{" "}
            <span className="text-white">Keep Strong</span>
          </p>

          {/* Sub-description */}
          <p
            className="text-sm sm:text-base text-white/60 max-w-md mx-auto leading-relaxed font-light"
            style={{ letterSpacing: "0.05em" }}
          >
            Sebuah perjalanan penuh semangat — merayakan tekad, kebersamaan,
            dan kekuatan yang ada dalam diri kita semua.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <div className="scroll-arrow w-5 h-5 border-r-2 border-b-2 border-yellow-500/60 rotate-45" />
        </div>
      </section>
    </>
  );
}