"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Play } from "lucide-react";

type Reel = {
  id: number;
  url: string;
  label: string;
  /** Path MP4 di /public, mis. "/reels/reel-1.mp4". Kosongkan untuk fallback iframe Instagram. */
  video?: string;
  /** Path poster/thumbnail, mis. "/reels/reel-1.jpg" */
  poster?: string;
};

const reels: Reel[] = [
  { id: 1, url: "https://www.instagram.com/p/DeZEv1UTZwU/", label: "Keep Moving, Keep Strong!" },
  { id: 2, url: "https://www.instagram.com/p/DeW5d1Wvgj8/", label: "Medal Show" },
  { id: 3, url: "https://www.instagram.com/p/DeVRWXpvRyu/", label: "Flag Of Moment" },
  { id: 4, url: "https://www.instagram.com/p/DeYTr8Av58z/", label: "Camera Sign!" },
  { id: 5, url: "https://www.instagram.com/p/DeYlEsEvsnW/", label: "The Spirit Of Bayan Run 2026" },
  // Contoh jika sudah punya file video:
  // { id: 1, url: "...", label: "...", video: "/reels/reel-1.mp4", poster: "/reels/reel-1.jpg" },
];

const total = reels.length;
const VIDEO_HEIGHT = 640;
const DEFAULT_EMBED_HEIGHT = 560;

function getOrder(i: number, cur: number) {
  return (i - cur + total) % total;
}

function getCardStyle(order: number): React.CSSProperties {
  const rot = order === 0 ? 0 : order % 2 === 0 ? order : -order;
  return {
    transform: `translateY(${order * 16}px) scale(${1 - order * 0.05}) rotateZ(${rot}deg)`,
    zIndex: total - order,
    opacity: order > 3 ? 0 : 1 - order * 0.2,
    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    willChange: order <= 1 ? "transform, opacity" : "auto",
  };
}

function getShortcode(url: string) {
  const m = url.match(/instagram\.com\/(?:p|reel|reels)\/([^/?#]+)/);
  return m?.[1] ?? "";
}

function Placeholder({ reel, index }: { reel: Reel; index: number }) {
  return (
    <div
      className="relative w-full h-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex flex-col items-center justify-center gap-4 rounded-2xl bg-cover bg-center"
      style={reel.poster ? { backgroundImage: `url(${reel.poster})` } : undefined}
    >
      {reel.poster && <div className="absolute inset-0 bg-black/40" aria-hidden="true" />}
      <div className="relative flex flex-col items-center gap-4">
        {reel.poster ? (
          <Play className="w-10 h-10 text-white/80" aria-hidden="true" />
        ) : (
          <Instagram className="w-8 h-8 text-white/30" aria-hidden="true" />
        )}
        <p className="text-white/80 text-sm font-semibold tracking-widest uppercase text-center px-6">
          {reel.label}
        </p>
        <p className="text-white/40 text-xs tracking-widest uppercase" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

function ActivePlayer({
  reel,
  iframeRef,
  iframeHeight,
}: {
  reel: Reel;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  iframeHeight: number;
}) {
  if (reel.video) {
    return (
      <video
        key={reel.video}
        className="w-full h-full object-cover bg-black rounded-2xl"
        src={reel.video}
        poster={reel.poster}
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controlsList="nodownload"
        title={reel.label}
      />
    );
  }

  const code = getShortcode(reel.url);
  return (
    <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
      <iframe
        ref={iframeRef}
        key={code}
        src={`https://www.instagram.com/p/${code}/embed/captioned/`}
        title={`${reel.label} — Bayan Run`}
        className="w-full bg-white border-0 block"
        style={{ height: iframeHeight }}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}

export default function ReelsSlider() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [exitDir, setExitDir] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [embedHeight, setEmbedHeight] = useState(DEFAULT_EMBED_HEIGHT);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Tinggi embed Instagram dikirim lewat postMessage { type: "MEASURE", details: { height } }
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!/instagram\.com$/.test(new URL(e.origin).hostname)) return;
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) return;

      let data: any = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (data?.type === "MEASURE" && typeof data.details?.height === "number") {
        setEmbedHeight(Math.ceil(data.details.height));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const triggerTransition = useCallback(
    (nextCurrent: number, dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setExiting(current);
      setExitDir(dir);
      setTimeout(() => {
        setExiting(null);
        setCurrent(nextCurrent);
        setEmbedHeight(DEFAULT_EMBED_HEIGHT);
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating, current]
  );

  const animateToNext = useCallback(
    () => triggerTransition((current + 1) % total, "next"),
    [current, triggerTransition]
  );
  const animateToPrev = useCallback(
    () => triggerTransition((current - 1 + total) % total, "prev"),
    [current, triggerTransition]
  );

  const activeReel = reels[current];
  const sliderHeight = activeReel.video ? VIDEO_HEIGHT : embedHeight;

  return (
    <section className="py-16 lg:py-24 bg-gray-200 overflow-hidden relative">
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
          className="relative w-full"
          style={{
            height: sliderHeight,
            contain: "layout style",
            transition: "height 0.3s ease",
          }}
          role="region"
          aria-label="Instagram Reels Bayan Run 2025"
          aria-roledescription="carousel"
        >
          {reels.map((reel, i) => {
            const isExiting = exiting === i;
            const order = getOrder(i, current);

            if (!isExiting && order > 3) return null;

            let style: React.CSSProperties = getCardStyle(order);

            if (isExiting) {
              style = {
                transform:
                  exitDir === "next"
                    ? "translateX(700px) translateY(-80px) rotate(18deg) scale(0.85)"
                    : "translateX(-700px) translateY(-80px) rotate(-18deg) scale(0.85)",
                zIndex: total + 1,
                opacity: 0,
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                willChange: "transform, opacity",
              };
            }

            const isActive = order === 0;

            return (
              <div
                key={reel.id}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-black"
                style={style}
                role={isActive ? "group" : "presentation"}
                aria-roledescription={isActive ? "slide" : undefined}
                aria-label={isActive ? `${reel.label} (${current + 1} dari ${total})` : undefined}
              >
                {isActive ? (
                  <ActivePlayer reel={reel} iframeRef={iframeRef} iframeHeight={embedHeight} />
                ) : (
                  <Placeholder reel={reel} index={i} />
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-14" role="group" aria-label="Kontrol reels">
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
                key={reel.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`${reel.label} (reel ${i + 1})`}
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
            onClick={animateToNext}
            disabled={isAnimating}
            aria-label="Reel berikutnya"
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-center font-semibold text-blue-900 text-sm mt-4 tracking-wide" aria-live="polite">
          {activeReel.label}
        </p>
        <p className="text-center text-blue-900/50 text-xs mt-1 tracking-wider">
          Gunakan tombol navigasi untuk berpindah reel
        </p>
      </div>
    </section>
  );
}