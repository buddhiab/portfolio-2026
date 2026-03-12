"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, ContactShadows, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import BasicCard from "./BasicCard";

function Card3D({ project }) {
    const groupRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Smooth scaling on hover
        const targetScale = hovered ? 1.05 : 1;
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Smooth rotation/tilt towards mouse when hovered
        if (hovered) {
            const targetRotationX = (state.pointer.y * Math.PI) / 6; // Tilt up/down
            const targetRotationY = (state.pointer.x * Math.PI) / 6; // Tilt left/right
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetRotationX, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
        } else {
            // Reset rotation when not hovered
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
        }
    });

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Float
                speed={2} // Animation speed
                rotationIntensity={0.2} // XYZ rotation intensity
                floatIntensity={0.5} // Up/down float intensity
                floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within
            >
                {/* 3D Physical Glass Backing */}
                <RoundedBox args={[3.4, 4.2, 0.05]} radius={0.15} position={[0, 0, -0.05]}>
                    <meshPhysicalMaterial
                        transmission={1}
                        roughness={0.1}
                        thickness={0.5}
                        envMapIntensity={2}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        color="#ffffff"
                    />
                </RoundedBox>

                {/* The HTML UI Injection */}
                <Html
                    transform
                    center
                    distanceFactor={4}
                    position={[0, 0, 0.01]} // Just in front of the glass
                    className="pointer-events-auto"
                >
                    <BasicCard
                        title={project?.title}
                        description={project?.description}
                        tags={project?.tags}
                        link={project?.link}
                        imageUrl={project?.imageUrl}
                        buttonText={project ? "View Project" : "Example Button"}
                    />
                </Html>
            </Float>
        </group>
    );
}

export default function CardShowcase3D({ project }) {
    return (
        <div className="w-full h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="pointer-events-auto cursor-pointer">
                <ambientLight intensity={1} />
                <Environment preset="city" />

                <Card3D project={project} />

                {/* Adds a nice shadow underneath the floating card */}
                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            </Canvas>
        </div>
    );
}
