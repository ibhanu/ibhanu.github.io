"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_KEYFRAMES } from "@/data/portfolioData";

interface CameraRigProps {
  activeStage: number;
  exploded: boolean;
  orbitEnabled: boolean;
  onCameraUpdate?: (coords: [number, number, number]) => void;
}

export default function CameraRig({
  activeStage,
  exploded,
  orbitEnabled,
  onCameraUpdate,
}: CameraRigProps) {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0.15, 7.6));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const frameCounter = useRef(0);

  useFrame((_, delta) => {
    if (orbitEnabled) return;

    const kf =
      CAMERA_KEYFRAMES[
        Math.min(Math.max(activeStage, 0), CAMERA_KEYFRAMES.length - 1)
      ];

    // If exploded mode is manually toggled on in hero/arch, bias camera to isometric orbit
    const basePos =
      exploded && activeStage < 2
        ? [3.1, 1.2, 5.2]
        : kf.position;
    const baseLook =
      exploded && activeStage < 2
        ? [0, 0, 0]
        : kf.lookAt;

    // Dampened pointer parallax
    const parallaxX = pointer.x * 0.45;
    const parallaxY = pointer.y * 0.3;

    targetPos.current.set(
      basePos[0] + parallaxX,
      basePos[1] + parallaxY,
      basePos[2]
    );
    targetLookAt.current.set(baseLook[0], baseLook[1], baseLook[2]);

    const damp = Math.min(1, delta * 3.5);
    camera.position.lerp(targetPos.current, damp);
    currentLookAt.current.lerp(targetLookAt.current, damp);
    camera.lookAt(currentLookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, kf.fov, damp);
      camera.updateProjectionMatrix();
    }

    frameCounter.current += 1;
    if (onCameraUpdate && frameCounter.current % 6 === 0) {
      onCameraUpdate([
        Number(camera.position.x.toFixed(2)),
        Number(camera.position.y.toFixed(2)),
        Number(camera.position.z.toFixed(2)),
      ]);
    }
  });

  return null;
}
