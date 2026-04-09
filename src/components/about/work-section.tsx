"use client";

import { Building2, Award, Clock, MapPin, Users, AlertCircle, CheckCircle } from "lucide-react";
import React, { useRef } from "react";
import gsap from "gsap";

const categories = [
  {
    title: "Half Marathon (21K)",
    age: "17+ tahun",
    cutoff: "4 jam",
    tags: ["Nasional", "Medal", "Finisher Shirt"]
  },
  {
    title: "10K Run",
    age: "17+ tahun",
    cutoff: "2 jam",
    tags: ["Nasional", "Medal"]
  },
  {
    title: "5K Run",
    age: "17+ tahun",
    cutoff: "1 jam",
    tags: ["Nasional", "Medal"]
  },
  {
    title: "5K Teenagers",
    age: "13-16 tahun",
    cutoff: "1 jam",
    tags: ["Remaja", "Medal"]
  },
  {
    title: "2.5K Kids",
    age: "6-12 tahun",
    cutoff: "50 menit",
    tags: ["Anak-anak", "Medal"]
  }
];

const importantRules = [
  {
    icon: AlertCircle,
    title: "Non-Refundable",
    desc: "Biaya pendaftaran tidak dapat dikembalikan"
  },
  {
    icon: Users,
    title: "Verifikasi Usia",
    desc: "Penyelenggara berhak memverifikasi usia peserta"
  },
  {
    icon: CheckCircle,
    title: "Hanya RegNowOnline",
    desc: "Pendaftaran hanya melalui website resmi"
  },
  {
    icon: Clock,
    title: "Cut-Off Time",
    desc: "Peserta wajib finish sebelum waktu COT"
  }
];

export default function BayanRunInfo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleShow = (el: HTMLElement) => {
    const items = containerRef.current?.querySelectorAll(".category-item") || [];
    
    items.forEach((item) => {
      if (item !== el) {
        gsap.to(item, {
          opacity: 0.3,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    });

    gsap.to(el, {
      scale: 1.05,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleHide = (el: HTMLElement) => {
    const items = containerRef.current?.querySelectorAll(".category-item") || [];
    
    items.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    gsap.to(el, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 animate-bounce" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-blue-700">BAYAN RUN 2026</h1>
          <p className="text-xl font-semibold text-gray-600">Informasi & Ketentuan Lomba</p>
        </div>

        {/* Important Notice */}
        <div className="bg-lime-300 border-2 border-yellow-500/50 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="w-8 h-8 text-black flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-black">PENTING!</h2>
              <p className="text-lg leading-relaxed">
                Peserta wajib membaca, memahami, dan mematuhi segala Informasi Penting, Syarat dan Ketentuan dan Peraturan Lomba secara seksama sebelum mengikuti lomba. Syarat, Ketentuan dan Peraturan Lomba dibuat untuk menciptakan perlombaan yang sistematis dan teratur, memastikan keselamatan untuk seluruh pihak yang terlibat, terutama keselamatan peserta lomba.
              </p>
            </div>
          </div>
        </div>

        {/* Key Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {importantRules.map((rule, idx) => (
            <div key={idx} className="bg-blue-700 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
              <rule.icon className="w-10 h-10 mb-4 text-white" />
              <h3 className="text-lg text-white font-bold mb-2">{rule.title}</h3>
              <p className="text-sm text-white/60">{rule.desc}</p>
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold">Kategori Lomba</h2>
            <Award className="w-12 h-12 text-yellow-500" />
          </div>
          
          <div className="hidden lg:block" ref={containerRef}>
            <div className="space-y-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="category-item grid grid-cols-12 items-center gap-6 bg-yellow-500 border border-white/10 rounded-2xl p-8 cursor-pointer transition-all duration-300"
                  onMouseEnter={(e) => handleShow(e.currentTarget)}
                  onMouseLeave={(e) => handleHide(e.currentTarget)}
                >
                  <div className="col-span-5">
                    <h3 className="text-4xl text-white font-bold mb-2">{category.title}</h3>
                    <div className="flex items-center gap-4 text-white/60">
                      <span className="flex items-center gap-2 text-white">
                        <Users className="w-4 h-4 text-white" />
                        {category.age}
                      </span>
                      <span className="flex items-center gap-2 text-white">
                        <Clock className="w-4 h-4 text-white" />
                        COT: {category.cutoff}
                      </span>
                    </div>
                  </div>
                  
                  <div className="col-span-7 flex items-center justify-end gap-2">
                    {category.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-white text-sm tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Categories */}
          <div className="lg:hidden space-y-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className=" bg-yellow-500 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-3 text-white">{category.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">{category.age}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">Cut-Off: {category.cutoff}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/5 border border-white/20 rounded-full text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Info */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-500 border border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-3xl text-white font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-white" />
              Pendaftaran
            </h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Pendaftaran hanya melalui website <strong>RegNowOnline</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Pilih kategori sesuai usia</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Tanda terima dikirim via email & WhatsApp</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Ambil racepack dengan barcode & kartu identitas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Batas pembayaran: 15 hari setelah pendaftaran</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-500 border border-orange-500/30 rounded-2xl p-8">
            <h3 className="text-3xl text-white font-bold mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-white" />
              Peraturan Penting
            </h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Biaya pendaftaran <strong>tidak dapat dikembalikan</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Nomor bib & chip <strong>tidak dapat dialihkan</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Wajib pakai nomor bib di dada & chip waktu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Shortcut atau potong rute akan didiskualifikasi</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span>Penyelenggara berhak melakukan tes doping</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Race Package Info */}
        <div className="bg-yellow-500 border border-purple-500/30 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl text-white font-bold mb-6 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-white" />
            Race Pack
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-white">Isi Race Pack:</h4>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Kaos lari
                </li>
                <li className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Chip pencatat waktu
                </li>
                <li className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Nomor bib
                </li>
                <li className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Souvenir
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-white">Pengambilan:</h4>
              <p className="text-white leading-relaxed">
                Tunjukkan barcode (via email/WhatsApp) dan kartu identitas. Pengambilan oleh pihak lain hanya dengan surat kuasa. Download contoh surat kuasa di bayanrun.com
              </p>
            </div>
          </div>
        </div>

        {/* Cut-Off Times */}
        <div className="bg-lime-400 border border-green-500/30 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-black" />
            Waktu Cut-Off (COT)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white/5 border border-black/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-black mb-2">{cat.cutoff}</div>
                <div className="text-sm text-black">{cat.title}</div>
              </div>
            ))}
          </div>
          <p className="text-black/60 text-sm mt-6 italic">
            * Peserta yang melebihi COT tidak dianggap sebagai finisher dan tidak menerima medali maupun finisher shirt
          </p>
        </div>
      </div>
    </div>
  );
}