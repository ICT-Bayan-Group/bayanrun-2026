"use client";

import Image from "next/image";

const racePackItems = [
  {
    src: "https://ik.imagekit.io/nwtwwkdgu/BR_BIB_PIN_pbwogf.webp",
    name: "Magnetic Pin BIB",
  },
  {
    src: "https://ik.imagekit.io/nwtwwkdgu/jersey-removebg-preview_mlqcdm.webp",
    name: "Jersey Runners",
  },
  {
    src: "https://ik.imagekit.io/nwtwwkdgu/contoh_bib_opqp4i.webp",
    name: "BIB Number",
  },
  {
    src: "https://ik.imagekit.io/nwtwwkdgu/tas_multifungsi_black_am9pnv.webp",
    name: "Multifunction Bag",
  },
  {
    src: "https://ik.imagekit.io/nwtwwkdgu/RUNNING_BELT_i0zhie.webp",
    name: "Running Belt",
  },
  {
    src: "https://ik.imagekit.io/nwtwwkdgu/soft_flask_br2026_cfxayd.webp",
    name: "Soft Flask",
  },
  {
    src: "https://ik.imagekit.io/nwtwwkdgu/Medali_BR2026_zzg1as.webp",
    name: "Medal",
  },
];

const BEBAS = "'Bebas Neue', Arial Black, sans-serif";

const RacePackCarousel: React.FC = () => {
  return (
    <div className="overflow-hidden w-full py-12 md:py-16 lg:py-20 bg-gray-200">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .racepack-track {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div className="text-center pb-8 md:pb-12">
        <h2
          style={{ fontFamily: BEBAS }}
          className="text-4xl md:text-5xl lg:text-6xl text-blue-900 tracking-widest"
        >
          RACE PACK ITEMS
        </h2>
      </div>

      {/* Marquee */}
      <div className="racepack-track flex w-max gap-6 lg:gap-10">
        {[...racePackItems, ...racePackItems].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center gap-3"
            style={{ width: 300 }}
          >
            <div className="w-[300px] h-[300px] flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.name}
                width={300}
                height={300}
                className="object-contain w-full h-full"
              />
            </div>

            <div
              className="px-4 py-1 rounded"
              style={{
                background: "rgb(3, 59, 155)",
                border: "1px solid rgba(29, 95, 212, 0.2)",
              }}
            >
              <span
                style={{
                  fontFamily: BEBAS,
                  fontSize: 15,
                  letterSpacing: "0.14em",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RacePackCarousel;