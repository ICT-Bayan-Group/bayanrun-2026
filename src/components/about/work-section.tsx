"use client";

import {
  AlertCircle, Camera, CheckCircle, ChevronDown, ClipboardList, Clock, Cpu,
  FileText, Flag, Gavel, Route, Scale, Shield, Timer, Trophy, Users,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

/* ───────────────────────── Design tokens ───────────────────────── */
const BLUE        = "#1D5FD4";
const BLUE_BG     = "#EEF4FF";
const BLUE_BORDER = "#C5D9F8";
const BLUE_TEXT   = "#0C3E9B";
const RED         = "#DC2626";
const RED_TEXT    = "#991B1B";
const RED_BG      = "#FEF2F2";
const RED_BORDER  = "#FECACA";
const BEBAS       = "'Bebas Neue', Arial Black, sans-serif";

const PHOTO_SRC =
  "https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630015/20251012064855_-_BOM_0690_f1v4kw_8_11zon_sm9ipn_punuqf.webp";

/* ───────────────────────── Types ───────────────────────── */
type Item = {
  text: string;
  sub?: string[];
  subStyle?: "alpha" | "bullet";
};

type Section = {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  textColor: string;
  bg: string;
  border: string;
  items: Item[];
};

/* ───────────────────────── Data: kategori (dari docx) ───────────────────────── */
const categories = [
  { sub: "HM",       title: "Half Marathon",             age: ">17 tahun",   cot: "3,5 jam (3:30)",      raceDay: "11 Oktober 2026", color: BLUE,      textColor: BLUE_TEXT, bg: BLUE_BG,   border: BLUE_BORDER },
  { sub: "10K",      title: "10K Umum",                  age: ">17 tahun",   cot: "2 jam (02:00)",       raceDay: "11 Oktober 2026", color: "#0E7ABF", textColor: "#094F80", bg: "#E6F4FD", border: "#A8D8F5" },
  { sub: "5K",       title: "5K Umum",                   age: ">17 tahun",   cot: "1 jam (01:00)",       raceDay: "11 Oktober 2026", color: "#0B6B8A", textColor: "#073E50", bg: "#E3F2F7", border: "#9CD3E4" },
  { sub: "TEENS",    title: "5K Teenagers (Remaja)",     age: "13 – 16 tahun", cot: "1 jam (01:00)",     raceDay: "11 Oktober 2026", color: "#2F4FB8", textColor: "#1A2E7A", bg: "#EEF0FF", border: "#BCC5F4" },
  { sub: "KIDS A",   title: "Kids Dash – A (2.5K)",      age: "8 – 12 tahun", cot: "30 menit (00:30)",   raceDay: "10 Oktober 2026", color: RED,       textColor: RED_TEXT,  bg: RED_BG,    border: RED_BORDER },
  { sub: "KIDS B",   title: "Kids Dash – B (800m)",      age: "5 – 7 tahun",  cot: "10 menit (00:10)",   raceDay: "10 Oktober 2026", color: "#B91C1C", textColor: "#7F1D1D", bg: "#FFF5F5", border: "#FECACA" },
  { sub: "PENDAMPING", title: "Pendamping Kids Dash – B", age: ">17 tahun",  cot: "—",                  raceDay: "10 Oktober 2026", color: "#B91C1C", textColor: "#7F1D1D", bg: "#FFF5F5", border: "#FECACA" },
];

/* ───────────────────────── Data: ringkasan cepat ───────────────────────── */
const quickFacts = [
  { big: "Non-Refundable", label: "Biaya Pendaftaran",   desc: "Biaya pendaftaran yang sudah dibayarkan tidak dapat dikembalikan.",                         icon: AlertCircle, color: RED,       bg: RED_BG,    border: RED_BORDER },
  { big: "15 Menit",       label: "Batas Pembayaran",    desc: "Dihitung sejak formulir pendaftaran dikirimkan.",                                          icon: Clock,       color: BLUE,      bg: BLUE_BG,   border: BLUE_BORDER },
  { big: "5 Hari",         label: "Tanda Terima",        desc: "Belum menerima Tanda Terima? Hubungi penyelenggara setelah 5 hari dari pendaftaran.",     icon: ClipboardList, color: "#0E7ABF", bg: "#E6F4FD", border: "#A8D8F5" },
  { big: "Gun Time",       label: "Dasar Cut-Off Time",  desc: "Waktu yang digunakan untuk COT berdasarkan Gun Time.",                                     icon: Timer,       color: "#0B6B8A", bg: "#E3F2F7", border: "#9CD3E4" },
  { big: "30 Menit",       label: "Batas Protes",        desc: "Protes diajukan paling lambat 30 menit setelah hasil sementara diumumkan.",                 icon: Gavel,       color: "#2F4FB8", bg: "#EEF0FF", border: "#BCC5F4" },
  { big: "Bib + Chip",     label: "Wajib Dikenakan",     desc: "Nomor bib di dada dan chip waktu wajib dipakai dari garis awal hingga garis akhir.",       icon: Cpu,         color: "#b82f2f", bg: "#ffeeee", border: "#f4bcbc" },
];

/* ───────────────────────── Data: isi docx (sama persis) ───────────────────────── */
const sections: Section[] = [
  {
    id: "pendaftaran",
    title: "Pendaftaran",
    icon: ClipboardList,
    color: BLUE, textColor: BLUE_TEXT, bg: BLUE_BG, border: BLUE_BORDER,
    items: [
      { text: "Pendaftaran hanya melalui website **www.bayanrun.com**." },
      {
        text: "Peserta memilih kategori sesuai yang ingin dipilih, dengan syarat usia :",
        subStyle: "alpha",
        sub: [
          "HM: >17 tahun",
          "10K Umum: >17 tahun",
          "5K Umum: >17 tahun",
          "5K Teenagers (Remaja): 13 – 16 tahun",
          "Kids Dash - A (2.5K): 8 – 12 tahun",
          "Kids Dash - B (800m): 5 – 7 tahun",
          "Pendamping Kids Dash – B: > 17 tahun",
        ],
      },
      { text: "Usia dihitung berdasarkan \"**Hari Lomba**\", yaitu 10 Oktober 2026 untuk Kids Dash-A (2.5K) dan Kids Dash- B (800m), serta 11 Oktober 2026 untuk 5K *Teenagers* (Remaja)." },
      { text: "Peserta wajib mengisi data pendaftaran dengan informasi yang akurat (termasuk tanggal lahir). Penyelenggara berhak membatalkan Pendaftaran Peserta jika ditemukan informasi yang tidak akurat. Informasi yang salah juga akan berakibat pembatalan hasil lomba dan pemberian hadiah." },
      { text: "Peserta akan mendapatkan Tanda Terima yang akan dikirim melalui e-mail dan Whatsapp setelah peserta melengkapi syarat pendaftaran" },
      { text: "Jika Peserta tidak menerima Tanda Terima tersebut dalam waktu 5 (lima) hari dari setelah pendaftaran, maka mohon peserta dapat menghubungi penyelenggara melalui nomor WhatsApp admin atau DM Instagram @bayan_open atau melalui menu Kontak di web." },
      { text: "Peserta yang telah terdaftar wajib mengambil paket *Race Pack* yang berisi kaos lari, *chip* waktu, nomor bib, dan souvenir pada tempat yang ditentukan dengan menunjukan **Barcode** yang dikirimkan melalui e-mail / WhatsApp dan membawa kartu identitas (sebagaimana disebutkan dalam Tanda Terima)." },
      { text: "Pengambilan paket *Race Pack* oleh pihak lain yang ditunjuk untuk mewakili peserta tidak diperkenankan jika tidak melampirkan surat kuasa (contoh surat kuasa bisa di unduh di laman resmi www.bayanrun.com)." },
    ],
  },
  {
    id: "syarat-ketentuan",
    title: "Syarat dan Ketentuan",
    icon: FileText,
    color: "#0E7ABF", textColor: "#094F80", bg: "#E6F4FD", border: "#A8D8F5",
    items: [
      {
        text: "Persyaratan usia untuk Bayan Run 2026 adalah sebagai berikut:",
        subStyle: "bullet",
        sub: [
          "Half Marathon: 17 tahun",
          "10K: 17 tahun",
          "5K Umum: 17 tahun",
          "5K Teenagers (Remaja): 13 – 16 tahun",
          "Kids Dash - A (2.5K): 8 – 12 tahun",
          "Kids Dash - B (800m): 5 – 7 tahun",
        ],
      },
      { text: "Usia dihitung berdasarkan \"**Hari Lomba**\", yaitu 10 Oktober 2026 untuk Kids Dash-A (2.5K) dan Kids Dash- B (800m), serta 11 Oktober 2026 untuk Half Marathon, 10K, 5K Umum, dan 5K *Teenagers* (Remaja)." },
      { text: "Penyelenggara berhak melakukan verifikasi atas usia peserta sebelum, pada saat dan sesudah lomba. Pengecualian atas hal ini hanya dapat dilakukan berdasarkan persetujuan Penyelenggara." },
      { text: "Penyelenggara berhak menutup pendaftaran jika seluruh kuota pesertanya telah terisi penuh." },
      { text: "Pendaftaran akan diproses setelah pembayaran pendaftaran selesai dilakukan. Batas waktu pembayaran adalah 15 menit sejak formulir pendaftaran dikirimkan." },
      { text: "Peserta yang mengikuti lomba adalah peserta yang telah melakukan registrasi melalui www.bayanrun.com. Pemindahtanganan dan/atau praktek jual-beli pendaftaran lomba tidak diperbolehkan. Penyelenggara berhak untuk melakukan pembatalan pendaftaran kepesertaan apabila ditemukan indikasi pemindahantanganan dan/atau penjualan registrasi ini." },
      { text: "Biaya pendaftaran tidak dapat diminta kembali (*non-refundable*)." },
      { text: "Penyelenggara berhak untuk membatasi dan menolak pendaftaran tanpa alasan." },
      { text: "Penyelenggara berhak menghubungi dan mewawancarai Peserta melalui telepon atau cara lain untuk mendapatkan data yang diperlukan sehubungan dengan pendaftaran peserta." },
      { text: "Penyelenggara berhak untuk menolak pendaftaran jika pendaftar memberikan informasi yang salah, tidak melakukan pembayaran atau gagal memenuhi persyaratan yang ditentukan dalam form pendaftaran." },
      { text: "Penyelenggara berhak untuk membatalkan lomba bila terjadi kondisi diluar kekuasaan Penyelenggara, antara lain kejadian alam luar biasa, hujan deras, petir, wabah, huru hara dan atau kondisi apapun yang menurut Penyelenggara membahayakan peserta" },
      { text: "Jika lomba dibatalkan karena alasan di luar kekuasaan Penyelenggara, sebagaimana disebutkan di Pasal 9 tersebut diatas, Penyelenggara tidak akan mengembalikan biaya pendaftaran yang telah diterima dan Penyelenggara tidak bertanggung jawab atau kewajiban apapun atas hal tersebut." },
      { text: "Olahraga lari bukanlah olah raga yang tidak memiliki risiko dan karenanya masing-masing pelari wajib memastikan bahwa kondisi kesehatannya fit sebelum dan pada saat berpartisipasi dalam lomba **Bayan Run 2026**. Masing-masing pelari bertanggung jawab atas kondisi kesehatannya masing-masing dan dengan mengikuti lomba, pelari dianggap sudah memahami risiko dari lomba. Penyelenggara tidak bertanggung jawab atas cidera ataupun kematian yang timbul selama atau sesudah lomba yang dialami oleh peserta yang tidak memenuhi kondisi tersebut diatas, kecuali apabila cidera atau kematian tersebut merupakan akibat dari kelalaian yang terbukti disengaja atau *gross negligence* Penyelenggara." },
      { text: "Penyelenggara berhak untuk tidak mengizinkan atau mendiskualifikasi peserta yang diketahui atau diduga tidak fit untuk mengikuti lomba. Jika ada peserta yang cidera pada saat lomba, dalam keadaan tertentu sesuai dengan rekomendasi petugas kesehatan yang ditunjuk Penyelenggara untuk mengawasi lomba, peserta tersebut dapat dirawat di rumah sakit yang ditunjuk Penyelenggara dengan biaya perawatan tidak melebihi jumlah yang disepakati oleh Penyelenggara dan rumah sakit tersebut, dihari yang sama disaat lomba diadakan." },
      { text: "Penyelenggara berhak untuk mendiskualifikasi peserta dan/atau membatalkan hasil lomba sebagai akibat dari adanya pelanggaran atau tidak dipenuhinya ketentuan lomba. Penyelenggara tidak wajib mengembalikan biaya pendaftaran dalam hal tersebut." },
    ],
  },
  {
    id: "ketentuan-lomba",
    title: "Ketentuan Lomba",
    icon: Flag,
    color: "#0B6B8A", textColor: "#073E50", bg: "#E3F2F7", border: "#9CD3E4",
    items: [
      { text: "Pendaftaran dan chip-waktu tidak dapat dialihkan (*non-transferable*)." },
      { text: "Penyelenggara berhak untuk mendiskualifikasi atau mengecualikan peserta (dari segala kompetisi) yang telah memberikan data dan informasi yang tidak benar atau diperkirakan telah mengkonsumsi makanan/minuman/obat yang dilarang. Penyelenggara tidak wajib mengembalikan biaya pendaftaran." },
      { text: "Peserta yang tidak melaksanakan lomba pada waktu yang ditentukan tidak akan menerima hasil lomba." },
      { text: "Peserta wajib menghentikan lomba segera setelah jika diminta oleh petugas, tim medis, direktur lomba, wasit dan atau petugas keamanan / marshals." },
      { text: "Penyelenggara akan menetapkan waktu cut-off pada lokasi tertentu. Peserta yang gagal melewati tempat yang ditentukan dalam waktu yang ditentukan wajib berhenti dari lomba dan menaiki angkutan resmi yang ditetapkan Penyelenggara. Angkutan resmi tersebut akan mengangkut peserta ke titik finish." },
      {
        text: "Cut-off-time (COT):",
        subStyle: "alpha",
        sub: [
          "Half Marathon : 3,5 jam (3:30),",
          "10K : 2 jam (02:00),",
          "5K (Open/Teens) : 1 jam (01:00),",
          "Kids Dash – A (2.5K) : 30 menit (00:30),",
          "Kids Dash – B (800m) : 10 menit (00:10).",
        ],
      },
      { text: "Seluruh peserta harus dapat menyelesaikan lomba dibawah waktu COT dari setiap kategori. Bagi peserta yang menyelesaikan lomba melampaui waktu COT tidak akan dianggap sebagai *finisher* dan tidak mendapatkan medali dan *finisher shirt* (*finisher shirt* khusus untuk peserta *Half Marathon*)." },
      { text: "Waktu yang digunakan untuk COT adalah berdasarkan **Gun Time**." },
      { text: "Pihak pemenang, atau pihak berpotensi menang, dapat menanyakan atau menyampaikan keberatan dalam waktu 30 menit sesudah hasil diterbitkan atau sesudah hadiah diberikan, hal mana yang timbul lebih dahulu. Peserta dapat mengajukan protes kepada panitia dengan mengisi formulir dan dipungut biaya sebesar Rp. 1.000.000,- (satu juta rupiah) per protes." },
      { text: "Penyelenggara berhak melakukan tes *dopping* kepada peserta. Segala hadiah hanya akan diberikan setelah pemenang menyelesaikan tes doping yang diminta oleh Penyelenggara. Titel juara akan dicabut apabila pemenang gagal dalam tes dopingnya." },
      { text: "Untuk kategori KIDS DASH-B wajib bersama pendamping." },
      { text: "Pendamping hanya mendampingi anak berlari, tidak diperkenankan untuk mendorong atau menarik anak pada saat perlombaan berlangsung, pelanggaran terhadap aturan ini akan didiskualifikasi" },
      { text: "Pendamping tidak boleh dengan sengaja menghalangi peserta lain untuk berlari, pelanggaran terhadap aturan ini akan didiskualifikasi." },
    ],
  },
  {
    id: "pengawasan-rute",
    title: "Pengawasan Rute Lomba",
    icon: Route,
    color: "#2F4FB8", textColor: "#1A2E7A", bg: "#EEF0FF", border: "#BCC5F4",
    items: [
      { text: "Setiap peserta yang tidak mematuhi arahan, perintah, atau instruksi dari petugas lomba, petugas keamanan atau marshal (secara bersama-sama disebut \"Petugas\"), atau peserta yang melakukan tindakan tidak sportif, atau tersinggung oleh tindakan atau ucapan dari Petugas, maka peserta tersebut dapat didiskualifikasi dari lomba oleh Petugas." },
      { text: "Setiap peserta yang ditemukan oleh Petugas atau perlengkapan pengawasan memiliki keuntungan yang tidak jujur dengan cara memperpendek rute lomba (\"memotong jalan\") akan didiskualifikasi dari lomba." },
      { text: "Setiap peserta yang mengikuti lomba tanpa menggunakan nomor bib atau chip waktu resmi yang diberikan kepadanya dapat diberhentikan dan didiskualifikasi dari lomba. Peserta wajib memasang nomor dada pada bagian depan baju yang dipakai." },
      { text: "Setiap peserta yang mengikuti lomba menggunakan nomor bib yang berbeda dengan data peserta terdaftar dapat diberhentikan dan didiskualifikasi dari lomba." },
    ],
  },
  {
    id: "keputusan-panitia",
    title: "Keputusan Panitia",
    icon: Shield,
    color: RED, textColor: RED_TEXT, bg: RED_BG, border: RED_BORDER,
    items: [
      { text: "Seluruh peserta wajib mematuhi Peraturan Perlombaan (*Race Rules*), ketentuan teknis, arahan Race Director, Juri, Marshal, dan Panitia **Bayan Run 2026**." },
      { text: "Segala keputusan yang diambil oleh *Race Director*, Juri, dan Panitia berdasarkan data *timing system*, catatan *marshal*, foto, video resmi lomba, serta bukti lain yang dianggap sah adalah final, mengikat, dan wajib diterima oleh seluruh peserta." },
      { text: "Panitia berhak melakukan diskualifikasi (DQ), penalti waktu, perubahan hasil, atau tindakan lain yang dianggap perlu demi menjaga keselamatan, sportivitas, dan integritas perlombaan." },
      { text: "Peserta yang terbukti memberikan informasi palsu, menggunakan bib orang lain, memotong rute, menerima bantuan yang tidak diperbolehkan, atau melakukan tindakan tidak sportif dapat didiskualifikasi tanpa kompensasi apa pun." },
    ],
  },
  {
    id: "protes-banding",
    title: "Protes dan Banding",
    icon: Scale,
    color: "#B91C1C", textColor: "#7F1D1D", bg: "#FFF5F5", border: "#FECACA",
    items: [
      { text: "Protes hanya dapat diajukan oleh peserta yang secara langsung terdampak oleh keputusan atau hasil perlombaan." },
      { text: "Protes harus diajukan secara tertulis kepada Race Director paling lambat 30 menit setelah hasil sementara diumumkan." },
      {
        text: "Protes wajib disertai:",
        subStyle: "alpha",
        sub: [
          "Nama peserta dan nomor bib.",
          "Uraian kejadian secara rinci.",
          "Bukti pendukung yang relevan (foto, video, data GPS, saksi, atau bukti lain yang dapat diverifikasi).",
          "Formulir protes resmi yang telah ditandatangani.",
        ],
      },
      { text: "Untuk menghindari protes yang tidak berdasar, peserta wajib menyetorkan uang jaminan banding sebesar Rp500.000 (lima ratus ribu rupiah). Dana tersebut akan dikembalikan apabila banding dinyatakan diterima; apabila ditolak, dana menjadi milik panitia sebagai biaya administrasi proses banding. (Prinsip deposit seperti ini juga digunakan dalam berbagai kompetisi atletik internasional.)" },
      { text: "*Race Director* bersama Dewan Banding (*Jury of Appeal*) akan melakukan kajian terhadap seluruh bukti yang diajukan." },
      { text: "Keputusan Dewan Banding akan disampaikan secara tertulis dan bersifat final, mutlak, serta tidak dapat diganggu gugat." },
    ],
  },
  {
    id: "chip-bib",
    title: "Chip Pencatat Waktu dan Nomor Dada",
    icon: Cpu,
    color: BLUE, textColor: BLUE_TEXT, bg: BLUE_BG, border: BLUE_BORDER,
    items: [
      { text: "Seluruh peserta akan menerima alat chip pencatat waktu. Peserta wajib untuk mengenakan chip pencatat waktu sesuai dengan petunjuk yang ditetapkan oleh Penyelenggara." },
      { text: "Waktu tembakan (gun time) adalah waktu yang digunakan untuk menentukan hadiah utama." },
      { text: "Catatan waktu untuk peserta umum akan ditentukan oleh alat chip pencatat waktu (waktu bersih) sejak peserta melewati garis awal sampai peserta melewati garis akhir." },
      { text: "Peserta diwajibkan untuk selalu memakai chip pencatat waktu mulai dari garis awal hingga melewati garis akhir." },
      { text: "Peserta yang menggunakan lebih dari satu chip pencatat waktu akan didiskualifikasi dan catatan waktunya tidak akan direkam." },
      { text: "Peserta yang kehilangan chip pencatat waktunya akan didiskualifikasi." },
      { text: "Peserta wajib memulai lomba sesudah waktu start yang ditentukan." },
      { text: "Peserta wajib mengenakan nomor bib di dada." },
      { text: "Dalam hal tertentu, karena kesalahan teknis, chip pencatat waktu tidak dapat dideteksi, maka dengan demikian Peserta tidak memiliki catatan waktu." },
    ],
  },
  {
    id: "hadiah",
    title: "Hadiah Uang Tunai",
    icon: Trophy,
    color: "#0E7ABF", textColor: "#094F80", bg: "#E6F4FD", border: "#A8D8F5",
    items: [
      { text: "Hadiah akan diberikan untuk pemenang pria dan wanita untuk masing-masing kategori." },
      { text: "Pengumuman dan pemberian hadiah di podium akan dilakukan kepada pemenang pertama, kedua dan ketiga." },
      { text: "Hanya pemenang kategori Half Marathon, 10K, 5K UMUM, 5K TEENS, KIDS DASH-A dan KIDS DASH-B yang berhak atas hadiah." },
      { text: "Hadiah diberikan dalam mata uang Rupiah dan dikenakan pajak serta potongan sesuai dengan ketentuan yang berlaku." },
    ],
  },
  {
    id: "foto",
    title: "Foto dan Dokumentasi",
    icon: Camera,
    color: "#0B6B8A", textColor: "#073E50", bg: "#E3F2F7", border: "#9CD3E4",
    items: [
      { text: "Penyelenggara berhak untuk menggunakan foto dan dokumentasi Peserta yang diambil saat mengikuti lomba untuk keperluan yang berhubungan dengan *event* BAYAN RUN atau event serupa di masa yang akan datang." },
    ],
  },
];

/* ───────────────────────── Helpers ───────────────────────── */
function useBayanFont() {
  useEffect(() => {
    if (document.getElementById("bayan-run-font")) return;
    const link = document.createElement("link");
    link.id = "bayan-run-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);
}

/** Render **bold** dan *italic* sederhana */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**")) return <strong key={i} style={{ fontWeight: 700, color: "#111" }}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("*")) return <em key={i}>{p.slice(1, -1)}</em>;
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </>
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

function Ticker() {
  return (
    <div className="relative bg-gray-200 py-4 md:py-6 lg:py-8 overflow-hidden">
      <style>{`
        @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-track { display: flex; width: max-content; animation: ticker-scroll 20s linear infinite; }
      `}</style>
      <div className="ticker-track">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <span className="text-2xl md:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight uppercase mx-6 md:mx-8">THE NEXT LEVEL</span>
            <span className="text-2xl md:text-4xl lg:text-7xl font-black text-blue-900 mx-3 md:mx-4">•</span>
            <span className="text-2xl md:text-4xl lg:text-5xl font-black text-red-600 tracking-tight uppercase mx-6 md:mx-8">KEEP MOVING KEEP STRONG</span>
            <span className="text-2xl md:text-4xl lg:text-7xl font-black text-red-600 mx-3 md:mx-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Quick fact card ───────────────────────── */
function FactCard({ f }: { f: (typeof quickFacts)[0] }) {
  return (
    <div className="rr-fact" style={{ background: "#fff", border: `1px solid ${f.border}`, borderTop: `3px solid ${f.color}`, borderRadius: 12, padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: f.bg, border: `1px solid ${f.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <f.icon size={15} color={f.color} />
        </div>
        <span style={{ fontFamily: BEBAS, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8E9BAE" }}>{f.label}</span>
      </div>
      <div style={{ fontFamily: BEBAS, fontSize: "clamp(26px, 6vw, 34px)", lineHeight: 1, letterSpacing: "0.02em", color: f.color }}>{f.big}</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#556" }}>{f.desc}</p>
    </div>
  );
}

/* ───────────────────────── Accordion section ───────────────────────── */
function SectionCard({
  s, index, open, onToggle,
}: { s: Section; index: number; open: boolean; onToggle: () => void }) {
  return (
    <section id={s.id} className="rr-section" style={{ background: "#fff", border: "1px solid #DDEAF8", borderLeft: `4px solid ${s.color}`, borderRadius: 12, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${s.id}-panel`}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: open ? s.bg : "#fff", border: "none", borderBottom: open ? `1px solid ${s.border}` : "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}
      >
        <span style={{ fontFamily: BEBAS, fontSize: 13, color: s.color, opacity: 0.55, letterSpacing: "0.1em", flexShrink: 0 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + "18", border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <s.icon size={16} color={s.color} />
        </div>
        <h3 style={{ fontFamily: BEBAS, fontSize: "clamp(17px, 4.6vw, 22px)", letterSpacing: "0.05em", textTransform: "uppercase", color: s.textColor, margin: 0, flex: 1, lineHeight: 1.15 }}>
          {s.title}
        </h3>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: s.textColor, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "2px 8px", flexShrink: 0 }}>
          {s.items.length} POIN
        </span>
        <ChevronDown size={18} color={s.color} style={{ flexShrink: 0, transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      {open && (
        <ol id={`${s.id}-panel`} style={{ listStyle: "none", margin: 0, padding: "6px 0" }}>
          {s.items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderBottom: i < s.items.length - 1 ? "1px solid #F0F4FA" : "none" }}>
              <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: s.bg, border: `1px solid ${s.border}`, color: s.textColor, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                {i + 1}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#333", wordBreak: "break-word" }}>
                  <Rich text={item.text} />
                </p>
                {item.sub && (
                  <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    {item.sub.map((sub, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "8px 12px" }}>
                        <span style={{ flexShrink: 0, minWidth: 16, fontFamily: BEBAS, fontSize: 14, color: s.color, lineHeight: "20px" }}>
                          {item.subStyle === "alpha" ? `${String.fromCharCode(97 + j)}.` : "•"}
                        </span>
                        <span style={{ fontSize: 13, lineHeight: 1.6, color: s.textColor, fontWeight: 600 }}>{sub}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/* ───────────────────────── Page ───────────────────────── */
export default function RulesRegulations() {
  useBayanFont();

  const [openIds, setOpenIds] = useState<string[]>([sections[0].id]);

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const allOpen = openIds.length === sections.length;

  return (
    <div style={{ minHeight: "100vh", background: "#F4F7FB", color: "#111", fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes hero-fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scroll-bounce { 0%, 100% { transform: translateY(0) rotate(45deg); } 50% { transform: translateY(8px) rotate(45deg); } }
        .hero-content  { animation: hero-fade-in 0.9s ease forwards; }
        .hero-subtitle { animation: hero-fade-in 0.9s 0.3s ease both; }
        .scroll-arrow-el { animation: scroll-bounce 1.2s ease-in-out infinite; }

                .rr-fact { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .rr-fact:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(29,95,212,0.12); }


        .rr-cat-table { display: block; }
        .rr-cat-cards { display: none; }
        @media (max-width: 760px) {
          .rr-cat-table { display: none; }
          .rr-cat-cards { display: flex; }
        }
        .rr-cat-row { transition: background 0.15s; }
        .rr-cat-row:hover { background: #F4F7FB !important; }
      `}</style>

      {/* ── HERO ── */}
      <div style={{ position: "relative", width: "100%", height: "100vh", minHeight: 480, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={PHOTO_SRC} alt="Bayan Run 2026" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 3, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "0 clamp(16px, 4vw, 40px)" }}>
          <h1 className="hero-content" style={{ fontFamily: BEBAS, fontSize: "clamp(48px, 11vw, 108px)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "0.01em", margin: 0, textTransform: "uppercase", color: "#fff" }}>
            RULES <span style={{ color: BLUE }}>&amp;</span> REGULATIONS
          </h1>
          <p className="hero-subtitle" style={{ fontSize: "clamp(10px, 2.8vw, 13px)", color: "#fff", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, margin: 0 }}>
            Informasi &amp; Ketentuan Lomba · Balikpapan, Kalimantan Timur
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Scroll</span>
          <div className="scroll-arrow-el" style={{ width: 18, height: 18, borderRight: "2px solid rgba(255,255,255,0.5)", borderBottom: "2px solid rgba(255,255,255,0.5)" }} />
        </div>
      </div>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── MAIN ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px) 80px" }}>

        {/* PENTING */}
        <div style={{ margin: "36px 0 28px", border: `1px solid ${BLUE_BORDER}`, borderLeft: `4px solid ${BLUE}`, borderRadius: 12, padding: "clamp(16px, 3vw, 24px)", background: BLUE_BG, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <AlertCircle size={20} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontFamily: BEBAS, fontSize: 18, letterSpacing: "0.16em", color: BLUE_TEXT, textTransform: "uppercase", margin: 0 }}>Penting!</p>
            <p style={{ fontSize: 14, color: "#334", lineHeight: 1.75, margin: 0 }}>
              Peserta wajib membaca, memahami, dan mematuhi segala Informasi Penting, Syarat dan Ketentuan dan Peraturan Lomba secara seksama sebelum mengikuti lomba. Syarat, Ketentuan dan Peraturan Lomba adalah dibuat untuk menciptakan perlombaan yang sistematis dan teratur, memastikan keselamatan untuk seluruh pihak yang terlibat, terutama keselamatan peserta lomba.
            </p>
            <p style={{ fontSize: 14, color: "#334", lineHeight: 1.75, margin: 0 }}>
              Biaya Pendaftaran yang sudah dibayarkan adalah tidak dapat dikembalikan (<em>non-refundable</em>) dan Penyelenggara berhak untuk menolak dan membatalkan pendaftaran bagi pendaftar yang ditemukan memberikan keterangan yang tidak benar, tidak melakukan pembayaran sebagaimana mestinya atau gagal memenuhi persyaratan lomba.
            </p>
          </div>
        </div>

        {/* RINGKASAN */}
        <div style={{ marginBottom: 48 }}>
          <SL>Ringkasan Penting</SL>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 18 }}>
            {quickFacts.map((f, i) => <FactCard key={i} f={f} />)}
          </div>
        </div>

        {/* KATEGORI */}
        <div style={{ marginBottom: 48 }}>
          <SL>Kategori, Usia &amp; Cut-Off Time</SL>

          {/* Desktop / tablet */}
          <div className="rr-cat-table" style={{ marginTop: 18, border: "1px solid #DDEAF8", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "96px 1.6fr 1fr 1.1fr 1.1fr", background: "#F0F6FF", borderBottom: "1px solid #DDEAF8", padding: "10px 16px", gap: 10 }}>
              {["Kode", "Kategori", "Usia", "Cut-Off Time", "Hari Lomba"].map((h) => (
                <span key={h} style={{ fontFamily: BEBAS, fontSize: 12, color: "#8E9BAE", textTransform: "uppercase", letterSpacing: "0.14em" }}>{h}</span>
              ))}
            </div>
            {categories.map((c, i) => (
              <div key={i} className="rr-cat-row" style={{ display: "grid", gridTemplateColumns: "96px 1.6fr 1fr 1.1fr 1.1fr", alignItems: "center", gap: 10, padding: "12px 16px", background: "#fff", borderTop: i > 0 ? "1px solid #F0F4FA" : "none", borderLeft: `3px solid ${c.color}` }}>
                <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: "2px 9px", width: "fit-content" }}>
                  <span style={{ fontFamily: BEBAS, fontSize: 12, color: c.textColor, letterSpacing: "0.08em" }}>{c.sub}</span>
                </div>
                <span style={{ fontFamily: BEBAS, fontSize: 17, color: "#111", letterSpacing: "0.01em" }}>{c.title}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#667" }}><Users size={12} />{c.age}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: BEBAS, fontSize: 15, color: c.textColor, letterSpacing: "0.03em" }}>
                  {c.cot !== "—" && <Timer size={13} color={c.color} />}{c.cot}
                </span>
                <span style={{ fontSize: 13, color: "#445", fontWeight: 600 }}>{c.raceDay}</span>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="rr-cat-cards" style={{ flexDirection: "column", gap: 10, marginTop: 18 }}>
            {categories.map((c, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #DDEAF8", borderLeft: `4px solid ${c.color}`, borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 4, padding: "2px 9px" }}>
                    <span style={{ fontFamily: BEBAS, fontSize: 12, color: c.textColor, letterSpacing: "0.08em" }}>{c.sub}</span>
                  </div>
                  <span style={{ fontFamily: BEBAS, fontSize: 18, color: "#111" }}>{c.title}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: "#F4F7FB", borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ fontFamily: BEBAS, fontSize: 11, letterSpacing: "0.14em", color: "#8E9BAE", textTransform: "uppercase" }}>Usia</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#334", marginTop: 2 }}>{c.age}</div>
                  </div>
                  <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "8px 10px" }}>
                    <div style={{ fontFamily: BEBAS, fontSize: 11, letterSpacing: "0.14em", color: "#8E9BAE", textTransform: "uppercase" }}>Cut-Off Time</div>
                    <div style={{ fontFamily: BEBAS, fontSize: 16, color: c.textColor, marginTop: 1 }}>{c.cot}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#667" }}>
                  <span style={{ fontFamily: BEBAS, letterSpacing: "0.12em", color: "#8E9BAE", textTransform: "uppercase", marginRight: 6 }}>Hari Lomba</span>
                  <strong style={{ color: "#334" }}>{c.raceDay}</strong>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "#8E9BAE", marginTop: 12, lineHeight: 1.7 }}>
            * Usia dihitung berdasarkan &quot;Hari Lomba&quot;. Bagi peserta yang menyelesaikan lomba melampaui waktu COT tidak akan dianggap sebagai <em>finisher</em> dan tidak mendapatkan medali dan <em>finisher shirt</em> (<em>finisher shirt</em> khusus untuk peserta <em>Half Marathon</em>). Waktu COT berdasarkan <strong>Gun Time</strong>.
          </p>
        </div>

        {/* PERATURAN LENGKAP */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
            <SL>Peraturan Lengkap</SL>
            <button
              onClick={() => setOpenIds(allOpen ? [] : sections.map((s) => s.id))}
              style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: BEBAS, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE_TEXT, background: BLUE_BG, border: `1px solid ${BLUE_BORDER}`, borderRadius: 6, padding: "6px 12px" }}
            >
              <CheckCircle size={13} color={BLUE} />
              {allOpen ? "Tutup Semua" : "Buka Semua"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sections.map((s, i) => (
              <SectionCard key={s.id} s={s} index={i} open={openIds.includes(s.id)} onToggle={() => toggle(s.id)} />
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#AAB8CC", marginTop: 40, letterSpacing: "0.04em" }}>
          Bayan Run 2026 · Race Rules &amp; Regulations · www.bayanrun.com
        </p>
      </div>
    </div>
  );
}