"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Workflow } from "lucide-react";
import { Button } from "../ui/button";

const slideImages = [
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765529/20251012070224_-_BOM_8032_qy3ajc.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765525/20251012064855_-_BOM_0690_f1v4kw.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765525/AR__4961_njqhws.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765516/20251012060936_-_BOM_7023_uzwd7f.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765516/DJI_20251012054325_0006_D_p3yx0k.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765513/20251012061749_-_BOM_0335_tssmcb.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765497/DJI_20251012090310_0032_D_nm8eit.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765514/20251012061107_-_BOM_7070_nah0u9.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765537/20251012065145_-_BOM_0769_xlklog.jpg",

];

export default function StackedSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const total = slideImages.length;

  const getOrder = (i: number, cur: number) =>
    (i - cur + total) % total;

  useEffect(() => {
    slidesRef.current.forEach((card, i) => {
      if (!card) return;
      const order = getOrder(i, current);
      gsap.set(card, {
        x: 0,
        y: order * 14,
        scale: 1 - order * 0.04,
        zIndex: total - order,
        opacity: order > 4 ? 0 : 1 - order * 0.15,
        rotateZ: order === 0 ? 0 : order % 2 === 0 ? order * 0.8 : -order * 0.8,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateToState = (nextCurrent: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    slidesRef.current.forEach((card, i) => {
      if (!card) return;
      const order = getOrder(i, nextCurrent);
      const isOutgoing = getOrder(i, current) === 0;

      if (isOutgoing) {
        gsap.to(card, {
          x: 600,
          y: -100,
          rotate: 20,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(card, {
              x: 0,
              y: order * 14,
              scale: 1 - order * 0.04,
              zIndex: total - order,
              opacity: order > 4 ? 0 : 1 - order * 0.15,
              rotateZ: order % 2 === 0 ? order * 0.8 : -order * 0.8,
              rotate: 0,
            });
          },
        });
      } else {
        gsap.to(card, {
          x: 0,
          y: order * 14,
          scale: 1 - order * 0.04,
          zIndex: total - order,
          opacity: order > 4 ? 0 : 1 - order * 0.15,
          rotateZ: order === 0 ? 0 : order % 2 === 0 ? order * 0.8 : -order * 0.8,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.1,
        });
      }
    });

    setTimeout(() => {
      setCurrent(nextCurrent);
      setIsAnimating(false);
    }, 600);
  };

  const moveNext = () => {
    if (isAnimating) return;
    animateToState((current + 1) % total);
  };

  const movePrev = () => {
    if (isAnimating) return;
    const prevCurrent = (current - 1 + total) % total;

    slidesRef.current.forEach((card, i) => {
      if (!card) return;
      const order = getOrder(i, prevCurrent);
      const isIncoming = getOrder(i, current) === total - 1;

      if (isIncoming) {
        gsap.fromTo(
          card,
          { x: -600, y: -100, rotate: -20, opacity: 0, scale: 0.8 },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            zIndex: total,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(card, {
          x: 0,
          y: order * 14,
          scale: 1 - order * 0.04,
          zIndex: total - order,
          opacity: order > 4 ? 0 : 1 - order * 0.15,
          rotateZ: order === 0 ? 0 : order % 2 === 0 ? order * 0.8 : -order * 0.8,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.05,
        });
      }
    });

    setTimeout(() => {
      setCurrent(prevCurrent);
      setIsAnimating(false);
    }, 600);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#f5f2ec] overflow-hidden relative">

      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-[11px] uppercase font-semibold tracking-[0.5em] text-blue-900/40 mb-3">
          Bayan Run 2025
        </p>
        <p className="text-4xl lg:text-6xl font-bold flex flex-wrap justify-center gap-3">
          <span className="text-blue-900">OUR</span>
          <span className="text-red-500">GALLERY</span>
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-amber-400" />
        <p className="text-blue-900/40 mt-4 text-sm font-semibold tracking-widest uppercase">
          Moment terbaik Bayan Run
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/gallery">
            <Button
              className="group flex items-center gap-2 px-6 h-11 border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white shadow-sm transition-all duration-300"
            >
              <Workflow className="w-4 h-4" />
              <span>Galeri</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div className="relative max-w-2xl mx-auto px-4">
        {/* Stack container */}
        <div className="relative h-[55svh] w-full">
          {slideImages.map((src, i) => (
            <div
              key={i}
              ref={(el) => { slidesRef.current[i] = el; }}
              className="slide absolute inset-0 rounded-2xl overflow-hidden shadow-xl cursor-pointer will-change-transform border border-black/5"
              onClick={moveNext}
            >
              <Image
                src={src}
                alt={`slide-${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {getOrder(i, current) === 0 && (
                <div className="absolute bottom-4 left-4 text-white/80 text-xs tracking-widest uppercase font-mono">
                  {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={movePrev}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {slideImages.map((_, i) => (
              <button
                key={i}
                onClick={() => !isAnimating && animateToState(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-blue-900"
                    : "w-2 h-2 bg-blue-900/20 hover:bg-blue-900/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={moveNext}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center font-semibold text-blue-900/30 text-xs mt-4 tracking-wider">
          Klik gambar untuk slide berikutnya
        </p>
      </div>
    </section>
  );
}