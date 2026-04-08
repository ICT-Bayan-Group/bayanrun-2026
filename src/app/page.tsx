import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import HowWeWork from "@/components/home/how-we-work";
import StackedSlider from "@/components/home/work-slider";
import RacePack from "@/components/home/racepack";
import AboutStats from "@/components/about/about-stats";
import AboutMissionVision from "@/components/about/AboutMissionVision";
export const metadata = {
  title: "Bayan Run – The Biggest Running Event in Kalimantan",
  description:
    "Bayan Run adalah event lari terbesar di Kalimantan. Bergabunglah bersama ribuan pelari dalam pengalaman lari yang epik di jantung Kalimantan. Daftarkan dirimu sekarang!",
  keywords: [
    "Bayan Run",
    "event lari Kalimantan",
    "lomba lari Kalimantan",
    "running event Kalimantan",
    "marathon Kalimantan",
    "lari Balikpapan",
    "fun run Kalimantan",
  ],
  authors: [{ name: "Bayan Run" }],
  creator: "Bayan Run",
  publisher: "Bayan Run",
  metadataBase: new URL("https://bayanrun.com"), // ← ganti dengan domain asli
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bayan Run – The Biggest Running Event in Kalimantan",
    description:
      "Bayan Run adalah event lari terbesar di Kalimantan. Bergabunglah bersama ribuan pelari dalam pengalaman lari yang epik. Daftarkan dirimu sekarang!",
    url: "https://bayanrun.com",
    siteName: "Bayan Run",
    images: [
      {
        url: "/og-image.jpg", // ← siapkan gambar 1200x630px
        width: 1200,
        height: 630,
        alt: "Bayan Run – The Biggest Running Event in Kalimantan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayan Run – The Biggest Running Event in Kalimantan",
    description:
      "Event lari terbesar di Kalimantan. Bergabunglah sekarang dan jadilah bagian dari Bayan Run!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex flex-col">
        <div className="flex-grow-[2] flex-shrink-0 basis-3/5">
          <Banner />
        </div>
      </section>
       {/* <AboutSection />*/}
       <AboutStats/>
      <HowWeWork />
      {/* <ServiceSection /> */}
            {/* <RacePack />*/}
      <StackedSlider />
       <AboutMissionVision />
    </main>
  );
}
