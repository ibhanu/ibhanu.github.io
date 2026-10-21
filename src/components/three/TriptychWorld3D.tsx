'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export interface DeveloperStage3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
  activeSectionRef: React.MutableRefObject<string>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  activeScreenOverrides: Record<string, number>;
  orbitMode?: boolean;
}

// WebGL context detection
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Error Boundary for WebGL failures and headless browsers
class WebGLErrorBoundary extends React.Component<
  { fallback?: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback?: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn('WebGL initialization failed, falling back gracefully:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Math interpolation utilities for high-precision scrollcraft
function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function smoothRange(x: number, inStart: number, inEnd: number, outStart: number, outEnd: number): number {
  return smoothstep(inStart, inEnd, x) * (1 - smoothstep(outStart, outEnd, x));
}

// Highly optimized WebP assets (94% smaller payload, instant texture uploads)
const SCREENSHOT_PATHS = [
  '/screenshots/bigbang-1.webp',
  '/screenshots/bigbang-2.webp',
  '/screenshots/bigbang-3.webp',
  '/screenshots/under25-1.webp',
  '/screenshots/under25-2.webp',
  '/screenshots/under25-3.webp',
  '/screenshots/aura-discovery.webp',
  '/screenshots/aura-chat.webp',
  '/screenshots/aura-profile.webp',
  '/screenshots/mango-home.webp',
  '/screenshots/mango-themes.webp',
  '/screenshots/mango-widget.webp',
];

// ============================================================================
// 3D SPLINE CURVES: ELEGANT ARCHITECTURAL DATA FLOWS WITH KINETIC SCROLL ACCELERATION
// ============================================================================

function SplineDataRibbons({
  accentColor,
  isMobile,
  scrollProgressRef,
}: {
  accentColor: string;
  isMobile: boolean;
  scrollProgressRef: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const animTimeRef = useRef(0);
  const prevPRef = useRef(scrollProgressRef.current);

  const curves = useMemo(() => {
    if (isMobile) {
      return [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.8, -1.8, -0.8),
          new THREE.Vector3(0.6, -0.6, 0.4),
          new THREE.Vector3(-0.4, 0.8, -0.2),
          new THREE.Vector3(0.5, 1.8, 0.3),
        ]),
      ];
    }
    return [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.6, -1.8, -0.6),
        new THREE.Vector3(2.2, -0.6, 0.4),
        new THREE.Vector3(3.2, 0.8, -0.2),
        new THREE.Vector3(1.8, 1.8, 0.5),
        new THREE.Vector3(0.8, 2.2, -0.4),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(3.4, -1.5, -0.4),
        new THREE.Vector3(1.6, -0.4, 0.6),
        new THREE.Vector3(1.2, 0.9, -0.5),
        new THREE.Vector3(2.8, 1.9, 0.3),
      ]),
    ];
  }, [isMobile]);

  const tubeGeometries = useMemo(() => {
    return curves.map((c) => new THREE.TubeGeometry(c, 48, 0.012, 6, false));
  }, [curves]);

  const particleCount = isMobile ? 24 : 48;
  const particlePositions = useMemo(() => {
    return new Float32Array(particleCount * 3);
  }, [particleCount]);

  useFrame((_, delta) => {
    const curP = scrollProgressRef.current;
    const scrollDelta = Math.abs(curP - prevPRef.current);
    prevPRef.current = curP;

    // Base continuous drift + kinetic burst from active scrolling
    animTimeRef.current += delta * (0.24 + scrollDelta * 14.0);
    const t = animTimeRef.current;

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const curveIdx = i % curves.length;
        const progress = (t * (0.8 + (i % 3) * 0.2) + i / particleCount) % 1;
        const pt = curves[curveIdx].getPointAt(progress);
        posAttr.setXYZ(i, pt.x, pt.y, pt.z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {tubeGeometries.map((geo, idx) => (
        <mesh key={idx} geometry={geo}>
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={accentColor}
          size={isMobile ? 0.055 : 0.075}
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ============================================================================
// REAL 3D PHONE HANDSET COMPONENT (WITH REAL SCREENSHOT TEXTURES)
// ============================================================================

interface PhoneHandsetProps {
  textures: THREE.Texture[];
  screenIndex: number;
  accentColor: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

function PhoneHandset3D({
  textures,
  screenIndex,
  accentColor,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: PhoneHandsetProps) {
  const safeIndex = Math.max(0, Math.min(textures.length - 1, screenIndex));
  const activeTex = textures[safeIndex];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Brushed Aluminum / Dark Slate Body */}
      <RoundedBox args={[2.08, 4.28, 0.16]} radius={0.22} smoothness={4}>
        <meshStandardMaterial
          color="#171B24"
          metalness={0.82}
          roughness={0.26}
        />
      </RoundedBox>

      {/* Subtle Rim Accent */}
      <RoundedBox args={[2.11, 4.31, 0.12]} radius={0.23} smoothness={3}>
        <meshStandardMaterial
          color={accentColor}
          metalness={0.65}
          roughness={0.35}
        />
      </RoundedBox>

      {/* Inner Black Bezel */}
      <mesh position={[0, 0, 0.082]}>
        <planeGeometry args={[1.94, 4.12]} />
        <meshBasicMaterial color="#050608" />
      </mesh>

      {/* Real App Store / Product Screenshot Display */}
      <mesh position={[0, 0, 0.086]}>
        <planeGeometry args={[1.88, 4.02]} />
        <meshBasicMaterial map={activeTex} toneMapped={false} />
      </mesh>

      {/* Top Speaker / Dynamic Island Pill */}
      <mesh position={[0, 1.88, 0.09]}>
        <planeGeometry args={[0.48, 0.11]} />
        <meshBasicMaterial color="#050608" />
      </mesh>
    </group>
  );
}

// ============================================================================
// MAIN SCENE: CONTINUOUS SCROLL-LINKED 3D PRODUCT STAGE (DESKTOP & MOBILE)
// ============================================================================

function DeveloperShowcaseScene({
  scrollProgressRef,
  activeSectionRef,
  pointerRef,
  activeScreenOverrides,
  orbitMode = false,
}: DeveloperStage3DProps) {
  const { camera, scene, viewport } = useThree();
  const rawTextures = useTexture(SCREENSHOT_PATHS);

  const textures = useMemo(() => {
    rawTextures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
    });
    return rawTextures;
  }, [rawTextures]);

  const isMobile = viewport.width < 5.2;

  const heroGroupRef = useRef<THREE.Group>(null);
  const bigbangRef = useRef<THREE.Group>(null);
  const under25Ref = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Group>(null);
  const mangoRef = useRef<THREE.Group>(null);
  const bgColorRef = useRef(new THREE.Color('#07080B'));

  // Continuous smoothed scroll progress & velocity
  const smoothPRef = useRef(0);
  const prevPRef = useRef(0);
  const velRef = useRef(0);

  // Dynamic screen indices calculated continuously
  const [activeScreens, setActiveScreens] = useState({
    bigbang: 0,
    under25: 0,
    aura: 0,
    mango: 0,
  });

  const lastCalculatedScreens = useRef({
    bigbang: -1,
    under25: -1,
    aura: -1,
    mango: -1,
  });

  useFrame((state, delta) => {
    const rawP = scrollProgressRef.current;
    const ptr = pointerRef.current;
    const t = state.clock.elapsedTime;

    // 1. Continuous exponential smoothing for scroll progress
    const pDamp = 1 - Math.exp(-12 * delta);
    smoothPRef.current = THREE.MathUtils.lerp(smoothPRef.current, rawP, pDamp);
    const sp = smoothPRef.current;

    // 2. Continuous velocity estimation with smooth decay
    const instantaneousVel = (sp - prevPRef.current) / Math.max(0.001, delta);
    prevPRef.current = sp;
    velRef.current = THREE.MathUtils.lerp(velRef.current, instantaneousVel, 1 - Math.exp(-8 * delta));
    const vel = Math.max(-1.8, Math.min(1.8, velRef.current));

    // 3. Normalized continuous visibility curves (Smooth overlapping blends across 400 frames)
    // Intro: 0.00 -> 0.16
    const wIntro = smoothRange(sp, -0.05, 0.00, 0.12, 0.17);
    // BigBang: 0.12 -> 0.40
    const wBigBang = smoothRange(sp, 0.12, 0.16, 0.35, 0.40);
    // Under25: 0.35 -> 0.61
    const wUnder25 = smoothRange(sp, 0.35, 0.39, 0.56, 0.61);
    // OpenSource: 0.56 -> 0.82
    const wOpenSource = smoothRange(sp, 0.56, 0.60, 0.77, 0.82);
    // Paper/SDKs: 0.77 -> 1.00
    const wPaper = smoothstep(0.77, 0.85, sp);

    // Intra-section scrubbing phases [0.0 to 1.0]
    const phaseIntro = clamp01(sp / 0.15);
    const phaseBB = clamp01((sp - 0.14) / 0.23);
    const phaseU25 = clamp01((sp - 0.36) / 0.22);
    const phaseOS = clamp01((sp - 0.57) / 0.22);

    // Screen texture auto-scrubbing based on phase (with manual override support)
    const targetBB =
      activeScreenOverrides.bigbang !== undefined
        ? activeScreenOverrides.bigbang
        : phaseBB < 0.34
        ? 0
        : phaseBB < 0.68
        ? 1
        : 2;

    const targetU25 =
      activeScreenOverrides.under25 !== undefined
        ? activeScreenOverrides.under25
        : phaseU25 < 0.34
        ? 0
        : phaseU25 < 0.68
        ? 1
        : 2;

    const targetAura =
      activeScreenOverrides.aura !== undefined
        ? activeScreenOverrides.aura
        : phaseOS < 0.5
        ? 0
        : 1;

    const targetMango =
      activeScreenOverrides.mango !== undefined
        ? activeScreenOverrides.mango
        : phaseOS < 0.5
        ? 0
        : phaseOS < 0.75
        ? 1
        : 2;

    if (
      targetBB !== lastCalculatedScreens.current.bigbang ||
      targetU25 !== lastCalculatedScreens.current.under25 ||
      targetAura !== lastCalculatedScreens.current.aura ||
      targetMango !== lastCalculatedScreens.current.mango
    ) {
      lastCalculatedScreens.current = {
        bigbang: targetBB,
        under25: targetU25,
        aura: targetAura,
        mango: targetMango,
      };
      setActiveScreens({
        bigbang: targetBB,
        under25: targetU25,
        aura: targetAura,
        mango: targetMango,
      });
    }

    // Responsive position offsets based on viewport width
    const targetBaseX = isMobile ? 0 : 2.2;
    const targetScaleMultiplier = isMobile ? Math.min(0.58, viewport.width * 0.17) : 1;

    // 4. CAMERA: Continuous kinetic dolly & tilt with subtle velocity reaction
    if (!orbitMode) {
      const targetCamX = isMobile ? 0 : ptr.x * 0.26;
      const targetCamY = isMobile ? 0 : ptr.y * 0.16;
      // High-impact dynamic camera dolly: pushes slightly closer on Under25 and backs off on SDKs
      const baseCamZ = isMobile ? 6.8 : 6.2;
      const velocityDolly = Math.abs(vel) * 0.15;
      const u25Dolly = Math.sin(phaseU25 * Math.PI) * 0.35 * wUnder25;
      const paperPullback = wPaper * 0.55;
      const targetCamZ = baseCamZ - velocityDolly - u25Dolly + paperPullback;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, pDamp);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, pDamp);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, pDamp);
      camera.lookAt(isMobile ? 0 : 0.7, 0, 0);
    }

    // 5. BACKGROUND TRANSITION: Seamless paper ground shift for SDKs section
    const darkHex = new THREE.Color('#07080B');
    const paperHex = new THREE.Color('#F4F0EA');
    bgColorRef.current.lerpColors(darkHex, paperHex, wPaper);
    scene.background = bgColorRef.current;

    // 6. ACT I: HERO TRIO OF PHONES (Continuous 3D Expansion & Fan-out)
    if (heroGroupRef.current) {
      const v = wIntro;
      heroGroupRef.current.visible = v > 0.005;
      // Fan out horizontally and drift with scroll
      heroGroupRef.current.position.set(
        targetBaseX + (1 - v) * (isMobile ? 0 : 1.6),
        (isMobile ? -0.4 : -0.08) + Math.sin(t * 1.2) * 0.04 - phaseIntro * 0.35 - (1 - v) * 0.6,
        (isMobile ? -0.8 : 0) - phaseIntro * 0.25
      );
      if (!orbitMode) {
        heroGroupRef.current.rotation.set(
          (isMobile ? 0.04 : ptr.y * 0.08) - vel * 0.04,
          (isMobile ? 0 : -0.22 + ptr.x * 0.16) + phaseIntro * 0.18,
          0
        );
      }
      heroGroupRef.current.scale.setScalar(
        Math.max(0.001, v * 0.84 * targetScaleMultiplier * (1 + phaseIntro * 0.06))
      );
    }

    // 7. ACT II: BIGBANG.SOCIAL PHONE (Continuous 28° Yaw Sweep + Parallax Float + Velocity Pitch)
    if (bigbangRef.current) {
      const v = wBigBang;
      bigbangRef.current.visible = v > 0.005;

      const continuousYaw = -0.38 + phaseBB * 0.52 + (isMobile ? 0 : ptr.x * 0.16);
      const dynamicPitch =
        (isMobile ? 0.03 : ptr.y * 0.08) -
        Math.min(0.14, Math.max(-0.14, vel * 0.05)) +
        Math.sin(phaseBB * Math.PI) * 0.08;
      const dynamicRoll = 0.02 - Math.sin(phaseBB * Math.PI * 2) * 0.035;

      bigbangRef.current.position.set(
        (isMobile ? 0 : 2.25) + Math.sin(phaseBB * Math.PI) * 0.18 + (1 - v) * (isMobile ? 0 : 1.5),
        (isMobile ? -0.35 : -0.06) +
          (phaseBB - 0.5) * 0.32 +
          Math.sin(t * 1.3) * 0.04 +
          (1 - v) * -0.9,
        (isMobile ? -0.9 : 0.18) + Math.sin(phaseBB * Math.PI) * 0.12
      );

      if (!orbitMode) {
        bigbangRef.current.rotation.set(dynamicPitch, continuousYaw, dynamicRoll);
      }
      bigbangRef.current.scale.setScalar(
        Math.max(0.001, v * 0.94 * targetScaleMultiplier * (1 + Math.sin(phaseBB * Math.PI) * 0.04))
      );
    }

    // 8. ACT III: UNDER 25 UNIVERSE PHONE (Inverse Yaw Arc + Event Card Depth)
    if (under25Ref.current) {
      const v = wUnder25;
      under25Ref.current.visible = v > 0.005;

      const continuousYaw = 0.32 - phaseU25 * 0.54 + (isMobile ? 0 : ptr.x * 0.16);
      const dynamicPitch =
        (isMobile ? 0.03 : ptr.y * 0.08) -
        Math.min(0.14, Math.max(-0.14, vel * 0.05)) +
        Math.sin(phaseU25 * Math.PI) * 0.07;
      const dynamicRoll = -0.02 + Math.sin(phaseU25 * Math.PI * 2) * 0.035;

      under25Ref.current.position.set(
        (isMobile ? 0 : 2.25) - Math.sin(phaseU25 * Math.PI) * 0.16 + (1 - v) * (isMobile ? 0 : 1.5),
        (isMobile ? -0.35 : -0.06) +
          (phaseU25 - 0.5) * 0.32 +
          Math.cos(t * 1.3) * 0.04 +
          (1 - v) * -0.9,
        (isMobile ? -0.9 : 0.18) + Math.sin(phaseU25 * Math.PI) * 0.14
      );

      if (!orbitMode) {
        under25Ref.current.rotation.set(dynamicPitch, continuousYaw, dynamicRoll);
      }
      under25Ref.current.scale.setScalar(
        Math.max(0.001, v * 0.94 * targetScaleMultiplier * (1 + Math.sin(phaseU25 * Math.PI) * 0.04))
      );
    }

    // 9. ACT IV: AURA & MANGO OPEN-SOURCE DUAL STAGE (Interactive Foreground/Background Focus Swap)
    if (auraRef.current && mangoRef.current) {
      const v = wOpenSource;
      auraRef.current.visible = v > 0.005;
      mangoRef.current.visible = v > 0.005;

      // Aura starts in foreground, glides back as user scrolls down
      const auraX = (isMobile ? -0.65 : 1.62) - phaseOS * 0.22 + (1 - v) * (isMobile ? 0 : 1.4);
      const auraY = (isMobile ? -0.3 : -0.02) - phaseOS * 0.12 + Math.sin(t * 1.4) * 0.04;
      const auraZ = (isMobile ? -0.68 : 0.32) - phaseOS * 0.68;
      const auraYaw = (isMobile ? 0.08 : -0.14) - phaseOS * 0.16 + ptr.x * 0.12;

      auraRef.current.position.set(auraX, auraY, auraZ);
      if (!orbitMode) {
        auraRef.current.rotation.set((isMobile ? 0.02 : ptr.y * 0.07) - vel * 0.04, auraYaw, 0.025);
      }
      auraRef.current.scale.setScalar(
        Math.max(0.001, v * 0.82 * targetScaleMultiplier * (1.0 - phaseOS * 0.09))
      );

      // Mango starts in background, glides into foreground focus as user reaches Mind Architected
      const mangoX = (isMobile ? 0.65 : 2.92) - phaseOS * 0.34 + (1 - v) * (isMobile ? 0 : 1.8);
      const mangoY = (isMobile ? -0.4 : -0.2) + phaseOS * 0.14 + Math.cos(t * 1.4) * 0.04;
      const mangoZ = (isMobile ? -1.08 : -0.42) + phaseOS * 0.74;
      const mangoYaw = (isMobile ? -0.14 : -0.34) + phaseOS * 0.25 + ptr.x * 0.12;

      mangoRef.current.position.set(mangoX, mangoY, mangoZ);
      if (!orbitMode) {
        mangoRef.current.rotation.set((isMobile ? 0.02 : ptr.y * 0.07) - vel * 0.04, mangoYaw, -0.025);
      }
      mangoRef.current.scale.setScalar(
        Math.max(0.001, v * 0.78 * targetScaleMultiplier * (0.92 + phaseOS * 0.14))
      );
    }
  });

  const activeColor =
    activeSectionRef.current === 'under25'
      ? '#10B981'
      : activeSectionRef.current === 'opensource'
      ? '#F59E0B'
      : '#FF4F1F';

  return (
    <>
      <ambientLight intensity={1.35} />
      <directionalLight position={[5, 8, 6]} intensity={2.2} color="#FFF7ED" />
      <directionalLight position={[-6, -3, 4]} intensity={1.1} color={activeColor} />

      {/* 3D SPLINE TELEMETRY CURVES (Kinetic particles accelerate with scroll velocity) */}
      <SplineDataRibbons
        accentColor={activeColor}
        isMobile={isMobile}
        scrollProgressRef={scrollProgressRef}
      />

      {/* ACT I: HERO TRIO OF SHIPPED APPS */}
      <group ref={heroGroupRef}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={3}
          accentColor="#10B981"
          position={[-1.05, -0.18, -0.55]}
          rotation={[0, 0.22, 0.08]}
          scale={0.82}
        />
        <PhoneHandset3D
          textures={textures}
          screenIndex={6}
          accentColor="#F59E0B"
          position={[1.05, -0.22, -0.55]}
          rotation={[0, -0.24, -0.08]}
          scale={0.82}
        />
        <PhoneHandset3D
          textures={textures}
          screenIndex={0}
          accentColor="#FF4F1F"
          position={[0, 0.08, 0.25]}
          rotation={[0, -0.08, 0]}
          scale={0.96}
        />
      </group>

      {/* ACT II: BIGBANG.SOCIAL LIVE HANDSET */}
      <group ref={bigbangRef}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={activeScreens.bigbang}
          accentColor="#FF4F1F"
        />
      </group>

      {/* ACT III: UNDER 25 UNIVERSE LIVE HANDSET */}
      <group ref={under25Ref}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={3 + activeScreens.under25}
          accentColor="#10B981"
        />
      </group>

      {/* ACT IV: AURA & MANGO OPEN-SOURCE HANDSETS */}
      <group ref={auraRef}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={6 + activeScreens.aura}
          accentColor="#FF4F1F"
        />
      </group>
      <group ref={mangoRef}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={9 + activeScreens.mango}
          accentColor="#F59E0B"
        />
      </group>

      {orbitMode && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.6}
        />
      )}
    </>
  );
}

export function ChronographWorld3D(props: DeveloperStage3DProps) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  if (!supported) return null;

  return (
    <WebGLErrorBoundary fallback={null}>
      <div
        className={`fixed inset-0 z-0 ${
          props.orbitMode ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
        }`}
        aria-hidden={!props.orbitMode}
      >
        <Canvas
          dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.75) : 1.5]}
          camera={{ position: [0, 0, 6.2], fov: 38, near: 0.1, far: 50 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <React.Suspense fallback={null}>
            <DeveloperShowcaseScene {...props} />
          </React.Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

export default ChronographWorld3D;
