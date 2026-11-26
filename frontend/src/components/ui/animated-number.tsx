"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  format?: (n: number) => string;
  className?: string;
}

export function AnimatedNumber({ value, format, className }: AnimatedNumberProps) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 120, damping: 18 });
  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    return format ? format(rounded) : rounded.toLocaleString();
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
