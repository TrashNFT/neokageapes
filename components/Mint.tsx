'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalLine = ({ text }: { text: string }) => (
  <div className="font-mono mb-2">
    <span className="text-neo-cyan">$ </span>
    <span className="text-neo-magenta">{text}</span>
  </div>
);

const Mint = () => {
  const [mounted, setMounted] = useState(false);
  const [terminalStep, setTerminalStep] = useState<'idle' | 'init' | 'twitter' | 'wallet' | 'submitting' | 'success'>('idle');
  const [twitter, setTwitter] = useState('');
  const [wallet, setWallet] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApply = () => {
    setTerminalLines(['Initializing apply process...']);
    setTerminalStep('init');
    setTimeout(() => {
      setTerminalLines((lines) => [...lines, 'Please enter your Twitter username:']);
      setTerminalStep('twitter');
    }, 1200);
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (terminalStep === 'twitter') {
      setTwitter(inputValue);
      setTerminalLines((lines) => [...lines, `$ ${inputValue}`, 'Please enter your APE wallet address:']);
      setInputValue('');
      setTerminalStep('wallet');
    } else if (terminalStep === 'wallet') {
      setWallet(inputValue);
      setTerminalLines((lines) => [...lines, `$ ${inputValue}`, 'Submitting your application...']);
      setInputValue('');
      setTerminalStep('submitting');
      setIsInputDisabled(true);

      try {
        const response = await fetch('/api/whitelist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ twitter, wallet: inputValue }),
        });

        const data = await response.json();

        if (response.ok) {
          setTerminalLines((lines) => [...lines, 'Successfully applied!']);
          setTerminalStep('success');
        } else {
          setTerminalLines((lines) => [...lines, `Error: ${data.message || 'Failed to submit application'}`]);
          setTerminalStep('idle');
        }
      } catch (error: any) {
        setTerminalLines((lines) => [...lines, `Error: ${error.message || 'Failed to submit application'}`]);
        setTerminalStep('idle');
      } finally {
        setIsInputDisabled(false);
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <section id="apply" className="py-24 relative overflow-hidden">
      <div className="neo-container max-w-4xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-neo-cyan neo-text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join the Shadows
        </motion.h2>

        <div className="neo-card backdrop-blur-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-neo-magenta">Mint Details</h3>
              <div className="space-y-4 text-gray-300">
                <p>Price: TBD</p>
                <p>Blockchain: APE</p>
                <p>Supply: 251</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-neo-purple/20 to-transparent opacity-50" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 text-neo-cyan">Terminal</h3>
                <div className="bg-neo-black/80 rounded-lg p-4 font-mono h-48 overflow-y-auto">
                  {terminalLines.map((line, idx) => (
                    <TerminalLine key={idx} text={line} />
                  ))}
                  {(terminalStep === 'twitter' || terminalStep === 'wallet') && (
                    <form onSubmit={handleInputSubmit} className="mt-2">
                      <input
                        className="bg-neo-black border border-neo-cyan rounded px-2 py-1 text-neo-cyan focus:outline-none"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={terminalStep === 'twitter' ? 'Twitter username' : 'APE wallet address'}
                        disabled={isInputDisabled}
                        autoFocus
                      />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              className="neo-button text-lg relative overflow-hidden group"
              onClick={handleApply}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={terminalStep !== 'idle' && terminalStep !== 'success'}
            >
              <span className="relative z-10">Apply for whitelist</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neo-cyan via-neo-magenta to-neo-purple opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>
    </section>
  );
};

export default Mint; 