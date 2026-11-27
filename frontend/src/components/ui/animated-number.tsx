"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  initial?: number;
  format?: (n: number) => string;
  className?: string;
}

export function AnimatedNumber({ value, initial = 0, format, className }: AnimatedNumberProps) {
  const spring = useSpring(initial, { mass: 0.8, stiffness: 90, damping: 16 });
  const display = useTransform(spring, (current) => {
    if (format) return format(current);
    return Math.round(current).toLocaleString();
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
