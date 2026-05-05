"use client";

import { motion } from "framer-motion";

interface StageProgressRingProps {
  progress: number;
  status: "completed" | "active" | "at-risk" | "delayed" | "pending";
  size?: number;
}

const strokeColors: Record<string, string> = {
  completed: "hsl(var(--status-on-track))",
  active: "hsl(var(--primary))",
  "at-risk": "hsl(var(--status-at-risk))",
  delayed: "hsl(var(--status-delayed))",
  pending: "hsl(var(--border))",
};

export function StageProgressRing({ progress, status, size = 32 }: StageProgressRingProps) {
  const r = size / 2 - 3;
  const circumference = 2 * Math.PI * r;
  const dashoffset = circumference * (1 - progress / 100);
  const strokeColor = strokeColors[status];
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <title>Stage progress ring</title>
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
      {/* Progress arc */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: dashoffset }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        style={{ rotate: -90, transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Center text */}
      {progress > 0 && (
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size > 32 ? "9" : "7"}
          fontWeight="600"
          fill={strokeColor}
          fontFamily="inherit"
        >
          {progress}
        </text>
      )}
    </svg>
  );
}
