'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NFTCard {
  id: number;
  image: string;
  name: string;
  traits: {
    [key: string]: string;
  };
}

const sneakPeekNFTs: NFTCard[] = [
  { id: 1, image: '/1.png', name: 'Sneak Peek #1', traits: {} },
  { id: 2, image: '/2.png', name: 'Sneak Peek #2', traits: {} },
  { id: 3, image: '/3.png', name: 'Sneak Peek #3', traits: {} },
  { id: 4, image: '/4.png', name: 'Sneak Peek #4', traits: {} },
  { id: 5, image: '/5.png', name: 'Sneak Peek #5', traits: {} },
  { id: 6, image: '/6.png', name: 'Sneak Peek #6', traits: {} },
];

const allNFTs = [...sneakPeekNFTs];

const Gallery = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFTCard | null>(null);

  return (
    <section id="gallery" className="py-24 bg-neo-black/50">
      <div className="neo-container">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-neo-cyan neo-text-glow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Gallery
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              layoutId={`nft-${nft.id}`}
              className="neo-card cursor-pointer group"
              onClick={() => setSelectedNFT(nft)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-neo-cyan">{nft.name}</h3>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedNFT && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neo-black/90 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedNFT(null)}
            >
              <motion.div
                layoutId={`nft-${selectedNFT.id}`}
                className="neo-card max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  className="w-full rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-neo-cyan mb-4">{selectedNFT.name}</h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery; 