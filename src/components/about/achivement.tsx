"use client";

import { useRef, useEffect, useState } from "react";
import { Users, Calendar, Award, Activity } from "lucide-react";

const PHOTO_URL =
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765516/20251012060936_-_BOM_7023_uzwd7f.jpg";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Total Runners",
    duration: 2.5,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
  },
  {
    icon: Calendar,
    value: 4,
    suffix: " Tahun",
    label: "Event Berjalan",
    duration: 2,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-700",
  },
  {
    icon: Activity,
    value: 500000,
    suffix: " KM",
    label: "Total Jarak Ditempuh",
    duration: 2.8,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
  },
];

const RunningEventStats = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = stat.duration * 1000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, stepDuration);
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("id-ID");
  };

  return (
    <div ref={sectionRef} className="bg-white text-gray-900 min-h-screen flex flex-col lg:flex-row">

      {/* ── KIRI: Foto sebagai card ── */}
      <div className="w-full lg:w-1/2 flex items-stretch p-8 lg:p-12">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm min-h-[400px]">
          <img
            src={PHOTO_URL}
            alt="Runner event Kalimantan"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="text-white/70 text-xs">© Dokumentasi Event Resmi</p>
          </div>
        </div>
      </div>

      {/* ── KANAN: Konten ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-8 lg:pr-14 lg:pl-4">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-500 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Running Community Kalimantan
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-3">
            Our Journey
          </h1>
          <p className="text-base text-gray-400 leading-relaxed">
            Bersama membangun komunitas pelari terbesar di Kalimantan
          </p>
        </div>

        {/* Stats — vertikal stack */}
        <div className="flex flex-col gap-3 mb-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-5 hover:border-gray-400 hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className={`w-11 h-11 ${stat.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400 tracking-wide mb-0.5">{stat.label}</div>
                  <div className="text-3xl font-semibold text-gray-900 tracking-tight leading-none">
                    {formatNumber(counters[index])}
                    <span className="text-lg font-normal text-gray-400 ml-1">{stat.suffix}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1 rounded-full mb-3 w-fit">
            <Award className="w-3 h-3" />
            Pencapaian Terbesar
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
            Event Terbesar di Kalimantan
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bergabunglah dengan ribuan pelari dari berbagai negara dalam event running terbesar di Kalimantan.
            Bersama kita ciptakan prestasi dan membangun gaya hidup sehat yang berkelanjutan.
          </p>
        </div>

      </div>
    </div>
  );
};

export default RunningEventStats;