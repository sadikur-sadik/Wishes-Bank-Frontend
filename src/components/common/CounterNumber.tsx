"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterNumberProps {
  value: string;
  duration?: number; // duration in seconds
  className?: string;
}

function parseCounterValue(value: string) {
  const match = value.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, decimals: 0, suffix: value, isNumeric: false };
  }
  const prefix = match[1];
  const rawNum = match[2].replace(/,/g, "");
  const suffix = match[3];
  const target = parseFloat(rawNum);
  const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0;
  return {
    prefix,
    target: isNaN(target) ? 0 : target,
    decimals,
    suffix,
    isNumeric: !isNaN(target),
  };
}

export function CounterNumber({
  value,
  duration = 1.8,
  className = "",
}: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  const parsed = parseCounterValue(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView || !parsed.isNumeric || shouldReduceMotion) {
      return;
    }

    const start = 0;
    const end = parsed.target;
    const totalSteps = 60 * duration;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out quad
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextVal = start + (end - start) * easedProgress;

      if (step >= totalSteps) {
        setCurrent(end);
        clearInterval(interval);
      } else {
        setCurrent(nextVal);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isInView, parsed.isNumeric, parsed.target, duration, shouldReduceMotion]);

  if (!parsed.isNumeric || shouldReduceMotion) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  const formattedNum = current.toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {formattedNum}
      {parsed.suffix}
    </span>
  );
}

export default CounterNumber;
