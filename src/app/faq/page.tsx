"use client"
import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail, Instagram, Phone } from "lucide-react";
import gsap from "gsap";

const faqData = [
  {
    title: "Kapan BAYAN RUN 2025 akan diadakan?",
    content: "Lomba akan diadakan pada Minggu, 12 Oktober 2025",
    category: "Event"
  },
  {
    title: "Di mana BAYAN RUN 2025 akan diadakan?",
    content: "Lokasi lomba adalah di Lapangan Merdeka 3, Balikpapan Kalimantan Timur",
    category: "Event"
  },
  {
    title: "Kapan Pendaftaran BAYAN RUN 2025 di buka?",
    content: "Sabtu, 5 Juli 2025 pada pukul 15.00 WITA",
    category: "Pendaftaran"
  },
  {
    title: "Kategori apa saja yang akan diperlombakan di BAYAN RUN 2025?",
    content: "Half Marathon, 10K, 5K, 5K teens dan 2.5K Kids",
    category: "Kategori"
  },
  {
    title: "Apakah akan ada acara pengambilan paket lomba?",
    content: "Ya, akan ada acara pengambilan paket lomba BAYAN RUN 2025. Waktu dan lokasi akan diumumkan kemudian.",
    category: "Race Pack"
  },
  {
    title: "Apa saja isi dari paket lomba?",
    content: "• Running Jersey untuk seluruh kategori\n• Jacket & Bag (convertible) untuk seluruh kategori\n• Foldable Bottle untuk seluruh kategori\n• Race BIB + Timming Chip untuk seluruh kategori\n• BIB Pin untuk seluruh kategori\n• Running Cap khusus untuk peserta 10K dan Half Marathon\n• Running Belt khusus untuk peserta Half Marathon",
    category: "Race Pack"
  },
  {
    title: "Apakah boleh mengambil racepack pada hari lomba di tanggal 12 Oktober 2025?",
    content: "Tidak. Paket lomba (race pack) hanya dapat diambil pada acara pengambilan paket lomba yang diselenggarakan sebelum lomba.",
    category: "Race Pack"
  },
  {
    title: "Berapa biaya pendaftaran lomba BAYAN RUN 2025?",
    content: "• Half Marathon: Rp. 375.000\n• 10K: Rp. 275.000\n• 5K: Rp. 220.000\n• 5K teens: Rp. 200.000\n• KIDS 2.5K: Rp. 150.000",
    category: "Pendaftaran"
  },
  {
    title: "Metode pembayaran apa yang digunakan untuk pendaftaran?",
    content: "Peserta membayar biaya pendaftaran dengan menggunakan metode QRIS dan Virtual Account Bank",
    category: "Pendaftaran"
  },
  {
    title: "Bagaimana saya mengetahui bahwa pendaftaran saya telah diterima?",
    content: "Ketika pendaftaran dan pembayaran telah sukses, konfirmasi akan muncul di layar komputer peserta untuk disimpan atau dicetak. Peserta juga akan menerima konfirmasi dalam bentuk surat elektronik (email) yang akan dikirimkan ke alamat email yang telah didaftarkan. Pastikan peserta menuliskan/memasukkan alamat email yang benar dan berfungsi saat pendaftaran.\n\nInformasi mengenai surel konfirmasi: Jika surel konfirmasi belum masuk di Inbox, silakan mengecek folder spam/junk/promotions. Di dalam surel konfirmasi, ada tautan untuk login ke data pendaftaran Anda. Setelah login, anda bisa melihat data pendaftaran.",
    category: "Pendaftaran"
  },
  {
    title: "Apakah saya dapat mengubah kategori setelah saya terdaftar?",
    content: "Anda tidak diperkenankan untuk mengganti kategori lomba jika sudah terdaftar. Jika anda ingin mendaftar kategori lomba lain, silakan melakukan pendaftaran baru.",
    category: "Pendaftaran"
  },
  {
    title: "Apakah bisa melakukan perubahan data pendaftaran setelah terdaftar sebagai peserta?",
    content: "Tidak. Jika pendaftaran sudah konfirm, maka perubahan data tidak bisa dilakukan. Tetapi jika ada kesalahan pengetikan saat pengisian data, perbaikan data dilakukan dengan mengirimkan email ke admin@bayanrun.com dan konfirmasi ke WA admin 082154815113 berisi data-data yang hendak diperbaiki. Dalam hal perbaikan data, Panitia berhak meminta validasi kepada peserta berupa foto KTP dan konfirmasi pembayaran untuk memastikan keabsahannya.",
    category: "Pendaftaran"
  },
  {
    title: "Berapa batasan usia kategori MASTER?",
    content: "Peserta Usia Kategori master di BAYAN RUN 2025 ini adalah usia 45 tahun ke atas",
    category: "Kategori"
  },
  {
    title: "Berapa waktu maksimum (cut off time) COT bagi peserta untuk menyelesaikan lomba?",
    content: "• Half Marathon (21,1K) harus menyelesaikan lomba dengan waktu maksimum 4 jam (4:00) sejak lomba kategori ini dimulai.\n• Peserta kategori 10K harus menyelesaikan lomba dengan waktu maksimal 2 jam (2:00) sejak lomba kategori ini dimulai.\n• Peserta kategori 5K harus menyelesaikan lomba dengan waktu maksimal 1 jam (1:00) sejak lomba kategori ini dimulai.\n• Peserta kategori KIDS harus menyelesaikan lomba dengan waktu maksimal 30 menit (00:30) sejak lomba kategori ini dimulai.\n\nPeserta yang tidak menyelesaikan lomba sesuai syarat waktu maksimum (cut-off time) akan didiskualifikasi, sehingga tidak akan mendapatkan medali penamat/finisher medal dan penamat/finisher jersey (khusus peserta kategori half marathon). Hasil lombanya tidak ditampilkan.",
    category: "Peraturan"
  },
  {
    title: "Apakah ada batasan umur untuk mengikuti BAYAN RUN 2025?",
    content: "Ya ada batasan umur. Berikut ketentuan batasan umur setiap kategori jarak di BAYAN RUN 2025:\n\n• Peserta kategori Half Marathon Nasional: usia minimal 17 tahun\n• Peserta kategori 10K Nasional: usia minimal 17 tahun\n• Peserta kategori 5K Nasional: usia minimal 17 tahun\n• Peserta kategori 5K Teens remaja: Usia 13 - 16 tahun\n• Peserta kategori Kids: usia 6 - 12 tahun\n\nJika peserta memiliki umur di bawah ketentuan di atas dan ingin mendaftar, pastikan mendapatkan persetujuan dari orang tua. Dan pada saat mengambil paket lomba, WAJIB melampirkan surat keterangan/persetujuan orang tua yang menyatakan peserta di bawah ketentuan umur dalam keadaan sehat jasmani dan rohani dan menyatakan bahwa orang tua bertanggung jawab sepenuhnya.",
    category: "Peraturan"
  },
  {
    title: "Bagaimana ketentuan mengenai pengunduran diri dari peserta BAYAN RUN 2025?",
    content: "Para peserta yang tidak hadir atau membatalkan diri untuk berpartisipasi pada hari lomba karena alasan apapun tidak akan mendapatkan pengembalian uang biaya pendaftaran. Slot lomba tidak boleh dipindahkan kepada orang lain.",
    category: "Peraturan"
  },
  {
    title: "Dapatkah saya menitipkan pengambilan paket lomba kepada orang lain?",
    content: "Ya, anda dapat menitipkan kepada orang lain. Anda harus menyertakan surat kuasa (tanpa materai) dan salinan tanda bukti diri berupa KTP/SIM/Paspor/KITAS. Orang yang mewakilkan anda harus menunjukkan surat kuasa yang sudah ditanda tangani, salinan konfirmasi pengambilan dan salinan tanda bukti diri.",
    category: "Race Pack"
  },
  {
    title: "Apakah yang akan didapatkan peserta yang sudah menyelesaikan lomba?",
    content: "Para peserta penamat lomba (finisher) akan mendapatkan medali penamat (finisher medal), minuman penyegar, dan buah. Khusus peserta Half Marathon akan mendapatkan kaos penamat (finisher jersey)",
    category: "Hadiah"
  },
  {
    title: "Bagaimana penentuan podium pemenang dilakukan?",
    content: "Penentuan pemenang podium dan peringkat juara akan ditentukan berdasarkan catatan waktu saat dimulainya lomba (gun time). Pelari yang menganggap dirinya berpeluang untuk meraih podium disarankan untuk mengambil posisi mulai lomba/start di baris paling depan. Hasil lomba selengkapnya akan ditampilkan di situs web www.bayanrun.com",
    category: "Peraturan"
  },
  {
    title: "Bagaimana dengan rute lomba?",
    content: "Rute lomba akan dipublikasikan jika rute sudah mendapatkan persetujuan dan konfirmasi resmi dari pihak-pihak terkait.",
    category: "Event"
  },
  {
    title: "Bolehkah saya berlomba sambil membawa binatang peliharaan di rute?",
    content: "Tidak. Untuk kenyamanan dan keamanan seluruh peserta, binatang peliharaan tidak diijinkan berada di area lomba dan rute lomba.",
    category: "Peraturan"
  },
  {
    title: "Apakah peserta diperbolehkan menggunakan sepeda, sepatu roda atau kereta bayi selama di rute lomba?",
    content: "Tidak. Peserta tidak diperbolehkan menggunakan sepeda, sepatu roda, atau kereta bayi selama berlomba di rute lomba. Kereta bayi tidak diperbolehkan berada di rute dikarenakan rute masih berbagi dengan penggunaan jalan lain yaitu mobil, motor, truk, dan kendaraan bermotor lainnya.",
    category: "Peraturan"
  },
  {
    title: "Apakah disediakan area parkir di area lomba?",
    content: "Ya, akan disediakan parkir kendaraan di lokasi lomba. Informasi tersebut dapat diakses di situs web resmi BAYAN RUN 2025, yaitu www.bayanrun.com dan akun Instagram resmi BAYAN RUN 2025, @bayan_open",
    category: "Fasilitas"
  },
  {
    title: "Apakah disediakan tempat beribadah (sholat subuh) di area lomba?",
    content: "Ya, akan disediakan tempat beribadah untuk sholat subuh di lokasi lomba. Informasi tersebut dapat diakses di situs web resmi BAYAN RUN 2025, yaitu www.bayanrun.com dan akun Instagram resmi BAYAN RUN 2025, @bayan_open",
    category: "Fasilitas"
  },
  {
    title: "Apakah disediakan fasilitas penitipan barang di area lomba?",
    content: "Ya, akan disediakan penitipan barang namun terbatas di lokasi lomba. Informasi tersebut dapat diakses di situs web resmi BAYAN RUN 2025, yaitu www.bayanrun.com dan akun Instagram resmi BAYAN RUN 2025, @bayan_open",
    category: "Fasilitas"
  },
  {
    title: "Dimana saya dapat memperoleh informasi lomba?",
    content: "Informasi lomba selengkapnya, silakan akses akun Instagram resmi BAYAN RUN 2025, @bayan_open dan web resmi BAYAN RUN 2025 di www.bayanrun.com",
    category: "Informasi"
  }
];

export default function FAQPage() {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleShow = (el: gsap.TweenTarget) => {
    const items = containerRef.current?.querySelectorAll(".faq-item") || [];
    
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
      scale: 1.02,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleHide = (el: gsap.TweenTarget) => {
    const items = containerRef.current?.querySelectorAll(".faq-item") || [];
    
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
    <div className="min-h-screen bg-blue-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">FAQ</h1>
          <p className="text-xl text-white/70">Pertanyaan yang Sering Diajukan</p>
          <p className="text-white mt-2 max-w-3xl mx-auto">
            Punya pertanyaan tentang BayanRun 2025? Temukan jawaban atas pertanyaan paling umum di bawah ini.
          </p>
        </div>

        {/* FAQ Items - Desktop (2 Columns) */}
        <div className="hidden lg:block mb-16" ref={containerRef}>
          <div className="grid grid-cols-2 gap-6">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="faq-item bg-gradient-to-r from-gray-900 to-gray-950 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                onMouseEnter={(e) => handleShow(e.currentTarget)}
                onMouseLeave={(e) => handleHide(e.currentTarget)}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all duration-300"
                  onClick={() => toggleSection(idx)}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 bg-white/5 border border-white/20 rounded-full text-xs tracking-wide">
                        {faq.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-white leading-tight">
                      {faq.title}
                    </h2>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {openSections.includes(idx) ? (
                      <ChevronUp className="w-5 h-5 text-blue-400 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-300" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openSections.includes(idx) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent mb-4"></div>
                    <p className="text-white/70 whitespace-pre-line leading-relaxed text-base">
                      {faq.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Items - Mobile */}
        <div className="lg:hidden space-y-4 mb-16">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => toggleSection(idx)}
              >
                <div className="flex-1 pr-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/20 rounded-full text-xs tracking-wide mb-2 inline-block">
                    {faq.category}
                  </span>
                  <h2 className="text-lg font-semibold text-white">
                    {faq.title}
                  </h2>
                </div>
                
                <div className="flex-shrink-0">
                  {openSections.includes(idx) ? (
                    <ChevronUp className="w-5 h-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSections.includes(idx) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent mb-4"></div>
                  <p className="text-white/70 whitespace-pre-line leading-relaxed">
                    {faq.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3">
            <MessageCircle className="w-8 h-8 text-blue-400" />
            Masih Butuh Bantuan?
          </h3>
          <p className="text-white/70 text-center mb-8">
            Jangan ragu untuk menghubungi tim dukungan kami melalui saluran kontak resmi
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <Mail className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-sm text-white/60">admin@bayanrun.com</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <Phone className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <h4 className="font-semibold mb-2">WhatsApp</h4>
              <p className="text-sm text-white/60">082154815113</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <Instagram className="w-8 h-8 mx-auto mb-3 text-pink-400" />
              <h4 className="font-semibold mb-2">Instagram</h4>
              <p className="text-sm text-white/60">@bayan_open</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <HelpCircle className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <h4 className="font-semibold mb-2">Website</h4>
              <p className="text-sm text-white/60">bayanrun.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}