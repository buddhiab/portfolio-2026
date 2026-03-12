"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Icosahedron } from "@react-three/drei";

function BackgroundGlow() {
    const groupRef = useRef(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
        }
    });

    const materialProps = {
        thickness: 0.5,
        roughness: 0.2,
        transmission: 1,
        ior: 1.2,
        chromaticAberration: 0.05,
        backside: true,
    };

    return (
        <group ref={groupRef}>
            <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
                <Icosahedron args={[2, 0]} position={[-4, 2, -2]}>
                    <MeshTransmissionMaterial {...materialProps} color="#4f46e5" />
                </Icosahedron>
            </Float>

            <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5} floatDirection={[0, 1, 0]}>
                <Icosahedron args={[1.5, 0]} position={[2, -2, -1]}>
                    <MeshTransmissionMaterial {...materialProps} color="#c084fc" />
                </Icosahedron>
            </Float>

            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
                <Icosahedron args={[1, 0]} position={[5, 3, -3]}>
                    <MeshTransmissionMaterial {...materialProps} color="#ffffff" />
                </Icosahedron>
            </Float>
        </group>
    );
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};

export default function Overview3D() {
    return (
        <div className="w-full relative px-6 md:px-24 py-12 lg:py-24 min-h-[70vh] flex items-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 10]} intensity={1.5} />
                    <Environment preset="city" />
                    <BackgroundGlow />
                </Canvas>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    className="flex flex-col gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
                        Overview
                    </motion.h2>
                    <motion.div variants={itemVariants} className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:bg-zinc-900/60 transition-colors duration-500">
                        <p className="text-zinc-300 leading-relaxed text-lg mb-4 font-medium">
                            I am an elite Frontend WebGL Engineer with a deep understanding of scalable systems. Currently focused on forging immersive experiences using React, Next.js, and Tailwind CSS.
                        </p>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            Beyond the frontend, I engineer robust backend architectures and scalable CMS integrations to ensure digital platforms are as powerful as they are beautiful.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="h-[500px] w-full max-w-[450px] mx-auto rounded-3xl overflow-hidden relative shadow-[0_0_40px_rgba(168,85,247,0.15)] group"
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 60, damping: 20, duration: 1 }}
                    whileHover={{ scale: 1.02, rotateY: 2, transition: { duration: 0.4 } }}
                >
                    <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 via-transparent to-transparent z-10 rounded-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
                    <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 pointer-events-none" />
                    <Image
                        src="/projects/Profile.png"
                        alt="Profile Picture"
                        fill
                        className="object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
}
