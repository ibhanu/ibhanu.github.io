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

const SCREENSHOT_PATHS = [
  '/screenshots/bigbang-1.jpg',
  '/screenshots/bigbang-2.jpg',
  '/screenshots/bigbang-3.jpg',
  '/screenshots/under25-1.jpg',
  '/screenshots/under25-2.jpg',
  '/screenshots/under25-3.jpg',
  '/screenshots/aura-discovery.png',
  '/screenshots/aura-chat.png',
  '/screenshots/aura-profile.png',
  '/screenshots/mango-home.png',
  '/screenshots/mango-themes.png',
  '/screenshots/mango-widget.png',
];

// ============================================================================
// 3D SPLINE CURVES: ELEGANT ARCHITECTURAL DATA FLOWS
// ============================================================================

function SplineDataRibbons({ accentColor, isMobile }: { accentColor: string; isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
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

  const particleCount = isMobile ? 20 : 40;
  const particlePositions = useMemo(() => {
    return new Float32Array(particleCount * 3);
  }, [particleCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.25;
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
          size={isMobile ? 0.05 : 0.07}
          transparent
          opacity={0.8}
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
// MAIN SCENE: SCROLL-LINKED 3D PRODUCT STAGE (DESKTOP & MOBILE RESPONSIVE)
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

  const visWeightsRef = useRef({
    intro: 1,
    bigbang: 0,
    under25: 0,
    opensource: 0,
    paper: 0,
  });

  useFrame((state, delta) => {
    const sec = activeSectionRef.current;
    const ptr = pointerRef.current;
    const t = state.clock.elapsedTime;
    const damp = 1 - Math.exp(-7.5 * delta);

    const w = visWeightsRef.current;
    w.intro = THREE.MathUtils.lerp(w.intro, sec === 'intro' ? 1 : 0, damp);
    w.bigbang = THREE.MathUtils.lerp(w.bigbang, sec === 'bigbang' ? 1 : 0, damp);
    w.under25 = THREE.MathUtils.lerp(w.under25, sec === 'under25' ? 1 : 0, damp);
    w.opensource = THREE.MathUtils.lerp(
      w.opensource,
      sec === 'opensource' ? 1 : 0,
      damp
    );
    w.paper = THREE.MathUtils.lerp(w.paper, sec === 'sdks' ? 1 : 0, damp);

    // Responsive position offsets based on viewport width
    const targetBaseX = isMobile ? 0 : 2.15;
    const targetScaleMultiplier = isMobile ? Math.min(0.58, viewport.width * 0.17) : 1;

    // Camera handling: automatic smooth lerp if not in manual orbit mode
    if (!orbitMode) {
      const targetCamX = isMobile ? 0 : ptr.x * 0.28;
      const targetCamY = isMobile ? 0 : ptr.y * 0.18;
      const targetCamZ = isMobile ? 6.8 : 6.2;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, damp);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, damp);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, damp);
      camera.lookAt(isMobile ? 0 : 0.75, 0, 0);
    }

    // Background color transition for Act V (Paper ground shift on SDKs section)
    const darkHex = new THREE.Color('#07080B');
    const paperHex = new THREE.Color('#F4F0EA');
    bgColorRef.current.lerpColors(darkHex, paperHex, w.paper);
    scene.background = bgColorRef.current;

    // 1. HERO FAN OF PHONES (Act I: Intro)
    if (heroGroupRef.current) {
      const v = w.intro;
      heroGroupRef.current.visible = v > 0.01;
      heroGroupRef.current.position.set(
        targetBaseX + (1 - v) * (isMobile ? 0 : 1.6),
        (isMobile ? -0.4 : -0.1) + Math.sin(t * 1.2) * 0.05 - (1 - v) * 0.8,
        isMobile ? -0.8 : 0
      );
      if (!orbitMode) {
        heroGroupRef.current.rotation.set(
          isMobile ? 0.04 : ptr.y * 0.08,
          isMobile ? 0 : -0.22 + ptr.x * 0.16,
          0
        );
      }
      heroGroupRef.current.scale.setScalar(
        Math.max(0.001, v * 0.84 * targetScaleMultiplier)
      );
    }

    // 2. ACT II: BIGBANG.SOCIAL PHONE
    if (bigbangRef.current) {
      const v = w.bigbang;
      bigbangRef.current.visible = v > 0.01;
      bigbangRef.current.position.set(
        (isMobile ? 0 : 2.25) + (1 - v) * (isMobile ? 0 : 1.5),
        (isMobile ? -0.35 : -0.08) + Math.sin(t * 1.3) * 0.05 + (1 - v) * -0.9,
        isMobile ? -0.9 : 0.15
      );
      if (!orbitMode) {
        bigbangRef.current.rotation.set(
          isMobile ? 0.03 : ptr.y * 0.08,
          isMobile ? 0 : -0.26 + ptr.x * 0.18,
          0.02
        );
      }
      bigbangRef.current.scale.setScalar(
        Math.max(0.001, v * 0.94 * targetScaleMultiplier)
      );
    }

    // 3. ACT III: UNDER 25 UNIVERSE PHONE
    if (under25Ref.current) {
      const v = w.under25;
      under25Ref.current.visible = v > 0.01;
      under25Ref.current.position.set(
        (isMobile ? 0 : 2.25) + (1 - v) * (isMobile ? 0 : 1.5),
        (isMobile ? -0.35 : -0.08) + Math.cos(t * 1.3) * 0.05 + (1 - v) * -0.9,
        isMobile ? -0.9 : 0.15
      );
      if (!orbitMode) {
        under25Ref.current.rotation.set(
          isMobile ? 0.03 : ptr.y * 0.08,
          isMobile ? 0 : -0.26 + ptr.x * 0.18,
          -0.02
        );
      }
      under25Ref.current.scale.setScalar(
        Math.max(0.001, v * 0.94 * targetScaleMultiplier)
      );
    }

    // 4. ACT IV: AURA & MANGO OPEN-SOURCE PAIR
    if (auraRef.current && mangoRef.current) {
      const v = w.opensource;
      auraRef.current.visible = v > 0.01;
      mangoRef.current.visible = v > 0.01;

      auraRef.current.position.set(
        (isMobile ? -0.65 : 1.65) + (1 - v) * (isMobile ? 0 : 1.5),
        (isMobile ? -0.3 : -0.02) + Math.sin(t * 1.4) * 0.05,
        isMobile ? -0.7 : 0.25
      );
      if (!orbitMode) {
        auraRef.current.rotation.set(
          isMobile ? 0.02 : ptr.y * 0.08,
          isMobile ? 0.12 : -0.18 + ptr.x * 0.15,
          0.03
        );
      }
      auraRef.current.scale.setScalar(
        Math.max(0.001, v * 0.82 * targetScaleMultiplier)
      );

      mangoRef.current.position.set(
        (isMobile ? 0.65 : 2.9) + (1 - v) * (isMobile ? 0 : 1.8),
        (isMobile ? -0.4 : -0.2) + Math.cos(t * 1.4) * 0.05,
        isMobile ? -1.1 : -0.3
      );
      if (!orbitMode) {
        mangoRef.current.rotation.set(
          isMobile ? 0.02 : ptr.y * 0.08,
          isMobile ? -0.14 : -0.3 + ptr.x * 0.15,
          -0.03
        );
      }
      mangoRef.current.scale.setScalar(
        Math.max(0.001, v * 0.8 * targetScaleMultiplier)
      );
    }
  });

  const p = scrollProgressRef.current;
  const bbAutoIdx = p < 0.22 ? 0 : p < 0.28 ? 1 : 2;
  const bbIdx =
    activeScreenOverrides.bigbang !== undefined
      ? activeScreenOverrides.bigbang
      : bbAutoIdx;

  const u25AutoIdx = p < 0.42 ? 0 : p < 0.48 ? 1 : 2;
  const u25Idx =
    activeScreenOverrides.under25 !== undefined
      ? activeScreenOverrides.under25
      : u25AutoIdx;

  const auraIdx =
    activeScreenOverrides.aura !== undefined ? activeScreenOverrides.aura : 0;
  const mangoIdx =
    activeScreenOverrides.mango !== undefined ? activeScreenOverrides.mango : 0;

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

      {/* 3D SPLINE TELEMETRY CURVES */}
      <SplineDataRibbons accentColor={activeColor} isMobile={isMobile} />

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
          screenIndex={bbIdx}
          accentColor="#FF4F1F"
        />
      </group>

      {/* ACT III: UNDER 25 UNIVERSE LIVE HANDSET */}
      <group ref={under25Ref}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={3 + u25Idx}
          accentColor="#10B981"
        />
      </group>

      {/* ACT IV: AURA & MANGO OPEN-SOURCE HANDSETS */}
      <group ref={auraRef}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={6 + auraIdx}
          accentColor="#FF4F1F"
        />
      </group>
      <group ref={mangoRef}>
        <PhoneHandset3D
          textures={textures}
          screenIndex={9 + mangoIdx}
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
