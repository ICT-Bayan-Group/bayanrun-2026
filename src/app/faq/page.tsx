"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    title: "Kapan BAYAN RUN 2026 akan diadakan?",
    content: "Lomba akan dilaksanakan pada:\n- Sabtu, 10 Oktober 2026 @ BSCC Dome (KIDS DASH 2.5K dan 800M)\n- Minggu, 11 Oktober 2026 @ Lap. Merdeka III (21K, 10K, 5K)",
    category: "Event"
  },
  {
    title: "Di mana BAYAN RUN 2026 akan diadakan?",
    content: "Lomba akan dilaksanakan di:\n- Sabtu, 10 Oktober 2026 @ BSCC Dome (KIDS DASH 2.5K dan 800M)\n- Minggu, 11 Oktober 2026 @ Lap. Merdeka III (21K, 10K, 5K)",
    category: "Event"
  },
  {
    title: "Kapan Pendaftaran BAYAN RUN 2026 di buka?",
    content: "Sabtu, 13 Juni 2026 pukul 15.00 WITA",
    category: "Pendaftaran"
  },
  {
    title: "Kategori apa saja yang akan diperlombakan di BAYAN RUN 2026?",
    content: "21K, 10K, 5K Open, 5K Teens, Kids Dash-A (2.5K), Kids Dash-B (800M)",
    category: "Kategori"
  },
  {
    title: "Apakah akan ada acara pengambilan paket lomba?",
    content: "Ya, akan ada acara pengambilan paket lomba BAYAN RUN 2026. Waktu dan lokasi akan diumumkan kemudian hari.",
    category: "Race Pack"
  },
  {
    title: "Apa saja isi dari paket lomba?",
    content: "• Running Jersey (semua kategori)\n• Finisher Jersey (21K)\n• Multifunction Bag (21K, 10K, 5K, Kids Dash A & B)\n• Magnetic bib pin (21K, 10K, 5K, Kids Dash A & B)\n• Running Belt (21K)\n• Running Cap (21K, 10K)\n• Soft Flask (21K, 10K, 5K)\n• Suplemen (21K, 10K, 5K)\n• Snack Pack for Kids (Kids Dash)",
    category: "Race Pack"
  },
  {
    title: "Apakah boleh mengambil race pack pada hari lomba di tanggal 10-11 Oktober 2026?",
    content: "Paket perlombaan (race pack) hanya dapat diambil pada 9-10 Oktober 2026 di BSCC Dome, Balikpapan.",
    category: "Race Pack"
  },
  {
    title: "Berapa biaya pendaftaran lomba BAYAN RUN 2026?",
    content: "• 21K: Rp. 450.000\n• 10K: Rp. 325.000\n• 5K Open: Rp. 275.000\n• 5K Teens: Rp. 200.000\n• Kids Dash - A (2.5K): Rp. 150.000\n• Kids Dash - B (800M): Rp. 150.000",
    category: "Pendaftaran"
  },
  {
    title: "Metode pembayaran apa yang digunakan untuk pendaftaran?",
    content: "Peserta membayar biaya pendaftaran dengan menggunakan metode QRIS dan Virtual Account Bank MANDIRI, BCA, BNI, BRI, PERMATA, GoPay, & QRIS",
    category: "Pendaftaran"
  },
  {
    title: "Bagaimana saya mengetahui bahwa pendaftaran saya telah di terima?",
    content: "Setelah pendaftaran dan pembayaran berhasil, peserta akan melihat halaman konfirmasi yang dapat disimpan atau dicetak sebagai bukti pendaftaran.\n\nSelain itu, konfirmasi pendaftaran juga akan dikirimkan ke alamat email yang didaftarkan dan juga akan dikirimkan melalui WhatsApp. Oleh karena itu, pastikan alamat email dan nomor WhatsApp yang dimasukkan sudah benar dan masih aktif.\n\nJika email konfirmasi belum ditemukan di kotak masuk (Inbox), silakan periksa folder Spam, Junk, atau Promotions.\n\nJika dalam 5 hari dari waktu pendaftaran belum mendapatkan pesan konfirmasi di email dan/atau WhatsApp, silakan untuk menghubungi kontak yang tertera di website ini.\n\nDi dalam email konfirmasi terdapat tautan untuk masuk (login) ke akun pendaftaran Anda. Setelah login, Anda dapat melihat dan memeriksa data pendaftaran yang telah dibuat.",
    category: "Pendaftaran"
  },
  {
    title: "Apakah saya dapat mengubah kategori setelah saya terdaftar?",
    content: "Peserta yang telah terdaftar tidak dapat melakukan perubahan kategori lomba. Apabila ingin mengikuti kategori yang berbeda, peserta diwajibkan melakukan pendaftaran baru (selama kuota masih ada).",
    category: "Pendaftaran"
  },
  {
    title: "Apakah bisa melakukan perubahan data pendaftaran setelah terdaftar sebagai peserta?",
    content: "Tidak. Jika pendaftaran sudah dikonfirmasi, maka perubahan data tidak bisa dilakukan. Tetapi jika ada kesalahan pengetikan saat pengisian data, perbaikan data dilakukan dengan mengirimkan email ke admin@bayanrun.com dan konfirmasi ke WA Customer Service 082154815113 berisi data-data yang hendak diperbaiki.\n\nDalam hal perbaikan data, Panitia berhak meminta validasi kepada peserta berupa foto KTP dan konfirmasi pembayaran untuk memastikan keabsahannya.",
    category: "Pendaftaran"
  },
  {
    title: "Berapa batas usia untuk kategori Master?",
    content: "Kategori Master pada BAYAN RUN 2026 diperuntukkan bagi peserta yang berusia 45 tahun atau lebih pada hari pelaksanaan lomba.",
    category: "Kategori"
  },
  {
    title: "Berapa waktu maksimum (cut off time) COT bagi peserta untuk menyelesaikan lomba?",
    content: "Setiap peserta wajib menyelesaikan lomba dalam batas waktu (Cut-Off Time/COT) berikut, yang dihitung sejak start kategori masing-masing:\n\n• Half Marathon (21K): maksimal 3 jam 30 menit (3:30)\n• 10K: maksimal 2 jam (2:00)\n• 5K: maksimal 1 jam (1:00)\n• Kids Dash-A: maksimal 30 menit (0:30)\n• Kids Dash-B: maksimal 20 menit (0:20)\n\nPeserta yang tidak berhasil menyelesaikan lomba dalam batas waktu yang ditentukan akan didiskualifikasi (DNF/Did Not Finish).\n\nPeserta yang didiskualifikasi tidak berhak menerima:\na. Medali finisher, dan\nb. Finisher jersey (khusus peserta kategori Half Marathon/21K).\n\nSelain itu, hasil lomba peserta yang didiskualifikasi tidak akan dicantumkan dalam hasil resmi perlombaan.",
    category: "Peraturan"
  },
  {
    title: "Apakah ada batasan umur untuk mengikuti BAYAN RUN 2026?",
    content: "Ya, BAYAN RUN 2026 menerapkan batasan usia sesuai dengan kategori lomba yang diikuti, sebagai berikut:\n\n• Half Marathon (21K) Nasional: minimal 17 tahun\n• 10K Nasional: minimal 17 tahun\n• 5K Nasional: minimal 17 tahun\n• 5K Teens: usia 13–16 tahun\n• Kids Dash-A: usia 8–12 tahun\n• Kids Dash-B: usia 5–7 tahun\n\nPeserta yang berusia di bawah batas usia minimum untuk kategori yang dipilih wajib mendapatkan persetujuan dari orang tua atau wali.\n\nPada saat pengambilan race pack, peserta wajib menyerahkan surat persetujuan dari orang tua/wali yang menyatakan bahwa:\n1. Peserta dalam kondisi sehat jasmani dan rohani untuk mengikuti lomba.\n2. Orang tua/wali mengetahui dan menyetujui keikutsertaan peserta.\n3. Orang tua/wali bersedia bertanggung jawab penuh atas keikutsertaan peserta selama kegiatan berlangsung.\n\nPanitia berhak menolak keikutsertaan peserta yang tidak dapat menunjukkan surat persetujuan tersebut pada saat pengambilan race pack.",
    category: "Peraturan"
  },
  {
    title: "Bagaimana ketentuan mengenai pengunduran diri dari peserta BAYAN RUN 2026?",
    content: "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan (non-refundable) dengan alasan apa pun, termasuk apabila peserta membatalkan keikutsertaan atau tidak hadir pada hari pelaksanaan lomba.\n\nSelain itu, slot pendaftaran yang telah dibeli tidak dapat dipindahtangankan, dialihkan, atau digunakan oleh orang lain.",
    category: "Peraturan"
  },
  {
    title: "Dapatkah saya menitipkan pengambilan paket lomba kepada orang lain?",
    content: "Ya, Race Pack dapat diambil oleh perwakilan.\n\nUntuk pengambilan melalui perwakilan, peserta wajib menyiapkan:\n1. Surat kuasa yang telah ditandatangani (tanpa materai).\n2. Salinan identitas peserta (KTP/SIM/Paspor/KITAS).\n3. Salinan atau bukti konfirmasi pengambilan Race Pack.\n\nSaat mengambil Race Pack, perwakilan wajib menunjukkan seluruh dokumen tersebut kepada panitia.\n\nPanitia berhak menolak pengambilan Race Pack apabila dokumen yang dipersyaratkan tidak lengkap atau tidak sesuai.",
    category: "Race Pack"
  },
  {
    title: "Apakah yang akan didapatkan peserta yang sudah menyelesaikan lomba?",
    content: "Peserta yang berhasil menyelesaikan lomba (finisher) akan mendapatkan finisher medal, refreshment, post-race meals, dan buah-buahan. Khusus peserta kategori Half Marathon (21K), juga akan mendapatkan finisher jersey.",
    category: "Hadiah"
  },
  {
    title: "Bagaimana penentuan podium pemenang dilakukan?",
    content: "Penentuan pemenang podium dan peringkat juara menggunakan Gun Time, yaitu waktu yang dihitung sejak start resmi kategori dimulai hingga peserta mencapai garis finis.\n\nOleh karena itu, peserta yang berpotensi meraih podium disarankan untuk mengambil posisi di barisan depan saat start. Seluruh hasil resmi perlombaan akan dipublikasikan melalui situs web www.bayanrun.com",
    category: "Peraturan"
  },
  {
    title: "Bagaimana dengan rute lomba?",
    content: "Rute lomba akan dipublikasikan jika rute sudah mendapatkan persetujuan dan konfirmasi resmi dari pihak-pihak terkait.",
    category: "Event"
  },
  {
    title: "Bolehkah saya berlari sambil membawa hewan peliharaan?",
    content: "Tidak. Hewan peliharaan tidak diperbolehkan berada di area lomba maupun di sepanjang rute lari. Ketentuan ini berlaku untuk menjaga keamanan, keselamatan, dan kenyamanan seluruh peserta serta petugas yang bertugas.",
    category: "Peraturan"
  },
  {
    title: "Apakah peserta diperbolehkan menggunakan sepeda, sepatu roda, atau kereta bayi di rute lomba?",
    content: "Tidak. Peserta tidak diperbolehkan menggunakan sepeda, sepatu roda, kereta bayi, maupun alat bantu beroda lainnya selama mengikuti lomba.\n\nKetentuan ini diberlakukan demi menjaga keselamatan dan kenyamanan seluruh peserta, karena rute lomba masih berbagi jalan dengan pengguna jalan lainnya, seperti mobil, sepeda motor, truk, dan kendaraan lainnya.",
    category: "Peraturan"
  },
  {
    title: "Apakah tersedia area parkir di lokasi lomba?",
    content: "Ya, area parkir akan tersedia di lokasi acara. Informasi lebih lanjut mengenai lokasi dan akses parkir dapat dilihat di www.bayanrun.com dan akun Instagram resmi @bayan_open.",
    category: "Fasilitas"
  },
  {
    title: "Apakah tersedia tempat ibadah di area lomba?",
    content: "Ya, panitia menyediakan area ibadah untuk peserta yang ingin melaksanakan salat Subuh sebelum lomba. Informasi lebih lanjut dapat dilihat di www.bayanrun.com dan akun Instagram resmi @bayan_open.",
    category: "Fasilitas"
  },
  {
    title: "Apakah tersedia fasilitas penitipan barang di area lomba?",
    content: "Ya. Panitia menyediakan fasilitas penitipan barang bagi peserta di lokasi acara. Kapasitas penitipan barang terbatas dan tersedia selama persediaan masih ada.\n\nPanitia mengimbau peserta untuk tidak menitipkan barang berharga dan tidak bertanggung jawab atas kehilangan atau kerusakan barang yang dititipkan.",
    category: "Fasilitas"
  },
  {
    title: "Di mana saya dapat memperoleh informasi mengenai BAYAN RUN 2026?",
    content: "Seluruh informasi terkait pendaftaran, jadwal, race pack, rute, fasilitas, dan pengumuman lainnya akan dipublikasikan melalui situs resmi www.bayanrun.com dan akun Instagram resmi @bayan_open.",
    category: "Informasi"
  }
];

export default function FAQPage() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const FAQItem = ({ faq, idx }: { faq: typeof faqData[0]; idx: number }) => {
    const isOpen = openSections.includes(idx);
    return (
      <div
        className={`bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
      >
        <button
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-300"
          onClick={() => toggleSection(idx)}
        >
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs tracking-wide">
                {faq.category}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {faq.title}
            </h2>
          </div>

          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-blue-600 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600 transition-transform duration-300" />
            )}
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-5 pt-2 bg-blue-600">
            <div className="h-px bg-white/30 mb-4"></div>
            <p className="text-white whitespace-pre-line leading-relaxed text-base">
              {faq.content}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-gray-900">FAQ</h1>
          <p className="text-xl text-gray-500">Pertanyaan yang Sering Diajukan</p>
          <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
            Punya pertanyaan tentang Bayan Run 2026? Temukan jawaban atas pertanyaan paling umum di bawah ini.
          </p>
        </div>

        {/* FAQ Items - Desktop (2 Columns) */}
        <div className="hidden lg:block mb-16">
          <div className="grid grid-cols-2 gap-6">
            {faqData.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} idx={idx} />
            ))}
          </div>
        </div>

        {/* FAQ Items - Mobile */}
        <div className="lg:hidden space-y-4 mb-16">
          {faqData.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} idx={idx} />
          ))}
        </div>

      </div>
    </div>
  );
}