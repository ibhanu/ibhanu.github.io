"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TelemetryField3DProps {
  accentColor?: string;
  audioActive?: boolean;
  exploded?: boolean;
}

export default function TelemetryField3D({
  accentColor = "#af00f1",
  audioActive = false,
  exploded = false,
}: TelemetryField3DProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 120; // Optimized for 60 FPS on both desktop and mobile

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const col = (i % 15) - 7;
      const row = Math.floor(i / 15) - 4;
      temp.push({
        x: col * 0.85,
        y: row * 0.75,
        z: -2.6 - (i % 3) * 0.6,
        phase: i * 0.35,
        speed: 0.8 + (i % 5) * 0.25,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, idx) => {
      const waveAmp = audioActive ? 0.55 : exploded ? 0.28 : 0.14;
      const freq = audioActive ? 3.8 : 1.4;
      const waveY = Math.sin(t * p.speed * freq + p.phase) * waveAmp;
      const waveZ = Math.cos(t * 0.9 + p.phase) * (audioActive ? 0.4 : 0.15);

      dummy.position.set(p.x, p.y + waveY, p.z + waveZ);

      const scaleBase = audioActive
        ? 0.035 + Math.abs(Math.sin(t * 4 + p.phase)) * 0.045
        : 0.024;
      dummy.scale.set(
        scaleBase,
        audioActive ? scaleBase * 3.2 : scaleBase,
        scaleBase
      );
      dummy.rotation.set(t * 0.2, t * 0.3, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(idx, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={accentColor}
        emissive={accentColor}
        emissiveIntensity={audioActive ? 1.8 : 0.75}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.55}
      />
    </instancedMesh>
  );
}
