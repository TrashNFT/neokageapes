'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-neo-black">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-neo-purple/30 via-neo-black to-neo-black" />
        
        {/* Cyberpunk grid */}
        <div className="absolute inset-0 cyber-grid opacity-40" />
        
        {/* Animated horizontal lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-neo-cyan/30"
              style={{
                top: `${(i + 1) * 10}%`,
                left: 0,
                right: 0,
                boxShadow: '0 0 8px rgba(0, 255, 255, 0.2)'
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        {/* Vertical glowing lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] bg-neo-magenta/30"
              style={{
                left: `${(i + 1) * 12.5}%`,
                top: 0,
                bottom: 0,
                boxShadow: '0 0 8px rgba(255, 0, 255, 0.2)'
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-neo-cyan/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [0.5, 1.5, 0.5],
                  boxShadow: [
                    '0 0 15px rgba(0, 255, 255, 0.2)',
                    '0 0 25px rgba(0, 255, 255, 0.3)',
                    '0 0 15px rgba(0, 255, 255, 0.2)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Digital rain */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="digital-rain opacity-20"
              style={{
                left: `${(i + 1) * 6.66}%`,
              }}
              initial={{ y: -20 }}
              animate={{ y: dimensions.height + 20 }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {Math.random().toString(36).substring(2, 3)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scanline effect */}
      <div className="scanline opacity-30" />
    </>
  );
};

export default Background; 