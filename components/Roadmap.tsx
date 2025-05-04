'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const roadmapSteps = [
  {
    phase: 'Phase 1',
    title: 'Genesis Launch',
    description: 'Initial release of 251 unique NeoKage Apes, each with distinct shinobi traits.',
    status: 'completed',
  },
  {
    phase: 'Phase 2',
    title: 'Dojo Training',
    description: 'Launch of the NeoKage training grounds, where holders can level up their Apes abilities.',
    status: 'in-progress',
  },
  {
    phase: 'Phase 3',
    title: 'Clan Wars',
    description: 'Introduction of clan-based gameplay and territory control in the metaverse.',
    status: 'upcoming',
  },
  {
    phase: 'Phase 4',
    title: 'Cyber Evolution',
    description: 'Release of cyber augmentations and special abilities for NeoKage Apes.',
    status: 'upcoming',
  },
];

const RoadmapStep = ({ step, index }: { step: typeof roadmapSteps[0]; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`neo-card relative pl-8 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-full md:w-[calc(50%-2rem)]`}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          step.status === 'completed'
            ? 'bg-neo-cyan'
            : step.status === 'in-progress'
            ? 'bg-neo-magenta'
            : 'bg-neo-purple'
        }`}
      />
      <div className={`${['Phase 2', 'Phase 3', 'Phase 4'].includes(step.phase) ? 'backdrop-blur-sm blur-sm pointer-events-none select-none' : ''}`}>
        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 bg-neo-purple/30 text-neo-cyan">
          {step.phase}
        </span>
        <h3 className="text-2xl font-bold mb-3 text-neo-magenta">{['Phase 2', 'Phase 3', 'Phase 4'].includes(step.phase) ? 'Coming Soon' : step.title}</h3>
        <p className="text-gray-300">{['Phase 2', 'Phase 3', 'Phase 4'].includes(step.phase) ? 'Coming Soon' : step.description}</p>
      </div>
    </motion.div>
  );
};

const Roadmap = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="neo-container">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-neo-cyan neo-text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Roadmap
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neo-purple/30 transform -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12">
            {roadmapSteps.map((step, index) => (
              <RoadmapStep key={step.phase} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neo-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neo-black to-transparent" />
      </div>
    </section>
  );
};

export default Roadmap; 