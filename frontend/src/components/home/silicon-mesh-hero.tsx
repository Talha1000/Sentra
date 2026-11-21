"use client";

import React, { useEffect, useRef } from "react";

export function SiliconMeshHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Circuit nodes & pulses
    const cols = Math.floor(width / 60);
    const rows = Math.floor(height / 60);
    const nodes: { x: number; y: number; active: boolean; brightness: number }[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          x: i * 60 + 30,
          y: j * 60 + 30,
          active: Math.random() > 0.85,
          brightness: Math.random() * 0.4,
        });
      }
    }

    // Moving signal packets
    interface Packet {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      color: string;
      trail: { x: number; y: number }[];
    }

    const packets: Packet[] = [];
    for (let i = 0; i < 16; i++) {
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      packets.push({
        x: startNode.x,
        y: startNode.y,
        targetX: startNode.x + (Math.random() > 0.5 ? 1 : -1) * 60,
        targetY: startNode.y + (Math.random() > 0.5 ? 1 : -1) * 60,
        speed: 1.2 + Math.random() * 1.5,
        color: Math.random() > 0.4 ? "#00F0FF" : "#FF5500",
        trail: [],
      });
    }

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.65,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.9
      );
      bgGrad.addColorStop(0, "#0B0E14");
      bgGrad.addColorStop(0.5, "#06070A");
      bgGrad.addColorStop(1, "#030406");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Micro-silicon grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Orthogonal circuit traces
      ctx.strokeStyle = "rgba(0, 240, 255, 0.06)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i += 4) {
        const node = nodes[i];
        if (node.active) {
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(node.x + 40, node.y);
          ctx.lineTo(node.x + 40, node.y + 40);
        }
      }
      ctx.stroke();

      // Render signal packets
      for (let p of packets) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();

        // Draw packet trail
        ctx.beginPath();
        for (let i = 0; i < p.trail.length; i++) {
          const pt = p.trail[i];
          const alpha = (i / p.trail.length) * 0.6;
          ctx.strokeStyle = p.color === "#00F0FF" ? `rgba(0, 240, 255, ${alpha})` : `rgba(255, 85, 0, ${alpha})`;
          ctx.lineWidth = 2;
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Draw packet head
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Move towards target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < p.speed) {
          p.x = p.targetX;
          p.y = p.targetY;
          // Pick new orthogonal neighbor
          const dir = Math.floor(Math.random() * 4);
          if (dir === 0) p.targetX += 60;
          else if (dir === 1) p.targetX -= 60;
          else if (dir === 2) p.targetY += 60;
          else p.targetY -= 60;

          // Keep in bounds
          if (p.targetX < 0) p.targetX = width;
          if (p.targetX > width) p.targetX = 0;
          if (p.targetY < 0) p.targetY = height;
          if (p.targetY > height) p.targetY = 0;
        } else {
          p.x += (dx / dist) * p.speed;
          p.y += (dy / dist) * p.speed;
        }
      }

      // Ambient vignette & corner darkness
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.25,
        width / 2,
        height / 2,
        width * 0.75
      );
      vignette.addColorStop(0, "rgba(5, 6, 8, 0)");
      vignette.addColorStop(1, "rgba(5, 6, 8, 0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
      style={{ filter: "contrast(1.15)" }}
    />
  );
}
