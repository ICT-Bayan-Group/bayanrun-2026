"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constant";
import { Menu, X, Download } from "lucide-react";
import {
  AMBILFOTO_URL,
  AMBILFOTO_LOGO,
  SURAT_KUASA_URL,
  SURAT_KUASA_FILENAME,
} from "@/lib/links";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const btnBase =
    "inline-flex items-center justify-center gap-2 text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-300 cursor-pointer";
  const btnLogo = `${btnBase} px-3 py-2 bg-white border border-gray-300 text-gray-600 hover:text-blue-900 hover:shadow-md hover:-translate-y-0.5`;
  const btnSolid = `${btnBase} px-3 xl:px-4 py-2.5 bg-blue-800 hover:bg-blue-700 active:bg-blue-700 border border-blue-400/30 text-white shadow-[0_0_24px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]`;
  const btnLogoMobile = `${btnBase} w-64 px-5 py-3 text-sm bg-white border border-gray-300 text-gray-600 hover:text-blue-900`;
  const btnSolidMobile = `${btnBase} w-64 px-5 py-3.5 text-sm bg-blue-800 hover:bg-blue-700 border border-blue-400/30 text-white shadow-[0_0_24px_rgba(59,130,246,0.5)]`;

  return (
    <>
      <style jsx global>{`
        @keyframes navSlideLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes navSlideRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-logo    { animation: navSlideLeft  0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .nav-links   { animation: navSlideDown  0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .nav-contact { animation: navSlideRight 0.7s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <header className="!overflow-x-hidden relative z-[999] bg-gray-200">
        <nav className="py-3">
          <div className="container text-blue-900/40 text-lg">
            <div className="nav-wrapper flex justify-between items-center">

              {/* Logo */}
              <div className="nav-logo">
                <Link href="/">
                  <Image
                    src="https://res.cloudinary.com/ddeigqz5d/image/upload/v1790630020/LOGO_BR2026_vbixvo_w7hjua.webp"
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="w-40 h-16 object-contain"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="nav-links hidden lg:block">
                <ul className="flex gap-6 xl:gap-8 items-center">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.link ||
                      pathname.startsWith(link.link + "/");
                    return (
                      <li
                        key={link.link}
                        className={
                          isActive
                            ? "text-blue-900 font-semibold"
                            : "font-semibold text-blue-900/60 hover:text-blue-900"
                        }
                      >
                        <Link href={link.link}>{link.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Desktop Action Buttons */}
              <div className="nav-contact hidden lg:flex items-center gap-2">
                <a
                  href={AMBILFOTO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnLogo}
                  aria-label="Ambil Foto Kamu di AmbilFoto.id"
                  title="Ambil Foto Kamu"
                >
                  <Image
                    src={AMBILFOTO_LOGO}
                    alt="AmbilFoto.id"
                    width={80}
                    height={80}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="hidden xl:inline">Ambil Foto Kamu</span>
                </a>
                <a
                  href={SURAT_KUASA_URL}
                  download={SURAT_KUASA_FILENAME}
                  className={btnSolid}
                  aria-label="Download Surat Kuasa"
                  title="Download Surat Kuasa"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden xl:inline">Surat Kuasa</span>
                </a>
              </div>

              {/* Mobile Hamburger */}
              <div className="flex items-center gap-4 lg:hidden">
                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                  className="relative z-[60]"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Mobile Menu */}
              <div
                className={`
                  fixed top-0 z-50 h-screen w-full overflow-y-auto lg:hidden bg-white/90 backdrop-blur-2xl pt-20
                  transition-all duration-500 ease-in-out
                  ${mobileMenuOpen ? "left-0" : "left-[-100%]"}
                `}
                id="mobile-navigation"
                aria-hidden={!mobileMenuOpen}
              >
                <div className="flex flex-col items-center space-y-8 mt-10 w-full">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.link;
                    return (
                      <Link
                        key={link.link}
                        href={link.link}
                        className={`text-2xl ${
                          isActive
                            ? "text-blue-900 font-semibold"
                            : "text-blue-900/60 font-semibold hover:text-blue-900"
                        }`}
                        onClick={toggleMobileMenu}
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  <div className="flex flex-col items-center gap-3 pt-2">
                    <a
                      href={AMBILFOTO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btnLogoMobile}
                      onClick={toggleMobileMenu}
                    >
                      <Image
                        src={AMBILFOTO_LOGO}
                        alt="AmbilFoto.id"
                        width={80}
                        height={80}
                        className="h-7 w-auto object-contain"
                      />
                      Ambil Foto Kamu
                    </a>
                    <a
                      href={SURAT_KUASA_URL}
                      download={SURAT_KUASA_FILENAME}
                      className={btnSolidMobile}
                      onClick={toggleMobileMenu}
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      Download Surat Kuasa
                    </a>
                  </div>

                  <div onClick={toggleMobileMenu} className="cursor-pointer">
                    <X className="w-6 h-6" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </header>
    </>
  );
}