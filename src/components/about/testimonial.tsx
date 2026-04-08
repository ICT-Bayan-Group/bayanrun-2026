"use client";

import { testimonials } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRightCircle, MessageCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
    const secRef = useRef<HTMLElement | null>(null);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    // Detect screen size only on client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsLargeScreen(window.innerWidth >= 1024);
            };
            
            handleResize();
            window.addEventListener("resize", handleResize);
            
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useGSAP(
        (context) => {
            if (!isLargeScreen) return;

            const q = context.selector;
            if (!q) return;

            const testimonialsElements = q(".fade_comment");
            const stuckTextElement = q(".stuck_text");

            // Pin the left text
            if (stuckTextElement) {
                gsap.to(stuckTextElement, {
                    scrollTrigger: {
                        trigger: secRef.current,
                        start: "top 20%",
                        end: "bottom 80%",
                        pin: stuckTextElement,
                        pinSpacing: false,
                        scrub: 1,
                    },
                });
            }

            // Animate fade in and fade out on scroll
            testimonialsElements?.forEach((element: HTMLElement) => {
                // Fade in
                gsap.to(element, {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 55%",
                        end: "top 30%",
                        scrub: true,
                    },
                });

                // Fade out
                gsap.to(element, {
                    opacity: 0.2,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 30%",
                        end: "top top",
                        scrub: true,
                    },
                });
            });
        },
        { scope: secRef, dependencies: [isLargeScreen] }
    );

    return (
        <section className="relative bg-blue-900 w-full py-10 px-4 sm:py-12 sm:px-6 lg:py-20" ref={secRef}>
            <div className="container max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left sticky text - large screens only */}
                    <div className="hidden lg:block lg:sticky lg:top-24 h-fit self-start">
                        <p className="text-4xl xl:text-5xl 2xl:text-6xl leading-snug lg:leading-tight xl:leading-snug stuck_text text-white">
                            <span className="block mb-2">Mereka berlari,</span>
                            <span className="block">mereka bercerita</span>
                            <span className="block">tentang Bayan Run</span>
                        </p>
                    </div>

                    {/* Mobile header */}
                    <div className="lg:hidden mb-6 sm:mb-8">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="inline-flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 border-2 border-white/20 rounded-full bg-blue-800/30">
                                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-white px-4">
                                Mereka berlari, mereka bercerita tentang Bayan Run
                            </h2>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="space-y-8 sm:space-y-10 lg:space-y-20">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id}>
                                <div className="fade_comment lg:opacity-20 bg-white/5 lg:bg-transparent rounded-xl lg:rounded-none p-4 sm:p-5 lg:p-0 backdrop-blur-sm lg:backdrop-blur-none border border-white/10 lg:border-0">
                                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-5">
                                        {/* Number badge */}
                                        <div className="flex items-center gap-2 text-gray-300 shrink-0">
                                            <ArrowRightCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                            <span className="text-sm sm:text-base lg:text-lg font-semibold font-[Roboto]">
                                                {testimonial.id}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 flex-1">
                                            <h3 className="text-base sm:text-lg lg:text-xl tracking-wide font-medium leading-relaxed font-[Roboto] text-white">
                                                {testimonial.comment}
                                            </h3>

                                            {/* Author info */}
                                            <div className="flex items-center gap-3 font-[Roboto]">
                                               
                                                <div>
                                                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-gray-400">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}