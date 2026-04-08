"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: "Racepack Collection",
    date: "Saturday, 11 October 2025",
    location: "Gedung Kesenian Balikpapan",
    dayTime: "Saturday, 11 October 2025 - 08:00 - 19:00 WITA",
    video: "/video1.mp4"
  },
  {
    id: 2,
    title: "Race Day",
    date: "Sunday, 12 October 2025",
    location: "Lapangan Merdeka III\nBalikpapan Kalimantan Timur",
    startTimes: [
      "Half Marathon : 05:30 WITA (COT = 4 Jam)",
      "10K : 06:00 WITA (COT = 2 Jam)",
      "5K Open : 06:10 WITA (COT = 1 Jam)",
      "5K Teens : 06:10 WITA (COT = 1 Jam)",
      "2.5K Kids : 06:20 WITA (COT = 50 Menit)"
    ],
    video: "/video2.mp4"
  }
];

export default function EventSchedule() {
  const secRef = useRef<HTMLElement | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 1024);
    }
  }, []);

  useGSAP(
    () => {
      if (!isLargeScreen) return;

      const boxes = secRef.current?.querySelectorAll(
        ".animate_event_fade"
      ) as NodeListOf<HTMLElement>;
      const videos = secRef.current?.querySelectorAll(
        ".event-video"
      ) as NodeListOf<HTMLElement>;

      // Set all boxes to full opacity initially
      boxes?.forEach((box) => {
        gsap.set(box, { opacity: 1 });
      });

      boxes?.forEach((box, index) => {
        ScrollTrigger.create({
          trigger: box,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            showVideo(index);
          },
          onEnterBack: () => {
            showVideo(index);
          },
        });
      });

      function showVideo(activeIndex: number) {
        videos?.forEach((video, i) => {
          if (i === activeIndex) {
            gsap.fromTo(
              video,
              { x: 100, opacity: 0, rotate: 30 },
              {
                x: 0,
                rotate: 0,
                opacity: 1,
                duration: 0.4,
                ease: "bounce.inOut",
              }
            );
          } else {
            gsap.set(video, { opacity: 0 });
          }
        });
      }
    },
    { scope: secRef, dependencies: [isLargeScreen] }
  );

  return (
    <section className="py-8 lg:py-20 bg-gray-50" ref={secRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-900">
            EVENT SCHEDULE
          </h2>
         <p>Don&apos;t miss the exciting events at Bayanr Run 2025! Here&apos;s the full schedule</p>

        </div>

        {/* Event Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`animate_event_fade bg-white border-4 ${
                index === 0 ? 'border-yellow-400' : 'border-red-500'
              } rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900">
                  {event.title}
                </h3>
                <video
                  className="hidden lg:block w-20 h-20 object-cover rounded-lg event-video"
                  src={event.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ opacity: 0, willChange: "transform, opacity" }}
                />
              </div>

              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-start">
                  <span className="font-semibold text-blue-900 min-w-[120px]">Date</span>
                  <div className="flex items-center text-blue-900">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {event.date}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <span className="font-semibold text-blue-900 min-w-[120px]">Location</span>
                  <div className="flex items-start text-blue-900">
                    <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="whitespace-pre-line">{event.location}</span>
                  </div>
                </div>

                {/* Day & Time or Start Time */}
                {event.dayTime ? (
                  <div className="flex items-start">
                    <span className="font-semibold text-blue-900 min-w-[120px]">Day & Time</span>
                    <div className="flex items-start text-blue-900">
                      <svg className="w-5 h-5 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {event.dayTime}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <span className="font-semibold text-blue-900 min-w-[120px]">Start Time</span>
                    <div className="space-y-2 flex-1">
                      {event.startTimes?.map((time, idx) => (
                        <div key={idx} className="flex items-start text-blue-900">
                          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}