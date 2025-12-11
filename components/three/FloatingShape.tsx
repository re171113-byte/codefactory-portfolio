"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingShapeProps {
  mouseX: number;
  mouseY: number;
}

export default function FloatingShape({ mouseX, mouseY }: FloatingShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((mouseX - centerX) / centerX) * 15;
      const rotateX = ((mouseY - centerY) / centerY) * -15;

      setRotation({ x: rotateX, y: rotateY });
    }
  }, [mouseX, mouseY]);

  // 위도선 생성
  const latitudes = [0, 30, 60, -30, -60];
  // 경도선 생성
  const longitudes = [0, 45, 90, 135];

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none hidden lg:block"
      style={{ perspective: "1200px" }}
    >
      {/* 메인 3D 컨테이너 */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y + 20,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      >
        {/* CODE 텍스트 (상단) */}
        <motion.div
          className="absolute text-3xl font-bold tracking-[0.4em] text-primary/80"
          style={{
            top: "12%",
            transform: "translateZ(40px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          CODE
        </motion.div>

        {/* 지구 글로브 */}
        <div
          className="relative w-72 h-72"
          style={{
            transformStyle: "preserve-3d",
            animation: "spin 20s linear infinite",
          }}
        >
          {/* 구체 외곽 */}
          <div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            style={{ transform: "rotateX(90deg)" }}
          />

          {/* 위도선들 */}
          {latitudes.map((lat, i) => (
            <div
              key={`lat-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full border border-primary/20"
              style={{
                width: `${Math.cos((lat * Math.PI) / 180) * 100}%`,
                height: `${Math.cos((lat * Math.PI) / 180) * 100}%`,
                transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${Math.sin((lat * Math.PI) / 180) * 144}px)`,
              }}
            />
          ))}

          {/* 경도선들 */}
          {longitudes.map((lng, i) => (
            <div
              key={`lng-${i}`}
              className="absolute left-1/2 top-1/2 w-full h-full rounded-full border border-primary/20"
              style={{
                transform: `translate(-50%, -50%) rotateY(${lng}deg)`,
              }}
            />
          ))}

          {/* 적도선 (강조) */}
          <div
            className="absolute left-1/2 top-1/2 w-full h-full rounded-full border-2 border-primary/40"
            style={{
              transform: "translate(-50%, -50%) rotateX(90deg)",
            }}
          />

          {/* 중심 글로우 (강화) */}
          <div
            className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full bg-primary/30 blur-2xl"
            style={{ transform: "translate(-50%, -50%)" }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full bg-primary-light/40 blur-xl"
            style={{ transform: "translate(-50%, -50%)" }}
          />

          {/* 노드 포인트들 */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 136;
            const z = Math.sin(angle) * 136;
            return (
              <motion.div
                key={`node-${i}`}
                className="absolute w-2.5 h-2.5 bg-primary rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px)`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* FACTORY 텍스트 (하단) */}
        <motion.div
          className="absolute text-3xl font-bold tracking-[0.4em] text-primary/80"
          style={{
            bottom: "12%",
            transform: "translateZ(40px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          FACTORY
        </motion.div>

        {/* 연결선 (상단) */}
        <div
          className="absolute w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-primary/30"
          style={{ top: "22%", left: "50%", transform: "translateX(-50%)" }}
        />

        {/* 연결선 (하단) */}
        <div
          className="absolute w-px h-16 bg-gradient-to-t from-transparent via-primary/50 to-primary/30"
          style={{ bottom: "22%", left: "50%", transform: "translateX(-50%)" }}
        />
      </motion.div>

      {/* 배경 글로우 (강화) */}
      <div
        className="absolute left-1/2 top-1/2 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -z-10"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 w-80 h-80 rounded-full bg-primary-light/10 blur-2xl -z-10"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* 외곽 궤도 */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[500px] h-[500px] rounded-full border border-primary/10"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-2 h-2 bg-primary-light/60 rounded-full"
          style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
        />
      </motion.div>
    </div>
  );
}
