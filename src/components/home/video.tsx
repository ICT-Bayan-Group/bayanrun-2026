"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";

const reels = [
  { id: 1, url: "https://www.instagram.com/p/DPsUsweD0Kz/", label: "Let's Start The Journey" },
  { id: 2, url: "https://www.instagram.com/p/DPs74EVj869/", label: "Medal Show" },
  { id: 3, url: "https://www.instagram.com/p/DPyHnVPj0JA/", label: "Together, We Made It Happen" },
  { id: 4, url: "https://www.instagram.com/p/DPvriq0jyLN/", label: "Cheering Point Energy" },
  { id: 5, url: "https://www.instagram.com/p/DPw_f49k4-v/", label: "Satu Kata" },
];

const total = reels.length;

function getOrder(i: number, cur: number) {
  return (i - cur + total) % total;
}

function getCardStyle(order: number): React.CSSProperties {
  if (order > 3) {
    return {
      transform: `translateY(${order * 16}px) scale(${1 - order * 0.05}) rotateZ(${order % 2 === 0 ? order : -order}deg)`,
      zIndex: total - order,
      opacity: 0,
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    };
  }
  return {
    transform: `translateY(${order * 16}px) scale(${1 - order * 0.05}) rotateZ(${order === 0 ? 0 : order % 2 === 0 ? order : -order}deg)`,
    zIndex: total - order,
    opacity: 1 - order * 0.2,
    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
  };
}

export default function ReelsSlider() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [exitDir, setExitDir] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [processedIndexes, setProcessedIndexes] = useState<number[]>([0]);

  // Load Instagram embed script
  useEffect(() => {
    const existing = document.getElementById("ig-embed-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "ig-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => (window as any).instgrm?.Embeds.process();
      document.body.appendChild(script);
    } else {
      (window as any).instgrm?.Embeds.process();
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      (window as any).instgrm?.Embeds.process();
    }, 300);
    return () => clearTimeout(timeout);
  }, [processedIndexes]);

  const triggerTransition = (nextCurrent: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExiting(current);
    setExitDir(dir);
    setTimeout(() => {
      setExiting(null);
      setCurrent(nextCurrent);
      setIsAnimating(false);
      setProcessedIndexes((prev) =>
        prev.includes(nextCurrent) ? prev : [...prev, nextCurrent]
      );
    }, 500);
  };

  const animateToNext = () => triggerTransition((current + 1) % total, "next");
  const animateToPrev = () => triggerTransition((current - 1 + total) % total, "prev");

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
          <span className="text-red-700">REELS</span>
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-amber-400" />
        <p className="text-blue-900/70 mt-4 text-sm font-semibold tracking-widest uppercase">
          Momen terbaik Bayan Run di Instagram
        </p>
      </div>

      {/* Slider */}
      <div className="relative max-w-sm mx-auto px-4">
        <div className="relative h-[680px] w-full">
          {reels.map((reel, i) => {
            const isExiting = exiting === i;
            const order = getOrder(i, current);

            let style: React.CSSProperties = getCardStyle(order);

            if (isExiting) {
              style = {
                transform: exitDir === "next"
                  ? "translateX(700px) translateY(-80px) rotate(18deg) scale(0.85)"
                  : "translateX(-700px) translateY(-80px) rotate(-18deg) scale(0.85)",
                zIndex: total + 1,
                opacity: 0,
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              };
            }

            return (
              <div
                key={reel.id}
                className="absolute inset-0 rounded-2xl overflow-hidden will-change-transform"
                style={style}
              >
                {processedIndexes.includes(i) ? (
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={reel.url}
                    data-instgrm-version="14"
                    style={{
                      background: "#FFF",
                      border: 0,
                      borderRadius: "16px",
                      margin: 0,
                      padding: 0,
                      width: "100%",
                      minWidth: "unset",
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex flex-col items-center justify-center gap-4 rounded-2xl">
                    <Instagram className="w-8 h-8 text-white/30" />
                    <p className="text-white/60 text-sm font-semibold tracking-widest uppercase text-center px-6">
                      {reel.label}
                    </p>
                    <p className="text-white/30 text-xs tracking-widest uppercase">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Tap zones */}
          <button
            onClick={animateToPrev}
            disabled={isAnimating}
            aria-label="Previous"
            className="absolute left-0 top-0 w-14 h-full z-50 opacity-0 cursor-w-resize"
          />
          <button
            onClick={animateToNext}
            disabled={isAnimating}
            aria-label="Next"
            className="absolute right-0 top-0 w-14 h-full z-50 opacity-0 cursor-e-resize"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-14">
          <button
            onClick={animateToPrev}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2 items-center">
            {reels.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isAnimating || i === current) return;
                  i > current ? animateToNext() : animateToPrev();
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
            onClick={animateToNext}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center font-semibold text-blue-900 text-sm mt-4 tracking-wide">
          {reels[current].label}
        </p>
        <p className="text-center text-blue-900/50 text-xs mt-1 tracking-wider">
          Geser kiri / kanan atau gunakan tombol navigasi
        </p>
      </div>
    </section>
  );
}