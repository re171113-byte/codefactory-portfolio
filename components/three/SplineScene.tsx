"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  className?: string;
}

export default function SplineScene({ className = "" }: SplineSceneProps) {
  return (
    <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block ${className}`}>
      {/* Loading placeholder */}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              className="w-20 h-20 border-2 border-primary/30 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>

      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl -z-10"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
