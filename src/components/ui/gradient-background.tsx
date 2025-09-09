'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
  gradients?: string[];
  lightGradients?: string[];
  darkGradients?: string[];
  animationDuration?: number;
  animationDelay?: number;
  enableCenterContent?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
};

const Default_Gradients = [
  "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
  "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
  "linear-gradient(135deg, #0f3460 0%, #e94560 100%)",
  "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
  "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
];

export function GradientBackground({
  children,
  className = '',
  gradients = Default_Gradients,
  lightGradients,
  darkGradients,
  animationDuration = 8,
  animationDelay = 0.5,
  overlay = false,
  overlayOpacity = 0.3,
  ...props
}: GradientBackgroundProps) {
  // respect prefers-reduced-motion
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // detect dark mode
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark') || 
           window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  });

  // use appropriate gradients based on theme
  const currentGradients = useMemo(() => {
    if (lightGradients && darkGradients) {
      return isDark ? darkGradients : lightGradients;
    }
    return gradients;
  }, [gradients, lightGradients, darkGradients, isDark]);

  // fallback static background if reduced motion
  const staticBg = useMemo(() => currentGradients[0] || Default_Gradients[0], [currentGradients]);

  return (
    <div className={`w-full h-full absolute inset-0 overflow-hidden ${className}`} {...props}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ background: staticBg }}
        animate={prefersReduced ? { background: staticBg } : { background: [...gradients, gradients[0]] }}
        transition={{
          delay: animationDelay,
          duration: animationDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          repeatType: 'loop',
        }}
        aria-hidden
      />

      {/* Optional overlay */}
      {overlay && (
        <div
          className="absolute inset-0 w-full h-full bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden
        />
      )}

      {/* Content wrapper */}
      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

export default GradientBackground;
