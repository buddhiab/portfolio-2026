"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BackgroundWave() {
    const meshRef = useRef(null);
    const geometryRef = useRef(null);
    const originalPosRef = useRef(null);

    useEffect(() => {
        // High-segment plane for smooth waves
        geometryRef.current = new THREE.PlaneGeometry(80, 80, 120, 120);
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
        <mesh ref={meshRef} position={[0, -10, -20]} rotation={[-Math.PI / 2.2, 0, 0]}>
            <meshBasicMaterial
                color="#7c3aed"
                wireframe={true}
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

export default function GlobalWaveBackground() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-zinc-950">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <BackgroundWave />
            </Canvas>
        </div>
    );
}
