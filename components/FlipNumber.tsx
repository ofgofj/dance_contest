
import React from 'react';

interface FlipNumberProps {
  num: number;
}

export const FlipNumber: React.FC<FlipNumberProps> = ({ num }) => {
  return (
    <div className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-lg">
      <span className="text-5xl font-bold text-white">{num}</span>
    </div>
  );
};
