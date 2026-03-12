"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

// --- Magnetic Component Wrapper ---
function Magnetic({ children }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="cursor-pointer inline-block"
        >
            {children}
        </motion.div>
    );
}

export default function Hero() {
    // Spotlight tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200 });

    const handleMouseMove = (e) => {
        // Only track mouse if the user is moving it
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            className="relative flex h-screen w-full flex-col items-center justify-between py-8 md:py-12 overflow-hidden bg-[#030305] text-white selection:bg-blue-500/30"
            onMouseMove={handleMouseMove}
        >
            {/* =========================================
                ENGINEERING GRID & CONTINUOUS PAN
                ========================================= */}
            {/* We animate the background position so the grid slowly pans infinitely */}
            <motion.div
                className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px] opacity-30 pointer-events-none"
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)" }}
            />

            {/* Interactive Spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 opacity-60"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(30, 58, 138, 0.15), transparent 40%)`
                    )
                }}
            />

            {/* =========================================
                CINEMATIC LENS ARCS (NOW BREATHING CONSTANTLY)
                ========================================= */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* Top Arc - Constantly moving up and down and pulsing glow */}
                <motion.div
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        y: [-15, 15, -15],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-40vh] w-[180%] h-[70vh] rounded-[100%] border-b-2 border-blue-400/60 shadow-[0_40px_120px_rgba(37,99,235,0.3)] blur-[1px]"
                />

                {/* Bottom Arc - Moving opposite to the top one */}
                <motion.div
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        y: [15, -15, 15],
                        scale: [1.02, 1, 1.02]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-40vh] w-[180%] h-[70vh] rounded-[100%] border-t-2 border-blue-400/60 shadow-[0_-40px_120px_rgba(37,99,235,0.3)] blur-[1px]"
                />
            </div>

            {/* =========================================
                TOP TEXT (Magnetic)
                ========================================= */}
            <motion.div
                className="z-20 mt-4 md:mt-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <Magnetic>
                    <p className="px-6 py-2 text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors">
                        SELECTED WORKS - BUDDHI VICHAKKSHANA
                    </p>
                </Magnetic>
            </motion.div>

            {/* =========================================
                MAIN TYPOGRAPHY
                ========================================= */}
            <div className="z-20 flex flex-col items-center justify-center flex-1 -mt-10 md:-mt-20 pointer-events-none">
                <motion.h1
                    className="text-7xl md:text-[170px] font-sans font-medium tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-400 leading-none"
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    Portfolio
                </motion.h1>

                <motion.div
                    className="relative flex items-center justify-center -mt-6 md:-mt-16 ml-4 md:ml-[300px]"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                >
                    <h2 className="text-6xl md:text-[150px] font-serif italic text-white leading-none pr-6 drop-shadow-2xl">
                        2026
                    </h2>

                    {/* Animated SVG Tail */}
                    <svg
                        className="absolute right-[-10px] md:right-[-35px] top-[40%] w-[50px] md:w-[100px] opacity-90"
                        viewBox="0 0 100 50"
                        fill="none"
                    >
                        <motion.path
                            d="M0 35 Q 40 -10 100 15"
                            stroke="url(#gradientTail)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="gradientTail" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </div>

            {/* =========================================
                BOTTOM DOMAINS (Magnetic)
                ========================================= */}
            <motion.div
                className="z-20 mb-6 md:mb-10 flex gap-8 md:gap-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <Magnetic>
                    <div className="px-6 py-4 flex items-center justify-center">
                        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
                            Software Engineering
                        </span>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className="px-6 py-4 flex items-center justify-center">
                        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
                            Full-Stack Development
                        </span>
                    </div>
                </Magnetic>
            </motion.div>

        </section>
    );
}