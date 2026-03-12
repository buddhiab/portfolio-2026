"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxGrid() {
    const sectionRef = useRef(null);
    const column1Ref = useRef(null);
    const column2Ref = useRef(null);
    const column3Ref = useRef(null);

    // Mapped directly to your actual engineering screenshots!
    const images = [
        "/projects/summai-ui.png",        // Column 1, Top
        "/projects/storybook-card.png",   // Column 1, Bottom
        "/projects/travel-plan-ui.png",   // Column 2, Top
        "/projects/terminal-code.png",    // Column 2, Bottom
        "/projects/spendwise-ui.png",     // Column 3, Top
        "/projects/storybook-btn.png",    // Column 3, Bottom
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Column 1 (Moves Up)
            gsap.to(column1Ref.current, {
                y: "-20%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Column 2 (Moves Down)
            gsap.to(column2Ref.current, {
                y: "20%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Column 3 (Moves Up)
            gsap.to(column3Ref.current, {
                y: "-20%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative w-full h-[80vh] overflow-hidden bg-zinc-950 flex justify-center items-center px-4 py-10 mt-10">

            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl h-[120%] rotate-[-4deg] scale-110">

                {/* Column 1 */}
                <div ref={column1Ref} className="flex flex-col gap-4 md:gap-8 translate-y-[10%]">
                    {images.slice(0, 2).map((src, i) => (
                        <div key={`col1-${i}`} className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="Project snippet" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* Column 2 (Center) */}
                <div ref={column2Ref} className="flex flex-col gap-4 md:gap-8 -translate-y-[10%]">
                    {images.slice(2, 4).map((src, i) => (
                        <div key={`col2-${i}`} className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="Project snippet" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* Column 3 */}
                <div ref={column3Ref} className="flex flex-col gap-4 md:gap-8 translate-y-[15%]">
                    {images.slice(4, 6).map((src, i) => (
                        <div key={`col3-${i}`} className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="Project snippet" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                    ))}
                </div>

            </div>

            {/* Fade overlay at the bottom to blend back into the page */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none" />
        </div>
    );
}