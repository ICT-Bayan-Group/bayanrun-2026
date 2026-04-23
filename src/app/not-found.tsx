"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Allison } from "next/font/google";
import { ArrowLeft, MapPin } from "lucide-react";

const allison = Allison({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allison",
});

export default function NotFound() {
  return (
    <div
      className={`${allison.variable} relative min-h-screen bg-white text-gray-900 overflow-hidden flex flex-col`}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1 justify-center items-center px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl mx-auto gap-0">

          {/* LEFT — 404 */}
          <div className="flex flex-col items-center lg:items-end pr-0 lg:pr-10">
            <div className="flex items-baseline leading-none select-none">
              <span className="text-[26vw] lg:text-[11rem] font-black text-blue-900 tracking-tighter leading-none">4</span>
              <span className="text-[26vw] lg:text-[11rem] font-black text-yellow-400 tracking-tighter leading-none">0</span>
              <span className="text-[26vw] lg:text-[11rem] font-black text-blue-900 tracking-tighter leading-none">4</span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block w-[1.5px] h-52 bg-gray-200 mx-4 self-center" />
          <div className="lg:hidden w-20 h-[1.5px] bg-gray-200 my-6" />

          {/* RIGHT — Logo + info */}
          <div className="flex flex-col items-center lg:items-start pl-0 lg:pl-5 gap-4">
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              <Image
                src="https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1775466723/LOGO_BR2026_vbixvo.png"
                alt="Bayan Run 2026"
                fill
                className="object-contain"
                sizes="180px"
              />
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <p className="text-gray-500 text-sm md:text-base">
                Sepertinya kamu tersesat sebelum garis finish
              </p>
            </div>

            <p className="text-gray-300 text-xs tracking-[0.2em] uppercase">
              Bayan Run 2026 · Balikpapan
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mt-1">
              <Link
                href="/"
                className="group flex items-center gap-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Beranda
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}