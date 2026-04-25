"use client";

import { useRef, useEffect, useState } from "react";
import { Users, Zap, Star } from "lucide-react";

const PHOTO_URL =
  "https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1767765516/20251012060936_-_BOM_7023_uzwd7f.jpg";

const sections = [
  {
    icon: Users,
    kicker: "WHO WE ARE",
    heading: "Tentang Bayan Run",
    body: "Bayan Run 2026 adalah perayaan lari terbesar yang pernah ada di Kalimantan — sebuah komunitas yang lahir dari semangat kebersamaan, kebanggaan daerah, dan gaya hidup sehat yang berkelanjutan bagi seluruh lapisan masyarakat.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    accentColor: "bg-blue-500",
  },
  {
    icon: Zap,
    kicker: "WHAT DRIVES US",
    heading: "Misi Kami",
    body: "Mendorong setiap pelari untuk melampaui batas diri, mempertemukan komunitas dari berbagai latar belakang, dan menjadikan setiap langkah sebagai wujud nyata persatuan. Setiap langkah mendekatkan kita satu sama lain.",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-700",
    accentColor: "bg-teal-500",
  },
  {
    icon: Star,
    kicker: "WHERE WE'RE HEADED",
    heading: "Visi Kami",
    body: "Menjadi event lari ikonik bertaraf internasional yang berpusat di Kalimantan — membangun warisan prestasi, menginspirasi generasi berikutnya, dan menempatkan Bayan Run sebagai simbol kebanggaan Borneo di peta lari dunia.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
    accentColor: "bg-amber-500",
  },
];

const BayanRunAboutMissionVision = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={sectionRef}
      className="bg-gray-200 text-gray-900 min-h-screen flex flex-col lg:flex-row"
    >
      {/* ── KIRI: Foto sebagai card ── */}
      <div className="w-full lg:w-1/2 flex items-stretch p-8 lg:p-12">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm min-h-[400px]">
          <img
            src={PHOTO_URL}
            alt="Bayan Run 2026 Kalimantan"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="text-white/70 text-xs">© Dokumentasi Bayan Run Resmi</p>
          </div>
        </div>
      </div>

      {/* ── KANAN: Konten ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-8 lg:pr-14 lg:pl-4">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-500 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Bayan Run 2026 · Kalimantan
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-3">
            Who We Are
          </h1>
          <p className="text-base text-gray-400 leading-relaxed">
            Mengenal lebih dekat semangat, misi, dan visi Bayan Run 2026
          </p>
        </div>

        {/* Section Cards — vertikal stack */}
        <div className="flex flex-col gap-3 mb-5">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
                <div
                  key={index}
                  className={`bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-start gap-5 hover:border-gray-400 hover:shadow-sm cursor-pointer ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionProperty: "opacity, transform, border-color, box-shadow",
                    transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                    transitionTimingFunction: "ease",
                    transitionDelay: visible ? `${index * 120}ms` : "0ms",
                  }}
                >
                <div
                  className={`w-11 h-11 ${section.iconBg} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon className={`w-5 h-5 ${section.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] tracking-[0.35em] uppercase font-medium ${section.iconColor}`}
                    >
                      <span className={`inline-block w-3 h-px ${section.accentColor}`} />
                      {section.kicker}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1 leading-snug">
                    {section.heading}
                  </div>
                  <div className={`h-[2px] w-8 ${section.accentColor} mb-2 opacity-70`} />
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1 rounded-full mb-3 w-fit">
            <Star className="w-3 h-3" />
            Pencapaian Terbesar
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
            Event Lari Terbesar di Kalimantan
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bergabunglah dengan ribuan pelari dari berbagai kota dan negara dalam event running terbesar di Kalimantan.
            Bersama kita ciptakan sejarah baru di tanah Borneo dan membangun gaya hidup sehat yang berkelanjutan.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BayanRunAboutMissionVision;