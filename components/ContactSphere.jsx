"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment } from "@react-three/drei";

// Sub-component that handles the asynchronous fetching of the GLTF model
function StylizedPlanet() {
    // Load the local .glb file. Ensure your local file exists at public/models/planet.glb
    const { scene } = useGLTF("/models/planet.glb");

    return (
        <Float
            speed={2}
            rotationIntensity={1.5}
            floatIntensity={2}
        >
            {/* Reduced scale from 2.5 to 1.2 per user request */}
            <primitive object={scene} scale={1.8} position={[0, 0, 0]} />
        </Float>
    );
}

export default function ContactSphere() {
    return (
        <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                {/* 1. Base ambient light */}
                <ambientLight intensity={0.8} />

                {/* 2. Primary strong white light from the top right */}
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />

                {/* 3. Secondary colored light casting blue tint from the bottom left */}
                <directionalLight position={[-10, -10, -10]} intensity={2} color="#3b82f6" />

                {/* 4. HDR Environment map for premium reflections on metallic/glossy surfaces */}
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <StylizedPlanet />
                </Suspense>

                {/* Interaction controls */}
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={1}
                />
            </Canvas>
        </div>
    );
}

// Preload the model so it starts downloading immediately by the browser
useGLTF.preload("/models/planet.glb");
