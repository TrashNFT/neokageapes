'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const LorePanel = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="neo-card relative p-8 mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const Lore = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="neo-container">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-neo-magenta neo-text-glow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Legend of NeoKage
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <LorePanel delay={0.2}>
            <h3 className="text-2xl font-bold mb-4 text-neo-cyan">Origins</h3>
            <p className="text-gray-300">
              In the neon-lit shadows of Neo Tokyo, a new breed of digital warriors emerged.
              The NeoKage Apes, born from the fusion of ancient shinobi wisdom and cutting-edge blockchain technology.
            </p>
          </LorePanel>

          <LorePanel delay={0.4}>
            <h3 className="text-2xl font-bold mb-4 text-neo-cyan">The Awakening</h3>
            <p className="text-gray-300">
              As the digital realm expanded, these cyber-enhanced primates discovered their true purpose:
              to protect the balance between the physical and virtual worlds.
            </p>
          </LorePanel>

          <LorePanel delay={0.6}>
            <h3 className="text-2xl font-bold mb-4 text-neo-cyan">The Mission</h3>
            <p className="text-gray-300">
              Now they stand as guardians of the blockchain, wielding both ancient techniques
              and modern cryptography to safeguard the future of digital assets.
            </p>
          </LorePanel>

          <LorePanel delay={0.8}>
            <h3 className="text-2xl font-bold mb-4 text-neo-cyan">The Future</h3>
            <p className="text-gray-300">
              As the metaverse expands, the NeoKage Apes continue to evolve,
              adapting their abilities to face new challenges in the digital frontier.
            </p>
          </LorePanel>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={toggleAudio}
            className="neo-button inline-flex items-center space-x-2"
          >
            <span>{isPlaying ? 'Pause' : 'Play'} Ambient Music</span>
            <svg
              className={`w-6 h-6 transition-transform ${isPlaying ? 'transform rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <audio
          ref={audioRef}
          loop
          className="hidden"
          src="/ambient-music.mp3"
        />
      </div>
    </section>
  );
};

export default Lore; 