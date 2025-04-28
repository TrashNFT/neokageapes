'use client';

import React from 'react';

const JapaneseGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <div className="grid grid-cols-6 gap-x-4 gap-y-8 p-4">
        {[...Array(20)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="text-xl text-[#8B0037] opacity-80">ネ</div>
            <div className="text-xl text-[#8B0037] opacity-90">影</div>
            <div className="text-xl text-[#8B0037] opacity-80">○</div>
            <div className="text-xl text-[#8B0037] opacity-70">×</div>
            <div className="text-xl text-[#8B0037] opacity-90">影</div>
            <div className="text-xl text-[#8B0037] opacity-80">○</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JapaneseGrid; 