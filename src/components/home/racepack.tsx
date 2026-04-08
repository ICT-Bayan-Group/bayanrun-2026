"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const racePackItems = [
  "/racepack/bib.png",
  "/racepack/convertible-jacket-bag.png",
  "/racepack/finisher-medal.png",
  "/racepack/foldable-bottle.png",
  "/racepack/running-belt.png",
  "/racepack/running-cap.png",
  "/racepack/running-jersey.png",
];

const RacePackCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    });

    return () => ctx.revert();
  }, []);

   return (
    <div className="overflow-hidden w-full py-12 md:py-16 lg:py-20 bg-gray-200">
      <div className="text-center pb-8 md:pb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-blue-900 font-bold tracking-wide">RACE PACK ITEMS</h2>
      </div>
      <div ref={trackRef} className="flex w-max lg:gap-12 mb-8 md:mb-12">
        {[...racePackItems, ...racePackItems].map((item, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={item}
              alt={`Race Pack Item ${index}`}
              width={300}
              height={300}
              className="aspect-[10/10] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RacePackCarousel;