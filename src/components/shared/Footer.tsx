'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useContact } from "@/lib/contact-context";
// 1. Import font Allison dari Google Fonts
import { Allison } from 'next/font/google';

// 2. Konfigurasi font Allison
const allison = Allison({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-allison',
});

interface SocialLinkProps {
    href: string;
    label: string;
    Icon: React.ElementType;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label, Icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="hover:text-blue-900 transition-colors duration-300"
    >
        <Icon size={24} />
    </a>
);

const Footer: React.FC = () => {
    const { setIsContactOpen } = useContact();

    useEffect(() => {
        const noiseStyle = document.createElement('style');
        noiseStyle.innerHTML = `
            .noise-effect::before {
                content: "";
                position: absolute;
                opacity: 0.04;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('https://cdn.prod.website-files.com/677fb4d34764579513f06df6/678a4ca6053fb371ef1a243a_pf_noise.png');
                pointer-events: none;
                animation: noise-animation 0.4s infinite;
                mix-blend-mode: overlay;
            }

            @keyframes noise-animation {
                0%, 100% { transform: translate(0,0); }
                25% { transform: translate(-5%, 5%); }
                50% { transform: translate(5%, -5%); }
                75% { transform: translate(-5%, -5%); }
            }
        `;
        document.head.appendChild(noiseStyle);
        return () => {
            document.head.removeChild(noiseStyle);
        };
    }, []);

    return (
        /* 3. Masukkan variable font di container utama */
        <footer className={`${allison.variable} relative w-full overflow-hidden`}>
            <div className="noise-effect absolute inset-0 z-0" />
            <div className="relative z-10 text-black flex flex-col bg-gray-200 justify-between px-4 md:px-6 py-12 md:py-20 max-w-8xl w-full mx-auto">
                
                {/* Top Section */}
                <div className="relative flex flex-col md:flex-row w-full items-center md:h-48 max-md:space-y-10">
                    <div className="flex-1 flex flex-col justify-center max-md:items-center max-md:text-center">
                        
                        {/* 4. Implementasi Font Script pada Bagian Ini */}
                        {/* Ukuran diperbesar ke 8xl karena font script biasanya terlihat lebih kecil dari font sans */}
                        <h1 className="text-7xl md:text-8xl text-blue-900 font-bold leading-tight font-[family-name:var(--font-allison)]">
                            Keep Moving
                        </h1>
                        <h1 className="text-7xl md:text-8xl text-red-800 font-bold leading-tight font-[family-name:var(--font-allison)] -mt-4 md:-mt-6">
                            Keep Strong
                        </h1>
                    </div>

                    <div className="hidden md:block w-[1px] h-full bg-gray-300 mx-6" />

                    <div className="flex-1 flex flex-col justify-center items-end mt-12 md:mt-0 text-right max-md:items-center max-md:text-center font-[var(--font-poppins)]">
                        <div className="uppercase text-sm md:text-base font-bold tracking-widest mb-3 text-gray-600">11 OKTOBER 2026</div>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">Balikpapan</h2>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-gray-300 my-8 md:my-10 w-full" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between w-full items-end gap-8 max-md:items-center">
                    <div className="flex flex-col md:flex-row flex-1 justify-between w-full gap-10 max-md:items-center">
                        {/* Sitemap & Copyright */}
                        <div className="flex flex-col space-y-6 max-md:items-center max-md:text-center font-[var(--font-poppins)]">
                            <div className="flex flex-col space-y-2">
                                <span className="uppercase text-gray-700 font-extrabold tracking-widest mb-3 text-sm md:text-base">Menu</span>
                                <Link href="/" className="hover:underline hover:text-blue-900 transition-colors text-base md:text-lg font-medium">Home</Link>
                                <Link href="/" className="hover:underline hover:text-blue-900 transition-colors text-base md:text-lg font-medium">About</Link>
                                <Link href="/" className="hover:underline hover:text-blue-900 transition-colors text-base md:text-lg font-medium">Schedule & Rules</Link>
                                <Link href="/" className="hover:underline hover:text-blue-900 transition-colors text-base md:text-lg font-medium">FAQ</Link>
                                <p className="cursor-pointer hover:underline hover:text-blue-900 transition-colors text-base md:text-lg font-medium" onClick={() => setIsContactOpen(true)}>Contact</p>
                            </div>
                            <p className="text-gray-600 text-sm md:text-base font-medium">© 2026 BAYAN OPEN</p>
                        </div>

                        {/* Social Links & Infos */}
                        <div className="flex flex-col items-end max-md:items-center max-md:text-center space-y-4">
                            <div className="flex items-center space-x-5 mb-2">
                                <SocialLink href="https://id.linkedin.com/company/pt-bayan-resources-tbk " label="LinkedIn" Icon={FaLinkedin} />
                                <SocialLink href="https://www.instagram.com/bayan_open/" label="Instagram" Icon={FaInstagram} />
                                <SocialLink href="https://api.whatsapp.com/send/?phone=6282154815113&text&type=phone_number&app_absent=0" label="whatsapp" Icon={FaWhatsapp} />
                            </div>
                            <Link href="/infos" className="hover:underline hover:text-blue-900 transition-colors text-sm md:text-base font-[var(--font-poppins)] font-bold uppercase tracking-wide">
                                Social Media 
                            </Link>
                        </div>
                    </div>

                    {/* Logo with interactive animation */}
                    <div className="flex-1 flex justify-end ml-6 mt-6 md:mt-0 max-md:justify-center max-md:ml-0">
                        <div className="w-35 md:w-50 h-35 md:h-50 relative group">
                            <Image
                                src="https://res.cloudinary.com/djs5pi7ev/image/upload/q_auto/f_auto/v1775466723/LOGO_BR2026_vbixvo.png"
                                alt="Logo"
                                fill
                                className="object-contain transform transition duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:animate-bounce"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;