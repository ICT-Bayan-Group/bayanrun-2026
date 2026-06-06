"use client";

import Image from "next/image";

const racePackItems = [
  {
    src: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1780645028/BR_BIB_PIN_p0ucmk.png",
    name: "Magnetic Pin BIB",
  },
  {
    src: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1780641482/jersey-removebg-preview_o6rpom.png",
    name: "Jersey Runners",
  },
  {
    src: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1780641294/contoh_bib_xeh6jw.png",
    name: "BIB Number",
  },
  {
    src: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1780641314/tas_multifungsi_black_vxe7pm.png",
    name: "Multifunction Bag",
  },
  {
    src: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1780641296/RUNNING_BELT_oe7eu2.png",
    name: "Running Belt",
  },
  {
    src: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1780641295/soft_flask_br2026_w4rtma.png",
    name: "Soft Flask",
  },
  {
    src: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1780645030/Medali_BR2026_oga4zx.png",
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
          animation: marquee 40s linear infinite;
        }
        .racepack-track:hover {
          animation-play-state: paused;
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
            {/* Image */}
            <div className="w-[260px] h-[260px] flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.name}
                width={260}
                height={260}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Name label */}
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