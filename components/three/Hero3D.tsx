"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Trail } from "@react-three/drei";
import * as THREE from "three";

// 성능 레벨 감지 훅
function usePerformanceLevel(): "high" | "medium" | "low" {
  const [level, setLevel] = useState<"high" | "medium" | "low">("high");

  useEffect(() => {
    // CPU 코어 수 확인
    const cores = navigator.hardwareConcurrency || 4;

    // 디바이스 메모리 확인 (Chrome만 지원)
    const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;

    // prefers-reduced-motion 확인
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setLevel("low");
    } else if (cores <= 2 || memory <= 2) {
      setLevel("low");
    } else if (cores <= 4 || memory <= 4) {
      setLevel("medium");
    } else {
      setLevel("high");
    }
  }, []);

  return level;
}

// 궤도를 따라 움직이는 파티클
function OrbitingParticle({
  radius,
  speed,
  color,
  offset,
  tiltX,
  tiltY,
}: {
  radius: number;
  speed: number;
  color: string;
  offset: number;
  tiltX: number;
  tiltY: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speed + offset;

    // 기울어진 원형 궤도
    const x = Math.cos(time) * radius;
    const y = Math.sin(time) * radius * Math.cos(tiltX);
    const z = Math.sin(time) * radius * Math.sin(tiltY);

    meshRef.current.position.set(x, y, z);
  });

  return (
    <Trail
      width={0.3}
      length={8}
      color={new THREE.Color(color)}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

// 메인 구체 (중앙)
function CentralSphere({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    const time = state.clock.getElapsedTime();

    // 마우스 반응
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.current.x * 0.3,
      0.02
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.current.y * 0.2,
      0.02
    );

    // 와이어프레임 회전
    wireframeRef.current.rotation.y = time * 0.1;
    wireframeRef.current.rotation.x = time * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* 내부 글로우 구체 */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial
            color="#1E40AF"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* 와이어프레임 구체 */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshBasicMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* 외부 글로우 */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#60A5FA"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 배경 파티클
function BackgroundParticles() {
  const count = 100;
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60A5FA"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// 씬 컴포넌트
function Scene({ performanceLevel }: { performanceLevel: "high" | "medium" | "low" }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 성능 레벨에 따른 궤도 파라미터 (저사양: 3개, 중간: 4개, 고사양: 6개)
  const orbits = useMemo(() => {
    const allOrbits = [
      { radius: 2.5, speed: 0.8, color: "#60A5FA", offset: 0, tiltX: 0.3, tiltY: 0.5 },
      { radius: 2.8, speed: 0.6, color: "#818CF8", offset: Math.PI * 0.5, tiltX: -0.4, tiltY: 0.3 },
      { radius: 3.0, speed: 0.7, color: "#34D399", offset: Math.PI, tiltX: 0.5, tiltY: -0.4 },
      { radius: 2.3, speed: 0.9, color: "#F472B6", offset: Math.PI * 1.5, tiltX: -0.2, tiltY: 0.6 },
      { radius: 2.6, speed: 0.5, color: "#FBBF24", offset: Math.PI * 0.3, tiltX: 0.4, tiltY: -0.2 },
      { radius: 3.2, speed: 0.65, color: "#A78BFA", offset: Math.PI * 1.2, tiltX: -0.5, tiltY: 0.4 },
    ];

    if (performanceLevel === "low") return allOrbits.slice(0, 3);
    if (performanceLevel === "medium") return allOrbits.slice(0, 4);
    return allOrbits;
  }, [performanceLevel]);

  return (
    <>
      {/* 조명 */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* 중앙 구체 */}
      <CentralSphere mouse={mouse} />

      {/* 궤도 파티클들 (Trail 효과) */}
      {orbits.map((orbit, i) => (
        <OrbitingParticle key={i} {...orbit} />
      ))}

      {/* 배경 파티클 (저사양에서는 비활성화) */}
      {performanceLevel !== "low" && <BackgroundParticles />}
    </>
  );
}

// 정적 폴백 배경 (성능 매우 낮거나 3D 지원 안될 때)
function StaticFallback() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* 그라디언트 오브들 */}
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/20 blur-[80px] animate-pulse" />
      <div className="absolute top-[30%] right-[30%] w-[200px] h-[200px] rounded-full bg-secondary/15 blur-[60px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-[20%] right-[15%] w-[150px] h-[150px] rounded-full bg-primary-light/10 blur-[50px] animate-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
}

// 메인 Hero3D 컴포넌트
export default function Hero3D() {
  const performanceLevel = usePerformanceLevel();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // WebGL 지원 확인
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // WebGL 미지원 또는 reduced-motion 선호 시 정적 폴백
  if (!hasWebGL) {
    return <StaticFallback />;
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [3, 0, 8], fov: 45 }}
        dpr={performanceLevel === "high" ? [1, 2] : [1, 1.5]}
        gl={{
          antialias: performanceLevel === "high",
          alpha: true,
          powerPreference: performanceLevel === "low" ? "low-power" : "high-performance",
        }}
      >
        <Scene performanceLevel={performanceLevel} />
      </Canvas>

      {/* 글로우 오버레이 - 오른쪽으로 이동 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-[10%] translate-x-0 -translate-y-1/2
                      w-[500px] h-[500px] rounded-full
                      bg-primary/15 blur-[120px]"
        />
      </div>
    </div>
  );
}
