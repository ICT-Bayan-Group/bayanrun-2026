"use client";

import {
  Building2, Award, Clock, MapPin, Users,
  AlertCircle, CheckCircle, Zap, Shield,
} from "lucide-react";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { title: "Half Marathon", sub: "21K",    age: "17+ tahun",   cutoff: "4 Jam",    color: "#D92B1A", tags: ["Nasional", "Medal", "Finisher Shirt"], num: "01" },
  { title: "10K Run",       sub: "10K",    age: "17+ tahun",   cutoff: "2 Jam",    color: "#C97000", tags: ["Nasional", "Medal"],                    num: "02" },
  { title: "5K Run",        sub: "5K",     age: "17+ tahun",   cutoff: "1 Jam",    color: "#1A8C38", tags: ["Nasional", "Medal"],                    num: "03" },
  { title: "5K Teenagers",  sub: "Remaja", age: "13–16 tahun", cutoff: "1 Jam",    color: "#0057B8", tags: ["Remaja", "Medal"],                      num: "04" },
  { title: "2.5K Kids",     sub: "Anak",   age: "6–12 tahun",  cutoff: "50 Menit", color: "#7B2DB0", tags: ["Anak-anak", "Medal"],                   num: "05" },
];

const importantRules = [
  { icon: AlertCircle, title: "Non-Refundable",  desc: "Biaya pendaftaran tidak dapat dikembalikan dalam kondisi apapun", color: "#D92B1A", bg: "#FEF0EE" },
  { icon: Users,       title: "Verifikasi Usia", desc: "Penyelenggara berhak memverifikasi usia peserta kapan saja",     color: "#C97000", bg: "#FEF7EC" },
  { icon: Shield,      title: "RegNowOnline",    desc: "Pendaftaran hanya melalui website resmi bayanrun.com",           color: "#0057B8", bg: "#EDF3FF" },
  { icon: Clock,       title: "Cut-Off Time",    desc: "Wajib finish sebelum waktu COT untuk mendapat medali",           color: "#1A8C38", bg: "#EDF7F0" },
];

const TICKER_TEXT = "BAYAN RUN 2026 · BALIKPAPAN · 12 OKTOBER 2026 · HALF MARATHON · 10K · 5K · KIDS RUN · ";

export default function BayanRunInfo() {
  // Refs for scoped GSAP context
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const tickerRef    = useRef<HTMLDivElement>(null);
  const rulesRef     = useRef<HTMLDivElement>(null);
  const catsRef      = useRef<HTMLDivElement>(null);
  const regRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Hero title: letter-by-letter entrance ──────────────────────────
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll<HTMLElement>(".ltr");
        // Set initial state explicitly first
        gsap.set(letters, { opacity: 0, y: 90, rotateX: -75 });
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.038,
          ease: "back.out(1.6)",
        });
      }

      // ── 2. Ticker: infinite left scroll ───────────────────────────────────
      // Use ref instead of class selector to avoid global collisions
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          x: "-50%",
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      }

      // ── 3. Rule cards: scroll-triggered fade + rise ───────────────────────
      if (rulesRef.current) {
        const cards = rulesRef.current.querySelectorAll<HTMLElement>(".rule-card");
        gsap.set(cards, { opacity: 0, y: 44 });
        ScrollTrigger.create({
          trigger: rulesRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.09,
              ease: "power3.out",
            });
          },
        });
      }

      // ── 4. Category rows: scroll-triggered slide from left ────────────────
      if (catsRef.current) {
        const rows = catsRef.current.querySelectorAll<HTMLElement>(".cat-row");
        gsap.set(rows, { opacity: 0, x: -55 });
        ScrollTrigger.create({
          trigger: catsRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(rows, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.07,
              ease: "power3.out",
            });
          },
        });
      }

      // ── 5. Reg panels: scroll-triggered fade + rise ───────────────────────
      if (regRef.current) {
        const panels = regRef.current.querySelectorAll<HTMLElement>(".reg-panel");
        gsap.set(panels, { opacity: 0, y: 38 });
        ScrollTrigger.create({
          trigger: regRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(panels, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
        });
      }

    }, containerRef); // scoped to containerRef — no global selector leakage

    return () => ctx.revert();
  }, []);

  // ── Category row hover handlers ──────────────────────────────────────────
  // Use data-color attr to avoid closure issues with stale refs
  const onCatEnter = (el: HTMLElement, color: string) => {
    // Animate the hovered row
    gsap.to(el, { x: 9, duration: 0.2, ease: "power2.out" });
    el.style.borderLeftColor = color;
    el.style.backgroundColor = color + "0C";

    // Dim sibling rows
    const rows = containerRef.current?.querySelectorAll<HTMLElement>(".cat-row");
    rows?.forEach((row) => {
      if (row !== el) gsap.to(row, { opacity: 0.32, duration: 0.18 });
    });

    // Animate the number label color via JS (GSAP color anim needs plugin; use style directly)
    const num = el.querySelector<HTMLElement>(".cat-num");
    if (num) {
      num.style.color = color;
      gsap.to(num, { scale: 1.12, duration: 0.2, ease: "power2.out" });
    }
  };

  const onCatLeave = (el: HTMLElement) => {
    gsap.to(el, { x: 0, duration: 0.2, ease: "power2.out" });
    el.style.borderLeftColor = "#E4E4E4";
    el.style.backgroundColor = "#fff";

    const rows = containerRef.current?.querySelectorAll<HTMLElement>(".cat-row");
    rows?.forEach((row) => gsap.to(row, { opacity: 1, duration: 0.18 }));

    const num = el.querySelector<HTMLElement>(".cat-num");
    if (num) {
      num.style.color = "#C8C8C8";
      gsap.to(num, { scale: 1, duration: 0.2, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "#f1f3f5",
        color: "#111",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ background: "#fff", position: "relative", padding: "80px 40px 60px", borderBottom: "1px solid #E8E8E8", overflow: "hidden" }}>
        {/* Decorative grid lines */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "52%", height: "100%", background: "repeating-linear-gradient(90deg,transparent,transparent 54px,rgba(217,43,26,0.055) 54px,rgba(217,43,26,0.055) 55px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#D92B1A", padding: "5px 15px", borderRadius: 4, marginBottom: 26 }}>
            <Zap size={12} fill="#fff" stroke="none" />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>
              Official Event Information
            </span>
          </div>

          {/* Title — letters rendered individually for GSAP stagger */}
          <h1
            ref={titleRef}
            style={{
              fontSize: "clamp(50px, 10vw, 112px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              margin: "0 0 18px",
              textTransform: "uppercase",
              perspective: "700px",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 5px",
            }}
          >
            {"BAYAN RUN 2026".split("").map((c, i) =>
              c === " " ? (
                <span key={i} style={{ display: "inline-block", width: 16 }} />
              ) : (
                <span
                  key={i}
                  className="ltr"
                  style={{
                    display: "inline-block",
                    // opacity set to 0 via gsap.set in useEffect, not inline style
                    // (inline opacity:0 here would be overridden by GSAP fine, but cleaner this way)
                    color: i < 5 ? "#D92B1A" : "#2177c2",
                  }}
                >
                  {c}
                </span>
              )
            )}
          </h1>

          <p style={{ fontSize: 13, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, margin: 0 }}>
            Informasi & Ketentuan Lomba · Balikpapan, Kalimantan Timur
          </p>
        </div>
      </div>

      {/* ── TICKER ────────────────────────────────────────────────────────── */}
      <div style={{ background: "#D92B1A", padding: "9px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        {/*
          Width trick: render 4 copies so the strip is ~2× the viewport width.
          GSAP animates x from 0 to -50%, which equals one full copy width,
          then repeat:-1 seamlessly loops. ref is on this inner div.
        */}
        <div ref={tickerRef} style={{ display: "inline-flex" }}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", paddingRight: 0 }}>
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* ── NOTICE ── */}
        <div style={{ margin: "52px 0", border: "1px solid #F2BCB8", borderLeft: "4px solid #D92B1A", borderRadius: 12, padding: "26px 34px", background: "#FEF5F4", display: "flex", gap: 18, alignItems: "flex-start" }}>
          <AlertCircle size={24} color="#D92B1A" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#D92B1A", textTransform: "uppercase", margin: "0 0 7px" }}>
              Perhatian Penting
            </p>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.75, margin: 0 }}>
              Peserta wajib membaca, memahami, dan mematuhi segala Informasi Penting, Syarat dan Ketentuan dan Peraturan Lomba secara seksama sebelum mengikuti lomba. Syarat, Ketentuan dan Peraturan Lomba dibuat untuk menciptakan perlombaan yang sistematis dan teratur, memastikan keselamatan untuk seluruh pihak yang terlibat, terutama keselamatan peserta lomba.
            </p>
          </div>
        </div>

        {/* ── KEY RULES ── */}
        <div ref={rulesRef} style={{ marginBottom: 68 }}>
          <SL>Aturan Utama</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12, marginTop: 20 }}>
            {importantRules.map((r, i) => (
              <div
                key={i}
                className="rule-card"
                style={{
                  background: "#fff",
                  border: "1px solid #E8E8E8",
                  borderRadius: 12,
                  padding: "24px 20px",
                  // opacity intentionally NOT set here — gsap.set handles it
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = r.color + "55";
                  el.style.boxShadow  = `0 4px 18px ${r.color}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#E8E8E8";
                  el.style.boxShadow   = "none";
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 9, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 13 }}>
                  <r.icon size={18} color={r.color} />
                </div>
                <h3 style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6, color: "#111" }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        <div style={{ marginBottom: 68 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <SL>Kategori Lomba</SL>
            <Award size={17} color="#C97000" />
          </div>

          {/* catsRef wraps ONLY the list, so the ScrollTrigger trigger is tight */}
          <div ref={catsRef} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {categories.map((cat, i) => (
              <div
                key={i}
                className="cat-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 20px",
                  background: "#fff",
                  // Split border so GSAP / JS can update borderLeftColor independently
                  borderTop:    "1px solid #E8E8E8",
                  borderRight:  "1px solid #E8E8E8",
                  borderBottom: "1px solid #E8E8E8",
                  borderLeft:   "3px solid #E4E4E4",
                  borderRadius: 9,
                  cursor: "default",
                  gap: 18,
                  // No inline opacity — gsap.set handles it
                }}
                onMouseEnter={(e) => onCatEnter(e.currentTarget, cat.color)}
                onMouseLeave={(e) => onCatLeave(e.currentTarget)}
              >
                <span
                  className="cat-num"
                  style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: "#C8C8C8", minWidth: 22, fontVariantNumeric: "tabular-nums" }}
                >
                  {cat.num}
                </span>

                <div style={{ background: cat.color + "14", border: `1px solid ${cat.color}30`, borderRadius: 5, padding: "3px 11px", minWidth: 56, textAlign: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: cat.color, letterSpacing: "0.08em" }}>{cat.sub}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", color: "#111" }}>{cat.title}</span>
                </div>

                <div style={{ display: "flex", gap: 18, alignItems: "center", flexShrink: 0 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#999" }}>
                    <Users size={12} />{cat.age}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#999" }}>
                    <Clock size={12} />COT {cat.cutoff}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                  {cat.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", border: "1px solid #E4E4E4", borderRadius: 4, padding: "3px 9px", background: "#F5F4F1" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PENDAFTARAN & PERATURAN ── */}
        <div ref={regRef} style={{ marginBottom: 68 }}>
          <SL>Pendaftaran & Peraturan</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 14, marginTop: 20 }}>

            {/* Pendaftaran */}
            <div className="reg-panel" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 14, padding: "30px 26px" }}>
              <PanelHeader icon={<CheckCircle size={15} color="#0057B8" />} bg="#EDF3FF" color="#0057B8" label="Pendaftaran" />
              <BulletList color="#0057B8" items={[
                "Pendaftaran hanya melalui website RegNowOnline",
                "Pilih kategori sesuai usia peserta",
                "Tanda terima dikirim via email & WhatsApp",
                "Ambil racepack dengan barcode & kartu identitas",
                "Batas pembayaran: 15 hari setelah pendaftaran",
              ]} />
            </div>

            {/* Peraturan */}
            <div className="reg-panel" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 14, padding: "30px 26px" }}>
              <PanelHeader icon={<AlertCircle size={15} color="#D92B1A" />} bg="#FEF0EE" color="#D92B1A" label="Peraturan Penting" />
              <BulletList color="#D92B1A" items={[
                "Biaya pendaftaran tidak dapat dikembalikan",
                "Nomor bib & chip tidak dapat dialihkan",
                "Wajib pakai nomor bib di dada & chip waktu",
                "Shortcut atau potong rute akan didiskualifikasi",
                "Penyelenggara berhak melakukan tes doping",
              ]} />
            </div>

            {/* Race Pack */}
            <div className="reg-panel" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 14, padding: "30px 26px" }}>
              <PanelHeader icon={<MapPin size={15} color="#C97000" />} bg="#FEF7EC" color="#C97000" label="Race Pack" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 16 }}>
                {["Kaos Lari", "Chip Waktu", "Nomor Bib", "Souvenir"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "#F5F4F1", borderRadius: 7, padding: "9px 11px", border: "1px solid #E8E8E8" }}>
                    <CheckCircle size={12} color="#1A8C38" />
                    <span style={{ fontSize: 12, color: "#222", fontWeight: 700 }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, margin: 0 }}>
                Tunjukkan barcode & kartu identitas saat pengambilan. Pengambilan oleh pihak lain hanya dengan surat kuasa dari bayanrun.com
              </p>
            </div>

          </div>
        </div>

        {/* ── COT ── */}
        <div style={{ marginBottom: 68 }}>
          <SL>Waktu Cut-Off</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 9, marginTop: 20 }}>
            {categories.map((cat, i) => (
              <div
                key={i}
                style={{ background: "#fff", border: "1px solid #E8E8E8", borderTop: `3px solid ${cat.color}`, borderRadius: 11, padding: "20px 16px", textAlign: "center", transition: "box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 22px ${cat.color}22`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 24, fontWeight: 900, color: cat.color, lineHeight: 1, marginBottom: 7, letterSpacing: "-0.02em" }}>{cat.cutoff}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#222", letterSpacing: "0.03em" }}>{cat.title}</div>
                <div style={{ fontSize: 10, color: "#aaa", marginTop: 3 }}>{cat.age}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#C0C0C0", marginTop: 12, fontStyle: "italic" }}>
            * Peserta yang melebihi COT tidak dianggap sebagai finisher dan tidak menerima medali maupun finisher shirt
          </p>
        </div>

        {/* ── FOOTER ── */}

      </div>
    </div>
  );
}

// ── Small reusable sub-components ─────────────────────────────────────────────

function SL({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 3, height: 17, background: "#D92B1A", borderRadius: 2 }} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B0B0B0" }}>
        {children}
      </span>
    </div>
  );
}

function PanelHeader({ icon, bg, color, label }: { icon: React.ReactNode; bg: string; color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div style={{ width: 32, height: 32, borderRadius: 7, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color, margin: 0 }}>
        {label}
      </h3>
    </div>
  );
}

function BulletList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: color, marginTop: 8, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}