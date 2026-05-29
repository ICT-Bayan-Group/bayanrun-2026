"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const total = slideImages.length;

function getOrder(i: number, cur: number) {
  return (i - cur + total) % total;
}

function getCardStyle(order: number): React.CSSProperties {
  if (order > 4) {
    return {
      transform: `translateY(${order * 14}px) scale(${1 - order * 0.04}) rotateZ(${order % 2 === 0 ? order * 0.8 : -order * 0.8}deg)`,
      zIndex: total - order,
      opacity: 0,
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    };
  }
  return {
    transform: `translateY(${order * 14}px) scale(${1 - order * 0.04}) rotateZ(${order === 0 ? 0 : order % 2 === 0 ? order * 0.8 : -order * 0.8}deg)`,
    zIndex: total - order,
    opacity: 1 - order * 0.15,
    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
  };
}

export default function StackedSlider() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [exitDir, setExitDir] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerTransition = (nextCurrent: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExiting(current);
    setExitDir(dir);
    setTimeout(() => {
      setExiting(null);
      setCurrent(nextCurrent);
      setIsAnimating(false);
    }, 500);
  };

  const moveNext = () => triggerTransition((current + 1) % total, "next");
  const movePrev = () => triggerTransition((current - 1 + total) % total, "prev");

  return (
    <section className="py-16 lg:py-24 bg-gray-200 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-[15px] uppercase font-semibold tracking-[0.5em] text-blue-900/70 mb-3">
          Bayan Run 2025
        </p>
        <p className="text-4xl lg:text-6xl font-bold flex flex-wrap justify-center gap-3">
          <span className="text-blue-900">OUR</span>
          <span className="text-red-700">GALLERY</span>
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-amber-400" />
        <p className="text-blue-900/70 mt-4 text-sm font-semibold tracking-widest uppercase">
          Moment terbaik Bayan Run
        </p>
      </div>

      {/* Slider */}
      <div className="relative max-w-2xl mx-auto px-4">
        <div className="relative h-[55svh] w-full">
          {slideImages.map((src, i) => {
            const isExiting = exiting === i;
            const order = getOrder(i, current);

            let style: React.CSSProperties = getCardStyle(order);

            if (isExiting) {
              style = {
                transform: exitDir === "next"
                  ? "translateX(600px) translateY(-100px) rotate(20deg) scale(0.8)"
                  : "translateX(-600px) translateY(-100px) rotate(-20deg) scale(0.8)",
                zIndex: total + 1,
                opacity: 0,
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              };
            }

            return (
              <div
                key={i}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl cursor-pointer will-change-transform border border-black/5"
                style={style}
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
                {order === 0 && !isExiting && (
                  <div className="absolute bottom-4 left-4 text-white/80 text-xs tracking-widest uppercase font-mono">
                    {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </div>
                )}
              </div>
            );
          })}
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

          <div className="flex gap-2 items-center">
            {slideImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isAnimating || i === current) return;
                  triggerTransition(i, i > current ? "next" : "prev");
                }}
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

        <p className="text-center font-semibold text-blue-900/70 text-xs mt-4 tracking-wider">
          Klik gambar untuk slide berikutnya
        </p>
      </div>
    </section>
  );
}