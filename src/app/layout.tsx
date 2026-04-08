import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/Footer";
import { ContactProvider } from "@/lib/contact-context";
import ContactForm from "@/components/shared/contact-form";
import { Toaster } from "sonner";
import TrackingProvider from "@/providers/tracking-provider";
import { Analytics } from "@vercel/analytics/next"
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins", // tetap ada variable
  // tambahkan className agar bisa jadi default
});

const debata = Bebas_Neue({
  subsets: ["latin"],

  weight: ["400"],
  display: "swap",
  variable: "--font-bebas", // ← ganti jadi variable, bukan className
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${poppins.variable} ${debata.variable} antialiased !overflow-x-hidden`}>
        {/* Tracking & Analytics di luar SmoothScrollProvider — sudah benar */}
        <TrackingProvider
          gtmIds={["G-K357W4STM4", "GT-NFP5R97W"]}
          fbPixelId="680203374976332"
        />
        <Analytics />

        <SmoothScrollProvider>
          <ContactProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" />
            <ContactForm />
            <Footer />
          </ContactProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}