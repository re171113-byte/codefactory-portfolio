"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImageWithSkeletonProps } from "@/types";

export default function ImageWithSkeleton({
  src,
  alt,
  className,
  skeletonClassName,
  containerClassName,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* 스켈레톤 로딩 상태 */}
      <AnimatePresence>
        {isLoading && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute inset-0 z-10",
              "bg-background-card",
              "animate-pulse",
              skeletonClassName
            )}
            aria-hidden="true"
          >
            {/* 쉬머 효과 */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.08) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 에러 상태 */}
      {hasError && (
        <div
          className={cn(
            "absolute inset-0 z-10",
            "bg-background-card",
            "flex items-center justify-center",
            "text-foreground-muted text-sm"
          )}
        >
          <span>이미지를 불러올 수 없습니다</span>
        </div>
      )}

      {/* 실제 이미지 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          className={cn(
            "transition-transform duration-500",
            className
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      </motion.div>
    </div>
  );
}

// 원형 스켈레톤 (프로필 이미지용)
export function CircleImageWithSkeleton({
  className,
  containerClassName,
  ...props
}: ImageWithSkeletonProps) {
  return (
    <ImageWithSkeleton
      {...props}
      containerClassName={cn("rounded-full", containerClassName)}
      className={cn("rounded-full", className)}
      skeletonClassName="rounded-full"
    />
  );
}
