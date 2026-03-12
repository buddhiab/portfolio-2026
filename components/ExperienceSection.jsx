"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, BookOpen } from "lucide-react";

export default function ExperienceSection() {
    // Timeline data combining your input with your actual project context
    const timelineData = [
        {
            id: 1,
            type: "experience",
            title: "Software Engineering Intern",
            institution: "ICTA - Ministry of Digital Economy",
            date: "Nov 2025 - Present",
            description: [
                "Developing and maintaining full-stack web applications and digital economy solutions.",
                "Collaborating with cross-functional teams to integrate secure backend APIs and optimize frontend performance.",
                "Participating in code reviews and utilizing modern frameworks like React, Next.js, and Strapi CMS."
            ],
            icon: <Briefcase size={20} className="text-blue-400" />
        },
        {
            id: 2,
            type: "education",
            title: "BSc. (Hons) Software Engineering",
            institution: "National School of Business Management (NSBM)",
            date: "Oct 2022 - Present",
            description: [
                "Final-year student specializing in full-stack architecture, systems design, and database management.",
                "Currently finalizing a research proposal for a comprehensive agricultural software system focused on animal farm management.",
                "Engineered multiple complex systems including personal finance dashboards and microservice architectures."
            ],
            icon: <GraduationCap size={20} className="text-purple-400" />
        },
        {
            id: 3,
            type: "education",
            title: "Advance Level",
            institution: "Hanwella Rajasinghe Central College",
            date: "Completed Oct 2020",
            description: [
                "Successfully completed secondary education with a strong foundation in analytical and technical subjects, preparing for a career in software engineering."
            ],
            icon: <BookOpen size={20} className="text-cyan-400" />
        }
    ];

    return (
        <section className="relative flex w-full flex-col items-center justify-center bg-[#030305] py-24 text-white overflow-hidden border-t border-white/5">

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6">

                {/* Section Header */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">
                        What I Have Done So Far
                    </p>
                    <h2 className="text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white">
                        Experience & Education.
                    </h2>
                </div>

                {/* Timeline Container */}
                <div className="relative w-full">

                    {/* The glowing vertical center line (Hidden on small mobile, visible on md+) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 -translate-x-1/2" />

                    {timelineData.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={item.id}
                                className={`relative mb-12 flex w-full flex-col md:flex-row items-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                {/* Center Timeline Node */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                                    className="absolute left-8 md:left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#030305] bg-zinc-800 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20"
                                >
                                    {item.icon}
                                </motion.div>

                                {/* The Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className={`ml-20 md:ml-0 w-full md:w-[45%] p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-xl hover:border-blue-500/30 transition-colors ${isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}
                                >
                                    <div className={`flex flex-col gap-1 mb-4 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                        <h3 className="text-2xl font-bold text-white tracking-tight">
                                            {item.title}
                                        </h3>
                                        <span className="text-sm font-medium text-blue-400">
                                            {item.institution}
                                        </span>
                                        <span className="text-xs font-mono text-zinc-500 mt-1 bg-white/5 px-3 py-1 rounded-full w-max">
                                            {item.date}
                                        </span>
                                    </div>

                                    <ul className={`flex flex-col gap-2 text-sm text-zinc-400 leading-relaxed ${isEven ? 'md:items-end md:text-right' : 'md:items-start text-left'}`}>
                                        {item.description.map((desc, i) => (
                                            <li key={i} className="flex items-start gap-2 max-w-[95%]">
                                                {/* Hidden on desktop right-aligned text for cleaner look, visible everywhere else */}
                                                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 ${isEven ? 'md:hidden' : 'block'}`} />
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}