import React from 'react';
import { Team } from '../types';
import { FlipNumber } from './FlipNumber';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, onVote }) => {
  return (
    <div className="flex items-center bg-gray-900/70 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-700/50 h-28 transition-shadow hover:shadow-cyan-500/20">
      <div className="flex items-center justify-center w-24">
        <FlipNumber num={team.rank} />
      </div>
      <div className="flex-1 border-l-2 border-r-2 border-gray-700/50 border-dashed px-4 mx-4">
        <h3 className="text-xl font-bold text-white truncate">{team.name}</h3>
        <p className="text-gray-400">{team.genre}</p>
      </div>
      <div className="w-32 text-center">
        <div className="font-orbitron text-3xl font-bold text-cyan-300 neon-text-cyan">
          {team.totalScore?.toFixed(2) || '0.00'}
        </div>
        <div className="text-xs text-gray-500">合計スコア</div>
      </div>
    </div>
  );
};