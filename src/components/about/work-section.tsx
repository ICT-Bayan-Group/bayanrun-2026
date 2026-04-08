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
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 animate-bounce" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">BAYAN RUN</h1>
          <p className="text-xl text-white/70">Informasi & Ketentuan Lomba</p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 border-2 border-red-500/50 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-red-400">PENTING!</h2>
              <p className="text-lg leading-relaxed">
                Peserta wajib membaca, memahami, dan mematuhi segala Informasi Penting, Syarat dan Ketentuan dan Peraturan Lomba secara seksama sebelum mengikuti lomba. Syarat, Ketentuan dan Peraturan Lomba dibuat untuk menciptakan perlombaan yang sistematis dan teratur, memastikan keselamatan untuk seluruh pihak yang terlibat, terutama keselamatan peserta lomba.
              </p>
            </div>
          </div>
        </div>

        {/* Key Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {importantRules.map((rule, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
              <rule.icon className="w-10 h-10 mb-4 text-blue-400" />
              <h3 className="text-lg font-bold mb-2">{rule.title}</h3>
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
                  className="category-item grid grid-cols-12 items-center gap-6 bg-gradient-to-r from-gray-900 to-gray-950 border border-white/10 rounded-2xl p-8 cursor-pointer transition-all duration-300"
                  onMouseEnter={(e) => handleShow(e.currentTarget)}
                  onMouseLeave={(e) => handleHide(e.currentTarget)}
                >
                  <div className="col-span-5">
                    <h3 className="text-4xl font-bold mb-2">{category.title}</h3>
                    <div className="flex items-center gap-4 text-white/60">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {category.age}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        COT: {category.cutoff}
                      </span>
                    </div>
                  </div>
                  
                  <div className="col-span-7 flex items-center justify-end gap-2">
                    {category.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-sm tracking-wide"
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
                className="bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{category.age}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Cut-Off: {category.cutoff}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/5 border border-white/20 rounded-full text-xs"
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
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-400" />
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

          <div className="bg-gradient-to-br from-orange-900/30 to-orange-950/30 border border-orange-500/30 rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-orange-400" />
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
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/30 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-purple-400" />
            Race Pack
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-purple-300">Isi Race Pack:</h4>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Kaos lari
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Chip pencatat waktu
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Nomor bib
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Souvenir
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-purple-300">Pengambilan:</h4>
              <p className="text-white/80 leading-relaxed">
                Tunjukkan barcode (via email/WhatsApp) dan kartu identitas. Pengambilan oleh pihak lain hanya dengan surat kuasa. Download contoh surat kuasa di <span className="text-purple-300 font-semibold">bayanrun.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cut-Off Times */}
        <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-500/30 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-8 h-8 text-green-400" />
            Waktu Cut-Off (COT)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">{cat.cutoff}</div>
                <div className="text-sm text-white/60">{cat.title}</div>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm mt-6 italic">
            * Peserta yang melebihi COT tidak dianggap sebagai finisher dan tidak menerima medali maupun finisher shirt
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Informasi Lebih Lanjut</h3>
          <p className="text-white/70 mb-4">
            Jika tidak menerima Tanda Terima dalam 5 hari, hubungi:
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="px-6 py-3 bg-green-600/20 border border-green-500/50 rounded-full">
              WhatsApp Admin
            </span>
            <span className="px-6 py-3 bg-purple-600/20 border border-purple-500/50 rounded-full">
              DM Instagram @bayan_open
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}