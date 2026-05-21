"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Calendar, MapPin, Clock, X, Navigation, ExternalLink } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

gsap.registerPlugin(ScrollTrigger);

// ── Design Tokens ─────────────────────────────────────────────────────────────
// Font system — consistent dengan BayanRunInfo.tsx
const FONT_DISPLAY = "'Bebas Neue', Arial Black, sans-serif";
const FONT_BODY    = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const BLUE        = "#1D5FD4";
const BLUE_BG     = "#EEF4FF";
const BLUE_BORDER = "#C5D9F8";
const BLUE_TEXT   = "#0C3E9B";

// ── Venue definitions ─────────────────────────────────────────────────────────
const VENUES = [
  {
    key: "lapangan",
    label: "Lapangan Merdeka III",
    date: "Sunday, 12 October 2026",
    location: "Lapangan Merdeka III, Balikpapan",
    color: "#2F4FB8",
    textColor: "#1A2E7A",
    bg: "#EEF0FF",
    border: "#BCC5F4",
    // Google Maps embed — hanya di-load saat modal dibuka (lazy)
    mapsEmbed: "https://www.google.com/maps?q=Lapangan%20Merdeka%20Balikpapan&output=embed",
    // Link untuk buka native Maps app di mobile
    mapsLink: "https://maps.google.com/?q=Lapangan+Merdeka+Balikpapan",
    // Static preview image dari Maps (tidak butuh iframe load)
    mapsStaticPreview: "https://maps.googleapis.com/maps/api/staticmap?center=Lapangan+Merdeka+Balikpapan&zoom=15&size=600x200&markers=color:blue%7CLapangan+Merdeka+Balikpapan",
    startTimes: [
      { cat: "Half Marathon", time: "05:30 WITA", cot: "4 Jam",    color: "#1D5FD4", textColor: "#0C3E9B", bg: "#EEF4FF", border: "#C5D9F8" },
      { cat: "10K",           time: "06:00 WITA", cot: "2 Jam",    color: "#0E7ABF", textColor: "#094F80", bg: "#E6F4FD", border: "#A8D8F5" },
      { cat: "5K Open",       time: "06:10 WITA", cot: "1 Jam",    color: "#0B6B8A", textColor: "#073E50", bg: "#E3F2F7", border: "#9CD3E4" },
      { cat: "5K Teens",      time: "06:10 WITA", cot: "1 Jam",    color: "#2F4FB8", textColor: "#1A2E7A", bg: "#EEF0FF", border: "#BCC5F4" },
    ],
  },
  {
    key: "bscc",
    label: "BSCC Dome",
    date: "Friday, 10 October 2026",
    location: "BSCC Dome, Balikpapan",
    color: "#DC2626",
    textColor: "#991B1B",
    bg: "#FEF2F2",
    border: "#FECACA",
    mapsEmbed: "https://www.google.com/maps?q=BSCC+Dome+Balikpapan&output=embed",
    mapsLink: "https://maps.google.com/?q=BSCC+Dome+Balikpapan",
    mapsStaticPreview: "https://maps.googleapis.com/maps/api/staticmap?center=BSCC+Dome+Balikpapan&zoom=15&size=600x200&markers=color:red%7CBSCC+Dome+Balikpapan",
    startTimes: [
      { cat: "2.5K Kid Dash", time: "06:20 WITA", cot: "50 Menit", color: "#DC2626", textColor: "#991B1B", bg: "#FEF2F2", border: "#FECACA" },
    ],
  },
];

const events = [
  {
    id: 1,
    tag: "Day 1",
    title: "Racepack Collection",
    date: "Saturday, 11 October 2025",
    location: "Gedung Kesenian Balikpapan",
    mapsLink: "https://maps.google.com/?q=Gedung+Kesenian+Balikpapan",
    dayTime: "08:00 – 19:00 WITA",
    video: "/video1.mp4",
    color: BLUE,
    textColor: BLUE_TEXT,
    bg: BLUE_BG,
    border: BLUE_BORDER,
    mapsEmbed: "https://www.google.com/maps?q=Gedung%20Kesenian%20Balikpapan&output=embed",
    isRaceDay: false,
  },
  {
    id: 2,
    tag: "Race Day",
    title: "Race Day",
    date: null,
    location: null,
    mapsLink: null,
    dayTime: null,
    video: "/video2.mp4",
    color: "#2F4FB8",
    textColor: "#1A2E7A",
    bg: "#EEF0FF",
    border: "#BCC5F4",
    mapsEmbed: null,
    isRaceDay: true,
  },
];

// ── Lazy Map Embed ─────────────────────────────────────────────────────────────
// Iframe hanya di-mount ke DOM setelah user klik "Lihat Peta"
// Ini mencegah browser load banyak iframe sekaligus saat halaman pertama render
function LazyMapEmbed({
  src,
  mapsLink,
  height = 200,
}: {
  src: string;
  mapsLink: string;
  height?: number;
}) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        style={{
          width: "100%",
          height,
          borderRadius: 8,
          border: "1.5px dashed #C5D9F8",
          background: "#F4F7FB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = BLUE_BG;
          (e.currentTarget as HTMLElement).style.borderColor = BLUE;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#F4F7FB";
          (e.currentTarget as HTMLElement).style.borderColor = "#C5D9F8";
        }}
      >
        <MapPin size={20} color={BLUE} />
        <span style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 13,
          letterSpacing: "0.12em",
          color: BLUE_TEXT,
          textTransform: "uppercase",
        }}>
          Tap untuk Lihat Peta
        </span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "#8E9BAE" }}>
          Maps akan dimuat saat diklik
        </span>
      </button>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <iframe
        src={src}
        style={{
          width: "100%",
          height,
          borderRadius: 8,
          border: "1px solid #DDEAF8",
          display: "block",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* Shortcut buka Maps app native */}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: "#fff",
          border: `1px solid ${BLUE_BORDER}`,
          borderRadius: 6,
          padding: "5px 10px",
          fontFamily: FONT_DISPLAY,
          fontSize: 11,
          letterSpacing: "0.1em",
          color: BLUE_TEXT,
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textTransform: "uppercase",
        }}
      >
        <Navigation size={11} color={BLUE} />
        Buka di Maps
      </a>
    </div>
  );
}

// ── Venue Modal ────────────────────────────────────────────────────────────────
function VenueModal({
  venue,
  onClose,
}: {
  venue: (typeof VENUES)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10,18,40,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 14,
          border: `1px solid ${venue.border}`,
          borderTop: `3px solid ${venue.color}`,
          width: "100%",
          maxWidth: 560,
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 24px 60px rgba(10,18,60,0.18)",
          fontFamily: FONT_BODY,
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "14px 20px",
            background: venue.bg,
            borderBottom: `1px solid ${venue.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              display: "inline-flex", alignItems: "center",
              background: venue.color + "18",
              border: `1px solid ${venue.border}`,
              borderRadius: 4, padding: "2px 9px",
            }}>
              <span style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 11, letterSpacing: "0.18em",
                color: venue.textColor, textTransform: "uppercase",
              }}>
                Venue
              </span>
            </div>
            <h3 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 20, letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#111", margin: 0,
            }}>
              {venue.label}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 4, color: "#8E9BAE", display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body */}
        <div>
          <InfoRow
            icon={<Calendar size={13} color="#AAB8CC" style={{ marginTop: 1, flexShrink: 0 }} />}
            label="Tanggal"
            value={venue.date}
          />
          <InfoRow
            icon={<MapPin size={13} color="#AAB8CC" style={{ marginTop: 1, flexShrink: 0 }} />}
            label="Lokasi"
            value={venue.location}
          />

          {/* Start times */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid #F0F4FA" }}>
            <p style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 13, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "#8E9BAE",
              margin: "0 0 10px",
            }}>
              Jam Start
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {venue.startTimes.map((st, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  background: st.bg, border: `1px solid ${st.border}`,
                  borderRadius: 6, padding: "9px 13px", gap: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: st.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 15, letterSpacing: "0.06em", color: st.textColor }}>
                      {st.cat}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: st.textColor, fontWeight: 700 }}>
                      {st.time}
                    </span>
                    <span style={{
                      fontFamily: FONT_DISPLAY, fontSize: 11,
                      color: st.color + "99", letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      COT {st.cot}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Maps section — LAZY LOADED ── */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid #F0F4FA" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <p style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 13, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "#8E9BAE",
                margin: 0,
              }}>
                Lokasi di Peta
              </p>
              {/* Get Directions — buka native Maps app */}
              <a
                href={venue.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontFamily: FONT_DISPLAY, fontSize: 11,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: venue.textColor,
                  background: venue.bg, border: `1px solid ${venue.border}`,
                  borderRadius: 5, padding: "5px 11px",
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <Navigation size={11} color={venue.color} />
                Get Directions
              </a>
            </div>

            {/* LazyMapEmbed — iframe hanya mount setelah user klik */}
            <LazyMapEmbed
              src={venue.mapsEmbed}
              mapsLink={venue.mapsLink}
              height={210}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Race Day Card body ─────────────────────────────────────────────────────────
function RaceDayBody() {
  const [activeModal, setActiveModal] = useState<(typeof VENUES)[0] | null>(null);

  return (
    <>
      <div style={{ padding: "14px 20px", borderTop: "1px solid #F0F4FA" }}>
        {/* ── Consolidated venue overview — semua venue dalam satu panel ── */}
        {/* Ini lebih UX-friendly dari maps terpisah per venue karena:        */}
        {/* 1. User bisa scan semua lokasi sekaligus                           */}
        {/* 2. Tidak ada iframe load di initial render                         */}
        {/* 3. Detail + maps hanya dimuat saat user memilih venue              */}
        <p style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 13, letterSpacing: "0.16em",
          textTransform: "uppercase", color: "#8E9BAE",
          margin: "0 0 12px",
        }}>
          Venues
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {VENUES.map((venue) => (
            <button
              key={venue.key}
              onClick={() => setActiveModal(venue)}
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                background: venue.bg, border: `1px solid ${venue.border}`,
                borderRadius: 8, padding: "12px 14px",
                cursor: "pointer", textAlign: "left",
                width: "100%", gap: 12,
                transition: "box-shadow 0.15s",
                fontFamily: FONT_BODY,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 2px ${venue.color}44`)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: venue.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, letterSpacing: "0.04em", color: venue.textColor }}>
                    {venue.label}
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: venue.color + "AA", marginTop: 2 }}>
                    {venue.date}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Category pills */}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {venue.startTimes.map((st, i) => (
                    <span key={i} style={{
                      fontFamily: FONT_DISPLAY, fontSize: 10,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: st.textColor,
                      background: st.color + "18",
                      border: `1px solid ${st.border}`,
                      borderRadius: 3, padding: "2px 6px",
                    }}>
                      {st.cat}
                    </span>
                  ))}
                </div>
                <MapPin size={14} color={venue.color} />
              </div>
            </button>
          ))}
        </div>

        <p style={{
          fontFamily: FONT_BODY,
          fontSize: 11, color: "#AAB8CC",
          margin: "10px 0 0",
          letterSpacing: "0.03em",
        }}>
          Tap venue untuk detail jadwal &amp; peta lokasi
        </p>
      </div>

      {activeModal && (
        <VenueModal venue={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}

// ── Normal Event Map Section ────────────────────────────────────────────────────
// Untuk event non-Race Day (misal: Racepack Collection)
// Map juga lazy — hanya load setelah diklik
function NormalEventMap({
  mapsEmbed,
  mapsLink,
}: {
  mapsEmbed: string;
  mapsLink: string;
}) {
  return (
    <div style={{ padding: "14px 20px", borderTop: "1px solid #F0F4FA" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <p style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 13, letterSpacing: "0.16em",
          textTransform: "uppercase", color: "#8E9BAE",
          margin: 0,
        }}>
          Lokasi di Peta
        </p>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontFamily: FONT_DISPLAY, fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: BLUE_TEXT,
            background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`,
            borderRadius: 5, padding: "5px 11px",
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          <Navigation size={11} color={BLUE} />
          Get Directions
        </a>
      </div>
      <LazyMapEmbed src={mapsEmbed} mapsLink={mapsLink} height={200} />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function EventSchedule() {
  const secRef = useRef<HTMLElement | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined")
      setIsLargeScreen(window.innerWidth >= 1024);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".schedule-header",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      ScrollTrigger.create({
        trigger: secRef.current,
        start: "top 76%",
        onEnter: () =>
          gsap.fromTo(
            ".event-card",
            { y: 52, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.58, stagger: 0.14, ease: "power3.out" }
          ),
        once: true,
      });

      if (!isLargeScreen) return;

      const boxes  = secRef.current?.querySelectorAll<HTMLElement>(".animate_event_fade");
      const videos = secRef.current?.querySelectorAll<HTMLElement>(".event-video");

      const showVideo = (idx: number) => {
        videos?.forEach((v, i) => {
          if (i === idx)
            gsap.fromTo(
              v,
              { x: 36, opacity: 0, rotate: 7 },
              { x: 0, rotate: 0, opacity: 1, duration: 0.45, ease: "back.out(1.5)" }
            );
          else gsap.to(v, { opacity: 0, duration: 0.28 });
        });
      };

      boxes?.forEach((box, index) => {
        ScrollTrigger.create({
          trigger: box,
          start: "top center",
          end: "bottom center",
          onEnter: () => showVideo(index),
          onEnterBack: () => showVideo(index),
        });
      });
    },
    { scope: secRef, dependencies: [isLargeScreen] }
  );

  return (
    <section
      ref={secRef}
      style={{
        background: "#F4F7FB",
        padding: "80px 0 96px",
        fontFamily: FONT_BODY,          // ← body font konsisten
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* ── HEADER ── */}
        <div className="schedule-header" style={{ marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
            <div style={{ width: 3, height: 17, background: BLUE, borderRadius: 2 }} />
            <span style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 13, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#8E9BAE",
            }}>
              Jadwal Acara
            </span>
          </div>
          <h2 style={{
            fontFamily: FONT_DISPLAY,          // ← Bebas Neue, sesuai BayanRunInfo
            fontSize: "clamp(52px, 9vw, 96px)",
            fontWeight: 400,                   // Bebas Neue bawaan sudah bold
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color: "#1a2540",
            margin: "0 0 10px",
            lineHeight: 0.93,
          }}>
            EVENT
            <br />
            <span style={{ color: BLUE }}>SCHEDULE</span>
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: "#8E9BAE", margin: 0 }}>
            Jangan lewatkan berbagai keseruan di Bayan Run 2026!
          </p>
        </div>

        {/* ── TIMELINE ── */}
        <div style={{ position: "relative" }}>
          {/* vertical line */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 1,
            background: `linear-gradient(to bottom,${BLUE},#2F4FB8 55%,transparent)`,
            opacity: 0.2,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingLeft: 30 }}>
            {events.map((event) => (
              <div
                key={event.id}
                className="animate_event_fade event-card"
                style={{ opacity: 0, position: "relative" }}
              >
                {/* dot */}
                <div style={{
                  position: "absolute", left: -36, top: 28,
                  width: 11, height: 11, borderRadius: "50%",
                  background: event.color,
                  boxShadow: `0 0 0 3px ${event.color}28`,
                }} />

                <div style={{
                  background: "#fff",
                  border: "1px solid #DDEAF8",
                  borderTop: `3px solid ${event.color}`,
                  borderRadius: 10, overflow: "hidden",
                }}>
                  {/* ── Card header ── */}
                  <div style={{
                    padding: "12px 20px",
                    background: event.bg, borderBottom: `1px solid ${event.border}`,
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: 14,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center",
                        background: event.color + "18",
                        border: `1px solid ${event.border}`,
                        borderRadius: 4, padding: "2px 9px",
                      }}>
                        <span style={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: 11, letterSpacing: "0.18em",
                          color: event.textColor, textTransform: "uppercase",
                        }}>
                          {event.tag}
                        </span>
                      </div>
                      <h3 style={{
                        fontFamily: FONT_DISPLAY,       // ← Bebas Neue, bukan monospace
                        fontSize: "clamp(18px, 3vw, 26px)",
                        fontWeight: 400,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#111", margin: 0,
                      }}>
                        {event.title}
                      </h3>
                    </div>
                    <video
                      className="event-video"
                      src={event.video}
                      autoPlay loop muted playsInline
                      style={{
                        width: 68, height: 68,
                        objectFit: "cover", borderRadius: 7,
                        opacity: 0,
                        display: isLargeScreen ? "block" : "none",
                        flexShrink: 0,
                        border: `1px solid ${event.border}`,
                      }}
                    />
                  </div>

                  {/* ── Card body ── */}
                  <div>
                    {!event.isRaceDay ? (
                      <>
                        <InfoRow
                          icon={<Calendar size={13} color="#AAB8CC" style={{ marginTop: 1, flexShrink: 0 }} />}
                          label="Tanggal"
                          value={event.date!}
                        />
                        <InfoRow
                          icon={<MapPin size={13} color="#AAB8CC" style={{ marginTop: 1, flexShrink: 0 }} />}
                          label="Lokasi"
                          value={event.location!}
                        />
                        {event.dayTime && (
                          <InfoRow
                            icon={<Clock size={13} color="#AAB8CC" style={{ marginTop: 1, flexShrink: 0 }} />}
                            label="Jam"
                            value={event.dayTime}
                          />
                        )}
                        {/* Maps — lazy loaded, dengan Get Directions CTA */}
                        <NormalEventMap
                          mapsEmbed={event.mapsEmbed!}
                          mapsLink={event.mapsLink!}
                        />
                      </>
                    ) : (
                      <RaceDayBody />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── InfoRow ────────────────────────────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "16px 110px 1fr",
      gap: 10, alignItems: "center",
      padding: "9px 20px",
      borderTop: "1px solid #F0F4FA",
      fontFamily: FONT_BODY,
    }}>
      {icon}
      <span style={{
        fontFamily: FONT_DISPLAY,   // ← label pakai Bebas Neue
        fontSize: 13, letterSpacing: "0.12em",
        textTransform: "uppercase", color: "#8E9BAE",
      }}>
        {label}
      </span>
      <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#445", fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
}