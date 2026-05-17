"use client";

import {
  Award, Clock, MapPin, Users,
  AlertCircle, CheckCircle, Zap, Shield, ChevronRight, Timer, Package,
} from "lucide-react";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLUE = "#1D5FD4";
const BLUE_BG = "#EEF4FF";
const BLUE_BORDER = "#C5D9F8";
const BLUE_TEXT = "#0C3E9B";

const RED       = "#DC2626";
const RED_TEXT  = "#991B1B";
const RED_BG    = "#FEF2F2";
const RED_BORDER= "#FECACA";

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

const TICKER_TEXT = "BAYAN RUN 2026 · BALIKPAPAN · 12 OKTOBER 2026 · HALF MARATHON · 10K · 5K · KIDS RUN · ";

function StatusBadge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase",
      color, background: bg, border: `1px solid ${border}`,
      borderRadius: 3, padding: "2px 8px",
    }}>{label}</span>
  );
}

function SL({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 3, height: 17, background: BLUE, borderRadius: 2 }} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8E9BAE" }}>
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
      <h3 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color, margin: 0 }}>
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

export default function BayanRunInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const tickerRef    = useRef<HTMLDivElement>(null);
  const rulesRef     = useRef<HTMLDivElement>(null);
  const catsRef      = useRef<HTMLDivElement>(null);
  const regRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll<HTMLElement>(".ltr");
        gsap.set(letters, { opacity: 0, y: 90, rotateX: -75 });
        gsap.to(letters, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.038, ease: "back.out(1.6)" });
      }
      if (tickerRef.current) {
        gsap.to(tickerRef.current, { x: "-50%", duration: 22, ease: "none", repeat: -1 });
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
    <div ref={containerRef} style={{ minHeight: "100vh", background: "#F4F7FB", color: "#111", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <div style={{ background: "#fff", position: "relative", padding: "80px 40px 60px", borderBottom: "1px solid #DDEAF8", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "52%", height: "100%", background: `repeating-linear-gradient(90deg,transparent,transparent 54px,${BLUE}09 54px,${BLUE}09 55px)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            <div style={{ width: 22, height: 22, background: BLUE, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={12} fill="#fff" stroke="none" />
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#8E9BAE" }}>bayan-run</span>
            <span style={{ color: "#C8D5E8", fontSize: 16 }}>/</span>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#8E9BAE" }}>event-docs</span>
            <span style={{ fontSize: 9, fontWeight: 800, background: BLUE, color: "#fff", borderRadius: 3, padding: "2px 7px", letterSpacing: "0.1em" }}>2026</span>
          </div>
          <h1
            ref={titleRef}
            style={{ fontSize: "clamp(50px, 10vw, 112px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", margin: "0 0 18px", textTransform: "uppercase", perspective: "700px", display: "flex", flexWrap: "wrap", gap: "0 5px" }}
          >
            {"BAYAN RUN 2026".split("").map((c, i) =>
              c === " " ? <span key={i} style={{ display: "inline-block", width: 16 }} /> : (
                <span key={i} className="ltr" style={{ display: "inline-block", color: i < 5 ? BLUE : "#1a2540" }}>{c}</span>
              )
            )}
          </h1>
          <p style={{ fontSize: 13, color: "#8E9BAE", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, margin: 0 }}>
            Informasi & Ketentuan Lomba · Balikpapan, Kalimantan Timur
          </p>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div style={{ background: BLUE, padding: "9px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div ref={tickerRef} style={{ display: "inline-flex" }}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff" }}>
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* ── NOTICE ── */}
        <div style={{ margin: "52px 0", border: `1px solid ${BLUE_BORDER}`, borderLeft: `4px solid ${BLUE}`, borderRadius: 10, padding: "22px 28px", background: BLUE_BG, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <AlertCircle size={20} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", color: BLUE_TEXT, textTransform: "uppercase", margin: "0 0 6px" }}>Perhatian Penting</p>
            <p style={{ fontSize: 13, color: "#334", lineHeight: 1.75, margin: 0 }}>
              Peserta wajib membaca, memahami, dan mematuhi segala Informasi Penting, Syarat dan Ketentuan dan Peraturan Lomba secara seksama sebelum mengikuti lomba. Syarat, Ketentuan dan Peraturan Lomba dibuat untuk menciptakan perlombaan yang sistematis dan teratur, memastikan keselamatan untuk seluruh pihak yang terlibat, terutama keselamatan peserta lomba.
            </p>
          </div>
        </div>

        {/* ── KEY RULES ── */}
        <div ref={rulesRef} style={{ marginBottom: 68 }}>
          <SL>Aturan Utama</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, marginTop: 20 }}>
            {importantRules.map((r, i) => (
              <div
                key={i}
                className="rule-card"
                style={{ background: "#fff", border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = r.color + "55"; el.style.boxShadow = `0 4px 18px ${r.color}14`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#DDEAF8"; el.style.boxShadow = "none"; }}
              >
                <div style={{ padding: "10px 14px", background: r.bg, borderBottom: "1px solid #E8F0FB", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <r.icon size={14} color={r.color} />
                  </div>
                  <h3 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0, color: r.color }}>{r.title}</h3>
                  <StatusBadge label={r.tag} color={r.color} bg={r.bg} border={r.color + "30"} />
                </div>
                <p style={{ fontSize: 12, color: "#556", lineHeight: 1.65, margin: 0, padding: "12px 14px" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        <div style={{ marginBottom: 68 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
            <SL>Kategori Lomba</SL>
            <Award size={16} color={BLUE} />
          </div>
          <div ref={catsRef} style={{ border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "36px 76px 1fr 120px 100px 1fr", gap: 0, background: "#F0F6FF", borderBottom: "1px solid #DDEAF8", padding: "8px 16px" }}>
              {["#", "Kode", "Nama Kategori", "Usia", "COT", "Tags"].map((h, i) => (
                <span key={i} style={{ fontSize: 9, fontWeight: 800, color: "#8E9BAE", textTransform: "uppercase", letterSpacing: "0.12em" }}>{h}</span>
              ))}
            </div>
            {categories.map((cat, i) => (
              <div
                key={i}
                className="cat-row"
                style={{
                  display: "grid", gridTemplateColumns: "36px 76px 1fr 120px 100px 1fr",
                  alignItems: "center", padding: "11px 16px",
                  background: "#fff",
                  borderTop:    i > 0 ? "1px solid #F0F4FA" : "none",
                  borderRight:  "none",
                  borderBottom: "none",
                  borderLeft:   "3px solid #D8E4F5",
                  cursor: "default",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => onCatEnter(e.currentTarget, cat.color)}
                onMouseLeave={(e) => onCatLeave(e.currentTarget)}
              >
                <span className="cat-num" style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: "#BCC8DC", fontVariantNumeric: "tabular-nums" }}>{cat.num}</span>
                <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 4, padding: "2px 9px", width: "fit-content" }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: cat.textColor, letterSpacing: "0.08em", fontFamily: "monospace" }}>{cat.sub}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em", color: "#111" }}>{cat.title}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#778" }}><Users size={11} />{cat.age}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#778" }}><Clock size={11} />COT {cat.cutoff}</span>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {cat.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8E9BAE", border: "1px solid #D8E4F5", borderRadius: 3, padding: "2px 7px", background: "#F4F7FB" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PENDAFTARAN & PERATURAN ── */}
        <div ref={regRef} style={{ marginBottom: 68 }}>
          <SL>Pendaftaran & Peraturan</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 12, marginTop: 20 }}>
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

        {/* ── COT ── */}
        <div style={{ marginBottom: 68 }}>
          <SL>Waktu Cut-Off</SL>
          <div style={{ border: "1px solid #DDEAF8", borderRadius: 10, overflow: "hidden", marginTop: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "36px 76px 1fr 120px 110px", background: "#F0F6FF", borderBottom: "1px solid #DDEAF8", padding: "8px 16px" }}>
              {["#", "Kode", "Kategori", "Usia", "Cut-Off Time"].map((h, i) => (
                <span key={i} style={{ fontSize: 9, fontWeight: 800, color: "#8E9BAE", textTransform: "uppercase", letterSpacing: "0.12em" }}>{h}</span>
              ))}
            </div>
            {categories.map((cat, i) => (
              <div
                key={i}
                style={{
                  display: "grid", gridTemplateColumns: "36px 76px 1fr 120px 110px",
                  alignItems: "center", padding: "11px 16px",
                  background: "#fff",
                  borderTop: i > 0 ? "1px solid #F0F4FA" : "none",
                  cursor: "default", transition: "background 0.12s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F4F7FB"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
              >
                <span style={{ fontSize: 10, color: "#BCC8DC", fontFamily: "monospace", fontWeight: 700 }}>{cat.num}</span>
                <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 4, padding: "2px 9px", width: "fit-content" }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: cat.textColor, fontFamily: "monospace" }}>{cat.sub}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{cat.title}</div>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#778" }}><Users size={11} />{cat.age}</span>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 6, padding: "5px 10px", width: "fit-content" }}>
                  <Timer size={12} color={cat.color} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: cat.textColor, fontFamily: "monospace" }}>{cat.cutoff}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#AAB8CC", marginTop: 10, fontStyle: "italic" }}>
            * Peserta yang melebihi COT tidak dianggap sebagai finisher dan tidak menerima medali maupun finisher shirt
          </p>
        </div>

      </div>
    </div>
  );
}