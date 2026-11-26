"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.08)",
  enableTilt = true,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { damping: 20, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: enableTilt && isHovered ? rotateX : 0,
        rotateY: enableTilt && isHovered ? rotateY : 0,
      }}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
    >
      {/* Ambient cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mouseX.get() + (cardRef.current?.offsetWidth || 0) / 2}px ${
            mouseY.get() + (cardRef.current?.offsetHeight || 0) / 2
          }px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
