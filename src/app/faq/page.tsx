"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    title: "Kapan BAYAN RUN 2026 akan diadakan?",
    content: "Lomba akan diadakan pada Minggu, 12 Oktober 2026",
    category: "Event"
  },
  {
    title: "Di mana BAYAN RUN 2026 akan diadakan?",
    content: "Lokasi lomba adalah di Lapangan Merdeka 3, Balikpapan Kalimantan Timur",
    category: "Event"
  },
  {
    title: "Kapan Pendaftaran BAYAN RUN 2026 di buka?",
    content: "Sabtu, 5 Juli 2026 pada pukul 15.00 WITA",
    category: "Pendaftaran"
  },
  {
    title: "Kategori apa saja yang akan diperlombakan di BAYAN RUN 2026?",
    content: "Half Marathon, 10K, 5K, 5K teens dan 2.5K Kids",
    category: "Kategori"
  },
  {
    title: "Apakah akan ada acara pengambilan paket lomba?",
    content: "Ya, akan ada acara pengambilan paket lomba BAYAN RUN 2026. Waktu dan lokasi akan diumumkan kemudian.",
    category: "Race Pack"
  },
  {
    title: "Apa saja isi dari paket lomba?",
    content: "• Running Jersey untuk seluruh kategori\n• Jacket & Bag (convertible) untuk seluruh kategori\n• Foldable Bottle untuk seluruh kategori\n• Race BIB + Timming Chip untuk seluruh kategori\n• BIB Pin untuk seluruh kategori\n• Running Cap khusus untuk peserta 10K dan Half Marathon\n• Running Belt khusus untuk peserta Half Marathon",
    category: "Race Pack"
  },
  {
    title: "Apakah boleh mengambil racepack pada hari lomba di tanggal 12 Oktober 2026?",
    content: "Tidak. Paket lomba (race pack) hanya dapat diambil pada acara pengambilan paket lomba yang diselenggarakan sebelum lomba.",
    category: "Race Pack"
  },
  {
    title: "Berapa biaya pendaftaran lomba BAYAN RUN 2026?",
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
    content: "Peserta Usia Kategori master di BAYAN RUN 2026 ini adalah usia 45 tahun ke atas",
    category: "Kategori"
  },
  {
    title: "Berapa waktu maksimum (cut off time) COT bagi peserta untuk menyelesaikan lomba?",
    content: "• Half Marathon (21,1K) harus menyelesaikan lomba dengan waktu maksimum 4 jam (4:00) sejak lomba kategori ini dimulai.\n• Peserta kategori 10K harus menyelesaikan lomba dengan waktu maksimal 2 jam (2:00) sejak lomba kategori ini dimulai.\n• Peserta kategori 5K harus menyelesaikan lomba dengan waktu maksimal 1 jam (1:00) sejak lomba kategori ini dimulai.\n• Peserta kategori KIDS harus menyelesaikan lomba dengan waktu maksimal 30 menit (00:30) sejak lomba kategori ini dimulai.\n\nPeserta yang tidak menyelesaikan lomba sesuai syarat waktu maksimum (cut-off time) akan didiskualifikasi, sehingga tidak akan mendapatkan medali penamat/finisher medal dan penamat/finisher jersey (khusus peserta kategori half marathon). Hasil lombanya tidak ditampilkan.",
    category: "Peraturan"
  },
  {
    title: "Apakah ada batasan umur untuk mengikuti BAYAN RUN 2026?",
    content: "Ya ada batasan umur. Berikut ketentuan batasan umur setiap kategori jarak di BAYAN RUN 2026:\n\n• Peserta kategori Half Marathon Nasional: usia minimal 17 tahun\n• Peserta kategori 10K Nasional: usia minimal 17 tahun\n• Peserta kategori 5K Nasional: usia minimal 17 tahun\n• Peserta kategori 5K Teens remaja: Usia 13 - 16 tahun\n• Peserta kategori Kids: usia 6 - 12 tahun\n\nJika peserta memiliki umur di bawah ketentuan di atas dan ingin mendaftar, pastikan mendapatkan persetujuan dari orang tua. Dan pada saat mengambil paket lomba, WAJIB melampirkan surat keterangan/persetujuan orang tua yang menyatakan peserta di bawah ketentuan umur dalam keadaan sehat jasmani dan rohani dan menyatakan bahwa orang tua bertanggung jawab sepenuhnya.",
    category: "Peraturan"
  },
  {
    title: "Bagaimana ketentuan mengenai pengunduran diri dari peserta BAYAN RUN 2026?",
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
    content: "Ya, akan disediakan parkir kendaraan di lokasi lomba. Informasi tersebut dapat diakses di situs web resmi BAYAN RUN 2026, yaitu www.bayanrun.com dan akun Instagram resmi BAYAN RUN 2026, @bayan_open",
    category: "Fasilitas"
  },
  {
    title: "Apakah disediakan tempat beribadah (sholat subuh) di area lomba?",
    content: "Ya, akan disediakan tempat beribadah untuk sholat subuh di lokasi lomba. Informasi tersebut dapat diakses di situs web resmi BAYAN RUN 2026, yaitu www.bayanrun.com dan akun Instagram resmi BAYAN RUN 2026, @bayan_open",
    category: "Fasilitas"
  },
  {
    title: "Apakah disediakan fasilitas penitipan barang di area lomba?",
    content: "Ya, akan disediakan penitipan barang namun terbatas di lokasi lomba. Informasi tersebut dapat diakses di situs web resmi BAYAN RUN 2026, yaitu www.bayanrun.com dan akun Instagram resmi BAYAN RUN 2026, @bayan_open",
    category: "Fasilitas"
  },
  {
    title: "Dimana saya dapat memperoleh informasi lomba?",
    content: "Informasi lomba selengkapnya, silakan akses akun Instagram resmi BAYAN RUN 2026, @bayan_open dan web resmi BAYAN RUN 2026 di www.bayanrun.com",
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
            Punya pertanyaan tentang BayanRun 2026? Temukan jawaban atas pertanyaan paling umum di bawah ini.
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