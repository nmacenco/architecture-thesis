"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ImageComparisonProps = { beforeLabel: string; afterLabel: string; instruction: string };

export function ImageComparison({ beforeLabel, afterLabel, instruction }: ImageComparisonProps) {
  const [position, setPosition] = useState(54);

  return (
    <div className="image-comparison" data-scroll-scene>
      <div className="comparison-before" aria-hidden="true" />
      <div className="comparison-after" aria-hidden="true" style={{ clipPath: `inset(0 0 0 ${position}%)` }} />
      <motion.div className="comparison-handle" style={{ left: `${position}%` }} whileHover={{ scale: 1.12 }}>
        <span aria-hidden="true">↔</span>
      </motion.div>
      <input
        aria-label={instruction}
        className="comparison-range"
        max="100"
        min="0"
        onChange={(event) => setPosition(Number(event.target.value))}
        type="range"
        value={position}
      />
      <div className="comparison-labels"><span>{beforeLabel}</span><span>{afterLabel}</span></div>
    </div>
  );
}
