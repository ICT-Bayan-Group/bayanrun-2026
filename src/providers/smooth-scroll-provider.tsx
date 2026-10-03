"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const media = gsap.matchMedia();

        media.add("(min-width: 1024px)", () => {
            const smoother = ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.5,
                effects: true,
            });

            return () => smoother.kill();
        });

        return () => media.revert();
    }, []);

    return (
        <div id="smooth-wrapper" className="min-h-screen lg:h-screen lg:overflow-hidden">
            <div id="smooth-content" className="lg:will-change-transform">
                {children}
            </div>
        </div>
    );
}
