"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Environment, Html } from "@react-three/drei";

function TechSphere({ position, color, offset, icon, name }) {
    const groupRef = useRef(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Bob the UI Card up and down smoothly
        groupRef.current.position.y = position[1] + Math.sin(t * 2 + offset) * 0.2;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* The UI Overlay */}
            {icon && (
                <Html
                    transform
                    center // Perfectly centers the card
                    position={[0, 0, 0]} // Reset position since there is no sphere to avoid
                    distanceFactor={5}     // Massively increased scale for much better visibility
                    zIndexRange={[100, 0]}
                    sprite // This forces the HTML element to ALWAYS face the camera perfectly
                >
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/80 backdrop-blur-xl border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] gap-2 min-w-[100px] transition-transform duration-300 hover:scale-110">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={icon}
                            alt={`${name} icon`}
                            className="w-12 h-12 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        />
                        <span className="text-zinc-100 font-extrabold text-sm tracking-wider drop-shadow-md">
                            {name}
                        </span>
                    </div>
                </Html>
            )}
        </group>
    );
}

export default function TechSpheres() {
    const spheres = useMemo(() => [
        // Row 1
        { pos: [-2.2, 2, 0], color: "#61dafb", offset: 0, icon: "/tech-icons/react.svg", name: "React" },
        { pos: [0, 2, 0], color: "#ffffff", offset: 1, icon: "/tech-icons/nextjs.svg", name: "Next.js" },
        { pos: [2.2, 2, 0], color: "#339933", offset: 2, icon: "/tech-icons/nodejs.svg", name: "Node.js" },
        // Row 2
        { pos: [-2.2, 0, 0], color: "#38bdf8", offset: 3, icon: "/tech-icons/tailwindcss.svg", name: "Tailwind" },
        { pos: [0, 0, 0], color: "#ffffff", offset: 4, icon: "/tech-icons/express.svg", name: "Express" },
        { pos: [2.2, 0, 0], color: "#6db33f", offset: 5, icon: "/tech-icons/spring.svg", name: "Spring Boot" },
        // Row 3
        { pos: [-2.2, -2, 0], color: "#336791", offset: 6, icon: "/tech-icons/postgresql.svg", name: "PostgreSQL" },
        { pos: [0, -2, 0], color: "#3ecf8e", offset: 7, icon: "/tech-icons/supabase.svg", name: "Supabase" },
        { pos: [2.2, -2, 0], color: "#02569B", offset: 8, icon: "/tech-icons/flutter.svg", name: "Flutter" },
    ], []);

    return (
        <div className="w-full h-[800px] relative pointer-events-none">
            {/* Added pointer-events-auto to Canvas so the hover effects on the cards actually trigger */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="pointer-events-auto">
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Environment preset="city" />

                {spheres.map((s, i) => (
                    <TechSphere key={i} position={s.pos} color={s.color} offset={s.offset} icon={s.icon} name={s.name} />
                ))}
            </Canvas>
        </div>
    );
}