"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const GALLERY_URL = "https://ambilfoto.id";
const AMBILFOTO_LOGO =
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790643645/ambilfoto-logo_in2s7b.png";

const slideImages = [
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630023/DJI_20251012054325_0006_D_p3yx0k_edwqb7_o7dwzn.webp",
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630020/20251012060936_-_BOM_7023_uzwd7f_6_11zon_jtyqr0_jsjbnm.webp",
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630073/20251012062146_-_BOM_0444_ipz7s9.jpg",
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630023/DJI_20251012054325_0006_D_p3yx0k_edwqb7_o7dwzn.webp",
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630019/DJI_20251012090310_0032_D_nm8eit_3_11zon_tqey3t_ba9jkq.webp",
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630019/20251012061107_-_BOM_7070_nah0u9_2_11zon_qaipyv_nvju70.webp",
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630019/20251012070224_-_BOM_8032_qy3ajc_9_11zon_w2cbpi_od1l7e.webp",
];

const total = slideImages.length;

function getOrder(i: number, cur: number) {
  return (i - cur + total) % total;
}

function getCardStyle(order: number): React.CSSProperties {
  return {
    transform: `translateY(${order * 14}px) scale(${1 - order * 0.04}) rotateZ(${
      order === 0 ? 0 : order % 2 === 0 ? order * 0.8 : -order * 0.8
    }deg)`,
    zIndex: total - order,
    opacity: 1 - order * 0.15,
    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    willChange: order <= 1 ? "transform, opacity" : "auto",
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
          <span className="text-red-700">GALLERY</span>
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-amber-400" aria-hidden="true" />
        <p className="text-blue-900/70 mt-4 text-sm font-semibold tracking-widest uppercase">
          Moment terbaik Bayan Run
        </p>

        {/* CTA: logo AmbilFoto */}
        <div className="flex justify-center mt-8 px-4">
          <a
            href={GALLERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ambil fotomu di AmbilFoto.id"
            className="group inline-flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200"
          >
            <Image
              src={AMBILFOTO_LOGO}
              alt="AmbilFoto.id"
              width={120}
              height={120}
              className="h-9 w-auto object-contain"
            />
            <span className="text-sm sm:text-base font-bold tracking-wide text-gray-500 group-hover:text-blue-900 transition-colors">
              Ambil Fotomu
            </span>
            <ArrowRight
              className="w-4 h-4 text-gray-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all duration-300"
              aria-hidden="true"
            />
            <span className="sr-only"> (buka di tab baru)</span>
          </a>
        </div>
      </div>

      {/* Slider */}
      <div className="relative max-w-2xl mx-auto px-4">
        <div
          className="relative h-[55svh] w-full"
          style={{ contain: "layout style" }}
          role="region"
          aria-label="Gallery foto Bayan Run 2025"
          aria-roledescription="carousel"
        >
          {slideImages.map((src, i) => {
            const isExiting = exiting === i;
            const order = getOrder(i, current);

            if (!isExiting && order > 4) return null;

            let style: React.CSSProperties = getCardStyle(order);

            if (isExiting) {
              style = {
                transform:
                  exitDir === "next"
                    ? "translateX(600px) translateY(-100px) rotate(20deg) scale(0.8)"
                    : "translateX(-600px) translateY(-100px) rotate(-20deg) scale(0.8)",
                zIndex: total + 1,
                opacity: 0,
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                willChange: "transform, opacity",
              };
            }

            return (
              <div
                key={i}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl cursor-pointer border border-black/5"
                style={style}
                onClick={moveNext}
                role={order === 0 ? "group" : "presentation"}
                aria-roledescription={order === 0 ? "slide" : undefined}
                aria-label={order === 0 ? `Foto ${current + 1} dari ${total}` : undefined}
                tabIndex={order === 0 ? 0 : -1}
              >
                <Image
                  src={src}
                  alt={`Foto Bayan Run 2025 nomor ${i + 1}`}
                  fill
                  loading={order <= 1 ? "eager" : "lazy"}
                  priority={order === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {order === 0 && !isExiting && (
                  <div
                    className="absolute bottom-4 left-4 text-white/80 text-xs tracking-widest uppercase font-mono"
                    aria-hidden="true"
                  >
                    {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div
          className="flex items-center justify-center gap-4 mt-10"
          role="group"
          aria-label="Kontrol gallery"
        >
          <button
            onClick={movePrev}
            disabled={isAnimating}
            aria-label="Foto sebelumnya"
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex gap-2 items-center" role="tablist" aria-label="Pilih foto">
            {slideImages.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Foto ${i + 1}`}
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
            aria-label="Foto berikutnya"
            className="w-12 h-12 rounded-full border border-blue-900/20 bg-white hover:bg-blue-900 text-blue-900 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 disabled:opacity-40 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-center font-semibold text-blue-900/70 text-xs mt-4 tracking-wider">
          Klik gambar untuk slide berikutnya
        </p>
      </div>
    </section>
  );
}