"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constant";
import { Menu, X } from "lucide-react";
import { useContact } from "@/lib/contact-context";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {} = useContact();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

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
                    src="https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1775466723/LOGO_BR2026_vbixvo.png"
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="w-40 h-16 object-contain"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="nav-links lg:-ml-16 hidden lg:block">
                <ul className="flex gap-8 items-center">
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

              {/* Desktop Contact Button */}
              <div className="nav-contact hidden lg:block">
                <Button
                  className={`
                    text-sm font-black tracking-widest uppercase cursor-pointer
                    bg-blue-800 hover:bg-blue-700 active:bg-blue-700
                    border border-blue-400/30 rounded-xl
                    shadow-[0_0_24px_rgba(59,130,246,0.5)]
                    hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]
                    transition-all duration-300
                    ${pathname === "/about" ? "text-white" : ""}
                  `}
                >
                  Daftar Sekarang
                </Button>
              </div>

              {/* Mobile Hamburger + Contact */}
              <div className="flex items-center gap-4 lg:hidden">
                <Button
                  className="
                    text-xs font-black tracking-widest uppercase
                    bg-blue-800 hover:bg-blue-700 active:bg-blue-700
                    border border-blue-400/30 rounded-xl
                    shadow-[0_0_24px_rgba(59,130,246,0.5)]
                    hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]
                    transition-all duration-300 cursor-pointer
                  "
                >
                  Daftar Sekarang
                </Button>
                <button onClick={toggleMobileMenu}>
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
                  fixed top-0 h-screen w-full lg:hidden bg-black/90 backdrop-blur-2xl pt-20
                  transition-all duration-500 ease-in-out
                  ${mobileMenuOpen ? "left-0" : "left-[-100%]"}
                `}
              >
                <div className="flex flex-col items-center space-y-8 mt-10 w-full">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.link;
                    return (
                      <Link
                        key={link.link}
                        href={link.link}
                        className={`text-2xl ${
                          isActive ? "text-blue-900" : "text-blue-900/60"
                        }`}
                        onClick={toggleMobileMenu}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  <div onClick={toggleMobileMenu}>
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