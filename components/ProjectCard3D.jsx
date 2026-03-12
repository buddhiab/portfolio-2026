"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard3D({ project }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[400px] rounded-2xl p-8 flex flex-col justify-between bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-2xl cursor-pointer group"
        >
            <div
                className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ transform: "translateZ(-20px)" }}
            />

            <div style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                    {project.description}
                </p>
            </div>

            <div style={{ transform: "translateZ(40px)" }} className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                    {project.tags && Array.isArray(project.tags) && project.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">
                            {tag}
                        </span>
                    ))}
                </div>
                <button className="flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors w-fit group/btn">
                    View Source Code
                    <ArrowUpRight size={16} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
