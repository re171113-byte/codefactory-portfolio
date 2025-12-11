"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 프로그레스 애니메이션
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // 랜덤하게 증가 (더 자연스럽게)
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    // 로딩 완료 후 숨기기
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* 배경 그라디언트 */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* 로고 / 이름 */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 로고 애니메이션 */}
            <motion.div
              className="relative mb-8"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-2xl font-bold text-white">CF</span>
              </div>
            </motion.div>

            {/* 텍스트 */}
            <motion.h1
              className="text-2xl font-bold gradient-text mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              CODEFACTORY
            </motion.h1>

            {/* 프로그레스 바 */}
            <div className="w-48 h-1 bg-background-card rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* 퍼센트 */}
            <motion.p
              className="mt-4 text-sm text-foreground-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>

          {/* 하단 텍스트 */}
          <motion.p
            className="absolute bottom-8 text-xs text-foreground-subtle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Loading experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
