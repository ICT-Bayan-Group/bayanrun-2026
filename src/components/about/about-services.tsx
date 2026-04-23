"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Calendar, MapPin, Clock } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    tag: "Day 1",
    title: "Racepack Collection",
    date: "Saturday, 11 October 2025",
    location: "Gedung Kesenian Balikpapan",
    dayTime: "08:00 – 19:00 WITA",
    video: "/video1.mp4",
    color: "#C97000",
    mapsEmbed: "https://www.google.com/maps?q=Gedung%20Kesenian%20Balikpapan&output=embed",
  },
  {
    id: 2,
    tag: "Race Day",
    title: "Race Day",
    date: "Sunday, 12 October 2025",
    location: "Lapangan Merdeka III, Balikpapan",
    startTimes: [
      { cat: "Half Marathon", time: "05:30 WITA", cot: "4 Jam",    color: "#D92B1A" },
      { cat: "10K",           time: "06:00 WITA", cot: "2 Jam",    color: "#C97000" },
      { cat: "5K Open",       time: "06:10 WITA", cot: "1 Jam",    color: "#1A8C38" },
      { cat: "5K Teens",      time: "06:10 WITA", cot: "1 Jam",    color: "#0057B8" },
      { cat: "2.5K Kids",     time: "06:20 WITA", cot: "50 Menit", color: "#7B2DB0" },
    ],
    video: "/video2.mp4",
    color: "#D92B1A",
    mapsEmbed: "https://www.google.com/maps?q=Lapangan%20Merdeka%20Balikpapan&output=embed",
  },
];

export default function EventSchedule() {
  const secRef = useRef<HTMLElement | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setIsLargeScreen(window.innerWidth >= 1024);
  }, []);

  useGSAP(() => {
    // Header
    gsap.fromTo(".schedule-header", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });

    // Cards
    ScrollTrigger.create({
      trigger: secRef.current,
      start: "top 76%",
      onEnter: () => gsap.fromTo(".event-card", { y: 52, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58, stagger: 0.14, ease: "power3.out" }),
      once: true,
    });

    if (!isLargeScreen) return;

    // Video scroll-trigger
    const boxes  = secRef.current?.querySelectorAll<HTMLElement>(".animate_event_fade");
    const videos = secRef.current?.querySelectorAll<HTMLElement>(".event-video");

    const showVideo = (idx: number) => {
      videos?.forEach((v, i) => {
        if (i === idx) gsap.fromTo(v, { x: 36, opacity: 0, rotate: 7 }, { x: 0, rotate: 0, opacity: 1, duration: 0.45, ease: "back.out(1.5)" });
        else           gsap.to(v, { opacity: 0, duration: 0.28 });
      });
    };

    boxes?.forEach((box, index) => {
      ScrollTrigger.create({
        trigger: box,
        start: "top center",
        end: "bottom center",
        onEnter:     () => showVideo(index),
        onEnterBack: () => showVideo(index),
      });
    });
  }, { scope: secRef, dependencies: [isLargeScreen] });

  return (
    <section ref={secRef} style={{ background: "#f1f4f5", padding: "80px 0 96px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* ── HEADER ── */}
        <div className="schedule-header" style={{ marginBottom: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
            <div style={{ width: 3, height: 17, background: "#D92B1A", borderRadius: 2 }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B0B0B0" }}>Jadwal Acara</span>
          </div>
          <h2 style={{ fontSize: "clamp(38px,7vw,76px)", fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#2363e4", margin: "0 0 10px", lineHeight: 0.93 }}>
            EVENT<br /><span style={{ color: "#D92B1A" }}>SCHEDULE</span>
          </h2>
          <p style={{ fontSize: 14, color: "#999", margin: 0 }}>Jangan lewatkan berbagai keseruan di Bayan Run 2026!</p>
        </div>

        {/* ── TIMELINE ── */}
        <div style={{ position: "relative" }}>
          {/* vertical line */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,#D92B1A,#C97000 55%,transparent)", opacity: 0.25 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: 30 }}>
            {events.map((event) => (
              <div key={event.id} className={`animate_event_fade event-card`} style={{ opacity: 0, position: "relative" }}>
                {/* dot */}
                <div style={{ position: "absolute", left: -36, top: 30, width: 11, height: 11, borderRadius: "50%", background: event.color, boxShadow: `0 0 0 3px ${event.color}28` }} />

                <div style={{ background: "#fff", border: "1px solid #E8E8E8", borderTop: `3px solid ${event.color}`, borderRadius: 14, overflow: "hidden" }}>

                  {/* card header */}
                  <div style={{ padding: "26px 30px 22px", borderBottom: "1px solid #F0F0F0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
                    <div>
                      <div style={{ display: "inline-flex", alignItems: "center", background: event.color+"16", border: `1px solid ${event.color}30`, borderRadius: 5, padding: "3px 11px", marginBottom: 11 }}>
                        <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.2em", color: event.color, textTransform: "uppercase" }}>{event.tag}</span>
                      </div>
                      <h3 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", color: "#111", margin: 0, lineHeight: 1 }}>
                        {event.title}
                      </h3>
                    </div>
                    <video className="event-video" src={event.video} autoPlay loop muted playsInline
                      style={{ width: 76, height: 76, objectFit: "cover", borderRadius: 9, opacity: 0, display: isLargeScreen ? "block" : "none", flexShrink: 0, border: `1px solid ${event.color}25` }} />
                  </div>

                  {/* card body */}
                  <div style={{ padding: "22px 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 18, marginBottom: event.startTimes ? 26 : 0 }}>
                      {/* Date */}
                      <InfoRow icon={<Calendar size={14} color="#bbb" style={{ marginTop: 2, flexShrink: 0 }} />} label="Date" value={event.date} />
                      {/* Location */}
                      <InfoRow icon={<MapPin size={14} color="#bbb" style={{ marginTop: 2, flexShrink: 0 }} />} label="Location" value={event.location} />
                      {/* Hours (day 1) */}
                      {event.dayTime && <InfoRow icon={<Clock size={14} color="#bbb" style={{ marginTop: 2, flexShrink: 0 }} />} label="Hours" value={event.dayTime} />}
                    </div>

                    {/* Start times (day 2) */}
                    {event.startTimes && (
                      <div>
                        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#B0B0B0", margin: "0 0 12px" }}>Start Times</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {event.startTimes.map((st, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F7F6F3", border: "1px solid #EBEBEB", borderRadius: 7, padding: "9px 14px", gap: 10 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: st.color, flexShrink: 0 }} />
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#222", letterSpacing: "0.01em" }}>{st.cat}</span>
                              </div>
                              <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                                <span style={{ fontSize: 13, color: "#111", fontWeight: 800 }}>{st.time}</span>
                                <span style={{ fontSize: 9, fontWeight: 700, color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase" }}>COT {st.cot}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Maps */}
                    <div style={{ marginTop: 22 }}>
                      <iframe src={event.mapsEmbed}
                        style={{ width: "100%", height: 190, borderRadius: 9, border: "1px solid #E8E8E8", display: "block" }}
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
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

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      {icon}
      <div>
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C0C0C0", margin: "0 0 3px" }}>{label}</p>
        <p style={{ fontSize: 13, color: "#333", margin: 0, fontWeight: 600, whiteSpace: "pre-line" }}>{value}</p>
      </div>
    </div>
  );
}