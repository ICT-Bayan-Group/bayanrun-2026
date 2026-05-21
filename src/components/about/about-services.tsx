"use client";

import {
  Award, Clock, Users,
  AlertCircle, CheckCircle, Zap, Shield, ChevronRight, Timer, Package,
} from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLUE        = "#1D5FD4";
const BLUE_BG     = "#EEF4FF";
const BLUE_BORDER = "#C5D9F8";
const BLUE_TEXT   = "#0C3E9B";
const RED         = "#DC2626";
const RED_TEXT    = "#991B1B";
const RED_BG      = "#FEF2F2";
const RED_BORDER  = "#FECACA";
const BEBAS       = "'Bebas Neue', Arial Black, sans-serif";

const VIDEO_SRC = "https://res.cloudinary.com/djs5pi7ev/video/upload/v1775095878/about-video_pmag3j.mp4";

const categories = [
  { title: "Half Marathon", sub: "21K",    age: "17+ tahun",   cutoff: "4 Jam",    color: BLUE,      textColor: BLUE_TEXT, bg: BLUE_BG,    border: BLUE_BORDER, tags: ["Nasional", "Medal", "Finisher Shirt"], num: "01" },
  { title: "10K Run",       sub: "10K",    age: "17+ tahun",   cutoff: "2 Jam",    color: "#0E7ABF", textColor: "#094F80", bg: "#E6F4FD",  border: "#A8D8F5",   tags: ["Nasional", "Medal"],                    num: "02" },
  { title: "5K Run",        sub: "5K",     age: "17+ tahun",   cutoff: "1 Jam",    color: "#0B6B8A", textColor: "#073E50", bg: "#E3F2F7",  border: "#9CD3E4",   tags: ["Nasional", "Medal"],                    num: "03" },
  { title: "5K Teenagers",  sub: "Remaja", age: "13–16 tahun", cutoff: "1 Jam",    color: "#2F4FB8", textColor: "#1A2E7A", bg: "#EEF0FF",  border: "#BCC5F4",   tags: ["Remaja", "Medal"],                      num: "04" },
  { title: "2.5K Kids",     sub: "Anak",   age: "6–12 tahun",  cutoff: "50 Menit", color: RED,       textColor: RED_TEXT,  bg: RED_BG,     border: RED_BORDER,  tags: ["Anak-anak", "Medal"],                   num: "05" },
];

const importantRules = [
  { icon: AlertCircle, title: "Non-Refundable",  desc: "Biaya pendaftaran tidak dapat dikembalikan dalam kondisi apapun", color: BLUE,      bg: BLUE_BG,   tag: "CRITICAL" },
  { icon: Users,       title: "Verifikasi Usia", desc: "Penyelenggara berhak memverifikasi usia peserta kapan saja",     color: "#0E7ABF", bg: "#E6F4FD", tag: "WARNING"  },
  { icon: Shield,      title: "RegNowOnline",    desc: "Pendaftaran hanya melalui website resmi bayanrun.com",           color: "#2F4FB8", bg: "#EEF0FF", tag: "INFO"     },
  { icon: Clock,       title: "Cut-Off Time",    desc: "Wajib finish sebelum waktu COT untuk mendapat medali",           color: "#0B6B8A", bg: "#E3F2F7", tag: "REQUIRED" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useBayanFont() {
  useEffect(() => {
    if (document.getElementById("bayan-run-font")) return;
    const link = document.createElement("link");
    link.id = "bayan-run-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatusBadge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase",
      color, background: bg, border: `1px solid ${border}`,
      borderRadius: 3, padding: "2px 8px",
    }}>
      {label}
    </span>
  );
}

function SL({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 3, height: 17, background: BLUE, borderRadius: 2 }} />
      <span style={{ fontFamily: BEBAS, fontSize: 14, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8E9BAE" }}>
        {children}
      </span>
    </div>
  );
}

function PanelHeader({ icon, bg, color, border, label }: { icon: React.ReactNode; bg: string; color: string; border: string; label: string }) {
  return (
    <div style={{ padding: "10px 16px", background: bg, borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 26, height: 26, borderRadius: 6, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: BEBAS, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color, margin: 0 }}>
        {label}
      </h3>
    </div>
  );
}

function BulletList({ items, color }: { items: string[]; color: string }) {
  return (
    <div style={{ padding: "4px 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", padding: "8px 16px", borderBottom: i < items.length - 1 ? "1px solid #F0F4FA" : "none" }}>
          <ChevronRight size={12} color={color} style={{ marginTop: 3, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Category Card (mobile view) ─────────────────────────────────────────────
function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  return (
    <div style={{
      background: "#fff",
      border: `1px solid #DDEAF8`,
      borderLeft: `4px solid ${cat.color}`,
      borderRadius: 10,
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 4, padding: "2px 9px" }}>
            <span style={{ fontFamily: BEBAS, fontSize: 12, color: cat.textColor, letterSpacing: "0.08em" }}>{cat.sub}</span>
          </div>
          <span style={{ fontFamily: BEBAS, fontSize: 17, letterSpacing: "0.01em", color: "#111" }}>{cat.title}</span>
        </div>
        <span style={{ fontFamily: BEBAS, fontSize: 11, color: "#BCC8DC" }}>{cat.num}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#778" }}>
          <Users size={11} />{cat.age}
        </span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 6, padding: "4px 10px" }}>
          <Timer size={12} color={cat.color} />
          <span style={{ fontFamily: BEBAS, fontSize: 14, letterSpacing: "0.04em", color: cat.textColor }}>COT {cat.cutoff}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {cat.tags.map((tag, j) => (
          <span key={j} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8E9BAE", border: "1px solid #D8E4F5", borderRadius: 3, padding: "2px 7px", background: "#F4F7FB" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BayanRunInfo() {
  useBayanFont();
  const isMobile = useIsMobile(640);
  const isTablet = useIsMobile(900);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const topTextRef   = useRef<HTMLDivElement>(null);
  const rulesRef     = useRef<HTMLDivElement>(null);
  const catsRef      = useRef<HTMLDivElement>(null);
  const regRef       = useRef<HTMLDivElement>(null);

  // Desktop cols
  const catDesktopCols = "36px 76px 1fr 120px 100px 1fr";
  const catTabletCols  = "36px 76px 1fr 100px";
  const catMobileCols  = "none"; // card mode on mobile

  const cotDesktopCols = "36px 76px 1fr 120px 110px";
  const cotTabletCols  = "36px 76px 1fr 110px";

  // ── Banner-style ticker animation ──────────────────────────────────────────
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

  // ── Scroll-triggered animations ────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll<HTMLElement>(".ltr");
        gsap.set(letters, { opacity: 0, y: 90, rotateX: -75 });
        gsap.to(letters, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.038, ease: "back.out(1.6)" });
      }
      if (rulesRef.current) {
        const cards = rulesRef.current.querySelectorAll<HTMLElement>(".rule-card");
        gsap.set(cards, { opacity: 0, y: 44 });
        ScrollTrigger.create({
          trigger: rulesRef.current, start: "top 82%", once: true,
          onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: "power3.out" }),
        });
      }
      if (catsRef.current) {
        const rows = catsRef.current.querySelectorAll<HTMLElement>(".cat-row");
        gsap.set(rows, { opacity: 0, x: -55 });
        ScrollTrigger.create({
          trigger: catsRef.current, start: "top 82%", once: true,
          onEnter: () => gsap.to(rows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }),
        });
      }
      if (regRef.current) {
        const panels = regRef.current.querySelectorAll<HTMLElement>(".reg-panel");
        gsap.set(panels, { opacity: 0, y: 38 });
        ScrollTrigger.create({
          trigger: regRef.current, start: "top 82%", once: true,
          onEnter: () => gsap.to(panels, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out" }),
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const onCatEnter = (el: HTMLElement, color: string) => {
    gsap.to(el, { x: 9, duration: 0.2, ease: "power2.out" });
    el.style.borderLeftColor = color;
    el.style.backgroundColor = color + "0C";
    containerRef.current?.querySelectorAll<HTMLElement>(".cat-row").forEach((row) => {
      if (row !== el) gsap.to(row, { opacity: 0.32, duration: 0.18 });
    });
    const num = el.querySelector<HTMLElement>(".cat-num");
    if (num) { num.style.color = color; gsap.to(num, { scale: 1.12, duration: 0.2, ease: "power2.out" }); }
  };

  const onCatLeave = (el: HTMLElement) => {
    gsap.to(el, { x: 0, duration: 0.2, ease: "power2.out" });
    el.style.borderLeftColor = "#D8E4F5";
    el.style.backgroundColor = "#fff";
    containerRef.current?.querySelectorAll<HTMLElement>(".cat-row").forEach((row) => gsap.to(row, { opacity: 1, duration: 0.18 }));
    const num = el.querySelector<HTMLElement>(".cat-num");
    if (num) { num.style.color = "#BCC8DC"; gsap.to(num, { scale: 1, duration: 0.2, ease: "power2.out" }); }
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "#F4F7FB",
        color: "#111",
        fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflowX: "hidden",
      }}
    >

      {/* ── HERO with video background ── */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 480,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Background video */}
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.58)", zIndex: 1,
          pointerEvents: "none",
        }} />
        {/* Grid overlay — only on desktop */}
        {!isMobile && (
          <div style={{
            position: "absolute", top: 0, right: 0, width: "52%", height: "100%",
            background: `repeating-linear-gradient(90deg,transparent,transparent 54px,${BLUE}09 54px,${BLUE}09 55px)`,
            pointerEvents: "none", zIndex: 2,
          }} />
        )}

        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          padding: "0 clamp(16px, 4vw, 40px)",
        }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: BEBAS,
              fontSize: "clamp(52px, 11vw, 108px)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "0.01em",
              margin: "0 0 18px",
              textTransform: "uppercase",
              perspective: "700px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 6px",
              color: "#fff",
            }}
          >
            {"BAYAN RUN 2026".split("").map((c, i) =>
              c === " " ? <span key={i} style={{ display: "inline-block", width: isMobile ? 10 : 18 }} /> : (
                <span key={i} className="ltr" style={{ display: "inline-block", color: i < 5 ? BLUE : "#fff" }}>
                  {c}
                </span>
              )
            )}
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isMobile ? 10 : 13,
            color: "#ffffff",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            margin: 0,
            textAlign: "center",
          }}>
            Informasi & Ketentuan Lomba · Balikpapan, Kalimantan Timur
          </p>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="relative bg-gray-200 py-4 md:py-6 lg:py-8 overflow-hidden">
        <div
          ref={topTextRef}
          className="flex whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <span className="text-2xl md:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight uppercase mx-6 md:mx-8">
                THE NEXT LEVEL
              </span>
              <span className="text-2xl md:text-4xl lg:text-7xl font-black text-blue-900 mx-3 md:mx-4">•</span>
              <span className="text-2xl md:text-4xl lg:text-5xl font-black text-red-600 tracking-tight uppercase mx-6 md:mx-8">
                KEEP MOVING KEEP STRONG
              </span>
              <span className="text-2xl md:text-4xl lg:text-7xl font-black text-red-600 mx-3 md:mx-4">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: `0 clamp(16px, 4vw, 40px)` }}>

        {/* ── NOTICE ── */}
        <div style={{
          margin: isMobile ? "32px 0" : "52px 0",
          border: `1px solid ${BLUE_BORDER}`, borderLeft: `4px solid ${BLUE}`,
          borderRadius: 10, padding: isMobile ? "16px 14px" : "22px 28px", background: BLUE_BG,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <AlertCircle size={18} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontFamily: BEBAS, fontSize: 13, letterSpacing: "0.16em", color: BLUE_TEXT, textTransform: "uppercase", margin: "0 0 6px" }}>
              Perhatian Penting
            </p>
            <p style={{ fontSize: 12, color: "#334", lineHeight: 1.75, margin: 0 }}>
              Peserta wajib membaca, memahami, dan mematuhi segala Informasi Penting, Syarat dan Ketentuan dan
              Peraturan Lomba secara seksama sebelum mengikuti lomba. Syarat, Ketentuan dan Peraturan Lomba
              dibuat untuk menciptakan perlombaan yang sistematis dan teratur, memastikan keselamatan untuk
              seluruh pihak yang terlibat, terutama keselamatan peserta lomba.
            </p>
          </div>
        </div>

        {/* ── KEY RULES ── */}
        <div ref={rulesRef} style={{ marginBottom: isMobile ? 44 : 68 }}>
          <SL>Aturan Utama</SL>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 10,
            marginTop: 20,
          }}>
            {importantRules.map((r, i) => (
              <div
                key={i}
                className="rule-card"
                style={{
                  background: "#fff", border: "1px solid #DDEAF8",
                  borderRadius: 10, overflow: "hidden",
                  transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = r.color + "55";
                  el.style.boxShadow = `0 4px 18px ${r.color}14`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#DDEAF8";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ padding: "10px 12px", background: r.bg, borderBottom: "1px solid #E8F0FB", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <r.icon size={13} color={r.color} />
                  </div>
                  <h3 style={{ fontFamily: BEBAS, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0, color: r.color }}>
                    {r.title}
                  </h3>
                  {!isMobile && <StatusBadge label={r.tag} color={r.color} bg={r.bg} border={r.color + "30"} />}
                </div>
                <p style={{ fontSize: 11, color: "#556", lineHeight: 1.65, margin: 0, padding: "10px 12px" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        <div style={{ marginBottom: isMobile ? 44 : 68 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
            <SL>Kategori Lomba</SL>
            <Award size={16} color={BLUE} />
          </div>

          {/* Mobile: card layout */}
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {categories.map((cat, i) => (
                <CategoryCard key={i} cat={cat} />
              ))}
            </div>
          ) : (
            /* Tablet & Desktop: table layout */
            <div ref={catsRef} style={{ border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden" }}>
              {/* Header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isTablet ? catTabletCols : catDesktopCols,
                gap: 0,
                background: "#F0F6FF",
                borderBottom: "1px solid #DDEAF8",
                padding: "8px 16px",
              }}>
                {(isTablet
                  ? ["#", "Kode", "Nama Kategori", "COT"]
                  : ["#", "Kode", "Nama Kategori", "Usia", "COT", "Tags"]
                ).map((h, i) => (
                  <span key={i} style={{ fontFamily: BEBAS, fontSize: 12, color: "#8E9BAE", textTransform: "uppercase", letterSpacing: "0.14em" }}>{h}</span>
                ))}
              </div>
              {/* Rows */}
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="cat-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: isTablet ? catTabletCols : catDesktopCols,
                    alignItems: "center",
                    padding: "11px 16px",
                    background: "#fff",
                    borderTop: i > 0 ? "1px solid #F0F4FA" : "none",
                    borderRight: "none", borderBottom: "none",
                    borderLeft: "3px solid #D8E4F5",
                    cursor: "default", transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => onCatEnter(e.currentTarget, cat.color)}
                  onMouseLeave={(e) => onCatLeave(e.currentTarget)}
                >
                  <span className="cat-num" style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: "#BCC8DC", fontVariantNumeric: "tabular-nums" }}>{cat.num}</span>
                  <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 4, padding: "2px 9px", width: "fit-content" }}>
                    <span style={{ fontFamily: BEBAS, fontSize: 12, color: cat.textColor, letterSpacing: "0.08em" }}>{cat.sub}</span>
                  </div>
                  <span style={{ fontFamily: BEBAS, fontSize: 16, letterSpacing: "0.01em", color: "#111" }}>{cat.title}</span>
                  {!isTablet && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#778" }}><Users size={11} />{cat.age}</span>
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#778" }}><Clock size={11} />COT {cat.cutoff}</span>
                  {!isTablet && (
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {cat.tags.map((tag, j) => (
                        <span key={j} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8E9BAE", border: "1px solid #D8E4F5", borderRadius: 3, padding: "2px 7px", background: "#F4F7FB" }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── PENDAFTARAN & PERATURAN ── */}
        <div ref={regRef} style={{ marginBottom: isMobile ? 44 : 68 }}>
          <SL>Pendaftaran & Peraturan</SL>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(270px, 1fr))",
            gap: 12,
            marginTop: 20,
          }}>
            <div className="reg-panel" style={{ background: "#fff", border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden" }}>
              <PanelHeader icon={<CheckCircle size={14} color={BLUE} />} bg={BLUE_BG} color={BLUE} border={BLUE_BORDER} label="Pendaftaran" />
              <BulletList color={BLUE} items={[
                "Pendaftaran hanya melalui website RegNowOnline",
                "Pilih kategori sesuai usia peserta",
                "Tanda terima dikirim via email & WhatsApp",
                "Ambil racepack dengan barcode & kartu identitas",
                "Batas pembayaran: 15 hari setelah pendaftaran",
              ]} />
            </div>
            <div className="reg-panel" style={{ background: "#fff", border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden" }}>
              <PanelHeader icon={<AlertCircle size={14} color="#0E7ABF" />} bg="#E6F4FD" color="#0E7ABF" border="#A8D8F5" label="Peraturan Penting" />
              <BulletList color="#0E7ABF" items={[
                "Biaya pendaftaran tidak dapat dikembalikan",
                "Nomor bib & chip tidak dapat dialihkan",
                "Wajib pakai nomor bib di dada & chip waktu",
                "Shortcut atau potong rute akan didiskualifikasi",
                "Penyelenggara berhak melakukan tes doping",
              ]} />
            </div>
            <div className="reg-panel" style={{ background: "#fff", border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden" }}>
              <PanelHeader icon={<Package size={14} color="#2F4FB8" />} bg="#EEF0FF" color="#2F4FB8" border="#BCC5F4" label="Race Pack" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, padding: "12px 14px 4px" }}>
                {["Kaos Lari", "Chip Waktu", "Nomor Bib", "Souvenir"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "#F4F7FB", borderRadius: 6, padding: "8px 10px", border: "1px solid #DDEAF8" }}>
                    <CheckCircle size={12} color={BLUE} />
                    <span style={{ fontSize: 12, color: "#222", fontWeight: 700 }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#778", lineHeight: 1.7, margin: 0, padding: "10px 14px 14px" }}>
                Tunjukkan barcode & kartu identitas saat pengambilan. Pengambilan oleh pihak lain hanya dengan surat kuasa dari bayanrun.com
              </p>
            </div>
          </div>
        </div>

        {/* ── COT TABLE ── */}
        <div style={{ marginBottom: isMobile ? 44 : 68 }}>
          <SL>Waktu Cut-Off</SL>

          {/* Mobile: card layout */}
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
              {categories.map((cat, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#fff",
                    border: "1px solid #DDEAF8",
                    borderLeft: `4px solid ${cat.color}`,
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 4, padding: "2px 9px", flexShrink: 0 }}>
                    <span style={{ fontFamily: BEBAS, fontSize: 12, color: cat.textColor }}>{cat.sub}</span>
                  </div>
                  <span style={{ fontFamily: BEBAS, fontSize: 15, color: "#111", flex: 1 }}>{cat.title}</span>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 6, padding: "4px 10px", flexShrink: 0 }}>
                    <Timer size={11} color={cat.color} />
                    <span style={{ fontFamily: BEBAS, fontSize: 14, color: cat.textColor }}>{cat.cutoff}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tablet & Desktop: table layout */
            <div style={{ border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden", marginTop: 20 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: isTablet ? cotTabletCols : cotDesktopCols,
                background: "#F0F6FF",
                borderBottom: "1px solid #DDEAF8",
                padding: "8px 16px",
              }}>
                {(isTablet
                  ? ["#", "Kode", "Kategori", "Cut-Off Time"]
                  : ["#", "Kode", "Kategori", "Usia", "Cut-Off Time"]
                ).map((h, i) => (
                  <span key={i} style={{ fontFamily: BEBAS, fontSize: 12, color: "#8E9BAE", textTransform: "uppercase", letterSpacing: "0.14em" }}>{h}</span>
                ))}
              </div>
              {categories.map((cat, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isTablet ? cotTabletCols : cotDesktopCols,
                    alignItems: "center",
                    padding: "11px 16px",
                    background: "#fff",
                    borderTop: i > 0 ? "1px solid #F0F4FA" : "none",
                    cursor: "default",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F4F7FB"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                >
                  <span style={{ fontSize: 10, color: "#BCC8DC", fontFamily: "monospace", fontWeight: 700 }}>{cat.num}</span>
                  <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 4, padding: "2px 9px", width: "fit-content" }}>
                    <span style={{ fontFamily: BEBAS, fontSize: 12, color: cat.textColor }}>{cat.sub}</span>
                  </div>
                  <div style={{ fontFamily: BEBAS, fontSize: 16, letterSpacing: "0.01em", color: "#111" }}>{cat.title}</div>
                  {!isTablet && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#778" }}><Users size={11} />{cat.age}</span>
                  )}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 6, padding: "5px 10px", width: "fit-content" }}>
                    <Timer size={12} color={cat.color} />
                    <span style={{ fontFamily: BEBAS, fontSize: 15, letterSpacing: "0.04em", color: cat.textColor }}>{cat.cutoff}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: 11, color: "#AAB8CC", marginTop: 10, fontStyle: "italic" }}>
            * Peserta yang melebihi COT tidak dianggap sebagai finisher dan tidak menerima medali maupun finisher shirt
          </p>
        </div>

      </div>
    </div>
  );
}