"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Box, Torus, Sphere, Html, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense } from "react";
import * as THREE from "three";

function BackgroundWave() {
    const meshRef = useRef(null);
    const geometryRef = useRef(null);
    const originalPosRef = useRef(null);

    useEffect(() => {
        // High-segment plane for smooth waves
        geometryRef.current = new THREE.PlaneGeometry(60, 60, 100, 100);
        originalPosRef.current = Float32Array.from(geometryRef.current.attributes.position.array);

        if (meshRef.current) {
            meshRef.current.geometry = geometryRef.current;
        }

        return () => {
            if (geometryRef.current) {
                geometryRef.current.dispose();
            }
        }
    }, []);

    useFrame((state) => {
        if (!meshRef.current || !geometryRef.current || !originalPosRef.current) return;

        const time = state.clock.getElapsedTime();
        const posAttribute = geometryRef.current.attributes.position;
        const originalPos = originalPosRef.current;

        for (let i = 0; i < posAttribute.count; i++) {
            const x = originalPos[i * 3];
            const y = originalPos[i * 3 + 1];

            // Complex wave math using Sine/Cosine for a sweeping oceanic/grid look
            const waveX = Math.sin(x * 0.15 + time * 0.8) * 1.5;
            const waveY = Math.cos(y * 0.15 + time * 0.6) * 1.5;
            const waveMixed = Math.sin((x * y) * 0.01 + time) * 0.5;

            // Update the Z vertex position pushing it back and forth
            posAttribute.setZ(i, waveX + waveY + waveMixed);
        }

        posAttribute.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} position={[0, -8, -15]} rotation={[-Math.PI / 2.2, 0, 0]}>
            <meshBasicMaterial
                color="#7c3aed"
                wireframe={true}
                transparent
                opacity={0.12}
            />
        </mesh>
    );
}

function GamingPC() {
    const groupRef = useRef(null);
    const { scene } = useGLTF("/models/gamingpc.glb");

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(t / 6) / 4;
        groupRef.current.position.y = Math.sin(t / 2) * 0.1;
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0.2, 0, 0]}>
            {/* Reduced scale from 1.5 to 0.5 per user request */}
            <primitive object={scene} scale={0.5} position={[0, -0.5, 0]} />
        </group>
    );
}

export default function Hero3D() {
    return (
        <div className="relative w-full h-full bg-transparent">
            <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
                    <Environment preset="city" />
                    <Suspense fallback={null}>
                        <GamingPC />
                    </Suspense>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />
                </Canvas>
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mix-blend-difference mb-6">
                        Hi, I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">Buddhi Vichakkshana</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed mix-blend-difference">
                        I develop robust full-stack systems, scalable web applications, and seamless digital experiences.
                    </p>
                </motion.div>

                <div className="absolute bottom-10 right-10 opacity-20 hidden md:block select-none">
                    <span className="font-serif italic text-8xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                        2026
                    </span>
                </div>
            </div>
        </div>
    );
}

useGLTF.preload("/models/gamingpc.glb");
