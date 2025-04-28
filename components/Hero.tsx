'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background video/animation container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neo-purple/20 via-neo-black to-neo-black mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="neo-container relative z-10 text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 text-neo-cyan neo-text-glow sword-cursor-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Neokage Apes
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-neo-magenta mb-12 max-w-2xl mx-auto sword-cursor-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Forged in shadows. Born in code.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button 
            className="neo-button sword-cursor-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('apply');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Apply for whitelist
          </motion.button>
          <motion.button 
            className="neo-button-outline sword-cursor-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('gallery');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Gallery
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neo-black to-transparent" />
      </div>
    </section>
  );
};

export default Hero; 