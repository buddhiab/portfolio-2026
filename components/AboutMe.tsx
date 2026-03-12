"use client";

import { motion } from "framer-motion";
import { Code2, MonitorPlay, Database, LayoutTemplate, Smartphone, Github, Linkedin } from "lucide-react";

export default function AboutMe() {
    const floatingAnimation = {
        y: ["-10px", "10px"],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
        },
    };

    return (
        <section className="relative flex min-h-screen w-full items-center justify-center bg-zinc-950 py-24 text-white overflow-hidden">

            {/* Background ambient light - matching the deep blue glow of the video */}
            <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/20 blur-[120px]" />

            {/* Large orbital ring behind the card to match the video backdrop */}
            <div className="absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10 opacity-50 pointer-events-none" />

            <div className="relative flex w-full max-w-6xl items-center justify-center">

                {/* Floating Icons */}
                <motion.div animate={floatingAnimation} className="absolute left-0 top-10 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Code2 size={64} strokeWidth={1.5} />
                </motion.div>
                <motion.div animate={floatingAnimation} transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="absolute right-10 top-20 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">
                    <LayoutTemplate size={72} strokeWidth={1.5} />
                </motion.div>
                <motion.div animate={floatingAnimation} transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="absolute bottom-10 left-20 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Database size={60} strokeWidth={1.5} />
                </motion.div>
                <motion.div animate={floatingAnimation} transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="absolute bottom-24 right-0 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    <Smartphone size={56} strokeWidth={1.5} />
                </motion.div>

                {/* The Main Card - Swapped layout and added deep blue gradient */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 flex w-[90%] max-w-5xl flex-col-reverse items-center justify-between gap-10 rounded-[40px] border border-blue-400/20 bg-linear-to-br from-[#0a0f24]/90 via-[#10173b]/80 to-black/90 p-8 backdrop-blur-2xl md:flex-row md:p-12 shadow-[0_0_80px_-20px_rgba(59,130,246,0.25)]"
                >

                    {/* Text Content - Left Side */}
                    <div className="flex flex-1 flex-col gap-6 text-center md:text-left">

                        {/* Title matching the outlined pill style */}
                        <h2 className="flex items-center justify-center md:justify-start text-5xl md:text-6xl font-medium tracking-tight text-white">
                            ABOUT
                            <span className="ml-4 rounded-full border border-white/40 px-6 py-1 text-3xl md:text-4xl text-white font-light">
                                ME
                            </span>
                        </h2>

                        {/* Tailored SE Bio */}
                        <p className="text-zinc-300 leading-relaxed text-lg md:text-xl font-light">
                            My name is <span className="font-semibold text-white">Janitha Kapuwatta</span>. I am a final-year Software Engineering student at NSBM Green University and an intern at the Information and Communication Technology Agency (ICTA) of Sri Lanka. I specialize in full-stack architecture, database management, and building robust web platforms using React, Next.js, and Strapi CMS, with a strong passion for solving complex technical challenges.
                        </p>

                        {/* Social Links - Matching the solid pill style from the video */}
                        <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                            <a href="#" className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md">
                                <Linkedin size={18} /> janithakapuwatta
                            </a>
                            <a href="https://github.com/buddhiab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md">
                                <Github size={18} /> buddhiab
                            </a>
                        </div>
                    </div>

                    {/* Profile Image - Right Side */}
                    <div className="h-72 w-72 md:h-[400px] md:w-[320px] shrink-0 overflow-hidden rounded-[32px] border border-white/10 shadow-2xl bg-zinc-800">
                        {/* Drop your actual headshot here! */}
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                            alt="Janitha Kapuwatta"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                </motion.div>
            </div>
        </section>
    );
}