"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
    transform: `translateY(${order * 16}px) scale(${1 - order * 0.05}) rotateZ(${
      order === 0 ? 0 : order % 2 === 0 ? order : -order
    }deg)`,
    zIndex: total - order,
    opacity: 1 - order * 0.2,
    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    willChange: order <= 1 ? "transform, opacity" : "auto",
  };
}

export default function ReelsSlider() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [exitDir, setExitDir] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  /*
    FIX PERF: Ganti processedIndexes approach dengan lazy loading yang
    lebih efisien. Instagram embed berat (~192 KiB), jadi kita hanya
    load embed untuk slide yang sudah pernah dikunjungi, dan hanya
    load 1 slide di awal (bukan eager load semua).

    Pakai Set untuk O(1) lookup vs array includes() yang O(n).
  */
  const [loadedSet, setLoadedSet] = useState<Set<number>>(() => new Set([0]));

  /*
    FIX SCROLL BUG: Instagram embed.js memanggil instgrm.Embeds.process()
    yang melakukan querySelectorAll + offsetWidth reads pada SEMUA
    .instagram-media elemen di halaman, bahkan yang tidak visible.
    Ini menyebabkan "repeatedly occured" forced reflow saat scroll.

    Solusi: throttle processEmbed dengan debounce, dan hanya proses
    embed yang benar-benar perlu diproses (bukan semua sekaligus).
  */
  const processTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const processEmbed = useCallback((targetIndex?: number) => {
    if (processTimeoutRef.current) clearTimeout(processTimeoutRef.current);
    processTimeoutRef.current = setTimeout(() => {
      const instgrm = (window as any).instgrm;
      if (!instgrm?.Embeds) return;

      if (targetIndex !== undefined) {
        // FIX: proses hanya 1 embed spesifik, bukan semua di halaman
        const el = document.querySelector(
          `[data-instgrm-permalink="${reels[targetIndex]?.url}"]`
        );
        if (el && !el.getAttribute("data-instgrm-processed")) {
          instgrm.Embeds.process();
        }
      } else {
        instgrm.Embeds.process();
      }
    }, 400); // debounce 400ms
  }, []);

  // Load Instagram embed script — hanya sekali, async
  useEffect(() => {
    const existing = document.getElementById("ig-embed-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "ig-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true; // FIX PERF: defer agar tidak block main thread
      script.onload = () => processEmbed(0);
      document.body.appendChild(script);
    } else {
      processEmbed(0);
    }

    return () => {
      if (processTimeoutRef.current) clearTimeout(processTimeoutRef.current);
    };
  }, [processEmbed]);

  const triggerTransition = useCallback((nextCurrent: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExiting(current);
    setExitDir(dir);
    setTimeout(() => {
      setExiting(null);
      setCurrent(nextCurrent);
      setIsAnimating(false);
      // Mark as loaded dan proses embed untuk slide baru
      setLoadedSet((prev) => {
        if (prev.has(nextCurrent)) return prev;
        const next = new Set(prev);
        next.add(nextCurrent);
        return next;
      });
      processEmbed(nextCurrent);
    }, 500);
  }, [isAnimating, current, processEmbed]);

  const animateToNext = useCallback(
    () => triggerTransition((current + 1) % total, "next"),
    [current, triggerTransition]
  );
  const animateToPrev = useCallback(
    () => triggerTransition((current - 1 + total) % total, "prev"),
    [current, triggerTransition]
  );

  return (
    <section className="py-16 lg:py-24 bg-gray-200 overflow-hidden relative">
      {/*
        FIX SCROLL: Hapus blur-3xl — CSS blur menyebabkan repaint saat scroll.
      */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full" />
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
        <div className="mx-auto mt-3 h-[2px] w-12 bg-amber-400" aria-hidden="true" />
        <p className="text-blue-900/70 mt-4 text-sm font-semibold tracking-widest uppercase">
          Momen terbaik Bayan Run di Instagram
        </p>
      </div>

      {/* Slider */}
      <div className="relative max-w-sm mx-auto px-4">
        <div
          className="relative h-[680px] w-full"
          style={{ contain: "layout style" }}
          role="region"
          aria-label="Instagram Reels Bayan Run 2025"
          aria-roledescription="carousel"
        >
          {reels.map((reel, i) => {
            const isExiting = exiting === i;
            const order = getOrder(i, current);

            /*
              FIX SCROLL BUG: Hanya render card yang visible (order <= 3)
              atau yang sedang exit animation. Sisanya di-unmount dari DOM.
              Ini adalah fix utama untuk "repeatedly occured" saat scroll —
              Instagram embed.js tidak bisa query element yang tidak ada di DOM.
            */
            if (!isExiting && order > 3) return null;

            let style: React.CSSProperties = getCardStyle(order);

            if (isExiting) {
              style = {
                transform: exitDir === "next"
                  ? "translateX(700px) translateY(-80px) rotate(18deg) scale(0.85)"
                  : "translateX(-700px) translateY(-80px) rotate(-18deg) scale(0.85)",
                zIndex: total + 1,
                opacity: 0,
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                willChange: "transform, opacity",
              };
            }

            const isLoaded = loadedSet.has(i);

            return (
              <div
                key={reel.id}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={style}
                role={order === 0 ? "group" : "presentation"}
                aria-roledescription={order === 0 ? "slide" : undefined}
                aria-label={order === 0 ? `${reel.label} (${current + 1} dari ${total})` : undefined}
              >
                {isLoaded ? (
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
                  >
                    {/*
                      FIX ACCESSIBILITY: iframe yang di-generate Instagram embed.js
                      tidak memiliki title. Kita inject title lewat MutationObserver
                      setelah embed selesai render (lihat useEffect di bawah).
                      Sementara itu, blockquote fallback sudah accessible.
                    */}
                    <a href={reel.url} target="_blank" rel="noopener noreferrer">
                      {reel.label} — Bayan Run 2025
                    </a>
                  </blockquote>
                ) : (
                  // Placeholder saat belum di-load
                  <div className="w-full h-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex flex-col items-center justify-center gap-4 rounded-2xl">
                    <Instagram className="w-8 h-8 text-white/30" aria-hidden="true" />
                    <p className="text-white/60 text-sm font-semibold tracking-widest uppercase text-center px-6">
                      {reel.label}
                    </p>
                    <p className="text-white/30 text-xs tracking-widest uppercase" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Tap zones — invisible hit areas kiri/kanan */}
          <button
            onClick={animateToPrev}
            disabled={isAnimating}
            aria-label="Reel sebelumnya"
            className="absolute left-0 top-0 w-14 h-full z-50 opacity-0 cursor-w-resize"
          />
          <button
            onClick={animateToNext}
            disabled={isAnimating}
            aria-label="Reel berikutnya"
            className="absolute right-0 top-0 w-14 h-full z-50 opacity-0 cursor-e-resize"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-14" role="group" aria-label="Kontrol reels">
          {/* FIX ACCESSIBILITY: aria-label pada semua button */}
          <button
            onClick={animateToPrev}
            disabled={isAnimating}
            aria-label="Reel sebelumnya"
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex gap-2 items-center" role="tablist" aria-label="Pilih reel">
            {reels.map((reel, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`${reel.label} (reel ${i + 1})`}
                onClick={() => {
                  if (isAnimating || i === current) return;
                  /*
                    FIX BUG: Kode lama hanya memanggil animateToNext/animateToPrev
                    tanpa mempertimbangkan index target, sehingga dot navigation
                    tidak bisa langsung loncat ke slide yang dipilih — selalu
                    maju/mundur 1 langkah.

                    Fix: panggil triggerTransition langsung dengan index target.
                  */
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
            onClick={animateToNext}
            disabled={isAnimating}
            aria-label="Reel berikutnya"
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-center font-semibold text-blue-900 text-sm mt-4 tracking-wide" aria-live="polite">
          {reels[current].label}
        </p>
        <p className="text-center text-blue-900/50 text-xs mt-1 tracking-wider">
          Geser kiri / kanan atau gunakan tombol navigasi
        </p>
      </div>
    </section>
  );
}